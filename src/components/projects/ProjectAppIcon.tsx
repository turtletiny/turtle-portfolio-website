import { AppWindow, FolderOpen, Gamepad2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectEntry } from "@/types/project";

interface ProjectAppIconProps {
  project: ProjectEntry;
  index: number;
  onOpen: (project: ProjectEntry) => void;
}

const iconMap = {
  globe: Globe,
  "app-window": AppWindow,
  gamepad: Gamepad2,
};

export default function ProjectAppIcon({ project, index, onOpen }: ProjectAppIconProps) {
  const Icon = iconMap[project.icon];

  const statusMap: Record<
    ProjectEntry["status"],
    { label: string; colorClass: string }
  > = {
    active: { label: "WIP", colorClass: "bg-amber-400" },
    past: { label: "Completed", colorClass: "bg-emerald-400" },
    future: { label: "Planned", colorClass: "bg-sky-400" },
  };

  const statusMeta = statusMap[project.status] ?? { label: project.status, colorClass: "bg-muted" };

  return (
    <div
      className={cn(
        "group flex flex-col items-center gap-3 text-center",
        "animate-in fade-in zoom-in-95 slide-in-from-bottom-2",
      )}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="relative h-16 w-16">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open ${project.name} project details`}
          className={"absolute inset-0 flex items-center justify-center rounded-2xl border border-border bg-secondary/70 text-muted-foreground transition-all duration-150 hover:border-[hsl(var(--card-hover-border))] hover:[box-shadow:var(--card-hover-shadow)] hover:scale-[1.05] hover:-translate-y-0.5 active:scale-[0.97] overflow-visible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:ring-2 hover:ring-[hsl(var(--card-hover-border))] hover:ring-offset-2 hover:ring-offset-background"}
        >
          {project.logo ? (
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="h-10 w-10 object-contain"
              loading="lazy"
            />
          ) : (
            <Icon className="h-7 w-7 text-primary" strokeWidth={1.9} />
          )}

          {/* Type badge (bottom-right) placed inside the button so it scales with icon */}
          {iconMap[project.icon] ? (
            (() => {
              const TypeIcon = iconMap[project.icon];
              return <TypeIcon className="absolute -bottom-2 -right-2 h-4 w-4 text-muted-foreground/80" strokeWidth={1.8} />;
            })()
          ) : (
            <FolderOpen className="absolute -bottom-2 -right-2 h-4 w-4 text-muted-foreground/80" strokeWidth={1.8} />
          )}

          {/* Status dot (top-left) placed inside the button so it scales with icon and half-protrudes */}
          <span
            title={statusMeta.label}
            aria-hidden
            className={`absolute -top-1 -left-1 h-3 w-3 rounded-full ring-2 ring-card ${statusMeta.colorClass}`}
          />
        </button>
      </div>

      <div className="space-y-1">
        <p className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">{project.name}</p>
      </div>
    </div>
  );
}
