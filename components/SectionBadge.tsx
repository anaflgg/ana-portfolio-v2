type SectionBadgeProps = {
  label: string;
};

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-[#00ff87] bg-[#00ff87]/[0.07] border border-[#00ff87]/20 px-4 py-1.5 rounded-full w-fit">
      <span
        className="w-[7px] h-[7px] rounded-full bg-[#00ff87] shadow-[0_0_8px_rgba(0,255,135,0.7)] animate-pulse"
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
