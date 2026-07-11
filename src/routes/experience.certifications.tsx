import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";

const getAccent = (domain: string) => {
  const d = domain.toLowerCase();
  if (d.includes("cybersecurity") || d.includes("security")) return "#ff6b6b";
  if (d.includes("agentic") || d.includes("agent")) return "#5ce1e6";
  if (d.includes("networking") || d.includes("cisco")) return "#00bfff";
  if (d.includes("ai") || d.includes("ml") || d.includes("machine")) return "#a78bfa";
  if (d.includes("geospatial")) return "#00ffd1";
  return "#f59e0b"; // Default color
};

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
    file: "/certs/Blue Team Junior Analyst Pathway Bundle-btja.pdf",
    description:
      "Specialized defensive security credential focused on security operations, threat hunting, log analysis, network security monitoring (Wazuh/Splunk), and incident triage.",
    skills: [
      "Security Operations",
      "Incident Response",
      "Log Triage & Analysis",
      "Network Security Monitoring",
      "Wazuh & Splunk",
    ],
  },
  {
    issuer: "Google",
    title: "5-Day AI Agents Intensive Course",
    date: "2025",
    domain: "Agentic AI",
    file: "/certs/5-Day AI Agents Intensive Course with Google.png",
    description:
      "Intensive 5-day course run by Google covering the architecture and implementation of autonomous AI agents. Topics spanned LLM prompting, tool use, RAG pipelines, and multi-agent orchestration.",
    skills: [
      "LLM Agent Architecture",
      "Tool Use & Function Calling",
      "RAG Pipeline Design",
      "Multi-Agent Orchestration",
    ],
  },
  {
    issuer: "Cisco Networking Academy",
    title: "Getting Started with Cisco Packet Tracer",
    date: "Oct 2025",
    domain: "Networking",
    file: "/certs/Cisco_Packet_Tracer_certificate_karnayanarohith.pdf",
    description:
      "Hands-on network simulation training covering topology design, router and switch configuration, CLI device setup, and LAN/WAN troubleshooting using Packet Tracer.",
    skills: [
      "Network Topology Design",
      "Router & Switch Config",
      "CLI Device Setup",
      "LAN/WAN Troubleshooting",
    ],
  },
  {
    issuer: "Codec Technologies",
    title: "Cyber Security Intern Certificate",
    date: "May 2025 — June 2025",
    domain: "Cybersecurity",
    file: "/certs/codec.png",
    description:
      "AICTE & ICAC approved internship certificate representing completed projects in offensive security, vulnerability assessment, and log analysis.",
    skills: [
      "Vulnerability Assessment",
      "Traffic Analysis",
      "Nmap & Wireshark",
      "Offensive Security Concepts",
    ],
  },
  {
    issuer: "Qualcomm",
    title: "AI Upskilling Program",
    date: "Nov 2025",
    domain: "AI / ML",
    file: "/certs/Qualcomm_AI Upskilling certificate_X7D07KKXB6_KARNAYANA ROHITH.pdf",
    description:
      "Qualcomm's industry AI upskilling program covering applied artificial intelligence and machine learning concepts with a focus on real-world deployment.",
    skills: [
      "Applied AI/ML Concepts",
      "Model Deployment",
      "AI in Industry Contexts",
      "Emerging AI Technologies",
    ],
  },
  {
    issuer: "Deloitte (via Forage)",
    title: "Cybersecurity Job Simulation",
    date: "Oct 2025",
    domain: "Cybersecurity",
    file: "/certs/Dellotte.pdf",
    description:
      "Practical simulation of real-world cybersecurity analyst work at Deloitte. Completed applied tasks in security log analysis, threat identification, and writing up findings.",
    skills: [
      "Security Log Analysis",
      "Threat Identification",
      "Incident Documentation",
      "SOC Analyst Workflows",
    ],
  },
  {
    issuer: "Tata Group (via Forage)",
    title: "Cybersecurity Analyst Job Simulation",
    date: "Oct 2025",
    domain: "Cybersecurity · IAM",
    file: "/certs/TATA.pdf",
    description:
      "End-to-end simulation of an IAM analyst role at Tata Consultancy Services. Covered identity lifecycle management, IAM strategy assessment, and designing access control solutions.",
    skills: [
      "IAM Fundamentals",
      "IAM Strategy Assessment",
      "Access Control Design",
      "Platform Integration Concepts",
    ],
  },
  {
    issuer: "IIT Dharwad",
    title: "AURORA 2.0 Technical Competitor",
    date: "2024",
    domain: "Geospatial AI",
    file: "/certs/AURORA 2.0.pdf",
    description:
      "Certificate of participation for completing the technical track at AURORA 2.0 organised by IIT Dharwad, developing satellite imagery illegal mining detection models.",
    skills: [
      "Geospatial Analytics",
      "Remote Sensing",
      "Team Collaboration",
      "Anomaly Detection",
    ],
  },
  {
    issuer: "Ministry of Education (Govt. of India)",
    title: "Smart India Hackathon Competitor",
    date: "2024",
    domain: "Product Development",
    file: "/certs/SIH PARTICIPATION.pdf",
    description:
      "Certificate of participation for competing in the grand finale of Smart India Hackathon, the flagship national hackathon of India, solving high-impact domain challenges.",
    skills: [
      "Product Prototyping",
      "Rapid Development",
      "Problem Solving",
      "System Presentation",
    ],
  },
];

