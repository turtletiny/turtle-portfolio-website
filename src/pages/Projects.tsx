import { useEffect, useRef, useState } from "react";
import { Folder, FolderOpen, SquarePlus } from "lucide-react";
import DashboardNavbar from "@/components/navigation/DashboardNavbar";
import ThemeToggle from "@/components/theme/ThemeToggle";
import TextType from "@/components/typography/TextType";
import ProjectAppIcon from "@/components/projects/ProjectAppIcon";
import ProjectDetailModal from "@/components/projects/ProjectDetailModal";
import { PROJECTS } from "@/lib/projects";
import { ProjectEntry } from "@/types/project";

export default function Projects() {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  const handleMainClick = () => {
    clearTimers();

    if (isMainOpen) {
      setShowIcons(false);
      setSelectedProject(null);
      timersRef.current.push(window.setTimeout(() => setIsMainOpen(false), 180));
      return;
    }

    setIsMainOpen(true);
    timersRef.current.push(window.setTimeout(() => setShowIcons(true), 140));
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center font-main text-foreground">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[980px] px-4 pb-20">
        <div className="flex justify-center pt-8">
          <button
            type="button"
            onClick={handleMainClick}
            aria-label={isMainOpen ? "Close projects folder" : "Open projects folder"}
            className={`group flex w-56 flex-col items-center justify-center gap-3 rounded-3xl border-2 bg-card p-8 transition-all duration-200 ${
              isMainOpen
                ? "scale-[1.02] border-primary/70 shadow-xl"
                : "scale-100 border-border/60 hover:scale-[1.02] hover:border-primary/45"
            }`}
          >
            <div className="relative flex h-20 w-20 items-center justify-center">
              <Folder
                size={70}
                strokeWidth={1.55}
                className={`absolute text-primary transition-all duration-200 ${
                  isMainOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
                }`}
              />
              <FolderOpen
                size={70}
                strokeWidth={1.55}
                className={`absolute text-primary transition-all duration-200 ${
                  isMainOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            </div>

            <div className="flex h-5 items-center justify-center">
              <TextType
                key={isMainOpen ? "close-projects" : "open-projects"}
                text={[isMainOpen ? "Close Projects" : "Open Projects"]}
                typingSpeed={72}
                deletingSpeed={45}
                pauseDuration={1200}
                showCursor
                cursorCharacter="|"
                cursorBlinkDuration={0.45}
                className="text-sm font-bold tracking-wide"
              />
            </div>
          </button>
        </div>

        <div
          className={`mt-8 grid w-full transition-all duration-300 ${
            isMainOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-visible">
            <div
              className={`space-y-5 transition-all duration-300 ${
                showIcons ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {/* Terminal-style window wrapper for the apps */}
              <section className="terminal-window">
                <div className="terminal-titlebar">
                  <div className="flex items-center gap-3 min-w-0">
                    <SquarePlus size={15} className="terminal-muted" />
                  </div>

                  <div className="terminal-title">Projects</div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2.5 pl-1">
                      <span className="terminal-dot terminal-dot-yellow" />
                      <span className="terminal-dot terminal-dot-green" />
                      <span className="terminal-dot terminal-dot-red" />
                    </div>
                  </div>
                </div>

                <div className="terminal-pane p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {PROJECTS.map((project, index) => (
                      <ProjectAppIcon
                        key={project.id}
                        project={project}
                        index={index}
                        onOpen={setSelectedProject}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        open={Boolean(selectedProject)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null);
          }
        }}
      />
    </div>
  );
}
