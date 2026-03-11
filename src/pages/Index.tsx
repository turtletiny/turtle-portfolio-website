import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileCard from "@/components/ProfileCard";
import FavouriteSongCard from "@/components/FavouriteSongCard";
import SpotifyCard from "@/components/SpotifyCard";
import TimeWeatherCard from "@/components/TimeWeatherCard";
import SteamCard from "@/components/SteamCard";
import GuestbookCard from "@/components/GuestbookCard";
import SpecsCard from "@/components/SpecsCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground font-main">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[900px] flex flex-col gap-6 px-4 pb-12">
        {/* Top Row: Profile + Favourite Song */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard />
          <FavouriteSongCard />
        </div>

        {/* Bottom Grid: Spotify, Time, Steam, Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotifyCard />
          <TimeWeatherCard />
          <SteamCard />
          <SpecsCard />
        </div>

        {/* Guestbook */}
        <GuestbookCard />
      </div>
    </div>
  );
};

export default Index;
