import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { validateReservationInput } from "@/lib/security/validator";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const rl = checkRateLimit(ip, { windowMs: 60 * 1000, maxRequests: 60, keyPrefix: "reserve" });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many reservation requests. Please wait a moment." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const validation = validateReservationInput(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.errorMessage || "Invalid reservation parameters." },
        { status: 400 }
      );
    }

    const { sessionId, variantId, quantity } = validation.data;
    const result = await db.inventory.reserveStock(sessionId, variantId, quantity, 15);

    if (!result.success) {
      return NextResponse.json(result, { status: 409 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    logger.error("Inventory reservation failure", error);
    return NextResponse.json({ error: error.message || "Failed to reserve stock" }, { status: 500 });
  }
}
