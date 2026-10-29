import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PaymentService } from "@/lib/services/payments";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitizeText, sanitizeIndianPhone, sanitizePincode } from "@/lib/security/sanitize";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const rl = checkRateLimit(ip, { windowMs: 60 * 1000, maxRequests: 30, keyPrefix: "checkout" });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many checkout requests. Please wait a moment before trying again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
      items,
      reservationIds,
      idempotencyKey,
      couponCode,
    } = body;

    // Validation
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !paymentMethod || !items?.length) {
      return NextResponse.json({ error: "Missing required checkout fields." }, { status: 400 });
    }

    if (!["phonepe", "gpay", "upi", "cod"].includes(paymentMethod)) {
      return NextResponse.json({ error: "Invalid payment method. Choose PhonePe, Google Pay (GPay), or Cash on Delivery." }, { status: 400 });
    }

    // Sanitize & Validate Indian phone number (10 digits)
    const cleanPhone = sanitizeIndianPhone(customerPhone);
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Please enter a valid 10-digit Indian phone number." }, { status: 400 });
    }

    // Sanitize & Validate 6-digit Indian Postal Code
    const cleanPincode = sanitizePincode(shippingAddress.pincode);
    if (!/^[1-9][0-9]{5}$/.test(cleanPincode)) {
      return NextResponse.json({ error: "Please enter a valid 6-digit Indian PIN code." }, { status: 400 });
    }

    const sanitizedAddress = {
      full_name: sanitizeText(shippingAddress.full_name || customerName),
      email: customerEmail.trim().toLowerCase(),
      phone: cleanPhone,
      address_line1: sanitizeText(shippingAddress.address_line1),
      address_line2: shippingAddress.address_line2 ? sanitizeText(shippingAddress.address_line2) : undefined,
      city: sanitizeText(shippingAddress.city),
      state: sanitizeText(shippingAddress.state),
      pincode: cleanPincode,
    };

    // 1. Create order and atomically finalize inventory deduction
    const orderResult = await db.orders.create({
      customerName: sanitizeText(customerName),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: cleanPhone,
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

    // 2. If prepaid (PhonePe or GPay), initialize gateway order
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
    console.error("Order placement error:", error);
    return NextResponse.json({ error: error.message || "Failed to process order" }, { status: 500 });
  }
}
