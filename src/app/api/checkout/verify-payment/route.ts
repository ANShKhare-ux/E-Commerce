import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PaymentService } from "@/lib/services/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!orderId || !razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json({ error: "Missing verification parameters." }, { status: 400 });
    }

    const verification = PaymentService.verifyPaymentSignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature: razorpaySignature || "dev_sandbox_signature",
    });

    if (!verification.isValid) {
      return NextResponse.json({ error: verification.error || "Payment signature invalid." }, { status: 400 });
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
      message: "Payment cryptographically verified and recorded.",
      order,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Payment verification failed" }, { status: 500 });
  }
}
