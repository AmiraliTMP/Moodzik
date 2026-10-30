import { Heart, MoreHorizontal, Play } from "lucide-react";

import AlbumCover from "@/components/music/AlbumCover";
import type { Track } from "@/types/music";

type TrackRowProps = {
  track: Track;
  index: number;
  isCurrent: boolean;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onToggleLike: () => void;
};

export default function TrackRow({
  track,
  index,
  isCurrent,
  isPlaying,
  isLiked,
  onPlay,
  onToggleLike,
}: TrackRowProps) {
  return (
    <div
      className={`group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 rounded-md px-3 py-2 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_70px] ${
        isCurrent && isPlaying ? "bg-white/10" : "hover:bg-white/10"
      }`}
    >
      <button
        onClick={onPlay}
        className="flex min-w-0 items-center gap-3 text-left"
      >
        <span className="flex w-4 shrink-0 justify-center text-sm text-[#b3b3b3]">
          <span className="group-hover:hidden">
            {isCurrent && isPlaying ? (
              <span className="text-[#1ed760]">♫</span>
            ) : (
              index + 1
            )}
          </span>

          <Play
            size={15}
            fill="currentColor"
            className="hidden group-hover:block"
          />
        </span>

        <AlbumCover src={track.cover} alt={track.album} className="w-11" />

        <span className="min-w-0">
          <span
            className={`block truncate text-sm font-medium ${
              isCurrent ? "text-[#1ed760]" : "text-white"
            }`}
          >
            {track.title}
          </span>

          <span className="block truncate text-xs text-[#b3b3b3]">
            {track.artist}
          </span>
        </span>
      </button>

      <span className="hidden truncate text-sm text-[#b3b3b3] sm:block">
        {track.album}
      </span>

      <span className="flex items-center justify-end gap-3 text-xs text-[#b3b3b3]">
        <button
          aria-label={isLiked ? "Unlike track" : "Like track"}
          onClick={onToggleLike}
          className={`hidden sm:block ${
            isLiked ? "text-[#1ed760]" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>

        <span>{track.duration}</span>

        <button
          aria-label="More track options"
          className="hidden group-hover:block"
        >
          <MoreHorizontal size={18} />
        </button>
      </span>
    </div>
  );
}
