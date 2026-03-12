import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import { BookOpen, Video, Lightbulb, Link as LinkIcon, ExternalLink } from "lucide-react";

//frameworks used (icons, modules, etc)
//tutorials/learning resources used
//general learning 
//cool tools + social media pages etc

const learningLinks = [
  { title: "React Documentation", url: "https://react.dev", desc: "react" },
  { title: "Tailwind CSS", url: "https://tailwindcss.com/docs", desc: "d" },
  { title: "Lucide Icons", url: "https://lucide.dev/", desc: "icons" }
];

const tutorialLinks = [
  { title: "a", url: "google.com", desc: "dec" },
  { title: "b", url: "b", desc: "Tdesc" },
  { title: "c", url: "a", desc: "qqq" }
];

const inspirationLinks = [
  { title: "Godly Website", url: "https://godly.website/", desc: "collection of cool ui websites" }
];

const otherLinks = [
  { title: "Coolors", url: "https://coolors.co/", desc: "cool colour palette site can be useful" }
];

export default function Credits() {

  const LinkItem = ({ link }: { link: any }) => (
    <a 
      href={link.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group flex flex-col gap-1 p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary transition-colors"
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
        
        {/* Header Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={LinkIcon} pastelEmoji="🔗" /> RESOURCES
          </div>
          <h1 className="text-3xl font-bold">Credits & Links.</h1>
          <p className="text-muted-foreground leading-relaxed">
            Credits, inspirations, other links
          </p>
        </div>

        {/* Learning Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={BookOpen} pastelEmoji="📖" /> LEARNING & DOCS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningLinks.map((link, i) => <LinkItem key={i} link={link} />)}
          </div>
        </div>

        {/* Tutorials Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Video} pastelEmoji="▶️" /> TUTORIALS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutorialLinks.map((link, i) => <LinkItem key={i} link={link} />)}
          </div>
        </div>

        {/* Inspiration Card */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Lightbulb} pastelEmoji="💡" /> INSPIRATION
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inspirationLinks.map((link, i) => <LinkItem key={i} link={link} />)}
          </div>
        </div>

        {/* Other Card */}
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