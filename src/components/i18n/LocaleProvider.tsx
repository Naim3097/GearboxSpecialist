"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/config/site";

const LocaleContext = createContext<Locale>("en");

/** Provides the current locale to client components (WorkshopLink, pickers…). */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
