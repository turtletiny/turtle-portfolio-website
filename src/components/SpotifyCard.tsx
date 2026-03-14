import { useEffect, useState } from "react";
import CardSectionIcon from "./CardSectionIcon";
import { Music } from "lucide-react";

export default function SpotifyCard() {
  const [song, setSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const fetchPlayingSong = async () => {
    try {
      const response = await fetch("/api/spotify");

      if (response.status === 204 || response.status > 400) {
        setIsPlaying(false);
        return;
      }

      const songData = await response.json();

      if (songData.item) {
        setIsPlaying(songData.is_playing);
        setProgress(songData.progress_ms);
        setSong({
          title: songData.item.name,
          artist: songData.item.artists
            .map((_artist: any) => _artist.name)
            .join(", "),
          albumArt: songData.item.album.images[0].url,
          songUrl: songData.item.external_urls.spotify,
          albumUrl: songData.item.album.external_urls.spotify,
          duration: songData.item.duration_ms,
        });
      } else {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    fetchPlayingSong();
    const interval = setInterval(fetchPlayingSong, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticker: NodeJS.Timeout;
    if (isPlaying && song) {
      ticker = setInterval(() => {
        setProgress((prev) => {
          if (prev >= song.duration) return song.duration;
          return prev + 1000;
        });
      }, 1000);
    }
    return () => clearInterval(ticker);
  }, [isPlaying, song]);

  const progressPercent = song ? (progress / song.duration) * 100 : 0;

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
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border border-border overflow-hidden flex-shrink-0 block shadow-sm hover:scale-110 transition-transform duration-300"
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

          <div className="flex flex-col gap-1.5 w-full px-1">
            <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(song.duration)}</span>
            </div>
            <div className="w-full h-1.5 bg-background/50 rounded-full overflow-hidden border border-border/50">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear spotify-progress"
                style={{ width: `${progressPercent}%` }}
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
              Spotify is currently paused.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
