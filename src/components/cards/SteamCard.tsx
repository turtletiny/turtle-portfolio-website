import { useEffect, useState } from "react";

interface RecentlyPlayedGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
}

interface SteamData {
  personaname: string;
  profileurl: string;
  avatarfull: string;
  personastate: number;
  gameextrainfo?: string;
  gameid?: string;
  recentGames?: RecentlyPlayedGame[];
}

// Your custom SVG integrated as a React component!
const SteamIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={`bi bi-steam ${className}`} 
    viewBox="0 0 16 16"
  >  
    <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z"/>  
    <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048"/>
  </svg>
);

export default function SteamCard() {
  const [steamData, setSteamData] = useState<SteamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteamData = async () => {
      try {
        const response = await fetch("/api/steam");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setSteamData(data);
      } catch (error) {
        console.error("Error loading Steam data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSteamData();
    const interval = setInterval(fetchSteamData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusText = (state: number) => {
    if (state === 0) return "Offline";
    if (state === 1) return "Online";
    if (state === 2) return "Busy";
    if (state === 3) return "Away";
    if (state === 4) return "Snooze";
    return "Online";
  };

  const getStatusColor = (state: number, playing: boolean) => {
    if (playing) return "bg-green-500";
    if (state === 0) return "bg-status-offline";
    if (state === 1) return "bg-status-online";
    if (state === 2) return "bg-status-dnd";
    if (state === 3 || state === 4) return "bg-status-idle";
    return "bg-status-offline";
  };

  return (
    <div className="card-base flex flex-col gap-4">
      {/* Header section with your SVG */}
      <div className="text-xs font-bold tracking-wider text-muted-foreground mb-1 flex items-center gap-2">
        <SteamIcon size={16} /> STEAM ACTIVITY
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8 animate-pulse">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            {/* Loading state with your SVG scaled up */}
            <SteamIcon size={32} className="opacity-40" />
            <p className="text-sm">Connecting to Steam...</p>
          </div>
        </div>
      ) : !steamData ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            {/* Error state with your SVG scaled up */}
            <SteamIcon size={32} className="opacity-40" />
            <p className="text-sm">Steam data unavailable</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col transition-all">
          {/* Profile & Current Game */}
          <div className="flex items-center gap-4">
            {/* Avatar & Status Dot */}
            <a
              href={steamData.profileurl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-14 h-14 rounded-lg overflow-visible flex-shrink-0 group"
            >
              <div className="w-full h-full rounded-lg overflow-hidden border border-border shadow-sm group-hover:scale-110 transition-transform duration-300">
                <img
                  src={steamData.avatarfull}
                  alt={steamData.personaname}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full border-[3px] border-card z-10 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[1px] group-hover:translate-y-[1px] ${getStatusColor(steamData.personastate, !!steamData.gameextrainfo)}`}
              />
            </a>

            <div className="flex flex-col justify-center overflow-hidden">
              <a
                href={steamData.profileurl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-base truncate hover:text-primary transition-colors"
              >
                {steamData.personaname}
              </a>

              {steamData.gameextrainfo ? (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Currently Playing
                  </span>

                  <span className="text-sm font-bold text-foreground truncate">
                    {steamData.gameextrainfo}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {getStatusText(steamData.personastate)}
                </p>
              )}
            </div>

            {/* Banner Game Icon  */}
            {steamData.gameid && (
              <a
                href={`https://store.steampowered.com/app/${steamData.gameid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex-shrink-0 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${steamData.gameid}/header.jpg`}
                  alt="Current Game"
                  className="w-24 sm:w-28 h-auto aspect-[460/215] rounded object-cover border border-border shadow-sm"
                />
              </a>
            )}
          </div>

          {/* Recently Played */}
          {steamData.recentGames && steamData.recentGames.length > 0 && (
            <div className="mt-5 pt-4 border-t border-border flex flex-col gap-3">
              <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2">
                RECENTLY PLAYED
              </div>
              <div className="flex flex-col gap-2">
                {steamData.recentGames.slice(0, 2).map((game) => (
                  <a
                    key={game.appid}
                    href={`https://store.steampowered.com/app/${game.appid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group hover:bg-secondary/50 p-2 -mx-2 rounded-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <img
                      src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
                      alt={game.name}
                      className="w-20 sm:w-24 h-auto aspect-[460/215] rounded border border-border/50 object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {game.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {(game.playtime_forever / 60).toFixed(1)} hrs on record
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}