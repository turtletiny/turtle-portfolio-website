import { Link, useLocation } from "react-router-dom";
import { FolderKanban, Home, TerminalSquare, UserRound, type LucideIcon } from "lucide-react";

const links: { label: string; to: string; icon: LucideIcon }[] = [
  { label: "Home", to: "/main", icon: Home },
  { label: "About", to: "/about", icon: UserRound },
  { label: "Projects", to: "/projects", icon: FolderKanban },
  { label: "Terminal", to: "/terminal", icon: TerminalSquare },
];

export default function DashboardNavbar() {
  const location = useLocation();

  return (
    <nav className="w-full py-4 md:py-6 flex justify-center sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border mb-8 px-4 md:px-4 relative">
      <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 md:gap-4 items-center">
        {links.map((l) => {
          const Icon = l.icon;
          const isActive = location.pathname === l.to;

          return (
            <Link
              key={l.to}
              to={l.to}
              aria-label={l.label}
              title={l.label}
              className={`text-sm font-medium border-2 transition-all duration-200 hover:scale-105 flex items-center justify-center rounded-lg h-11 w-11 md:h-9 md:w-auto px-0 md:px-4 ${
                isActive
                  ? "text-foreground border-foreground shadow-sm bg-secondary/20"
                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-border/50"
              }`}
            >
              <Icon className="h-4 w-4 md:hidden" aria-hidden="true" />
              <span className="hidden md:inline">{l.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}