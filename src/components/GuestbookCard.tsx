import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, MessageSquare, Loader2 } from "lucide-react";

export default function GuestbookCard() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // NEW: Controls our pop-up
  const queryClient = useQueryClient();

  // 1. Fetch messages
  const { data: messages, isLoading } = useQuery({
    queryKey: ["guestbook"],
    queryFn: async () => {
      const res = await fetch("/api/guestbook");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  // 2. Submit a new message
  const mutation = useMutation({
    mutationFn: async (newEntry: { name: string; message: string }) => {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guestbook"] });
      setName("");
      setMessage("");
      
      // Show the popup, then hide it smoothly after 3 seconds
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const finalName = name.trim() === "" ? "Anonymous" : name;
    mutation.mutate({ name: finalName, message });
  };

  return (
    <>
      <div className="card-base flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-muted-foreground uppercase font-semibold text-[11px] tracking-widest">
          <MessageSquare size={16} /> GUESTBOOK
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="w-full bg-secondary text-foreground text-sm p-4 rounded-xl border border-transparent focus:outline-none focus:border-primary transition-colors"
            maxLength={40}
          />
          
          <div className="flex gap-3 items-center">
            <div className="flex-1 flex flex-col gap-1">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a comment..."
                className="w-full bg-secondary text-foreground text-sm p-4 rounded-xl border border-transparent resize-none focus:outline-none focus:border-primary transition-colors min-h-[90px]"
                maxLength={300}
              />
              <div className="flex justify-end pr-1">
                <span className={`text-[10px] font-medium transition-colors ${message.length >= 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {message.length}/300
                </span>
              </div>
            </div>

            {/* Send Button */}
            <button 
              type="submit"
              disabled={mutation.isPending || !message.trim()}
              className="w-12 h-12 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
              title="Sign Guestbook"
              style={{
                backgroundColor: "hsl(var(--spotify-btn-bg))",
                borderColor: "hsl(var(--spotify-btn-border))",
                color: "hsl(var(--spotify-btn-text))",
              }}
              onMouseEnter={(e) => {
                if (!mutation.isPending && message.trim()) {
                  e.currentTarget.style.backgroundColor = "hsl(var(--spotify-btn-hover-bg))";
                  e.currentTarget.style.boxShadow = "var(--spotify-bar-glow)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--spotify-btn-bg))";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {mutation.isPending ? (
                <Loader2 size={18} className="animate-spin" /> 
              ) : (
                <Send size={18} className="mr-0.5 mt-0.5" /> 
              )}
            </button>
          </div>
        </form>

        {/* Messages List */}
        <div className="flex flex-col gap-5 pt-3 max-h-[350px] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="text-center py-6 text-sm text-muted-foreground/80">
              <Loader2 className="animate-spin mx-auto mb-2" />
              Loading messages...
            </div>
          ) : (
            messages?.map((msg: any) => (
              <div key={msg.id} className="text-sm p-1 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <div className="flex justify-between items-center text-muted-foreground text-[12px] mb-2 pr-1">
                  <span className="font-semibold text-foreground">{msg.name}</span>
                  <span className="font-medium tracking-tight">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed italic pr-1">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* THE NEW SUCCESS POP-UP */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm transition-all duration-500 ease-out ${
          showPopup ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className={`bg-secondary p-8 rounded-[30px] shadow-2xl flex flex-col items-center gap-5 border border-border transition-all duration-500 ease-out transform ${
            showPopup ? "scale-100 translate-y-0" : "scale-90 translate-y-8"
          }`}
        >
          <img 
            src="https://media1.tenor.com/m/Zp9T6D32_e0AAAAC/chiikawa.gif" 
            alt="Chiikawa Heart" 
            className="w-32 h-32 object-contain"
          />
          <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
            Thank you for visiting my page!
          </h2>
        </div>
      </div>
    </>
  );
}