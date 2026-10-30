type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function SectionHeader({
  eyebrow,
  title,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#1ed760]">
          {eyebrow}
        </p>

        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          className="text-xs font-bold text-[#b3b3b3] hover:text-white hover:underline"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
