"use client";

import AppSidebar from "@/components/layout/AppSidebar";
import AlbumCover from "@/components/music/AlbumCover";
import Mp3MetadataExplorer from "@/components/music/Mp3MetadataExplorer";
import MusicPlayer from "@/components/music/MusicPlayer";
import PlaylistCard from "@/components/music/PlaylistCard";
import SectionHeader from "@/components/music/SectionHeader";
import TrackRow from "@/components/music/TrackRow";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Library,
  Play,
  Radio,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { ImportedAudioTrack, Track } from "@/types/music";

// -----------------------------------------------------------------------------
// Initial demo tracks
// -----------------------------------------------------------------------------

const tracks: Track[] = [
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

// -----------------------------------------------------------------------------
// Demo playlists
// -----------------------------------------------------------------------------

const playlists = [
  {
    title: "Daily Mix",
    description: "Music picked for your day",
    cover: tracks[0].cover,
    trackIndex: 0,
  },
  {
    title: "Night Drive",
    description: "Soundtrack for the late hours",
    cover: tracks[2].cover,
    trackIndex: 2,
  },
  {
    title: "Peaceful Moments",
    description: "Slow down and breathe",
    cover: tracks[3].cover,
    trackIndex: 3,
  },
  {
    title: "Summer Memories",
    description: "A little sunshine, anytime",
    cover: tracks[4].cover,
    trackIndex: 4,
  },
];

const recentlyPlayed = [tracks[1], tracks[0], tracks[4], tracks[2]];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

// -----------------------------------------------------------------------------
// Home page
// -----------------------------------------------------------------------------

export default function HomePage() {
  // MusicPlayer owns the single HTMLAudioElement.
  const audioRef = useRef<HTMLAudioElement>(null);

  // Complete track list: demo tracks + imported local files.
  const [tracksList, setTracksList] = useState<Track[]>(tracks);

  // The page owns object URLs created for imported files.
  const localObjectUrlsRef = useRef<string[]>([]);

  // Playback state.
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Application state.
  const [likedTracks, setLikedTracks] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentTrack =
    tracksList[currentTrackIndex] ?? tracksList[0] ?? tracks[0];

  // Release imported audio and artwork URLs when the page unmounts.
  useEffect(() => {
    return () => {
      localObjectUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      localObjectUrlsRef.current = [];
    };
  }, []);

  // Synchronize playback with the selected track and player state.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch((error: unknown) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex, volume]);

  // ---------------------------------------------------------------------------
  // Playback handlers
  // ---------------------------------------------------------------------------

  function togglePlay() {
    setIsPlaying((playing) => !playing);
  }

  function playTrack(index: number) {
    if (index < 0 || index >= tracksList.length) {
      return;
    }

    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
  }

  function playNext() {
    if (tracksList.length === 0) {
      return;
    }

    let nextIndex: number;

    if (isShuffle && tracksList.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * tracksList.length);
      } while (nextIndex === currentTrackIndex);
    } else {
      nextIndex = (currentTrackIndex + 1) % tracksList.length;
    }

    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
  }

  function playPrevious() {
    const audio = audioRef.current;

    // Restart the current track if it has played for more than three seconds.
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    const previousIndex =
      (currentTrackIndex - 1 + tracksList.length) % tracksList.length;

    setCurrentTrackIndex(previousIndex);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
  }

  function handleTrackEnded() {
    if (isRepeat) {
      const audio = audioRef.current;

      if (audio) {
        audio.currentTime = 0;

        audio.play().catch((error: unknown) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      }

      return;
    }

    playNext();
  }

  // ---------------------------------------------------------------------------
  // Likes
  // ---------------------------------------------------------------------------

  function toggleLike(trackId: number) {
    setLikedTracks((current) =>
      current.includes(trackId)
        ? current.filter((id) => id !== trackId)
        : [...current, trackId],
    );
  }

  // ---------------------------------------------------------------------------
  // Import local MP3
  // ---------------------------------------------------------------------------

  function handleImportTrack(imported: ImportedAudioTrack) {
    // Create a URL for the original audio file.
    const audioUrl = URL.createObjectURL(imported.file);
    localObjectUrlsRef.current.push(audioUrl);

    // Use the embedded artwork if available.
    // Otherwise, fall back to the first demo track's cover.
    let cover = tracks[0].cover;

    if (imported.cover) {
      cover = URL.createObjectURL(imported.cover);
      localObjectUrlsRef.current.push(cover);
    }

    const newTrack: Track = {
      id: Date.now(),
      title: imported.title,
      artist: imported.artist,
      album: imported.album,
      cover,
      audioUrl,
      duration: imported.duration > 0 ? formatTime(imported.duration) : "0:00",
      isLocal: true,
      fileName: imported.file.name,
    };

    // The new track's index is the current list length.
    const nextIndex = tracksList.length;

    setTracksList((currentTracks) => [...currentTracks, newTrack]);
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    setDuration(imported.duration || 0);
    setIsPlaying(true);
    setSearchQuery("");
  }

  // ---------------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------------

  const filteredTracks = tracksList.filter((track) =>
    `${track.title} ${track.artist} ${track.album}`
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase()),
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <main className="h-dvh min-h-130 overflow-hidden bg-black p-2 text-white">
      <div className="flex h-[calc(100%-84px)] min-h-0 gap-2">
        {/* Sidebar */}
        <AppSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main content */}
        <section
          id="home"
          className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-[#121212]"
        >
          {/* Top navigation */}
          <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 bg-[#121212]/95 px-4 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="rounded-full p-2 hover:bg-[#282828] md:hidden"
              >
                <Library size={20} />
              </button>

              <button
                type="button"
                aria-label="Go back"
                onClick={() => window.history.back()}
                className="hidden size-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black sm:flex"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                aria-label="Go forward"
                onClick={() => window.history.forward()}
                className="hidden size-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black sm:flex"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Search */}
            <div className="mx-auto flex max-w-107.5 flex-1 items-center rounded-full bg-[#242424] px-4 transition hover:bg-[#2a2a2a] focus-within:outline-2 focus-within:outline-white">
              <Search size={20} className="shrink-0 text-[#b3b3b3]" />

              <input
                id="music-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="What do you want to play?"
                aria-label="Search songs and artists"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#b3b3b3]"
              />

              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                  className="text-[#b3b3b3] hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            {/* Account actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:scale-105 sm:block"
              >
                Explore Premium
              </button>

              <button
                type="button"
                aria-label="Notifications"
                className="hidden size-9 items-center justify-center rounded-full bg-[#242424] text-[#b3b3b3] hover:text-white sm:flex"
              >
                <Radio size={18} />
              </button>

              <button
                type="button"
                aria-label="Account"
                className="flex size-9 items-center justify-center rounded-full bg-[#282828] text-sm font-bold ring-2 ring-black"
              >
                S
              </button>
            </div>
          </header>

          {/* Scrollable page content */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 sm:px-6">
            {searchQuery ? (
              /* Search results */
              <section className="pt-6">
                <h1 className="mb-5 text-2xl font-bold sm:text-3xl">
                  Search results
                </h1>

                {filteredTracks.length > 0 ? (
                  <div className="space-y-1">
                    {filteredTracks.map((track) => {
                      const index = tracksList.findIndex(
                        (item) => item.id === track.id,
                      );

                      return (
                        <button
                          type="button"
                          key={track.id}
                          onClick={() => playTrack(index)}
                          className="group flex w-full items-center gap-4 rounded-md p-2 text-left hover:bg-white/10"
                        >
                          <AlbumCover
                            src={track.cover}
                            alt={track.album}
                            className="w-12"
                          />

                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium group-hover:text-[#1ed760]">
                              {track.title}
                            </span>

                            <span className="block truncate text-sm text-[#b3b3b3]">
                              {track.artist}
                            </span>
                          </span>

                          <Play size={18} className="mr-3" />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-[#b3b3b3]">
                    No music found. Try another title or artist.
                  </p>
                )}
              </section>
            ) : (
              <>
                {/* Welcome section */}
                <section className="pt-5 sm:pt-7">
                  <p className="mb-2 text-sm font-medium text-[#b3b3b3]">
                    WELCOME BACK
                  </p>

                  <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Good music. Good mood.
                  </h1>

                  <p className="mt-2 text-sm text-[#b3b3b3]">
                    Your next favorite track is just around the corner.
                  </p>
                </section>

                {/* Quick access */}
                <section className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {playlists.slice(0, 3).map((playlist) => (
                    <PlaylistCard
                      key={playlist.title}
                      title={playlist.title}
                      description={playlist.description}
                      cover={playlist.cover}
                      onPlay={() => playTrack(playlist.trackIndex)}
                      variant="quick"
                    />
                  ))}
                </section>

                {/* Featured banner */}
                <section className="relative mt-8 overflow-hidden rounded-xl bg-linear-to-br from-[#234b3a] via-[#18382b] to-[#121212] p-5 sm:p-7">
                  <div className="relative z-10 max-w-xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5f9df]">
                      <span className="size-1.5 rounded-full bg-[#1ed760]" />
                      Featured playlist
                    </span>

                    <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
                      Find your frequency.
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
                      Fresh sounds, late-night favorites, and music that fits
                      the moment. Your listening journey starts here.
                    </p>

                    <button
                      type="button"
                      onClick={() => playTrack(0)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1ed760] px-6 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-[#3be477]"
                    >
                      <Play size={18} fill="currentColor" />
                      Start listening
                    </button>
                  </div>

                  <div
                    className="pointer-events-none absolute -right-12 -top-10 hidden size-64 rotate-12 rounded-2xl bg-cover bg-center opacity-30 blur-[1px] sm:block lg:right-10 lg:size-72"
                    style={{
                      backgroundImage: `url("${tracks[0].cover}")`,
                    }}
                  />
                </section>

                {/* Made for you */}
                <section className="mt-9">
                  <SectionHeader
                    eyebrow="Your personal mix"
                    title="Made for you"
                    actionLabel="Show all"
                  />

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                    {playlists.map((playlist) => (
                      <PlaylistCard
                        key={playlist.title}
                        title={playlist.title}
                        description={playlist.description}
                        cover={playlist.cover}
                        onPlay={() => playTrack(playlist.trackIndex)}
                      />
                    ))}
                  </div>
                </section>

                {/* Recently played */}
                <section className="mt-9">
                  <SectionHeader
                    eyebrow="Pick up where you left off"
                    title="Recently played"
                    actionLabel="Show all"
                  />

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
                    {recentlyPlayed.map((track) => {
                      const index = tracksList.findIndex(
                        (item) => item.id === track.id,
                      );

                      return (
                        <button
                          type="button"
                          key={track.id}
                          onClick={() => playTrack(index)}
                          className="group min-w-0 rounded-lg bg-[#181818] p-3 text-left transition hover:bg-[#282828] sm:p-4"
                        >
                          <AlbumCover
                            src={track.cover}
                            alt={track.album}
                            className="mb-3 w-full shadow-lg"
                          />

                          <span className="block truncate text-sm font-bold">
                            {track.title}
                          </span>

                          <span className="mt-1 block truncate text-xs text-[#b3b3b3]">
                            {track.artist}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Popular tracks */}
                <section className="mt-10">
                  <SectionHeader
                    eyebrow="Your soundtrack"
                    title="Popular right now"
                  />

                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 border-b border-white/10 px-3 py-3 text-xs text-[#b3b3b3] sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_70px]">
                    <span className="flex items-center gap-3">
                      <span>#</span>
                      Title
                    </span>

                    <span className="hidden sm:block">Album</span>

                    <span className="flex justify-end">
                      <Clock3 size={16} />
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    {tracksList.map((track, index) => (
                      <TrackRow
                        key={track.id}
                        track={track}
                        index={index}
                        isCurrent={currentTrack.id === track.id}
                        isPlaying={isPlaying}
                        isLiked={likedTracks.includes(track.id)}
                        onPlay={() => playTrack(index)}
                        onToggleLike={() => toggleLike(track.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* MP3 Metadata Explorer */}
                <Mp3MetadataExplorer onImportTrack={handleImportTrack} />

                {/* Page footer */}
                <footer className="mt-14 border-t border-white/10 py-8">
                  <div className="flex flex-col justify-between gap-6 sm:flex-row">
                    <div>
                      <p className="text-lg font-bold">Moodzik</p>

                      <p className="mt-2 max-w-sm text-xs leading-5 text-[#b3b3b3]">
                        A home for the music you love and the music you have yet
                        to discover.
                      </p>
                    </div>

                    <div className="flex gap-6 text-xs text-[#b3b3b3]">
                      <Link href="/about" className="hover:text-white">
                        About
                      </Link>
                      <Link href="/privacy" className="hover:text-white">
                        Privacy
                      </Link>
                      <Link href="/terms" className="hover:text-white">
                        Terms
                      </Link>
                    </div>
                  </div>

                  <p className="mt-8 text-xs text-[#b3b3b3]">
                    © 2026 Moodzik. All rights reserved.
                  </p>
                </footer>
              </>
            )}
          </div>
        </section>
      </div>

      {/* Shared persistent music player */}
      <MusicPlayer
        audioRef={audioRef}
        track={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isShuffle={isShuffle}
        isRepeat={isRepeat}
        isLiked={likedTracks.includes(currentTrack.id)}
        onTogglePlay={togglePlay}
        onPlayNext={playNext}
        onPlayPrevious={playPrevious}
        onToggleShuffle={() => setIsShuffle((value) => !value)}
        onToggleRepeat={() => setIsRepeat((value) => !value)}
        onToggleLike={() => toggleLike(currentTrack.id)}
        onSeek={(time) => {
          const audio = audioRef.current;

          if (audio) {
            audio.currentTime = time;
            setCurrentTime(time);
          }
        }}
        onVolumeChange={setVolume}
        onTimeUpdate={setCurrentTime}
        onLoadedMetadata={setDuration}
        onEnded={handleTrackEnded}
      />
    </main>
  );
}
