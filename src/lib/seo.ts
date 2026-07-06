import type { Metadata } from "next";
import { site, absoluteUrl, activeLocales, defaultLocale } from "@/config/site";

/**
 * Metadata helper. Guarantees every page ships canonical, OG and
 * hreflang-ready alternates. When BM/ZH activate (Phase 2), adding them to
 * activeLocales emits the extra hreflang entries site-wide with no per-page
 * changes.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  image?: string;
}): Metadata {
  const url = absoluteUrl(opts.path);

  const languages: Record<string, string> = {};
  for (const locale of activeLocales) {
    languages[locale === "en" ? "en-MY" : locale === "ms" ? "ms-MY" : "zh-Hans"] =
      locale === defaultLocale ? url : absoluteUrl(`/${locale}${opts.path}`);
  }
  languages["x-default"] = url;

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
