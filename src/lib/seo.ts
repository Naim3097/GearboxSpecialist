import type { Metadata } from "next";
import { site, absoluteUrl, type Locale } from "@/config/site";
import { msTranslatedPaths, zhTranslatedPaths } from "@/lib/i18n";

const hreflangCodes: Record<Locale, string> = {
  en: "en-MY",
  ms: "ms-MY",
  zh: "zh-Hans",
};

/**
 * Derive the hreflang set for a canonical EN path from the translated-path
 * registry. Returns locale → URL path for every language the page exists in.
 */
export function translationsFor(enPath: string): Partial<Record<Locale, string>> {
  const map: Partial<Record<Locale, string>> = { en: enPath };
  if (msTranslatedPaths.has(enPath)) {
    map.ms = enPath === "/" ? "/ms" : `/ms${enPath}`;
  }
  if (zhTranslatedPaths.has(enPath)) {
    map.zh = enPath === "/" ? "/zh" : `/zh${enPath}`;
  }
  return map;
}

/**
 * Metadata helper. Guarantees every page ships canonical, OG and hreflang
 * alternates. `path` is the page's own URL; `translations` maps every locale
 * the page exists in to its path (defaults to EN-only).
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  image?: string;
  translations?: Partial<Record<Locale, string>>;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const translations = opts.translations ?? { en: opts.path };

  const languages: Record<string, string> = {};
  for (const [locale, p] of Object.entries(translations)) {
    languages[hreflangCodes[locale as Locale]] = absoluteUrl(p);
  }
  languages["x-default"] = absoluteUrl(translations.en ?? opts.path);

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: opts.ogType ?? "website",
      ...(opts.image ? { images: [{ url: opts.image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
