import { useState, useEffect } from "react";

export function useTheme() {
  const getIsPastel = () =>
    document.documentElement.classList.contains("pastel") ||
    document.body.classList.contains("pastel");

  const [isPastel, setIsPastel] = useState(getIsPastel);

  useEffect(() => {
    const observer = new MutationObserver(() => setIsPastel(getIsPastel()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return { isPastel };
}
