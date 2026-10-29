import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PaymentService } from "@/lib/services/payments";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      paymentMethod = "phonepe",
      gatewayTransactionId,
      gatewayOrderId,
      signature,
      checksum,
    } = body;

    if (!orderId || !gatewayTransactionId) {
      return NextResponse.json({ error: "Missing payment verification parameters." }, { status: 400 });
    }

    const verification = PaymentService.verifyPayment({
      orderId,
      paymentMethod: paymentMethod as "phonepe" | "gpay" | "upi",
      gatewayTransactionId,
      gatewayOrderId,
      signature,
      checksum,
    });

    if (!verification.isValid) {
      return NextResponse.json({ error: verification.error || "Payment verification failed." }, { status: 400 });
    }

    const order = await db.orders.getById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Update payment and order state
    order.payment_status = "captured";
    order.order_status = "processing";
    order.updated_at = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: `Payment cryptographically verified and recorded via ${paymentMethod === "gpay" ? "Google Pay (GPay)" : "PhonePe"}.`,
      order,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Payment verification failed" }, { status: 500 });
  }
}
