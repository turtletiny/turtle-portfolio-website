import { Link, useLocation } from "react-router-dom";
import { Folder, Home, TerminalSquare, UserRound, type LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { preloadRoute } from "@/lib/routePreload";

const links: { label: string; to: string; icon: LucideIcon }[] = [
  { label: "Home", to: "/main", icon: Home },
  { label: "About", to: "/about", icon: UserRound },
  { label: "Projects", to: "/projects", icon: Folder },
  { label: "Terminal", to: "/terminal", icon: TerminalSquare },
];

export default function DashboardNavbar() {
  const location = useLocation();

  return (
    <nav className="w-full py-4 md:py-6 flex justify-center sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border mb-8 px-4 md:px-4 relative">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 items-center">
        {links.map((l) => {
          const Icon = l.icon;
          const isActive = location.pathname === l.to;

          return (
            <Tooltip key={l.to} delayDuration={80} disableHoverableContent>
              <TooltipTrigger asChild>
                <Link
                  to={l.to}
                  aria-label={l.label}
                  onMouseEnter={() => preloadRoute(l.to)}
                  onFocus={() => preloadRoute(l.to)}
                  onTouchStart={() => preloadRoute(l.to)}
                  className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 ease-out motion-reduce:transition-none ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`transition-[filter,color,opacity] duration-200 ease-out motion-reduce:transition-none ${
                      isActive
                        ? "h-6 w-6 opacity-100 drop-shadow-[0_0_8px_currentColor]"
                        : "h-5 w-5 opacity-80 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:drop-shadow-[0_0_6px_currentColor] group-focus-visible:drop-shadow-[0_0_6px_currentColor]"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{l.label}</span>
                </Link>
              </TooltipTrigger>

              <TooltipContent
                side="bottom"
                sideOffset={10}
                className="border-border/70 bg-background/95 text-foreground backdrop-blur-sm"
              >
                <span className="text-xs font-medium tracking-wide">{l.label}</span>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </nav>
  );
}