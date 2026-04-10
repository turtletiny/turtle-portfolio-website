import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Menu, Search, SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/navigation/DashboardNavbar";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { getWeatherStatus } from "@/hooks/useWeather";
import {
  GUESTBOOK_MAX_MESSAGE_LENGTH,
  GUESTBOOK_MAX_NAME_LENGTH,
} from "@/lib/api/guestbook";

type TerminalTone = "normal" | "muted" | "success" | "error";

type TerminalEntry =
  | {
      id: string;
      kind: "input";
      command: string;
    }
  | {
      id: string;
      kind: "text";
      tone: TerminalTone;
      lines: string[];
    }
  | {
      id: string;
      kind: "suggestions";
      prompt: string;
      commands: string[];
    };

interface WeatherApiResponse {
  current_weather?: {
    temperature: number;
    weathercode: number;
  };
}

interface SpotifyApiArtist {
  name: string;
}

interface SpotifyApiItem {
  name: string;
  artists: SpotifyApiArtist[];
  duration_ms?: number;
}

interface SpotifyNowPlaying {
  is_playing: boolean;
  item?: SpotifyApiItem;
}

interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
}

interface SteamData {
  personaname: string;
  personastate: number;
  gameextrainfo?: string;
  recentGames?: SteamGame[];
}

interface GuestbookMessage {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

interface LastfmStatsResponse {
  recentTracks: Array<{
    name: string;
    artist: string;
    nowPlaying: boolean;
  }>;
  topArtists: Array<{
    name: string;
    plays: number;
  }>;
}

interface LanyardResponse {
  success: boolean;
  data?: {
    discord_user?: {
      global_name: string | null;
      username: string;
    };
    discord_status?: "online" | "idle" | "dnd" | "offline";
    activities?: Array<{
      type: number;
      state?: string;
    }>;
  };
}

const CHESS_USERNAME = "turtletinys";
const LICHESS_USERNAME = "Zappyy";

const PC_SPECS = [
  "CPU: Ryzen 5 5600",
  "GPU: RX 6600",
  "RAM: 16GB 3600MHz CL18",
  "Monitor: 1440p 240Hz OLED",
];

const PERIPHERALS = [
  "Keyboard: Drunkdeer G65",
  "Mouse: VXE Dragonfly R1 SE+",
  "Mousepad: Aqua Control II",
  "Headphones: HyperX Cloud II",
  "IEMs: Aoshida E20",
];

const COMMANDS = [
  "help",
  "clear",
  "time",
  "weather",
  "spotify",
  "steam",
  "specs",
  "profile",
  "lastfm",
  "chess",
  "guestbook list",
  "guestbook post <name>|<message>",
  "theme [dark|pastel|toggle]",
  "open [home|about|projects|guestbook|terminal]",
  "roll",
  "fortune",
  "neofetch",
] as const;

const QUICK_COMMANDS = ["help", "time", "spotify", "steam", "specs"];

const FORTUNES = [
  "Your next commit will compile first try.",
  "A side project will unexpectedly become your favorite one.",
  "Today is good for refactoring old code.",
  "You will fix a bug by deleting less code than expected.",
  "Your playlist has the right song for the next deep-work session.",
];

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
};

const promptLabel = "guest@turtletiny:~$";
const terminalWindowTitle = "guest@turtletiny: ~";

function getSydneyTime() {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Australia/Sydney",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function getSteamStatusLabel(state: number) {
  if (state === 0) return "Offline";
  if (state === 1) return "Online";
  if (state === 2) return "Busy";
  if (state === 3) return "Away";
  if (state === 4) return "Snooze";
  return "Online";
}

function applySiteTheme(mode: "dark" | "pastel" | "toggle") {
  const hasPastel =
    document.documentElement.classList.contains("pastel") ||
    document.body.classList.contains("pastel");

  const shouldUsePastel = mode === "toggle" ? !hasPastel : mode === "pastel";

  document.documentElement.classList.toggle("pastel", shouldUsePastel);
  document.body.classList.toggle("pastel", shouldUsePastel);

  return shouldUsePastel ? "pastel" : "dark";
}

