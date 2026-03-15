import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import {
  User,
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
} from "lucide-react";
import { useChessStats } from "@/hooks/useChessStats";
import { useLichessStats } from "@/hooks/useLichessStats";
import { Skeleton } from "@/components/ui/skeleton";

const CHESS_USERNAME = "turtletinys";
const LICHESS_USERNAME = "Zappyy";

export default function About() {
  const { stats, profile, loading, error } = useChessStats(CHESS_USERNAME);
  const {
    profile: lichessProfile,
    loading: lichessLoading,
    error: lichessError,
  } = useLichessStats(LICHESS_USERNAME);

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
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground font-main">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[900px] flex flex-col gap-6 px-4 pb-12">
        {/* Intro Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={User} pastelEmoji="👋" /> ABOUT ME
          </div>
          <h1 className="text-3xl font-bold">Hi, I'm Daniel.</h1>
          <p className="text-muted-foreground leading-relaxed">
            I'm a 19 year old CS student from Sydney, Australia. I made this
            website to gain experience with web development and as a medium to
            express a bit of my personality through some of my interests that
            I'm passionate about!
          </p>
        </div>

        {/* Games Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Gamepad2} pastelEmoji="🎮" /> GAMES
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
                className="w-24 h-36 sm:w-28 sm:h-40 bg-card rounded flex-shrink-0 shadow-sm border border-border flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 group"
              >
                <img
                  src="ultrakillcover.jpg"
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
              {" "}
              Games I Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  title: "Valorant",
                  image: "val.jpg",
                  url: "https://playvalorant.com/en-us/",
                },
                {
                  title: "Pokemon Platinum",
                  image: "platinum.jpg",
                  url: "https://www.pokemon.com/us/pokemon-video-games/pokemon-platinum-version",
                },
                {
                  title: "Portal",
                  image: "portal.jpg",
                  url: "https://store.steampowered.com/app/400/Portal/",
                },
                {
                  title: "Pokemon Omega Ruby",
                  image: "omegaruby.jpg",
                  url: "https://www.pokemon.com/us/pokemon-video-games/pokemon-omega-ruby-and-pokemon-alpha-sapphire",
                },
              ].map((game, i) => (
                <a
                  key={i}
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 group transition-transform duration-300 hover:scale-105"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary border border-border transition-all group-hover:shadow-xl group-hover:border-primary/20">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium truncate text-center group-hover:text-primary transition-colors">
                    {game.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Chess Card */}
        <div className="card-base flex flex-col gap-6">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2">
            <CardSectionIcon darkIcon={ScrollText} pastelEmoji="♟️" /> CHESS
          </div>

          {/*  Chess.com */}
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
                  className="flex items-center gap-3 w-fit p-2 pr-3 bg-secondary border border-border rounded-lg hover:border-primary hover:scale-[1.05] active:scale-[0.97] transition-all duration-300 group shadow-sm"
                >
                  <span className="text-lg font-bold pl-1 group-hover:text-primary transition-colors">
                    {profile?.username}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded shadow-sm">
                    Chess.com
                  </span>
                </a>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {rapid && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Timer
                        size={24}
                        className="text-green-500 mb-1"
                        strokeWidth={2.5}
                      />
                      <span className="text-xl font-bold text-primary">
                        {rapid.rating}
                      </span>
                      <span className="text-xs font-medium">Rapid</span>
                      <span className="text-[10px] text-muted-foreground">
                        {rapid.wins}W / {rapid.losses}L
                      </span>
                    </div>
                  )}
                  {blitz && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Zap
                        size={24}
                        className="text-blue-500 dark:text-yellow-400 mb-1"
                        fill="currentColor"
                      />
                      <span className="text-xl font-bold text-primary">
                        {blitz.rating}
                      </span>
                      <span className="text-xs font-medium">Blitz</span>
                      <span className="text-[10px] text-muted-foreground">
                        {blitz.wins}W / {blitz.losses}L
                      </span>
                    </div>
                  )}
                  {bullet && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Rocket
                        size={24}
                        className="text-amber-500 mb-1"
                        fill="currentColor"
                      />
                      <span className="text-xl font-bold text-primary">
                        {bullet.rating}
                      </span>
                      <span className="text-xs font-medium">Bullet</span>
                      <span className="text-[10px] text-muted-foreground">
                        {bullet.wins}W / {bullet.losses}L
                      </span>
                    </div>
                  )}
                  {stats?.puzzle_rush && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Flame
                        size={24}
                        className="text-red-500 mb-1"
                        fill="currentColor"
                      />
                      <span className="text-xl font-bold text-primary">
                        {stats.puzzle_rush.best.score}
                      </span>
                      <span className="text-xs font-medium">Puzzle Rush</span>
                    </div>
                  )}
                  {stats?.tactics && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Puzzle
                        size={24}
                        className="text-orange-500 mb-1"
                        fill="currentColor"
                      />
                      <span className="text-xl font-bold text-primary">
                        {stats.tactics.highest.rating}
                      </span>
                      <span className="text-xs font-medium">Puzzles</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Row 2: Lichess and Video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Lichess */}
            <div className="flex flex-col gap-3">
              {/* ... existing lichessLoading logic ... */}
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
                    className="flex items-center gap-3 w-fit p-2 pr-3 bg-secondary border border-border rounded-lg hover:border-primary hover:scale-[1.05] active:scale-[0.97] transition-all duration-300 group shadow-sm"
                  >
                    <span className="text-lg font-bold pl-1 group-hover:text-primary transition-colors">
                      {lichessProfile?.username}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded shadow-sm">
                      Lichess
                    </span>
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    {/* ... existing perfs mapping ... */}
                    {lichessProfile?.perfs?.rapid && (
                      <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                        <Timer
                          size={24}
                          className="text-green-500 mb-1"
                          strokeWidth={2.5}
                        />
                        <span className="text-xl font-bold text-primary">
                          {lichessProfile.perfs.rapid.rating}
                        </span>
                        <span className="text-xs font-medium">Rapid</span>
                        <span className="text-[10px] text-muted-foreground">
                          {lichessProfile.perfs.rapid.games} Games
                        </span>
                      </div>
                    )}
                    {lichessProfile?.perfs?.blitz && (
                      <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                        <Zap
                          size={24}
                          className="text-blue-500 dark:text-yellow-400 mb-1"
                          fill="currentColor"
                        />
                        <span className="text-xl font-bold text-primary">
                          {lichessProfile.perfs.blitz.rating}
                        </span>
                        <span className="text-xs font-medium">Blitz</span>
                        <span className="text-[10px] text-muted-foreground">
                          {lichessProfile.perfs.blitz.games} Games
                        </span>
                      </div>
                    )}
                    {lichessProfile?.perfs?.bullet && (
                      <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                        <Rocket
                          size={24}
                          className="text-amber-500 mb-1"
                          fill="currentColor"
                        />
                        <span className="text-xl font-bold text-primary">
                          {lichessProfile.perfs.bullet.rating}
                        </span>
                        <span className="text-xs font-medium">Bullet</span>
                        <span className="text-[10px] text-muted-foreground">
                          {lichessProfile.perfs.bullet.games} Games
                        </span>
                      </div>
                    )}
                    {lichessProfile?.perfs?.puzzle && (
                      <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                        <Puzzle
                          size={24}
                          className="text-orange-500 mb-1"
                          fill="currentColor"
                        />
                        <span className="text-xl font-bold text-primary">
                          {lichessProfile.perfs.puzzle.rating}
                        </span>
                        <span className="text-xs font-medium">Puzzles</span>
                        <span className="text-[10px] text-muted-foreground">
                          {lichessProfile.perfs.puzzle.games} Plays
                        </span>
                      </div>
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

        {/* Coding Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Code2} pastelEmoji="💻" /> STACK
          </div>
          <h2 className="text-xl font-bold mb-1">Programming</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            I love both the problem solving aspect of programming and as a
            creative outlet in designing and planning. I find being able to build
            things I actually want to use and looking at the final product
            very rewarding
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              {
                name: "React",
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
                name: "Tailwind",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
                url: "https://tailwindcss.com/",
              },
              {
                name: "Python",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
                url: "https://www.python.org/",
              },
              {
                name: "Pygame",
                img: "pygame_ce_tiny.png",
                url: "https://pyga.me/",
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
                className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-2 hover:border-primary transition-all hover:scale-105 group"
              >
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm object-contain"
                />
                <span className="font-bold text-sm">{tech.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Anime Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2">
              <CardSectionIcon darkIcon={Tv} pastelEmoji="📺" /> ANIME
            </div>

            {/* Clickable AniList Image + Text with Smooth Grow */}
            <a
              href="https://anilist.co/user/turtletiny/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300 origin-right"
            >
              <img
                src="anilist.png"
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
                  src="pochitavibe.gif"
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
                  className="flex flex-col gap-2 group transition-transform duration-300 hover:scale-105"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary border border-border transition-all group-hover:shadow-xl group-hover:border-primary/20">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="text-sm font-medium truncate text-center group-hover:text-primary transition-colors"
                    title={anime.title}
                  >
                    {anime.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Reading Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={BookOpen} pastelEmoji="📚" /> READING
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Currently Reading
            </h3>

            <a
              href="https://www.goodreads.com/book/show/18490.Frankenstein"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-secondary rounded-lg border border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-md group"
            >
              <div className="w-16 h-24 bg-card rounded flex-shrink-0 shadow-sm border border-border flex items-center justify-center overflow-hidden">
                <img
                  src="/frankenstein.png"
                  alt="Frankenstein"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center h-24">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  Frankenstein
                </h3>
                <p className="text-sm text-muted-foreground">by Mary Shelley</p>
              </div>
            </a>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              All-time Favourites
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  title: "The Giver",
                  author: "Lois Lowry",
                  image: "thegiver.png",
                  url: "https://www.goodreads.com/book/show/3636.The_Giver",
                },
                {
                  title: "Harry Potter and the Prisoner of Azkaban",
                  author: "J.K. Rowling",
                  image: "harrypotter.jpg",
                  url: "https://www.goodreads.com/book/show/49116.Harry_Potter_and_the_Prisoner_of_Azkaban",
                },
                {
                  title: "The Silent Patient",
                  author: "Alex Michaelides",
                  image: "silentpatient.jpg",
                  url: "https://www.goodreads.com/book/show/40097951-the-silent-patient",
                },
                {
                  title: "The Stranger",
                  author: "Albert Camus",
                  image: "stranger.png",
                  url: "https://www.goodreads.com/book/show/49552.The_Stranger",
                },
              ].map((book, i) => (
                <a
                  key={i}
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 group transition-transform duration-300 hover:scale-105"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary border border-border transition-all group-hover:shadow-xl group-hover:border-primary/20">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-center px-1">
                    <span
                      className="text-sm font-medium line-clamp-2 leading-tight group-hover:text-primary transition-colors"
                      title={book.title}
                    >
                      {book.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {book.author}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Palette} pastelEmoji="🎨" /> FUTURE
            HOBBIES
          </div>
          <p className="text-muted-foreground mb-4">
            Things I would like to get into eventually:{" "}
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium ">
              ✏️ Drawing
            </div>

            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium ">
              📽️Animation
            </div>
            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium ">
              🧊Blender
            </div>
            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium ">
              💿 Collecting... something, idk yet... probably plushies since I
              have alot already
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
