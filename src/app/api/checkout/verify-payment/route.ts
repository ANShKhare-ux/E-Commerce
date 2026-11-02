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
      paymentMethod: paymentMethod as "phonepe" | "upi",
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
    return NextResponse.json({ error: error.message || "Payment verification failed" }, { status: 500 });
  }
}
