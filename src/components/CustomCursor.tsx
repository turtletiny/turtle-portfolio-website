import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      // 1. Update Position
      setPosition({ x: e.clientX, y: e.clientY });

      // 2. Real-Time Detection
      const hasDarkClass =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");

      const bgColor = window.getComputedStyle(document.body).backgroundColor;
      const isActuallyDark =
        hasDarkClass ||
        bgColor.includes("rgb(0,") ||
        bgColor.includes("rgb(10,");

      setIsDark(isActuallyDark);
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {isDark ? (
          // dark mode cursor: crosshiar
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute w-5 h-[1.5px] bg-white shadow-[0_0_10px_white]" />
            <div className="absolute h-5 w-[1.5px] bg-white shadow-[0_0_10px_white]" />
          </div>
        ) : (
          // pasel mode cursor: pixel kirby
          <div className="relative w-10 h-10 drop-shadow-md">
            <img
              src="/kirbysword.png"
              alt="Kirby Cursor"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
