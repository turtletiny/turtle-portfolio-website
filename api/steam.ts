import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const STEAM_API_KEY = process.env.STEAM_API_KEY;
  const STEAM_ID = process.env.VITE_STEAM_ID;

  if (!STEAM_API_KEY || !STEAM_ID) {
    return res.status(500).json({ error: "Missing Steam API credentials" });
  }

  try {
    // Generate a unique timestamp for each request
    const timestamp = Date.now();

    // Attach the timestamp to force steam cache
    const summaryPromise = fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}&t=${timestamp}`
    );

    const recentPromise = fetch(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&count=3&t=${timestamp}`
    );

    const [summaryResponse, recentResponse] = await Promise.all([summaryPromise, recentPromise]);
    
    const summaryData = await summaryResponse.json();
    const recentData = await recentResponse.json();

    const player = summaryData.response.players[0];
    const recentGames = recentData.response?.games || [];

    // Tell Vercel and the browser to cache for 60 seconds, then fetch fresh data
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      personaname: player.personaname,
      profileurl: player.profileurl,
      avatarfull: player.avatarfull,
      personastate: player.personastate,
      gameextrainfo: player.gameextrainfo || null,
      gameid: player.gameid || null,
      recentGames: recentGames.map((game: any) => ({
        appid: game.appid,
        name: game.name,
        playtime_2weeks: game.playtime_2weeks, 
        playtime_forever: game.playtime_forever, 
      }))
    });

  } catch (error) {
    console.error("Steam API Error:", error);
    return res.status(500).json({ error: "Failed to fetch from Steam API" });
  }
}