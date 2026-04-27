import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
  title?: string;
}

// Neutral placeholder for tech stack entries. Shows initials inside a rounded box.
export default function TechIcon({ name, className = "h-4 w-4", title }: TechIconProps) {
  const initials = name
    .split(/[^A-Za-z0-9]/)
    .filter(Boolean)
    .map((s) => s[0].toUpperCase())
    .slice(0, 2)
    .join("") || "?";

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
