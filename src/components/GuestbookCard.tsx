import { useState, useEffect } from "react";
import { MessageSquare, Send } from "lucide-react";
import CardSectionIcon from "@/components/CardSectionIcon";

interface GuestbookEntry {
  id: string;
  name: string;
  comment: string;
  timestamp: number;
}

const STORAGE_KEY = "guestbook-entries";
const MAX_NAME_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

function loadEntries(): GuestbookEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: GuestbookEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function GuestbookCard() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedComment = comment.trim();
    if (!trimmedComment) return;

    const newEntry: GuestbookEntry = {
      id: crypto.randomUUID(),
      name: name.trim() || "Anonymous",
      comment: trimmedComment,
      timestamp: Date.now(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setName("");
    setComment("");
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="card-base flex flex-col">
      <div className="text-xs font-bold tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
        <CardSectionIcon darkIcon={MessageSquare} pastelEmoji="📝" /> GUESTBOOK
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
          maxLength={MAX_NAME_LENGTH}
          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
        />
        <div className="flex gap-3">
          <textarea
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
            maxLength={MAX_COMMENT_LENGTH}
            rows={2}
            className="flex-grow bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="self-end w-11 h-11 rounded-lg border border-border bg-secondary text-muted-foreground flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-muted-foreground disabled:hover:border-border flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-right">
          {comment.length}/{MAX_COMMENT_LENGTH}
        </p>
      </form>

      {/* Entries */}
      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No entries yet — be the first to sign!
          </p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="border-b border-border pb-3 last:border-b-0 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <span className="font-semibold text-sm text-foreground">
                  {entry.name}
                </span>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTime(entry.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed break-words">
                {entry.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
