import Link from "next/link";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { getArticles } from "@/lib/content";
import { brands } from "@/data/brands";
import { locations } from "@/data/locations";
import { WorkshopLink } from "@/components/routing/WorkshopLink";
import { LocationPicker } from "@/components/routing/LocationPicker";
import { getWorkshops } from "@/lib/routing";
import { Ticker } from "@/components/home/Ticker";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({
  title: `${site.name} — CVT & Automatic Gearbox Authority, Malaysia`,
  description: site.description,
  path: "/",
});

/** Shared card chrome: angular panel, hairline border, hover energy. */
const card =
  "clip-card group relative overflow-hidden border border-line bg-panel transition-colors duration-300 hover:border-line-hi";

function CardImage({
  src,
  alt = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover opacity-45 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
    </>
  );
}

function CardLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="font-tech text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
      <span className="text-red">{index}</span> {children}
    </p>
  );
}

/** Red bar that snaps in on hover — the card's "live" indicator. */
function HoverBar() {
  return (
    <span
      aria-hidden
      className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-all duration-300 group-hover:w-full"
    />
  );
}

export default function HomePage() {
  const featured = getArticles().filter((a) => a.featured);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Bento grid — every card is a module: one visual, one line, one way in */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 pb-2 pt-4 sm:px-6">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
          {/* HERO — the big module */}
          <div className={`${card} col-span-2 min-h-[420px] md:col-span-6 md:min-h-[480px] lg:col-span-4 lg:row-span-2`}>
            <CardImage
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1800&q=70"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
              <p className="font-tech text-[12px] font-medium uppercase tracking-[0.26em] text-red-hot">
                KL / Selangor / Klang Valley
              </p>
              <h1 className="font-display mt-4 text-[13vw] leading-[0.92] text-fog sm:text-6xl lg:text-7xl">
                Malaysia&apos;s
                <br />
                gearbox
                <br />
                <span className="text-red">specialists</span>
              </h1>
              <p className="mt-5 max-w-md font-tech text-[13px] uppercase tracking-[0.08em] text-muted">
                CVT · Automatic · DSG — diagnosed, rebuilt, warrantied
              </p>
            </div>
            <HoverBar />
          </div>

          {/* PIT STOP — the conversion module */}
          <div className="clip-card stripes-red group relative col-span-2 flex min-h-[220px] flex-col justify-between overflow-hidden bg-red p-6 md:col-span-3 lg:col-span-2 lg:min-h-0">
            <div>
              <p className="font-tech text-[11px] font-medium uppercase tracking-[0.26em] text-white/70">
                Pit stop
              </p>
              <p className="font-display mt-3 text-3xl leading-[0.95] text-white sm:text-4xl">
                Book a<br />
                diagnosis
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <WorkshopLink
                placement="hero"
                label="Reserve a bay · {workshop}"
                className="clip-btn inline-flex items-center justify-center bg-carbon px-6 py-4 font-tech text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-panel-2"
              />
              <div className="[&_select]:border-white/40 [&_select]:text-white [&_span]:text-white/70 [&_.text-red]:text-white">
                <LocationPicker />
              </div>
            </div>
          </div>

          {/* TELEMETRY — quick stats that are also routes */}
          <div className={`${card} col-span-2 p-6 md:col-span-3 lg:col-span-2`}>
            <CardLabel index="//">Telemetry</CardLabel>
            <ul className="mt-4 divide-y divide-line font-tech">
              {[
                { k: String(brands.length), v: "brands covered", href: "/brands" },
                { k: String(locations.length), v: "areas served", href: "/locations" },
                { k: "2026", v: "price guide", href: "/costs/gearbox-repair-cost-malaysia" },
              ].map((row) => (
                <li key={row.v}>
                  <Link href={row.href} className="group/row flex items-baseline gap-4 py-3">
                    <span className="font-display text-2xl text-fog transition-colors group-hover/row:text-red-hot">
                      {row.k}
                    </span>
                    <span className="text-[12px] uppercase tracking-[0.16em] text-muted">
                      {row.v}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <HoverBar />
          </div>
        </div>
      </section>

      <div className="py-2">
        <Ticker />
      </div>

      {/* Service modules */}
      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6" aria-label="Services">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
          {[
            {
              href: "/cvt",
              index: "01",
              label: "Service",
              title: "CVT",
              line: "Judder · slip · whine",
              img: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=70",
            },
            {
              href: "/automatic",
              index: "02",
              label: "Service",
              title: "AT / DSG",
              line: "Shifts · leaks · rebuilds",
              img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
            },
            {
              href: "/diagnostics",
              index: "03",
              label: "Service",
              title: "Diagnose",
              line: "Scan · road test · evidence",
              img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=70",
            },
          ].map((m, i) => (
            <Reveal key={m.href} delay={i * 80} className="col-span-2 md:col-span-2">
              <Link href={m.href} className={`${card} block h-full min-h-[260px]`}>
                <CardImage src={m.img} />
                <div className="relative flex h-full min-h-[260px] flex-col justify-end p-6">
                  <CardLabel index={m.index}>{m.label}</CardLabel>
                  <p className="font-display mt-3 text-4xl text-fog sm:text-5xl">{m.title}</p>
                  <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                    {m.line}
                  </p>
                </div>
                <HoverBar />
              </Link>
            </Reveal>
          ))}

          {/* Costs — ghost number module */}
          <Reveal className="col-span-2 md:col-span-2">
            <Link href="/costs" className={`${card} block h-full min-h-[220px] p-6`}>
              <CardLabel index="04">Costs</CardLabel>
              <p className="font-display text-outline mt-4 text-6xl sm:text-7xl">RM</p>
              <p className="font-display mt-1 text-2xl text-fog">What it really costs</p>
              <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                Diagnosis to overhaul · 2026
              </p>
              <HoverBar />
            </Link>
          </Reveal>

          {/* Maintenance module */}
          <Reveal delay={80} className="col-span-2 md:col-span-2">
            <Link href="/maintenance" className={`${card} block h-full min-h-[220px]`}>
              <CardImage src="https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=1200&q=70" />
              <div className="relative flex h-full min-h-[220px] flex-col justify-end p-6">
                <CardLabel index="05">Maintenance</CardLabel>
                <p className="font-display mt-3 text-3xl text-fog sm:text-4xl">Outlast the road</p>
                <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                  Fluid discipline · 300,000 km
                </p>
              </div>
              <HoverBar />
            </Link>
          </Reveal>

          {/* Brands — grid of names, garage wall */}
          <Reveal delay={160} className="col-span-2 md:col-span-2">
            <Link href="/brands" className={`${card} block h-full min-h-[220px] p-6`}>
              <CardLabel index="06">Garage</CardLabel>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                {brands.slice(0, 12).map((b) => (
                  <span
                    key={b.slug}
                    className="font-tech text-[12px] font-medium uppercase tracking-[0.1em] text-fog/60 transition-colors group-hover:text-fog/85"
                  >
                    {b.name}
                  </span>
                ))}
                <span className="font-tech text-[12px] font-medium uppercase tracking-[0.1em] text-red-hot">
                  +{brands.length - 12} more
                </span>
              </div>
              <p className="font-display mt-5 text-2xl text-fog">Your brand&apos;s weak points</p>
              <HoverBar />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The garage network — where the traffic goes */}
      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6" aria-label="Partner workshops">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
          {getWorkshops().map((w, i) => (
            <Reveal key={w.id} delay={(i % 2) * 80} className="col-span-2 md:col-span-3">
              <div className={`${card} flex h-full flex-col p-6 sm:p-7`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardLabel index={String(i + 1).padStart(2, "0")}>{w.region}</CardLabel>
                    <p className="font-display mt-3 text-2xl text-fog sm:text-3xl">{w.name}</p>
                    <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                      {w.town} · {w.state}
                    </p>
                  </div>
                  <p aria-hidden className="font-display text-outline shrink-0 text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="mt-6 flex items-end justify-between gap-4 pt-2">
                  <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-muted">
                    {w.specialties.slice(0, 2).join(" · ")}
                  </p>
                  <WorkshopLink
                    context={{ workshopId: w.id }}
                    placement="home-workshop-card"
                    className="clip-btn shrink-0 bg-red px-5 py-2.5 font-tech text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hot"
                  >
                    Book
                  </WorkshopLink>
                </div>
                <HoverBar />
              </div>
            </Reveal>
          ))}

          {/* More → full directory */}
          <Link
            href="/workshops"
            className={`${card} col-span-2 flex items-center justify-between gap-4 p-6 md:col-span-6`}
          >
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
              <span className="text-red">{"//"}</span> The garage network
            </p>
            <p className="font-display text-xl text-fog transition-colors group-hover:text-red-hot sm:text-2xl">
              All workshops
            </p>
            <HoverBar />
          </Link>
        </div>
      </section>

      {/* Featured intel — two wide modules */}
      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6" aria-label="Featured guides">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {featured.map((a, i) => (
            <Reveal key={a.path} delay={i * 80}>
              <Link href={a.path} className={`${card} block h-full p-6 sm:p-8`}>
                <CardLabel index="Intel">{a.pillar}</CardLabel>
                <p className="font-display mt-4 max-w-md text-2xl leading-[1.02] text-fog sm:text-3xl">
                  {a.title}
                </p>
                <p className="mt-4 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                  {a.readingMinutes} min · full breakdown
                </p>
                <HoverBar />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Areas — one strip, every route in */}
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6" aria-label="Areas served">
        <div className={`${card} p-6 sm:p-8`}>
          <CardLabel index="//">Coverage</CardLabel>
          <div className="mt-5 flex flex-wrap gap-2">
            {locations.map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="clip-btn border border-line bg-panel-2 px-4 py-2 font-tech text-[12px] font-medium uppercase tracking-[0.12em] text-fog/80 transition-colors hover:border-red hover:bg-red hover:text-white"
              >
                {l.name}
              </Link>
            ))}
          </div>
          <HoverBar />
        </div>
      </section>
    </>
  );
}
