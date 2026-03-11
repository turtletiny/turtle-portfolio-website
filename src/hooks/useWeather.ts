import { useState, useEffect } from "react";
import { Sun, Cloud, CloudFog, CloudRain, CloudSnow, CloudSun, CloudLightning, type LucideIcon } from "lucide-react";

interface WeatherData {
  temp: number;
  code: number;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetch_() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-33.8688&longitude=151.2093&current_weather=true"
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          code: data.current_weather.weathercode,
        });
      } catch (e) {
        console.error("Weather fetch failed:", e);
      }
    }
    fetch_();
  }, []);

  return weather;
}

export function getWeatherIcon(code: number): LucideIcon {
  if (code === 0) return Sun;
  if (code <= 3) return CloudSun;
  if (code >= 45 && code <= 48) return CloudFog;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 80 && code <= 82) return CloudRain;
  if (code >= 95) return CloudLightning;
  return Cloud;
}
