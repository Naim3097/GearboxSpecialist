"use client";

import { useEffect } from "react";
import { storeLocation, getStoredLocation } from "@/lib/location";

/**
 * Visiting a location page is an implicit location choice. Remember it so
 * every subsequent CTA routes to the right workshop — but never overwrite
 * an explicit choice the visitor already made.
 */
export function SetLocation({ slug }: { slug: string }) {
  useEffect(() => {
    if (!getStoredLocation()) storeLocation(slug);
  }, [slug]);
  return null;
}
