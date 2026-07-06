"use client";

import { useSyncExternalStore } from "react";
import { locations } from "@/data/locations";
import { getStoredLocation, getServerLocation, storeLocation, subscribeLocation } from "@/lib/location";

/**
 * Lets the visitor set their area once; every CTA on the site then routes
 * to the nearest workshop. Choice persists in localStorage.
 */
export function LocationPicker() {
  const value = useSyncExternalStore(subscribeLocation, getStoredLocation, getServerLocation) ?? "";

  return (
    <label className="flex items-center gap-3 font-tech text-[12px] uppercase tracking-[0.1em] text-muted">
      <span className="whitespace-nowrap">
        <span className="text-red">/</span> Your area
      </span>
      <select
        value={value}
        onChange={(e) => {
          if (e.target.value) storeLocation(e.target.value);
        }}
        className="cursor-pointer border-b-2 border-line-hi bg-transparent py-1 pr-6 font-tech text-[13px] uppercase text-fog outline-none transition-colors focus:border-red"
        aria-label="Choose your area to find the nearest workshop"
      >
        <option value="" className="bg-panel text-fog">
          Select
        </option>
        {locations.map((l) => (
          <option key={l.slug} value={l.slug} className="bg-panel text-fog">
            {l.name}
          </option>
        ))}
      </select>
    </label>
  );
}
