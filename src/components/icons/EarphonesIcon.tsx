import { useTheme } from "@/hooks/useTheme";

const EarphonesIcon = ({ size = 24, className }: { size?: number, className?: string }) => {
  const { isPastel } = useTheme();

  return (
    <img 

      src={isPastel ? "/blackearphones2.svg" : "/earphones2.svg"}
      alt="Earphones Icon" 
      width={size} 
      height={size} 
      className={className} 
    />
  );
};

export default EarphonesIcon;