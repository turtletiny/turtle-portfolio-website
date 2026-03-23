import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileCard from "@/components/cards/ProfileCard";
import FavouriteSongCard from "@/components/cards/FavouriteSongCard";
import SpotifyCard from "@/components/cards/SpotifyCard";
import TimeWeatherCard from "@/components/cards/TimeWeatherCard";
import SteamCard from "@/components/cards/SteamCard";
import GuestbookCard from "@/components/cards/GuestbookCard";
import SpecsCard from "@/components/cards/SpecsCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-foreground font-main relative z-10">
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
