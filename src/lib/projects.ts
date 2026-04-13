import { ProjectEntry } from "@/types/project";

export const PROJECTS: ProjectEntry[] = [
  {
    id: "portfolio-website",
    name: "Personal Portfolio Website",
    summary:
      "The website you are viewing right now. Built to showcase projects, live activity widgets, and an interactive terminal experience.",
    status: "active",
    icon: "globe",
    tags: ["Website", "React", "TypeScript"],
    techStack: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Vite", icon: "vite" },
      { name: "Tailwind", icon: "tailwind" },
      { name: "Vercel", icon: "vercel" },
    ],
    features: [
      "Interactive terminal with command support",
      "Theme switching between dark and pastel modes",
      "Live widgets for Spotify, Discord, weather, and Steam",
      "Guestbook with backend persistence",
      "Responsive layout for desktop and mobile",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/turtletiny/turtle-portfolio-website" },
      { label: "Live Site", url: "https://turtletiny.lol/" },
    ],
    media: [
      {
        id: "portfolio-shot-1",
        kind: "image",
        title: "Main landing snapshot",
        src: "/pixelbook.avif",
        alt: "Portfolio website landing page preview",
      },
      {
        id: "portfolio-shot-2",
        kind: "image",
        title: "UI style preview",
        src: "/pixelbook.png",
        alt: "Portfolio interface visual preview",
      },
      {
        id: "portfolio-note",
        kind: "text",
        title: "Build notes",
        description:
          "This project is where I iterate on frontend polish, data integrations, and personal interaction design patterns.",
      },
    ],
  },
  {
    id: "student-planner-dashboard",
    name: "Student Planner Dashboard",
    summary:
      "A matcha-themed productivity dashboard designed for planning study sessions, assignments, and habit tracking.",
    status: "active",
    icon: "app-window",
    tags: ["Web App", "Productivity"],
    techStack: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node", icon: "node" },
      { name: "Database", icon: "database" },
    ],
    features: [
      "Google Calendar read/write integration",
      "Habit tracker with streak cues",
      "Pomodoro timer and assignment timeline",
      "Grade calculator and subject notes organization",
      "Cross-device sync through database integration",
    ],
    links: [],
    media: [
      {
        id: "planner-shot-1",
        kind: "image",
        title: "Dashboard concept art",
        src: "/hello.png",
        alt: "Planner dashboard mood and UI concept",
      },
      {
        id: "planner-shot-2",
        kind: "image",
        title: "Productivity visual direction",
        src: "/pixelclock.png",
        alt: "Planner feature direction graphic",
      },
      {
        id: "planner-note",
        kind: "text",
        title: "Current status",
        description:
          "In active development. Core planning systems are defined, and the interface is being refined for fast daily use.",
      },
    ],
  },
  {
    id: "spaceshooter",
    name: "Spaceshooter",
    summary:
      "My first personal project: a 2D arcade shooter that taught me game loops, collisions, and gameplay state management.",
    status: "past",
    icon: "gamepad",
    tags: ["Game", "Python"],
    techStack: [
      { name: "Python", icon: "python" },
      { name: "Pygame", icon: "pygame" },
    ],
    features: [
      "Wave-based enemies",
      "Keyboard and mouse controls",
      "Collision and scoring system",
      "Classic arcade pacing",
    ],
    links: [],
    media: [
      {
        id: "spaceshooter-shot-1",
        kind: "image",
        title: "Gameplay screen",
        src: "/pygame_ce_tiny.png",
        alt: "Spaceshooter gameplay screenshot",
      },
      {
        id: "spaceshooter-shot-2",
        kind: "image",
        title: "Retro inspiration",
        src: "/pixelcontroller.png",
        alt: "Retro game style visual",
      },
      {
        id: "spaceshooter-note",
        kind: "text",
        title: "What I learned",
        description:
          "This project established my baseline for game logic, feedback loops, and shipping complete features independently.",
      },
    ],
  },
  {
    id: "pokemon-clone",
    name: "Pokemon Game Clone",
    summary:
      "A planned 2D Pokemon-inspired adventure with custom storyline, side quests, and turn-based battle mechanics.",
    status: "future",
    icon: "gamepad",
    tags: ["Game", "RPG"],
    techStack: [
      { name: "TBD", icon: "placeholder" },
      { name: "2D Engine", icon: "placeholder" },
      { name: "Custom Battle System", icon: "placeholder" },
    ],
    features: [
      "World exploration and side quests",
      "Custom storyline design",
      "Turn-based battle loop",
      "Pokedex progression system",
    ],
    links: [],
    media: [
      {
        id: "pokemon-shot-1",
        kind: "image",
        title: "Visual inspiration",
        src: "/omegaruby.jpg",
        alt: "Pokemon-style visual inspiration",
      },
      {
        id: "pokemon-shot-2",
        kind: "image",
        title: "Battle style inspiration",
        src: "/pixelchess.png",
        alt: "Turn-based strategy style inspiration",
      },
      {
        id: "pokemon-note",
        kind: "text",
        title: "Development plan",
        description:
          "Pre-production stage. Story map, progression loops, and encounter balance are being drafted before implementation.",
      },
    ],
  },
  {
    id: "anki-clone",
    name: "Improved Anki Clone",
    summary:
      "A cleaner and more intuitive take on spaced-repetition study software with modern interaction patterns.",
    status: "future",
    icon: "app-window",
    tags: ["App", "Education"],
    techStack: [
      { name: "TBD", icon: "placeholder" },
      { name: "Spaced Repetition", icon: "placeholder" },
      { name: "Cross Platform", icon: "placeholder" },
    ],
    features: [
      "Modernized review interface",
      "Deck organization and tracking",
      "Import and export workflows",
      "Custom study settings",
    ],
    links: [],
    media: [
      {
        id: "anki-shot-1",
        kind: "image",
        title: "UI direction",
        src: "/pixelbook.png",
        alt: "Study app interface direction",
      },
      {
        id: "anki-shot-2",
        kind: "image",
        title: "Focus and pacing",
        src: "/pixelmusic.png",
        alt: "Calm focused study visual cue",
      },
      {
        id: "anki-note",
        kind: "text",
        title: "Product goal",
        description:
          "The goal is to keep spaced repetition powerful while making the daily study flow faster and less intimidating.",
      },
    ],
  },
];
