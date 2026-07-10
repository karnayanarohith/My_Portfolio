import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { TESTIMONIALS } from "@/lib/site-data";

export const Route = createFileRoute("/experience/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Karnayana Rohith" },
      { name: "description", content: "Words from colleagues, founders, and collaborators." },
      { property: "og:title", content: "Testimonials — Karnayana Rohith" },
      { property: "og:description", content: "Words from colleagues, founders, and collaborators." },
      { property: "og:url", content: "/experience/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/experience/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/experience", label: "Experience" }, { label: "Testimonials" }]} />
        <h1 className="text-5xl md:text-7xl font-serif mb-16">Testimonials.</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="glass-card rounded-2xl p-10 hover:border-accent/30 transition-colors">
              <span className="text-accent text-5xl font-serif leading-none">"</span>
              <blockquote className="text-xl font-serif text-foreground leading-relaxed mt-2 mb-8">{t.quote}</blockquote>
              <figcaption>
                <p className="text-sm text-foreground">{t.author}</p>
                <p className="text-[10px] text-dim tracking-widest uppercase mt-1">{t.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}