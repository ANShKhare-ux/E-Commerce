import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PaymentService } from "@/lib/services/payments";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { validatePaymentVerifyInput } from "@/lib/security/validator";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const rl = checkRateLimit(ip, { windowMs: 60 * 1000, maxRequests: 20, keyPrefix: "verify_pay" });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many verification attempts. Please wait a moment." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const validation = validatePaymentVerifyInput(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.errorMessage || "Missing payment verification parameters." },
        { status: 400 }
      );
    }

    const {
      orderId,
      paymentMethod,
      gatewayTransactionId,
      gatewayOrderId,
      signature,
      checksum,
    } = validation.data;

    const verification = PaymentService.verifyPayment({
      orderId,
      paymentMethod,
      gatewayTransactionId,
      gatewayOrderId,
      signature,
      checksum,
    });

    if (!verification.isValid) {
      return NextResponse.json({ error: verification.error || "Payment verification failed." }, { status: 400 });
    }

    // Update payment and order state authoritatively in persistent store
    const updateResult = await db.orders.updatePayment(orderId, "captured", "processing");
    if (!updateResult.success || !updateResult.order) {
      return NextResponse.json({ error: updateResult.error || "Order not found." }, { status: 404 });
    }
    const order = updateResult.order;

    return NextResponse.json({
      success: true,
      message: "Payment cryptographically verified and recorded via PhonePe.",
      order,
    });
  } catch (error: any) {
    logger.error("Payment verification failure", error);
    return NextResponse.json({ error: error.message || "Payment verification failed" }, { status: 500 });
  }
}
