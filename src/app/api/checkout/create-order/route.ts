import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PaymentService } from "@/lib/services/razorpay";

export async function POST(req: NextRequest) {
  try {
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

    // Validate Indian phone number (10 digits)
    const cleanPhone = customerPhone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Please enter a valid 10-digit Indian phone number." }, { status: 400 });
    }

    // Validate 6-digit Indian Postal Code
    if (!/^[1-9][0-9]{5}$/.test(shippingAddress.pincode)) {
      return NextResponse.json({ error: "Please enter a valid 6-digit Indian PIN code." }, { status: 400 });
    }

    // 1. Create order and atomically finalize inventory deduction
    const orderResult = await db.orders.create({
      customerName,
      customerEmail,
      customerPhone: cleanPhone,
      shippingAddress,
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

    // 2. If prepaid (UPI or Card), initialize gateway order
    let gatewayOrder = null;
    if (paymentMethod !== "cod") {
      gatewayOrder = await PaymentService.createGatewayOrder({
        orderNumber: order.order_number,
        amountInINR: order.total_amount,
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
