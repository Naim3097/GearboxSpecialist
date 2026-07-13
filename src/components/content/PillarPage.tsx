import { notFound } from "next/navigation";
import type { Locale } from "@/config/site";
import { getDict, localePath } from "@/lib/i18n";
import { getArticles, getPillar, type PillarSlug } from "@/lib/content";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ArticleCard } from "@/components/content/ArticleCard";
import { WorkshopCTA } from "@/components/routing/WorkshopCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceLd } from "@/lib/jsonld";
import { Reveal } from "@/components/motion/Reveal";

const ctaHeadings: Record<Locale, (name: string) => string> = {
  en: (name) => `Talk to a ${name.toLowerCase()} specialist`,
  ms: (name) => `Cakap terus dengan pakar ${name.toLowerCase()}`,
  zh: (name) => `直接联系${name}专家`,
};

/** Pillar hub template: a sector of the grid, always routed. */
export function PillarPage({ pillar, locale = "en" }: { pillar: PillarSlug; locale?: Locale }) {
  const info = getPillar(pillar, locale);
  if (!info) notFound();
  const t = getDict(locale);
  const articles = getArticles(pillar, locale);
  const [lead, ...rest] = articles;

  return (
    <>
      <JsonLd
        data={serviceLd({
          name: info.title,
          description: info.description,
          path: localePath(locale, `/${pillar}`),
        })}
      />

      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: t.home, path: localePath(locale, "/") },
              { name: info.name, path: localePath(locale, `/${pillar}`) },
            ]}
          />
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
              <ArticleCard article={lead} hero locale={locale} />
            </Reveal>
          )}
          {rest.map((a, i) => (
            <Reveal key={a.path} delay={(i % 3) * 80}>
              <ArticleCard article={a} locale={locale} />
            </Reveal>
          ))}
        </div>

        <WorkshopCTA
          context={{ service: info.service }}
          placement="pillar"
          heading={ctaHeadings[locale](info.name)}
          locale={locale}
        />
      </div>
    </>
  );
}
