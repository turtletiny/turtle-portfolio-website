import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
  title?: string;
}

const ICON_SOURCES: Record<string, string> = {
  react: "/tech-icons/react.svg",
  typescript: "/tech-icons/typescript.svg",
  vite: "/tech-icons/vite.svg",
  tailwind: "/tech-icons/tailwind.svg",
  vercel: "/tech-icons/vercel.svg",
  node: "/tech-icons/node.svg",
  neon: "/tech-icons/neon.svg",
};

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();

// Neutral placeholder for tech stack entries. Shows initials inside a rounded box.
export default function TechIcon({ name, className = "h-4 w-4", title }: TechIconProps) {
  const iconKey = normalizeKey(name);
  const iconSource = ICON_SOURCES[iconKey];
  const initials = name
    .split(/[^A-Za-z0-9]/)
    .filter(Boolean)
    .map((s) => s[0].toUpperCase())
    .slice(0, 2)
    .join("") || "?";

  if (iconSource) {
    return (
      <img
        src={iconSource}
        alt={title || name}
        title={title || name}
        className={`${className} object-contain`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={title || name}
      title={title || name}
      className={`${className} inline-flex items-center justify-center rounded-md bg-secondary/50 text-muted-foreground text-[10px] font-semibold`}
    >
      {initials}
    </div>
  );
}
