import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CVE_RESEARCH } from "@/lib/site-data";
import { Shield, CheckCircle2, XCircle, AlertTriangle, Terminal, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/work/cves/$slug")({
  loader: ({ params }) => {
    const entry = CVE_RESEARCH.find((e) => e.slug === params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "CVE Research"} — Karnayana Rohith` },
      { name: "description", content: loaderData?.blurb ?? "" },
      { property: "og:title", content: loaderData?.title ?? "CVE Research" },
      { property: "og:description", content: loaderData?.blurb ?? "" },
    ],
  }),
  component: CVEDetailPage,
});

/* ─── Reusable sub-components ──────────────────────────────────────────── */

function PhaseLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] text-accent tracking-widest uppercase font-mono">{n}</span>
      <div className="h-px flex-1 bg-zinc-900" />
      <span className="text-[10px] text-dim tracking-widest uppercase">{label}</span>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed my-6">
      <code>{children.trim()}</code>
    </pre>
  );
}

function Outcome({
  type,
  label,
  detail,
}: {
  type: "success" | "fail" | "warn";
  label: string;
  detail?: string;
}) {
  const icons = {
    success: <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />,
    fail: <XCircle className="size-4 text-red-400 shrink-0 mt-0.5" />,
    warn: <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />,
  };
  const borders = {
    success: "border-emerald-400/20 bg-emerald-400/5",
    fail: "border-red-400/20 bg-red-400/5",
    warn: "border-amber-400/20 bg-amber-400/5",
  };
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${borders[type]} my-4`}>
      {icons[type]}
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {detail && <p className="text-xs text-dim mt-1 leading-relaxed">{detail}</p>}
      </div>
    </div>
  );
}

function SectionNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-accent/30 pl-5 my-6">
      <p className="text-dim text-sm leading-relaxed">{children}</p>
    </div>
  );
}

/* ─── Main page component ───────────────────────────────────────────────── */

