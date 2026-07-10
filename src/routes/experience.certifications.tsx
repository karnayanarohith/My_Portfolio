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
    issuer: "Centri Security",
    title: "Blue Team Junior Analyst (BTJA)",
    date: "2026",
    domain: "Cybersecurity",
    description:
      "Specialized defensive security credential focused on security operations, threat hunting, log analysis, traffic analysis, and incident triage.",
    skills: [
      "Security Operations",
      "Incident Response",
      "Log Triage & Analysis",
      "Network Security Monitoring",
      "Wazuh & Splunk",
    ],
  },
  {
    issuer: "Anthropic",
    title: "Model Context Protocol (MCP) Developer",
    date: "2026",
    domain: "Agentic AI",
    description:
      "Developer certification focused on building secure context-sharing layers and tool-calling interfaces for autonomous LLM agents.",
    skills: [
      "MCP Server Architecture",
      "Context Management",
      "LLM Tool Binding",
      "API Security",
    ],
  },
  {
    issuer: "Cisco Networking Academy",
    title: "Ethical Hacker Path (18+ credentials)",
    date: "2025 – 2026",
    domain: "Offensive Security",
    description:
      "Comprehensive learning path and credentials spanning application vulnerability exploitation, post-exploitation techniques, social engineering, and wireless network security.",
    skills: [
      "Application Vulnerability Exploitation",
      "Post-Exploitation Techniques",
      "Wireless Network Security",
      "Information Gathering & Scanning",
    ],
  },
  {
    issuer: "Kaggle",
    title: "Machine Learning Certification",
    date: "2025",
    domain: "Machine Learning",
    description:
      "Hands-on certification covering core machine learning pipelines, feature engineering, and model training/validation using PyTorch and pandas.",
    skills: [
      "Feature Engineering",
      "Model Validation",
      "PyTorch Pipelines",
      "Data Analysis",
    ],
  },
  {
    issuer: "Deloitte (via Forage)",
    title: "Cybersecurity Job Simulation",
    date: "2025",
    domain: "Cybersecurity",
    description:
      "Practical simulation of cybersecurity analyst work at Deloitte. Completed applied tasks in security log analysis, threat identification, and forensic report writing.",
    skills: [
      "Security log analysis",
      "Threat identification",
      "Incident documentation",
      "SOC analyst workflows",
    ],
  },
  {
    issuer: "Tata Group (via Forage)",
    title: "Identity & Access Management (IAM) Simulation",
    date: "2025",
    domain: "Cybersecurity · IAM",
    description:
      "Role-playing simulation of an IAM analyst at TCS, designing custom identity architectures, access policies, and permission boundaries.",
    skills: [
      "IAM Architecture",
      "Access Control Design",
      "Permission Boundaries",
      "Security Auditing",
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
