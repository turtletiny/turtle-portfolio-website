import { Link, useLocation } from "react-router-dom";
import { Terminal } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
];

export default function DashboardNavbar() {
  const location = useLocation();
  const isTerminalActive = location.pathname === "/terminal";

  return (
    <nav className="w-full py-4 md:py-6 flex justify-center sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border mb-8 px-14 md:px-4 relative">
      <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 md:gap-4">
        {links.map((l) => {
          const isActive = location.pathname === l.to;

          return (
            <Link
              key={l.to}
              to={l.to}
              
              className={`text-sm font-medium px-4 py-1.5 border-2 transition-all duration-200 hover:scale-105 flex items-center justify-center h-9 ${
                isActive
                  ? "text-foreground border-foreground shadow-sm bg-secondary/20 rounded-md" 
                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-border/50 rounded-lg" 
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      <Link
        to="/terminal"
        aria-label="Open terminal"
        title="Open terminal"
        className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-9 w-9 rounded-md border-2 flex items-center justify-center transition-all duration-200 hover:scale-105 ${
          isTerminalActive
            ? "text-foreground border-foreground shadow-sm bg-secondary/20"
            : "text-muted-foreground border-transparent hover:text-foreground hover:border-border/50"
        }`}
      >
        <Terminal size={16} />
      </Link>
    </nav>
  );
}