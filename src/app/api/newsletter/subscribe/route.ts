import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { validateNewsletterInput } from "@/lib/security/validator";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const rl = checkRateLimit(ip, { windowMs: 60 * 1000, maxRequests: 10, keyPrefix: "newsletter" });
    if (!rl.success) {
      return NextResponse.json(
        { success: false, message: "Too many subscription attempts. Please wait a moment." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const validation = validateNewsletterInput(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, message: validation.errorMessage || "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await db.newsletter.subscribe(validation.data.email);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    logger.error("Newsletter subscription failure", error);
    return NextResponse.json({ success: false, message: "Subscription failed. Please try again." }, { status: 500 });
  }
}
