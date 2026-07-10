import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { POSTS } from "@/lib/site-data";

export const Route = createFileRoute("/work/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Karnayana Rohith` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `/work/blog/${loaderData.slug}` },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/work/blog/${loaderData.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl font-serif mb-4">Post not found</h1>
        <Link to="/work/blog" className="text-accent uppercase tracking-widest text-xs">← Back to blog</Link>
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
  component: PostPage,
});

function PostPage() {
  const p = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <Breadcrumb trail={[{ to: "/work", label: "Work" }, { to: "/work/blog", label: "Blog" }, { label: p.title }]} />
        <p className="text-[10px] text-accent tracking-widest uppercase mb-4">{p.tag} · {p.date} · {p.readTime}</p>
        <h1 className="text-5xl md:text-6xl font-serif mb-8">{p.title}</h1>
        <p className="text-xl text-dim font-serif italic mb-12 leading-relaxed">{p.excerpt}</p>
        <div className="space-y-6 text-lg text-dim leading-relaxed">
          <p>
            There is a particular quality of stillness that the best interfaces hold. You feel it
            before you can name it. The page loads and something inside you exhales.
          </p>
          <p>
            It is not the absence of detail — minimalism is its own trap — but the presence of
            <em> deliberate </em>detail. Every element is there because it earned its place. Every
            margin is the result of a decision, not a default.
          </p>
          <p>
            The craft, when it works, is invisible. You cannot point at it. You can only feel its
            absence when it isn't there.
          </p>
          <p>
            That feeling — that quiet — is what I'm chasing in every project. Sometimes I catch it.
            More often I don't. The chasing is the point.
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}