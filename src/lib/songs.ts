export const SONGS = [
  {
    title: "Security!",
    artist: "Ecco2k",
    art: "/audio/E.svg",
    src: "/audio/security.mp3",
    spotifyUrl:
      "https://open.spotify.com/track/7s0Omwb4joRpfzAwuxZNtS?si=67100c81f43247af",
  },
  {
    title: "Ghosts",
    artist: "Yung Lean, Bladee",
    art: "/audio/ghosts.png",
    src: "/audio/ghosts.mp3",
    spotifyUrl:
      "https://open.spotify.com/track/7hwDYSEPIrr5GO9Loxuk7E?si=d370a74f4a204318",
  },
  {
    title: "Special Place",
    artist: "Bladee ♡",
    art: "/icedancer.jpg",
    src: "/audio/special-place.mp3",
    spotifyUrl: "https://open.spotify.com/track/6yaYV3wo595zZWFwhC8s5T",
  },
];

export type Song = (typeof SONGS)[number];
