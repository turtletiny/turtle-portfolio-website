import { useState, useEffect } from "react";

export function useTheme() {
  const [isPastel, setIsPastel] = useState(
    () => document.documentElement.classList.contains("pastel")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsPastel(document.documentElement.classList.contains("pastel"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return { isPastel };
}
