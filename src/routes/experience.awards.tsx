import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Trophy, Users, Cpu } from "lucide-react";

export const Route = createFileRoute("/experience/awards")({
  head: () => ({
    meta: [
      { title: "Achievements — Karnayana Rohith" },
      { name: "description", content: "Hackathon wins, leadership roles, and competition participations." },
      { property: "og:title", content: "Achievements — Karnayana Rohith" },
      { property: "og:description", content: "Hackathon wins, leadership roles, and competition participations." },
      { property: "og:url", content: "/experience/awards" },
    ],
    links: [{ rel: "canonical", href: "/experience/awards" }],
  }),
  component: AwardsPage,
});

const ACHIEVEMENTS = [
  {
    icon: "trophy",
    year: "2025",
    title: "HackAP — 1st Place",
    org: "Government of Andhra Pradesh",
    note: "Foundra · Multi-agent AI startup advisor",
    link: "https://foundra-main.vercel.app",
    detail:
      "Won first place at HackAP, the state-level hackathon organised by the Government of Andhra Pradesh. Built Foundra — a multi-agent AI platform that advises early-stage startups — with teammate Manikanta.",
  },
  {
    icon: "users",
    year: "Mar 2025",
    title: "Network Operations Lead",
    org: "ELEXCENTRA Hackathon · Andhra University",
    note: "400+ participants · 5-hour event",
    detail:
      "Sole network administrator for the ELEXCENTRA hackathon at Andhra University. Independently planned and deployed the entire Wi-Fi and LAN infrastructure across six rooms under sustained high load — zero extended outages across the event.",
  },
  {
    icon: "cpu",
    year: "2024",
    title: "AURORA 2.0 — Participant",
    org: "IIT Dharwad · Team AUCE GeoSentinels",
    note: "Beyond The Horizon of Parsec 6.0",
    file: "/certs/AURORA 2.0.pdf",
    detail:
      "Participated in AURORA 2.0 organised by IIT Dharwad as part of Team AUCE GeoSentinels (Andhra University). Developed solutions for satellite imagery-based illegal mining detection.",
  },
  {
    icon: "cpu",
    year: "2024",
    title: "Smart India Hackathon — Participant",
    org: "Government of India",
    note: "National-level hackathon",
    file: "/certs/SIH PARTICIPATION.pdf",
    detail:
      "Selected to participate in Smart India Hackathon, the Government of India's flagship national hackathon. Worked on a technical solution in the AI/ML domain.",
  },
];

const stats = [
  { k: "1st", l: "Place at HackAP 2025" },
  { k: "400+", l: "Participants managed at ELEXCENTRA" },
  { k: "2×", l: "IIT-level hackathon participant" },
  { k: "8.4", l: "GPA · B.Tech ECE" },
];

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy className="size-8 text-accent/80" />,
  users: <Users className="size-8 text-accent/80" />,
  cpu: <Cpu className="size-8 text-accent/80" />,
};

function AwardsPage() {
  return (
    <SiteLayout>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/experience", label: "Experience" }, { label: "Achievements" }]} />

        <div className="mb-16">
          <p className="text-accent text-[10px] tracking-widest uppercase mb-4">Recognition</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Achievements.</h1>
          <p className="text-dim text-lg max-w-2xl leading-relaxed">
            Hackathon wins, leadership roles, and competition participations — validated by external organisations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-zinc-900">
          {stats.map((s) => (
            <div key={s.l} className="glass-card rounded-2xl p-6">
              <p className="text-4xl font-serif text-accent text-glow mb-2">{s.k}</p>
              <p className="text-xs text-dim leading-relaxed">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Achievement cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.title}
              className="group relative rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden h-[280px] flex flex-col"
            >
              {/* Full Preview/Link area */}
              <a
                href={a.file || a.link || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute inset-0 block w-full h-full z-0 ${!(a.file || a.link) ? "pointer-events-none" : ""}`}
              >
                {a.file ? (
                  a.file.endsWith(".pdf") ? (
                    <iframe
                      src={`${a.file}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full pointer-events-none border-none scale-100 origin-top"
                      title={a.title}
                    />
                  ) : (
                    <img
                      src={a.file}
                      alt={a.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )
                ) : (
                  <div className="relative h-full w-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center overflow-hidden">
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
                    <div className="size-16 rounded-2xl bg-accent/5 ring-1 ring-accent/15 flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-110">
                      {iconMap[a.icon]}
                    </div>
                  </div>
                )}

                {/* View link indicator shown on hover */}
                {(a.file || a.link) && (
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-widest px-3 py-1.5 bg-black/85 text-white rounded border border-zinc-800 backdrop-blur-sm shadow-xl flex items-center gap-1">
                      {a.file ? "Open Document ↗" : "Visit Project ↗"}
                    </span>
                  </div>
                )}
              </a>

              {/* Sliding Info Overlay Panel (covers the bottom, slides down 10% on hover) */}
              <div className="absolute bottom-0 inset-x-0 z-10 bg-zinc-950/95 border-t border-zinc-900 backdrop-blur-md p-5 transition-transform duration-500 ease-in-out transform translate-y-0 group-hover:translate-y-[10%] flex flex-col justify-between h-[160px] pointer-events-none select-none">
                <div>
                  <div className="flex justify-between items-baseline gap-2 mb-1.5">
                    <span className="text-[9px] text-accent tracking-widest uppercase">{a.org}</span>
                    <span className="text-[8px] text-dim shrink-0">{a.year}</span>
                  </div>
                  <h2 className="text-base font-serif mb-1 leading-snug text-foreground line-clamp-1">
                    {a.title}
                  </h2>
                  <p className="text-[11px] text-dim leading-relaxed line-clamp-2">
                    {a.detail}
                  </p>
                </div>

                {/* Note */}
                <div className="mt-auto">
                  <span className="text-[9px] text-accent font-mono uppercase tracking-wider">
                    {a.note}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}