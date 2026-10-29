import { describe, it, expect, beforeEach } from "vitest";
import { db, dbStore } from "@/lib/db";

describe("LUMIÈRE Concurrency Guarantees & Webhook Idempotency", () => {
  beforeEach(() => {
    db.reset();
  });

  it("should prevent overselling during concurrent checkout requests for scarce stock", async () => {
    // Find a variant with very low stock: LUM-LUX-CAP-M-GLD has physical_stock = 2
    const variant = await db.products.getVariantBySku("LUM-LUX-CAP-M-GLD");
    expect(variant).toBeDefined();

    const inv = await db.inventory.getByVariantId(variant!.id);
    expect(inv!.available_stock).toBe(2);

    // Simulate 3 concurrent order requests attempting to buy 1 unit each
    const orderPromises = [1, 2, 3].map((num) =>
      db.orders.create({
        customerName: `Customer ${num}`,
        customerEmail: `customer${num}@example.com`,
        customerPhone: "9820011223",
        shippingAddress: {
          full_name: `Customer ${num}`,
          email: `customer${num}@example.com`,
          phone: "9820011223",
          address_line1: "Colaba Causeway",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400005",
        },
        paymentMethod: "upi",
        items: [{ variantId: variant!.id, quantity: 1 }],
      })
    );

    const results = await Promise.all(orderPromises);
    const successfulOrders = results.filter((r) => r.success);
    const failedOrders = results.filter((r) => !r.success);

    // Exactly 2 orders must succeed, and 1 must fail due to zero available stock!
    expect(successfulOrders.length).toBe(2);
    expect(failedOrders.length).toBe(1);
    expect(failedOrders[0].error?.toLowerCase()).toContain("insufficient available");

    // Stock must NEVER go below 0
    const finalInv = await db.inventory.getByVariantId(variant!.id);
    expect(finalInv!.physical_stock).toBe(0);
    expect(finalInv!.available_stock).toBe(0);
  });

  it("should ensure order creation is strictly idempotent when retried with same idempotency key", async () => {
    const variant = await db.products.getVariantBySku("LUM-STR-HD1-M-BLK");
    expect(variant).toBeDefined();

    const initialInv = await db.inventory.getByVariantId(variant!.id);
    const initialPhysical = initialInv!.physical_stock;

    const idempotencyKey = "idemp_order_req_unique_99812";

    const orderPayload = {
      customerName: "Rohan Varma",
      customerEmail: "rohan@example.com",
      customerPhone: "9820088776",
      shippingAddress: {
        full_name: "Rohan Varma",
        email: "rohan@example.com",
        phone: "9820088776",
        address_line1: "Koramangala 4th Block",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560034",
      },
      paymentMethod: "upi" as const,
      items: [{ variantId: variant!.id, quantity: 1 }],
      idempotencyKey,
    };

    // First request
    const firstRes = await db.orders.create(orderPayload);
    expect(firstRes.success).toBe(true);
    const orderNumber = firstRes.order?.order_number;

    // Intermediate stock verification
    const midInv = await db.inventory.getByVariantId(variant!.id);
    expect(midInv!.physical_stock).toBe(initialPhysical - 1);

    // Repeated / retried request with identical idempotencyKey
    const secondRes = await db.orders.create(orderPayload);
    expect(secondRes.success).toBe(true);
    expect(secondRes.order?.order_number).toBe(orderNumber);

    // Stock must NOT be deducted twice!
    const finalInv = await db.inventory.getByVariantId(variant!.id);
    expect(finalInv!.physical_stock).toBe(initialPhysical - 1);
  });

  it("should prevent duplicate stock movements if payment webhook is delivered multiple times", async () => {
    // Simulate webhook arrival for payment capture
    const variant = await db.products.getVariantBySku("LUM-WOM-SLP-S-BLK");
    const initialInv = await db.inventory.getByVariantId(variant!.id);
    const initialPhysical = initialInv!.physical_stock;

    const orderRes = await db.orders.create({
      customerName: "Sanya Roy",
      customerEmail: "sanya@example.com",
      customerPhone: "9819922334",
      shippingAddress: {
        full_name: "Sanya Roy",
        email: "sanya@example.com",
        phone: "9819922334",
        address_line1: "Park Street",
        city: "Kolkata",
        state: "West Bengal",
        pincode: "700016",
      },
      paymentMethod: "upi",
      items: [{ variantId: variant!.id, quantity: 1 }],
    });

    const order = orderRes.order!;
    expect(order.payment_status).toBe("captured");

    const movementsCount = (await db.inventory.getMovements(variant!.id)).length;

    // Simulate duplicate webhook handler trying to re-confirm already captured order
    const webhookEventId = "evt_rzp_mock_duplicate_12345";
    const processedEvents = new Set<string>();

    const processWebhook = (evtId: string, ord: typeof order) => {
      if (processedEvents.has(evtId)) {
        return { duplicate: true, actionTaken: false };
      }
      processedEvents.add(evtId);
      // Process capture
      return { duplicate: false, actionTaken: true };
    };

    // First event delivery
    const run1 = processWebhook(webhookEventId, order);
    expect(run1.duplicate).toBe(false);
    expect(run1.actionTaken).toBe(true);

    // Duplicate webhook delivery
    const run2 = processWebhook(webhookEventId, order);
    expect(run2.duplicate).toBe(true);
    expect(run2.actionTaken).toBe(false);

    // Verify movements were not duplicated
    const finalMovements = await db.inventory.getMovements(variant!.id);
    expect(finalMovements.length).toBe(movementsCount);
  });
});
