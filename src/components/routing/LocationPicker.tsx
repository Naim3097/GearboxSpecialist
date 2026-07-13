"use client";

import { useSyncExternalStore } from "react";
import { getWorkshops, resolveWorkshop } from "@/lib/routing";
import { getDict } from "@/lib/i18n";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getStoredLocation, getServerLocation, storeLocation, subscribeLocation } from "@/lib/location";

/**
 * Region picker — a dropdown with one entry per workshop region, built from
 * workshops.json (a third workshop becomes a third option automatically).
 * The remembered choice shows HERE, as the selected value, never by mutating
 * button text after hydration — that's what caused the "old version is back"
 * flicker. Legacy stored area slugs (from location pages) still select the
 * right region because they resolve through the same routing matcher.
 */
export function LocationPicker({ onRed = false }: { onRed?: boolean }) {
  const locale = useLocale();
  const t = getDict(locale);
  const stored = useSyncExternalStore(subscribeLocation, getStoredLocation, getServerLocation);
  const options = getWorkshops().filter((w) => w.pickerValue && w.pickerLabel);

  // Map whatever is stored (region value or legacy area slug) to a region option.
  const activeId = stored ? resolveWorkshop({ location: stored }).id : null;
  const value = options.find((w) => w.id === activeId)?.pickerValue ?? "";

  return (
    <label
      className={`flex items-center gap-3 font-tech text-[12px] uppercase tracking-[0.1em] ${
        onRed ? "text-white/70" : "text-muted"
      }`}
    >
      <span className="whitespace-nowrap">
        <span className={onRed ? "text-white" : "text-red"}>/</span> {t.yourArea}
      </span>
      <select
        value={value}
        onChange={(e) => {
          if (e.target.value) storeLocation(e.target.value);
        }}
        aria-label={t.yourArea}
        className={`cursor-pointer border-b-2 bg-transparent py-1 pr-6 font-tech text-[13px] uppercase outline-none transition-colors ${
          onRed
            ? "border-white/40 text-white focus:border-white"
            : "border-line-hi text-fog focus:border-red"
        }`}
      >
        <option value="" className="bg-panel text-fog">
          {t.select}
        </option>
        {options.map((w) => (
          <option key={w.id} value={w.pickerValue} className="bg-panel text-fog">
            {w.pickerLabel?.[locale] ?? w.pickerLabel?.en}
          </option>
        ))}
      </select>
    </label>
  );
}
