import { pageMetadata } from "@/lib/seo";
import { getWorkshops } from "@/lib/routing";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { WorkshopLink } from "@/components/routing/WorkshopLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { workshopLd } from "@/lib/jsonld";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({
  title: "Partner Workshops — Gearbox Specialists Across Malaysia",
  description:
    "The Gearbox Specialist workshop network: MNA Dynamic Torque (Shah Alam), IM Dynamic Torque (Pulau Pinang), Overhaulin Yard (Kedah) and D7Teen (Johor). Diagnosis-first, warranty on all work.",
  path: "/workshops",
});

export default function WorkshopsPage() {
  const workshops = getWorkshops();

  return (
    <>
      <JsonLd
        data={workshops.map((w) =>
          workshopLd({
            name: w.name,
            town: w.town,
            state: w.state,
            path: "/workshops",
            specialties: w.specialties,
          })
        )}
      />

      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Workshops", path: "/workshops" }]} />
          <h1 className="font-display mt-8 max-w-4xl text-4xl leading-[0.95] text-fog sm:text-6xl">
            The network<span className="text-red">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
            Four bays, one standard: road test and specialist scan before any repair is quoted,
            written findings, warranty on all work. Book the one nearest you.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {workshops.map((w, i) => (
            <Reveal key={w.id} delay={(i % 2) * 80}>
              <article className="clip-card group relative flex h-full flex-col border border-line bg-panel transition-colors duration-300 hover:border-line-hi">
                <div className="flex items-start justify-between gap-4 border-b border-line p-6 sm:p-7">
                  <div>
                    <p className="font-tech text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                      <span className="text-red">{String(i + 1).padStart(2, "0")}</span> {w.region}{" "}
                      region
                    </p>
                    <h2 className="font-display mt-3 text-2xl text-fog sm:text-3xl">{w.name}</h2>
                    <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.14em] text-muted">
                      {w.town} · {w.state}
                    </p>
                  </div>
                  <p
                    aria-hidden
                    className="font-display text-outline shrink-0 text-5xl sm:text-6xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="font-tech text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                    Bay specialties
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
                      Diagnosis first · written warranty
                    </p>
                    <WorkshopLink
                      context={{ workshopId: w.id }}
                      placement="workshops-page"
                      className="clip-btn shrink-0 bg-red px-6 py-3 font-tech text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hot"
                    >
                      Book this bay
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
            The standard
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {[
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
            ].map((item, i) => (
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
