import type { Locale } from "@/config/site";
import { site } from "@/config/site";
import { getDict, localePath } from "@/lib/i18n";
import { getWorkshops } from "@/lib/routing";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { WorkshopLink } from "@/components/routing/WorkshopLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { workshopLd } from "@/lib/jsonld";
import { WorkshopVisual } from "@/components/workshops/WorkshopVisual";
import { Reveal } from "@/components/motion/Reveal";

const copy = {
  en: {
    crumb: "Workshops",
    title: "The network",
    intro:
      "One standard across the network: road test and specialist scan before any repair is quoted, written findings, warranty on all work. Book the one nearest you.",
    region: "region",
    reviews: "Google Reviews",
    facebook: "Facebook",
    specialties: "Bay specialties",
    standardLine: "Diagnosis first · written warranty",
    standardKicker: "The standard",
    standards: [
      {
        t: "Diagnosis before quotes",
        d: "Road test, specialist scan, physical evidence — then a number. Never the other way around.",
      },
      {
        t: "Repair over replacement",
        d: "Component-level fixes at a fraction of a new unit. Replacement only when the teardown proves it.",
      },
      {
        t: "Warranty in writing",
        d: "Months and kilometres on paper. A workshop's warranty is its honest opinion of its own work.",
      },
    ],
  },
  ms: {
    crumb: "Bengkel",
    title: "Rangkaian bengkel",
    intro:
      "Satu standard untuk semua bengkel: road test dan scan penuh dulu sebelum bagi harga, laporan bertulis, dan semua kerja ada warranty. Book yang paling dekat dengan anda.",
    region: "zon",
    reviews: "Review Google",
    facebook: "Facebook",
    specialties: "Kepakaran bengkel",
    standardLine: "Diagnosis dulu · warranty bertulis",
    standardKicker: "Standard kami",
    standards: [
      {
        t: "Diagnosis dulu, baru harga",
        d: "Road test, scan penuh, bukti fizikal. Lepas tu baru cakap pasal harga, bukan sebaliknya.",
      },
      {
        t: "Repair dulu, bukan terus tukar",
        d: "Baiki di peringkat komponen, jauh lebih jimat dari unit baru. Tukar hanya bila teardown buktikan perlu.",
      },
      {
        t: "Warranty hitam putih",
        d: "Bulan dan kilometer, atas kertas. Warranty bengkel tu cerminan keyakinan dia pada kerja sendiri.",
      },
    ],
  },
  zh: {
    crumb: "修车厂",
    title: "维修网络",
    intro:
      "全网络一个标准：报价之前先路试和电脑扫描，检测结果白纸黑字，所有维修都有保家。选最靠近你的一家预约。",
    region: "区",
    reviews: "Google 评价",
    facebook: "Facebook",
    specialties: "专长项目",
    standardLine: "先检测 · 书面保修",
    standardKicker: "我们的标准",
    standards: [
      {
        t: "先检测，才报价",
        d: "路试、电脑扫描、实物证据，然后才谈价钱。顺序不能反。",
      },
      {
        t: "能修就不换",
        d: "零件级维修，价钱远低于整个换新。只有拆检证明必要时才换总成。",
      },
      {
        t: "保修白纸黑字",
        d: "几个月、多少公里，写清楚。一家店的保修就是它对自己手工的信心。",
      },
    ],
  },
} satisfies Record<Locale, Record<string, unknown>>;

export function WorkshopsView({ locale = "en" }: { locale?: Locale }) {
  const workshops = getWorkshops();
  const t = copy[locale];
  const dict = getDict(locale);

  return (
    <>
      <JsonLd
        data={workshops.map((w) =>
          workshopLd({
            name: w.name,
            town: w.town,
            state: w.state,
            path: localePath(locale, "/workshops"),
            specialties: w.specialties,
            gbpUrl: w.gbpUrl,
          })
        )}
      />

      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: dict.home, path: localePath(locale, "/") },
              { name: t.crumb, path: localePath(locale, "/workshops") },
            ]}
          />
          <h1 className="font-display mt-8 max-w-4xl text-3xl leading-[0.95] text-fog sm:text-6xl">
            {t.title}
            <span className="text-red">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{t.intro}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {workshops.map((w, i) => (
            <Reveal key={w.id} delay={(i % 2) * 80}>
              <article className="clip-card group relative flex h-full flex-col overflow-hidden border border-line bg-panel transition-colors duration-300 hover:border-line-hi">
                <WorkshopVisual workshop={w} index={String(i + 1).padStart(2, "0")} />
                <div className="border-b border-line p-6 sm:p-7">
                  <p className="font-tech text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                    <span className="text-red">{String(i + 1).padStart(2, "0")}</span> {w.region}{" "}
                    {t.region}
                  </p>
                  <h2 className="font-display mt-3 text-2xl text-fog sm:text-3xl">{w.name}</h2>
                  <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                    {w.town} · {w.state}
                  </p>
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-tech text-[11px] font-medium uppercase tracking-[0.14em]">
                    {w.gbpUrl && (
                      <a
                        href={w.gbpUrl}
                        target="_blank"
                        rel="noopener"
                        className="text-muted underline decoration-red/50 underline-offset-4 transition-colors hover:text-red-hot"
                      >
                        <span className="text-red">{"//"}</span> {t.reviews}
                      </a>
                    )}
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noopener"
                      className="text-muted underline decoration-red/50 underline-offset-4 transition-colors hover:text-red-hot"
                    >
                      <span className="text-red">{"//"}</span> {t.facebook}
                    </a>
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="font-tech text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                    {t.specialties}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {w.specialties.map((s) => (
                      <span
                        key={s}
                        className="clip-btn border border-line bg-panel-2 px-3.5 py-1.5 font-tech text-[12px] font-medium uppercase tracking-[0.1em] text-fog/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4 pt-2">
                    <p className="font-tech text-[11px] uppercase tracking-[0.14em] text-muted">
                      {t.standardLine}
                    </p>
                    <WorkshopLink
                      context={{ workshopId: w.id }}
                      placement="workshops-page"
                      className="clip-btn shrink-0 bg-red px-6 py-3 font-tech text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hot"
                    >
                      {dict.bookThisBay}
                    </WorkshopLink>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-all duration-300 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>

        {/* One standard, stated */}
        <section className="clip-card stripes mt-10 border border-line bg-panel-2 p-8 sm:p-10">
          <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-red-hot">
            {t.standardKicker}
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {t.standards.map((item, i) => (
              <div key={item.t}>
                <p className="font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                  <span className="text-red">{String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3 className="font-tech mt-2 text-[15px] font-semibold uppercase tracking-[0.04em] text-fog">
                  {item.t}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
