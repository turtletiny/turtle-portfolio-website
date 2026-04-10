import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", to: "/main" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Terminal", to: "/terminal", icon: true },
];

export default function DashboardNavbar() {
  const location = useLocation();

  return (
    <nav className="w-full py-4 md:py-6 flex justify-center sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border mb-8 px-14 md:px-4 relative">
      <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 md:gap-4 items-center">
        {links.map((l) => {
          const isActive = location.pathname === l.to;

          // Render the terminal icon inline when icon flag is set
          if (l.icon) {
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-label="Open terminal"
                title="Open terminal"
                className={`transition-all duration-200 hover:scale-105 flex items-center justify-center ${
                  isActive
                    ? "text-foreground border-foreground shadow-sm bg-secondary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <svg
                  className={`nav-terminal-icon ${isActive ? "active" : ""}`}
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                >
                  <rect x="1" y="1" width="22" height="22" rx="6" ry="6" fill="rgba(255,255,255,0.02)" stroke="currentColor" strokeWidth="1" />
                  <path d="M8 9l3 2-3 2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="15" y="14" width="4" height="1.2" rx="0.6" fill="currentColor" />
                </svg>
              </Link>
            );
          }

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
    </nav>
  );
}