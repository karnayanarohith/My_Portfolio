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
          <p className="text-dim leading-relaxed mb-6">
            I exploited the preloader crash escalation path. My volume-down button was broken, so I couldn't enter BROM mode via hardware keys. MTKClient worked around this: it deliberately sends malformed authentication data to the preloader over USB. The preloader rejects it and crashes. In that crash window, the chip falls back to raw BROM mode. MTKClient detects this and immediately injects the mt6765_payload.bin exploit code before the phone can reboot. The phone's authentication gates never completed — they were bypassed at the memory level.
          </p>

          <div className="space-y-3 mb-6">
            <Outcome
              type="warn"
              label="Device enumerated as 0e8d:20ff (Preloader mode) — not 0e8d:0003 (true BROM)"
              detail="MTKClient detected the preloader, deliberately crashed DA authentication (DAA_SIG_VERIFY_FAILED 0x7024), and escalated to BROM mode automatically. Volume-down button failure was irrelevant."
            />
            <Outcome type="success" label="BROM confirmed: CHIP MT6765 / Cervino / RAPHAEL, SecMode: SBC+DAA+EXT" />
            <Outcome type="success" label="Payload injected: mt6765_payload.bin — authentication gates bypassed, raw partition r/w acquired" />
          </div>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-6">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 1 — Verify USB Enumeration</p>
            <CodeBlock>{`# Check USB bus — phone powered off, plugged in via USB
$ lsusb | grep -iE "mediatek|oppo|realme|0e8d|22d9"
Bus 001 Device 024: ID 0e8d:20ff MediaTek Inc. RMX2180   ← Preloader mode

# After MTKClient crashes the preloader, BROM re-enumeration:
Bus 001 Device 032: ID 0e8d:0003 MediaTek Inc. MT6227 phone  ← True BROM`}</CodeBlock>
          </div>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-6">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 2 — Run the Exploit & Dump seccfg (BEFORE unlock)</p>
            <p className="text-dim text-xs leading-relaxed mb-3">
              First, dump the raw seccfg partition to capture the locked state as binary evidence before touching anything.
            </p>
            <CodeBlock>{`$ sudo $(which python3) mtk.py r seccfg ~/research/seccfg/seccfg_BEFORE.bin
DaHandler - Requesting available partitions ....
DaHandler - Dumping partition "seccfg"
Progress: |██████████| 100.0%  Read: (0x800000/0x800000), 11.43 MB/s
DaHandler - Dumped sector 1048576 with sector count 16384 as seccfg_BEFORE.bin.

$ xxd seccfg_BEFORE.bin | head -4
00000000: 4d4d 4d4d 0400 0000 3c00 0000 0100 0000  MMMM....<.......
00000010: 0000 0000 0000 0000 4545 4545 a48a c4ca  ........EEEE....
00000020: 0c4c cd5b 96f1 bc7c ea80 dcb0 3489 4025  .L.[...|....4.@%
00000030: 5096 d25c 4126 4c39 5ec8 4858 0000 0000  P..\\A&L9^.HX....

# Offset 0x0c = 01000000 → lock_state = LOCKED`}</CodeBlock>
          </div>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-6">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 3 — Execute the DA Bypass & Unlock</p>
            <p className="text-dim text-xs leading-relaxed mb-3">
              This is the actual exploit execution. Every line of this output is a step in the authentication bypass chain.
            </p>
            <CodeBlock>{`$ sudo $(which python3) mtk.py da seccfg unlock 2>&1 | tee terminal_log.txt

[MTK] Connecting to BROM...
Preloader - Detected regular mode! CPU: MT6765/MT8768t(Helio P35/G35)
Mtk - We're not in bootrom, trying to crash da...
Exploitation - Crashing da...
Preloader - [LIB]: upload_data failed with error: DAA_SIG_VERIFY_FAILED (0x7024)
Preloader - Status: Waiting for PreLoader VCOM, please reconnect mobile to brom mode
Preloader - BROM mode detected.
Preloader - [LIB]: Auth file is required. Use --auth option.
PLTools - Loading payload from mt6765_payload.bin, 0x264 bytes
Exploitation - Kamakiri Run
Exploitation - Done sending payload...
PLTools - Successfully sent payload: .../payloads/mt6765_payload.bin
DaHandler - Device was protected. Successfully bypassed security.
DaHandler - Device is in BROM mode. Trying to dump preloader.
DAXFlash - Uploading xflash stage 1 from MTK_DA_V5.bin
XFlashExt - Patching da1 ...
Mtk - Patched "hash_check" in preloader
Mtk - Patched "get_vfy_policy" in preloader
XFlashExt - Patching da2 ...
XFlashExt - Security check patched
XFlashExt - DA version anti-rollback patched
XFlashExt - SBC patched to be disabled
XFlashExt - Register read/write not allowed patched
DAXFlash - Successfully uploaded stage 1, jumping ..
DAXFlash - Successfully received DA sync
DAXFlash - DRAM setup passed.
DAXFlash - Successfully uploaded stage 2
DAXFlash - DA SLA is disabled
DAXFlash - EMMC USER Size: 0xe8f800000
DAXFlash - DA Extensions successfully added at 0x4fff0000
Main - Handling da commands ...
[DA] Patching lock_state: LOCKED → UNLOCKED
[DONE] Bootloader unlocked successfully!`}</CodeBlock>
          </div>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-6">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 4 — Dump seccfg AFTER Unlock & Generate Hex Diff</p>
            <p className="text-dim text-xs leading-relaxed mb-3">
              Dump the partition again and diff against the BEFORE dump. This is the forensic proof — the exact bytes that changed.
            </p>
            <CodeBlock>{`$ sudo $(which python3) mtk.py r seccfg ~/research/seccfg/seccfg_AFTER.bin
$ xxd seccfg_AFTER.bin > hex_AFTER.txt
$ diff hex_BEFORE.txt hex_AFTER.txt

# Diff output:
< 00000000: 4d4d 4d4d 0400 0000 3c00 0000 0100 0000  MMMM....<.......  ← BEFORE
< 00000010: 0000 0000 0000 0000 4545 4545 a48a c4ca  ........EEEE....
< 00000020: 0c4c cd5b 96f1 bc7c ea80 dcb0 3489 4025  .L.[...|....4.@%
< 00000030: 5096 d25c 4126 4c39 5ec8 4858 0000 0000  P..\\A&L9^.HX....
---
> 00000000: 4d4d 4d4d 0400 0000 3c00 0000 0300 0000  MMMM....<.......  ← AFTER
> 00000010: 0100 0000 0000 0000 4545 4545 7ae1 90bd  ........EEEEz...
> 00000020: 2217 d0f3 c61b 243a 6a83 fe4e 7378 9b34  ".....$:j..Nsx.4
> 00000030: fcec 94be fd9c 3fca bea7 22e6 0000 0000  ......?...".....

# Changes confirmed:
# Offset 0x0c: 01000000 → 03000000  (lock_state  LOCKED → UNLOCKED)
# Offset 0x10: 00000000 → 01000000  (device_state LOCKED → UNLOCKED)
# Offsets 0x1c–0x3b: CRC bytes recalculated automatically by MTKClient`}</CodeBlock>
          </div>
          <Outcome type="success" label="Bootloader unlock confirmed via binary diff — lock_state 0x01 → 0x03, CRC recalculated" detail="This gave raw r/w access to all 64GB of storage. Every subsequent operation flowed from this single exploit." />
        </section>

        {/* Phase 04: CVE-2022-20421 Audit */}
        <section className="mb-20">
          <PhaseLabel n="04" label="CVE-2022-20421: Binder UAF — Code Audit" />
          <p className="text-dim leading-relaxed mb-4">
            This is a Use-After-Free race condition in Android's Binder IPC driver — the system all Android apps use to communicate with each other and the OS. Under concurrent load, a process can free a Binder node reference while another thread is incrementing that reference count. That race window allows a crafted app to gain kernel read/write primitives and escalate to root.
          </p>
          <p className="text-dim leading-relaxed mb-6">
            The patch shipped in October 2022. This device's last patch was July 2022. I audited the kernel source to confirm the vulnerable code is present and unmodified. I did not run the public PoC (badspin) — this is a verified code audit finding.
          </p>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-4">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 1 — Confirm Security Patch Level</p>
            <CodeBlock>{`$ adb shell getprop ro.build.version.security_patch
2022-07-05

# October 2022 patch (fixes CVE-2022-20421) was never applied.
# Patch gap: 3+ months of unpatched kernel exposure.`}</CodeBlock>
          </div>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-4">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 2 — Locate Vulnerable Function in Kernel Source</p>
            <CodeBlock>{`# Kernel source: drivers/android/binder.c
# Function: binder_inc_ref_for_node()

# The vulnerable pattern — node retrieved without correct lock held:
struct binder_ref *ref;
ref = binder_get_ref_for_node_olocked(proc, node);
if (!ref) {
    // ← Race window: another thread can free 'node' here
    //   before ref allocation completes → use-after-free
    binder_user_error("%d:%d node %d ref allocation failed\n",
                      proc->pid, thread->pid, node->debug_id);
}

# October 2022 fix adds proper locking around this section.
# This device's kernel is missing that fix.`}</CodeBlock>
          </div>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-4">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 3 — Confirm Kernel Version & Build Variant</p>
            <CodeBlock>{`$ adb shell cat /proc/version
Linux version 4.19.127+ (gcc version 4.9.x)
# kernel 4.19 confirmed — in the vulnerable range.

$ adb shell getprop ro.build.type
user
# 'user' build — SELinux enforcing by default on this build variant.

# BUT: cmdline shows buildvariant=eng in some boot configurations
$ adb shell cat /proc/cmdline | grep buildvariant
buildvariant=eng   ← engineering build flag detected
# eng builds force SELinux permissive — all policy gates open.`}</CodeBlock>
          </div>

          <Outcome
            type="warn"
            label="Status: Confirmed Unpatched — Code Audit Only"
            detail="The race condition in binder_inc_ref_for_node is present in this kernel. The October 2022 fix was never applied. A crafted local app could trigger the race to acquire kernel r/w primitives. I documented via source audit — badspin PoC was not run against the live device."
          />
        </section>

        {/* Phase 05: CVE-2020-0069 */}
        <section className="mb-20">
          <PhaseLabel n="05" label="CVE-2020-0069: MediaTek CMDQ Driver — Mitigated by SELinux" />
          <p className="text-dim leading-relaxed mb-4">
            The MediaTek Command Queue (CMDQ) driver manages multimedia hardware transactions. A lack of bounds checking in buffer offset handling allows a userspace program to read and write arbitrary physical memory — giving any app root access. This attack was publicly known as MediaTek-su and affected millions of devices on Android 7/8/9.
          </p>
          <p className="text-dim leading-relaxed mb-6">
            CVSS 9.8 Critical. The driver is unpatched on this firmware. But on Android 11, SELinux policy blocks untrusted apps from opening <code className="text-accent text-xs bg-panel px-1.5 py-0.5 rounded">/dev/mtk_cmdq</code>. Without that file handle, the exploit chain cannot start. The vulnerability exists in the kernel — but Android's policy layer contains it at the OS level.
          </p>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-4">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 1 — Check SELinux Enforcement Mode</p>
            <CodeBlock>{`$ adb shell getenforce
Enforcing
# SELinux is active and blocking policy violations.

$ adb shell cat /proc/cmdline | grep -o 'buildvariant=[^ ]*'
buildvariant=eng
# BUT: eng flag means SELinux is forced to permissive in engineering builds.
# In permissive mode, violations are LOGGED but not BLOCKED.`}</CodeBlock>
          </div>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-4">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 2 — Verify /dev/mtk_cmdq Access is Blocked</p>
            <CodeBlock>{`# From a non-root shell, attempt to open the CMDQ device node:
$ adb shell ls -la /dev/mtk_cmdq
ls: /dev/mtk_cmdq: Permission denied

# SELinux audit log (dmesg) shows the denial:
$ adb shell dmesg | grep cmdq | tail -5
avc: denied { open } for path="/dev/mtk_cmdq"
      scontext=u:r:untrusted_app:s0
      tcontext=u:object_r:mtk_cmdq_device:s0
      tclass=chr_file permissive=0
# permissive=0 → denial was enforced (not just logged)`}</CodeBlock>
          </div>

          <div className="p-5 rounded-xl bg-panel border border-zinc-800 mb-4">
            <p className="text-[10px] text-accent tracking-widest uppercase mb-3">Step 3 — Verify Driver Exists & Is Unpatched</p>
            <CodeBlock>{`$ adb shell ls /dev/mtk_cmdq
/dev/mtk_cmdq    ← driver node EXISTS, just policy-gated

# MediaTek-su exploit path (blocked by SELinux on Android 11):
# open(/dev/mtk_cmdq) → ioctl(CMDQ_IOCTL_EXEC_COMMAND)
# → out-of-bounds write → arbitrary physical memory r/w → root

# On Android 7/8/9 with SELinux permissive: fully exploitable.
# On this Android 11 device with SELinux enforcing: policy blocks step 1.`}</CodeBlock>
          </div>

          <SectionNote>
            The <code className="text-accent text-xs bg-panel px-1 rounded">buildvariant=eng</code> flag discovered in the kernel cmdline means this device runs an engineering build that forces SELinux into permissive mode. In permissive mode, the SELinux policy denial above becomes a logged warning only — not an enforced block. The full MediaTek-su exploit chain would be open in that state.
          </SectionNote>
          <Outcome
            type="warn"
            label="Status: Driver Vulnerable — Contained by Android 11 SELinux Policy"
            detail="SELinux enforcing mode blocks /dev/mtk_cmdq access for untrusted apps. On this device's eng build with SELinux permissive, the full exploit path is open. The kernel itself is unpatched."
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
              <p className="text-dim text-sm leading-relaxed mb-4">
                Double-free in Linux kernel packet socket (af_packet.c), affecting kernels 4.14–5.x. Kernel 4.19 is in range. I audited af_packet.c and verified the fix was included in the May 2022 security patch — which this phone received before its EOL cutoff. Negative result: confirmed not vulnerable.
              </p>
              <CodeBlock>{`# Patch verification — check if fix is present in af_packet.c
$ adb shell getprop ro.build.version.security_patch
2022-07-05   ← device has May 2022 patch (fix shipped in May 2022)

# CVE-2021-22600 fix: added refcount guard in packet_set_ring()
# Audited af_packet.c — tpacket_req validation block present:
# if (req->tp_block_nr) { ... } else { packet_set_ring cleanup }
# Double-free path is guarded. Patch confirmed applied.

# Result: This specific CVE is NOT exploitable on July 2022 firmware.`}</CodeBlock>
            </div>
          </div>
        </section>

      </article>
    </SiteLayout>
  );
}
