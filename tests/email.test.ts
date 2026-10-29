import { describe, it, expect, beforeEach } from "vitest";
import { EmailService } from "@/lib/services/email";
import { db, dbStore } from "@/lib/db";

describe("LUMIÈRE Transactional Email Service & Outbox Pattern", () => {
  beforeEach(() => {
    db.reset();
  });

  it("should dispatch order confirmation email in fallback sandbox mode", async () => {
    const result = await EmailService.send({
      to: "patron@example.com",
      subject: "LUMIÈRE Order Confirmation #LUM-2026-100200",
      template: "order_confirmation",
      data: {
        orderNumber: "LUM-2026-100200",
        total: 12500,
      },
    });

    expect(result.success).toBe(true);
    expect(result.id).toBeDefined();
    expect(result.id).toMatch(/^dev-mail-/);
  });

  it("should dispatch shipment dispatch notification with waybill details", async () => {
    const result = await EmailService.send({
      to: "patron@example.com",
      subject: "LUMIÈRE Parcel Dispatched #LUM-2026-100200",
      template: "shipment_dispatched",
      data: {
        orderNumber: "LUM-2026-100200",
        waybill: "DEL-984719283741",
        trackingUrl: "https://lumiere.in/track-order?awb=DEL-984719283741",
      },
    });

    expect(result.success).toBe(true);
    expect(result.id).toBeDefined();
  });

  it("should queue order confirmation into resilient email outbox during order creation", async () => {
    const variant = await db.products.getVariantBySku("LUM-ETH-GUL-S-ROSE");
    expect(variant).toBeDefined();

    const orderRes = await db.orders.create({
      customerName: "Ananya Roy",
      customerEmail: "ananya.roy@example.com",
      customerPhone: "9820055443",
      shippingAddress: {
        full_name: "Ananya Roy",
        email: "ananya.roy@example.com",
        phone: "9820055443",
        address_line1: "Indiranagar 100ft Road",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
      },
      paymentMethod: "upi",
      items: [{ variantId: variant!.id, quantity: 1 }],
    });

    expect(orderRes.success).toBe(true);
    expect(orderRes.order).toBeDefined();

    // Verify transactional email outbox contains the queued order confirmation
    const outbox = await db.audit.getEmailOutbox();
    expect(outbox.length).toBeGreaterThanOrEqual(1);

    const queuedEmail = outbox.find((e) => e.recipient === "ananya.roy@example.com");
    expect(queuedEmail).toBeDefined();
    expect(queuedEmail?.template).toBe("order_confirmation");
    expect(queuedEmail?.status).toBe("queued");
    expect(queuedEmail?.subject).toContain(orderRes.order!.order_number);
    expect(queuedEmail?.payload.orderNumber).toBe(orderRes.order!.order_number);
  });
});
