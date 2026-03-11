import { useState, useEffect, useCallback } from "react";

const DISCORD_ID = "644484730070237215";

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    global_name: string | null;
    avatar: string | null;
    avatar_decoration_data?: { asset: string } | null;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{
    type: number;
    state?: string;
    name?: string;
  }>;
  spotify: {
    song: string;
    artist: string;
    album_art_url: string;
    timestamps: { start: number; end: number };
  } | null;
}

export function useLanyard() {
  const [data, setData] = useState<LanyardData | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      console.error("Lanyard fetch failed:", e);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return data;
}
