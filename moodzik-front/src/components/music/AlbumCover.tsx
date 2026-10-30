type AlbumCoverProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function AlbumCover({
  src,
  alt,
  className = "",
}: AlbumCoverProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`aspect-square shrink-0 overflow-hidden rounded-md bg-[#282828] bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url("${src}")` }}
    />
  );
}
