import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import {
  FolderGit2,
  Terminal,
  Gamepad2,
  Globe,
  Github,
  ExternalLink,
  Lightbulb,
  CheckCircle2,
  Construction,
} from "lucide-react";

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground font-main">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[900px] flex flex-col gap-10 px-4 pb-12">
        {/* Header Card  */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={FolderGit2} pastelEmoji="📁" /> MY WORK
          </div>
          <h1 className="text-3xl font-bold">Projects.</h1>
          <p className="text-muted-foreground leading-relaxed">
            A very empty collection (for now) of things I've built, what I'm
            currently working on, and future ideas/plans + other non coding
            related side projects
          </p>
        </div>

        {/* --- SECTION: CURRENTLY WORKING ON --- */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 px-1">
            <Construction
              size={14}
              className="text-foreground pastel:text-orange-500"
            />{" "}
            CURRENTLY WORKING ON
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Personal Website  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Globe
                      size={20}
                      className="text-foreground pastel:text-primary"
                    />
                  </div>
                  <h2 className="text-xl font-bold">
                    Personal Portfolio Website
                  </h2>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/turtletiny/turtle-portfolio-website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary rounded hover:text-primary transition-all hover:scale-110"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://turtletinyportfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary rounded hover:text-primary transition-all hover:scale-110"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="text-muted-foreground leading-relaxed text-sm">
                <p>
                  The website you are looking at right now! My first large
                  personal project and first website using React. I plan to
                  slowly implement the following features:
                </p>
                <ul className="mt-3 space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-foreground pastel:bg-primary" />
                    <span>
                      Further tweak and polish the pastel theme + add more
                      custom icons for weather status, etc.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-foreground pastel:bg-primary" />
                    <span>
                      Turn current favourite song card into a mini music player
                      to store multiple favourite songs{" "}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-foreground pastel:bg-primary" />
                    <span>
                      Add more interactive elements like desktop pets in the
                      corner.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border">
                  REACT
                </span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border">
                  TYPESCRIPT
                </span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border">
                  TAILWIND CSS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION: PAST PROJECTS --- */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 px-1">
            <CheckCircle2
              size={14}
              className="text-foreground pastel:text-green-500"
            />{" "}
            PAST PROJECTS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Spaceshooter  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Spaceshooter</h2>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded hover:text-primary transition-all hover:scale-110"
                >
                  <Github size={18} />
                </a>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                My very first personal project. A simple 2D arcade spaceshooter
                game that taught me the fundamentals of Pygame and game loops.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Python
                </span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Pygame
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Project Ideas/Plans --- */}

        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 px-1">
            <Lightbulb
              size={14}
              className="text-foreground pastel:text-yellow-500"
            />{" "}
            FUTURE IDEAS & PLANS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pokemon Game  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Pokemon Game Clone</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A 2D Pokemon Clone with with a short custom storyline and
                classic Pokemon battle mechanics, probably will be the next
                project I tackle.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Game
                </span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Python
                </span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Pygame
                </span>
              </div>
            </div>

            {/* Improved Anki   */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Improved Anki Clone</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I love Anki, but even with plugins its has a very unintuitive
                and outdated user interface which I would like to fix.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  App
                </span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Python
                </span>
              </div>
            </div>

            {/* Personal Organisation App  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Personal Organisation App</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A personal organisation app with features such as To-Do list,
                calendar, notes organisation, etc
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  App
                </span>
              </div>
            </div>

            {/* Spotify Clone/Music Player */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">
                  Spotify Clone / Music Player
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A Spotify clone with more features such as song annotations,
                frequency visualisers
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  App
                </span>
              </div>
            </div>

            {/* 3d FPS Game in Python  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">FPS Game</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                An FPS game with Ursina, a 3D game engine in Python
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Game
                </span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Python
                </span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  Ursina Engine
                </span>
              </div>
            </div>

            {/* Chess Engine  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Chess Engine</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A Chess Engine to display the best move to learn more about
                algorithms
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  App
                </span>
              </div>
            </div>

            {/* Mini Operating System  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Mini Operating System</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                This seems very complex, so probably something in the far
                future, but seems like an interesting way to learn about
                operating systems
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">
                  OS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
