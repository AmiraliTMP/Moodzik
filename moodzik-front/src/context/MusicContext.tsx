"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import type { Track } from "@/types/music";

interface MusicContextType {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <MusicContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }

  return context;
}
