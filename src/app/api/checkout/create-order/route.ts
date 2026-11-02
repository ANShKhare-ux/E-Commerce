import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PaymentService } from "@/lib/services/payments";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { validateCheckoutOrderInput } from "@/lib/security/validator";
import { sanitizeText } from "@/lib/security/sanitize";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const rl = checkRateLimit(ip, { windowMs: 60 * 1000, maxRequests: 30, keyPrefix: "checkout" });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many checkout requests. Please wait a moment before trying again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const validation = validateCheckoutOrderInput(body);
    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.errorMessage || "Invalid checkout payload." },
        { status: 400 }
      );
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress: sanitizedAddress,
      paymentMethod,
      items,
      reservationIds,
      idempotencyKey,
      couponCode,
    } = validation.data;

    // 1. Create order and atomically finalize inventory deduction
    const orderResult = await db.orders.create({
      customerName: sanitizeText(customerName),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone,
      shippingAddress: sanitizedAddress,
      paymentMethod,
      items,
      reservationIds,
      idempotencyKey: idempotencyKey || req.headers.get("idempotency-key") || undefined,
      couponCode: couponCode ? String(couponCode).trim() : undefined,
    });

    if (!orderResult.success || !orderResult.order) {
      return NextResponse.json({ error: orderResult.error || "Order creation failed" }, { status: 409 });
    }

    const order = orderResult.order;

    // 2. If prepaid (PhonePe), initialize gateway order
    let gatewayOrder = null;
    if (paymentMethod !== "cod") {
      gatewayOrder = await PaymentService.createGatewayOrder({
        orderNumber: order.order_number,
        amountInINR: order.total_amount,
        paymentMethod,
        customerEmail: order.customer_email,
        customerPhone: order.customer_phone,
      });
    }

    return NextResponse.json({
      success: true,
      order,
      gatewayOrder,
    });
  } catch (error: any) {
    logger.error("Order placement error", error);
    return NextResponse.json({ error: error.message || "Failed to process order" }, { status: 500 });
  }
}
