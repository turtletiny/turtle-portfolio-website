import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import { Camera, X } from "lucide-react";
import { useState } from "react";

const isVideo = (url: string) => {
  if (!url) return false;
  return url.match(/\.(mp4|webm|ogg)$/i);
};

const GalleryItems = [
  {
    id: 1,
    title: "Chiikawa",
    description: "asd",
    image: "",
    tags: [""],
  },
  {
    id: 2,
    title: "",
    description: "",
    image: "",
    tags: [],
  },
  {
    id: 3,
    title: "",
    description: "",
    image: "",
    tags: [],
  },
  {
    id: 4,
    title: "",
    description: "",
    image: "banana.mp4",
    tags: [],
  },
  {
    id: 5,
    title: "",
    description: "",
    image: "",
    tags: [],
  },
  {
    id: 6,
    title: "title here",
    description: "desc here",
    image: "image link here",
    tags: ["", "", "tag1"],
  },
];

// --- Main Component ---

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground font-main">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[900px] flex flex-col gap-6 px-4 pb-12">
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={Camera} pastelEmoji="🐰" /> GALLERY
          </div>
          <h1 className="text-3xl font-bold">
            Gallery UNDER CONSTRUCTION COMING SOON
          </h1>
          <p className="text-muted-foreground leading-relaxed">wait</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {GalleryItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square rounded-lg overflow-hidden border-2 bg-secondary cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ borderColor: "transparent" }}
              onMouseEnter={(e) => {
                const isDarkMode =
                  document.documentElement.classList.contains("dark");

                if (isDarkMode) {
                  e.currentTarget.style.borderColor = "white";
                } else {
                  e.currentTarget.style.borderColor = "hsl(var(--primary))";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
              }}
              onClick={() => handleItemClick(item)}
            >
              {isVideo(item.image) ? (
                <video
                  src={item.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm overflow-auto"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-[1100px] flex flex-col md:flex-row gap-8 bg-card rounded-xl border border-border p-6 relative shadow-2xl overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-secondary rounded-lg text-muted-foreground hover:text-destructive transition-colors z-10"
              onClick={handleCloseModal}
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-2/3 aspect-[4/3] rounded-lg overflow-hidden border border-border flex items-center justify-center bg-black">
              {isVideo(selectedItem.image) ? (
                <video
                  src={selectedItem.image}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="card-base flex flex-col gap-4 w-full md:w-1/3 p-6 flex-shrink-0">
              <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
                <CardSectionIcon darkIcon={Camera} pastelEmoji="📸" /> DETAILS
              </div>

              <h2 className="text-xl font-bold">{selectedItem.title}</h2>

              <p className="text-muted-foreground leading-relaxed text-sm">
                {selectedItem.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {selectedItem.tags.map(
                  (tag: string, index: number) =>
                    tag && (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary rounded-full text-xs font-medium border border-border"
                      >
                        {tag}
                      </span>
                    ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
