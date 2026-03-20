import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      // cursor positioning
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

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

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleContextMenu = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div
      // hide cursor on mobile
      className={`hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {isDark ? (
          // dark mode cursor: crosshair
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-7 h-[3px] bg-white shadow-[0_0_10px_white]" />
            <div className="absolute h-7 w-[3px] bg-white shadow-[0_0_10px_white]" />
          </div>
        ) : (
          // pastel mode cursor: pixel kirby
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
