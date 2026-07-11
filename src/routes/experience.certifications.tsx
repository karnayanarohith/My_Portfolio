import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";

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
            Industry credentials and certificates representing hands-on practice, course completions, and hackathon participations. Click any certificate to open it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTS.map((cert) => (
            <div
              key={cert.title}
              className="group relative rounded-2xl border border-zinc-800 bg-panel/30 overflow-hidden flex flex-col h-[560px]"
            >
              {/* Visual preview of Certificate */}
              <div className="relative h-64 w-full bg-zinc-950 overflow-hidden border-b border-zinc-900 shrink-0">
                {cert.file.endsWith(".pdf") ? (
                  <iframe
                    src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full pointer-events-none scale-100 origin-top"
                    title={cert.title}
                  />
                ) : (
                  <img
                    src={cert.file}
                    alt={cert.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* View link overlay */}
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]"
                >
                  <span className="text-xs uppercase tracking-widest px-4 py-2 ring-1 ring-white/60 bg-black/60 text-white rounded">
                    Open Full Document ↗
                  </span>
                </a>
              </div>

              {/* Text about it in the bottom half of the certificate card */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-surface/50 backdrop-blur-sm">
                <div>
                  <div className="flex justify-between items-baseline gap-2 mb-2">
                    <span className="text-[10px] text-accent tracking-widest uppercase">{cert.issuer}</span>
                    <span className="text-[9px] text-dim shrink-0">{cert.date}</span>
                  </div>
                  <h2 className="text-xl font-serif mb-3 leading-snug group-hover:text-accent transition-colors">
                    {cert.title}
                  </h2>
                  <p className="text-xs text-dim leading-relaxed mb-4 line-clamp-3">
                    {cert.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-dim"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
