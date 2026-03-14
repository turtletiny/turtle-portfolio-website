import { useState, useEffect } from "react";
import { Sparkles, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isPastel, setIsPastel] = useState(
    () => localStorage.getItem("theme") === "pastel",
  );

  useEffect(() => {
    if (isPastel) {
      document.documentElement.classList.add("pastel");
    } else {
      document.documentElement.classList.remove("pastel");
    }
    localStorage.setItem("theme", isPastel ? "pastel" : "dark");
  }, [isPastel]);

  return (
    <button
      onClick={() => setIsPastel(!isPastel)}
      className="fixed top-6 left-6 z-[1001] bg-transparent border-none text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 hover:rotate-12"
      title="Change Theme"
    >
      {isPastel ? <Moon size={28} /> : <Sparkles size={28} />}
    </button>
  );
}
