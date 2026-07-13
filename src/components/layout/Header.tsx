import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { WorkshopLink } from "@/components/routing/WorkshopLink";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Header({ locale = "en" }: { locale?: Locale }) {
  const t = getDict(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-carbon/90 backdrop-blur-md">
      {/* Race line */}
      <div className="h-[3px] w-full bg-red" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={locale === "en" ? "/" : `/${locale}`}
          className="font-display text-base leading-none text-fog sm:text-lg"
        >
          Gearbox<span className="text-red">/</span>Specialist
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Primary">
          {t.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-tech text-[12px] font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-fog"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher />
          <WorkshopLink
            placement="header"
            className="clip-btn hidden bg-red px-6 py-2.5 font-tech text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-hot sm:inline-block"
          >
            {t.bookDiagnosis}
          </WorkshopLink>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
