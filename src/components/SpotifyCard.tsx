import { useEffect, useState, useRef } from "react";

// 1. Added a clean SVG component for the Spotify Logo
const SpotifyIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-72.5-47-164.2-55.6-241.1-34.8-4.2 1.3-9.1 2.9-12.6 2.9-12.3 0-20.1-9.4-20.1-20.1 0-11.3 6.1-17.8 15.8-20.4 89.6-24.3 192.5-13.6 276.5 40.8 5.8 3.9 9.4 8.7 9.4 16.5 0 12.3-10.4 19.3-15.6 19.3zm32.7-72.6c-7.1 0-11-2.9-15.2-5.5-84.4-55.3-206.4-66.3-289.4-42.4-4.5 1.3-9.4 2.9-13.9 2.9-14.2 0-23.3-10.7-23.3-23.3 0-12.6 7.1-20.1 17.5-23.3 97.4-28.1 234.3-15.5 330.6 47.9 6.5 4.5 11 10.4 11 19.4.1 14.6-11.3 24.3-17.3 24.3z"/>
  </svg>
);

export default function SpotifyCard() {
  const [song, setSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(180000);

  // Refs for smooth 60fps animation
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const lastSyncTimeRef = useRef<number>(Date.now());
  const baseProgressRef = useRef<number>(0);

  const fetchPlayingSong = async () => {
    try {
      const response = await fetch("/api/spotify");
      const songData = await response.json();

      if (songData.is_playing && songData.item) {
        setIsPlaying(true);
        const newTitle = songData.item.name;
        const realDuration = songData.item.duration_ms || 180000;

        setSong((prevSong: any) => {
          const isNewSong = !prevSong || prevSong.title !== newTitle;

          if (isNewSong) {
            
            baseProgressRef.current = songData.progress_ms !== undefined ? songData.progress_ms : Math.floor(Math.random() * 15000);
            lastSyncTimeRef.current = Date.now();
            setDuration(realDuration);
          } else if (songData.progress_ms !== undefined) {
            
            baseProgressRef.current = songData.progress_ms;
            lastSyncTimeRef.current = Date.now();
            setDuration(realDuration);
          }

          const artistString = songData.item.artists
            .map((_artist: any) => _artist.name)
            .join(", ");

          return {
            title: newTitle,
            artist: artistString,
            albumArt: songData.item.album.images[0].url,
            songUrl: `https://open.spotify.com/search/${encodeURIComponent(`${newTitle} ${artistString}`)}`,
            albumUrl: `https://open.spotify.com/search/${encodeURIComponent(`${songData.item.album?.name || newTitle} ${artistString}`)}`,
          };
        });
      } else {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error fetching audio data:", error);
      setIsPlaying(false);
    }
  };

  // Poll Last.fm/Spotify API every 15s
  useEffect(() => {
    fetchPlayingSong();
    const interval = setInterval(fetchPlayingSong, 15000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const updateProgress = () => {
      if (isPlaying && duration > 0) {
        const elapsed = Date.now() - lastSyncTimeRef.current;
        const currentMs = Math.min(baseProgressRef.current + elapsed, duration);

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${currentMs / duration})`;
        }
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, duration]);

  return (
    <div className="card-base flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2">
          {/* 2. Theme-swapping icons for the header */}
          <SpotifyIcon size={16} className="block [.pastel_&]:hidden" />
          <img 
            src="pixelmusic.png" 
            alt="Now Playing" 
            className="hidden [.pastel_&]:block w-4 h-4 object-contain" 
          />
          NOW PLAYING
        </div>

        {isPlaying && (
          <div className="flex items-end gap-[2px] h-3">
            <span className="w-1 bg-[hsl(var(--spotify-bar))] rounded-sm animate-[bounce_1s_infinite] origin-bottom h-full" />
            <span className="w-1 bg-[hsl(var(--spotify-bar))] rounded-sm animate-[bounce_1.2s_infinite_0.2s] origin-bottom h-2/3" />
            <span className="w-1 bg-[hsl(var(--spotify-bar))] rounded-sm animate-[bounce_0.8s_infinite_0.4s] origin-bottom h-full" />
          </div>
        )}
      </div>

      {isPlaying && song ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <a
              href={song.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-md border border-border overflow-hidden flex-shrink-0 block shadow-sm hover:scale-110 transition-transform duration-300"
            >
              <img
                src={song.albumArt}
                alt="Album Art"
                className="w-full h-full object-cover"
              />
            </a>

            <div className="flex flex-col justify-center overflow-hidden w-full">
              <a
                href={song.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-base truncate transition-colors w-fit max-w-full hover:text-green-500 pastel:hover:text-[hsl(var(--spotify-bar))]"
              >
                {song.title}
              </a>
              <p className="text-sm text-muted-foreground truncate">
                {song.artist}
              </p>
            </div>
          </div>

          {/* Progress Bar*/}
          <div className="flex flex-col gap-1.5 w-full px-1">
            <div className="w-full h-1.5 bg-background/50 rounded-full overflow-hidden border border-border/50">
              <div
                ref={progressBarRef}
                className="w-full h-full rounded-full origin-left spotify-progress"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg border border-border border-dashed">
          <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center text-muted-foreground shadow-inner">
            {/* 3. Theme-swapping icons for the empty state */}
            <SpotifyIcon size={20} className="block [.pastel_&]:hidden" />
            <img 
              src="pixelmusic.png" 
              alt="Not Playing" 
              className="hidden [.pastel_&]:block w-5 h-5 object-contain opacity-70" 
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-muted-foreground">
              Not playing anything
            </h3>
            <p className="text-xs text-muted-foreground/70">
              Activity is currently paused.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}