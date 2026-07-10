import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const Route = createFileRoute("/work/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Karnayana Rohith" },
      { name: "description", content: "A visual archive of fragments, outtakes, and creative experiments." },
      { property: "og:title", content: "Gallery — Karnayana Rohith" },
      { property: "og:description", content: "A visual archive of fragments, outtakes, and experiments." },
      { property: "og:url", content: "/work/gallery" },
    ],
    links: [{ rel: "canonical", href: "/work/gallery" }],
  }),
  component: GalleryPage,
});

const items = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  tall: i % 5 === 0 || i % 7 === 0,
  accent: ["#00e5ff", "#00ffd1", "#5ce1e6", "#00bfff", "#7df9ff"][i % 5],
  label: ["Type study", "Frame 04", "Motion test", "Color trial", "Untitled"][i % 5],
}));

function GalleryPage() {
  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/work", label: "Work" }, { label: "Gallery" }]} />
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Gallery.</h1>
        <p className="text-dim text-lg max-w-2xl mb-16 leading-relaxed">
          Fragments and outtakes — visual experiments that didn't fit a project but earned their keep.
        </p>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((it) => (
            <div
              key={it.id}
              className={`break-inside-avoid rounded-xl ring-1 ring-white/5 relative overflow-hidden group ${it.tall ? "aspect-[3/4]" : "aspect-square"}`}
              style={{
                background: `radial-gradient(circle at 30% 30%, ${it.accent}30, transparent 60%), linear-gradient(135deg, #0f0f0f, #1a1a1a)`,
              }}
            >
              <div className="absolute inset-0 grid place-items-center text-zinc-700 text-3xl font-serif group-hover:scale-110 transition-transform duration-700">
                {String(it.id + 1).padStart(2, "0")}
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] text-dim tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{it.label}</span>
                <span>2026</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}