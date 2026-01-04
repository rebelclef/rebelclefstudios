import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "node:fs/promises";
import path from "node:path";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

async function readProjectsFile(): Promise<string> {
  // Try a few common locations/names so you don't have to be perfect
  const candidates = [
    path.join(process.cwd(), "src", "content", "projects.ts"),
    path.join(process.cwd(), "src", "content", "projects.tsx"),
    path.join(process.cwd(), "src", "content", "projects", "index.ts"),
    path.join(process.cwd(), "src", "content", "projects", "index.tsx"),
  ];

  for (const p of candidates) {
    try {
      return await fs.readFile(p, "utf8");
    } catch {
      // keep trying
    }
  }

  throw new Error(
    `Could not read projects file. Tried:\n${candidates
      .map((c) => `- ${c}`)
      .join("\n")}`
  );
}

function extractIdsFromProjectsSource(srcText: string) {
  const yt: string[] = [];
  const vm: string[] = [];

  // YouTube embed: https://www.youtube.com/embed/VIDEO_ID
  for (const m of srcText.matchAll(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/g)) {
    if (m[1]) yt.push(m[1]);
  }

  // Vimeo embed: https://player.vimeo.com/video/123456789
  for (const m of srcText.matchAll(/vimeo\.com\/video\/(\d+)/g)) {
    if (m[1]) vm.push(m[1]);
  }

  return { youtubeIds: uniq(yt), vimeoIds: uniq(vm) };
}

async function fetchYouTubeViews(youtubeIds: string[], apiKey: string) {
  if (!youtubeIds.length) return 0;

  let total = 0;

  for (let i = 0; i < youtubeIds.length; i += 50) {
    const chunk = youtubeIds.slice(i, i + 50);
    const url =
      "https://www.googleapis.com/youtube/v3/videos" +
      `?part=statistics&id=${encodeURIComponent(chunk.join(","))}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`YouTube API error: ${res.status} ${body}`);
    }

    const json: any = await res.json();
    for (const item of json.items || []) {
      const vc = item?.statistics?.viewCount;
      if (vc != null) total += Number(vc);
    }
  }

  return total;
}

async function fetchVimeoViews(vimeoIds: string[], token: string) {
  if (!vimeoIds.length) return 0;

  let total = 0;

  for (let i = 0; i < vimeoIds.length; i += 20) {
    const chunk = vimeoIds.slice(i, i + 20);
    const uris = chunk.map((id) => `/videos/${id}`).join(",");
    const url =
      "https://api.vimeo.com/videos" +
      `?uris=${encodeURIComponent(uris)}` +
      `&fields=${encodeURIComponent("uri,stats.plays")}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Vimeo API error: ${res.status} ${body}`);
    }

    const json: any = await res.json();

    for (const v of json.data || []) {
      const plays = v?.stats?.plays;
      if (plays != null) total += Number(plays);
    }
  }

  return total;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ✅ CORS (safe even if you end up only using same-origin)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const vimeoToken = process.env.VIMEO_ACCESS_TOKEN;

    if (!apiKey && !vimeoToken) {
      return res.status(500).json({
        error:
          "Missing env vars. Set YOUTUBE_API_KEY and/or VIMEO_ACCESS_TOKEN in Vercel.",
      });
    }

    const projectsText = await readProjectsFile();
    const { youtubeIds, vimeoIds } = extractIdsFromProjectsSource(projectsText);

    const [ytTotal, vmTotal] = await Promise.all([
      apiKey ? fetchYouTubeViews(youtubeIds, apiKey) : Promise.resolve(0),
      vimeoToken ? fetchVimeoViews(vimeoIds, vimeoToken) : Promise.resolve(0),
    ]);

    const total = ytTotal + vmTotal;

    // ✅ Edge cache (keeps API quota sane)
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json({
      total,
      youtube: ytTotal,
      vimeo: vmTotal,
      counts: { youtubeVideos: youtubeIds.length, vimeoVideos: vimeoIds.length },
      updatedAt: new Date().toISOString(),
    });
  } catch (e: any) {
    return res.status(500).json({
      error: e?.message || "Unknown error",
    });
  }
}