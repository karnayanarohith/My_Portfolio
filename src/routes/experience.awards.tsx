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
    detail:
      "Won first place at HackAP, the state-level hackathon organised by the Government of Andhra Pradesh. Built Foundra — a multi-agent AI platform that advises early-stage startups — with teammate Manikanta. Live at foundra-main.vercel.app.",
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
    year: "2025",
    title: "AURORA 2.0 — Participant",
    org: "IIT Dharwad · Team AUCE GeoSentinels",
    note: "Beyond The Horizon of Parsec 6.0",
    detail:
      "Participated in AURORA 2.0 organised by IIT Dharwad as part of Team AUCE GeoSentinels (Andhra University). Developed solutions for satellite imagery-based illegal mining detection.",
  },
  {
    icon: "cpu",
    year: "2025",
    title: "Smart India Hackathon — Participant",
    org: "Government of India",
    note: "National-level hackathon",
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
  trophy: <Trophy className="size-5 text-accent" />,
  users: <Users className="size-5 text-accent" />,
  cpu: <Cpu className="size-5 text-accent" />,
};

function AwardsPage() {
  return (
    <SiteLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
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

        {/* Achievement cards */}
        <div className="space-y-6">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="p-8 md:p-10 rounded-2xl bg-panel border border-zinc-800">
              <div className="flex items-start gap-4 mb-4">
                <div className="size-10 rounded-xl bg-accent/10 ring-1 ring-accent/20 flex items-center justify-center shrink-0">
                  {iconMap[a.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                    <h2 className="text-2xl font-serif">{a.title}</h2>
                    <span className="text-[10px] text-accent tracking-widest uppercase">{a.year}</span>
                  </div>
                  <p className="text-sm text-dim">{a.org}</p>
                  <p className="text-[10px] text-dim tracking-widest uppercase mt-1">{a.note}</p>
                </div>
              </div>
              <p className="text-dim text-sm leading-relaxed pl-14">{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}