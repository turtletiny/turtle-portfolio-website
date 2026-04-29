import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ProjectDeviceMockupProps {
  src: string;
  alt: string;
  device?: "laptop" | "mobile";
  className?: string;
}

export default function ProjectDeviceMockup({
  src,
  alt,
  device = "laptop",
  className,
}: ProjectDeviceMockupProps) {
  if (device === "mobile") {
    return (
      <figure className={cn("mx-auto w-full max-w-[240px]", className)}>
        <div className="rounded-[2.4rem] border border-border/80 bg-secondary/25 p-2.5 shadow-[0_18px_50px_hsl(0_0%_0%_/_0.22)]">
          <div className="rounded-[2rem] border border-border/70 bg-card p-2.5">
            <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-muted-foreground/35" />

            <AspectRatio ratio={9 / 19.5}>
              <div className="h-full w-full overflow-hidden rounded-[1.55rem] border border-border/70 bg-black/10">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </AspectRatio>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure className={cn("mx-auto w-full max-w-[720px]", className)}>
      <div className="rounded-[2rem] border border-border/80 bg-secondary/25 p-3 shadow-[0_22px_60px_hsl(0_0%_0%_/_0.24)]">
        <div className="overflow-hidden rounded-[1.55rem] border border-border/70 bg-card">
          <AspectRatio ratio={16 / 10}>
            <div className="h-full w-full overflow-hidden bg-black/10">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </AspectRatio>
        </div>

        <div className="mx-auto mt-3 h-3 w-[38%] rounded-b-[1.5rem] rounded-t-none bg-secondary/90" />
        <div className="mx-auto mt-2 h-1 w-[18%] rounded-full bg-border/80" />
      </div>
    </figure>
  );
}