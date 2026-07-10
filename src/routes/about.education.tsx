import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const Route = createFileRoute("/about/education")({
  head: () => ({
    meta: [
      { title: "Education — Karnayana Rohith" },
      { name: "description", content: "Academic background and courses — B.Tech ECE at Andhra University." },
      { property: "og:title", content: "Education — Karnayana Rohith" },
      { property: "og:description", content: "Academic background and courses — B.Tech ECE at Andhra University." },
      { property: "og:url", content: "/about/education" },
    ],
    links: [{ rel: "canonical", href: "/about/education" }],
  }),
  component: EducationPage,
});

const entries = [
  {
    year: "2023 — Present",
    title: "B.Tech — Electronics & Communication Engineering",
    org: "Andhra University College of Engineering (AUCE)",
    note: "GPA: 8.4 / 10.0 · Visakhapatnam, AP.",
  },
  {
    year: "2021 — 2023",
    title: "Intermediate — MPC",
    org: "Sri Gayathri Junior College, Gotlam",
    note: "95%",
  },
  {
    year: "2021",
    title: "Secondary School Certificate (SSC)",
    org: "ZPHS Siripuram",
    note: "85%",
  },
];

function EducationPage() {
  return (
    <SiteLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/about", label: "About" }, { label: "Education" }]} />
        <h1 className="text-5xl md:text-7xl font-serif mb-16">Education</h1>
        <ul className="space-y-12">
          {entries.map((e) => (
            <li key={e.title} className="grid md:grid-cols-12 gap-6 pb-12 border-b border-zinc-900 last:border-0">
              <div className="md:col-span-2 text-accent text-sm tracking-widest">{e.year}</div>
              <div className="md:col-span-6">
                <h3 className="text-2xl font-serif">{e.title}</h3>
                <p className="text-dim text-sm mt-1">{e.org}</p>
              </div>
              <div className="md:col-span-4 text-dim text-sm leading-relaxed">{e.note}</div>
            </li>
          ))}
        </ul>
      </div>
    </SiteLayout>
  );
}