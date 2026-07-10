import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SKILLS } from "@/lib/site-data";

export const Route = createFileRoute("/about/skills")({
  head: () => ({
    meta: [
      { title: "Skills & Stack — About — Karnayana Rohith" },
      { name: "description", content: "Full technical stack with honest proficiency levels — C, Python, AI agents, cybersecurity, and ECE hardware." },
      { property: "og:title", content: "Skills & Stack — Karnayana Rohith" },
      { property: "og:description", content: "Full technical stack with honest proficiency levels." },
      { property: "og:url", content: "/about/skills" },
    ],
    links: [{ rel: "canonical", href: "/about/skills" }],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/about", label: "About" }, { label: "Skills & Stack" }]} />
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Skills & Stack</h1>
        <p className="text-dim text-lg max-w-2xl leading-relaxed mb-20">
          An honest map across systems programming, AI agent design, cybersecurity, and ECE hardware. Levels are self-assessed against what I've shipped and built, not just studied.
        </p>
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-16">
          {SKILLS.map((group) => (
            <div key={group.group}>
              <div className="flex items-baseline justify-between border-b border-zinc-900 pb-4 mb-6">
                <h2 className="text-2xl font-serif">{group.group}</h2>
                <span className="text-[10px] text-dim tracking-widest uppercase">
                  {group.items.length} disciplines
                </span>
              </div>
              <ul className="space-y-4">
                {group.items.map((s) => (
                  <li key={s.name}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm">{s.name}</span>
                      <span className="text-[10px] text-dim tracking-widest">{s.level}%</span>
                    </div>
                    <div className="h-px bg-zinc-900 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-accent"
                        style={{ width: `${s.level}%`, boxShadow: "0 0 12px rgba(0,229,255,0.5)" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}