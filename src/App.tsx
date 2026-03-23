import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Page Imports
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Callback from "./pages/Callback";
import NotFound from "./pages/NotFound";
import GuestbookPage from "./pages/GuestbookPage";
import Particles from "@/components/effects/Particles";
import { useTheme } from "@/hooks/useTheme";

const queryClient = new QueryClient();

const App = () => {
  const { isPastel } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
        {/* GLOBAL FIXED BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          
          <Particles
            key={isPastel ? "pastel-stars" : "dark-stars"}
            particleColors={isPastel ? ["#ef4444"] : ["#ffffff"]}
            particleCount={700}
            particleSpread={10}
            speed={0.03}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* WRAP CONTENT IN RELATIVE Z-10 */}
        <div className="relative z-10 w-full min-h-screen">
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/guestbook" element={<GuestbookPage />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Analytics />
          <SpeedInsights />
        </div>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;