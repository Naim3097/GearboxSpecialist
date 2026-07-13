import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/jsonld";

/** FAQ section with FAQPage structured data — data-sheet styling. */
export function FAQ({
  faqs,
  heading,
  locale = "en",
}: {
  faqs: { q: string; a: string }[];
  heading?: string;
  locale?: Locale;
}) {
  if (!faqs.length) return null;
  heading = heading ?? getDict(locale).faqDefault;
  return (
    <section className="not-prose mt-16">
      <JsonLd data={faqLd(faqs)} />
      <h2 className="font-display text-2xl text-fog sm:text-3xl">{heading}</h2>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {faqs.map((f, i) => (
          <div key={f.q} className="grid gap-3 py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
            <dt className="flex gap-3 font-tech text-[15px] font-semibold leading-snug text-fog">
              <span className="text-red">{String(i + 1).padStart(2, "0")}</span>
              {f.q}
            </dt>
            <dd className="text-[14px] leading-relaxed text-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
