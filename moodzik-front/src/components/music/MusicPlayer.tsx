"use client";

import {
  Heart,
  ListMusic,
  Maximize2,
  MonitorSpeaker,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import type { RefObject } from "react";

import AlbumCover from "@/components/music/AlbumCover";
import type { Track } from "@/types/music";

type MusicPlayerProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  isLiked: boolean;

  onTogglePlay: () => void;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onToggleLike: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onTimeUpdate: (time: number) => void;
  onLoadedMetadata: (duration: number) => void;
  onEnded: () => void;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function MusicPlayer({
  audioRef,
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  isShuffle,
  isRepeat,
  isLiked,
  onTogglePlay,
  onPlayNext,
  onPlayPrevious,
  onToggleShuffle,
  onToggleRepeat,
  onToggleLike,
  onSeek,
  onVolumeChange,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
}: MusicPlayerProps) {
  return (
    <>
      {/* The single audio element used by the entire application */}
      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
        onTimeUpdate={(event) => onTimeUpdate(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          const audioDuration = event.currentTarget.duration;

          onLoadedMetadata(Number.isFinite(audioDuration) ? audioDuration : 0);
        }}
        onEnded={onEnded}
        onError={(event) => {
          const audio = event.currentTarget;

          console.error("Moodzik playback error:", {
            code: audio.error?.code,
            message: audio.error?.message,
            source: track.fileName ?? track.audioUrl,
          });
        }}
      />

      {/* Persistent footer player */}
      <footer className="fixed inset-x-0 bottom-0 z-50 flex h-20 items-center justify-between gap-3 bg-black px-3 text-white sm:px-4">
        {/* Current track */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:min-w-45 sm:max-w-[30%]">
          <AlbumCover
            src={track.cover}
            alt={track.album}
            className="w-12 sm:w-14"
          />

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold sm:text-sm">
              {track.title}
            </p>

            <p className="mt-1 truncate text-[10px] text-[#b3b3b3] sm:text-xs">
              {track.artist}
            </p>
          </div>

          <button
            type="button"
            aria-label={
              isLiked ? "Remove from liked songs" : "Add to liked songs"
            }
            onClick={onToggleLike}
            className={`hidden transition sm:block ${
              isLiked ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"
            }`}
          >
            <Heart size={17} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Playback controls and progress */}
        <div className="flex min-w-0 flex-[1.5] flex-col items-center gap-1 sm:max-w-[42%]">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              aria-label="Shuffle"
              aria-pressed={isShuffle}
              onClick={onToggleShuffle}
              className={`hidden sm:block ${
                isShuffle ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"
              }`}
            >
              <Shuffle size={17} />
            </button>

            <button
              type="button"
              aria-label="Previous track"
              onClick={onPlayPrevious}
              className="text-[#b3b3b3] transition hover:scale-110 hover:text-white"
            >
              <SkipBack size={19} fill="currentColor" />
            </button>

            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={onTogglePlay}
              className="flex size-8 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              aria-label="Next track"
              onClick={onPlayNext}
              className="text-[#b3b3b3] transition hover:scale-110 hover:text-white"
            >
              <SkipForward size={19} fill="currentColor" />
            </button>

            <button
              type="button"
              aria-label="Repeat"
              aria-pressed={isRepeat}
              onClick={onToggleRepeat}
              className={`hidden sm:block ${
                isRepeat ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"
              }`}
            >
              <Repeat size={17} />
            </button>
          </div>

          <div className="hidden w-full items-center gap-2 sm:flex">
            <span className="w-9 text-right text-[10px] tabular-nums text-[#b3b3b3]">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              aria-label="Playback progress"
              min={0}
              max={duration > 0 ? duration : 100}
              value={Math.min(currentTime, duration > 0 ? duration : 100)}
              disabled={duration <= 0}
              onChange={(event) => onSeek(Number(event.target.value))}
              className="h-1 min-w-0 flex-1 cursor-pointer accent-white hover:accent-[#1ed760] disabled:cursor-not-allowed"
            />

            <span className="w-9 text-[10px] tabular-nums text-[#b3b3b3]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Additional controls */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:min-w-45 sm:max-w-[30%] sm:gap-4">
          <button
            type="button"
            aria-label="Queue"
            className="hidden text-[#b3b3b3] hover:text-white lg:block"
          >
            <ListMusic size={18} />
          </button>

          <button
            type="button"
            aria-label="Connect to a device"
            className="hidden text-[#b3b3b3] hover:text-white lg:block"
          >
            <MonitorSpeaker size={18} />
          </button>

          <Volume2 size={18} className="hidden text-[#b3b3b3] sm:block" />

          <input
            type="range"
            aria-label="Volume"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => onVolumeChange(Number(event.target.value))}
            className="hidden w-20 cursor-pointer accent-white hover:accent-[#1ed760] sm:block lg:w-24"
          />

          <button
            type="button"
            aria-label="Full screen"
            className="hidden text-[#b3b3b3] hover:text-white xl:block"
          >
            <Maximize2 size={17} />
          </button>
        </div>
      </footer>
    </>
  );
}
