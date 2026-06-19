"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

interface MusicContextValue {
  enabled: boolean;
  enableMusic: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bg-music-enabled");
    if (saved === "true") {
      setEnabled(true);
    }
  }, []);

  const enableMusic = () => {
    localStorage.setItem("bg-music-enabled", "true");
    setEnabled(true);
  };

  return (
    <MusicContext.Provider value={{ enabled, enableMusic, audioRef }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return ctx;
}
