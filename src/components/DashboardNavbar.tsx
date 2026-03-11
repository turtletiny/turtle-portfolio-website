import { Link } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Credits", to: "/credits" }, 
];

export default function DashboardNavbar() {
  return (
    <nav className="w-full py-6 flex justify-center sticky top-0 z-50 bg-background border-b border-border mb-8">
      <div className="flex gap-8">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-200 hover:scale-110"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}