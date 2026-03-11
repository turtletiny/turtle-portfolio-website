import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import { BookOpen, Video, Lightbulb, Link as LinkIcon, ExternalLink } from "lucide-react";



const learningLinks = [
  { title: "React Documentation", url: "https://react.dev", desc: "The official docs. Essential for understanding hooks, components, and routing." },
  { title: "Python.org Docs", url: "https://docs.python.org/3/", desc: "My go-to reference manual for standard libraries and syntax while working on scripts." },
  { title: "Tailwind CSS", url: "https://tailwindcss.com/docs", desc: "The utility-first CSS framework used to style this entire website." }
];

const tutorialLinks = [
  { title: "Fireship", url: "https://www.youtube.com/c/Fireship", desc: "High-intensity, incredibly fast coding tutorials and tech news on YouTube." },
  { title: "Kevin Powell", url: "https://www.youtube.com/@KevinPowell", desc: "The absolute best resource for deeply understanding CSS and responsive design." },
  { title: "Clear Code", url: "https://www.youtube.com/@ClearCode", desc: "Fantastic, long-form tutorials. Their Pygame guides are incredibly helpful." }
];

const inspirationLinks = [
  { title: "Lovable", url: "https://lovable.dev", desc: "The AI web builder that helped me generate the initial scaffolding for this site." },
  { title: "Godly Website", url: "https://godly.website/", desc: "A directory of incredibly well-designed, highly animated websites for UI/UX inspiration." },
  { title: "Awwwards", url: "https://www.awwwards.com/", desc: "Awards recognizing the talent and effort of the best web designers and developers in the world." }
];

const otherLinks = [
  { title: "Lucide Icons", url: "https://lucide.dev/", desc: "The clean, beautiful open-source icon set I use across all my project cards." },
  { title: "Coolors", url: "https://coolors.co/", desc: "A super fast color palettes generator to figure out what colors look good together." },
  { title: "Monkeytype", url: "https://monkeytype.com/", desc: "A minimalistic typing test. Great for warming up the fingers before a coding session." }
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
            A collection of tools, documentation, tutorials, and general inspiration that helped make this website (and my other projects) possible. Plus a few other random corners of the internet I think are neat.
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