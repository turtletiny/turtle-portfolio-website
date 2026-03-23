// --- Imports ---

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import CardSectionIcon from "@/components/CardSectionIcon";
import { MessageSquare, Send, User } from "lucide-react";
import { toast } from "sonner";
import {
  fetchGuestbookMessages,
  GUESTBOOK_MAX_MESSAGE_LENGTH,
  GUESTBOOK_MAX_NAME_LENGTH,
  GUESTBOOK_QUERY_KEY,
  postGuestbookEntry,
} from "@/lib/guestbook-api";

// --- Main Component ---

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  // 1. Fetch messages from our new API
  const { data: messages, isLoading } = useQuery({
    queryKey: GUESTBOOK_QUERY_KEY,
    queryFn: fetchGuestbookMessages,
  });

  // 2. Submit a new message
  const mutation = useMutation({
    mutationFn: postGuestbookEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUESTBOOK_QUERY_KEY });
      setName("");
      setMessage("");
      toast.success("Message posted! Thanks for stopping by.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const finalName = name.trim() === "" ? "Anonymous" : name.trim();
    mutation.mutate({
      name: finalName.slice(0, GUESTBOOK_MAX_NAME_LENGTH),
      message: message.trim().slice(0, GUESTBOOK_MAX_MESSAGE_LENGTH),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground font-main">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[700px] flex flex-col gap-6 px-4 pb-12">
        {/* Header Section */}
        <div className="card-base flex flex-col gap-4">
          <div className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
            <CardSectionIcon darkIcon={MessageSquare} pastelEmoji="✍️" />{" "}
            GUESTBOOK
          </div>
          <h1 className="text-3xl font-bold">Sign the Guestbook.</h1>
          <p className="text-muted-foreground leading-relaxed">
            Leave a message for me or anyone else visiting. Keep it chill!
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="card-base flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
              <User size={14} /> Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Who are you?"
              className="bg-secondary/30 border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              maxLength={GUESTBOOK_MAX_NAME_LENGTH}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
              <MessageSquare size={14} /> Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something cool..."
              className="bg-secondary/30 border border-border rounded-lg p-3 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              maxLength={GUESTBOOK_MAX_MESSAGE_LENGTH}
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-primary text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Send size={18} />
            {mutation.isPending ? "Posting..." : "Post Message"}
          </button>
        </form>

        {/* Messages List */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="text-center py-10 text-muted-foreground">
              Loading messages...
            </div>
          ) : (
            messages?.map((msg) => (
              <div
                key={msg.id}
                className="card-base flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">{msg.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