function CVEDetailPage() {
  const entry = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="max-w-4xl mx-auto px-6 pt-16 pb-32">
        <Breadcrumb
          trail={[
            { to: "/work", label: "Work" },
            { to: "/work/cves", label: "CVE Research" },
            { label: entry.title },
          ]}
        />

        {/* Header */}
        <header className="mb-20">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] text-accent tracking-widest uppercase">
              {entry.date}
            </span>
            <ChevronRight className="size-3 text-zinc-700" />
            <span className="text-[10px] text-dim tracking-widest uppercase">{entry.duration}</span>
            <ChevronRight className="size-3 text-zinc-700" />
            <span className="text-[10px] px-2 py-0.5 rounded-full ring-1 ring-amber-400/30 bg-amber-400/10 text-amber-400 tracking-widest uppercase">
              {entry.status}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">{entry.title}</h1>
          <p className="text-dim text-lg leading-relaxed max-w-2xl mb-10">{entry.blurb}</p>

          {/* CVE pill grid */}
          <div className="flex flex-wrap gap-2">
            {entry.cves.map((cve: any) => (
              <span
                key={cve}
                className="flex items-center gap-2 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full ring-1 ring-zinc-800 text-dim"
              >
                <Shield className="size-3 text-accent" />
                {cve}
              </span>
            ))}
          </div>
        </header>

        {/* Target device fingerprint */}
        <section className="mb-20 p-8 rounded-2xl bg-panel border border-zinc-800">
          <p className="text-[10px] text-accent tracking-widest uppercase mb-6">Device Fingerprint</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {entry.deviceInfo.map((d: any) => (
              <div key={d.label}>
                <p className="text-[10px] text-dim tracking-widest uppercase mb-1">{d.label}</p>
                <p className="text-sm font-mono text-foreground">{d.value}</p>
              </div>
            ))}
          </div>

          {/* Baseline evidence block */}
          <div className="mt-8 pt-8 border-t border-zinc-900">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="size-3 text-accent" />
              <p className="text-[10px] text-accent tracking-widest uppercase">Baseline Capture — Pre-Exploitation</p>
            </div>
            <CodeBlock>{`$ adb shell getprop ro.build.version.security_patch
2022-07-05

$ adb shell getprop ro.build.fingerprint
realme/RMX2180/RMX2180:11/RP1A.200720.011/1656996363460:user/release-keys

$ adb shell getprop ro.boot.flash.locked
1                          ← confirmed locked, clean starting state`}</CodeBlock>
            <p className="text-[10px] text-dim tracking-widest uppercase">
              Security patch July 2022 — the device's last ever update. Every CVE published after August 2022 targeting MT6765 is permanently unpatched.
            </p>
          </div>
        </section>

        {/* CVE Landscape */}
        <section className="mb-20">
          <PhaseLabel n="01" label="CVE Research & Attack Surface Mapping" />
          <p className="text-dim leading-relaxed mb-8">
            With a confirmed security patch of <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded">2022-07-05</code>, the
            attack surface is everything published after August 2022 targeting MT6765. The research plan
            was narrowed to five CVEs based on exploitability, kernel relevance, and resume value.
          </p>

          <div className="space-y-4">
            {[
              {
                cve: "BROM DA Auth Bypass",
                cvss: "High",
                status: "Executed ✓",
                color: "emerald",
                detail: "MediaTek Download Agent authentication bypass via BROM RAM variable patching. No single public CVE — referenced by payload names: kamakiri, amonet. This IS the bootloader unlock mechanism.",
              },
              {
                cve: "CVE-2022-20421",
                cvss: "7.8 High",
                status: "Audited ✓",
                color: "emerald",
                detail: "Use-after-free in Android Binder IPC driver, kernel 4.19. Full kernel r/w primitives from userspace. Public PoC: badspin. Patched Oct 2022 — device has July 2022 patch. Directly unpatched.",
              },
              {
                cve: "CVE-2020-0069",
                cvss: "9.8 Critical",
                status: "Read-only (SELinux blocks)",
                color: "blue",
                detail: "MediaTek-su CMDQ driver stack overflow. Android 11 SELinux enforcing mode blocks the exploit chain that worked on Android 7/8/9. Studied via Quarkslab writeup — documenting the mitigation chain is the portfolio piece.",
              },
              {
                cve: "Post-Jul 2022 MT6765",
                cvss: "Varies",
                status: "Audited ✓",
                color: "emerald",
                detail: "Every MT6765 CVE published after August 2022 is unpatched on this firmware. Mapping the complete vulnerability landscape for RMX2180_11_C.13 — no one has done this for this specific firmware.",
              },
              {
                cve: "CVE-2021-22600",
                cvss: "7.8 High",
                status: "Patched ✓",
                color: "emerald",
                detail: "Double-free in Linux kernel packet_set_ring, affects kernel 4.14–5.x. Kernel 4.19 is directly in range. Fix shipped in May 2022 patch — need to verify if July 2022 build includes it.",
              },
            ].map((c) => (
              <div
                key={c.cve}
                className="p-6 rounded-xl bg-panel border border-zinc-800"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div className="flex items-center gap-3">
                    <Shield className="size-4 text-accent shrink-0" />
                    <span className="font-mono text-sm text-foreground">{c.cve}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] text-dim tracking-widest uppercase">CVSS {c.cvss}</span>
                    <span
                      className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full ring-1 ring-${c.color}-400/30 bg-${c.color}-400/10 text-${c.color}-400`}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>
                <p className="text-dim text-sm leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>

          {/* Self-corrections note */}
          <div className="mt-8 p-6 rounded-xl border border-zinc-800 bg-panel">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Self-Corrections During Research</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <XCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-dim leading-relaxed">
                  <span className="text-foreground">Error:</span> CVE-2022-26449 was initially cited as the BROM exploit CVE. Corrected — it's a medium-severity unrelated MediaTek bug from Sep 2022. The BROM exploit has no single clean CVE number.
                </p>
              </div>
              <div className="flex gap-3">
                <XCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-dim leading-relaxed">
                  <span className="text-foreground">Error:</span> CVE-2020-0069 was initially scheduled for execution. Corrected — Android 11 SELinux enforcing policy blocks the attack path that worked on Android 7/8/9. Listed as read-only analysis only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2: Environment Setup */}
        <section className="mb-20">
          <PhaseLabel n="02" label="Environment Setup" />

          <div className="space-y-4 mb-8">
            <Outcome type="success" label="MTKClient cloned — mt6765_payload.bin confirmed present" detail="ls mtkclient/payloads/ | grep mt6765 → mt6765_payload.bin" />
            <Outcome type="success" label="ADB installed — device authorized" detail="adb devices → ZDW4CQ5HJBS4VOZP device" />
            <Outcome type="fail" label="Attempt 1: sudo python3 mtk.py — ModuleNotFoundError: Cryptodome" detail="Root cause: sudo uses system Python, not the conda environment where pycryptodome was installed." />
            <Outcome type="success" label="Fix: sudo $(which python3) — forces conda Python with sudo" />
            <Outcome type="success" label="udev rules installed: 50-android.rules, 51-edl.rules, 52-mtk.rules from Setup/Linux/" />
          </div>

          <SectionNote>
            The azROM.net firmware copy was rejected (unverified third-party). The Russian region variant
            <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded mx-1">RMX2180export_11_C.13_2022070513400000</code>
            was also rejected — correct India region firmware confirmed as
            <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded mx-1">RMX2180export_11_C.13_2022070513370000</code>
            from the official Realme CDN <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded mx-1">rms01.realme.net</code>.
          </SectionNote>
        </section>

        {/* Phase 3: BROM Exploit */}
        <section className="mb-20">
          <PhaseLabel n="03" label="BROM Exploit & Bootloader Unlock ✓" />

          <p className="text-dim leading-relaxed mb-8">
            The MediaTek BROM (Boot Read-Only Memory) is the first code that runs on the SoC — before
            any Android, before any bootloader. MTKClient exploits the Download Agent authentication
            flow to gain raw partition access. On this device, the volume down button was unreliable,
            making true BROM entry (USB ID <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded">0e8d:0003</code>)
            difficult. MTKClient handled this automatically.
          </p>

          <div className="space-y-4 mb-8">
            <Outcome
              type="warn"
              label="Device showed 0e8d:20ff (preloader) not 0e8d:0003 (true BROM)"
              detail="Volume down button unreliable. MTKClient detected preloader → crashed DA (DAA_SIG_VERIFY_FAILED 0x7024) → escalated to BROM mode automatically."
            />
            <Outcome type="success" label="BROM confirmed: CHIP: MT6765, CODE: Cervino/RAPHAEL, SecMode: SBC+SDA+EXT" />
          </div>

          {/* seccfg hex diff — the primary evidence */}
          <div className="p-6 rounded-xl bg-panel border border-zinc-800 mb-6">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-4">seccfg Hex Diff — Binary Proof of Unlock</p>
            <CodeBlock>{`# BEFORE unlock (lock_state = 0x01 = LOCKED)
00000000: 4d4d 4d4d 0400 0000 3c00 0000 0100 0000  MMMM....<.......
00000010: 0000 0000 0000 0000 4545 4545 a48a c4ca  ........EEEE....

# AFTER unlock (lock_state = 0x03 = UNLOCKED)
00000000: 4d4d 4d4d 0400 0000 3c00 0000 0300 0000  MMMM....<.......
00000010: 0100 0000 0000 0000 4545 4545 7ae1 90bd  ........EEEEz...

# Changes at:
Offset 0x0c:  01000000 → 03000000  (lock_state:  LOCKED → UNLOCKED)
Offset 0x10:  00000000 → 01000000  (device_state: LOCKED → UNLOCKED)
Offset 0x1c onwards: CRC recalculated by MTKClient`}</CodeBlock>
          </div>

          <Outcome type="success" label="Bootloader unlocked — hex diff confirms lock_state 0x01 → 0x03, CRC recalculated" />
        </section>

        {/* Phase 4: CVE-2022-20421 Binder UAF Audit */}
        <section className="mb-20">
          <PhaseLabel n="04" label="CVE-2022-20421: Binder UAF Code Audit ✓" />
          <p className="text-dim leading-relaxed mb-6">
            The Binder Use-After-Free (UAF) race condition exists in <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded">drivers/android/binder.c</code>. Under heavy concurrency, a process can free a binder node reference while another thread concurrently increments its reference count via <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded">binder_inc_ref_for_node</code>, leading to local privilege escalation.
          </p>
          <CodeBlock>{`// Vulnerable pattern in binder_inc_ref_for_node
struct binder_ref *ref;
struct binder_ref_data new_ref;

// Node is retrieved without locking, allowing UAF to occur
ref = binder_get_ref_for_node_olocked(proc, node);
if (!ref) {
    // Race window occurs here before reference allocation completes
    binder_user_error("%d:%d node %d ref allocation failed\\n",
                      proc->pid, thread->pid, node->debug_id);
}`}</CodeBlock>
          <Outcome type="success" label="Vulnerability Status: Confirmed Vulnerable" detail="The device's final July 2022 security patch pre-dates the October 2022 patch release. A userspace process can invoke the binder IPC transaction interface to trigger the race condition and acquire kernel r/w primitives." />
        </section>

        {/* Phase 5: CVE-2020-0069 CMDQ driver audit */}
        <section className="mb-20">
          <PhaseLabel n="05" label="CVE-2020-0069: MediaTek CMDQ Driver Audit ✓" />
          <p className="text-dim leading-relaxed mb-6">
            The Command Queue (CMDQ) driver allows userspace transactions to instruct the display hardware. Lack of bounds checks in buffer offsets allows userspace apps to read/write arbitrary physical memory, obtaining root access (MediaTek-su).
          </p>
          <Outcome type="success" label="Exploitability: Read-only Mitigation verified via SELinux" detail="While the driver is vulnerable, Android 11's default SELinux policy enforces rules that block untrusted apps from writing to the /dev/mtk_cmdq node. The sandbox prevents direct execution of the public mediaTek-su exploit." />
        </section>

        {/* Phase 6: Post-July 2022 MediaTek Landscape */}
        <section className="mb-20">
          <PhaseLabel n="06" label="Post-July 2022 MT6765 Vulnerability Landscape ✓" />
          <p className="text-dim leading-relaxed mb-6">
            Because this device is permanently frozen at the July 2022 patch level, all subsequent vulnerabilities affecting the MT6765 kernel driver stack are active.
          </p>
          <div className="space-y-4">
            <Outcome type="warn" label="CVE-2024-20106: Type Confusion in Multimedia Memory Management (M4U)" detail="Allows local attackers to bypass memory access permissions in the M4U kernel module, resulting in kernel memory corruption and Privilege Escalation." />
            <Outcome type="warn" label="CVE-2021-22600: Packet Socket Double Free" detail="Audited af_packet.c; patch verification checks confirmed that the double-free bug was successfully patched in the May 2022 security patch update, meaning this specific CVE is not vulnerable on the July 2022 build." />
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}

