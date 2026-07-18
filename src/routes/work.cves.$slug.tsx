import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CVE_RESEARCH } from "@/lib/site-data";
import { Shield, CheckCircle2, XCircle, AlertTriangle, Terminal, ChevronRight, Search, Lock } from "lucide-react";

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
    ],
  }),
  component: CVEDetailPage,
});

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

function StatusBadge({ type }: { type: "exploited" | "audited" | "mitigated" | "not-vulnerable" }) {
  const config = {
    exploited:      { label: "Exploited",      cls: "ring-emerald-400/40 bg-emerald-400/10 text-emerald-400" },
    audited:        { label: "Audited — Unpatched", cls: "ring-amber-400/40 bg-amber-400/10 text-amber-400" },
    mitigated:      { label: "Mitigated by OS", cls: "ring-blue-400/40 bg-blue-400/10 text-blue-400" },
    "not-vulnerable": { label: "Not Vulnerable", cls: "ring-zinc-600/40 bg-zinc-800/40 text-zinc-400" },
  };
  const { label, cls } = config[type];
  return (
    <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full ring-1 font-semibold ${cls}`}>
      {label}
    </span>
  );
}

function Outcome({ type, label, detail }: { type: "success" | "fail" | "warn"; label: string; detail?: string }) {
  const icons = {
    success: <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />,
    fail:    <XCircle className="size-4 text-red-400 shrink-0 mt-0.5" />,
    warn:    <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />,
  };
  const borders = {
    success: "border-emerald-400/20 bg-emerald-400/5",
    fail:    "border-red-400/20 bg-red-400/5",
    warn:    "border-amber-400/20 bg-amber-400/5",
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
            <span className="text-[10px] text-accent tracking-widest uppercase">{entry.date}</span>
            <ChevronRight className="size-3 text-zinc-700" />
            <span className="text-[10px] text-dim tracking-widest uppercase">{entry.duration}</span>
            <ChevronRight className="size-3 text-zinc-700" />
            <span className="text-[10px] px-2 py-0.5 rounded-full ring-1 ring-emerald-400/30 bg-emerald-400/10 text-emerald-400 tracking-widest uppercase">
              {entry.status}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">{entry.title}</h1>
          <p className="text-dim text-lg leading-relaxed max-w-2xl mb-10">{entry.blurb}</p>
          <div className="flex flex-wrap gap-2">
            {entry.cves.map((cve: any) => (
              <span key={cve} className="flex items-center gap-2 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full ring-1 ring-zinc-800 text-dim">
                <Shield className="size-3 text-accent" />
                {cve}
              </span>
            ))}
          </div>
        </header>

        {/* Device fingerprint */}
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

        {/* Phase 01: CVE Landscape */}
        <section className="mb-20">
          <PhaseLabel n="01" label="CVE Research & Attack Surface Mapping" />
          <p className="text-dim leading-relaxed mb-4">
            Before touching any hardware I mapped the attack surface. With a security patch permanently frozen at July 2022,
            every vulnerability published for the MT6765 after that date lives on this phone forever.
            I shortlisted five targets based on exploitability, kernel relevance, and whether I could produce verifiable evidence.
          </p>
          <p className="text-dim text-sm leading-relaxed mb-8">
            The table below shows the honest outcome of each. One was fully executed. Two were audited and confirmed unpatched but not live-exploited.
            One is mitigated by the OS itself despite the driver being vulnerable. One turned out to already be patched.
          </p>

          <div className="space-y-4">
            {[
              {
                cve: "BROM DA Auth Bypass",
                cvss: "Critical",
                statusType: "exploited" as const,
                icon: <Shield className="size-4 text-emerald-400 shrink-0" />,
                detail: "The MediaTek Boot ROM contains a hardware-level authentication check (Download Agent / SLA / DAA) before accepting any write commands. I exploited the preloader crash escalation path using MTKClient's kamakiri payload to inject unsigned code directly into BROM memory, bypassing every authentication gate. This gave me raw read/write access to all 64GB of NAND storage — the foundation for everything else in this project.",
              },
              {
                cve: "CVE-2022-20421",
                cvss: "7.8 High",
                statusType: "audited" as const,
                icon: <Search className="size-4 text-amber-400 shrink-0" />,
                detail: "Binder Use-After-Free in drivers/android/binder.c. I read the kernel source, confirmed the race condition in binder_inc_ref_for_node exists, and verified the device never received the October 2022 patch that fixed it. The public PoC (badspin) would work on this device. I documented the vulnerability but did not run the PoC — this is a code audit finding, not a live exploitation.",
              },
              {
                cve: "CVE-2020-0069",
                cvss: "9.8 Critical",
                statusType: "mitigated" as const,
                icon: <Lock className="size-4 text-blue-400 shrink-0" />,
                detail: "The MediaTek CMDQ driver allows userspace to read/write arbitrary physical memory (MediaTek-su). The driver itself is unpatched and vulnerable. However, Android 11's default SELinux policy blocks untrusted apps from opening /dev/mtk_cmdq entirely. The attack path that worked on Android 7/8/9 is sealed by the OS policy layer, not by a kernel patch. I documented the mitigation chain — that's the research value here.",
              },
              {
                cve: "Post-Jul 2022 MT6765",
                cvss: "Varies",
                statusType: "audited" as const,
                icon: <Search className="size-4 text-amber-400 shrink-0" />,
                detail: "I audited the full MediaTek security bulletin backlog for CVEs published after July 2022 affecting the MT6765 kernel stack. CVE-2024-20106 (Type Confusion in M4U multimedia memory module) is confirmed unpatched on this firmware. I mapped the exposure surface but did not run live exploits against these findings.",
              },
              {
                cve: "CVE-2021-22600",
                cvss: "7.8 High",
                statusType: "not-vulnerable" as const,
                icon: <CheckCircle2 className="size-4 text-zinc-400 shrink-0" />,
                detail: "Double-free in Linux kernel packet_set_ring (af_packet.c), affecting kernel 4.14–5.x. Kernel 4.19 is in range. I audited af_packet.c and found the fix was included in the May 2022 security patch — which this device received before its EOL cutoff in July 2022. This device is not vulnerable to this specific CVE.",
              },
            ].map((c) => (
              <div key={c.cve} className="p-6 rounded-xl bg-panel border border-zinc-800">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div className="flex items-center gap-3">
                    {c.icon}
                    <span className="font-mono text-sm text-foreground">{c.cve}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] text-dim tracking-widest uppercase">CVSS {c.cvss}</span>
                    <StatusBadge type={c.statusType} />
                  </div>
                </div>
                <p className="text-dim text-sm leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>

          {/* Self-corrections */}
          <div className="mt-8 p-6 rounded-xl border border-zinc-800 bg-panel">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-4">Self-Corrections During Research</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <XCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-dim leading-relaxed">
                  <span className="text-foreground font-medium">Wrong CVE cited: </span>
                  I initially labelled the BROM exploit as CVE-2022-26449. After cross-referencing the NVD database, I found that number is an unrelated medium-severity MediaTek bug from September 2022. The actual BROM DA authentication bypass has no single clean CVE number — it's tracked by payload names (kamakiri, amonet) in the research community. I corrected this before publishing.
                </p>
              </div>
              <div className="flex gap-3">
                <XCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-dim leading-relaxed">
                  <span className="text-foreground font-medium">Overstated exploitability: </span>
                  CVE-2020-0069 was initially listed as a planned live exploit. After actually testing it on Android 11, I found the SELinux policy gates the attack path completely. I corrected the status to "Mitigated by OS" rather than hiding the outcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 02: Environment Setup */}
        <section className="mb-20">
          <PhaseLabel n="02" label="Environment Setup" />
          <p className="text-dim leading-relaxed mb-6">
            Before running any exploit I established a reproducible, documented environment. Every tool version, dependency fix, and configuration decision is logged so the full chain is verifiable.
          </p>
          <div className="space-y-3 mb-8">
            <Outcome type="success" label="MTKClient cloned — mt6765_payload.bin confirmed present" detail="ls mtkclient/payloads/ | grep mt6765 → mt6765_payload.bin" />
            <Outcome type="success" label="ADB installed — device authorized in debug mode" detail="adb devices → ZDW4CQ5HJBS4VOZP device" />
            <Outcome type="fail" label="Attempt 1: sudo python3 mtk.py — ModuleNotFoundError: Cryptodome" detail="Root cause: sudo switches to system Python, not the conda environment where pycryptodome was installed. Fix: sudo $(which python3) forces conda Python through sudo." />
            <Outcome type="success" label="Fix applied: sudo $(which python3) mtk.py — MTKClient runs correctly" />
            <Outcome type="success" label="udev rules installed: 50-android.rules, 51-edl.rules, 52-mtk.rules from Setup/Linux/" />
          </div>
          <SectionNote>
            Firmware sourcing: I rejected the azROM.net mirror (unverified third party) and the Russian regional variant{" "}
            <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded mx-1">RMX2180export_11_C.13_2022070513400000</code>.
            I traced and downloaded directly from the official Realme CDN{" "}
            <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded mx-1">rms01.realme.net</code>{" "}
            using the correct India region variant{" "}
            <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded mx-1">RMX2180export_11_C.13_2022070513370000</code>.
          </SectionNote>
        </section>

        {/* Phase 03: BROM Exploit — THE actual exploitation */}
        <section className="mb-20">
          <PhaseLabel n="03" label="BROM Exploit & Bootloader Unlock — Executed" />
          <p className="text-dim leading-relaxed mb-4">
            This is the only vulnerability class I fully exploited. The MediaTek Boot ROM (BROM) is a tiny piece of factory code baked permanently into the MT6765 silicon — it runs before any Android software, before any bootloader. Normally it demands a cryptographically signed Download Agent before accepting any storage commands (SLA + DAA authentication).
          </p>
          <p className="text-dim leading-relaxed mb-8">
            I exploited the preloader crash escalation path. My volume-down button was broken, so I couldn't enter BROM mode via hardware keys. MTKClient worked around this: it deliberately sends malformed authentication data to the preloader over USB. The preloader rejects it and crashes. In that crash window, the chip falls back to raw BROM mode. MTKClient detects this and immediately injects the mt6765_payload.bin exploit code before the phone can reboot. The phone's authentication gates never completed — they were bypassed at the memory level.
          </p>

          <div className="space-y-3 mb-8">
            <Outcome
              type="warn"
              label="Device enumerated as 0e8d:20ff (Preloader mode) — not 0e8d:0003 (true BROM)"
              detail="This is expected. MTKClient detected the preloader, crashed DA authentication (DAA_SIG_VERIFY_FAILED 0x7024), and escalated to BROM mode automatically. The volume-down button failure was irrelevant once this path was established."
            />
            <Outcome type="success" label="BROM confirmed: CHIP MT6765 / Cervino / RAPHAEL, SecMode: SBC+DAA+EXT" />
            <Outcome type="success" label="Payload injected: mt6765_payload.bin — authentication gates bypassed, raw partition r/w acquired" />
          </div>

          <div className="p-6 rounded-xl bg-panel border border-zinc-800 mb-6">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-4">seccfg Partition Hex Diff — Binary Evidence of Lock State Change</p>
            <p className="text-dim text-xs leading-relaxed mb-4">
              The <code className="text-accent bg-zinc-900 px-1 rounded">seccfg</code> partition is where MediaTek stores the bootloader lock state as a binary flag. I dumped it before and after running the unlock command and diffed the hex output. This is the primary forensic proof that the exploit worked.
            </p>
            <CodeBlock>{`# BEFORE unlock (offset 0x0c = 0x01 = LOCKED)
00000000: 4d4d 4d4d 0400 0000 3c00 0000 0100 0000  MMMM....<.......
00000010: 0000 0000 0000 0000 4545 4545 a48a c4ca  ........EEEE....

# AFTER unlock (offset 0x0c = 0x03 = UNLOCKED)
00000000: 4d4d 4d4d 0400 0000 3c00 0000 0300 0000  MMMM....<.......
00000010: 0100 0000 0000 0000 4545 4545 7ae1 90bd  ........EEEEz...

# What changed:
Offset 0x0c:  01000000 → 03000000  (lock_state:   LOCKED → UNLOCKED)
Offset 0x10:  00000000 → 01000000  (device_state: LOCKED → UNLOCKED)
Offset 0x1c+: CRC checksum recalculated by MTKClient to match new state`}</CodeBlock>
          </div>
          <Outcome type="success" label="Bootloader unlock confirmed — hex diff shows lock_state flipped 0x01 → 0x03, CRC recalculated" detail="This unlocked all partition write access. Every subsequent operation (AVB bypass, system injection, bootloader downgrade, root, NetHunter) was made possible by this single exploit." />
        </section>

        {/* Phase 04: CVE-2022-20421 Audit */}
        <section className="mb-20">
          <PhaseLabel n="04" label="CVE-2022-20421: Binder UAF — Code Audit" />
          <p className="text-dim leading-relaxed mb-4">
            This is a Use-After-Free race condition in Android's Binder IPC driver — the system that all Android apps use to communicate with each other and with the OS. Under heavy concurrent load, a process can free a Binder node reference while another thread is in the middle of incrementing that reference count. That race window allows a crafted app to gain kernel read/write primitives, which means full root access.
          </p>
          <p className="text-dim leading-relaxed mb-6">
            The patch shipped in the October 2022 security bulletin. This phone's last patch was July 2022. I audited the kernel source to confirm the vulnerable code is present and unmodified. I did not run the public PoC (badspin) — this is a verified code audit finding.
          </p>
          <CodeBlock>{`// Vulnerable pattern in drivers/android/binder.c — binder_inc_ref_for_node
// A reference to a binder node is retrieved without holding the correct lock.
// Another thread can free the node between the lookup and the increment,
// creating a use-after-free condition.

ref = binder_get_ref_for_node_olocked(proc, node);
if (!ref) {
    // ← Race window: node may be freed here before ref allocation completes
    binder_user_error("%d:%d node %d ref allocation failed\\n",
                      proc->pid, thread->pid, node->debug_id);
}`}</CodeBlock>
          <Outcome
            type="warn"
            label="Status: Confirmed Unpatched — Code Audit Only"
            detail="The race condition in binder_inc_ref_for_node is present in this kernel. The October 2022 fix was never applied. A crafted app could trigger this to escalate privileges to root. I documented the vulnerability via source analysis — I did not run the badspin PoC against the live device."
          />
        </section>

        {/* Phase 05: CVE-2020-0069 */}
        <section className="mb-20">
          <PhaseLabel n="05" label="CVE-2020-0069: MediaTek CMDQ Driver — Mitigated by SELinux" />
          <p className="text-dim leading-relaxed mb-4">
            The MediaTek Command Queue (CMDQ) driver manages multimedia hardware transactions. A lack of bounds checking in buffer offset handling allows a userspace program to read and write arbitrary physical memory addresses — which means any app could give itself root access (the technique was publicly known as MediaTek-su).
          </p>
          <p className="text-dim leading-relaxed mb-6">
            This is a CVSS 9.8 Critical vulnerability and the driver code is unpatched on this firmware. However, on Android 11, the default SELinux policy adds a gate in front of the driver: it blocks untrusted apps from even opening <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded">/dev/mtk_cmdq</code>. Without that file handle, the exploit chain cannot start. The vulnerability exists in the kernel — but Android's security policy layer contains it.
          </p>
          <SectionNote>
            This is an important distinction: the driver is vulnerable. The kernel was never patched. But the OS-level policy prevents exploitation by normal apps. If SELinux were set to permissive mode (which it was during my testing due to the buildvariant=eng flag I discovered), the full exploit path would be open.
          </SectionNote>
          <Outcome
            type="warn"
            label="Status: Driver Vulnerable — Mitigated by Android 11 SELinux Policy"
            detail="SELinux enforcing mode blocks /dev/mtk_cmdq access for untrusted apps. The kernel code is unpatched. On engineering/debug builds with SELinux in permissive mode, the full MediaTek-su exploit chain is active."
          />
        </section>

        {/* Phase 06: Post-July 2022 landscape */}
        <section className="mb-20">
          <PhaseLabel n="06" label="Post-July 2022 MT6765 Vulnerability Landscape" />
          <p className="text-dim leading-relaxed mb-6">
            Because this device is permanently frozen at the July 2022 patch level, I audited the complete MediaTek security bulletin backlog for every CVE published after that date affecting the MT6765 kernel stack. Two findings stand out:
          </p>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-panel border border-zinc-800">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                <span className="font-mono text-sm text-foreground">CVE-2024-20106</span>
                <StatusBadge type="audited" />
              </div>
              <p className="text-dim text-sm leading-relaxed">
                Type confusion in the M4U (multimedia memory unit) kernel module. An attacker can confuse the kernel about the type of a memory pointer, bypassing memory access boundaries and achieving kernel memory corruption with privilege escalation potential. Unpatched on this firmware — the fix arrived well after the July 2022 EOL cutoff.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-panel border border-zinc-800">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                <span className="font-mono text-sm text-foreground">CVE-2021-22600</span>
                <StatusBadge type="not-vulnerable" />
              </div>
              <p className="text-dim text-sm leading-relaxed">
                Double-free in Linux kernel packet socket (af_packet.c), affecting kernels 4.14–5.x. Kernel 4.19 is in range. I audited af_packet.c and verified the fix was included in the May 2022 security patch — which this phone received before its EOL cutoff. This device is not vulnerable to this specific CVE. This was an important negative result: I initially listed it as a target, checked the source, and removed it.
              </p>
            </div>
          </div>
        </section>

      </article>
    </SiteLayout>
  );
}
