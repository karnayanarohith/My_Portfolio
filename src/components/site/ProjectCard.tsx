import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  stack: string[];
  blurb: string;
  accent?: string;
  github?: string;
};

export function ProjectCard({ p, offset = false }: { p: Project; offset?: boolean }) {
  return (
    <Link
      to="/work/$project"
      params={{ project: p.slug }}
      className={`group block ${offset ? "lg:mt-24" : ""}`}
      data-cursor="hover"
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-panel ring-1 ring-white/5 group-hover:ring-accent/30 transition-all">
        {/* Visual Project-like Gradient Card */}
        <div
          className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.03]"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${p.accent ?? "#00e5ff"}25, transparent 60%), linear-gradient(135deg, #0f0f0f, #1a1a1a)`,
          }}
        />
        
        {/* Center Title overlay (Subtle, uppercase text same as project cards) */}
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-800 group-hover:text-accent/30 transition-colors select-none">
            {p.title}
          </span>
        </div>

        {/* Top Info overlay (revealed on hover) */}
        <div className="absolute top-0 inset-x-0 p-8 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-10">
          <p className="text-xs text-dim leading-relaxed max-w-[90%] mb-4 line-clamp-3">
            {p.blurb}
          </p>
          <div className="flex flex-wrap gap-1.5 max-w-[90%]">
            {p.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-dim"
              >
                {tech}
              </span>
            ))}
            {p.stack.length > 5 && (
              <span className="text-[9px] px-2 py-0.5 text-zinc-500">
                +{p.stack.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Bottom details block */}
        <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-accent text-[10px] font-medium tracking-widest uppercase mb-2 block">
                {p.category}
              </span>
              <h3 className="text-2xl font-medium">{p.title}</h3>
            </div>
            <ArrowUpRight className="size-5 text-dim group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all shrink-0" />
          </div>
        </div>
      </div>
    </Link>
  );
}