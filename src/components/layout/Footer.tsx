import Link from "next/link";
import type { Locale } from "@/config/site";
import { site } from "@/config/site";
import { getDict, localeHref } from "@/lib/i18n";
import { pillars, getPillar } from "@/lib/content";
import { locations } from "@/data/locations";
import { brands } from "@/data/brands";
import { getWorkshops } from "@/lib/routing";
import { WorkshopLink } from "@/components/routing/WorkshopLink";

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = getDict(locale);
  const [finalLine1, finalLine2] = t.footerFinalHeading.split("\n");

  // Guide links stay in-locale where the page exists; otherwise EN.
  const pillarHref = (slug: string) => localeHref(locale, `/${slug}`);

  return (
    <footer className="border-t-2 border-red bg-panel">
      {/* Final routing block — the footer is a route, not a dead end. */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="stripes clip-card flex flex-col gap-8 bg-panel-2 p-8 sm:p-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-red-hot">
              {t.footerFinalKicker}
            </p>
            <h2 className="font-display mt-4 max-w-xl text-3xl text-fog sm:text-5xl">
              {finalLine1}
              <br />
              {finalLine2}
            </h2>
          </div>
          <WorkshopLink
            placement="footer"
            className="clip-btn inline-flex items-center justify-center bg-red px-10 py-5 font-tech text-[14px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-hot"
          >
            {t.bookDiagnosis}
          </WorkshopLink>
        </div>

        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg text-fog">
              Gearbox<span className="text-red">/</span>Specialist
            </p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              {t.footerTagline}
            </p>
          </div>

          <nav aria-label={t.footerGuides}>
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
              {t.footerGuides}
            </p>
            <ul className="mt-4 space-y-2.5">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={pillarHref(p.slug)}
                    className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                  >
                    {getPillar(p.slug, locale)?.name ?? p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={localeHref(locale, "/workshops")}
                  className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                >
                  {t.footerWorkshops}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                >
                  {t.footerAbout}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footerByBrand}>
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
              {t.footerByBrand}
            </p>
            <ul className="mt-4 space-y-2.5">
              {brands.slice(0, 6).map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/brands"
                  className="font-tech text-[13px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-red-hot"
                >
                  {t.footerAllBrands}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footerAreas}>
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
              {t.footerAreas}
            </p>
            <ul className="mt-4 space-y-2.5">
              {locations.slice(0, 6).map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/locations/${l.slug}`}
                    className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
              {/* Regions without area landing pages route to the workshop directory. */}
              {getWorkshops()
                .filter(
                  (w) =>
                    w.pickerLabel &&
                    !w.locations.some((slug) => locations.some((l) => l.slug === slug))
                )
                .map((w) => (
                  <li key={w.id}>
                    <Link
                      href={localeHref(locale, "/workshops")}
                      className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                    >
                      {w.pickerLabel?.[locale] ?? w.pickerLabel?.en}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/locations"
                  className="font-tech text-[13px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-red-hot"
                >
                  {t.footerAllAreas}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-8">
          <span className="h-[2px] w-8 bg-red" aria-hidden />
          <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-muted">
            © {new Date().getFullYear()} {site.legalName} — {t.footerLegal}
          </p>
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener"
            className="ml-auto font-tech text-[11px] font-medium uppercase tracking-[0.14em] text-muted underline decoration-red/50 underline-offset-4 transition-colors hover:text-red-hot"
          >
            <span className="text-red">{"//"}</span> Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
