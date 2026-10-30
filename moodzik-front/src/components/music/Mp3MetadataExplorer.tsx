"use client";

import {
  CheckCircle2,
  FileAudio,
  Image as ImageIcon,
  LoaderCircle,
  Play,
  Upload,
} from "lucide-react";
import { parseBlob } from "music-metadata";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ImportedAudioTrack } from "@/types/music";

type AudioMetadata = Awaited<ReturnType<typeof parseBlob>>;

type Mp3MetadataExplorerProps = {
  onImportTrack: (track: ImportedAudioTrack) => void;
};

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 Bytes";
  }

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const size = bytes / 1024 ** index;

  return `${size.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function formatTime(seconds?: number): string {
  if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0) {
    return "Unavailable";
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

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Unavailable";
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (value instanceof Uint8Array) {
    return `[Binary data: ${formatBytes(value.byteLength)}]`;
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(", ");
  }

  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => `${key}: ${formatValue(item)}`)
      .join(" · ");
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

function MetadataGrid({
  title,
  entries,
}: {
  title: string;
  entries: [string, unknown][];
}) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="mt-6">
      <h3 className="mb-3 text-lg font-bold">{title}</h3>

      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {entries.map(([key, value]) => (
          <div key={key} className="min-w-0 rounded-lg bg-[#181818] p-3">
            <dt className="text-xs capitalize text-[#b3b3b3]">
              {key.replace(/([A-Z])/g, " $1")}
            </dt>

            <dd className="mt-1 break-words text-sm font-medium text-white">
              {formatValue(value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function Mp3MetadataExplorer({
  onImportTrack,
}: Mp3MetadataExplorerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // This component owns only the temporary artwork URL.
  // Audio URLs belong to the parent/player.
  const coverUrlRef = useRef<string | null>(null);

  // Prevent outdated metadata requests from updating the UI.
  const requestIdRef = useRef(0);

  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<AudioMetadata | null>(null);
  const [coverBlob, setCoverBlob] = useState<Blob | null>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace the previous artwork URL without affecting audio playback.
  const replaceCoverUrl = useCallback((nextUrl: string | null) => {
    const previousUrl = coverUrlRef.current;

    if (previousUrl && previousUrl !== nextUrl) {
      URL.revokeObjectURL(previousUrl);
    }

    coverUrlRef.current = nextUrl;
    setCoverUrl(nextUrl ?? "");
  }, []);

  // Release the artwork URL when this component unmounts.
  useEffect(() => {
    return () => {
      requestIdRef.current += 1;

      if (coverUrlRef.current) {
        URL.revokeObjectURL(coverUrlRef.current);
        coverUrlRef.current = null;
      }
    };
  }, []);

  const handleFile = useCallback(
    async (selectedFile?: File) => {
      if (!selectedFile) {
        return;
      }

      const isMp3 =
        selectedFile.name.toLowerCase().endsWith(".mp3") ||
        selectedFile.type === "audio/mpeg";

      if (!isMp3) {
        // Invalidate any previous parsing operation.
        requestIdRef.current += 1;

        setFile(null);
        setMetadata(null);
        setCoverBlob(null);
        setIsLoading(false);
        setError("Please select a valid MP3 file.");

        replaceCoverUrl(null);
        return;
      }

      const requestId = ++requestIdRef.current;

      setFile(selectedFile);
      setMetadata(null);
      setCoverBlob(null);
      setError("");
      setIsLoading(true);

      // Remove the previous track's artwork while parsing the new file.
      replaceCoverUrl(null);

      try {
        const result = await parseBlob(selectedFile, {
          duration: true,
        });

        // Ignore results belonging to an older file selection.
        if (requestId !== requestIdRef.current) {
          return;
        }

        setMetadata(result);

        const picture = result.common.picture?.[0];

        if (picture) {
          // Copy the exact image bytes into an independent ArrayBuffer.
          const imageBuffer = new ArrayBuffer(picture.data.byteLength);

          new Uint8Array(imageBuffer).set(picture.data);

          const imageBlob = new Blob([imageBuffer], {
            type: picture.format || "image/jpeg",
          });

          setCoverBlob(imageBlob);
          replaceCoverUrl(URL.createObjectURL(imageBlob));
        }
      } catch (err) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        console.error("MP3 metadata extraction failed:", err);

        setMetadata(null);
        setCoverBlob(null);

        setError(
          "Metadata extraction failed. You can still add the selected MP3 to your player.",
        );
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [replaceCoverUrl],
  );

  const handleImport = useCallback(() => {
    if (!file || isLoading) {
      return;
    }

    const title =
      metadata?.common.title?.trim() || file.name.replace(/\.mp3$/i, "");

    const artist = metadata?.common.artist?.trim() || "Unknown artist";
    const album = metadata?.common.album?.trim() || "Local files";

    onImportTrack({
      file,
      title,
      artist,
      album,
      cover: coverBlob,
      duration: metadata?.format.duration ?? 0,
    });
  }, [file, isLoading, metadata, coverBlob, onImportTrack]);

  const commonEntries: [string, unknown][] = metadata
    ? Object.entries(metadata.common).filter(
        ([key, value]) =>
          key !== "picture" &&
          value !== undefined &&
          value !== null &&
          value !== "",
      )
    : [];

  const formatEntries: [string, unknown][] = metadata
    ? Object.entries(metadata.format).filter(
        ([, value]) => value !== undefined && value !== null,
      )
    : [];

  const nativeEntries = metadata
    ? Object.entries(metadata.native).flatMap(([tagType, tags]) =>
        tags.map((tag, index) => ({
          id: `${tagType}-${tag.id}-${index}`,
          label: `${tagType} · ${tag.id}`,
          value: formatValue(tag.value),
        })),
      )
    : [];

  const hasExtractedMetadata = Boolean(metadata && file);

  return (
    <section
      id="mp3-metadata"
      className="mt-10 rounded-xl border border-white/10 bg-[#121212] p-4 text-white sm:p-6"
    >
      {/* Heading */}
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1ed760]/10 text-[#1ed760]">
          <FileAudio size={23} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1ed760]">
            Audio laboratory
          </p>

          <h2 className="mt-1 text-2xl font-bold">MP3 Metadata Explorer</h2>

          <p className="mt-2 text-sm leading-6 text-[#b3b3b3]">
            Select a local MP3 file to inspect its embedded tags, artwork, and
            technical audio information. Add it to Moodzik to play it through
            the main music player.
          </p>
        </div>
      </div>

      {/* File picker */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        className="mt-6 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#181818] px-4 py-8 text-center transition hover:border-[#1ed760]/70 hover:bg-[#202020] disabled:cursor-wait disabled:opacity-60"
      >
        {isLoading ? (
          <LoaderCircle size={32} className="animate-spin text-[#1ed760]" />
        ) : (
          <Upload size={32} className="text-[#1ed760]" />
        )}

        <span className="mt-3 font-semibold">
          {isLoading ? "Extracting metadata..." : "Choose an MP3 file"}
        </span>

        <span className="mt-1 text-xs text-[#b3b3b3]">
          MP3 files are processed locally in your browser
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".mp3,audio/mpeg"
        className="hidden"
        disabled={isLoading}
        onChange={(event) => {
          const selectedFile = event.currentTarget.files?.[0];

          void handleFile(selectedFile);

          // Allow selecting the same file again.
          event.currentTarget.value = "";
        }}
      />

      {/* Error message */}
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      {/* Selected file and import action */}
      {file && (
        <div className="mt-5 rounded-xl bg-[#181818] p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#282828] text-[#1ed760]">
              <FileAudio size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="break-words text-sm font-semibold">{file.name}</p>

              <p className="mt-1 text-xs text-[#b3b3b3]">
                {formatBytes(file.size)}
                {metadata?.format.duration !== undefined &&
                  ` · ${formatTime(metadata.format.duration)}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleImport}
            disabled={isLoading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1ed760] px-5 py-3 text-sm font-bold text-black transition hover:scale-[1.01] hover:bg-[#3be477] disabled:cursor-wait disabled:opacity-50 sm:w-auto"
          >
            <Play size={18} fill="currentColor" />
            Add to player & play
          </button>

          <p className="mt-2 text-xs leading-5 text-[#b3b3b3]">
            The selected track will be added to your music list and played
            through Moodzik&apos;s footer player.
          </p>
        </div>
      )}

      {/* Extracted information */}
      {hasExtractedMetadata && metadata && file && (
        <div className="mt-7">
          {/* Song overview */}
          <div className="flex flex-col gap-5 rounded-xl bg-[#181818] p-4 sm:flex-row sm:items-center">
            <div className="flex size-36 shrink-0 items-center justify-center self-center overflow-hidden rounded-lg bg-[#282828] sm:self-auto">
              {coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl}
                  alt="Embedded album artwork"
                  className="size-full object-cover"
                />
              ) : (
                <ImageIcon size={40} className="text-[#777]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1ed760]">
                <CheckCircle2 size={15} />
                Metadata extracted
              </div>

              <h3 className="mt-2 break-words text-2xl font-bold">
                {metadata.common.title || file.name.replace(/\.mp3$/i, "")}
              </h3>

              <p className="mt-2 break-words text-sm text-[#b3b3b3]">
                {metadata.common.artist || "Unknown artist"}
                {metadata.common.album ? ` · ${metadata.common.album}` : ""}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-[#282828] px-3 py-1.5">
                  {formatTime(metadata.format.duration)}
                </span>

                {metadata.common.year && (
                  <span className="rounded-full bg-[#282828] px-3 py-1.5">
                    {metadata.common.year}
                  </span>
                )}

                <span className="rounded-full bg-[#282828] px-3 py-1.5">
                  {formatBytes(file.size)}
                </span>
              </div>
            </div>
          </div>

          {/* Local file properties */}
          <MetadataGrid
            title="File information"
            entries={[
              ["Filename", file.name],
              [
                "Extension",
                file.name.split(".").pop()?.toUpperCase() ?? "Unknown",
              ],
              ["MIME type", file.type || "Not provided by browser"],
              ["File size", formatBytes(file.size)],
              ["Last modified", new Date(file.lastModified).toLocaleString()],
              ["Duration", formatTime(metadata.format.duration)],
            ]}
          />

          {/* Audio technical properties */}
          <MetadataGrid title="Audio properties" entries={formatEntries} />

          {/* Standard metadata tags */}
          <MetadataGrid title="Song metadata" entries={commonEntries} />

          {/* Original embedded tags */}
          <section className="mt-7">
            <details className="rounded-lg bg-[#181818] p-4">
              <summary className="cursor-pointer font-semibold">
                Raw embedded tags ({nativeEntries.length})
              </summary>

              <p className="mt-2 text-xs leading-5 text-[#b3b3b3]">
                These are the original tags found by the parser. Some may
                duplicate the normalized song metadata.
              </p>

              {nativeEntries.length > 0 ? (
                <dl className="mt-4 space-y-3">
                  {nativeEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="border-b border-white/10 pb-3 last:border-0"
                    >
                      <dt className="text-xs text-[#1ed760]">{entry.label}</dt>

                      <dd className="mt-1 break-words text-sm text-white">
                        {entry.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-4 text-sm text-[#b3b3b3]">
                  No original tag entries were found.
                </p>
              )}
            </details>
          </section>
        </div>
      )}
    </section>
  );
}
