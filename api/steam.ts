import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const STEAM_API_KEY = process.env.STEAM_API_KEY;
  const STEAM_ID = process.env.STEAM_ID || process.env.VITE_STEAM_ID;

  if (!STEAM_API_KEY || !STEAM_ID) {
    return res.status(500).json({ error: "Missing Steam API credentials" });
  }

  try {
    const summaryPromise = fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}&format=json`
    );

    const recentPromise = fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&count=3&format=json`
    );

    const [summaryResponse, recentResponse] = await Promise.allSettled([summaryPromise, recentPromise]);

    if (summaryResponse.status !== 'fulfilled' || !summaryResponse.value.ok) {
      throw new Error('Failed to fetch Steam profile summary');
    }

    const summaryData = await summaryResponse.value.json();
    const recentData =
      recentResponse.status === 'fulfilled' && recentResponse.value.ok
        ? await recentResponse.value.json()
        : { response: { games: [] } };

    const player = summaryData.response.players[0];
    if (!player) {
      throw new Error('Steam player not found for configured ID');
    }

    let recentGames = recentData.response?.games || [];

    // Steam's recently played endpoint only covers the last 2 weeks.
    // Fallback to owned games sorted by last played so the UI still has useful data.
    if (recentGames.length === 0) {
      const ownedResponse = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=1&include_played_free_games=1&format=json`
      );

      if (ownedResponse.ok) {
        const ownedData = await ownedResponse.json();
        const ownedGames = ownedData.response?.games || [];
        recentGames = ownedGames
          .filter((game: any) => game?.name)
          .sort((a: any, b: any) => (b.rtime_last_played || 0) - (a.rtime_last_played || 0))
          .slice(0, 3)
          .map((game: any) => ({
            appid: game.appid,
            name: game.name,
            playtime_2weeks: game.playtime_2weeks || 0,
            playtime_forever: game.playtime_forever || 0,
          }));
      }
    }


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