function splitCommandInput(raw: string) {
  const trimmed = raw.trim();
  const firstSpace = trimmed.indexOf(" ");

  if (firstSpace === -1) {
    return { cmd: trimmed.toLowerCase(), args: "" };
  }

  return {
    cmd: trimmed.slice(0, firstSpace).toLowerCase(),
    args: trimmed.slice(firstSpace + 1).trim(),
  };
}

function levenshteinDistance(a: string, b: string) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[a.length][b.length];
}

function getCommandSuggestions(input: string) {
  const normalized = input.toLowerCase();
  return COMMANDS.map((cmd) => cmd.split(" ")[0])
    .filter((value, index, array) => array.indexOf(value) === index)
    .map((cmd) => ({ cmd, score: levenshteinDistance(normalized, cmd) }))
    .filter(({ score }) => score <= 3)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(({ cmd }) => cmd);
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

export default function TerminalPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<TerminalEntry[]>(() => [
    {
      id: createId(),
      kind: "text",
      tone: "success",
      lines: [
        "turtletiny interactive terminal",
        "Type 'help' to see available commands.",
      ],
    },
    {
      id: createId(),
      kind: "suggestions",
      prompt: "Quick start:",
      commands: QUICK_COMMANDS,
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);
  const [isAutoTyping, setIsAutoTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<number | null>(null);

  const toneClassMap: Record<TerminalTone, string> = useMemo(
    () => ({
      normal: "terminal-text",
      muted: "terminal-muted",
      success: "terminal-success",
      error: "terminal-error",
    }),
    [],
  );

  const pushEntry = useCallback((entry: TerminalEntry) => {
    setEntries((prev) => [...prev, entry]);
  }, []);

  const pushText = useCallback(
    (lines: string | string[], tone: TerminalTone = "normal") => {
      pushEntry({
        id: createId(),
        kind: "text",
        tone,
        lines: Array.isArray(lines) ? lines : [lines],
      });
    },
    [pushEntry],
  );

  const pushSuggestions = useCallback(
    (prompt: string, commands: string[]) => {
      pushEntry({
        id: createId(),
        kind: "suggestions",
        prompt,
        commands,
      });
    },
    [pushEntry],
  );

  const executeCommand = useCallback(
    async (rawCommand: string) => {
      const { cmd, args } = splitCommandInput(rawCommand);

      if (!cmd) {
        return;
      }

      if (cmd === "help") {
        pushText(
          [
            "Available commands:",
            ...COMMANDS.map((value) => `- ${value}`),
          ],
          "muted",
        );
        pushSuggestions("Try one:", ["time", "spotify", "steam", "guestbook list"]);
        return;
      }

      if (cmd === "clear") {
        setEntries([]);
        return;
      }

      if (cmd === "time") {
        pushText([
          `Sydney local time: ${getSydneyTime()}`,
          `Local date: ${new Date().toLocaleDateString("en-AU", {
            timeZone: "Australia/Sydney",
          })}`,
        ]);
        return;
      }

      if (cmd === "weather") {
        try {
          const data = await fetchJson<WeatherApiResponse>(
            "https://api.open-meteo.com/v1/forecast?latitude=-33.8688&longitude=151.2093&current_weather=true",
          );

          const current = data.current_weather;
          if (!current) {
            pushText("Weather data unavailable right now.", "error");
            return;
          }

          pushText([
            `Sydney weather: ${getWeatherStatus(current.weathercode)}`,
            `Temperature: ${Math.round(current.temperature)} C`,
          ]);
        } catch {
          pushText("Could not load weather right now.", "error");
        }
        return;
      }

      if (cmd === "spotify" || cmd === "nowplaying" || cmd === "np") {
        try {
          const data = await fetchJson<SpotifyNowPlaying>("/api/lastfm-now-playing");

          if (!data.item) {
            pushText("No track data currently available.", "muted");
            return;
          }

          const artist = data.item.artists.map((value) => value.name).join(", ");
          pushText([
            `${data.is_playing ? "Now playing" : "Last played"}: ${data.item.name}`,
            `Artist: ${artist}`,
            data.item.duration_ms
              ? `Duration: ${Math.round(data.item.duration_ms / 1000)}s`
              : "",
          ].filter(Boolean));
        } catch {
          pushText("Spotify activity request failed.", "error");
        }
        return;
      }

      if (cmd === "steam") {
        try {
          const data = await fetchJson<SteamData>("/api/steam");
          const recent = data.recentGames?.slice(0, 2) ?? [];

          pushText([
            `Steam user: ${data.personaname}`,
            data.gameextrainfo
              ? `Currently playing: ${data.gameextrainfo}`
              : `Status: ${getSteamStatusLabel(data.personastate)}`,
            ...recent.map(
              (game) => `Recent: ${game.name} (${(game.playtime_forever / 60).toFixed(1)}h total)`,
            ),
          ]);
        } catch {
          pushText("Steam activity request failed.", "error");
        }
        return;
      }

      if (cmd === "specs") {
        pushText(["PC Specs:", ...PC_SPECS, "", "Peripherals:", ...PERIPHERALS]);
        return;
      }

      if (cmd === "profile") {
        try {
          const data = await fetchJson<LanyardResponse>(
            "https://api.lanyard.rest/v1/users/644484730070237215",
          );

          if (!data.success || !data.data?.discord_user) {
            pushText("Profile status unavailable.", "error");
            return;
          }

          const customStatus =
            data.data.activities?.find((activity) => activity.type === 4)?.state ??
            "No custom status";

          pushText([
            `Profile: ${data.data.discord_user.global_name || data.data.discord_user.username}`,
            `Discord: @${data.data.discord_user.username}`,
            `Status: ${data.data.discord_status || "offline"}`,
            `Custom status: ${customStatus}`,
          ]);
        } catch {
          pushText("Profile request failed.", "error");
        }
        return;
      }

      if (cmd === "lastfm") {
        try {
          const data = await fetchJson<LastfmStatsResponse>("/api/lastfm-stats");
          const recent = data.recentTracks.slice(0, 3).map((track) => {
            const live = track.nowPlaying ? " (Live)" : "";
            return `Recent: ${track.name} - ${track.artist}${live}`;
          });
          const artists = data.topArtists
            .slice(0, 3)
            .map((artist) => `Top artist: ${artist.name} (${artist.plays} plays)`);

          pushText([...recent, ...artists]);
        } catch {
          pushText("Last.fm stats request failed.", "error");
        }
        return;
      }

      if (cmd === "chess") {
        try {
          const [chessStats, lichessProfile] = await Promise.all([
            fetchJson<{
              chess_rapid?: { last?: { rating: number } };
              chess_blitz?: { last?: { rating: number } };
              chess_bullet?: { last?: { rating: number } };
            }>(`https://api.chess.com/pub/player/${CHESS_USERNAME}/stats`),
            fetchJson<{
              perfs?: {
                rapid?: { rating: number };
                blitz?: { rating: number };
                bullet?: { rating: number };
              };
            }>(`https://lichess.org/api/user/${LICHESS_USERNAME}`),
          ]);

          pushText([
            `Chess.com rapid: ${chessStats.chess_rapid?.last?.rating ?? "N/A"}`,
            `Chess.com blitz: ${chessStats.chess_blitz?.last?.rating ?? "N/A"}`,
            `Chess.com bullet: ${chessStats.chess_bullet?.last?.rating ?? "N/A"}`,
            `Lichess rapid: ${lichessProfile.perfs?.rapid?.rating ?? "N/A"}`,
            `Lichess blitz: ${lichessProfile.perfs?.blitz?.rating ?? "N/A"}`,
            `Lichess bullet: ${lichessProfile.perfs?.bullet?.rating ?? "N/A"}`,
          ]);
        } catch {
          pushText("Chess stats request failed.", "error");
        }
        return;
      }

      if (cmd === "guestbook") {
        const [subCmd, ...rest] = args.split(" ");
        const sub = (subCmd || "list").toLowerCase();

        if (sub === "list") {
          try {
            const messages = await fetchJson<GuestbookMessage[]>("/api/guestbook");
            const latest = messages.slice(0, 5);

            if (latest.length === 0) {
              pushText("Guestbook is empty right now.", "muted");
              return;
            }

            pushText(
              latest.map(
                (item) =>
                  `${item.name} (${new Date(item.created_at).toLocaleDateString()}): ${item.message}`,
              ),
            );
          } catch {
            pushText("Could not load guestbook entries.", "error");
          }
          return;
        }

        if (sub === "post") {
          const payload = rest.join(" ").trim();
          const [namePart, ...messageParts] = payload.split("|");
          const fallbackName = namePart?.trim() || "Anonymous";
          const message = messageParts.join("|").trim();

          if (!message) {
            pushText(
              "Usage: guestbook post <name>|<message>  (name can be blank)",
              "error",
            );
            return;
          }

          const name = fallbackName.slice(0, GUESTBOOK_MAX_NAME_LENGTH);
          const clippedMessage = message.slice(0, GUESTBOOK_MAX_MESSAGE_LENGTH);

          try {
            await fetchJson<{ success: boolean }>("/api/guestbook", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, message: clippedMessage }),
            });

            pushText("Guestbook message posted successfully.", "success");
          } catch {
            pushText("Failed to post guestbook message.", "error");
          }
          return;
        }

        pushText("Unknown guestbook subcommand. Use: guestbook list | guestbook post", "error");
        return;
      }

      if (cmd === "theme") {
        const mode = args.toLowerCase();

        if (!mode || mode === "toggle") {
          const applied = applySiteTheme("toggle");
          pushText(`Theme switched to ${applied}.`, "success");
          return;
        }

        if (mode !== "dark" && mode !== "pastel") {
          pushText("Usage: theme [dark|pastel|toggle]", "error");
          return;
        }

        applySiteTheme(mode);
        pushText(`Theme switched to ${mode}.`, "success");
        return;
      }

      if (cmd === "open") {
        const target = args.toLowerCase();
        const map: Record<string, string> = {
          home: "/",
          about: "/about",
          projects: "/projects",
          guestbook: "/guestbook",
          terminal: "/terminal",
        };

        if (!target || !map[target]) {
          pushText("Usage: open [home|about|projects|guestbook|terminal]", "error");
          return;
        }

        navigate(map[target]);
        pushText(`Navigating to ${target}...`, "success");
        return;
      }

      if (cmd === "roll") {
        const result = Math.floor(Math.random() * 100) + 1;
        pushText(`You rolled: ${result}`);
        return;
      }

      if (cmd === "fortune") {
        const pick = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        pushText(pick, "muted");
        return;
      }

      if (cmd === "neofetch") {
        pushText(
          [
            "turtletiny@website",
            "------------------",
            "OS: Personal Website",
            "Shell: interactive-terminal",
            "Theme: dark/pastel toggle",
            "Data: Spotify + Steam + Last.fm + Lanyard + Guestbook",
            "Uptime: always online (when Vercel behaves)",
          ],
          "muted",
        );
        return;
      }

      const suggestions = getCommandSuggestions(cmd);
      pushText(`Command not found: ${cmd}`, "error");
      if (suggestions.length > 0) {
        pushSuggestions("Did you mean:", suggestions);
      }
    },
    [navigate, pushSuggestions, pushText],
  );

  const runCommand = useCallback(
    async (rawCommand: string) => {
      const trimmed = rawCommand.trim();
      if (!trimmed) return;

      pushEntry({ id: createId(), kind: "input", command: trimmed });
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      setInput("");
      setPendingCommand(trimmed);

      try {
        await executeCommand(trimmed);
      } finally {
        setPendingCommand(null);
      }
    },
    [executeCommand, pushEntry],
  );

  const simulateTyping = useCallback(
    (command: string) => {
      if (!command || isAutoTyping || pendingCommand) {
        return;
      }

      setIsAutoTyping(true);
      setInput("");
      inputRef.current?.focus();

      const cleaned = command.trim();
      let index = 0;

      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
      }

      typingTimerRef.current = window.setInterval(() => {
        index += 1;
        setInput(cleaned.slice(0, index));

        if (index >= cleaned.length) {
          if (typingTimerRef.current) {
            window.clearInterval(typingTimerRef.current);
          }
          typingTimerRef.current = null;
          setIsAutoTyping(false);
          void runCommand(cleaned);
        }
      }, 26);
    },
    [isAutoTyping, pendingCommand, runCommand],
  );

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [entries, pendingCommand]);

  useEffect(() => {
    inputRef.current?.focus();

    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pendingCommand || isAutoTyping) return;

    const rafId = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [pendingCommand, isAutoTyping]);

  return (
    <div className="min-h-screen flex flex-col items-center text-foreground font-main relative z-10">
      <ThemeToggle />
      <DashboardNavbar />

      <div className="w-full max-w-[980px] px-4 pb-12">
        <section
          className="terminal-window terminal-font"
          onClick={() => inputRef.current?.focus()}
          aria-label="Interactive terminal"
        >
          <div className="terminal-titlebar">
            <div className="flex items-center gap-3 min-w-0">
              <SquarePlus size={15} className="terminal-muted" />
            </div>

            <div className="terminal-title">{terminalWindowTitle}</div>

            <div className="flex items-center gap-3">
              <Search size={16} className="terminal-muted" />
              <Menu size={16} className="terminal-muted" />
              <div className="flex items-center gap-2.5 pl-1">
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span className="terminal-dot terminal-dot-red" />
              </div>
            </div>
          </div>

          <div className="terminal-pane h-[65vh] min-h-[460px] overflow-y-auto p-4 sm:p-5 text-[13px] leading-relaxed space-y-1 terminal-history">
            <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.8 }}
                >
                  {entry.kind === "input" ? (
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      <span className="terminal-success">{promptLabel}</span>
                      <span className="terminal-text break-all">{entry.command}</span>
                    </div>
                  ) : entry.kind === "text" ? (
                    <div className={toneClassMap[entry.tone]}>
                      {entry.lines.map((line, idx) => (
                        <p key={`${entry.id}-${idx}`}>{line || "\u00A0"}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="py-1">
                      <p className="terminal-muted mb-2">{entry.prompt}</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.commands.map((command) => (
                          <button
                            key={`${entry.id}-${command}`}
                            type="button"
                            onClick={() => simulateTyping(command)}
                            className="px-2.5 py-1 border border-zinc-700 rounded-md text-xs terminal-text hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            {command}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {pendingCommand && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 terminal-muted"
              >
                <Loader2 size={14} className="animate-spin" />
                Running {pendingCommand}...
              </motion.div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <span className="terminal-success text-xs sm:text-sm shrink-0">
                {promptLabel}
              </span>

              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    if (pendingCommand || isAutoTyping) return;
                    void runCommand(input);
                    return;
                  }

                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    if (history.length === 0) return;

                    const nextIndex =
                      historyIndex <= 0 ? history.length - 1 : historyIndex - 1;
                    setHistoryIndex(nextIndex);
                    setInput(history[nextIndex]);
                    return;
                  }

                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    if (history.length === 0) return;

                    if (historyIndex === -1) {
                      setInput("");
                      return;
                    }

                    const nextIndex = historyIndex + 1;
                    if (nextIndex >= history.length) {
                      setHistoryIndex(-1);
                      setInput("");
                    } else {
                      setHistoryIndex(nextIndex);
                      setInput(history[nextIndex]);
                    }
                  }
                }}
                className="w-full bg-transparent border-none outline-none terminal-text placeholder:text-zinc-500"
                placeholder={
                  pendingCommand
                    ? "Running command..."
                    : isAutoTyping
                      ? "Typing..."
                      : "Type a command"
                }
                disabled={Boolean(pendingCommand) || isAutoTyping}
              />
            </div>

            <div ref={scrollAnchorRef} />
          </div>
        </section>
      </div>
    </div>
  );
}
