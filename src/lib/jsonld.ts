import { site, absoluteUrl } from "@/config/site";

/**
 * JSON-LD builders. Every page emits structured data; these keep the shapes
 * consistent and the @id graph stable across the site.
 */

type JsonLd = Record<string, unknown>;

export function organizationLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    url: site.url,
    description: site.description,
    areaServed: site.areaServed,
    sameAs: Object.values(site.social),
  };
}

export function websiteLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: ["en-MY"],
  };
}

export function articleLd(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: opts.image,
    author: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-MY",
  };
}

export function faqLd(faqs: { q: string; a: string }[]): JsonLd | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceLd(opts: { name: string; description: string; path: string; areaServed?: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    areaServed: opts.areaServed ?? "Malaysia",
    provider: { "@id": `${site.url}/#organization` },
  };
}

export function workshopLd(opts: {
  name: string;
  town: string;
  state: string;
  path: string;
  specialties: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: opts.name,
    url: absoluteUrl(opts.path),
    address: {
      "@type": "PostalAddress",
      addressLocality: opts.town,
      addressRegion: opts.state,
      addressCountry: "MY",
    },
    knowsAbout: opts.specialties,
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

export function autoRepairLd(opts: { locationName: string; path: string; description: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: `Gearbox Specialist — ${opts.locationName}`,
    description: opts.description,
    url: absoluteUrl(opts.path),
    areaServed: opts.locationName,
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}
