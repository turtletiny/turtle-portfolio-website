import { useTheme } from "@/hooks/useTheme";
import { LucideIcon } from "lucide-react";

interface CardSectionIconProps {
  darkIcon: LucideIcon;
  pastelEmoji: string;
  size?: number;
}

export default function CardSectionIcon({ darkIcon: Icon, pastelEmoji, size = 14 }: CardSectionIconProps) {
  const { isPastel } = useTheme();

  if (isPastel) {
    return <span>{pastelEmoji}</span>;
  }

  return <Icon size={size} className="text-foreground opacity-70" />;
}
