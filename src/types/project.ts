export type ProjectStatus = "active" | "past" | "future";

export type ProjectIconKey = "globe" | "app-window" | "gamepad";

export type ProjectMediaKind = "image" | "video" | "text";

export interface ProjectMediaBlock {
  id: string;
  kind: ProjectMediaKind;
  title: string;
  description?: string;
  src?: string;
  alt?: string;
  poster?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface TechItem {
  name: string;
  // optional icon key or placeholder identifier; consumers can map this to an actual icon
  icon?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  summary: string;
  status: ProjectStatus;
  icon: ProjectIconKey;
  // Optional per-project logo (path or URL). When present this will be shown
  // as the main app icon; otherwise the `icon` mapping is used.
  logo?: string;
  tags: string[];
  techStack: TechItem[];
  features: string[];
  links: ProjectLink[];
  media: ProjectMediaBlock[];
}
