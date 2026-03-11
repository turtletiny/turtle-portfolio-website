import { useState, useEffect } from 'react';

interface LichessPerf {
  games: number;
  rating: number;
  prog?: number;
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
        setProfile({ ...data, url: `https://lichess.org/@/${username}` });
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
