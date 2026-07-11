import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";

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
    year: "2025",
    title: "HackAP — 1st Place Winner",
    org: "Government of Andhra Pradesh",
    note: "Foundra · Multi-Agent AI Startup Advisor",
    link: "https://foundra-main.vercel.app",
    detail:
      "Won the prestigious first place at HackAP, a state-level hackathon organized by the Government of Andhra Pradesh. Teamed up with Manikanta to design and implement Foundra, an advanced multi-agent AI system designed to counsel early-stage startups. The platform orchestrates specialized AI agents (Market Analyst, Legal & Compliance Advisor, Financial Forecaster, and Pitch Deck Evaluator) to supply comprehensive operational advice. Features real-time consultation logging and custom RAG pipelines configured with Indian corporate structures and startup regulatory schemas.",
    tech: ["Multi-Agent Orchestration", "LangChain", "Pinecone", "FastAPI", "React", "Next.js"],
  },
  {
    year: "Mar 2025",
    title: "Network Operations Lead",
    org: "ELEXCENTRA Hackathon · Andhra University",
    note: "400+ participants · 5-hour high-pressure sprint",
    detail:
      "Selected as the sole network administrator and operations lead to deploy physical and logical network infrastructure for Andhra University's flagship engineering hackathon. Designed and configured a high-availability network layout across six rooms supporting 400+ concurrent developer devices. Managed IP distribution rules, traffic shaping policies, and load balancing across TP-Link switches and dual-WAN gateway routers. Successfully troubleshot hardware interface anomalies and wireless interference patterns in under 3 minutes, maintaining 100% network uptime.",
    tech: ["Network Infrastructure", "Switch & Router Config", "VLANs", "DHCP Management", "Traffic Shaping"],
  },
  {
    year: "2024",
    title: "AURORA 2.0 — Technical Finalist",
    org: "IIT Dharwad · Team AUCE GeoSentinels",
    note: "Beyond The Horizon of Parsec 6.0",
    detail:
      "Represented Andhra University as a core technician in Team AUCE GeoSentinels at the national-level AURORA 2.0 Hackathon organized by IIT Dharwad. Built deep learning classification and segmentation systems using Sentinel-2 multispectral satellite imagery to detect illegal sand mining and forest encroachment. Custom-engineered remote sensing pipelines in PyTorch, utilizing U-Net architectures and GDAL to normalize and analyze temporal satellite bands, mapping extraction coordinate matrices with high spatial precision.",
    tech: ["Sentinel-2 Imagery", "PyTorch", "U-Net Segmentation", "GDAL", "Geospatial AI"],
  },
  {
    year: "2024",
    title: "Smart India Hackathon — Finalist",
    org: "Government of India",
    note: "National-level flagship grand finale",
    detail:
      "Selected as a national finalist for the Government of India's flagship Smart India Hackathon (SIH). Worked directly on an automated anomaly detection project statement in the AI/ML category. Processed heavily imbalanced industrial sensor streams and telemetric datasets, implementing supervised classifiers with custom feature engineering pipelines. Created a functional supervisor telemetry dashboard indicating anomaly predictions and model feature importances.",
    tech: ["Scikit-learn", "Feature Engineering", "Industrial Telemetry ML", "REST APIs", "Python"],
  },
];

const stats = [
  { k: "1st", l: "Place at HackAP 2025" },
  { k: "400+", l: "Participants managed at ELEXCENTRA" },
  { k: "2×", l: "IIT-level hackathon participant" },
  { k: "8.4", l: "GPA · B.Tech ECE" },
];

function AwardsPage() {
  return (
    <SiteLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/experience", label: "Experience" }, { label: "Achievements" }]} />

        <div className="mb-16">
          <p className="text-accent text-[10px] tracking-widest uppercase mb-4">Recognition</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Achievements.</h1>
          <p className="text-dim text-lg max-w-2xl leading-relaxed">
            Hackathon wins, leadership roles, and competition paths — verified milestones on my engineering journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 pb-16 border-b border-zinc-900">
          {stats.map((s) => (
            <div key={s.l} className="glass-card rounded-2xl p-6">
              <p className="text-4xl font-serif text-accent text-glow mb-2">{s.k}</p>
              <p className="text-xs text-dim leading-relaxed">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Timeline Path (matching the Experience page timeline style with extra space) */}
        <div>
          <ol className="relative border-l border-zinc-800 ml-3 space-y-28">
            {ACHIEVEMENTS.map((a, idx) => (
              <li key={a.title} className="pl-10 relative group">
                {/* Timeline Circle Node */}
                <span className="absolute -left-[7px] top-2 size-3 rounded-full bg-surface ring-2 ring-zinc-700 group-hover:ring-accent transition-colors" />
                
                {/* Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                  <h3 className="text-3xl font-serif group-hover:text-accent transition-colors duration-300">
                    {a.title}
                  </h3>
                  <span className="text-[10px] text-accent tracking-widest uppercase font-mono">{a.year}</span>
                </div>
                
                {/* Org & Sub-Badge */}
                <p className="text-dim text-sm mb-2">
                  {a.org} <span className="text-zinc-700">·</span> <span className="text-accent font-mono uppercase text-[10px] tracking-wider">{a.note}</span>
                </p>

                {/* Details Paragraph */}
                <p className="text-dim text-base leading-relaxed mb-6">{a.detail}</p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {a.tech.map((t) => (
                    <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-dim">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                {a.link && (
                  <div className="mt-4">
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline inline-flex items-center gap-1 font-mono"
                    >
                      Visit Project ↗
                    </a>
                  </div>
                )}

                {/* Separator line except for last item */}
                {idx < ACHIEVEMENTS.length - 1 && <div className="h-px mt-20 border-b border-zinc-900/50" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SiteLayout>
  );
}