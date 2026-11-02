import { NextRequest, NextResponse } from "next/server";
import { DelhiveryService } from "@/lib/services/delhivery";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitizePincode } from "@/lib/security/sanitize";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const rl = checkRateLimit(ip, { windowMs: 60 * 1000, maxRequests: 60, keyPrefix: "pincode" });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many pincode queries. Please wait a moment." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const { searchParams } = new URL(req.url);
    const rawPincode = searchParams.get("pincode");

    if (!rawPincode) {
      return NextResponse.json({ error: "Query parameter 'pincode' is required." }, { status: 400 });
    }

    const pincode = sanitizePincode(rawPincode);
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      return NextResponse.json(
        {
          serviceable: false,
          pincode,
          cod_available: false,
          prepaid_available: false,
          estimated_delivery_days: 0,
          error: "Invalid Indian Postal Index Number (Pincode). Must be 6 digits and cannot start with 0.",
        },
        { status: 400 }
      );
    }

    const result = await DelhiveryService.checkServiceability(pincode);
    return NextResponse.json(result);
  } catch (error: any) {
    logger.error("Delhivery pincode check failure", error);
    return NextResponse.json({ error: error.message || "Failed to check serviceability." }, { status: 500 });
  }
}
