import { useState, useEffect } from 'react';

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

export function useChessStats(username: string) {
  const [stats, setStats] = useState<ChessStats | null>(null);
  const [profile, setProfile] = useState<ChessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchChessData();
    }
  }, [username]);

  return { stats, profile, loading, error };
}
