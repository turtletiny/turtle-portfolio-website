import { useLocalTime } from "@/hooks/useLocalTime";
import { useWeather, getWeatherIcon } from "@/hooks/useWeather";
import { Clock } from "lucide-react";

export default function TimeWeatherCard() {
  const time = useLocalTime();
  const weather = useWeather();
  const WeatherIcon = weather ? getWeatherIcon(weather.code) : null;

  return (
    <div className="card-base flex flex-col">
      <div className="text-xs font-bold tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
        {/* Dark Mode Icon */}
        <Clock size={16} className="block [.pastel_&]:hidden" />
        
        {/* Pastel Mode Custom Image (Size increased to w-5 h-5) */}
        <img 
          src="pixelclock.png" 
          alt="Time" 
          className="hidden [.pastel_&]:block w-5 h-5 object-contain" 
        />
        
        LOCAL TIME
      </div>

      <div className="flex items-center justify-between flex-grow pb-3">
        <div className="flex flex-col">
          <p className="font-bold text-3xl tabular-nums tracking-wide">
            {time || "--:--:--"}
          </p>
          <p className="text-muted-foreground text-sm font-medium">
            Sydney, Australia
          </p>
        </div>

        <div className="flex items-center gap-3">
          {WeatherIcon ? (
            <WeatherIcon size={60} className="text-foreground" />
          ) : (
            <div className="w-9 h-9 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          )}
          <p className="font-bold text-3xl leading-none">
            {weather ? `${weather.temp}°C` : "--°C"}
          </p>
        </div>
      </div>
    </div>
  );
}