import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type Sub = { to: string; label: string; desc: string };

const subNav: Record<string, Sub[]> = {
  About: [
    { to: "/about/skills", label: "Skills & Stack", desc: "The technical arsenal in detail" },
    { to: "/about/education", label: "Education", desc: "Degrees and current learning" },
  ],
  Work: [
    { to: "/work/case-studies", label: "Case Studies", desc: "Long-form problem and process" },
    { to: "/work/cves", label: "CVE Research", desc: "Vulnerability research on personal hardware" },
    { to: "/work/gallery", label: "Gallery", desc: "Visual showcase, lightbox viewer" },
    // { to: "/work/ctfs", label: "CTF Write-ups", desc: "Capture the flag solutions" },
    // { to: "/work/blog", label: "Blog / Thoughts", desc: "Articles, ideas, posts" },
  ],
  Experience: [
    { to: "/experience/certifications", label: "Certifications", desc: "Verified credentials & courses" },
    { to: "/experience/awards", label: "Achievements", desc: "Hackathon wins & recognitions" },
    { to: "/experience/testimonials", label: "Testimonials", desc: "Words from collaborators" },
  ],
  Contact: [
    { to: "/contact/book", label: "Book a Call", desc: "Pick a time on my calendar" },
  ],
};

const primary: { to: string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 border-b nav-blur transition-all duration-300 ${
        scrolled ? "bg-surface/90 border-zinc-900/80 py-1" : "bg-surface/60 border-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="size-2 bg-accent rounded-full animate-glow-pulse" />
          <span className="text-sm font-medium tracking-tight uppercase group-hover:text-accent transition-colors">
            KR
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {primary.map((item) => {
            const subs = subNav[item.label];
            return (
              <li key={item.label} className="group relative py-5">
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="text-sm font-medium text-dim hover:text-foreground transition-colors data-[status=active]:text-foreground data-[status=active]:[&_span]:w-full"
                >
                  {item.label}
                  <span className="block h-px w-0 bg-accent transition-all duration-300 group-hover:w-full mt-1" />
                </Link>
                {subs && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="w-72 bg-panel border border-zinc-800 rounded-xl p-2 shadow-2xl">
                      {subs.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="block p-3 rounded-lg hover:bg-zinc-900 transition-colors"
                        >
                          <p className="text-xs font-semibold text-foreground flex items-center gap-1">
                            {s.label}
                            <ArrowUpRight className="size-3 text-dim" />
                          </p>
                          <p className="text-[11px] text-dim leading-relaxed mt-0.5">{s.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <span className="hidden lg:block text-[10px] text-dim tracking-widest uppercase">
            IST · Visakhapatnam
          </span>
          <div className="hidden lg:block h-4 w-px bg-zinc-800" />
          <Link
            to="/contact"
            className="text-xs font-medium py-2 pr-3 pl-3 flex items-center gap-2 ring-1 ring-accent/60 hover:bg-accent/10 hover:ring-accent transition-all rounded-md uppercase tracking-widest"
          >
            <span className="size-1.5 rounded-full bg-accent animate-glow-pulse" />
            Hire Me
          </Link>
        </div>
      </div>
    </nav>
  );
}