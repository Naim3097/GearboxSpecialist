import Link from "next/link";
import { site } from "@/config/site";
import { pillars } from "@/lib/content";
import { locations } from "@/data/locations";
import { brands } from "@/data/brands";
import { WorkshopLink } from "@/components/routing/WorkshopLink";

export function Footer() {
  return (
    <footer className="border-t-2 border-red bg-panel">
      {/* Final routing block — the footer is a route, not a dead end. */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="stripes clip-card flex flex-col gap-8 bg-panel-2 p-8 sm:p-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-red-hot">
              Final call
            </p>
            <h2 className="font-display mt-4 max-w-xl text-3xl text-fog sm:text-5xl">
              Stop guessing.
              <br />
              Get it diagnosed.
            </h2>
          </div>
          <WorkshopLink
            placement="footer"
            className="clip-btn inline-flex items-center justify-center bg-red px-10 py-5 font-tech text-[14px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-hot"
          >
            Book a diagnosis
          </WorkshopLink>
        </div>

        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg text-fog">
              Gearbox<span className="text-red">/</span>Specialist
            </p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          <nav aria-label="Guides">
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
              Guides
            </p>
            <ul className="mt-4 space-y-2.5">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/workshops"
                  className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-tech text-[13px] uppercase tracking-[0.08em] text-fog/80 transition-colors hover:text-red-hot"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Popular brands">
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
              By brand
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
                  All brands
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Areas served">
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
              Areas
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
              <li>
                <Link
                  href="/locations"
                  className="font-tech text-[13px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-red-hot"
                >
                  All areas
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex items-center gap-3 border-t border-line pt-8">
          <span className="h-[2px] w-8 bg-red" aria-hidden />
          <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-muted">
            © {new Date().getFullYear()} {site.legalName} — Independent gearbox knowledge for
            Malaysian drivers
          </p>
        </div>
      </div>
    </footer>
  );
}
