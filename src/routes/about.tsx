import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { GoDeeper } from "@/components/site/GoDeeper";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Karnayana Rohith" },
      {
        name: "description",
        content:
          "Bio, philosophy, and personality behind Karnayana Rohith — AI & Security Technologist.",
      },
      { property: "og:title", content: "About — Karnayana Rohith" },
      {
        property: "og:description",
        content:
          "Bio, philosophy, and personality behind Karnayana Rohith — AI & Security Technologist.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const matchRoute = useMatchRoute();
  const isChildRoute =
    matchRoute({ to: "/about/skills" }) ||
    matchRoute({ to: "/about/education" }) ||
    matchRoute({ to: "/about/now" }) ||
    matchRoute({ to: "/about/uses" });

  if (isChildRoute) {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      <PageHeader
        index="02 / About"
        eyebrow="The person"
        title={
          <>
            Technologist,<br />
            <span className="italic text-dim">engineer, builder.</span>
          </>
        }
        description="I started with cybersecurity, moved deep into machine learning, and later advanced to agentic AI. Today I bring those threads together to build secure, intelligent systems that think and act autonomously."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-2xl bg-panel ring-1 ring-white/5 relative overflow-hidden glass-card">
              <img
                src="/profile.jpeg"
                alt="Karnayana Rohith"
                className="w-full h-full object-cover scale-[1.15] -translate-x-6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] text-dim tracking-widest uppercase">
                <span>AP, India · 2026</span>
                <span>Snapshot 01</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-8 text-lg leading-relaxed text-dim">
            <p>
              My work sits at the bleeding edge of cybersecurity, machine learning, and agentic AI. 
              I treat every system as an intelligent architecture that must be robust at its core, secure by design, and capable of anticipating the next threat or opportunity.
            </p>
            <p>
              I started by reverse-engineering silicon-level hardware and bypassing locked bootloaders (like deploying Kali NetHunter on EOL MediaTek chips). Today, my focus is dissecting exactly how AI models work under the hood and leveraging that intelligence for cybersecurity. I build autonomous, multi-agent AI systems that can reason, plan, and execute complex security workflows — merging offensive hacking instincts with modern LLM architectures.
            </p>
            <p>
              Off the terminal, I am capable of architecting complex physical network operations (having independently deployed infrastructure for massive 400+ participant events), competing in national tech championships, and exploring the coastline around Visakhapatnam.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-zinc-900">
              <div>
                <p className="text-[10px] text-accent tracking-widest uppercase mb-2">Philosophy</p>
                <p className="text-sm text-foreground">
                  Security without compromise, intelligence without friction.
                </p>
              </div>
              <div>
                <p className="text-[10px] text-accent tracking-widest uppercase mb-2">Mantra</p>
                <p className="text-sm text-foreground">
                  Build like an attacker, think like a defender.
                </p>
              </div>
              <div>
                <p className="text-[10px] text-accent tracking-widest uppercase mb-2">Working out of</p>
                <p className="text-sm text-foreground">Andhra Pradesh, India · Remote & On‑site</p>
              </div>
              <div>
                <p className="text-[10px] text-accent tracking-widest uppercase mb-2">Open to</p>
                <p className="text-sm text-foreground">
                  Internships, research collaborations & freelance engagements
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="inline-flex text-sm text-accent uppercase tracking-widest hover:text-foreground transition-colors"
              >
                Get in touch →
              </Link>
              <a
                href="/Karnayana_Rohith_Resume.pdf"
                download="Karnayana_Rohith_Resume.pdf"
                className="inline-flex items-center gap-2 text-sm text-dim uppercase tracking-widest hover:text-accent transition-colors"
              >
                ↓ Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <GoDeeper
        title="More about how I work."
        cards={[
          {
            kicker: "Sub",
            to: "/about/skills",
            title: "Skills & Stack",
            desc: "Every tool and capability, with honest proficiency.",
            cta: "See stack",
          },
          {
            kicker: "Sub",
            to: "/about/education",
            title: "Education",
            desc: "Degrees, courses, and what I'm learning this year.",
            cta: "Read more",
          },
        ]}
      />
    </SiteLayout>
  );
}