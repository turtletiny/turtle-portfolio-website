// --- Imports ---

import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import { BookOpen, Video, Lightbulb, Link as LinkIcon, ExternalLink, Layers } from "lucide-react";

// --- Data ---

const techStack = [
  { title: "React", desc: "UI Library", url: "https://react.dev/" },
  { title: "TypeScript", desc: "Programming Language", url: "https://www.typescriptlang.org/" },
  { title: "Tailwind CSS", desc: "Styling & Design", url: "https://tailwindcss.com/" },
  { title: "Vite", desc: "Build Tool", url: "https://vite.dev/" },
  { title: "Shadcn UI", desc: "Component Architecture", url: "https://ui.shadcn.com/" },
  { title: "Lucide React", desc: "Iconography", url: "https://lucide.dev/" },
  { title: "Vercel", desc: "Hosting & Analytics", url: "https://vercel.com/" }
];

const learningLinks = [
  { title: "Spotify API Integration", url: "https://medium.com/@drimesbot/how-to-show-what-youre-currently-listening-to-on-your-personal-website-or-portfolio-spotify-635f433978a0", desc: "Tutorial Article" },
  { title: "The Odin Project", url: "https://www.theodinproject.com/", desc: "Project-Based Web Dev Course" },
  { title: "Lucide Icons", url: "https://lucide.dev/", desc: "icons" }
];


const inspirationLinks = [
  { title: "Godly Website", url: "https://godly.website/", desc: "collection of cool ui websites" },
  { title: "Web of Devs", url: "https://webofdevs.com/", desc: "Collection of Dev Portfolio Sites"}
];

const otherLinks = [
  { title: "Coolors", url: "https://coolors.co/", desc: "cool colour palette site can be useful"},
  { title: "Protocol Cards", url: "https://protocolcards.com/", desc: "Cool little protocols for calming anxiety"},
  { title: "forgoodcode", url: "https://www.instagram.com/forgoodcode", desc: "Useful Instagram page on using AI effectively, learning resources, etc"},
  { title: "bigpro427", url: "https://www.tiktok.com/@bigpro427", desc: "Goldmine of science based lifting clearly presented"},
  { title: "Erin Meryl", url: "https://www.youtube.com/@erinmerylstudy/videos", desc: "Pretty entertaining and useful study content"}

];

// --- Components ---

export default function Credits() {

  const LinkItem = ({ link }: { link: any }) => (
    <a 
      href={link.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group flex flex-col gap-1 p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[15px] group-hover:text-primary transition-colors">{link.title}</h3>
        <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{link.desc}</p>
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground font-main">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[900px] flex flex-col gap-6 px-4 pb-12">
        
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={LinkIcon} pastelEmoji="🔗" /> RESOURCES
          </div>
          <h1 className="text-3xl font-bold">Credits & Links.</h1>
          <p className="text-muted-foreground leading-relaxed">
            Credits, inspirations, other links, and the core tech stack powering this site.
          </p>
        </div>

        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Layers} pastelEmoji="🥞" /> TECH STACK
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.map((link, i) => <LinkItem key={i} link={link} />)}
          </div>
        </div>

        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={BookOpen} pastelEmoji="📖" /> LEARNING
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningLinks.map((link, i) => <LinkItem key={i} link={link} />)}
          </div>
        </div>

        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Lightbulb} pastelEmoji="💡" /> INSPIRATION
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inspirationLinks.map((link, i) => <LinkItem key={i} link={link} />)}
          </div>
        </div>

        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={LinkIcon} pastelEmoji="✨" /> OTHER COOL STUFF
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherLinks.map((link, i) => <LinkItem key={i} link={link} />)}
          </div>
        </div>

      </div>
    </div>
  );
}