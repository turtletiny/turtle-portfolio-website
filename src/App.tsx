import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useIsMobile } from "@/hooks/useMobile";

// Page Imports
import { useTheme } from "@/hooks/useTheme";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Callback = lazy(() => import("./pages/Callback"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GuestbookPage = lazy(() => import("./pages/GuestbookPage"));
const Particles = lazy(() => import("@/components/effects/Particles"));

const queryClient = new QueryClient();

const App = () => {
  const { isPastel } = useTheme();
  const isMobile = useIsMobile();

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
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/guestbook" element={<GuestbookPage />} />
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