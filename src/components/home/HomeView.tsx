import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/config/site";
import { localeHref } from "@/lib/i18n";
import { getArticles } from "@/lib/content";
import { brands } from "@/data/brands";
import { locations } from "@/data/locations";
import { WorkshopLink } from "@/components/routing/WorkshopLink";
import { LocationPicker } from "@/components/routing/LocationPicker";
import { getWorkshops, slugTitle } from "@/lib/routing";
import { WorkshopVisual } from "@/components/workshops/WorkshopVisual";
import { Ticker } from "@/components/home/Ticker";
import { Reveal } from "@/components/motion/Reveal";

/** All homepage copy per locale. BM is conversational Malaysian; ZH is Malaysian Chinese (波箱, not textbook Mandarin). */
const copy = {
  en: {
    heroKicker: "KL / Selangor / Penang",
    heroLines: ["Malaysia's", "gearbox"] as [string, string],
    heroAccent: "specialists",
    heroSub: "CVT · Automatic · DSG — diagnosed, rebuilt, warrantied",
    pitKicker: "Pit stop",
    pitLines: ["Book a", "diagnosis"] as [string, string],
    reserveIdle: "Reserve a bay",
    telemetry: "Telemetry",
    brandsCovered: "brands covered",
    areasServed: "areas served",
    priceGuide: "price guide",
    zone1Kicker: "The network",
    zone1Title: "Pick your specialist",
    zone1Sub: "Diagnosis first · warranty in writing",
    region: "region",
    reviews: "Google Reviews",
    bookThisBay: "Book this bay",
    fullDirectory: "Full directory",
    allWorkshops: "All workshops",
    zone2Kicker: "The knowledge",
    zone2Title: "Know before you book",
    zone2Sub: "Guides from the workshop floor",
    guides: "Guides",
    cvtLine: "Judder · slip · whine",
    atTitle: "AT / DSG",
    atLine: "Shifts · leaks · rebuilds",
    diagTitle: "Diagnose",
    diagLine: "Scan · road test · evidence",
    costs: "Costs",
    costsTitle: "What it really costs",
    costsLine: "Diagnosis to overhaul · 2026",
    maintenance: "Maintenance",
    maintTitle: "Outlast the road",
    maintLine: "Fluid discipline · 300,000 km",
    garage: "Garage",
    more: "more",
    garageTitle: "Your brand's weak points",
    intel: "Intel",
    fullBreakdown: "full breakdown",
    coverage: "Coverage",
  },
  ms: {
    heroKicker: "KL / Selangor / Penang",
    heroLines: ["Pakar", "gearbox"] as [string, string],
    heroAccent: "Malaysia",
    heroSub: "CVT · Auto · DSG — diagnosis, overhaul, semua ada warranty",
    pitKicker: "Pit stop",
    pitLines: ["Book", "diagnosis"] as [string, string],
    reserveIdle: "Book slot bengkel",
    telemetry: "Telemetri",
    brandsCovered: "jenama dilindungi",
    areasServed: "kawasan diservis",
    priceGuide: "panduan harga",
    zone1Kicker: "Rangkaian bengkel",
    zone1Title: "Pilih bengkel anda",
    zone1Sub: "Diagnosis dulu · warranty bertulis",
    region: "zon",
    reviews: "Review Google",
    bookThisBay: "Book bengkel ini",
    fullDirectory: "Senarai penuh",
    allWorkshops: "Semua bengkel",
    zone2Kicker: "Ilmu gearbox",
    zone2Title: "Faham dulu, baru repair",
    zone2Sub: "Panduan terus dari lantai bengkel",
    guides: "Panduan",
    cvtLine: "Gegar · slip · bunyi",
    atTitle: "AT / DSG",
    atLine: "Gear lambat · bocor · overhaul",
    diagTitle: "Diagnosis",
    diagLine: "Scan · road test · bukti",
    costs: "Harga",
    costsTitle: "Berapa harga sebenar",
    costsLine: "Diagnosis sampai overhaul · 2026",
    maintenance: "Maintenance",
    maintTitle: "Biar gearbox tahan lama",
    maintLine: "Jaga minyak · 300,000 km",
    garage: "Garaj",
    more: "lagi",
    garageTitle: "Kelemahan kereta anda",
    intel: "Info",
    fullBreakdown: "penuh",
    coverage: "Kawasan",
  },
  zh: {
    heroKicker: "吉隆坡 / 雪兰莪 / 槟城",
    heroLines: ["马来西亚", "波箱"] as [string, string],
    heroAccent: "专家",
    heroSub: "CVT · 自动波 · DSG — 检测、大修、有保家",
    pitKicker: "Pit stop",
    pitLines: ["预约", "检测"] as [string, string],
    reserveIdle: "马上预约",
    telemetry: "数据",
    brandsCovered: "个品牌",
    areasServed: "个服务地区",
    priceGuide: "价钱指南",
    zone1Kicker: "维修网络",
    zone1Title: "选你的维修厂",
    zone1Sub: "先检测 · 书面保修",
    region: "区",
    reviews: "Google 评价",
    bookThisBay: "预约这家",
    fullDirectory: "完整名单",
    allWorkshops: "所有修车厂",
    zone2Kicker: "波箱知识",
    zone2Title: "先搞懂，再送修",
    zone2Sub: "来自维修一线的指南",
    guides: "指南",
    cvtLine: "抖动 · 打滑 · 异响",
    atTitle: "AT / DSG",
    atLine: "换挡 · 漏油 · 大修",
    diagTitle: "检测",
    diagLine: "扫描 · 路试 · 证据",
    costs: "价钱",
    costsTitle: "到底要花多少钱",
    costsLine: "从检测到大修 · 2026",
    maintenance: "保养",
    maintTitle: "让波箱更耐用",
    maintLine: "换油纪律 · 30 万公里",
    garage: "车库",
    more: "更多",
    garageTitle: "你的车的弱点",
    intel: "情报",
    fullBreakdown: "完整解析",
    coverage: "服务地区",
  },
} satisfies Record<Locale, Record<string, unknown>>;

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

