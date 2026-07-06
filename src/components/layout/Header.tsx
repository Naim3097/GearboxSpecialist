import Link from "next/link";
import { WorkshopLink } from "@/components/routing/WorkshopLink";
import { MobileNav } from "@/components/layout/MobileNav";

export const navItems = [
  { href: "/cvt", label: "CVT" },
  { href: "/automatic", label: "Automatic" },
  { href: "/diagnostics", label: "Diagnostics" },
  { href: "/maintenance", label: "Maintenance" },
  { href: "/brands", label: "Brands" },
  { href: "/locations", label: "Locations" },
  { href: "/costs", label: "Costs" },
  { href: "/workshops", label: "Workshops" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-carbon/90 backdrop-blur-md">
      {/* Race line */}
      <div className="h-[3px] w-full bg-red" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="font-display text-base leading-none text-fog sm:text-lg">
          Gearbox<span className="text-red">/</span>Specialist
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-tech text-[12px] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-fog"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <WorkshopLink
            placement="header"
            className="clip-btn hidden bg-red px-6 py-2.5 font-tech text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-hot sm:inline-block"
          >
            Book a diagnosis
          </WorkshopLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
