import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useIsMobile } from "@/hooks/useMobile";
import { lazyRoutes, preloadPrimaryRoutes } from "@/lib/routePreload";

// Page Imports
import { useTheme } from "@/hooks/useTheme";

const Index = lazyRoutes.Index;
const About = lazyRoutes.About;
const Projects = lazyRoutes.Projects;
const Callback = lazyRoutes.Callback;
const NotFound = lazyRoutes.NotFound;
const Terminal = lazyRoutes.Terminal;
const Particles = lazy(() => import("@/components/effects/Particles"));

const queryClient = new QueryClient();

const App = () => {
  const { isPastel } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Warm primary route chunks shortly after first paint for snappier nav switches.
    const timeoutId = window.setTimeout(() => {
      preloadPrimaryRoutes();
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
        {/* GLOBAL FIXED BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <Particles
              key={isPastel ? "pastel-stars" : "dark-stars"}
              particleColors={isPastel ? ["#ef4444"] : ["#ffffff"]}
              particleCount={isMobile ? 260 : 520}
              particleSpread={10}
              speed={0.03}
              particleBaseSize={isMobile ? 80 : 100}
              moveParticlesOnHover={!isMobile}
              alphaParticles={false}
              disableRotation={false}
            />
          </Suspense>
        </div>

        {/* WRAP CONTENT IN RELATIVE Z-10 */}
        <div className="relative z-10 w-full min-h-screen">
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Terminal />} />
                <Route path="/main" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/terminal" element={<Terminal />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Analytics />
          <SpeedInsights />
        </div>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;