export const GUESTBOOK_QUERY_KEY = ["guestbook"] as const;
export const GUESTBOOK_MAX_NAME_LENGTH = 40;
export const GUESTBOOK_MAX_MESSAGE_LENGTH = 200;

export interface GuestbookMessage {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export interface GuestbookEntryInput {
  name: string;
  message: string;
}

export async function fetchGuestbookMessages(): Promise<GuestbookMessage[]> {
  const res = await fetch("/api/guestbook");
  if (!res.ok) {
    throw new Error("Failed to fetch guestbook messages");
  }
  return res.json();
}

export async function postGuestbookEntry(
  newEntry: GuestbookEntryInput,
): Promise<{ success: boolean }> {
  const res = await fetch("/api/guestbook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  });

  if (!res.ok) {
    throw new Error("Failed to post message");
  }

  return res.json();
}
