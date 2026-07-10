import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="py-20 border-t border-zinc-900 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-1.5 bg-accent rounded-full animate-glow-pulse" />
              <span className="text-sm font-medium tracking-tight">Open to internships & collaborations</span>
            </div>
            <p className="text-dim text-sm max-w-[35ch]">
              Based in Visakhapatnam, India. Building at the intersection of cybersecurity, agentic AI, and low-level systems.
            </p>
          </div>
          <div>
            <p className="text-[10px] text-dim tracking-widest uppercase mb-4">Sitemap</p>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/work", label: "Work" },
                { to: "/experience", label: "Experience" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-dim hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] text-dim tracking-widest uppercase mb-4">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/karnayanarohith" target="_blank" rel="noopener noreferrer" className="text-dim hover:text-accent transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/rohith-karnayana/" target="_blank" rel="noopener noreferrer" className="text-dim hover:text-accent transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-900/60 flex flex-col md:flex-row justify-between gap-4">
          <span className="text-[10px] text-dim uppercase tracking-widest">© 2026 Karnayana Rohith</span>
          <span className="text-[10px] text-dim uppercase tracking-widest">B.Tech ECE · Andhra University</span>
        </div>
      </div>
    </footer>
  );
}