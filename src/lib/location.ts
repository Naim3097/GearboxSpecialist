"use client";

/**
 * Location memory. The visitor's chosen area persists across pages so every
 * CTA routes to the nearest workshop. Exposed as an external store so
 * components consume it via useSyncExternalStore.
 */

const KEY = "gs-location";
const EVENT = "gs:location";

export function getStoredLocation(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function storeLocation(slug: string): void {
  try {
    window.localStorage.setItem(KEY, slug);
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // Private mode etc. — degrade silently.
  }
}

export function subscribeLocation(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

/** Server-render snapshot: no location known until the client hydrates. */
export function getServerLocation(): string | null {
  return null;
}
