import { useState, useRef } from "react";
import { Play, Pause, Star } from "lucide-react";
import CardSectionIcon from "@/components/CardSectionIcon";
import albumArt from "@/assets/icedancer.jpg";

export default function FavouriteSongCard() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="card-base flex flex-col">
      <div className="text-xs font-bold tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
        <CardSectionIcon darkIcon={Star} pastelEmoji="⭐" /> CURRENT FAVOURITE
      </div>

      <div className="flex items-center gap-6 flex-grow">
        {/* Album Art */}
        <a href="https://open.spotify.com/album/0cT1SQDE7wSh1eUJkGFXse" target="_blank" rel="noopener noreferrer" className="w-[110px] h-[110px] rounded-xl flex-shrink-0 border border-border shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img src={albumArt} alt="Icedancer" className="w-full h-full object-cover" />
        </a>

        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col justify-center">
            <a href="https://open.spotify.com/track/6yaYV3wo595zZWFwhC8s5T" target="_blank" rel="noopener noreferrer" className="font-bold text-xl text-foreground hover:text-primary transition-colors cursor-pointer">
              Special Place
            </a>
            <p className="text-muted-foreground text-sm">Bladee ♡</p>
          </div>

          <button
            onClick={toggle}
            className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0 mr-6"
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
            {playing ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
        </div>
      </div>

      <audio ref={audioRef} src="/audio/special-place.mp3" onEnded={() => setPlaying(false)} />
    </div>
  );
}
