import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const Route = createFileRoute("/about/now")({
  head: () => ({
    meta: [
      { title: "Now — Karnayana Rohith" },
      { name: "description", content: "What I'm working on right now." },
      { property: "og:title", content: "Now — Karnayana Rohith" },
      { property: "og:description", content: "What I'm working on right now." },
      { property: "og:url", content: "/about/now" },
    ],
    links: [{ rel: "canonical", href: "/about/now" }],
  }),
  component: NowPage,
});

function NowPage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/about", label: "About" }, { label: "Now" }]} />
        <h1 className="text-5xl md:text-7xl font-serif mb-12">Now.</h1>
        <div className="space-y-8 text-lg text-dim leading-relaxed">
          {/* Content coming soon */}
          <p>
            <span className="text-foreground">Coming soon.</span>{" "}
            This page is being updated. Check back shortly.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}