import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { PROJECTS } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/work/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Karnayana Rohith" },
      { name: "description", content: "Long-form writeups of three foundational projects." },
      { property: "og:title", content: "Case Studies — Karnayana Rohith" },
      { property: "og:description", content: "Long-form writeups of three foundational projects." },
      { property: "og:url", content: "/work/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/work/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  const slugs = ["aegis", "foundra", "realme-c15-nethunter", "file-recovery"];
  const studies = slugs
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is (typeof PROJECTS)[number] => !!p);

  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/work", label: "Work" }, { label: "Case Studies" }]} />
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Case Studies.</h1>
        <p className="text-dim text-lg max-w-2xl mb-20 leading-relaxed">
          Four detailed engineering case studies: system architectures, security assessments, and raw code-level implementation details.
        </p>
        <div className="space-y-8">
          {studies.map((p, i) => (
            <Link
              key={p.slug}
              to="/work/$project"
              params={{ project: p.slug }}
              search={{ study: true }}
              className="group block p-10 rounded-2xl bg-panel border border-zinc-800 hover:border-accent/40 transition-all"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <p className="text-[10px] text-accent tracking-widest uppercase mb-3">
                    Study {String(i + 1).padStart(2, "0")} · {p.category}
                  </p>
                  <h2 className="text-4xl font-serif mb-3 group-hover:text-accent transition-colors">{p.title}</h2>
                  <p className="text-dim max-w-2xl leading-relaxed">{p.blurb}</p>
                </div>
                <ArrowUpRight className="size-6 text-dim group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}