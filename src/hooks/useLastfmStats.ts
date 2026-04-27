import { useState, useEffect } from 'react';

const CACHE_TTL_MS = 5 * 60 * 1000;

let lastfmCache:
  | {
      data: LastfmData;
      fetchedAt: number;
    }
  | null = null;

export interface LastfmData {
  recentTracks: Array<{
    name: string;
    artist: string;
    image: string;
    url: string;
    nowPlaying: boolean;
  }>;
  topArtists: Array<{
    name: string;
    plays: number;
    image: string; // Added image
    url: string;   // Added url
  }>;
}

export function useLastfmStats() {
  const [data, setData] = useState<LastfmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (lastfmCache && Date.now() - lastfmCache.fetchedAt < CACHE_TTL_MS) {
      setData(lastfmCache.data);
      setLoading(false);
      setError(false);
      return;
    }

    fetch('/api/lastfm-stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Last.fm stats');
        return res.json();
      })
      .then((payload: LastfmData) => {
        lastfmCache = {
          data: payload,
          fetchedAt: Date.now(),
        };
        setData(payload);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}