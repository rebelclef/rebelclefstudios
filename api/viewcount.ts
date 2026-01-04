import type { VercelRequest, VercelResponse } from "@vercel/node";

// If you prefer: import { projects } from "../src/content/projects";
// NOTE: Import paths can be finicky in Vercel functions depending on your setup.
// If this import gives you trouble, see the note below.
import { projects } from "../src/content/projects";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function extractIdsFromProjects() {
  const yt: string[] = [];
  const vm: string[] = [];

  for (const p of projects as any[]) {
    // Option A: explicit IDs (recommended)
    if (p.platformIds?.youtube?.length) yt.push(...p.platformIds.youtube);
    if (p.platformIds?.vimeo?.length) vm.push(...p.platformIds.vimeo);

    // Option B: derive from embed URLs you already have (optional)
    const urls: string[] = [];

    if (p.embedUrl) urls.push(p.embedUrl);
    if (p.heroEmbedUrl) urls.push(p.heroEmbedUrl);

    if (Array.isArray(p.videos)) {
      for (const v of p.videos) if (v?.embedUrl) urls.push(v.embedUrl);
    }

    if (Array.isArray(p.videoSections)) {
      for (const s of p.videoSections) {
        for (const v of s?.videos || []) if (v?.embedUrl) urls.push(v.embedUrl);
      }
    }

    for (const u of urls) {
      // YouTube embed: https://www.youtube.com/embed/VIDEO_ID
      const y = u.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
      if (y?.[1]) yt.push(y[1]);

      // Vimeo embed: https://player.vimeo.com/video/123456789
      const v = u.match(/vimeo\.com\/video\/(\d+)/);
      if (v?.[1]) vm.push(v[1]);
    }
  }

  return { youtubeIds: uniq(yt), vimeoIds: uniq(vm) };
}

async function fetchYouTubeViews(youtubeIds: string[], apiKey: string) {
  if (!youtubeIds.length) return 0;

  // YouTube API supports up to 50 IDs per request.
  let total = 0;

  for (let i = 0; i < youtubeIds.length; i += 50) {
    const chunk = youtubeIds.slice(i, i + 50);
    const url =
      "https://www.googleapis.com/youtube/v3/videos" +
      `?part=statistics&id=${encodeURIComponent(chunk.join(","))}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
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

  // Vimeo lets you request multiple via uris=
  // e.g. /videos/123,/videos/456 and select fields=uri,stats.plays
  // (This typically requires the "stats" capability on the token.)
  let total = 0;

  // Keep chunks modest
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

    if (!res.ok) throw new Error(`Vimeo API error: ${res.status}`);
    const json: any = await res.json();

    for (const v of json.data || []) {
      const plays = v?.stats?.plays;
      if (plays != null) total += Number(plays);
    }
  }

  return total;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const vimeoToken = process.env.VIMEO_ACCESS_TOKEN;

    if (!apiKey && !vimeoToken) {
      return res.status(500).json({
        error:
          "Missing env vars. Set YOUTUBE_API_KEY and/or VIMEO_ACCESS_TOKEN in Vercel.",
      });
    }

    const { youtubeIds, vimeoIds } = extractIdsFromProjects();

    const [ytTotal, vmTotal] = await Promise.all([
      apiKey ? fetchYouTubeViews(youtubeIds, apiKey) : Promise.resolve(0),
      vimeoToken ? fetchVimeoViews(vimeoIds, vimeoToken) : Promise.resolve(0),
    ]);

    const total = ytTotal + vmTotal;

    // Cache at the edge so you don't burn API quota on every page load
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json({
      total,
      youtube: ytTotal,
      vimeo: vmTotal,
      counts: { youtubeVideos: youtubeIds.length, vimeoVideos: vimeoIds.length },
      updatedAt: new Date().toISOString(),
    });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}