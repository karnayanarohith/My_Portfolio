import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ArrowUpRight, Shield, Clock } from "lucide-react";
import { CVE_RESEARCH } from "@/lib/site-data";

export const Route = createFileRoute("/work/cves/")({
  head: () => ({
    meta: [
      { title: "CVE Research — Karnayana Rohith" },
      {
        name: "description",
        content:
          "Hands-on CVE research on personal hardware — documented with terminal logs, hex diffs, and failure analysis. Security research as methodology.",
      },
      { property: "og:title", content: "CVE Research — Karnayana Rohith" },
      {
        property: "og:description",
        content:
          "Hands-on CVE research on personal hardware — documented with terminal logs, hex diffs, and failure analysis.",
      },
      { property: "og:url", content: "/work/cves" },
    ],
    links: [{ rel: "canonical", href: "/work/cves" }],
  }),
  component: CVEsPage,
});

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "text-amber-400 bg-amber-400/10 ring-amber-400/30",
  Completed: "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30",
  "Read-only": "text-blue-400 bg-blue-400/10 ring-blue-400/30",
};

function CVEsPage() {
  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/work", label: "Work" }, { label: "CVE Research" }]} />

        <div className="mb-20">
          <p className="text-accent text-[10px] tracking-widest uppercase mb-4">Security Research</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">CVE Research.</h1>
          <p className="text-dim text-lg max-w-2xl leading-relaxed">
            Hands-on vulnerability research conducted on personal hardware. Every entry is documented
            with terminal logs, hex diffs, and honest failure analysis — methodology over polish.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-6 mb-20 pb-20 border-b border-zinc-900">
          {[
            { label: "Research Targets", value: CVE_RESEARCH.length.toString() },
            { label: "CVEs Investigated", value: "5" },
            { label: "Status", value: "Completed" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-serif text-foreground mb-1">{s.value}</p>
              <p className="text-[10px] text-dim tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Research entries */}
        <div className="space-y-6">
          {CVE_RESEARCH.map((entry, i) => (
            <Link
              key={entry.slug}
              to="/work/cves/$slug"
              params={{ slug: entry.slug }}
              className="group block p-10 rounded-2xl bg-panel border border-zinc-800 hover:border-accent/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <p className="text-[10px] text-dim tracking-widest uppercase">
                      Research {String(i + 1).padStart(2, "0")}
                    </p>
                    <span className="text-zinc-700">·</span>
                    <p className="text-[10px] text-dim tracking-widest uppercase">{entry.date}</p>
                    <span className="text-zinc-700">·</span>
                    <span
                      className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full ring-1 ${
                        STATUS_STYLES[entry.status] ?? "text-dim ring-zinc-700"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif mb-3 group-hover:text-accent transition-colors">
                    {entry.title}
                  </h2>
                  <p className="text-dim leading-relaxed max-w-2xl mb-6">{entry.blurb}</p>

                  {/* CVE tags */}
                  <div className="flex flex-wrap gap-2">
                    {entry.cves.map((cve) => (
                      <span
                        key={cve}
                        className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full ring-1 ring-zinc-800 text-dim"
                      >
                        <Shield className="size-2.5" />
                        {cve}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <ArrowUpRight className="size-5 text-dim group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  <div className="flex items-center gap-1.5 text-[10px] text-dim tracking-widest uppercase">
                    <Clock className="size-3" />
                    {entry.duration}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="mt-12 p-8 rounded-2xl border border-zinc-900 border-dashed text-center">
          <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Research Complete</p>
          <p className="text-dim text-sm leading-relaxed">
            All research modules, including BROM DA bypass checks, direct block injection logs, CVE-2022-20421 (Binder UAF), and post-July 2022 MT6765 audits are fully completed and cataloged.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