function CertificationsPage() {
  const [activeCert, setActiveCert] = useState<typeof CERTS[number] | null>(null);

  return (
    <SiteLayout>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-16 pb-24">
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
            Industry credentials and certificates representing hands-on practice, course completions, and hackathon participations. Hover to reveal the view option; click to preview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CERTS.map((cert) => {
            const accent = getAccent(cert.domain);
            return (
              <div
                key={cert.title}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-panel ring-1 ring-white/5 hover:ring-accent/30 transition-all cursor-pointer"
                onClick={() => setActiveCert(cert)}
              >
                {/* Visual Project-like Gradient Card */}
                <div
                  className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.02]"
                  style={{
                    background: `radial-gradient(circle at 30% 40%, ${accent}25, transparent 60%), linear-gradient(135deg, #0f0f0f, #1a1a1a)`,
                  }}
                />
                
                {/* Center Title overlay (Subtle, uppercase text same as project cards) */}
                <div className="absolute inset-0 grid place-items-center p-6 text-center">
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600 group-hover:text-accent/70 transition-colors line-clamp-2 select-none">
                    {cert.title}
                  </span>
                </div>

                {/* Bottom details block (same as project cards) */}
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-accent text-[10px] font-medium tracking-widest uppercase mb-2 block">
                        {cert.issuer} · {cert.date}
                      </span>
                      <h3 className="text-xl font-medium text-foreground line-clamp-1">{cert.title}</h3>
                    </div>
                    <ArrowUpRight className="size-5 text-dim group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </div>

                {/* Minimalist Floating "View Certificate" label on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="px-4 py-2 bg-zinc-950/90 text-accent border border-zinc-800 text-[10px] font-semibold uppercase tracking-widest rounded-md backdrop-blur-sm shadow-2xl pointer-events-auto">
                    View Certificate
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Overlay for displaying active certificate */}
        {activeCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setActiveCert(null)}
          >
            <div
              className="relative w-full max-w-6xl h-[85vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:px-6 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md z-10">
                <div>
                  <span className="text-[10px] text-accent tracking-widest uppercase block mb-1">
                    {activeCert.issuer}
                  </span>
                  <h3 className="text-base sm:text-lg font-medium text-foreground line-clamp-1">
                    {activeCert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={activeCert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-dim hover:text-accent font-semibold uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                  >
                    Open Original ↗
                  </a>
                  <button
                    onClick={() => setActiveCert(null)}
                    className="p-1 text-dim hover:text-foreground hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Two Column Layout: Viewer on the Left, Details Sidebar on the Right */}
              <div className="flex-1 overflow-hidden grid lg:grid-cols-12">
                {/* Viewport (Left/Middle) */}
                <div className="lg:col-span-8 bg-zinc-900/40 flex items-center justify-center p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-zinc-900 overflow-auto">
                  {activeCert.file.endsWith(".pdf") ? (
                    <iframe
                      src={`${activeCert.file}#toolbar=1&navpanes=0`}
                      className="w-full h-full rounded-lg border border-zinc-800/80 bg-zinc-950 min-h-[400px] lg:min-h-0"
                      title={activeCert.title}
                    />
                  ) : (
                    <img
                      src={activeCert.file}
                      alt={activeCert.title}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
                    />
                  )}
                </div>

                {/* Details Sidebar (Right) */}
                <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-zinc-950">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Metadata</p>
                      <div className="space-y-1 text-sm text-foreground">
                        <p><span className="text-dim">Issued by:</span> {activeCert.issuer}</p>
                        <p><span className="text-dim">Date:</span> {activeCert.date}</p>
                        <p><span className="text-dim">Domain:</span> {activeCert.domain}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Description</p>
                      <p className="text-sm text-dim leading-relaxed">
                        {activeCert.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-900">
                    <p className="text-[10px] text-dim tracking-widest uppercase mb-3">Skills Acquired</p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[9px] px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-dim"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
