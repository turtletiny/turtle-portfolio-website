import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    console.error("Missing environment variables!");
    return res.status(500).json({ error: "Missing Spotify API credentials" });
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  

  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

  try {

    const tokenResponse = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });
    
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
       console.error("Token Error:", tokenData);
       return res.status(500).json({ error: "Failed to generate access token." });
    }


    const playingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (playingResponse.status === 204 || playingResponse.status > 400) {
      return res.status(200).json({ is_playing: false });
    }

    const songData = await playingResponse.json();
    return res.status(200).json(songData);

  } catch (error) {
    console.error("Spotify API Error:", error);
    return res.status(500).json({ error: "Failed to fetch from Spotify" });
  }
}