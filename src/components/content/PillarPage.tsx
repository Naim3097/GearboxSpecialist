import { notFound } from "next/navigation";
import { getArticles, getPillar, type PillarSlug } from "@/lib/content";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ArticleCard } from "@/components/content/ArticleCard";
import { WorkshopCTA } from "@/components/routing/WorkshopCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceLd } from "@/lib/jsonld";
import { Reveal } from "@/components/motion/Reveal";

/** Pillar hub template: a sector of the grid, always routed. */
export function PillarPage({ pillar }: { pillar: PillarSlug }) {
  const info = getPillar(pillar);
  if (!info) notFound();
  const articles = getArticles(pillar);
  const [lead, ...rest] = articles;

  return (
    <>
      <JsonLd data={serviceLd({ name: info.title, description: info.description, path: `/${pillar}` })} />

      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: info.name, path: `/${pillar}` }]} />
          <h1 className="font-display mt-8 max-w-4xl text-3xl leading-[0.95] text-fog sm:text-6xl">
            {info.name}
            <span className="text-red">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{info.description}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {lead && (
            <Reveal className="md:col-span-3">
              <ArticleCard article={lead} hero />
            </Reveal>
          )}
          {rest.map((a, i) => (
            <Reveal key={a.path} delay={(i % 3) * 80}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>

        <WorkshopCTA
          context={{ service: info.service }}
          placement="pillar"
          heading={`Talk to a ${info.name.toLowerCase()} specialist`}
        />
      </div>
    </>
  );
}
