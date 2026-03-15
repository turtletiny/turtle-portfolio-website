import { Link } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Credits", to: "/credits" },
];

export default function DashboardNavbar() {
  return (
    // Added px-14 on mobile to protect the corners, and allowed wrapping
    <nav className="w-full py-4 md:py-6 flex justify-center sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border mb-8 px-14 md:px-4">
      {/* Reduced gap on mobile (gap-x-4), expands back to gap-8 on desktop */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-8">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-200 hover:scale-110"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}