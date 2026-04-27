import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const LASTFM_USERNAME = process.env.LASTFM_USERNAME;
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

  if (!LASTFM_USERNAME || !LASTFM_API_KEY) {
    return res.status(500).json({ error: "Missing Last.fm API credentials" });
  }

  try {
    // 1. Fetch recent tracks from Last.fm
    const recentRes = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=5`
    );
    const recentData = await recentRes.json();

    // 2. Fetch top artists from Last.fm
    const artistsRes = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=1month&limit=4`
    );
    const artistsData = await artistsRes.json();

    const recentTracks = recentData.recenttracks?.track?.map((t: any) => ({
      name: t.name,
      artist: t.artist["#text"],
      image: t.image[2]["#text"],
      url: t.url,
      nowPlaying: t["@attr"]?.nowplaying === "true"
    })) || [];

    // 3. Fetch Real Artist Images from Deezer (Free & No Auth Required)
    const rawArtists = artistsData.topartists?.artist || [];
    
    const topArtists = await Promise.all(rawArtists.map(async (artist: any) => {
      try {
        // Search Deezer for the artist to get their real photo
        const deezerRes = await fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artist.name)}&limit=1`);
        const deezerData = await deezerRes.json();
        
        // Use the 'picture_medium' or 'picture_big' from Deezer
        const realImage = deezerData.data?.[0]?.picture_medium || '/blackearphones2.svg';

        return {
          name: artist.name,
          plays: parseInt(artist.playcount, 10),
          image: realImage,
          url: artist.url
        };
      } catch (e) {
        return {
          name: artist.name,
          plays: parseInt(artist.playcount, 10),
          image: '/blackearphones2.svg',
          url: artist.url
        };
      }
    }));

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({ recentTracks, topArtists });

  } catch (error) {
    console.error("Last.fm Stats API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}