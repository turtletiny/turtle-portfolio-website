import { AppWindow, ExternalLink, Gamepad2, Globe } from "lucide-react";
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
              <div className="flex items-start gap-4 pr-8">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/80">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.9} />
                </div>

                <div>
                  <DialogTitle className="text-xl font-bold text-foreground">{project.name}</DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-muted-foreground">
                    {project.summary}
                  </DialogDescription>
                </div>
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
                      <p className="text-[11px] text-muted-foreground">
                        Desktop and mobile views stack on smaller screens.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {imageBlocks.map((block) => (
                        <article
                          key={block.id}
                          className="space-y-3 rounded-2xl border border-border bg-secondary/30 p-4"
                        >
                          {block.src ? (
                            <ProjectDeviceMockup
                              src={block.src}
                              alt={block.alt || block.title}
                              device={block.device}
                            />
                          ) : null}

                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-foreground">{block.title}</h3>
                            {block.device ? (
                              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                                {block.device === "mobile" ? "Mobile view" : "Laptop view"}
                              </p>
                            ) : null}
                          </div>

                          {block.description ? (
                            <p className="text-sm leading-relaxed text-muted-foreground">{block.description}</p>
                          ) : null}
                        </article>
                      ))}
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
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground"
                      >
                        <TechIcon name={item.icon || item.name} className="h-4 w-4 text-primary" title={item.name} />
                        <span className="text-xs font-medium">{item.name}</span>
                      </span>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Features
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-3 pb-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Links
                  </p>

                  {project.links.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <a
                          key={`${project.id}-${link.label}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground",
                            "transition-colors hover:border-primary hover:text-primary",
                          )}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground"></p>
                  )}
                </section>
              </div>
            </ScrollArea>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
