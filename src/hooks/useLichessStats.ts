import { useState, useEffect } from 'react';

interface LichessPerf {
  games: number;
  rating: number;
  prog?: number;
}

interface LichessPerfRecord {
  wins: number;
  losses: number;
  draws: number;
}

interface LichessProfile {
  id: string;
  username: string;
  perfs: {
    blitz?: LichessPerf;
    rapid?: LichessPerf;
    bullet?: LichessPerf;
    puzzle?: LichessPerf;
  };
  perfStats?: {
    blitz?: LichessPerfRecord;
    rapid?: LichessPerfRecord;
    bullet?: LichessPerfRecord;
  };
  url: string;
}

export function useLichessStats(username: string) {
  const [profile, setProfile] = useState<LichessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLichessData() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`https://lichess.org/api/user/${username}`);
        if (!res.ok) {
          throw new Error('Failed to fetch Lichess data');
        }
        
        const data = await res.json();

        const perfTypes = ["rapid", "blitz", "bullet"] as const;
        const perfStatEntries = await Promise.all(
          perfTypes.map(async (perf) => {
            try {
              const perfRes = await fetch(
                `https://lichess.org/api/user/${username}/perf/${perf}`
              );

              if (!perfRes.ok) {
                return [perf, undefined] as const;
              }

              const perfData = await perfRes.json();
              const count = perfData?.stat?.count;

              if (
                typeof count?.win === "number" &&
                typeof count?.loss === "number" &&
                typeof count?.draw === "number"
              ) {
                return [
                  perf,
                  {
                    wins: count.win,
                    losses: count.loss,
                    draws: count.draw,
                  },
                ] as const;
              }

              return [perf, undefined] as const;
            } catch {
              return [perf, undefined] as const;
            }
          })
        );

        const perfStats = Object.fromEntries(perfStatEntries);

        setProfile({
          ...data,
          perfStats,
          url: `https://lichess.org/@/${username}`,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchLichessData();
    }
  }, [username]);

  return { profile, loading, error };
}
