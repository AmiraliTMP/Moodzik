"use client";

import { useMusic } from "@/context/MusicContext";
import { Disc3, Music2 } from "lucide-react";
import Image from "next/image";

export default function TrackSidebar() {
  const { currentTrack } = useMusic();

  return (
    <aside className="hidden h-full w-72 shrink-0 flex-col overflow-y-auto rounded-lg bg-[#121212] p-4 xl:flex">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-bold">Now Playing</h2>
        <Disc3 size={19} className="text-[#b3b3b3]" />
      </div>

      {currentTrack ? (
        <div className="space-y-5">
          {/* Album artwork */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#242424]">
            <Image
              src={currentTrack.cover}
              alt={currentTrack.album || currentTrack.title}
              fill
              unoptimized
              className="object-cover"
              sizes="288px"
            />
          </div>

          {/* Track information */}
          <div>
            <h3 className="truncate text-xl font-bold">{currentTrack.title}</h3>

            <p className="mt-1 truncate text-sm text-[#b3b3b3]">
              {currentTrack.artist}
            </p>
          </div>

          {/* Album information */}
          <div className="rounded-lg bg-[#242424] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b3b3b3]">
              Album
            </p>

            <p className="mt-2 text-sm font-medium">
              {currentTrack.album || "Unknown album"}
            </p>
          </div>

          {/* Additional information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#b3b3b3]">Duration</span>
              <span>{currentTrack.duration}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#b3b3b3]">Source</span>
              <span>{currentTrack.isLocal ? "Local file" : "Moodzik"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-[#242424]">
            <Music2 size={28} className="text-[#b3b3b3]" />
          </div>

          <h3 className="font-semibold">Nothing playing</h3>

          <p className="mt-2 max-w-52 text-xs leading-5 text-[#b3b3b3]">
            Select a track and its information will appear here.
          </p>
        </div>
      )}
    </aside>
  );
}
