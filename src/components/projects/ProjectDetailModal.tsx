import { AppWindow, ExternalLink, Gamepad2, Github, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ProjectEntry } from "@/types/project";
import TechIcon from "@/components/projects/TechIcon";
import ProjectDeviceMockup from "@/components/projects/ProjectDeviceMockup";

interface ProjectDetailModalProps {
  project: ProjectEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const iconMap = {
  globe: Globe,
  "app-window": AppWindow,
  gamepad: Gamepad2,
};

export default function ProjectDetailModal({
  project,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  const Icon = project ? iconMap[project.icon] : Globe;
  const imageBlocks = project?.media.filter((block) => block.kind === "image") ?? [];
  const otherBlocks = project?.media.filter((block) => block.kind !== "image") ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw] max-w-4xl overflow-hidden border-border bg-card p-0">
        {project ? (
          <>
            <DialogHeader className="border-b border-border px-6 py-5 text-left">
              <div className="flex items-center justify-between gap-4 pr-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/80">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.9} />
                  </div>

                  <div>
                    <DialogTitle className="text-xl font-bold text-foreground">{project.name}</DialogTitle>
                  </div>
                </div>

                {project.links.length > 0 ? (
                  <div className="flex items-center gap-3">
                    {project.links.map((link) => {
                      const isGithub = link.label.toLowerCase().includes("github");
                      const LinkIcon = isGithub ? Github : ExternalLink;
                      return (
                        <a
                          key={`${project.id}-${link.label}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className={cn(
                            "group flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground",
                            "transition-all duration-150 hover:border-[hsl(var(--card-hover-border))] hover:[box-shadow:var(--card-hover-shadow)]",
                            "hover:scale-[1.05] hover:-translate-y-0.5 active:scale-[0.97]",
                            isGithub ? "group/gh" : "hover:text-foreground",
                          )}
                        >
                          <LinkIcon className="h-[18px] w-[18px]" />
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </DialogHeader>

            <ScrollArea className="h-[74vh]">
              <div className="space-y-7 px-6 py-6">
                {imageBlocks.length > 0 ? (
                  <section className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Screenshots
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {imageBlocks.map((block) => {
                        const deviceLabel = block.device === "mobile" ? "Mobile view" : "Desktop view";
                        const titleText = block.device
                          ? block.title.toLowerCase().includes(deviceLabel.toLowerCase())
                            ? block.title
                            : `${block.title} — ${deviceLabel}`
                          : block.title;

                        return (
                          <article
                            key={block.id}
                            className="space-y-3 rounded-2xl border border-border bg-secondary/30 p-4"
                          >
                            <div className="space-y-1">
                              <h3 className="text-sm font-semibold text-foreground">{titleText}</h3>
                            </div>

                          {block.src ? (
                            <ProjectDeviceMockup
                              src={block.src}
                              alt={block.alt || block.title}
                              device={block.device}
                            />
                          ) : null}

                          {block.description ? (
                            <p className="text-sm leading-relaxed text-muted-foreground">{block.description}</p>
                          ) : null}
                          </article>
                        );
                      })}
                    </div>
                  </section>
                ) : null}

                {otherBlocks.length > 0 ? (
                  <section className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Videos and Notes
                    </p>

                    <div className="space-y-4">
                      {otherBlocks.map((block) => {
                        if (block.kind === "video") {
                          return (
                            <article
                              key={block.id}
                              className="overflow-hidden rounded-2xl border border-border bg-secondary/40"
                            >
                              {block.src ? (
                                <video
                                  controls
                                  preload="metadata"
                                  poster={block.poster}
                                  className="h-56 w-full bg-black/20 object-cover"
                                >
                                  <source src={block.src} />
                                  Your browser does not support embedded videos.
                                </video>
                              ) : null}
                              <div className="space-y-1 p-4">
                                <h3 className="text-sm font-semibold text-foreground">{block.title}</h3>
                                {block.description ? (
                                  <p className="text-sm text-muted-foreground">{block.description}</p>
                                ) : null}
                              </div>
                            </article>
                          );
                        }

                        return (
                          <article
                            key={block.id}
                            className="rounded-2xl border border-border bg-secondary/30 p-4"
                          >
                            <h3 className="text-sm font-semibold text-foreground">{block.title}</h3>
                            {block.description ? (
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {block.description}
                              </p>
                            ) : null}
                          </article>
                        );
                      })}
                    </div>
                  </section>
                ) : null}

                <section className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Description
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80">{project.summary}</p>
                </section>

                <section className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Features
                  </p>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    {project.techStack.map((item) => (
                      <div
                        key={item.name}
                        className="inline-flex flex-col items-center gap-1 text-xs font-medium text-foreground"
                      >
                        <TechIcon name={item.icon || item.name} className="h-9 w-9" title={item.name} />
                        <span className="text-[11px] font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </ScrollArea>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
