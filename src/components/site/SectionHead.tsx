export function SectionHead({
  eyebrow,
  title,
  meta,
}: {
  eyebrow?: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-16 border-b border-zinc-900 pb-8">
      <div>
        {eyebrow && (
          <p className="text-[10px] text-accent tracking-[0.4em] uppercase mb-3">{eyebrow}</p>
        )}
        <h2 className="text-4xl md:text-5xl font-serif text-balance">{title}</h2>
      </div>
      {meta && <span className="text-xs text-dim tracking-widest uppercase italic">{meta}</span>}
    </div>
  );
}