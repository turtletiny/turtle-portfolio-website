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
        src: "/Showcase/desktop_home.png",
        alt: "Portfolio website landing page preview",
        device: "laptop",
      },
      {
        id: "portfolio-shot-2",
        kind: "image",
        title: "Mobile view",
        src: "/pixelbook.png",
        alt: "Portfolio website mobile view",
        device: "mobile",
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
        device: "mobile",
      },
      {
        id: "planner-note",
        kind: "text",
        title: "Current status",
        description:
          "Work In Progress",
      },
    ],
  },
  
];
