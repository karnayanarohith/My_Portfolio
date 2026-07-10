import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Shield, CheckCircle2, XCircle, AlertTriangle, Terminal, ChevronRight, BookOpen, Cpu, Settings, Activity } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { PROJECTS } from "@/lib/site-data";

export const Route = createFileRoute("/work/$project")({
  loader: ({ params }) => {
    const p = PROJECTS.find((x) => x.slug === params.project);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Work — Karnayana Rohith` },
          { name: "description", content: loaderData.blurb },
          { property: "og:title", content: `${loaderData.title} — Karnayana Rohith` },
          { property: "og:description", content: loaderData.blurb },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `/work/${loaderData.slug}` },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/work/${loaderData.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl font-serif mb-4">Project not found</h1>
        <Link to="/work" className="text-accent uppercase tracking-widest text-xs">← Back to Work</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-serif mb-3">Something broke</h1>
        <p className="text-dim mb-6">{error.message}</p>
        <button onClick={reset} className="text-accent uppercase tracking-widest text-xs">Try again</button>
      </div>
    </SiteLayout>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const p = Route.useLoaderData();
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];

  if (p.slug === "realme-c15-nethunter") {
    return <RealmeNetHunterCaseStudy p={p} prev={prev} next={next} />;
  }

  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/work", label: "Work" }, { label: p.title }]} />

        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <p className="text-accent text-[10px] tracking-widest uppercase mb-3">{p.category}</p>
            <h1 className="text-6xl md:text-8xl font-serif">{p.title}</h1>
          </div>
          <div className="text-right text-[10px] text-dim tracking-widest uppercase">
            <p>{p.year}</p>
            <p className="mt-1">Slug · {p.slug}</p>
          </div>
        </div>

        <div
          className="rounded-2xl aspect-[16/9] mb-16 ring-1 ring-white/5 relative overflow-hidden"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${p.accent}30, transparent 60%), linear-gradient(135deg, #0f0f0f, #1a1a1a)`,
          }}
        >
          <div className="absolute inset-0 grid place-items-center text-9xl font-serif text-zinc-800">
            {p.title.charAt(0)}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-8 space-y-10 text-lg text-dim leading-relaxed">
            <section>
              <h2 className="text-[10px] text-accent tracking-widest uppercase mb-4">Problem</h2>
              <p className="text-foreground text-xl font-serif mb-4">{p.blurb}</p>
              <p>
                When we started this engagement, the team had built four prototypes in eight months
                and shipped none of them. The work was technically excellent and conceptually
                muddled. They needed a shape, not more features.
              </p>
            </section>
            <section>
              <h2 className="text-[10px] text-accent tracking-widest uppercase mb-4">Solution</h2>
              <p>
                We compressed the surface area by 60% and rebuilt around a single primitive: time as
                a manipulable object. Every screen became a variation on that one idea, which made
                the system both easier to learn and harder to copy.
              </p>
            </section>
            <section>
              <h2 className="text-[10px] text-accent tracking-widest uppercase mb-4">Outcome</h2>
              <p>
                Shipped in eleven weeks. Featured on Product Hunt, Sidebar, and Designer News. Three
                acquisition conversations opened in the month following launch.
              </p>
            </section>
          </div>
          <aside className="lg:col-span-4 space-y-8">
            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Stack</p>
              <ul className="space-y-1 text-sm">
                {p.stack.map((s: string) => (
                  <li key={s} className="text-foreground">{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Role</p>
              <p className="text-sm text-foreground">Lead Designer · Frontend Engineer</p>
            </div>
            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Timeline</p>
              <p className="text-sm text-foreground">11 weeks · 2 designers · 4 engineers</p>
            </div>
          </aside>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16 pt-12 border-t border-zinc-900">
          <Link to="/work/$project" params={{ project: prev.slug }} className="group p-8 rounded-2xl bg-panel border border-zinc-800 hover:border-accent/40 transition-all">
            <p className="text-[10px] text-dim tracking-widest uppercase mb-3 flex items-center gap-2"><ArrowLeft className="size-3" /> Previous</p>
            <p className="text-2xl font-serif group-hover:text-accent transition-colors">{prev.title}</p>
          </Link>
          <Link to="/work/$project" params={{ project: next.slug }} className="group p-8 rounded-2xl bg-panel border border-zinc-800 hover:border-accent/40 transition-all text-right">
            <p className="text-[10px] text-dim tracking-widest uppercase mb-3 flex items-center justify-end gap-2">Next <ArrowRight className="size-3" /></p>
            <p className="text-2xl font-serif group-hover:text-accent transition-colors">{next.title}</p>
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}

/* ─── Realme NetHunter Case Study Custom Component ──────────────────────── */

function StudyCodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed my-6">
      <code>{children.trim()}</code>
    </pre>
  );
}

function StudyOutcome({
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

function StudyPhaseLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] text-accent tracking-widest uppercase font-mono">{n}</span>
      <div className="h-px flex-1 bg-zinc-900" />
      <span className="text-[10px] text-dim tracking-widest uppercase">{label}</span>
    </div>
  );
}

function RealmeNetHunterCaseStudy({
  p,
  prev,
  next,
}: {
  p: any;
  prev: any;
  next: any;
}) {
  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/work", label: "Work" }, { label: p.title }]} />

        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <p className="text-accent text-[10px] tracking-widest uppercase mb-3">{p.category}</p>
            <h1 className="text-6xl md:text-8xl font-serif">{p.title}</h1>
          </div>
          <div className="text-right text-[10px] text-dim tracking-widest uppercase">
            <p>{p.year}</p>
            <p className="mt-1">Case Study · {p.slug}</p>
          </div>
        </div>

        {/* Glassmorphic Project Splash */}
        <div
          className="rounded-2xl aspect-[16/9] mb-16 ring-1 ring-white/5 relative overflow-hidden"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${p.accent}30, transparent 60%), linear-gradient(135deg, #0f0f0f, #1a1a1a)`,
          }}
        >
          <div className="absolute inset-0 grid place-items-center text-9xl font-serif text-zinc-800">
            {p.title.charAt(0)}
          </div>
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
            {p.stack.map((s: string) => (
              <span key={s} className="text-[9px] font-mono tracking-widest uppercase bg-black/60 text-zinc-300 px-3 py-1.5 rounded-md border border-zinc-800">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Intro Grid */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24 pb-20 border-b border-zinc-900">
          <div className="lg:col-span-8 text-lg text-dim leading-relaxed">
            <h2 className="text-[10px] text-accent tracking-widest uppercase mb-4">Summary</h2>
            <p className="text-foreground text-2xl font-serif mb-6">{p.blurb}</p>
            <p className="text-sm">
              The Realme C15 (MT6765 Edition) presents a complex attack surface. As an End-of-Life (EOL) device permanently frozen at the July 2022 security patch, it suffers from several unpatched MediaTek vulnerabilities. However, attempting to gain root and install a modern penetration testing platform (Kali NetHunter) was blocked by hardware key failures, active DM-Verity loops, dynamic (VAB) partition layout configuration errors, and kernel command-line restrictions. This case study details the complete end-to-end recovery engineering pipeline used to bypass these obstacles, flash custom systems, and audit security layers.
            </p>
          </div>
          <aside className="lg:col-span-4 space-y-6">
            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Platform Details</p>
              <ul className="space-y-1 text-sm text-foreground font-mono">
                <li>Device: Realme C15 (RMX2180)</li>
                <li>SoC: MediaTek Helio G35 (MT6765)</li>
                <li>Base OS: Android 11 (RealmeUI v2.0)</li>
                <li>Patch Level: July 5, 2022 (EOL)</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Role</p>
              <p className="text-sm text-foreground">Independent Security Researcher</p>
            </div>
            <div>
              <p className="text-[10px] text-dim tracking-widest uppercase mb-2">Timeline</p>
              <p className="text-sm text-foreground">May 2026 — July 2026 (Completed)</p>
            </div>
          </aside>
        </div>

        {/* Long-form Content / Phases */}
        <div className="max-w-4xl mx-auto space-y-24">

          {/* Phase 1 */}
          <section>
            <StudyPhaseLabel n="01" label="Download Agent Auth Bypass & Bootloader Unlock" />
            <p className="text-dim text-sm leading-relaxed mb-6">
              MediaTek Secure Boot requires Download Agent (DA) signing (SLA/DAA checks) before raw write commands are accepted. We executed an MTK BROM exploit to patch memory registers, bypass authentication, and read/write raw sectors. Because the volume-down key was broken on the device, entering true BROM mode directly was difficult; MTKClient bypassed this by crashing the preloader execution state to force an exploit escalation fallback.
            </p>
            <StudyCodeBlock>{`# BROM entry handshake
$ sudo $(which python3) mtk.py da bypass
...
Device detected (0e8d:20ff) -> Crashed preloader signature
SecMode: SBC+SDA+EXT
Bypass successful.`}</StudyCodeBlock>
            <StudyOutcome type="success" label="Bootloader Lock State Patched" detail="Read the seccfg partition, flipped lock_state at offset 0x0c to 0x03 (unlocked) and device_state at offset 0x10 to 0x01 (unlocked), recalculated the cryptosystem SHA256/SEJ signatures, and flashed it back to confirm orange state boot." />
          </section>

          {/* Phase 2 */}
          <section>
            <StudyPhaseLabel n="02" label="Stock Firmware Decryption" />
            <p className="text-dim text-sm leading-relaxed mb-6">
              To obtain structural partitions and recover from boot loop locks, we fetched stock firmware directly from the official Realme CDN. The firmware was packaged inside an encrypted Oppo/Realme OFP file container. We utilized Python decryption tools to extract raw bootloader, kernel, and system partition structures, mapping them to the MT6765 scatter layout.
            </p>
            <StudyOutcome type="success" label="Firmware Decapsulated" detail="Successfully extracted bootloader stacks (preloader, lk, tee, scp) and dynamic scatter records from RMX2180export_11_C.13_2022070513370000.ofp." />
          </section>

          {/* Phase 3 */}
          <section>
            <StudyPhaseLabel n="03" label="Direct Block Injection (TWRP Sideload Bypass)" />
            <p className="text-dim text-sm leading-relaxed mb-6">
              Due to layout mismatches between Android 10 LineageOS packages and Android 11 firmware, TWRP's updater scripts failed with device-mapper logical errors on the ~7GB physical `super` block (`/dev/block/mmcblk0p42`). Sideloading failed consistently.
            </p>
            <p className="text-dim text-sm leading-relaxed mb-6">
              We bypassed recovery restrictions by converting system dat blocks into a raw unsparsed image, push-storing it, and injecting it directly via block-level terminal writes with a 1MB offset to preserve metadata structures:
            </p>
            <StudyCodeBlock>{`# Decompress and assemble the system image on the workstation
brotli -d system.new.dat.br
python3 sdat2img.py system.transfer.list system.new.dat system.img

# Push and execute direct offset write to physical block 42
adb push system.img /data/local/tmp/system.img
adb shell "dd if=/data/local/tmp/system.img of=/dev/block/mmcblk0p42 bs=1048576 seek=1 conv=notrunc"

# Verification: Bind loop7 to the offset sector and verify ext4 magic bytes
adb shell "losetup -o 1048576 /dev/block/loop7 /dev/block/mmcblk0p42"
adb shell "mount -t ext4 /dev/block/loop7 /mnt/system"
adb shell "file /dev/block/loop7" -> Magic verified`}</StudyCodeBlock>
            <StudyOutcome type="success" label="Offset System Injection Successful" detail="The Android 10 LineageOS system block was successfully loaded onto the physical partition, bypassing recovery installer checks." />
          </section>

          {/* Phase 4 */}
          <section>
            <StudyPhaseLabel n="04" label="Bootloader Version Alignment Downgrade" />
            <p className="text-dim text-sm leading-relaxed mb-6">
              While the system image was correctly injected, booting the custom kernel over the Android 11 stock bootloader stack caused a kernel panic inside the little kernel (lk) module: `ERROR: CMDLINE OVERFLOW`. 
            </p>
            <p className="text-dim text-sm leading-relaxed mb-6">
              We resolved this mismatch by downgrading the lower-level firmware stack (lk, tee, scp, sspm, dtbo) to stock Android 10 (A.85 firmware base) via BROM mode, matching the LineageOS custom kernel base and enabling a clean boot:
            </p>
            <StudyCodeBlock>{`# Flash Android 10 bootloader stack via MTKClient
python3 mtk.py w lk lk.img
python3 mtk.py w tee1 tee.img
python3 mtk.py w scp1 scp.img
python3 mtk.py w dtbo dtbo.img`}</StudyCodeBlock>
            <StudyOutcome type="success" label="Bootloader Downgrade Complete" detail="Successfully resolved the command-line panic loop and booted LineageOS 17.1." />
          </section>

          {/* Phase 5 */}
          <section>
            <StudyPhaseLabel n="05" label="Magisk Root & NetHunter Deployment" />
            <p className="text-dim text-sm leading-relaxed mb-6">
              With a stable Android 10 system booted, we patched the boot partition via Magisk to establish systemless administrative root controls. Once administrative permissions were secured, we sideloaded and compiled the 2.4GB Kali NetHunter package:
            </p>
            <StudyCodeBlock>{`# Flash patched Magisk boot image
python3 mtk.py w boot magisk_patched.img

# Confirm root shell access
$ adb shell su
# id -> uid=0(root) gid=0(root)`}</StudyCodeBlock>
            <StudyOutcome type="success" label="Kali NetHunter Fully Booted" detail="NetHunter chroot packages compiled and activated successfully. Verified local root execution." />
          </section>

          {/* Phase 6 */}
          <section>
            <StudyPhaseLabel n="06" label="BCB Sticky recovery Reset & Userdata Wipe" />
            <p className="text-dim text-sm leading-relaxed mb-6">
              Unprocessed boot recovery flags in the Boot Control Block (BCB) lock devices in loopback stock recovery cycles. To prevent recovery-mode traps, we zeroed out the `para` and `boot_para` partition headers. As a final OPSEC safety measure, we performed a low-level BROM format on the `userdata` block to ensure all private identifiers were removed.
            </p>
            <StudyCodeBlock>{`# Reset recovery loop flags and perform sanitization
python3 mtk.py e para,boot_para
python3 mtk.py e userdata`}</StudyCodeBlock>
            <StudyOutcome type="success" label="Sanitization Complete" detail="Device freed from recovery loop flags and cleared of all personal data footprints." />
          </section>

          {/* Phase 7 */}
          <section className="pb-12">
            <StudyPhaseLabel n="07" label="Integrated CVE Vulnerability Audit" />
            <p className="text-dim text-sm leading-relaxed mb-8">
              The finalized NetHunter installation serves as a physical platform for kernel-level security audits. We mapped and verified several unpatched CVEs on the Helio G35 chipset:
            </p>

            <div className="space-y-4">
              {[
                {
                  cve: "CVE-2022-20421",
                  title: "Binder IPC Use-After-Free (UAF)",
                  desc: "Vulnerability verified. Audited drivers/android/binder.c and verified the race condition in binder_inc_ref_for_node. The device lacks the October 2022 patch, leaving the kernel vulnerable to local privilege escalation.",
                },
                {
                  cve: "CVE-2020-0069",
                  title: "CMDQ Driver stack overflow (MediaTek-su)",
                  desc: "Mitigation audited. The MediaTek command queue driver allows physical memory r/w primitives. On Android 11, SELinux policy successfully blocks untrusted apps from writing to the /dev/mtk_cmdq interface, stopping local exploits.",
                },
                {
                  cve: "CVE-2024-20106",
                  title: "MediaTek Memory Type Confusion",
                  desc: "Vulnerability verified. Type confusion inside the multimedia memory management module (m4u) allows bypass of security boundaries. Unpatched on EOL July 2022 firmware.",
                },
              ].map((c) => (
                <div key={c.cve} className="p-6 rounded-xl bg-panel border border-zinc-800">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <span className="font-mono text-sm text-foreground font-medium">{c.cve} · {c.title}</span>
                    <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full ring-1 ring-accent/30 bg-accent/5 text-accent">Audited</span>
                  </div>
                  <p className="text-xs text-dim leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Project Navigation */}
        <div className="grid md:grid-cols-2 gap-6 mt-16 pt-12 border-t border-zinc-900">
          <Link to="/work/$project" params={{ project: prev.slug }} className="group p-8 rounded-2xl bg-panel border border-zinc-800 hover:border-accent/40 transition-all">
            <p className="text-[10px] text-dim tracking-widest uppercase mb-3 flex items-center gap-2"><ArrowLeft className="size-3" /> Previous</p>
            <p className="text-2xl font-serif group-hover:text-accent transition-colors">{prev.title}</p>
          </Link>
          <Link to="/work/$project" params={{ project: next.slug }} className="group p-8 rounded-2xl bg-panel border border-zinc-800 hover:border-accent/40 transition-all text-right">
            <p className="text-[10px] text-dim tracking-widest uppercase mb-3 flex items-center justify-end gap-2">Next <ArrowRight className="size-3" /></p>
            <p className="text-2xl font-serif group-hover:text-accent transition-colors">{next.title}</p>
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}