import { useEffect, useState, useRef } from "react";
import CardSectionIcon from "./CardSectionIcon";
import { Music } from "lucide-react";

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
            songUrl: `https://open.spotify.com/search/$${encodeURIComponent(`${newTitle} ${artistString}`)}`,
            albumUrl: `https://open.spotify.com/search/$${encodeURIComponent(`${songData.item.album?.name || newTitle} ${artistString}`)}`,
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
          <CardSectionIcon darkIcon={Music} pastelEmoji="🎵" /> NOW PLAYING
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
            <Music size={20} />
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