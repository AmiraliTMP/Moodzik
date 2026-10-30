import { Play } from "lucide-react";
import AlbumCover from "./AlbumCover";

type PlaylistCardProps = {
  title: string;
  description: string;
  cover: string;
  onPlay: () => void;
  variant?: "quick" | "card";
};

export default function PlaylistCard({
  title,
  description,
  cover,
  onPlay,
  variant = "card",
}: PlaylistCardProps) {
  if (variant === "quick") {
    return (
      <button
        onClick={onPlay}
        className="group flex min-w-0 items-center gap-3 overflow-hidden rounded-md bg-[#282828] text-left transition hover:bg-[#3e3e3e]"
      >
        <AlbumCover src={cover} alt={title} className="w-17 rounded-none" />

        <span className="min-w-0 flex-1 truncate text-sm font-bold">
          {title}
        </span>

        <span className="mr-3 flex size-10 shrink-0 translate-y-2 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100">
          <Play size={20} fill="currentColor" />
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onPlay}
      className="group min-w-0 rounded-lg bg-[#181818] p-3 text-left transition hover:bg-[#282828] sm:p-4"
    >
      <div className="relative">
        <AlbumCover src={cover} alt={title} className="mb-3 w-full shadow-lg" />

        <span className="absolute bottom-2 right-2 flex size-11 translate-y-2 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100">
          <Play size={21} fill="currentColor" />
        </span>
      </div>

      <span className="block truncate text-sm font-bold">{title}</span>

      <span className="mt-1 line-clamp-2 block text-xs leading-5 text-[#b3b3b3]">
        {description}
      </span>
    </button>
  );
}
