"use client";

import { Clock3, Grid2X2, Heart, List, Mic2, Play } from "lucide-react";
import { useMemo, useState } from "react";

import { useMusic } from "@/context/MusicContext";
import type { Track } from "@/types/music";
import Image from "next/image";

const libraryTracks: Track[] = [
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
];

const playlists = [
  {
    id: 1,
    title: "Daily Mix",
    description: "Music picked for your day",
    cover: libraryTracks[0].cover,
  },
  {
    id: 2,
    title: "Night Drive",
    description: "Soundtrack for the late hours",
    cover: libraryTracks[2].cover,
  },
  {
    id: 3,
    title: "Peaceful Moments",
    description: "Slow down and breathe",
    cover: libraryTracks[3].cover,
  },
];

type LibraryFilter = "All" | "Playlists" | "Artists" | "Albums";

export default function LibraryPage() {
  const [filter, setFilter] = useState<LibraryFilter>("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const { setCurrentTrack } = useMusic();

  const filters: LibraryFilter[] = ["All", "Playlists", "Artists", "Albums"];

  const filteredPlaylists = useMemo(() => {
    if (filter === "All" || filter === "Playlists") {
      return playlists;
    }

    return [];
  }, [filter]);

  const filteredTracks = useMemo(() => {
    if (filter === "Artists" || filter === "Playlists") {
      return [];
    }

    return libraryTracks;
  }, [filter]);

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-[#121212]">
      {/* Header */}
      <header className="border-b border-white/5 px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1ed760]">
              Your collection
            </p>

            <h1 className="text-3xl font-extrabold">Your Library</h1>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#242424] p-1">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`rounded-full p-2 transition ${
                view === "grid"
                  ? "bg-[#3a3a3a] text-white"
                  : "text-[#b3b3b3] hover:text-white"
              }`}
            >
              <Grid2X2 size={18} />
            </button>

            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className={`rounded-full p-2 transition ${
                view === "list"
                  ? "bg-[#3a3a3a] text-white"
                  : "text-[#b3b3b3] hover:text-white"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                filter === item
                  ? "bg-white text-black"
                  : "bg-[#242424] text-white hover:bg-[#333333]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      {/* Library content */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10 sm:px-7">
        {/* Liked songs */}
        {(filter === "All" || filter === "Playlists") && (
          <button
            onClick={() => setCurrentTrack(libraryTracks[0])}
            className="mt-7 flex w-full items-center gap-4 rounded-xl bg-linear-to-r from-purple-700/80 to-[#242424] p-4 text-left transition hover:brightness-110 sm:p-5"
          >
            <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-purple-400 to-blue-700 sm:size-20">
              <Heart size={32} fill="white" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white/70">Playlist</p>

              <h2 className="mt-1 text-xl font-bold">Liked Songs</h2>

              <p className="mt-1 text-xs text-white/70">Your favorite tracks</p>
            </div>

            <Play size={23} fill="currentColor" />
          </button>
        )}

        {/* Playlists */}
        {filteredPlaylists.length > 0 && (
          <section className="mt-9">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Playlists</h2>
              <span className="text-xs text-[#b3b3b3]">
                {filteredPlaylists.length} playlists
              </span>
            </div>

            <div
              className={
                view === "grid"
                  ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  : "space-y-2"
              }
            >
              {filteredPlaylists.map((playlist, index) => (
                <button
                  key={playlist.id}
                  onClick={() =>
                    setCurrentTrack(libraryTracks[index === 1 ? 2 : index])
                  }
                  className={`group text-left transition ${
                    view === "grid"
                      ? "rounded-lg bg-[#181818] p-3 hover:bg-[#282828]"
                      : "flex items-center gap-4 rounded-lg p-3 hover:bg-[#282828]"
                  }`}
                >
                  <Image
                    src={playlist.cover}
                    alt={playlist.title}
                    width={600}
                    height={600}
                    unoptimized
                    className={`rounded-md object-cover shadow-lg ${
                      view === "grid" ? "mb-4 aspect-square w-full" : "size-14"
                    }`}
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold">
                      {playlist.title}
                    </h3>

                    <p className="mt-1 truncate text-xs text-[#b3b3b3]">
                      {playlist.description}
                    </p>
                  </div>

                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-xl transition group-hover:opacity-100">
                    <Play size={18} fill="currentColor" />
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Tracks */}
        {filteredTracks.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 text-xl font-bold">
              {filter === "Albums" ? "Albums" : "Recently added"}
            </h2>

            <div className="space-y-2">
              {filteredTracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(track)}
                  className="group flex w-full items-center gap-4 rounded-lg p-3 text-left transition hover:bg-[#282828]"
                >
                  <Image
                    src={track.cover}
                    alt={track.title}
                    width={600}
                    height={600}
                    unoptimized
                    className={`rounded-md object-cover shadow-lg ${
                      view === "grid" ? "mb-4 aspect-square w-full" : "size-14"
                    }`}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {track.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-[#b3b3b3]">
                      {track.artist}
                    </p>
                  </div>

                  <span className="hidden text-xs text-[#b3b3b3] sm:block">
                    {track.album}
                  </span>

                  <span className="flex items-center gap-2 text-xs text-[#b3b3b3]">
                    <Clock3 size={15} />
                    {track.duration}
                  </span>

                  <Play
                    size={17}
                    className="text-[#1ed760] opacity-0 transition group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {filter === "Artists" && (
          <div className="py-20 text-center">
            <Mic2 size={38} className="mx-auto mb-4 text-[#535353]" />

            <h3 className="font-semibold">No saved artists yet</h3>

            <p className="mt-2 text-sm text-[#b3b3b3]">
              Your followed artists will appear here.
            </p>
          </div>
        )}

        {filter === "Albums" && (
          <p className="mt-6 text-xs text-[#b3b3b3]">
            Showing demo album tracks. Album collections can be implemented
            separately.
          </p>
        )}
      </div>
    </section>
  );
}
