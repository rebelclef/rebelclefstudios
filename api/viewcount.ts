import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "node:fs/promises";
import path from "node:path";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

/**
 * If you want to count extra videos that are NOT in projects.ts,
 * add them here as raw YouTube video IDs (NOT full URLs).
 * Example: "dQw4w9WgXcQ"
 */
const EXTRA_YOUTUBE_VIDEO_IDS: string[] = [
  "d9aqUMgVbSc", // Siri, will you marry me?
  "GuearVDInrs", // HARLEM SHAKE (CIRCUS PARTY)
  "8_XMCSEYL6g", // Dragon Shout (Skyrim Parody)
  "P7q-5skWSi0", // Giga Pudding (Spoof)
  "9eUzwJsFmmU", // Star Trek Chatroulette
  "72XhdVqDT1g", // Artemis Bridge Simulator Gameplay
  "8avQkpnpaXs", // Inception Spoof (A Gross Misuse of Inception)
  "i0Xu6EN6mlQ", // Halo Kinect
  "QFvNhsWMU0c", // We're NASA and We Know It (Mars Curiosity)
  "SD7MLlilrv4", // TrapWire Kickstarter -- Donate Today!
  "oh6pEcQlumc", // PAX Prime Cosplay: You Know You're a Geek When...
  "w4bBSDP6KoM", // YOLO: Adult Edition
  "20HUfIC2IC4", // Best Virgin Galactic Video Ever
  "bSgX8BZAL5I", // Top 12 Coke Zero Movie Deaths
  "3zKBNMFvSeg", // The Gum Boys Take Ireland
  "1iCV-TccN_A", // Gritty Reboots | Actiongram BTS
  "7LnUOjgXPZw", // Gritty Reboots July 2016 Update | Actiongram video
  "W6P5cL1kpZc", // Star Wars: The Force Awakens Trailer (LUKE SKYWALKER SPOTTED!)
  "XHA6kZMl5i8", // AFTER EFFECTS WORLD 2014
  "vY5SwAjooJg", // UPDATE! Adventure Time, Job Hunters, VidCon & More!
  "sWcKtJj5_oY", // Xbox One: A Space Odyssey (Parody) | Gritty Reboots
  "2VYZQux7Oso", // Xbox One BTS
  "DMhvROALYAo", // Xbox One VFX B&A
  "ZOQp--b2SNI", // Dramatic Reenactment of Super Bowl XLVIII (Broncos vs Seahawks Parody)
  "4t1JxutNy_U", // Gritty Reboots Updates! VidCon + Web Series
  "Ea3DXxMmQOM", // Know Your Meme: Pedobear
  "Ggl2voBzeS8", // Know Your Meme: Ermahgerd
  "nC4_kNgsl4c", // Know Your Meme: Rage Comics
  "v87S6UOf8_o", // Know Your Meme: 60's Spider-Man
  "xbdp4vFx8Rg", // Know Your Meme: Minecraft
  "uYAah3VzvYY", // Know Your Meme: Futurama
  "ucoU0c5kvZw", // Know Your Meme: Philosoraptor
  "13nHKH1m-xA", // Know Your Meme: Skyrim Catchphrases
  "hQJGZRAvWm0", // Know Your Meme: Guile's Theme
  "ISb0sdWVNjA", // Know Your Meme: Friend-Zoned
  "yjcUS1XOplk", // Know Your Meme: Introduction to Pokémon Memes (Part I)
  "km5NUgcoLn4", // Know Your Meme: Introduction to Pokémon Memes (Part II)
  "1duRXM9_D2s", // Know Your Meme: The Cinnamon Challenge
  "DU9HqfNBdIk", // Know Your Meme: Pepper Spray Cop
  "CT2rr0Otyto", // Know Your Meme: A SOPA/PIPA PSA
];

/**
 * If you want extra playlist IDs counted (optional).
 */
const EXTRA_YOUTUBE_PLAYLIST_IDS: string[] = [];

/**
 * If you want extra Vimeo IDs counted (optional).
 */
const EXTRA_VIMEO_IDS: string[] = [];

type CollectedIds = {
  youtubeIds: string[];
  youtubePlaylistIds: string[];
  vimeoIds: string[];
};

