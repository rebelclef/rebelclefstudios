import type { VercelRequest, VercelResponse } from "@vercel/node";
import { projects } from "../src/content/projects";


function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

type CollectedIds = {
  youtubeIds: string[];
  youtubePlaylistIds: string[];
  vimeoIds: string[];
};

function getIdsFromProjects(): CollectedIds {
  const youtubeIds = new Set<string>();
  const youtubeLists = new Set<string>();
  const vimeoIds = new Set<string>();

  const takeUrl = (url?: string) => {
    if (!url) return;
    try {
      const u = new URL(url);
      const host = u.hostname;
      const path = u.pathname;

      if (host.includes("youtube.com")) {
        if (path.startsWith("/embed/videoseries")) {
          const list = u.searchParams.get("list");
          if (list) youtubeLists.add(list);
          return;
        }
        const m = path.match(/\/embed\/([a-zA-Z0-9_-]+)/);
        if (m?.[1]) {
          youtubeIds.add(m[1]);
          return;
        }
      }

      if (host.includes("youtu.be")) {
        const m = path.match(/\/([a-zA-Z0-9_-]{6,15})/);
        if (m?.[1]) youtubeIds.add(m[1]);
      }

      if (host.includes("vimeo.com")) {
        const m = path.match(/\/video\/(\d+)/);
        if (m?.[1]) vimeoIds.add(m[1]);
      }
    } catch {
      // ignore
    }
  };

  // Iterate over the statically imported projects array
  for (const p of projects as any[]) {
    takeUrl(p.embedUrl);
    takeUrl(p.heroEmbedUrl);
    if (Array.isArray(p.videos)) {
      for (const v of p.videos) takeUrl(v?.embedUrl);
    }
    if (Array.isArray(p.videoSections)) {
      for (const sec of p.videoSections) {
        if (Array.isArray(sec?.videos)) {
          for (const v of sec.videos) takeUrl(v?.embedUrl);
        }
      }
    }
  }

  return {
    youtubeIds: Array.from(youtubeIds),
    youtubePlaylistIds: Array.from(youtubeLists),
    vimeoIds: Array.from(vimeoIds),
  };
}


async function fetchYouTubeViews(youtubeIds: string[], apiKey: string) {
  if (!youtubeIds.length) return 0;

  let total = 0;

  for (let i = 0; i < youtubeIds.length; i += 50) {
    const chunk = youtubeIds.slice(i, i + 50);
    const url =
      "https://www.googleapis.com/youtube/v3/videos" +
      `?part=statistics&id=${chunk.join(",")}` +
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

async function fetchYouTubePlaylistVideoIds(
  playlistIds: string[],
  apiKey: string
) {
  if (!playlistIds.length) return [];
  const videoIds: string[] = [];

  for (const playlistId of playlistIds) {
    let pageToken: string | undefined;
    do {
      const url =
        "https://www.googleapis.com/youtube/v3/playlistItems" +
        `?part=contentDetails&maxResults=50&playlistId=${encodeURIComponent(
          playlistId
        )}` +
        (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : "") +
        `&key=${encodeURIComponent(apiKey)}`;

      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`YouTube Playlist API error: ${res.status} ${body}`);
      }

      const json: any = await res.json();
      for (const item of json.items || []) {
        const vid = item?.contentDetails?.videoId;
        if (vid) videoIds.push(vid);
      }
      pageToken = json.nextPageToken;
    } while (pageToken);
  }

  return uniq(videoIds);
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

    // ✅ Use static import data
    const data = getIdsFromProjects();
    const youtubeIds = uniq(data.youtubeIds);
    const youtubePlaylistIds = uniq(data.youtubePlaylistIds);
    const vimeoIds = uniq(data.vimeoIds);
    
    console.log(`[ViewCount] Found ${youtubeIds.length} unique YouTube IDs.`);
    // Debug: Check for specific new IDs
    if (youtubeIds.includes("IMAZEW-cnr4")) console.log("[ViewCount] ✅ Found ID: IMAZEW-cnr4");
    else console.log("[ViewCount] ❌ Missing ID: IMAZEW-cnr4");
    if (youtubeIds.includes("d9aqUMgVbSc")) console.log("[ViewCount] ✅ Found ID: d9aqUMgVbSc");

    const playlistVideoIds =
      apiKey && youtubePlaylistIds.length
        ? await fetchYouTubePlaylistVideoIds(youtubePlaylistIds, apiKey)
        : [];
    const allYoutubeIds = uniq([...youtubeIds, ...playlistVideoIds]);

    const [ytTotal, vmTotal] = await Promise.all([
      apiKey ? fetchYouTubeViews(allYoutubeIds, apiKey) : Promise.resolve(0),
      vimeoToken ? fetchVimeoViews(vimeoIds, vimeoToken) : Promise.resolve(0),
    ]);

    const total = ytTotal + vmTotal;

    // ✅ Edge cache (keeps API quota sane)
    // Reduced cache time to 60s to help debug updates
    res.setHeader("Cache-Control", "no-store, max-age=0");

    return res.status(200).json({
      total,
      youtube: ytTotal,
      vimeo: vmTotal,
      counts: {
        youtubeVideos: allYoutubeIds.length,
        youtubePlaylists: youtubePlaylistIds.length,
        vimeoVideos: vimeoIds.length,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (e: any) {
    return res.status(500).json({
      error: e?.message || "Unknown error",
    });
  }
}
