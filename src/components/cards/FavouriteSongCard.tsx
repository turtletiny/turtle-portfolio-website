import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { SONGS } from "@/lib/songs";

export default function FavouriteSongCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const currentSong = SONGS[currentIndex];
  const songPositionLabel = `${currentIndex + 1}/${SONGS.length}`;
  const prevPreviewSong = SONGS[(currentIndex - 1 + SONGS.length) % SONGS.length];
  const nextPreviewSong = SONGS[(currentIndex + 1) % SONGS.length];

  // 60FPS animation loop for the progress bar
  const updateProgress = () => {
    if (audioRef.current && duration > 0) {
      const current = audioRef.current.currentTime;
      
      // 1. Smooth 60fps direct DOM update for the progress bar visual
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${current / duration})`;
      }
      
      // 2. 1fps React state update to keep the component in sync when paused
      setCurrentTime((prev) => {
        if (Math.floor(prev) !== Math.floor(current)) {
          return current;
        }
        return prev;
      });
    }
    rafRef.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    if (playing) {
      rafRef.current = requestAnimationFrame(updateProgress);
      audioRef.current?.play().catch(() => setPlaying(false));
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, duration]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = 0.5;
      setPlaying(true);
    }
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % SONGS.length);
    setPlaying(false);
    setCurrentTime(0);
    if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(0)`;
  };

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    setPlaying(false);
    setCurrentTime(0);
    if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(0)`;
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className="card-base flex flex-col w-full h-full p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="text-xs font-bold tracking-wider text-muted-foreground">
          CURRENT FAVOURITES
        </div>
        <div className="text-xs font-semibold text-muted-foreground/90 tabular-nums">
          {songPositionLabel}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-grow min-w-0">
        {/* Album Art */}
        <a
          href={currentSong.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[120px] h-[120px] sm:w-[110px] sm:h-[110px] rounded-xl flex-shrink-0 border border-border shadow-lg overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            src={currentSong.art}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        </a>

        {/* Right Side: Info, Controls, and Progress Bar */}
        <div className="flex flex-col justify-center w-full min-w-0 gap-3 sm:gap-4">
          
          {/* Top row: Text & Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full min-w-0 gap-3 sm:gap-0">
            {/* Song Info (Left) */}
            <div className="flex flex-col justify-center flex-1 min-w-0 text-center sm:text-left">
              <a
                href={currentSong.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lg sm:text-xl leading-tight text-foreground hover:text-primary transition-colors cursor-pointer break-words"
              >
                {currentSong.title}
              </a>
              <p className="text-muted-foreground text-sm mt-1 break-words">
                {currentSong.artist}
              </p>
            </div>

            {/* Controls (Right) */}
            <div className="relative flex items-center justify-center sm:justify-end gap-2 flex-shrink-0 w-full sm:w-auto">
              <div className="relative group/prev hidden md:block">
                <div
                  className="absolute left-1/2 top-0 z-20 min-w-[180px] max-w-[230px] -translate-x-1/2 -translate-y-full rounded-xl border bg-transparent px-3 py-2 opacity-0 pointer-events-none transition-all duration-300 group-hover/prev:-translate-y-[135%] group-hover/prev:opacity-100"
                  style={{ borderColor: "hsl(var(--card-hover-border))" }}
                >
                  <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    Previous in queue
                  </p>
                  <div className="mt-1.5 flex items-center gap-2.5 min-w-0">
                    <img
                      src={prevPreviewSong.art}
                      alt={prevPreviewSong.title}
                      className="h-10 w-10 rounded-md border border-border/70 object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-tight truncate">{prevPreviewSong.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{prevPreviewSong.artist}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={prevSong}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Previous"
                >
                  <SkipBack size={16} />
                </button>
              </div>

              <button
                onClick={prevSong}
                className="md:hidden p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Previous"
              >
                <SkipBack size={16} />
              </button>

              <button
                onClick={toggle}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0"
                style={{
                  backgroundColor: "hsl(var(--spotify-btn-bg))",
                  borderColor: "hsl(var(--spotify-btn-border))",
                  color: "hsl(var(--spotify-btn-text))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--spotify-btn-hover-bg))";
                  e.currentTarget.style.boxShadow = "var(--spotify-bar-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--spotify-btn-bg))";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {playing ? <Pause size={20} className="sm:w-6 sm:h-6" /> : <Play size={20} className="ml-0.5 sm:ml-1 sm:w-6 sm:h-6" />}
              </button>

              <div className="relative group/next hidden md:block">
                <div
                  className="absolute left-1/2 top-0 z-20 min-w-[180px] max-w-[230px] -translate-x-1/2 -translate-y-full rounded-xl border bg-transparent px-3 py-2 opacity-0 pointer-events-none transition-all duration-300 group-hover/next:-translate-y-[135%] group-hover/next:opacity-100"
                  style={{ borderColor: "hsl(var(--card-hover-border))" }}
                >
                  <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    Next in queue
                  </p>
                  <div className="mt-1.5 flex items-center gap-2.5 min-w-0">
                    <img
                      src={nextPreviewSong.art}
                      alt={nextPreviewSong.title}
                      className="h-10 w-10 rounded-md border border-border/70 object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-tight truncate">{nextPreviewSong.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{nextPreviewSong.artist}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextSong}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Next"
                >
                  <SkipForward size={16} />
                </button>
              </div>

              <button
                onClick={nextSong}
                className="md:hidden p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Next"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </div>

          {/* Progress Bar  */}
          <div className="flex flex-col gap-1.5 w-full px-1">
            
            <div className="w-full h-1.5 bg-background/50 rounded-full overflow-hidden border border-border/50">
              <div
                ref={progressBarRef}
                className="w-full h-full rounded-full origin-left spotify-progress"
                style={{ 
                  transform: `scaleX(${duration ? currentTime / duration : 0})` 
                }}
              />
            </div>
          </div>
          
        </div>
      </div>

      <audio
        ref={audioRef}
        key={currentSong.src}
        src={currentSong.src}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
          if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(0)`;
        }}
      />
    </div>
  );
}