import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/experience/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Karnayana Rohith" },
      { name: "description", content: "Professional certifications in cybersecurity, AI, and networking." },
      { property: "og:title", content: "Certifications — Karnayana Rohith" },
      { property: "og:description", content: "Professional certifications in cybersecurity, AI, and networking." },
      { property: "og:url", content: "/experience/certifications" },
    ],
    links: [{ rel: "canonical", href: "/experience/certifications" }],
  }),
  component: CertificationsPage,
});

const CERTS = [
  {
    issuer: "Cisco Networking Academy",
    title: "Getting Started with Cisco Packet Tracer",
    date: "Oct 2025",
    domain: "Networking",
    description:
      "Hands-on introduction to Cisco Packet Tracer — the industry-standard network simulation environment used for designing, building, and troubleshooting network topologies without physical hardware.",
    skills: [
      "Network topology design",
      "Router & switch configuration",
      "CLI-based device setup",
      "Packet simulation & tracing",
      "LAN/WAN troubleshooting",
    ],
  },
  {
    issuer: "Deloitte (via Forage)",
    title: "Cybersecurity Job Simulation",
    date: "Oct 2025",
    domain: "Cybersecurity",
    description:
      "Practical simulation of real-world cybersecurity analyst work at Deloitte. Completed applied tasks in log analysis, threat identification, and writing up findings — mirroring what junior analysts do on their first engagements.",
    skills: [
      "Security log analysis",
      "Threat identification",
      "Incident documentation",
      "SOC analyst workflows",
      "Cybersecurity reporting",
    ],
  },
  {
    issuer: "Tata Group (via Forage)",
    title: "Cybersecurity Analyst Job Simulation",
    date: "Oct 2025",
    domain: "Cybersecurity · IAM",
    description:
      "End-to-end simulation of an IAM analyst role at Tata Consultancy Services. Covered identity lifecycle management, IAM strategy assessment, and designing custom access control solutions — key skills for enterprise security roles.",
    skills: [
      "IAM fundamentals",
      "IAM strategy assessment",
      "Access control design",
      "Custom IAM solution crafting",
      "Platform integration concepts",
    ],
  },
  {
    issuer: "Qualcomm",
    title: "AI Upskilling Program",
    date: "Nov 2025",
    domain: "AI / ML",
    description:
      "Qualcomm's industry AI upskilling program covering applied artificial intelligence and machine learning concepts with a focus on real-world deployment. Recognised with a verified credential from Qualcomm's official training division.",
    skills: [
      "Applied AI/ML concepts",
      "Model deployment fundamentals",
      "AI in industry contexts",
      "Emerging AI technologies",
    ],
  },
  {
    issuer: "Google",
    title: "5-Day AI Agents Intensive Course",
    date: "2025",
    domain: "Agentic AI",
    description:
      "Intensive 5-day course run by Google covering the architecture and implementation of AI agents. Topics spanned LLM prompting strategies, tool use, RAG pipelines, multi-agent orchestration, and building production-ready agentic systems.",
    skills: [
      "LLM agent architecture",
      "Tool use & function calling",
      "RAG pipeline design",
      "Multi-agent orchestration",
      "Agentic system patterns",
    ],
  },
];

function CertificationsPage() {
  return (
    <SiteLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb
          trail={[
            { to: "/experience", label: "Experience" },
            { label: "Certifications" },
          ]}
        />

        <div className="mb-16">
          <p className="text-accent text-[10px] tracking-widest uppercase mb-4">Verified Credentials</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Certifications.</h1>
          <p className="text-dim text-lg max-w-2xl leading-relaxed">
            Industry certifications earned through hands-on simulations, course completions, and verified programs.
            Each one represents applied practice, not just theory.
          </p>
        </div>

        <div className="space-y-8">
          {CERTS.map((cert) => (
            <div
              key={cert.title}
              className="p-8 md:p-10 rounded-2xl bg-panel border border-zinc-800"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[10px] text-accent tracking-widest uppercase">{cert.issuer}</span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-[10px] text-dim tracking-widest uppercase">{cert.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif">{cert.title}</h2>
                </div>
                <span className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full ring-1 ring-zinc-800 text-dim shrink-0">
                  {cert.domain}
                </span>
              </div>

              {/* Description */}
              <p className="text-dim leading-relaxed mb-8">{cert.description}</p>

              {/* Skills */}
              <div>
                <p className="text-[10px] text-dim tracking-widest uppercase mb-4">Skills & Topics</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cert.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-sm text-dim">
                      <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
