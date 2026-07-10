import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { GoDeeper } from "@/components/site/GoDeeper";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Karnayana Rohith" },
      { name: "description", content: "Reach out for internships, research collaborations, or project opportunities." },
      { property: "og:title", content: "Contact — Karnayana Rohith" },
      { property: "og:description", content: "Reach out for internships, research collaborations, or project opportunities." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const matchRoute = useMatchRoute();
  return (
    <SiteLayout>
      <PageHeader
        index="05 / Contact"
        eyebrow="Open to internships & collaborations"
        title={<>Say<br /><span className="italic text-dim">hello.</span></>}
        description="B.Tech ECE student building at the intersection of cybersecurity, agentic AI, and low-level systems. If you're working on something that needs someone who can research vulnerabilities in the morning and ship production LangGraph agents in the afternoon — let's talk."
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              {[
                { id: "name", label: "Your name", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "company", label: "Company / Project", type: "text" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[10px] text-dim tracking-widest uppercase mb-2">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    className="w-full bg-transparent border-b border-zinc-800 focus:border-accent outline-none py-3 text-lg transition-colors"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="msg" className="block text-[10px] text-dim tracking-widest uppercase mb-2">What are you building?</label>
                <textarea
                  id="msg"
                  rows={5}
                  required
                  className="w-full bg-transparent border-b border-zinc-800 focus:border-accent outline-none py-3 text-lg transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="mt-6 text-sm font-medium px-8 py-4 ring-1 ring-accent/60 hover:bg-accent/10 hover:ring-accent transition-all rounded-md uppercase tracking-widest"
              >
                {sent ? "Message received →" : "Send message"}
              </button>
            </form>
          </div>
          <aside className="lg:col-span-5 space-y-10">
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="size-1.5 rounded-full bg-accent animate-glow-pulse" />
                <span className="text-[10px] text-dim tracking-widest uppercase">Open to opportunities</span>
              </div>
              <p className="text-2xl font-serif">Internships, research roles, and project collaborations.</p>
            </div>

            {/* What I bring */}
            <div className="glass-card rounded-2xl p-8 space-y-4">
              <p className="text-[10px] text-dim tracking-widest uppercase mb-4">If you hire me</p>
              <p className="text-sm text-dim leading-relaxed">
                You get someone who reverse-engineers Android boot chains and builds multi-agent LLM systems in the same week. I work from first principles — I read kernel source before I write exploit code, and I understand system internals before I automate them.
              </p>
              <p className="text-sm text-dim leading-relaxed">
                Strong in <span className="text-foreground">Python, C, Bash</span> — comfortable in offensive security, digital forensics, and AI/ML pipelines. Fast learner, documented everything I've ever built.
              </p>
            </div>

            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-3">Email</p>
              <a href="mailto:karnayanarohith@gmail.com" className="text-xl font-serif hover:text-accent transition-colors break-all">
                karnayanarohith@gmail.com
              </a>
            </div>
            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-3">Elsewhere</p>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/karnayanarohith" target="_blank" rel="noopener noreferrer" className="text-dim hover:text-accent transition-colors">GitHub →</a></li>
                <li><a href="https://www.linkedin.com/in/rohith-karnayana/" target="_blank" rel="noopener noreferrer" className="text-dim hover:text-accent transition-colors">LinkedIn →</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-3">Resume</p>
              <a
                href="/Karnayana_Rohith_Resume.pdf"
                download="Karnayana_Rohith_Resume.pdf"
                className="inline-flex items-center gap-3 text-sm font-medium px-6 py-3 ring-1 ring-accent/60 hover:bg-accent/10 hover:ring-accent transition-all rounded-md uppercase tracking-widest"
              >
                ↓ Download Resume
              </a>
            </div>
            <div>
            </div>
          </aside>
        </div>
      </section>

      <GoDeeper
        title="Explore my work."
        cards={[
          { kicker: "Work", to: "/work", title: "Projects", desc: "View my AI agents and cybersecurity tools.", cta: "See Projects" },
          { kicker: "Experience", to: "/experience", title: "Experience", desc: "Check out my hackathon wins and credentials.", cta: "See Experience" },
        ]}
      />
    </SiteLayout>
  );
}