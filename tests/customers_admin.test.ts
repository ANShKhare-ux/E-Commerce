import { describe, it, expect, beforeEach } from "vitest";
import { db } from "@/lib/db";
import { GET as getCustomers } from "@/app/api/admin/customers/route";
import { NextRequest } from "next/server";

describe("LUMIÈRE Admin Customer Management & LTV Aggregation", () => {
  beforeEach(() => {
    db.reset();
    process.env.ADMIN_EMAIL = "superadmin@lumiere.in";
  });

  it("should reject unauthenticated requests with 401 Unauthorized", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/customers", {
      method: "GET",
    });

    const res = await getCustomers(req);
    expect(res.status).toBe(401);

    const body = await res.json();
    expect(body.error).toContain("Unauthorized access");
  });

  it("should aggregate customer profiles, repeat buyer rates, and lifetime value when authorized", async () => {
    const variant1 = await db.products.getVariantBySku("LUM-LUX-KAN-FS-IVO");
    const variant2 = await db.products.getVariantBySku("LUM-ETH-GUL-S-ROSE");
    expect(variant1).toBeDefined();
    expect(variant2).toBeDefined();

    // Order 1: Patron Radhika (Order 1)
    await db.orders.create({
      customerName: "Radhika Merchant",
      customerEmail: "radhika@merchant.in",
      customerPhone: "9820011223",
      shippingAddress: {
        full_name: "Radhika Merchant",
        email: "radhika@merchant.in",
        phone: "9820011223",
        address_line1: "Altamount Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400026",
      },
      paymentMethod: "phonepe",
      items: [{ variantId: variant1!.id, quantity: 1 }],
    });

    // Order 2: Patron Radhika (Order 2 - Repeat Patron)
    await db.orders.create({
      customerName: "Radhika Merchant",
      customerEmail: "radhika@merchant.in",
      customerPhone: "9820011223",
      shippingAddress: {
        full_name: "Radhika Merchant",
        email: "radhika@merchant.in",
        phone: "9820011223",
        address_line1: "Altamount Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400026",
      },
      paymentMethod: "gpay",
      items: [{ variantId: variant2!.id, quantity: 1 }],
    });

    // Order 3: First-time Buyer Kabir
    await db.orders.create({
      customerName: "Kabir Singh",
      customerEmail: "kabir@singh.in",
      customerPhone: "9810012345",
      shippingAddress: {
        full_name: "Kabir Singh",
        email: "kabir@singh.in",
        phone: "9810012345",
        address_line1: "Civil Lines",
        city: "Delhi",
        state: "Delhi",
        pincode: "110054",
      },
      paymentMethod: "cod",
      items: [{ variantId: variant2!.id, quantity: 1 }],
    });

    // Invoke GET /api/admin/customers with admin header
    const req = new NextRequest("http://localhost:3000/api/admin/customers", {
      method: "GET",
      headers: {
        "x-lumiere-admin-email": "superadmin@lumiere.in",
      },
    });

    const res = await getCustomers(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.customers.length).toBe(2); // Radhika and Kabir

    // Check Metrics
    expect(body.metrics.totalCustomers).toBe(2);
    expect(body.metrics.repeatCustomerRate).toBe(50); // 1 out of 2 is repeat (50%)
    expect(body.metrics.totalGrossRevenue).toBeGreaterThan(0);

    // Verify Radhika's aggregation (VIP tier due to spend >= ₹50,000)
    const radhika = body.customers.find((c: any) => c.email === "radhika@merchant.in");
    expect(radhika).toBeDefined();
    expect(radhika.totalOrders).toBe(2);
    expect(radhika.tier).toBe("vip");
    expect(radhika.locations).toContain("Mumbai, Maharashtra");

    // Verify Kabir's aggregation
    const kabir = body.customers.find((c: any) => c.email === "kabir@singh.in");
    expect(kabir).toBeDefined();
    expect(kabir.totalOrders).toBe(1);
    expect(kabir.tier).toBe("new");
    expect(kabir.locations).toContain("Delhi, Delhi");
  });
});
