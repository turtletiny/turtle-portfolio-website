import { useState, useRef } from "react";
import DashboardNavbar from "@/components/navigation/DashboardNavbar";
import ThemeToggle from "@/components/theme/ThemeToggle";
import TextType from "@/components/typography/TextType";
import {
  Folder,
  FolderOpen,
  Clock,
  CheckCircle2,
  Sparkles,
  Github,
  ExternalLink,
  Globe,
} from "lucide-react";

export default function Projects() {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [animStep, setAnimStep] = useState(0);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const handleMainClick = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (isMainOpen) {
      setAnimStep(0);
      setActiveFolder(null);
      timersRef.current.push(setTimeout(() => setIsMainOpen(false), 500));
    } else {
      setIsMainOpen(true);

      timersRef.current.push(setTimeout(() => setAnimStep(1), 150));
      timersRef.current.push(setTimeout(() => setAnimStep(2), 400));
      timersRef.current.push(setTimeout(() => setAnimStep(3), 650));
      timersRef.current.push(setTimeout(() => setAnimStep(4), 900));

      timersRef.current.push(
        setTimeout(() => setActiveFolder("current"), 1100),
      );
    }
  };

  const toggleSubFolder = (folderName: string) => {
    setActiveFolder((prev) => (prev === folderName ? null : folderName));
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-foreground font-main relative z-10">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[900px] flex flex-col items-center px-4 pb-20">
        {/* =========================================
            ROOT FOLDER
            ========================================= */}
        <div className="z-10 bg-background pt-8">
          <button
            onClick={handleMainClick}
            className={`flex flex-col items-center justify-center gap-3 p-8 rounded-3xl transform transition-all duration-500 ease-in-out cursor-pointer w-48 bg-card border-2 ${
              isMainOpen
                ? "border-yellow-500/50 pastel:border-red-500/50 scale-[1.02] hover:scale-105 shadow-lg shadow-yellow-500/10 pastel:shadow-red-500/10 bg-yellow-500/5 pastel:bg-red-500/5"
                : "border-border/50 scale-100 hover:scale-[1.02] hover:bg-secondary/40 shadow-sm"
            }`}
          >
            <div className="relative w-20 h-20 flex items-center justify-center">
              <Folder
                size={70}
                strokeWidth={1.5}
                className={`text-yellow-500 pastel:text-red-500 transition-all duration-300 absolute ${
                  isMainOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
              />
              <FolderOpen
                size={70}
                strokeWidth={1.5}
                className={`text-yellow-500 pastel:text-red-500 transition-all duration-300 absolute ${
                  isMainOpen ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              />
            </div>
            
            {/* REACT BITS TEXT TYPE ANIMATION  */}
            <div className="h-5 flex items-center justify-center">
              <TextType
                key={isMainOpen ? "close" : "open"}
                text={[isMainOpen ? "Close Projects" : "Open Projects"]}
                typingSpeed={75}
                deletingSpeed={50}
                pauseDuration={1500}
                showCursor
                cursorCharacter="|"
                cursorBlinkDuration={0.5}
                className="font-bold text-sm tracking-wide"
              />
            </div>

          </button>
        </div>

        {/* =========================================
            BRANCHING
            ========================================= */}
        <div
          className={`grid transition-all duration-500 ease-in-out w-full ${
            isMainOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden w-full flex flex-col items-center px-4 pb-6">
            <div
              className={`w-[2px] h-10 bg-yellow-500/40 pastel:bg-red-500/40 hidden md:block origin-top transition-transform duration-150 ease-linear ${
                animStep >= 1 ? "scale-y-100" : "scale-y-0"
              }`}
            ></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4 md:pt-0">
              {/* CURRENT */}
              <div className="relative pt-0 md:pt-8">
                <div
                  className={`absolute top-0 right-0 w-1/2 h-[2px] bg-yellow-500/40 pastel:bg-red-500/40 hidden md:block origin-right transition-transform duration-150 ease-linear ${
                    animStep >= 2 ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-yellow-500/40 pastel:bg-red-500/40 hidden md:block origin-top transition-transform duration-150 ease-linear ${
                    animStep >= 3 ? "scale-y-100" : "scale-y-0"
                  }`}
                ></div>

                <button
                  onClick={() => toggleSubFolder("current")}
                  className={`w-full flex flex-col items-center text-center p-6 transform transition-all duration-500 ease-in-out group bg-card border-2 rounded-2xl ${
                    animStep < 4
                      ? "opacity-0 translate-y-4 scale-95 border-border/50"
                      : activeFolder === "current"
                        ? "opacity-100 translate-y-0 scale-[1.02] hover:scale-105 border-blue-500 shadow-lg shadow-blue-500/10"
                        : "opacity-100 translate-y-0 scale-100 border-border/50 hover:scale-[1.02] hover:bg-secondary/40 shadow-sm"
                  }`}
                >
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform duration-300 mb-4">
                    <Folder
                      size={32}
                      strokeWidth={1.5}
                      className={`absolute transition-all duration-300 ${activeFolder === "current" ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
                    />
                    <FolderOpen
                      size={32}
                      strokeWidth={1.5}
                      className={`absolute transition-all duration-300 ${activeFolder === "current" ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                    />
                  </div>
                  <h2 className="text-base font-bold">Current Projects</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    1 project
                  </p>
                </button>
              </div>

              {/* PAST */}
              <div className="relative pt-0 md:pt-8">
                <div
                  className={`absolute top-0 left-0 w-full h-[2px] bg-yellow-500/40 pastel:bg-red-500/40 hidden md:block origin-center transition-transform duration-150 ease-linear ${
                    animStep >= 2 ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-yellow-500/40 pastel:bg-red-500/40 hidden md:block origin-top transition-transform duration-150 ease-linear ${
                    animStep >= 3 ? "scale-y-100" : "scale-y-0"
                  }`}
                ></div>

                <button
                  onClick={() => toggleSubFolder("past")}
                  className={`w-full flex flex-col items-center text-center p-6 transform transition-all duration-500 ease-in-out group bg-card border-2 rounded-2xl ${
                    animStep < 4
                      ? "opacity-0 translate-y-4 scale-95 border-border/50"
                      : activeFolder === "past"
                        ? "opacity-100 translate-y-0 scale-[1.02] hover:scale-105 border-pink-500 shadow-lg shadow-pink-500/10"
                        : "opacity-100 translate-y-0 scale-100 border-border/50 hover:scale-[1.02] hover:bg-secondary/40 shadow-sm"
                  }`}
                >
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-pink-500/10 text-pink-500 group-hover:scale-110 transition-transform duration-300 mb-4">
                    <Folder
                      size={32}
                      strokeWidth={1.5}
                      className={`absolute transition-all duration-300 ${activeFolder === "past" ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
                    />
                    <FolderOpen
                      size={32}
                      strokeWidth={1.5}
                      className={`absolute transition-all duration-300 ${activeFolder === "past" ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                    />
                  </div>
                  <h2 className="text-base font-bold">Past Projects</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    1 project
                  </p>
                </button>
              </div>

              {/* future */}
              <div className="relative pt-0 md:pt-8">
                <div
                  className={`absolute top-0 left-0 w-1/2 h-[2px] bg-yellow-500/40 pastel:bg-red-500/40 hidden md:block origin-left transition-transform duration-150 ease-linear ${
                    animStep >= 2 ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-yellow-500/40 pastel:bg-red-500/40 hidden md:block origin-top transition-transform duration-150 ease-linear ${
                    animStep >= 3 ? "scale-y-100" : "scale-y-0"
                  }`}
                ></div>

                <button
                  onClick={() => toggleSubFolder("future")}
                  className={`w-full flex flex-col items-center text-center p-6 transform transition-all duration-500 ease-in-out group bg-card border-2 rounded-2xl ${
                    animStep < 4
                      ? "opacity-0 translate-y-4 scale-95 border-border/50"
                      : activeFolder === "future"
                        ? "opacity-100 translate-y-0 scale-[1.02] hover:scale-105 border-green-500 shadow-lg shadow-green-500/10"
                        : "opacity-100 translate-y-0 scale-100 border-border/50 hover:scale-[1.02] hover:bg-secondary/40 shadow-sm"
                  }`}
                >
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-green-500/10 text-green-500 group-hover:scale-110 transition-transform duration-300 mb-4">
                    <Folder
                      size={32}
                      strokeWidth={1.5}
                      className={`absolute transition-all duration-300 ${activeFolder === "future" ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
                    />
                    <FolderOpen
                      size={32}
                      strokeWidth={1.5}
                      className={`absolute transition-all duration-300 ${activeFolder === "future" ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                    />
                  </div>
                  <h2 className="text-base font-bold">Future Projects Ideas</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    5 projects
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* connecting branches */}
        <div
          className={`w-full transition-all duration-500 ease-in-out overflow-hidden hidden md:block ${
            activeFolder && isMainOpen ? "h-24 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="relative w-full h-full px-4">
            <div className="grid grid-cols-3 gap-6 w-full h-1/2">
              <div className="flex justify-center">
                <div
                  className={`w-[2px] h-full bg-yellow-500/40 pastel:bg-red-500/40 transition-transform duration-150 ease-linear origin-top ${
                    activeFolder === "current"
                      ? "scale-y-100 delay-0"
                      : "scale-y-0 delay-0"
                  }`}
                ></div>
              </div>
              <div className="flex justify-center">
                <div
                  className={`w-[2px] h-full bg-yellow-500/40 pastel:bg-red-500/40 transition-transform duration-150 ease-linear origin-top ${
                    activeFolder === "past"
                      ? "scale-y-100 delay-0"
                      : "scale-y-0 delay-0"
                  }`}
                ></div>
              </div>
              <div className="flex justify-center">
                <div
                  className={`w-[2px] h-full bg-yellow-500/40 pastel:bg-red-500/40 transition-transform duration-150 ease-linear origin-top ${
                    activeFolder === "future"
                      ? "scale-y-100 delay-0"
                      : "scale-y-0 delay-0"
                  }`}
                ></div>
              </div>
            </div>

            <div className="absolute top-1/2 left-0 w-full h-[2px] px-4">
              <div className="relative w-full h-full">
                <div
                  className={`absolute top-0 left-[16.66%] w-[33.33%] h-full bg-yellow-500/40 pastel:bg-red-500/40 transition-transform duration-150 ease-linear origin-left ${
                    activeFolder === "current"
                      ? "scale-x-100 delay-150"
                      : "scale-x-0 delay-0"
                  }`}
                ></div>
                <div
                  className={`absolute top-0 right-[16.66%] w-[33.33%] h-full bg-yellow-500/40 pastel:bg-red-500/40 transition-transform duration-150 ease-linear origin-right ${
                    activeFolder === "future"
                      ? "scale-x-100 delay-150"
                      : "scale-x-0 delay-0"
                  }`}
                ></div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-1/2">
              <div
                className={`w-full h-full bg-yellow-500/40 pastel:bg-red-500/40 transition-transform duration-150 ease-linear origin-top ${
                  activeFolder === "current" || activeFolder === "future"
                    ? "scale-y-100 delay-300"
                    : activeFolder === "past"
                      ? "scale-y-100 delay-150"
                      : "scale-y-0 delay-0"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* projects */}
        <div className="w-full mt-6 md:mt-0">
          {/* CURRENT PROJECTS */}
          {activeFolder === "current" && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300 fill-mode-both flex flex-col gap-6 px-4">
              <div className="card-base flex flex-col gap-4 group transition-all duration-300 relative overflow-hidden bg-card border-border/50">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/50 rounded-lg border border-border">
                      <Globe size={20} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold">
                      Personal Portfolio Website
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://github.com/turtletiny/turtle-portfolio-website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-secondary/50 border border-border rounded hover:text-primary transition-all hover:scale-110"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href="https://turtletiny.lol/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-secondary/50 border border-border rounded hover:text-primary transition-all hover:scale-110"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <div className="text-muted-foreground leading-relaxed text-sm relative z-10">
                  <p>
                    The website you are looking at right now! My first large
                    personal project and first website using React.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 relative z-10">
                  <span className="px-3 py-1 bg-secondary/50 rounded-full text-[10px] font-bold border border-border">
                    REACT
                  </span>
                  <span className="px-3 py-1 bg-secondary/50 rounded-full text-[10px] font-bold border border-border">
                    TYPESCRIPT
                  </span>
                  <span className="px-3 py-1 bg-secondary/50 rounded-full text-[10px] font-bold border border-border">
                    TAILWIND CSS
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* PAST PROJECTS */}
          {activeFolder === "past" && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300 fill-mode-both flex flex-col gap-6 px-4">
              <div className="card-base flex flex-col gap-4 group transition-all duration-300 relative overflow-hidden bg-card border-border/50">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/50 rounded-lg border border-border">
                      <CheckCircle2 size={20} className="text-pink-500" />
                    </div>
                    <h3 className="text-xl font-bold">Spaceshooter</h3>
                  </div>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary/50 border border-border rounded hover:text-primary transition-all hover:scale-110"
                  >
                    <Github size={18} />
                  </a>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10">
                  My very first personal project. A simple 2D arcade
                  spaceshooter game that taught me the fundamentals of Pygame
                  and game loops.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  <span className="px-3 py-1 bg-secondary/50 rounded-full text-[10px] font-bold border border-border uppercase">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-secondary/50 rounded-full text-[10px] font-bold border border-border uppercase">
                    Pygame
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* FUTURE PROJECTS */}
          {activeFolder === "future" && (
            // Changed from grid layout to flex column
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300 fill-mode-both flex flex-col gap-6 px-4">
              <div className="card-base flex flex-col gap-4 relative overflow-hidden bg-card border-border/50">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="text-lg font-bold relative z-10">
                  Pokemon Game Clone
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10">
                  A 2D Pokemon Clone with with a short custom storyline and
                  classic Pokemon battle mechanics.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  <span className="px-3 py-1 bg-secondary/50 rounded-full text-[10px] font-bold border border-border uppercase">
                    Python
                  </span>
                </div>
              </div>

              <div className="card-base flex flex-col gap-4 relative overflow-hidden bg-card border-border/50">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="text-lg font-bold relative z-10">
                  Improved Anki Clone
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10">
                  A modern, intuitive redesign of Anki to fix its outdated user
                  interface.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  <span className="px-3 py-1 bg-secondary/50 rounded-full text-[10px] font-bold border border-border uppercase">
                    App
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}