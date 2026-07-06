import Link from "next/link";
import { pillars } from "@/lib/content";
import { WorkshopLink } from "@/components/routing/WorkshopLink";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="font-display text-outline text-7xl sm:text-8xl">404</p>
      <h1 className="font-display mt-6 text-3xl leading-[0.98] text-fog sm:text-5xl">
        Off the racing line<span className="text-red">.</span>
      </h1>
      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
        This address doesn&apos;t exist — but everything worth knowing about your gearbox does.
        Pick a sector, or go straight to a specialist.
      </p>
      <ul className="mt-10 space-y-3">
        {pillars.map((p, i) => (
          <li key={p.slug} className="flex items-baseline gap-3">
            <span aria-hidden className="font-tech text-[12px] text-red">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link
              href={`/${p.slug}`}
              className="font-display text-xl text-fog transition-colors hover:text-red-hot"
            >
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <WorkshopLink
          placement="404"
          className="clip-btn inline-flex items-center justify-center bg-red px-8 py-4 font-tech text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hot"
        >
          Book a diagnosis
        </WorkshopLink>
      </div>
    </div>
  );
}
