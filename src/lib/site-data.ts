import type { Project } from "@/components/site/ProjectCard";

export const PROJECTS: Project[] = [
  {
    slug: "aegis",
    title: "Aegis",
    category: "Agentic AI",
    year: "2025",
    stack: ["Python", "LangGraph", "Ollama", "ChromaDB", "Bash"],
    blurb:
      "An autonomous AI security agent that reasons, plans, and executes shell commands — with persistent memory, tool orchestration, and a built-in self-defense layer against prompt injection.",
    accent: "#00e5ff",
  },
  {
    slug: "foundra",
    title: "Foundra",
    category: "Agentic AI",
    year: "2025",
    stack: ["Python", "LangGraph", "FastAPI", "PostgreSQL", "ChromaDB", "Gemini"],
    blurb:
      "An AI startup operating system — multi-agent platform that takes a founder's raw idea through 6 sequential phases from problem discovery to go-to-market strategy, with boardroom-level decision agents.",
    accent: "#5ce1e6",
  },
  {
    slug: "aegis-guard",
    title: "Aegis-Guard",
    category: "Cybersecurity",
    year: "2026",
    stack: ["Python", "Sentence Transformers", "ChromaDB", "Ollama", "Regex"],
    blurb:
      "A 4-layer prompt injection firewall for local LLM agents — regex pattern engine, structural analyzer, semantic embedding layer, and LLM judge — with a p99 latency under 150ms.",
    accent: "#ff6b6b",
  },
  {
    slug: "realme-c15-nethunter",
    title: "Realme C15 NetHunter",
    category: "Cybersecurity",
    year: "2026",
    stack: ["Android", "BROM Exploit", "Magisk", "Bash", "Linux Loopback"],
    blurb:
      "A complete mobile security case study: bypassing hardware-level SLA/DAA BROM controls, manually injecting logical system blocks with a 1MB offset, downgrading bootloader stacks, and deploying a Kali NetHunter penetration platform.",
    accent: "#ff007f",
  },
  {
    slug: "file-recovery",
    title: "AEGIS File Recovery",
    category: "Cybersecurity",
    year: "2025",
    stack: ["C", "EXT4", "Make", "Raw Block I/O"],
    blurb:
      "Raw EXT4 file carving tool in C — no libraries, no filesystem APIs. Reads magic bytes directly off block devices, scans 20GB partitions in under 3 minutes, and previews files before recovery.",
    accent: "#00ffd1",
  },
  {
    slug: "deepfake-detection",
    title: "Deepfake Detection",
    category: "Machine Learning",
    year: "2025",
    stack: ["Python", "PyTorch", "OpenCV", "MMDetection"],
    blurb:
      "Forensic AI module for detecting deepfake and manipulated media — a core component of the Aegis local security platform, designed for offline analysis with no cloud dependency.",
    accent: "#a78bfa",
  },
  {
    slug: "small-object-detection",
    title: "Small Object Detection",
    category: "Machine Learning",
    year: "2024",
    stack: ["Python", "MMDetection", "PyTorch", "DDOD", "DINO"],
    blurb:
      "Anchor-based (DDOD) vs transformer-based (DINO) detection for shipping container seal and security tag inspection — trained on a self-collected COCO dataset on a 4GB GPU, with class-wise mAP benchmarking.",
    accent: "#00bfff",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    category: "Web Dev",
    year: "2026",
    stack: ["TypeScript", "React", "TanStack Router", "Vite", "Tailwind"],
    blurb:
      "A high-performance developer portfolio built with TanStack Router, glassmorphism design language, custom cursor animations, and smooth sub-route navigation — the site you are reading this on.",
    accent: "#f59e0b",
  },
];

export const CATEGORIES = [
  "All",
  "Agentic AI",
  "Cybersecurity",
  "Machine Learning",
  "Systems",
  "Web Dev",
];

export type CVEResearch = {
  slug: string;
  title: string;
  blurb: string;
  date: string;
  duration: string;
  status: "In Progress" | "Completed" | "Read-only";
  cves: string[];
  deviceInfo: { label: string; value: string }[];
};

