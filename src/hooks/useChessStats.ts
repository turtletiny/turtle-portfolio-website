import { useState, useEffect } from 'react';

const CACHE_TTL_MS = 5 * 60 * 1000;

interface ChessRating {
  last: { rating: number; date: number };
  best?: { rating: number; date: number };
  record: { win: number; loss: number; draw: number };
}

interface ChessStats {
  chess_rapid?: ChessRating;
  chess_blitz?: ChessRating;
  chess_bullet?: ChessRating;
  chess_daily?: ChessRating;
  tactics?: {
    highest: { rating: number; date: number };
    lowest: { rating: number; date: number };
  };
  puzzle_rush?: {
    best: { total_attempts: number; score: number };
  };
}

interface ChessProfile {
  username: string;
  avatar?: string;
  url: string;
}

const chessCache = new Map<string, {
  stats: ChessStats;
  profile: ChessProfile;
  fetchedAt: number;
}>();

export function useChessStats(username: string) {
  const [stats, setStats] = useState<ChessStats | null>(null);
  const [profile, setProfile] = useState<ChessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const cached = chessCache.get(username);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      setStats(cached.stats);
      setProfile(cached.profile);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchChessData() {
      try {
        setLoading(true);
        setError(null);

        const [profileRes, statsRes] = await Promise.all([
          fetch(`https://api.chess.com/pub/player/${username}`),
          fetch(`https://api.chess.com/pub/player/${username}/stats`)
        ]);

        if (!profileRes.ok || !statsRes.ok) {
          throw new Error('Failed to fetch Chess.com data');
        }

        const profileData = await profileRes.json();
        const statsData = await statsRes.json();

        setProfile(profileData);
        setStats(statsData);
        chessCache.set(username, {
          profile: profileData,
          stats: statsData,
          fetchedAt: Date.now(),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchChessData();
  }, [username]);

  return { stats, profile, loading, error };
}
