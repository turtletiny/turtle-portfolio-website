import type { VercelRequest, VercelResponse } from "@vercel/node";

const DISCORD_ID = "644484730070237215";

type DiscordStatus = "online" | "idle" | "dnd" | "offline";

interface LanyardSpotify {
  song?: string;
  artist?: string;
  album_art_url?: string;
  timestamps?: { start?: number; end?: number };
}

interface LanyardResponse {
  success?: boolean;
  data?: {
    discord_status?: DiscordStatus;
    spotify?: LanyardSpotify | null;
  };
}

interface NowPlayingPayload {
  is_playing: boolean;
  source: "discord" | "lastfm";
  progress_ms?: number;
  item?: {
    name: string;
    artists: Array<{ name: string }>;
    duration_ms?: number;
    album: {
      name?: string;
      images: Array<{ url: string }>;
    };
  };
}

function getLastfmRecentTrackUrl(username: string, apiKey: string) {
  const timestamp = Date.now();
  return `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1&t=${timestamp}`;
}

async function getLastfmFallback(username: string, apiKey: string): Promise<NowPlayingPayload> {
  const response = await fetch(getLastfmRecentTrackUrl(username, apiKey));
  const data = await response.json();
  const track = data.recenttracks?.track?.[0];

  if (!track) {
    return { is_playing: false, source: "lastfm" };
  }

  const isNowPlaying = track["@attr"]?.nowplaying === "true";

  let durationMs = 180000;
  if (isNowPlaying) {
    try {
      const infoRes = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(track.artist["#text"])}&track=${encodeURIComponent(track.name)}&format=json`,
      );
      const infoData = await infoRes.json();

      if (infoData.track?.duration) {
        const parsedDuration = parseInt(infoData.track.duration, 10);
        if (parsedDuration > 0) {
          durationMs = parsedDuration;
        }
      }
    } catch (error) {
      console.error("Failed to fetch exact Last.fm duration", error);
    }
  }

  const albumImage = Array.isArray(track.image)
    ? track.image[track.image.length - 1]?.["#text"] || ""
    : "";

  return {
    is_playing: isNowPlaying,
    source: "lastfm",
    item: {
      name: track.name,
      artists: [{ name: track.artist["#text"] || "Unknown Artist" }],
      duration_ms: isNowPlaying ? durationMs : undefined,
      album: {
        name: track.album?.["#text"] || undefined,
        images: [{ url: albumImage }],
      },
    },
  };
}

async function getDiscordNowPlaying(): Promise<NowPlayingPayload | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as LanyardResponse;
    if (!payload.success || !payload.data) {
      return null;
    }

    const status = payload.data.discord_status;
    const spotify = payload.data.spotify;

    // Treat online/idle/dnd as active presence and prefer live Discord Spotify data.
    if (!status || status === "offline" || !spotify) {
      return null;
    }

    const start = spotify.timestamps?.start;
    const end = spotify.timestamps?.end;
    const now = Date.now();

    const computedDuration =
      typeof start === "number" && typeof end === "number" && end > start
        ? end - start
        : undefined;

    const computedProgress =
      typeof start === "number"
        ? Math.max(0, Math.min(now - start, computedDuration ?? Number.MAX_SAFE_INTEGER))
        : undefined;

    return {
      is_playing: true,
      source: "discord",
      progress_ms: computedProgress,
      item: {
        name: spotify.song || "Unknown Track",
        artists: [{ name: spotify.artist || "Unknown Artist" }],
        duration_ms: computedDuration,
        album: {
          images: [{ url: spotify.album_art_url || "" }],
        },
      },
    };
  } catch (error) {
    console.error("Discord Lanyard fetch failed", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const discordNowPlaying = await getDiscordNowPlaying();

    if (discordNowPlaying) {
      res.setHeader("Cache-Control", "public, s-maxage=8, stale-while-revalidate=20");
      return res.status(200).json(discordNowPlaying);
    }

    const username = process.env.LASTFM_USERNAME;
    const apiKey = process.env.LASTFM_API_KEY;

    if (!username || !apiKey) {
      return res.status(500).json({ error: "Missing Last.fm API credentials" });
    }

    const fallback = await getLastfmFallback(username, apiKey);
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(fallback);
  } catch (error) {
    console.error("Now playing API error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
