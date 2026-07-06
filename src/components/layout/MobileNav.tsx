"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/components/layout/Header";
import { WorkshopLink } from "@/components/routing/WorkshopLink";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
      >
        <span
          className={`h-[2px] w-6 bg-fog transition-transform duration-200 ${open ? "translate-y-[4px] rotate-45" : ""}`}
        />
        <span
          className={`h-[2px] w-6 bg-red transition-transform duration-200 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-[67px] border-b border-line bg-carbon">
          <nav className="mx-auto max-w-7xl px-4 py-6 sm:px-6" aria-label="Mobile">
            <ul>
              {navItems.map((item, i) => (
                <li key={item.href} className="border-b border-line last:border-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-4"
                  >
                    <span className="font-tech text-[11px] text-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl text-fog transition-colors group-hover:text-red-hot">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <WorkshopLink
                placement="mobile-nav"
                className="clip-btn block bg-red px-6 py-4 text-center font-tech text-[14px] font-semibold uppercase tracking-[0.14em] text-white"
              >
                Book a diagnosis
              </WorkshopLink>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
