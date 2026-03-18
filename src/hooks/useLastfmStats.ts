import { useState, useEffect } from 'react';

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
    fetch('/api/lastfm-stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Last.fm stats');
        return res.json();
      })
      .then(setData)
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}