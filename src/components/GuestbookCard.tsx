import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function GuestbookCard() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
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
      toast.success("Signed!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    mutation.mutate({ name, message });
  };

  return (
    <div className="card-base flex flex-col gap-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <MessageSquare className="text-primary" size={20} /> Guestbook
      </h2>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="bg-secondary/50 p-2 rounded border border-border text-sm"
        />
        

<div className="flex flex-col gap-1">
  <textarea 
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Leave a note..."
    className="bg-secondary/50 p-2 rounded border border-border text-sm resize-none"
    maxLength={200} // This stops them from typing more
  />
  <div className="flex justify-end">
    <span className={`text-[10px] ${message.length >= 200 ? 'text-red-500' : 'text-muted-foreground'}`}>
      {message.length}/200
    </span>
  </div>
</div>
        <button 
          disabled={mutation.isPending}
          className="bg-primary text-primary-foreground text-sm font-bold py-2 rounded flex items-center justify-center gap-2"
        >
          <Send size={14} /> {mutation.isPending ? "Sending..." : "Sign"}
        </button>
      </form>

      <hr className="border-border" />

      {/* Display Messages */}
      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
        {isLoading ? (
          <p className="text-xs text-muted-foreground">Loading...</p>
        ) : (
          messages?.map((msg: any) => (
            <div key={msg.id} className="text-sm p-2 bg-secondary/30 rounded border border-border/50">
              <div className="flex justify-between font-bold text-[12px] mb-1">
                <span>{msg.name}</span>
                <span className="text-muted-foreground font-normal">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted-foreground italic">"{msg.message}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}