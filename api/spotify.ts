import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const LASTFM_USERNAME = process.env.LASTFM_USERNAME;
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

  if (!LASTFM_USERNAME || !LASTFM_API_KEY) {
    return res.status(500).json({ error: "Missing Last.fm API credentials" });
  }

  try {
    const timestamp = Date.now();
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1&t=${timestamp}`
    );
    
    const data = await response.json();
    const track = data.recenttracks?.track?.[0];

    if (!track || !track["@attr"] || track["@attr"].nowplaying !== "true") {
      return res.status(200).json({ is_playing: false });
    }

    
    let duration_ms = 180000; 
    try {
      
      const infoRes = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(track.artist["#text"])}&track=${encodeURIComponent(track.name)}&format=json`
      );
      const infoData = await infoRes.json();
      
      if (infoData.track && infoData.track.duration) {
        const parsedDuration = parseInt(infoData.track.duration);
        if (parsedDuration > 0) {
          duration_ms = parsedDuration; 
        }
      }
    } catch (e) {
      console.error("Failed to fetch exact duration", e);
    }

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');

    return res.status(200).json({
      is_playing: true,
      item: {
        name: track.name,
        artists: [{ name: track.artist["#text"] }],
        album: {
          images: [{ url: track.image[track.image.length - 1]["#text"] }],
          external_urls: { spotify: track.url } 
        },
        external_urls: { spotify: track.url },
        duration_ms: duration_ms 
      }
    });

  } catch (error) {
    console.error("Last.fm API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}