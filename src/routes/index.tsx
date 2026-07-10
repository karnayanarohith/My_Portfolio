import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Typewriter } from "@/components/site/Typewriter";
import { ProjectCard } from "@/components/site/ProjectCard";
import { SectionHead } from "@/components/site/SectionHead";
import { GoDeeper } from "@/components/site/GoDeeper";
import { PROJECTS } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karnayana Rohith — AI & Security Technologist" },
      {
        name: "description",
        content:
          "Portfolio of Karnayana Rohith — machine learning, agentic AI, cybersecurity, and IoT systems.",
      },
      { property: "og:title", content: "Karnayana Rohith — AI & Security Technologist" },
      {
        property: "og:description",
        content: "Portfolio of Karnayana Rohith — building intelligent, secure systems at the intersection of AI, cybersecurity, and IoT.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const featured = PROJECTS.slice(0, 4);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between text-[10px] text-dim tracking-widest uppercase mb-12">
            <span>Selected Portfolio · MMXXVI</span>
            <span className="hidden md:block">IST · Visakhapatnam, India</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="flex-1">
              <span className="text-accent text-sm font-medium tracking-tighter block mb-6">
                Creative Technologist
              </span>
              <h1 className="text-[11vw] lg:text-[7vw] leading-[0.85] font-serif text-balance -ml-2 lg:-ml-4">
                Karnayana<br />
                <span className="italic text-dim">Rohith.</span>
              </h1>
              <p className="mt-10 text-2xl md:text-3xl font-serif text-foreground">
                Currently <Typewriter words={["machine learning.", "agentic AI.", "cybersecurity.", "IoT."]} />
              </p>
            </div>
            <div className="lg:w-1/3 pb-2 space-y-8">
              <p className="text-dim text-lg leading-relaxed text-pretty">
                Technologist and engineer building intelligent, secure systems at the convergence of AI, cybersecurity, and IoT. Currently shaping machine learning products and taking on select research engagements.
              </p>
              <div className="flex gap-3">
                <Link
                  to="/work"
                  className="text-xs font-medium px-5 py-3 ring-1 ring-accent/60 hover:bg-accent/10 hover:ring-accent transition-all rounded-md uppercase tracking-widest flex items-center gap-2"
                  data-cursor="hover"
                >
                  View Work <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="text-xs font-medium px-5 py-3 text-dim hover:text-foreground transition-colors uppercase tracking-widest"
                  data-cursor="hover"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SNAPSHOT */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            { k: "01", t: "I research", b: "silicon-level vulnerabilities and reverse-engineer low-level mobile systems." },
            { k: "02", t: "I build", b: "autonomous AI agents, cybersecurity tools, and production-grade software." },
            { k: "03", t: "I compete", b: "in national hackathons, winning championships and managing network operations." },
          ].map((s) => (
            <div key={s.k} className="border-l border-zinc-800 pl-6">
              <p className="text-[10px] text-accent tracking-widest uppercase mb-3">{s.k}</p>
              <h3 className="text-2xl font-serif mb-2">{s.t}</h3>
              <p className="text-dim text-sm leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead eyebrow="Featured" title="Selected Artifacts" meta="Series 01—24" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} p={p} offset={i % 2 === 1} />
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Link
              to="/work"
              className="text-xs font-medium px-6 py-3 ring-1 ring-zinc-800 hover:ring-accent/60 hover:text-accent transition-all rounded-md uppercase tracking-widest"
              data-cursor="hover"
            >
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      <GoDeeper
        title="Pick a thread, follow it down."
        cards={[
          { kicker: "About", to: "/about", title: "The Person", desc: "Bio, philosophy, and the background behind my work.", cta: "Read about me" },
          { kicker: "Work", to: "/work/case-studies", title: "Case Studies", desc: "Detailed, step-by-step engineering journals of my core projects.", cta: "Dive in" },
          { kicker: "Timeline", to: "/experience", title: "Experience", desc: "Hackathon wins, certifications, and professional roles.", cta: "See experience" },
        ]}
      />
    </SiteLayout>
  );
}