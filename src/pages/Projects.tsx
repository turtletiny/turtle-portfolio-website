import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import { FolderGit2, Terminal, Gamepad2, Globe, Github, ExternalLink, Lightbulb, CheckCircle2, Construction } from "lucide-react";

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground font-main">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[900px] flex flex-col gap-10 px-4 pb-12">
        
        {/* Header Card  */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={FolderGit2} pastelEmoji="📁" /> MY WORK
          </div>
          <h1 className="text-3xl font-bold">Projects.</h1>
          <p className="text-muted-foreground leading-relaxed">
            A collection of things I've built, what I'm currently hacking away at, and where I'm headed next. I'm currently pivoting to focus more on Python and Game Development.
          </p>
        </div>

        {/* --- SECTION: CURRENTLY WORKING ON --- */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 px-1">
            
            <Construction size={14} className="text-foreground pastel:text-orange-500" /> CURRENTLY WORKING ON
          </div>
          
          <div className="grid grid-cols-1 gap-4">
             {/* Personal Website  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-secondary rounded-lg">
                    
                    <Globe size={20} className="text-foreground pastel:text-primary" />
                   </div>
                   <h2 className="text-xl font-bold">Personal Portfolio</h2>
                </div>
                <div className="flex gap-2">
                  <a href="#" className="p-2 bg-secondary rounded hover:text-primary transition-all hover:scale-110">
                    <Github size={18} />
                  </a>
                  <a href="#" className="p-2 bg-secondary rounded hover:text-primary transition-all hover:scale-110">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              
              <div className="text-muted-foreground leading-relaxed text-sm">
                <p>The website you are looking at right now! My first project using React and Tailwind. I plan to slowly implement the following features:</p>
                <ul className="mt-3 space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-foreground pastel:bg-primary" />
                    <span>Further tweak and polish the pastel theme + add more custom icons for weather status, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-foreground pastel:bg-primary" />
                    <span>Add a 3rd gothic/demonic/emo/edgy/religious theme.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-foreground pastel:bg-primary" />
                    <span>Add more interactive elements like desktop pets in the corner.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border">REACT</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border">TYPESCRIPT</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border">TAILWIND CSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION: COMPLETED PROJECTS --- */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 px-1">
            
            <CheckCircle2 size={14} className="text-foreground pastel:text-green-500" /> COMPLETED
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pokemon Game  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Custom Pokemon Game</h2>
                <a href="#" className="p-2 bg-secondary rounded hover:text-primary transition-all hover:scale-110">
                  <Github size={18} />
                </a>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A small 2D Pokemon Clone with a short custom storyline and classic pokemon battle mechanics.
              </p>
              <div className="w-full aspect-video bg-secondary rounded-lg border border-border overflow-hidden mt-auto">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" 
                  alt="Retro gaming" 
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">Python</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">Pygame</span>
              </div>
            </div>

            {/* Spaceshooter  */}
            <div className="card-base flex flex-col gap-4 group transition-all duration-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Spaceshooter</h2>
                <a href="#" className="p-2 bg-secondary rounded hover:text-primary transition-all hover:scale-110">
                  <Github size={18} />
                </a>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                My very first personal project. A classic 2D arcade shooter that taught me the fundamentals of game loops.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">Python</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold border border-border uppercase">Pygame</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION: FUTURE PLANS --- */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 px-1">
    
            <Lightbulb size={14} className="text-foreground pastel:text-yellow-500" /> FUTURE IDEAS & PLANS
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Gamedev in Godot", desc: "Moving from Pygame to a dedicated engine for more complex 2D projects." },
              { title: "Advanced Python Automation", desc: "Building scripts to automate my university workflow and data management." },
              { title: "Chess Engine", desc: "A simple chess AI using Python to deepen my understanding of algorithms." },
              { title: "Mobile App Portfolio", desc: "Exploring React Native to bring my web projects to iOS/Android." }
            ].map((idea, i) => (
              <div key={i} className="p-4 bg-secondary/40 rounded-xl border border-border border-dashed flex flex-col gap-2 transition-all">
                <h3 className="font-bold text-sm">{idea.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{idea.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}