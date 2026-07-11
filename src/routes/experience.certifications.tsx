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
            Industry credentials and certificates representing hands-on practice, course completions, and hackathon participations. Hover to slide the info down slightly; click to open the document.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CERTS.map((cert) => (
            <div
              key={cert.title}
              className="group relative rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden h-[280px] flex flex-col"
            >
              {/* Full Certificate Preview Link */}
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 block w-full h-full z-0"
              >
                {cert.file.endsWith(".pdf") ? (
                  <iframe
                    src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full pointer-events-none border-none scale-100 origin-top"
                    title={cert.title}
                  />
                ) : (
                  <img
                    src={cert.file}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
                
                {/* View link indicator shown on hover */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-widest px-3 py-1.5 bg-black/85 text-white rounded border border-zinc-800 backdrop-blur-sm shadow-xl">
                    Open Document ↗
                  </span>
                </div>
              </a>

              {/* Sliding Info Overlay Panel (covers the bottom, slides down 10% on hover) */}
              <div className="absolute bottom-0 inset-x-0 z-10 bg-zinc-950/95 border-t border-zinc-900 backdrop-blur-md p-5 transition-transform duration-500 ease-in-out transform translate-y-0 group-hover:translate-y-[10%] flex flex-col justify-between h-[160px] pointer-events-none select-none">
                <div>
                  <div className="flex justify-between items-baseline gap-2 mb-1.5">
                    <span className="text-[9px] text-accent tracking-widest uppercase">{cert.issuer}</span>
                    <span className="text-[8px] text-dim shrink-0">{cert.date}</span>
                  </div>
                  <h2 className="text-base font-serif mb-1 leading-snug text-foreground line-clamp-1">
                    {cert.title}
                  </h2>
                  <p className="text-[11px] text-dim leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mt-auto">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-dim"
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
