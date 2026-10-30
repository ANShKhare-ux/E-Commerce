import { describe, it, expect, beforeEach } from "vitest";
import { db } from "@/lib/db";
import { POST as returnPost } from "@/app/api/account/returns/route";
import { NextRequest } from "next/server";

describe("LUMIÈRE Customer Returns API Endpoint (/api/account/returns)", () => {
  beforeEach(() => {
    db.reset();
  });

  it("should successfully create a return request via API endpoint for valid order item", async () => {
    const variant = await db.products.getVariantBySku("LUM-ETH-GUL-S-ROSE");
    expect(variant).toBeDefined();

    // 1. Create order
    const orderRes = await db.orders.create({
      customerName: "Karan Johar",
      customerEmail: "karan@example.com",
      customerPhone: "9820099887",
      shippingAddress: {
        full_name: "Karan Johar",
        email: "karan@example.com",
        phone: "9820099887",
        address_line1: "Juhu Tara Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400049",
      },
      paymentMethod: "upi",
      items: [{ variantId: variant!.id, quantity: 1 }],
    });

    expect(orderRes.success).toBe(true);
    const order = orderRes.order!;
    const item = order.items[0];

    // 2. Invoke /api/account/returns POST handler
    const req = new NextRequest("http://localhost:3000/api/account/returns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.id,
        orderItemId: item.id,
        reason: "Fabric was darker than screen preview",
      }),
    });

    const res = await returnPost(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.returnRequest).toBeDefined();
    expect(data.returnRequest.status).toBe("requested");
    expect(data.returnRequest.return_tracking_number).toContain("RET-DEL-");
  });

  it("should reject return requests with missing fields or invalid order IDs", async () => {
    // Missing required fields
    const reqMissing = new NextRequest("http://localhost:3000/api/account/returns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: "ord-non-existent",
      }),
    });

    const resMissing = await returnPost(reqMissing);
    expect(resMissing.status).toBe(400);

    // Non-existent order
    const reqNotFound = new NextRequest("http://localhost:3000/api/account/returns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: "ord-does-not-exist",
        orderItemId: "item-123",
        reason: "Does not fit",
      }),
    });

    const resNotFound = await returnPost(reqNotFound);
    expect(resNotFound.status).toBe(404);
  });
});
