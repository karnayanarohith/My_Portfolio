import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const Route = createFileRoute("/experience/services")({
  head: () => ({
    meta: [
      { title: "Services — Karnayana Rohith" },
      { name: "description", content: "Freelance offerings, scope, and pricing tiers." },
      { property: "og:title", content: "Services — Karnayana Rohith" },
      { property: "og:description", content: "Freelance offerings, scope, and pricing tiers." },
      { property: "og:url", content: "/experience/services" },
    ],
    links: [{ rel: "canonical", href: "/experience/services" }],
  }),
  component: ServicesPage,
});

const tiers = [
  { name: "Discovery", price: "$6k", period: "1 week", desc: "A rapid audit and direction-setting sprint to align stakeholders before any pixels are pushed.", items: ["Stakeholder interviews", "Surface audit", "Strategic brief", "Visual moodboard"] },
  { name: "Engagement", price: "$24k+", period: "4–8 weeks", desc: "Hands-on design and engineering across a defined product surface, embedded with your team.", items: ["Daily design output", "Production-ready frontend", "Design system contribution", "Async + weekly syncs"], featured: true },
  { name: "Fractional", price: "$8k/mo", period: "Ongoing", desc: "A retainer-style role acting as a fractional design lead across multiple initiatives.", items: ["1–2 days/week", "Quarterly roadmap input", "Hiring & mentorship", "Crit & QA"] },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/experience", label: "Experience" }, { label: "Services" }]} />
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Services.</h1>
        <p className="text-dim text-lg max-w-2xl mb-20 leading-relaxed">
          Three ways to work together, calibrated to scope. All engagements start with a 30-minute call.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div key={t.name} className={`relative rounded-2xl p-10 transition-all ${t.featured ? "bg-panel border border-accent/40 glow-border" : "bg-panel border border-zinc-800 hover:border-accent/30"}`}>
              {t.featured && (
                <span className="absolute top-4 right-4 text-[10px] text-accent tracking-widest uppercase">Most popular</span>
              )}
              <p className="text-[10px] text-accent tracking-widest uppercase mb-3">{t.name}</p>
              <p className="text-5xl font-serif mb-2">{t.price}</p>
              <p className="text-dim text-xs tracking-widest uppercase mb-6">{t.period}</p>
              <p className="text-sm text-dim leading-relaxed mb-8">{t.desc}</p>
              <ul className="space-y-2 text-sm mb-10">
                {t.items.map((i) => (
                  <li key={i} className="text-foreground flex items-start gap-2">
                    <span className="text-accent">+</span>{i}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block text-center text-xs font-medium py-3 ring-1 ring-accent/60 hover:bg-accent/10 hover:ring-accent transition-all rounded-md uppercase tracking-widest">Start a conversation</Link>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}