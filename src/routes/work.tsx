import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { ProjectCard } from "@/components/site/ProjectCard";
import { GoDeeper } from "@/components/site/GoDeeper";
import { CATEGORIES, PROJECTS } from "@/lib/site-data";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Karnayana Rohith" },
      {
        name: "description",
        content: "Selected projects in machine learning, agentic AI, cybersecurity, and IoT systems.",
      },
      { property: "og:title", content: "Work — Karnayana Rohith" },
      {
        property: "og:description",
        content: "Selected projects in machine learning, agentic AI, cybersecurity, and IoT systems.",
      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const matchRoute = useMatchRoute();
  const isChildRoute =
    matchRoute({ to: "/work/case-studies" }) ||
    matchRoute({ to: "/work/cves" }) ||
    matchRoute({ to: "/work/cves/$slug" }) ||
    matchRoute({ to: "/work/gallery" }) ||
    matchRoute({ to: "/work/$project" });

  const [cat, setCat] = useState("All");
  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  if (isChildRoute) {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      <PageHeader
        index="03 / Work"
        eyebrow={`${PROJECTS.length} selected · 2024—2026`}
        title={
          <>
            The system<br />
            <span className="italic text-dim">stack.</span>
          </>
        }
        description="A curated selection of projects spanning machine learning, agentic AI, cybersecurity, and IoT — from experimental prototypes to production systems."
      />

      <section className="pt-4 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-16">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                data-cursor="hover"
                className={`text-[10px] tracking-widest uppercase px-4 py-2 rounded-full ring-1 transition-all ${cat === c
                    ? "ring-accent text-accent bg-accent/10"
                    : "ring-zinc-800 text-dim hover:text-foreground hover:ring-zinc-700"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {list.map((p, i) => (
              <ProjectCard key={p.slug} p={p} offset={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <GoDeeper
        title="Different ways to look at the work."
        cards={[
          {
            kicker: "Sub",
            to: "/work/case-studies",
            title: "Case Studies",
            desc: "Deep dives into secure system design, model architectures, and deployment stories.",
            cta: "Read studies",
          },
          {
            kicker: "Sub",
            to: "/work/cves",
            title: "CVE Research",
            desc: "Hands-on vulnerability research on personal hardware — BROM exploits, hex diffs, and 7 documented failure attempts.",
            cta: "Read research",
          },
          {
            kicker: "Sub",
            to: "/work/gallery",
            title: "Gallery",
            desc: "A visual archive of system diagrams, prototypes, and hardware teardowns.",
            cta: "Open gallery",
          },
          // Blog temporarily hidden — coming back with real posts
          // {
          //   kicker: "Sub",
          //   to: "/work/blog",
          //   title: "Blog / Thoughts",
          //   desc: "Essays on AI safety, autonomous agents, and the future of cybersecurity.",
          //   cta: "Read essays",
          // },
        ]}
      />
    </SiteLayout>
  );
}