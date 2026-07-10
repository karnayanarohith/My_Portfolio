import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ trail }: { trail: { to?: string; label: string }[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-dim mb-12"
    >
      {trail.map((node, i) => (
        <div key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="size-3 opacity-40" />}
          {node.to ? (
            <Link to={node.to} className="hover:text-accent transition-colors">
              {node.label}
            </Link>
          ) : (
            <span className="text-foreground">{node.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}