async function readProjectsFile(): Promise<string> {
  // Try a few common locations so you don’t have to be perfect
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
    `Could not read projects file. Tried:\n${candidates.map((c) => `- ${c}`).join("\n")}`
  );
}

function extractIdsFromSource(srcText: string): CollectedIds {
  const ytIds: string[] = [];
  const ytPlaylists: string[] = [];
  const vmIds: string[] = [];

  // YouTube video embed: https://www.youtube.com/embed/VIDEO_ID
  for (const m of srcText.matchAll(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/g)) {
    if (m[1]) ytIds.push(m[1]);
  }

  // YouTube playlist embed: https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID
  for (const m of srcText.matchAll(/youtube\.com\/embed\/videoseries\?[^"']*list=([a-zA-Z0-9_-]+)/g)) {
    if (m[1]) ytPlaylists.push(m[1]);
  }

  // Vimeo embed: https://player.vimeo.com/video/123456789
  for (const m of srcText.matchAll(/vimeo\.com\/video\/(\d+)/g)) {
    if (m[1]) vmIds.push(m[1]);
  }

  return {
    youtubeIds: uniq([...ytIds, ...EXTRA_YOUTUBE_VIDEO_IDS]),
    youtubePlaylistIds: uniq([...ytPlaylists, ...EXTRA_YOUTUBE_PLAYLIST_IDS]),
    vimeoIds: uniq([...vmIds, ...EXTRA_VIMEO_IDS]),
  };
}

async function fetchYouTubeViews(youtubeIds: string[], apiKey: string) {
  if (!youtubeIds.length) return 0;

  let total = 0;

  // YouTube API supports up to 50 ids per request
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

async function fetchYouTubePlaylistVideoIds(playlistIds: string[], apiKey: string) {
  if (!playlistIds.length) return [];

  const videoIds: string[] = [];

  for (const playlistId of playlistIds) {
    let pageToken: string | undefined;

    do {
      const url =
        "https://www.googleapis.com/youtube/v3/playlistItems" +
        `?part=contentDetails&maxResults=50&playlistId=${encodeURIComponent(playlistId)}` +
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

async function fetchVimeoViews(vimeoIds: string[], token: string) {
  if (!vimeoIds.length) return 0;

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

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;

  // Allow your domains + local dev. Adjust if you add a custom domain later.
  const allowlist = new Set<string>([
    "https://rebelclefstudios.vercel.app",
    // add your custom domain here later, e.g.:
    // "https://rebelclefstudios.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ]);

  if (origin && allowlist.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else {
    // Safe fallback: same-origin requests will work even without this,
    // but this prevents random sites from calling your endpoint.
    res.setHeader("Access-Control-Allow-Origin", "https://rebelclefstudios.vercel.app");
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const vimeoToken = process.env.VIMEO_ACCESS_TOKEN;

    if (!apiKey && !vimeoToken) {
      return res.status(500).json({
        error: "Missing env vars. Set YOUTUBE_API_KEY and/or VIMEO_ACCESS_TOKEN in Vercel.",
      });
    }

    const projectsText = await readProjectsFile();
    const { youtubeIds, youtubePlaylistIds, vimeoIds } = extractIdsFromSource(projectsText);

    const playlistVideoIds =
      apiKey && youtubePlaylistIds.length
        ? await fetchYouTubePlaylistVideoIds(youtubePlaylistIds, apiKey)
        : [];

    const allYoutubeIds = uniq([...youtubeIds, ...playlistVideoIds]);

    const [ytTotal, vmTotal] = await Promise.all([
      apiKey ? fetchYouTubeViews(allYoutubeIds, apiKey) : Promise.resolve(0),
      vimeoToken ? fetchVimeoViews(vimeoIds, vimeoToken) : Promise.resolve(0),
    ]);

    // Manual offset for private/unlisted videos not counted by APIs.
    const MANUAL_VIEW_OFFSET = 520_000_000;
    const total = ytTotal + vmTotal + MANUAL_VIEW_OFFSET;

    // Cache at edge so you don't burn API quota on every page load
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

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
    console.error("[ViewCount] API Error:", e);
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
