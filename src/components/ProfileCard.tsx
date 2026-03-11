import { useLanyard } from "@/hooks/useLanyard";

import { Instagram, Twitter } from "lucide-react";

import TikTokIcon from "@/components/icons/TikTokIcon";

import SpotifyIcon from "@/components/icons/SpotifyIcon";

import YouTubeIcon from "@/components/icons/YouTubeIcon";



const DISCORD_ID = "644484730070237215";



const socials = [

  { icon: YouTubeIcon, href: "https://www.youtube.com/@turtletiny", label: "YouTube", hoverClass: "group/yt", iconSize: 18 },

  { icon: TikTokIcon, href: "https://www.tiktok.com/@turtletinys", label: "TikTok", hoverClass: "group/tt", iconSize: 22 },

  { icon: Instagram, href: "https://www.instagram.com/daniel.dwn.l/", label: "Instagram", hoverClass: "hover:text-pink-500", iconSize: 18 },

  { icon: SpotifyIcon, href: "https://open.spotify.com/user/cwisfzvgaytquodxoyz02b7l3", label: "Spotify", hoverClass: "hover:text-primary", iconSize: 18 },

  { icon: Twitter, href: "https://x.com/turtletiny_", label: "Twitter", hoverClass: "hover:text-foreground", iconSize: 18 },

];



const statusColors: Record<string, string> = {

  online: "bg-status-online",

  idle: "bg-status-idle",

  dnd: "bg-status-dnd",

  offline: "bg-status-offline",

};



export default function ProfileCard() {

  const data = useLanyard();



  const displayName = data?.discord_user.global_name || data?.discord_user.username || "Loading...";

  const username = data ? `@${data.discord_user.username}` : "@loading...";

  const status = data?.discord_status || "offline";

  const customStatus = data?.activities?.find((a) => a.type === 4)?.state || "";



  const avatarUrl = data?.discord_user.avatar

    ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=128`

    : null;



  const decorationUrl = data?.discord_user.avatar_decoration_data

    ? `https://cdn.discordapp.com/avatar-decoration-presets/${data.discord_user.avatar_decoration_data.asset}.png?size=240&passthrough=true`

    : null;



  return (

    <div className="card-base flex flex-col gap-8">

      <div className="flex items-center gap-6">

        {/* prodile */}

        <a href="https://discord.com/users/644484730070237215" target="_blank" rel="noopener noreferrer" className="relative w-20 h-20 flex-shrink-0 overflow-visible hover:scale-105 transition-transform">

          <div

            className="w-full h-full rounded-full bg-border bg-cover bg-center"

            style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : {}}

          />

          <div className={`absolute bottom-0 right-0 w-[22px] h-[22px] rounded-full border-4 border-card z-[6] ${statusColors[status]}`} />

          {decorationUrl && (

            <img

              src={decorationUrl}

              alt="Decoration"

              className="absolute inset-0 w-full h-full scale-[1.24] object-contain pointer-events-none z-[5]"

            />

          )}

        </a>



        <div>

          <a href="https://discord.com/users/644484730070237215" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold leading-tight hover:text-primary transition-colors">

            {displayName}

          </a>

          <a href="https://discord.com/users/644484730070237215" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors block">

            {username}

          </a>

          {customStatus && <p className="text-foreground text-sm mt-1">{customStatus}</p>}

        </div>

      </div>



      {/* Social Links */}

      <div className="flex gap-4 pt-6 border-t border-border">

        {socials.map((s) => (

          <a

            key={s.label}

            href={s.href}

            target="_blank"

            rel="noopener noreferrer"

            aria-label={s.label}

            className={`flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground transition-all duration-200 hover:bg-border hover:scale-110 ${s.hoverClass}`}

          >

            <s.icon size={s.iconSize} />

          </a>

        ))}

      </div>

    </div>

  );

}