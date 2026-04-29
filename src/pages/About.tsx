import DashboardNavbar from "@/components/navigation/DashboardNavbar";
import ThemeToggle from "@/components/theme/ThemeToggle";
import type { ReactNode } from "react";
import {
  Gamepad2,
  ScrollText,
  Code2,
  BookOpen,
  Tv,
  Palette,
  Timer,
  Zap,
  Rocket,
  Puzzle,
  Flame,
  Headphones,
} from "lucide-react";
import { useChessStats } from "@/hooks/useChessStats";
import { useLichessStats } from "@/hooks/useLichessStats";
import { Skeleton } from "@/components/ui/skeleton";
import { useLastfmStats } from "@/hooks/useLastfmStats";

const CHESS_USERNAME = "turtletinys";
const LICHESS_USERNAME = "Zappyy";

function ChessModeStatCard({
  href,
  icon,
  rating,
  label,
  hoverDetail,
}: {
  href: string;
  icon: ReactNode;
  rating: number;
  label: string;
  hoverDetail: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-3 bg-secondary rounded-lg border border-border min-h-[124px] overflow-hidden transition-all duration-150 hover:border-[hsl(var(--card-hover-border))] hover:[box-shadow:var(--card-hover-shadow)] hover:scale-[1.02] active:scale-[0.99]"
      aria-label={`${label} stats`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center transition-transform duration-150 ease-out group-hover:-translate-y-3">
        <div className="mb-1 transition-transform duration-150 ease-out scale-110 group-hover:scale-100 group-hover:-translate-y-0.5">{icon}</div>
        <span className="text-2xl font-bold text-primary transition-transform duration-150 ease-out group-hover:scale-90">{rating}</span>
      </div>

      <div className="absolute inset-x-0 bottom-2 flex flex-col items-center justify-end gap-0.5 text-center px-2 opacity-0 translate-y-2 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="text-xs font-bold">{hoverDetail}</span>
      </div>
    </a>
  );
}

export default function About() {
  const { stats, profile, loading, error } = useChessStats(CHESS_USERNAME);
  const {
    profile: lichessProfile,
    loading: lichessLoading,
    error: lichessError,
  } = useLichessStats(LICHESS_USERNAME);

  // Last.fm stats hook
  const {
    data: lastfmData,
    loading: lastfmLoading,
    error: lastfmError,
  } = useLastfmStats();

  const getRatingDisplay = (rating?: {
    last: { rating: number };
    record: { win: number; loss: number; draw: number };
  }) => {
    if (!rating) return null;
    return {
      rating: rating.last.rating,
      wins: rating.record.win,
      losses: rating.record.loss,
      draws: rating.record.draw,
    };
  };

  const rapid = getRatingDisplay(stats?.chess_rapid);
  const blitz = getRatingDisplay(stats?.chess_blitz);
  const bullet = getRatingDisplay(stats?.chess_bullet);

  return (
    <div className="min-h-screen flex flex-col items-center text-foreground font-main relative z-10">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[900px] flex flex-col gap-6 px-4 pb-12">
        {/* Coding Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <Code2 size={16} />
            STACK
          </div>

          <div className="overflow-x-auto px-1 py-2">
            <div className="flex w-max min-w-full flex-nowrap items-center justify-center gap-4">
            {[
              {
                name: "ReactJS",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
                url: "https://react.dev/",
              },
              {
                name: "TypeScript",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
                url: "https://www.typescriptlang.org/",
              },
              {
                name: "JavaScript",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
                url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
              },
              {
                name: "TailwindCSS",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
                url: "https://tailwindcss.com/",
              },
              {
                name: "Python",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
                url: "https://www.python.org/",
              },

              {
                name: "Java",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
                url: "https://dev.java/",
              },
            ].map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tech.name}
                title={tech.name}
                className="group inline-flex items-center justify-center transition-transform duration-150 hover:scale-[1.05] hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="h-8 w-8 object-contain opacity-90 transition-opacity group-hover:opacity-100 [.pastel_&]:contrast-125 [.pastel_&]:brightness-110 [.pastel_&]:drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                />
              </a>
            ))}
            </div>
          </div>
        </div>

        {/* Games Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <Gamepad2 size={16} className="block [.pastel_&]:hidden" />
            <img 
              src="/pixelcontroller.png" 
              alt="Games" 
              className="hidden [.pastel_&]:block w-6 h-6 object-contain" 
            />
            GAMES
          </div>

          {/* Featured Game */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Favourite Game
            </h3>
            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-secondary rounded-lg border border-border">
              {/* Featured Game Cover */}
              <a
                href="https://store.steampowered.com/app/1229490/ULTRAKILL/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-24 h-36 sm:w-28 sm:h-40 bg-card rounded flex-shrink-0 shadow-sm border border-border flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-150 group"
              >
                <img
                  src="/ultrakillcover.jpg"
                  alt="Ultrakill"
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </a>

              <div className="flex flex-col justify-start">
                <a
                  href="https://store.steampowered.com/app/1229490/ULTRAKILL/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xl mb-2 hover:text-primary transition-colors"
                >
                  ULTRAKILL
                </a>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  peak
                </p>
              </div>
            </div>
          </div>

          {/* 4 Games Grid */}
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Games I Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  title: "Valorant",
                  image: "/val.jpg",
                  url: "https://playvalorant.com/en-us/",
                },
                {
                  title: "Pokemon Platinum",
                  image: "/platinum.jpg",
                  url: "https://www.pokemon.com/us/pokemon-video-games/pokemon-platinum-version",
                },
                {
                  title: "Portal",
                  image: "/portal.jpg",
                  url: "https://store.steampowered.com/app/400/Portal/",
                },
                {
                  title: "Pokemon Omega Ruby",
                  image: "/omegaruby.jpg",
                  url: "https://www.pokemon.com/us/pokemon-video-games/pokemon-omega-ruby-and-pokemon-alpha-sapphire",
                },
              ].map((game, i) => (
                <a
                  key={i}
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 group transition-transform duration-150 hover:scale-105"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary border border-border transition-all group-hover:shadow-xl group-hover:border-primary/20">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium truncate text-center transition-colors">
                    {game.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Listening Stats Card */}
        <div className="card-base flex flex-col gap-6">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2">
            <Headphones size={16} className="block [.pastel_&]:hidden" />
            <img 
              src="/pixelheadphones.png" 
              alt="Listening Stats" 
              className="hidden [.pastel_&]:block w-5 h-5 object-contain" 
            />
            LISTENING STATS
          </div>

          {lastfmLoading ? (
            <div className="flex items-center justify-center py-10 animate-pulse">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Headphones size={18} className="block [.pastel_&]:hidden" />
                <img
                  src="/pixelheadphones.png"
                  alt="Last.fm"
                  className="hidden [.pastel_&]:block w-[18px] h-[18px] object-contain"
                />
                <span>Connecting to Last.fm stats...</span>
              </div>
            </div>
          ) : lastfmError ? (
            <p className="text-destructive">Failed to load Last.fm stats</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Recently Played List */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Recently Played
                </h3>
                <div className="flex flex-col gap-3">
                  {lastfmData?.recentTracks.slice(0, 5).map((track, i) => (
                    <a
                      key={i}
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 bg-secondary rounded-lg border border-border hover:border-[hsl(var(--card-hover-border))] hover:[box-shadow:var(--card-hover-shadow)] transition-all hover:scale-[1.02] group shadow-sm"
                    >
                      <div className="w-12 h-12 rounded bg-card flex-shrink-0 overflow-hidden shadow-sm relative border border-border">
                        <img
                          src={track.image || "/blackearphones2.svg"}
                          alt={track.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center overflow-hidden w-full">
                        <span className="font-bold text-sm truncate transition-colors">
                          {track.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {track.artist}
                        </span>
                      </div>
                      {track.nowPlaying && (
                        <div className="ml-auto flex items-center gap-2 px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-full">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          Live
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Top Artists Grid (2x2) */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Top Artists (This Month)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {lastfmData?.topArtists.slice(0, 4).map((artist, i) => (
                    <a
                      key={i}
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-square rounded-lg overflow-hidden group transition-all duration-150 hover:scale-105 border border-border shadow-sm"
                    >
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                      <div className="absolute bottom-0 left-0 p-3 flex flex-col w-full">
                        <span className="font-bold text-sm text-white truncate">
                          {artist.name}
                        </span>
                        <span className="text-[10px] text-gray-300 uppercase tracking-tight font-medium">
                          {artist.plays} Plays
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chess Card */}
        <div className="card-base flex flex-col gap-6">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2">
            <img
              src="/chess-dark.svg"
              alt="Chess"
              className="block [.pastel_&]:hidden w-4 h-4 object-contain"
            />
            <img
              src="/pixelchess.png"
              alt="Chess"
              className="hidden [.pastel_&]:block w-5 h-5 object-contain"
            />
            CHESS
          </div>

          {/* Chess.com */}
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                </div>
              </div>
            ) : error ? (
              <p className="text-destructive">Failed to load Chess.com stats</p>
            ) : (
              <>
                <a
                  href={profile?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit p-2 pr-3 bg-secondary border border-border rounded-lg hover:border-[hsl(var(--card-hover-border))] hover:[box-shadow:var(--card-hover-shadow)] hover:scale-[1.05] active:scale-[0.97] transition-all duration-150 group shadow-sm"
                >
                  <span className="text-lg font-bold pl-1">
                    {profile?.username}
                  </span>
                  <span>
                    <img
                      src="/chesscom.png"
                      alt="Chess.com"
                      className="h-6 w-auto object-contain"
                    />
                  </span>
                </a>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {rapid && (
                    <ChessModeStatCard
                      href={`https://www.chess.com/stats/live/rapid/${CHESS_USERNAME}`}
                      icon={
                        <Timer
                          size={24}
                          className="text-green-500"
                          strokeWidth={2.5}
                        />
                      }
                      rating={rapid.rating}
                      label="Rapid"
                      hoverDetail={`${rapid.wins}W / ${rapid.losses}L`}
                    />
                  )}
                  {blitz && (
                    <ChessModeStatCard
                      href={`https://www.chess.com/stats/live/blitz/${CHESS_USERNAME}`}
                      icon={
                        <Zap
                          size={24}
                          className="text-blue-500 dark:text-yellow-400"
                          fill="currentColor"
                        />
                      }
                      rating={blitz.rating}
                      label="Blitz"
                      hoverDetail={`${blitz.wins}W / ${blitz.losses}L`}
                    />
                  )}
                  {bullet && (
                    <ChessModeStatCard
                      href={`https://www.chess.com/stats/live/bullet/${CHESS_USERNAME}`}
                      icon={
                        <Rocket
                          size={24}
                          className="text-amber-500"
                          fill="currentColor"
                        />
                      }
                      rating={bullet.rating}
                      label="Bullet"
                      hoverDetail={`${bullet.wins}W / ${bullet.losses}L`}
                    />
                  )}
                  {stats?.puzzle_rush && (
                    <ChessModeStatCard
                      href={`https://www.chess.com/stats/puzzles/rush/${CHESS_USERNAME}`}
                      icon={
                        <Flame
                          size={24}
                          className="text-red-500"
                          fill="currentColor"
                        />
                      }
                      rating={stats.puzzle_rush.best.score}
                      label="Puzzle Rush"
                      hoverDetail={`${stats.puzzle_rush.best.total_attempts} Plays`}
                    />
                  )}
                  {stats?.tactics && (
                    <ChessModeStatCard
                      href={`https://www.chess.com/stats/puzzles/${CHESS_USERNAME}`}
                      icon={
                        <Puzzle
                          size={24}
                          className="text-orange-500"
                          fill="currentColor"
                        />
                      }
                      rating={stats.tactics.highest.rating}
                      label="Puzzles"
                      hoverDetail="Puzzles"
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {/* Row 2: Lichess and Video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Lichess */}
            <div className="flex flex-col gap-3">
              {lichessLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-24 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg" />
                  </div>
                </div>
              ) : lichessError ? (
                <p className="text-destructive">Failed to load Lichess stats</p>
              ) : (
                <>
                  <a
                    href={lichessProfile?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-fit p-2 pr-3 bg-secondary border border-border rounded-lg hover:border-[hsl(var(--card-hover-border))] hover:[box-shadow:var(--card-hover-shadow)] hover:scale-[1.05] active:scale-[0.97] transition-all duration-150 group shadow-sm"
                  >
                    <span className="text-lg font-bold pl-1">
                      {lichessProfile?.username}
                    </span>
                    <span className="flex items-center gap-1">
                      <img
                        src="/lichesswhite.svg"
                        alt="Lichess"
                        className="h-6 w-auto object-contain block [.pastel_&]:hidden"
                      />
                      <img
                        src="/lichess.svg"
                        alt="Lichess"
                        className="h-6 w-auto object-contain hidden [.pastel_&]:block"
                      />
                      <span className="text-lg font-bold pl-1">
                        lichess.org
                      </span>
                    </span>
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    {lichessProfile?.perfs?.rapid && (
                      <ChessModeStatCard
                        href={`https://lichess.org/@/${LICHESS_USERNAME}/perf/rapid`}
                        icon={
                          <Timer
                            size={24}
                            className="text-green-500"
                            strokeWidth={2.5}
                          />
                        }
                        rating={lichessProfile.perfs.rapid.rating}
                        label="Rapid"
                        hoverDetail={
                          lichessProfile.perfStats?.rapid
                            ? `${lichessProfile.perfStats.rapid.wins}W / ${lichessProfile.perfStats.rapid.losses}L`
                            : `${lichessProfile.perfs.rapid.games} Games`
                        }
                      />
                    )}
                    {lichessProfile?.perfs?.blitz && (
                      <ChessModeStatCard
                        href={`https://lichess.org/@/${LICHESS_USERNAME}/perf/blitz`}
                        icon={
                          <Zap
                            size={24}
                            className="text-blue-500 dark:text-yellow-400"
                            fill="currentColor"
                          />
                        }
                        rating={lichessProfile.perfs.blitz.rating}
                        label="Blitz"
                        hoverDetail={
                          lichessProfile.perfStats?.blitz
                            ? `${lichessProfile.perfStats.blitz.wins}W / ${lichessProfile.perfStats.blitz.losses}L`
                            : `${lichessProfile.perfs.blitz.games} Games`
                        }
                      />
                    )}
                    {lichessProfile?.perfs?.bullet && (
                      <ChessModeStatCard
                        href={`https://lichess.org/@/${LICHESS_USERNAME}/perf/bullet`}
                        icon={
                          <Rocket
                            size={24}
                            className="text-amber-500"
                            fill="currentColor"
                          />
                        }
                        rating={lichessProfile.perfs.bullet.rating}
                        label="Bullet"
                        hoverDetail={
                          lichessProfile.perfStats?.bullet
                            ? `${lichessProfile.perfStats.bullet.wins}W / ${lichessProfile.perfStats.bullet.losses}L`
                            : `${lichessProfile.perfs.bullet.games} Games`
                        }
                      />
                    )}
                    {lichessProfile?.perfs?.puzzle && (
                      <ChessModeStatCard
                        href={`https://lichess.org/training/dashboard/90/dashboard?u=${LICHESS_USERNAME}`}
                        icon={
                          <Puzzle
                            size={24}
                            className="text-orange-500"
                            fill="currentColor"
                          />
                        }
                        rating={lichessProfile.perfs.puzzle.rating}
                        label="Puzzles"
                        hoverDetail={`${lichessProfile.perfs.puzzle.games} Plays`}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Video  */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-lg">
                Favorite Opening: Smith-Morra Gambit
              </h3>
              <div className="w-full aspect-square sm:aspect-[4/3] bg-secondary rounded-lg border border-border flex items-center justify-center overflow-hidden">
                <img
                  src="/morra.gif"
                  alt="Smith-Morra Gambit"
                  className="w-full h-full object-cover sm:object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Anime Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2">
              <Tv size={16} className="block [.pastel_&]:hidden" />
              <img 
                src="/pixelgojo.png" 
                alt="Anime" 
                className="hidden [.pastel_&]:block w-8 h-8 object-contain" 
              />
              ANIME
            </div>

            {/* Anilist Link*/}
            <a
              href="https://anilist.co/user/turtletiny/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-150 origin-right"
            >
              <img
                src="/anilist.png"
                alt="AniList Logo"
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
              <span>My AniList Profile</span>
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Currently Watching
            </h3>
            <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg border border-border">
              <div className="w-16 h-24 bg-card rounded flex-shrink-0 shadow-sm border border-border flex items-center justify-center overflow-hidden">
                <img
                  src="/pochitavibe.gif"
                  alt="None currently"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center h-24">
                <h3 className="font-bold text-lg">None Currently </h3>
                <p className="text-sm text-muted-foreground">
                  Would like watch JJK Season 3 and CSM when they release if I
                  have time :D{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              All-time Favourites
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  title: "Death Note",
                  image: "deathnote.jpg",
                  url: "https://anilist.co/anime/1535/Death-Note/",
                },
                {
                  title: "Odd Taxi",
                  image: "oddtaxi.png",
                  url: "https://anilist.co/anime/128547/ODDTAXI/",
                },
                {
                  title: "Cyberpunk: Edgerunners",
                  image: "cyberpunk.jpg",
                  url: "https://anilist.co/anime/120377/Cyberpunk-Edgerunners/",
                },
                {
                  title: "Spirited Away",
                  image: "spiritedaway.jpg",
                  url: "https://anilist.co/anime/199/Spirited-Away/",
                },
              ].map((anime, i) => (
                <a
                  key={i}
                  href={anime.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 group transition-transform duration-150 hover:scale-105"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary border border-border transition-all group-hover:shadow-xl group-hover:border-primary/20">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="text-sm font-medium truncate text-center transition-colors"
                    title={anime.title}
                  >
                    {anime.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>


        {/* Hobbies Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <Palette size={16} className="block [.pastel_&]:hidden" />
            <img 
              src="/mario.png" 
              alt="Hobbies" 
              className="hidden [.pastel_&]:block w-5 h-5 object-contain" 
            />
            FUTURE HOBBIES
          </div>
          <p className="text-muted-foreground mb-4">
            Things I would like to get into eventually:{" "}
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium">
              Drawing
            </div>
            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium">
              Animation
            </div>
            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium">
              Blender
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}