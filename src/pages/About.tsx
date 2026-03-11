import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import { User, Gamepad2, ScrollText, Code2, BookOpen, Tv, Palette, Timer, Zap, Rocket, Puzzle, Flame } from "lucide-react";
import { useChessStats } from "@/hooks/useChessStats";
import { useLichessStats } from "@/hooks/useLichessStats";
import { Skeleton } from "@/components/ui/skeleton";

const CHESS_USERNAME = "turtletinys";
const LICHESS_USERNAME = "Zappyy";

export default function About() {
  const { stats, profile, loading, error } = useChessStats(CHESS_USERNAME);
  const { profile: lichessProfile, loading: lichessLoading, error: lichessError } = useLichessStats(LICHESS_USERNAME);

  const getRatingDisplay = (rating?: { last: { rating: number }; record: { win: number; loss: number; draw: number } }) => {
    if (!rating) return null;
    return {
      rating: rating.last.rating,
      wins: rating.record.win,
      losses: rating.record.loss,
      draws: rating.record.draw
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
            I'm a 19 year old CS student from Sydney, Australia. I have alot of hobbies I'm passionate about (infact I tend to obsess over my interests, which has its pros and cons), which I wanted to share through this site!
          </p>
        </div>

        {/* Ultrakill Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Gamepad2} pastelEmoji="🎮" /> FAVOURITE GAME
          </div>
          <h2 className="text-xl font-bold mb-1">ULTRAKILL</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            ULTRAKILL is a super fast-paced retro FPS inspired by classic games such as Quake, Doom and Devil May Cry. What do I love about this game? Everything. The insanely high skill gap, the lore, the fast paced gameplay, the smooth movement mechanics, the legendary music, the level designs, the hell theme, the secrets; Its genuinely a work of art.
          </p>
          <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden relative group border border-border">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              [Ultrakill Animation Placeholder]
            </div>
            <img 
              src="https://media.tenor.com/images/13c32a7fae51b32daffbf8709e9db6eb/tenor.gif" 
              alt="Ultrakill gameplay" 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
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
                <div className="flex items-center gap-3">
                  <a 
                    href={profile?.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-bold hover:text-primary transition-colors"
                  >
                    {profile?.username}
                  </a>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">Chess.com</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {rapid && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Timer size={24} className="text-green-500 mb-1" strokeWidth={2.5} />
                      <span className="text-xl font-bold text-primary">{rapid.rating}</span>
                      <span className="text-xs font-medium">Rapid</span>
                      <span className="text-[10px] text-muted-foreground">{rapid.wins}W / {rapid.losses}L</span>
                    </div>
                  )}
                  {blitz && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                    
                      <Zap size={24} className="text-blue-500 dark:text-yellow-400 mb-1" fill="currentColor" />
                      <span className="text-xl font-bold text-primary">{blitz.rating}</span>
                      <span className="text-xs font-medium">Blitz</span>
                      <span className="text-[10px] text-muted-foreground">{blitz.wins}W / {blitz.losses}L</span>
                    </div>
                  )}
                  {bullet && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Rocket size={24} className="text-amber-500 mb-1" fill="currentColor" />
                      <span className="text-xl font-bold text-primary">{bullet.rating}</span>
                      <span className="text-xs font-medium">Bullet</span>
                      <span className="text-[10px] text-muted-foreground">{bullet.wins}W / {bullet.losses}L</span>
                    </div>
                  )}
                  {stats?.puzzle_rush && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Flame size={24} className="text-red-500 mb-1" fill="currentColor" />
                      <span className="text-xl font-bold text-primary">{stats.puzzle_rush.best.score}</span>
                      <span className="text-xs font-medium">Puzzle Rush</span>
                    </div>
                  )}
                  {stats?.tactics && (
                    <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                      <Puzzle size={24} className="text-orange-500 mb-1" fill="currentColor" />
                      <span className="text-xl font-bold text-primary">{stats.tactics.highest.rating}</span>
                      <span className="text-xs font-medium">Puzzles</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Row 2: Lichess and Video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="flex items-center gap-3">
                    <a 
                      href={lichessProfile?.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-bold hover:text-primary transition-colors"
                    >
                      {lichessProfile?.username}
                    </a>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">Lichess</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {lichessProfile?.perfs?.rapid && (
                      <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                        <Timer size={24} className="text-green-500 mb-1" strokeWidth={2.5} />
                        <span className="text-xl font-bold text-primary">{lichessProfile.perfs.rapid.rating}</span>
                        <span className="text-xs font-medium">Rapid</span>
                        <span className="text-[10px] text-muted-foreground">{lichessProfile.perfs.rapid.games} Games</span>
                      </div>
                    )}
                    {lichessProfile?.perfs?.blitz && (
                      <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                        
                        <Zap size={24} className="text-blue-500 dark:text-yellow-400 mb-1" fill="currentColor" />
                        <span className="text-xl font-bold text-primary">{lichessProfile.perfs.blitz.rating}</span>
                        <span className="text-xs font-medium">Blitz</span>
                        <span className="text-[10px] text-muted-foreground">{lichessProfile.perfs.blitz.games} Games</span>
                      </div>
                    )}
                    {lichessProfile?.perfs?.bullet && (
                      <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                        <Rocket size={24} className="text-amber-500 mb-1" fill="currentColor" />
                        <span className="text-xl font-bold text-primary">{lichessProfile.perfs.bullet.rating}</span>
                        <span className="text-xs font-medium">Bullet</span>
                        <span className="text-[10px] text-muted-foreground">{lichessProfile.perfs.bullet.games} Games</span>
                      </div>
                    )}
                    {lichessProfile?.perfs?.puzzle && (
                      <div className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 text-center">
                        <Puzzle size={24} className="text-orange-500 mb-1" fill="currentColor" />
                        <span className="text-xl font-bold text-primary">{lichessProfile.perfs.puzzle.rating}</span>
                        <span className="text-xs font-medium">Puzzles</span>
                        <span className="text-[10px] text-muted-foreground">{lichessProfile.perfs.puzzle.games} Plays</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Video  */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-lg">Favorite Opening: Smith-Morra Gambit</h3>
              <div className="w-full h-full min-h-[160px] bg-secondary rounded-lg border border-border flex items-center justify-center text-muted-foreground text-sm">
                [Opening Video Placeholder]
              </div>
            </div>
          </div>
        </div>

        {/* Coding Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Code2} pastelEmoji="💻" /> STACK
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: "React", desc: "" },
              { name: "TypeScript", desc: "" },
              { name: "Tailwind", desc: "" },
              { name: "Python", desc: "" },
              { name: "Pygame", desc: "" },
              { name: "Java", desc: "" }
            ].map(tech => (
              <div key={tech.name} className="p-3 bg-secondary rounded-lg border border-border flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors cursor-default">
                <span className="font-bold text-sm">{tech.name}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{tech.desc}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            I like problem solving and the design aspect too lol gamedev is fun being able to build ur own apps is fun yes yes yes i love learning
          </p>
        </div>

        {/* Reading Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={BookOpen} pastelEmoji="📚" /> READING
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Currently Reading</h3>
            
            <a 
              href="https://www.goodreads.com/book/show/35031085-frankenstein" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-secondary rounded-lg border border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-md group"
            >
              <div className="w-16 h-24 bg-card rounded flex-shrink-0 shadow-sm border border-border flex items-center justify-center overflow-hidden">
                <img src="/frankenstein.png" alt="Frankenstein" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center h-24">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Frankenstein</h3>
                <p className="text-sm text-muted-foreground">by Mary Shelley</p>
              </div>
            </a>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">All-time Favourites</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: "The Giver", author: "Lois Lowry", image: "/thegiver.png", url: "https://www.goodreads.com/book/show/3636.The_Giver" },
                { title: "title2", author: "author 2", image: "bookcover2", url: "#" },
                { title: "book3", author: "author3", image: "bookcover3", url: "#" },
                { title: "book4", author: "author5", image: "bookcover4", url: "#" }
              ].map((book, i) => (
                <a 
                  key={i} 
                  href={book.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col gap-2 group transition-transform duration-300 hover:scale-105"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary border border-border transition-all group-hover:shadow-xl group-hover:border-primary/20">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">{book.title}</span>
                    <span className="text-[10px] text-muted-foreground truncate">{book.author}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Anime Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Tv} pastelEmoji="📺" /> ANIME
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Currently Watching</h3>
            <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg border border-border">
              <div className="w-16 h-24 bg-card rounded flex-shrink-0 shadow-sm border border-border flex items-center justify-center overflow-hidden">
                <img src="public/pochitagif.gif" alt="None currently" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center h-24">
                <h3 className="font-bold text-lg">None Currently </h3>
                <p className="text-sm text-muted-foreground">Would like watch JJK Season 3 and CSM when they release if I have time :D </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">All-time Favourites</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: "Death Note", image: "public/deathnote.jpg", url: "https://anilist.co/anime/1535/Death-Note/" },
                { title: "Odd Taxi", image: "public/oddtaxi.png", url: "https://anilist.co/anime/125967/ODDTAXI/" },
                { title: "Cyberpunk: Edgerunners", image: "public/cyberpunk.jpg", url: "https://anilist.co/anime/120377/Cyberpunk-Edgerunners/" },
                { title: "Spirited Away", image: "public/spiritedaway.jpg", url: "https://anilist.co/anime/199/Spirited-Away/" }
              ].map((anime, i) => (
                <a 
                  key={i} 
                  href={anime.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col gap-2 group transition-transform duration-300 hover:scale-105"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary border border-border transition-all group-hover:shadow-xl group-hover:border-primary/20">
                    <img src={anime.image} alt={anime.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium truncate text-center group-hover:text-primary transition-colors">{anime.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Palette} pastelEmoji="🎨" /> FUTURE HOBBIES
          </div>
          <p className="text-muted-foreground mb-4">Things I would like to get into eventually: </p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default">
              ✏️ Drawing
            </div>
            <div className="px-4 py-2 bg-secondary rounded-full border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default">
              💿 Collecting... something, idk yet
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}