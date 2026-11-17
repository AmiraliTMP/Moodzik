"use client";

import { Disc3, ListMusic, Mic2, Music2, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { useMusic } from "@/context/MusicContext";
import type { Track } from "@/types/music";
import Image from "next/image";

const demoTracks: Track[] = [
  {
    id: 1,
    title: "Midnight Memories",
    artist: "The Midnight",
    album: "After Hours",
    cover:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "6:13",
  },
  {
    id: 2,
    title: "Golden Hour",
    artist: "JVKE",
    album: "Golden Days",
    cover:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "7:02",
  },
  {
    id: 3,
    title: "Ocean Drive",
    artist: "Duke Dumont",
    album: "Night Drive",
    cover:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "5:32",
  },
  {
    id: 4,
    title: "Dreamscape",
    artist: "Ambient Collective",
    album: "Dreamscape",
    cover:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "5:05",
  },
  {
    id: 5,
    title: "Blue Horizon",
    artist: "Coastal",
    album: "Open Skies",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "5:18",
  },
  {
    id: 6,
    title: "Neon Nights",
    artist: "City Lights",
    album: "After Dark",
    cover:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&auto=format&fit=crop&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "4:45",
  },
];

const categories = [
  {
    title: "Pop",
    color: "from-pink-600 to-rose-900",
    icon: Mic2,
  },
  {
    title: "Electronic",
    color: "from-purple-600 to-indigo-900",
    icon: Disc3,
  },
  {
    title: "Rock",
    color: "from-orange-600 to-red-900",
    icon: Music2,
  },
  {
    title: "Ambient",
    color: "from-cyan-600 to-blue-900",
    icon: Music2,
  },
  {
    title: "Hip-Hop",
    color: "from-yellow-600 to-amber-900",
    icon: Mic2,
  },
  {
    title: "Indie",
    color: "from-emerald-600 to-green-900",
    icon: ListMusic,
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { setCurrentTrack } = useMusic();

  const filteredTracks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return [];

    return demoTracks.filter((track) =>
      `${track.title} ${track.artist} ${track.album}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  function playTrack(track: Track) {
    setCurrentTrack(track);
  }

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-[#121212]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#121212]/95 p-5 backdrop-blur-md sm:px-7">
        <h1 className="text-2xl font-bold">Search</h1>

        <div className="mt-5 flex max-w-2xl items-center gap-3 rounded-full bg-[#242424] px-4 transition focus-within:outline-2 focus-within:outline-white">
          <Search size={21} className="shrink-0 text-[#b3b3b3]" />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What do you want to listen to?"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-[#b3b3b3]"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-[#b3b3b3] hover:text-white"
            >
              <X size={19} />
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10 sm:px-7">
        {query.trim() ? (
          <section className="pt-7">
            <h2 className="mb-5 text-xl font-bold">Search results</h2>

            {filteredTracks.length > 0 ? (
              <div className="space-y-2">
                {filteredTracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="group flex w-full items-center gap-4 rounded-lg p-3 text-left transition hover:bg-[#282828]"
                  >
                    <Image
                      src={track.cover}
                      alt={track.album}
                      className="size-14 rounded-md object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold group-hover:text-[#1ed760]">
                        {track.title}
                      </p>
                      <p className="mt-1 truncate text-sm text-[#b3b3b3]">
                        {track.artist}
                      </p>
                    </div>

                    <span className="text-xs text-[#b3b3b3]">
                      {track.duration}
                    </span>

                    <Music2
                      size={20}
                      className="text-[#1ed760] opacity-0 transition group-hover:opacity-100"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <Search size={35} className="mx-auto mb-4 text-[#535353]" />
                <h3 className="font-semibold">No results found</h3>
                <p className="mt-2 text-sm text-[#b3b3b3]">
                  Try searching for another song, artist, or album.
                </p>
              </div>
            )}
          </section>
        ) : (
          <section className="pt-7">
            <h2 className="mb-5 text-xl font-bold">Browse all</h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.title}
                    onClick={() => setQuery(category.title)}
                    className={`relative flex aspect-[1.6] items-start justify-between overflow-hidden rounded-xl bg-linear-to-br ${category.color} p-4 text-left transition hover:scale-[1.02]`}
                  >
                    <span className="text-lg font-bold sm:text-xl">
                      {category.title}
                    </span>

                    <Icon
                      size={55}
                      className="absolute -bottom-2 -right-2 rotate-12 text-white/30"
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-10 rounded-xl bg-[#181818] p-6">
              <div className="flex items-center gap-3">
                <Music2 className="text-[#1ed760]" size={24} />
                <h3 className="font-bold">Discover your sound</h3>
              </div>

              <p className="mt-2 text-sm leading-6 text-[#b3b3b3]">
                Search for your favorite tracks, explore new artists, and find
                music that matches your mood.
              </p>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
