import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuthorization, getPrimaryAdminEmail } from "@/lib/auth/admin";

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuthorization(req.headers);
    const body = await req.json();
    const { orderId, action, status, reason, adminEmail } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    const email = auth.email || adminEmail || getPrimaryAdminEmail();

    if (action === "cancel") {
      if (!reason || reason.trim().length === 0) {
        return NextResponse.json({ error: "Cancellation reason is required." }, { status: 400 });
      }

      const result = await db.orders.cancel(orderId, reason.trim(), email);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: "Order cancelled and stock restored to inventory." });
    }

    if (action === "update_status") {
      if (!status) {
        return NextResponse.json({ error: "New status is required." }, { status: 400 });
      }

      const result = await db.orders.updateStatus(orderId, status, email);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: `Order status updated to ${status}.` });
    }

    if (action === "mark_cod_paid") {
      const order = await db.orders.getById(orderId);
      if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

      order.payment_status = "captured";
      order.updated_at = new Date().toISOString();

      return NextResponse.json({ success: true, message: "COD payment marked as collected." });
    }

    return NextResponse.json({ error: "Invalid action specified." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update order status." }, { status: 500 });
  }
}