function HoverBar() {
  return (
    <span
      aria-hidden
      className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-all duration-300 group-hover:w-full"
    />
  );
}

function ZoneHead({
  index,
  kicker,
  title,
  sub,
}: {
  index: string;
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-red pb-6">
      <div>
        <p className="font-tech text-[11px] font-medium uppercase tracking-[0.26em] text-red-hot">
          {index} <span aria-hidden>{"//"}</span> {kicker}
        </p>
        <h2 className="font-display mt-3 text-3xl text-fog sm:text-4xl">{title}</h2>
      </div>
      {sub && <p className="font-tech text-[12px] uppercase tracking-[0.14em] text-muted">{sub}</p>}
    </div>
  );
}

export function HomeView({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const featured = getArticles(undefined, locale).filter((a) => a.featured);
  const workshops = getWorkshops();
  // Areas the NETWORK actually covers (all regions), not just those with landing pages.
  const coverageCount = new Set(
    workshops.flatMap((w) => w.locations.filter((slug) => slug !== "*"))
  ).size;

  /** Link into the same locale where the page exists there, else EN. */
  const to = (enPath: string) => localeHref(locale, enPath);

  return (
    <>
      {/* Hero bento — one message, one action */}
      <section className="mx-auto max-w-7xl px-4 pb-2 pt-4 sm:px-6">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
          <div className={`${card} col-span-2 min-h-[420px] md:col-span-6 md:min-h-[480px] lg:col-span-4 lg:row-span-2`}>
            <CardImage
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1800&q=70"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
              <p className="font-tech text-[12px] font-medium uppercase tracking-[0.26em] text-red-hot">
                {t.heroKicker}
              </p>
              <h1 className="font-display mt-4 text-[clamp(2rem,9vw,3.5rem)] leading-[0.92] text-fog sm:text-6xl lg:text-7xl">
                {t.heroLines[0]}
                <br />
                {t.heroLines[1]}
                <br />
                <span className="text-red">{t.heroAccent}</span>
              </h1>
              <p className="mt-5 max-w-md font-tech text-[13px] uppercase tracking-[0.08em] text-muted">
                {t.heroSub}
              </p>
            </div>
            <HoverBar />
          </div>

          {/* PIT STOP — the conversion module */}
          <div className="clip-card stripes-red group relative col-span-2 flex min-h-[220px] flex-col justify-between overflow-hidden bg-red p-6 md:col-span-3 lg:col-span-2 lg:min-h-0">
            <div>
              <p className="font-tech text-[11px] font-medium uppercase tracking-[0.26em] text-white/70">
                {t.pitKicker}
              </p>
              <p className="font-display mt-3 text-3xl leading-[0.95] text-white sm:text-4xl">
                {t.pitLines[0]}
                <br />
                {t.pitLines[1]}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {/* Static label — the remembered region personalizes the picker below,
                  never this text, so first paint and hydrated state always match. */}
              <WorkshopLink
                placement="hero"
                label={t.reserveIdle}
                className="clip-btn inline-flex items-center justify-center bg-carbon px-6 py-4 font-tech text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-panel-2"
              />
              <LocationPicker onRed />
            </div>
          </div>

          {/* TELEMETRY */}
          <div className={`${card} col-span-2 p-6 md:col-span-3 lg:col-span-2`}>
            <CardLabel index="//">{t.telemetry}</CardLabel>
            <ul className="mt-4 divide-y divide-line font-tech">
              {[
                { k: String(brands.length), v: t.brandsCovered, href: "/brands" },
                { k: String(coverageCount), v: t.areasServed, href: "/locations" },
                { k: "2026", v: t.priceGuide, href: to("/costs/gearbox-repair-cost-malaysia") },
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

      {/* ZONE 01 — THE NETWORK */}
      <section className="border-y border-line bg-panel" aria-label="Partner workshops">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <ZoneHead index="01" kicker={t.zone1Kicker} title={t.zone1Title} sub={t.zone1Sub} />

          <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2">
            {workshops.map((w, i) => (
              <Reveal key={w.id} delay={(i % 2) * 80}>
                <article className="clip-card group relative flex h-full flex-col overflow-hidden border border-line bg-carbon transition-colors duration-300 hover:border-line-hi">
                  <WorkshopVisual workshop={w} index={String(i + 1).padStart(2, "0")} />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <CardLabel index={String(i + 1).padStart(2, "0")}>
                      {w.region} {t.region}
                    </CardLabel>
                    <p className="font-display mt-3 text-2xl text-fog sm:text-3xl">{w.name}</p>
                    <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                      {w.town} · {w.state}
                      {w.gbpUrl && (
                        <>
                          {" "}
                          <a
                            href={w.gbpUrl}
                            target="_blank"
                            rel="noopener"
                            className="whitespace-nowrap text-muted underline decoration-red/50 underline-offset-4 transition-colors hover:text-red-hot"
                          >
                            <span className="text-red">{"//"}</span> {t.reviews}
                          </a>
                        </>
                      )}
                    </p>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-muted">
                        {w.specialties.slice(0, 2).join(" · ")}
                      </p>
                      <WorkshopLink
                        context={{ workshopId: w.id }}
                        placement="home-workshop-card"
                        className="clip-btn shrink-0 bg-red px-6 py-3 font-tech text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hot"
                      >
                        {t.bookThisBay}
                      </WorkshopLink>
                    </div>
                  </div>
                  <HoverBar />
                </article>
              </Reveal>
            ))}
          </div>

          <Link
            href={to("/workshops")}
            className="clip-card group relative mt-2 flex items-center justify-between gap-4 border border-line bg-carbon p-6 transition-colors hover:border-line-hi"
          >
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
              <span className="text-red">{"//"}</span> {t.fullDirectory}
            </p>
            <p className="font-display text-xl text-fog transition-colors group-hover:text-red-hot sm:text-2xl">
              {t.allWorkshops}
            </p>
            <HoverBar />
          </Link>
        </div>
      </section>

      {/* ZONE 02 — THE KNOWLEDGE */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16" aria-label="Guides">
        <ZoneHead index="02" kicker={t.zone2Kicker} title={t.zone2Title} sub={t.zone2Sub} />

        <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-6">
          {[
            {
              href: to("/cvt"),
              index: "01",
              title: "CVT",
              line: t.cvtLine,
              img: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=70",
            },
            {
              href: to("/automatic"),
              index: "02",
              title: t.atTitle,
              line: t.atLine,
              img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
            },
            {
              href: to("/diagnostics"),
              index: "03",
              title: t.diagTitle,
              line: t.diagLine,
              img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=70",
            },
          ].map((m, i) => (
            <Reveal key={m.href} delay={i * 80} className="col-span-2 md:col-span-2">
              <Link href={m.href} className={`${card} block h-full min-h-[260px]`}>
                <CardImage src={m.img} />
                <div className="relative flex h-full min-h-[260px] flex-col justify-end p-6">
                  <CardLabel index={m.index}>{t.guides}</CardLabel>
                  <p className="font-display mt-3 text-4xl text-fog sm:text-5xl">{m.title}</p>
                  <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                    {m.line}
                  </p>
                </div>
                <HoverBar />
              </Link>
            </Reveal>
          ))}

          <Reveal className="col-span-2 md:col-span-2">
            <Link href={to("/costs")} className={`${card} block h-full min-h-[220px] p-6`}>
              <CardLabel index="04">{t.costs}</CardLabel>
              <p className="font-display text-outline mt-4 text-6xl sm:text-7xl">RM</p>
              <p className="font-display mt-1 text-2xl text-fog">{t.costsTitle}</p>
              <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                {t.costsLine}
              </p>
              <HoverBar />
            </Link>
          </Reveal>

          <Reveal delay={80} className="col-span-2 md:col-span-2">
            <Link href={to("/maintenance")} className={`${card} block h-full min-h-[220px]`}>
              <CardImage src="https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=1200&q=70" />
              <div className="relative flex h-full min-h-[220px] flex-col justify-end p-6">
                <CardLabel index="05">{t.maintenance}</CardLabel>
                <p className="font-display mt-3 text-3xl text-fog sm:text-4xl">{t.maintTitle}</p>
                <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                  {t.maintLine}
                </p>
              </div>
              <HoverBar />
            </Link>
          </Reveal>

          <Reveal delay={160} className="col-span-2 md:col-span-2">
            <Link href="/brands" className={`${card} block h-full min-h-[220px] p-6`}>
              <CardLabel index="06">{t.garage}</CardLabel>
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
                  +{brands.length - 12} {t.more}
                </span>
              </div>
              <p className="font-display mt-5 text-2xl text-fog">{t.garageTitle}</p>
              <HoverBar />
            </Link>
          </Reveal>
        </div>

        {/* Featured intel */}
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {featured.map((a, i) => (
            <Reveal key={a.path} delay={i * 80}>
              <Link href={a.path} className={`${card} block h-full p-6 sm:p-8`}>
                <CardLabel index={t.intel}>{a.pillar}</CardLabel>
                <p className="font-display mt-4 max-w-md text-2xl leading-[1.02] text-fog sm:text-3xl">
                  {a.title}
                </p>
                <p className="mt-4 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                  {a.readingMinutes} min · {t.fullBreakdown}
                </p>
                <HoverBar />
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Areas strip — one row per workshop region. Areas with landing pages
            link there; the rest route to the workshop directory. */}
        <div className={`${card} mt-2 p-6 sm:p-8`}>
          <CardLabel index="//">{t.coverage}</CardLabel>
          {workshops
            .filter((w) => w.pickerLabel)
            .map((w) => (
              <div key={w.id} className="mt-5">
                <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-red-hot">
                  {w.pickerLabel?.[locale] ?? w.pickerLabel?.en}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {w.locations
                    .filter((slug) => slug !== "*")
                    .map((slug) => {
                      const page = locations.find((l) => l.slug === slug);
                      return (
                        <Link
                          key={slug}
                          href={page ? `/locations/${slug}` : to("/workshops")}
                          className="clip-btn border border-line bg-panel-2 px-4 py-2 font-tech text-[12px] font-medium uppercase tracking-[0.12em] text-fog/80 transition-colors hover:border-red hover:bg-red hover:text-white"
                        >
                          {page?.name ?? slugTitle(slug)}
                        </Link>
                      );
                    })}
                </div>
              </div>
            ))}
          <HoverBar />
        </div>
      </section>
    </>
  );
}