export const CVE_RESEARCH: CVEResearch[] = [
  {
    slug: "realme-c15-mt6765",
    title: "Realme C15 — MT6765 Security Research",
    blurb:
      "Silicon-level BROM exploit DA bypass, bootloader unlock, direct logical block injection (seek=1) to bypass recovery updater limits, bootloader downgrades to align firmware, Magisk root, and Kali NetHunter deployment on an End-of-Life MediaTek Helio G35 chipset.",
    date: "May 2026 — July 2026",
    duration: "Completed",
    status: "Completed",
    cves: [
      "BROM DA Bypass",
      "CVE-2022-20421",
      "CVE-2020-0069",
      "CVE-2021-22600",
      "Post-Jul-2022 MT6765",
    ],
    deviceInfo: [
      { label: "Model", value: "Realme C15 (RMX2180)" },
      { label: "Chipset", value: "MT6765G / Helio G35" },
      { label: "Android", value: "11 (final — EOL)" },
      { label: "Kernel", value: "4.19.127+" },
      { label: "Security Patch", value: "2022-07-05 (last ever)" },
      { label: "Realme UI", value: "V2.0 / ColorOS V11" },
    ],
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
};

export const POSTS: Post[] = [
  {
    slug: "the-quiet-craft",
    title: "The Quiet Craft of Digital Detail",
    excerpt: "Why the best interfaces feel like rooms — and how to design the silence between elements.",
    date: "2026 · 04",
    readTime: "8 min",
    tag: "Essay",
  },
  {
    slug: "motion-as-meaning",
    title: "Motion as Meaning",
    excerpt: "Animation is not decoration. A framework for treating motion as a load-bearing layer of the design system.",
    date: "2026 · 02",
    readTime: "12 min",
    tag: "Process",
  },
  {
    slug: "against-the-feed",
    title: "Against the Feed",
    excerpt: "Notes on building software that respects attention in an era engineered to steal it.",
    date: "2025 · 11",
    readTime: "6 min",
    tag: "Manifesto",
  },
  {
    slug: "type-as-architecture",
    title: "Type as Architecture",
    excerpt: "A long love letter to display serifs and the buildings they build inside browsers.",
    date: "2025 · 08",
    readTime: "10 min",
    tag: "Essay",
  },
];

export const EXPERIENCES = [
  {
    role: "Android Security & Systems Researcher",
    company: "Self-Directed Research",
    period: "May 2026 — July 2026",
    location: "Realme C15 (MT6765)",
    bullets: [
      "Conducted MediaTek BROM exploit research to bypass Download Agent authentication using MTKClient and dump the device's seccfg partition.",
      "Mapped vulnerability attack surfaces on EOL firmware, profiling CVE-2022-20421 (Binder UAF) and CVE-2024-20106 (Type Confusion) via GDB and dmesg.",
      "Executed bootloader unlocking via BROM RAM patching and resolved Android dynamic partition allocation errors during custom recovery flashing.",
      "Deployed LineageOS and set up a Kali NetHunter chroot environment to convert the device into a mobile penetration testing platform."
    ],
  },
  {
    role: "Network Operations Lead",
    company: "ELEXCENTRA Hackathon",
    period: "March 2026",
    location: "Andhra University College of Engineering",
    bullets: [
      "Engineered and managed the network infrastructure for a live, 5-hour hackathon supporting 400+ concurrent devices across 6 rooms.",
      "Configured and deployed Wi-Fi and physical LAN cabling using TP-Link switches along with D-Link and Netgear routers.",
      "Diagnosed and resolved real-time network congestion, signal degradation, and routing conflicts under pressure to ensure zero downtime."
    ],
  },
  {
    role: "Machine Learning Research Assistant",
    company: "NEXUS Research Project",
    period: "2025",
    location: "Andhra University (under Dr. Karri Chiranjeevi)",
    bullets: [
      "Engineered a real-time small object detection pipeline for industrial seals and tags utilizing PyTorch, CUDA, and the MMDetection framework.",
      "Benchmarked advanced CNN and Vision Transformer architectures including TOOD, Deformable DETR, and DINO.",
      "Achieved 98% accuracy on large objects and improved small-object mAP from 0.0 to 0.28 via resolution scaling and custom data balancing."
    ],
  }
];

export const TESTIMONIALS = [
  {
    quote:
      "Rohith sees the seams between disciplines and stitches them shut. The output looks inevitable.",
    author: "Mira Okafor",
    title: "VP Product, Northwave",
  },
  {
    quote: "The most considered designer I've ever shipped with. Every pixel pays rent.",
    author: "Daniel Reyes",
    title: "Founder, Aperture Labs",
  },
  {
    quote: "Equal parts systems thinker and craftsperson. Rare combination, fully delivered.",
    author: "Sasha Lindqvist",
    title: "Head of Design, Hyperlane",
  },
  {
    quote: "Working with Karnayana Rohith is like turning a dial from noise to signal.",
    author: "Ren Kobayashi",
    title: "CTO, Halcyon Bank",
  },
];

export const SKILLS = [
  {
    group: "Programming",
    items: [
      { name: "Python", level: 90 },
      { name: "C (Systems & File I/O)", level: 85 },
      { name: "Bash / Shell Scripting", level: 80 },
      { name: "JavaScript / React", level: 75 },
      { name: "SQL (PostgreSQL)", level: 65 },
    ],
  },
  {
    group: "AI / Agents",
    items: [
      { name: "Ollama / Local LLMs", level: 85 },
      { name: "Multi-Agent Architecture", level: 80 },
      { name: "LangGraph", level: 75 },
      { name: "FastAPI", level: 70 },
      { name: "ChromaDB (Vector DBs)", level: 65 },
    ],
  },
  {
    group: "Cybersecurity",
    items: [
      { name: "Hardware Reverse Engineering", level: 85 },
      { name: "Bootloader Exploitation", level: 80 },
      { name: "Linux Security & Forensics", level: 75 },
      { name: "Network Operations", level: 70 },
      { name: "SOC Concepts", level: 60 },
    ],
  },
  {
    group: "Hardware / ECE",
    items: [
      { name: "Embedded Linux", level: 85 },
      { name: "Android Dynamic Partitions", level: 80 },
      { name: "8086 / MPMC", level: 75 },
      { name: "Digital Circuits", level: 70 },
      { name: "IoT Systems", level: 65 },
    ],
  },
  {
    group: "Tools & Systems",
    items: [
      { name: "Linux Block I/O (dd)", level: 85 },
      { name: "Git / GitHub", level: 80 },
      { name: "Docker", level: 70 },
      { name: "Vite / Tailwind", level: 65 },
    ],
  },
];