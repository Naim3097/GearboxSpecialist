import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticle, getArticles, getPillar, type PillarSlug } from "@/lib/content";
import { getBrand } from "@/data/brands";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";
import { WorkshopCTA } from "@/components/routing/WorkshopCTA";
import { StickyCTA } from "@/components/routing/StickyCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleLd } from "@/lib/jsonld";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The single article template used by every pillar's [slug] route.
 * Guarantees the no-dead-end rule: breadcrumbs in, related guides and a
 * context-aware workshop CTA out.
 */
export async function ArticlePage({ pillar, slug }: { pillar: PillarSlug; slug: string }) {
  const article = getArticle(pillar, slug);
  const pillarInfo = getPillar(pillar);
  if (!article || !pillarInfo) notFound();

  const routingContext = {
    service: article.service ?? pillarInfo.service,
    brand: article.brands?.[0],
  };

  const related = getArticles()
    .filter((a) => a.path !== article.path)
    .filter((a) => a.pillar === pillar || a.brands?.some((b) => article.brands?.includes(b)))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleLd({
          title: article.title,
          description: article.description,
          path: article.path,
          datePublished: article.date,
          dateModified: article.updated,
        })}
      />

      <article>
        <header className="border-b border-line bg-panel">
          <div className="mx-auto max-w-3xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: pillarInfo.name, path: `/${pillar}` },
                { name: article.title, path: article.path },
              ]}
            />
            <h1 className="font-display mt-8 text-3xl leading-[0.98] text-fog sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted">
              {article.description}
            </p>
            <div className="mt-8 flex items-center gap-3 font-tech text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              <span className="h-[2px] w-8 bg-red" aria-hidden />
              <span>{article.readingMinutes} min</span>
              <span aria-hidden className="text-red">
                {"//"}
              </span>
              <span>
                Updated{" "}
                {new Date(article.updated ?? article.date).toLocaleDateString("en-MY", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 pb-20 pt-12 sm:px-6">
          <div className="prose">
            <MDXRemote source={article.content} />
          </div>

          {article.faqs && <FAQ faqs={article.faqs} />}

          <WorkshopCTA context={routingContext} placement="article-end" />

          {article.brands && article.brands.length > 0 && (
            <p className="font-tech text-[13px] uppercase tracking-[0.06em] text-muted">
              <span className="text-red">{"//"}</span> Brand files:{" "}
              {article.brands.map((slug, i) => {
                const brand = getBrand(slug);
                if (!brand) return null;
                return (
                  <span key={slug}>
                    {i > 0 && " · "}
                    <Link
                      href={`/brands/${slug}`}
                      className="text-fog underline decoration-red/60 underline-offset-4 transition-colors hover:text-red-hot"
                    >
                      {brand.name}
                    </Link>
                  </span>
                );
              })}
            </p>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-panel">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-2xl text-fog">Next up</h2>
            <div className="mt-8 grid gap-2 md:grid-cols-3">
              {related.map((a, i) => (
                <Reveal key={a.path} delay={i * 80}>
                  <RelatedCard path={a.path} title={a.title} pillarName={getPillar(a.pillar)?.name ?? ""} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <StickyCTA context={routingContext} />
    </>
  );
}

function RelatedCard({ path, title, pillarName }: { path: string; title: string; pillarName: string }) {
  return (
    <Link
      href={path}
      className="clip-card group relative block h-full border border-line bg-panel-2 p-6 transition-colors hover:border-line-hi"
    >
      <p className="font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
        <span className="text-red">{"//"}</span> {pillarName}
      </p>
      <p className="font-display mt-3 text-lg leading-[1.05] text-fog transition-colors group-hover:text-red-hot">
        {title}
      </p>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-all duration-300 group-hover:w-full"
      />
    </Link>
  );
}

/** Shared static-params + metadata helpers for the pillar [slug] routes. */
export function articleStaticParams(pillar: PillarSlug) {
  return getArticles(pillar).map((a) => ({ slug: a.slug }));
}
