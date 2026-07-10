export function PageHeader({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 spotlight opacity-60" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex items-center justify-between text-[10px] text-dim tracking-widest uppercase mb-10">
          <span>{index}</span>
          <span>{eyebrow}</span>
        </div>
        <h1 className="text-[12vw] md:text-[8vw] lg:text-[6.5vw] leading-[0.95] font-serif text-balance -ml-1">
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-xl text-dim text-lg leading-relaxed text-pretty">{description}</p>
        )}
      </div>
    </header>
  );
}