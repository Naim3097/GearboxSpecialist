import { NextRequest, NextResponse } from "next/server";

/**
 * First-party conversion event sink. Receives workshop_click beacons so we
 * own the raw event stream independent of any tag manager. Wire this to a
 * real store (Tinybird, BigQuery, Vercel KV…) when analytics infra lands;
 * the client contract stays stable.
 */
export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    if (process.env.NODE_ENV !== "production") {
      console.log("[track]", event?.type, event);
    }
    // TODO(analytics): forward to the event store once chosen.
  } catch {
    // Malformed beacons are dropped silently — never surface errors to the client.
  }
  return new NextResponse(null, { status: 204 });
}
