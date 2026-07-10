import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export type GoDeeperCard = {
  to: string;
  title: string;
  desc: string;
  cta: string;
  kicker?: string;
};

export function GoDeeper({ title = "Explore the Depth", cards }: { title?: string; cards: GoDeeperCard[] }) {
  return (
    <section className="py-28 bg-panel/40 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] text-accent tracking-[0.4em] uppercase mb-3">Go Deeper</p>
            <h2 className="text-3xl md:text-4xl font-serif">{title}</h2>
          </div>
          <span className="hidden md:block text-[10px] text-dim tracking-widest uppercase">
            Subpages · indexed
          </span>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cards.length >= 3 ? "lg:grid-cols-3" : ""} gap-6`}>
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group p-8 rounded-2xl bg-panel border border-zinc-800 hover:border-accent/40 hover:glow-border transition-all"
            >
              {c.kicker && (
                <p className="text-[10px] text-dim tracking-widest uppercase mb-3">{c.kicker}</p>
              )}
              <h4 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">
                {c.title}
              </h4>
              <p className="text-sm text-dim leading-relaxed mb-6 max-w-[34ch]">{c.desc}</p>
              <span className="text-xs font-medium text-accent uppercase tracking-widest flex items-center gap-2">
                {c.cta}
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}