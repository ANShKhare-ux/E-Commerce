import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DelhiveryService } from "@/lib/services/delhivery";
import { EmailService } from "@/lib/services/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    const order = await db.orders.getById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Call Delhivery API or Sandbox Service
    const delhiveryRes = await DelhiveryService.createShipment({
      order_number: order.order_number,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_email: order.customer_email,
      shipping_address: order.shipping_address,
      total_amount: order.total_amount,
      payment_method: order.payment_method,
      items_count: order.items.reduce((sum, i) => sum + i.quantity, 0),
    });

    if (!delhiveryRes.success) {
      return NextResponse.json({ error: delhiveryRes.error || "Failed to book shipment" }, { status: 502 });
    }

    // Create internal shipment record
    const shipmentRecord = await db.shipments.createForOrder(order.id, delhiveryRes.waybill);

    // Notify customer with live tracking details
    await EmailService.send({
      to: order.customer_email,
      subject: `LUMIÈRE Dispatch Notice: Tracking for ${order.order_number}`,
      template: "shipment_dispatched",
      data: {
        orderNumber: order.order_number,
        waybill: delhiveryRes.waybill,
        trackingUrl: `/track-order?waybill=${delhiveryRes.waybill}`,
      },
    });

    return NextResponse.json({
      success: true,
      shipment: shipmentRecord.shipment,
      waybill: delhiveryRes.waybill,
      labelUrl: delhiveryRes.labelUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate shipment" }, { status: 500 });
  }
}
