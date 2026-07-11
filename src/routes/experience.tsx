import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { GoDeeper } from "@/components/site/GoDeeper";
import { EXPERIENCES, HACKATHONS } from "@/lib/site-data";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Karnayana Rohith" },
      { name: "description", content: "A vertical timeline of roles, companies, and outcomes." },
      { property: "og:title", content: "Experience — Karnayana Rohith" },
      { property: "og:description", content: "Roles, companies, and outcomes." },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const matchRoute = useMatchRoute();
  const isChildRoute =
    matchRoute({ to: "/experience/testimonials" }) ||
    matchRoute({ to: "/experience/awards" }) ||
    matchRoute({ to: "/experience/certifications" });

  if (isChildRoute) return <Outlet />;

  return (
    <SiteLayout>
      <PageHeader
        index="04 / Experience"
        eyebrow="2025 — Present"
        title={<>Academic research,<br /><span className="italic text-dim">hands‑on systems.</span></>}
        description="A timeline of my systems research, network engineering, and machine learning roles."
      />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ol className="relative border-l border-zinc-800 ml-3 space-y-16">
            {EXPERIENCES.map((e, i) => (
              <li key={e.role + e.company} className="pl-10 relative group">
                <span className="absolute -left-[7px] top-2 size-3 rounded-full bg-surface ring-2 ring-zinc-700 group-hover:ring-accent transition-colors" />
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                  <h3 className="text-3xl font-serif">{e.role}</h3>
                  <span className="text-[10px] text-accent tracking-widest uppercase">{e.period}</span>
                </div>
                <p className="text-dim text-sm mb-5">{e.company} · {e.location}</p>
                <ul className="space-y-2 text-foreground text-base leading-relaxed">
                  {e.bullets.map((b) => (
                    <li key={b} className="text-dim before:content-['—'] before:text-accent before:mr-3">{b}</li>
                  ))}
                </ul>
                {i < EXPERIENCES.length - 1 && <div className="h-px mt-12" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Hackathons & Competitions */}
      <section className="py-16 border-t border-zinc-900 bg-panel/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-2">Compete</h2>
            <h3 className="text-4xl font-serif">Hackathons &amp; Competitions</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {HACKATHONS.map((h) => (
              <div key={h.title} className="p-8 rounded-2xl bg-panel/40 border border-zinc-800 hover:border-accent/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline gap-2 mb-4">
                    <h4 className="text-xl font-serif font-medium leading-snug">{h.title}</h4>
                    <span className="text-[10px] text-accent tracking-widest uppercase shrink-0">{h.period}</span>
                  </div>
                  <p className="text-xs text-dim uppercase tracking-wider mb-4">{h.org} {h.project ? `· ${h.project}` : ""}</p>
                  <ul className="space-y-2 text-sm text-dim leading-relaxed">
                    {h.bullets.map((b) => (
                      <li key={b} className="before:content-['—'] before:text-accent before:mr-2">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <GoDeeper
        title="The professional fine print."
        cards={[
          { kicker: "Sub", to: "/experience/certifications", title: "Certifications", desc: "Verified credentials across cybersecurity, AI, and networking.", cta: "See certs" },
          { kicker: "Sub", to: "/experience/awards", title: "Achievements", desc: "Hackathon wins, leadership roles, and competition results.", cta: "See wins" },
        ]}
      />
    </SiteLayout>
  );
}