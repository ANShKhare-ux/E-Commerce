import { describe, it, expect, beforeEach } from "vitest";
import { db } from "@/lib/db";

describe("LUMIÈRE Order Processing & Cancellation Lifecycle", () => {
  beforeEach(() => {
    db.reset();
  });

  it("should atomically deduct stock upon order placement", async () => {
    const variant = await db.products.getVariantBySku("LUM-WOM-TRN-S-IVO");
    expect(variant).toBeDefined();

    const initialInv = await db.inventory.getByVariantId(variant!.id);
    const initialPhysical = initialInv!.physical_stock;

    const orderRes = await db.orders.create({
      customerName: "Pooja Hegde",
      customerEmail: "pooja@example.com",
      customerPhone: "9820011223",
      shippingAddress: {
        full_name: "Pooja Hegde",
        email: "pooja@example.com",
        phone: "9820011223",
        address_line1: "Bandra West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
      },
      paymentMethod: "upi",
      items: [{ variantId: variant!.id, quantity: 2 }],
    });

    expect(orderRes.success).toBe(true);
    expect(orderRes.order).toBeDefined();
    expect(orderRes.order?.order_status).toBe("processing");
    expect(orderRes.order?.payment_status).toBe("captured");

    // Verify physical stock deduction
    const afterInv = await db.inventory.getByVariantId(variant!.id);
    expect(afterInv!.physical_stock).toBe(initialPhysical - 2);

    // Verify sale deduction movement entry
    const movements = await db.inventory.getMovements(variant!.id);
    const saleMove = movements.find((m) => m.movement_type === "sale_deduction");
    expect(saleMove).toBeDefined();
    expect(saleMove?.quantity_change).toBe(-2);
  });

  it("should handle Cash on Delivery with separate pending payment state", async () => {
    const variant = await db.products.getVariantBySku("LUM-STR-HD1-L-BLK");
    expect(variant).toBeDefined();

    const orderRes = await db.orders.create({
      customerName: "Vikram Malhotra",
      customerEmail: "vikram@example.com",
      customerPhone: "9910022334",
      shippingAddress: {
        full_name: "Vikram Malhotra",
        email: "vikram@example.com",
        phone: "9910022334",
        address_line1: "Golf Links",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110003",
      },
      paymentMethod: "cod",
      items: [{ variantId: variant!.id, quantity: 1 }],
    });

    expect(orderRes.success).toBe(true);
    const order = orderRes.order!;
    expect(order.payment_method).toBe("cod");
    expect(order.payment_status).toBe("pending"); // COD MUST NOT be marked paid upfront!
    expect(order.order_status).toBe("confirmed");
  });

  it("should restore physical stock atomically upon order cancellation", async () => {
    const variant = await db.products.getVariantBySku("LUM-ETH-EMR-M-GRN");
    expect(variant).toBeDefined();

    const initialInv = await db.inventory.getByVariantId(variant!.id);
    const initialPhysical = initialInv!.physical_stock;

    // 1. Create order
    const orderRes = await db.orders.create({
      customerName: "Ayesha Sen",
      customerEmail: "ayesha@example.com",
      customerPhone: "9830012345",
      shippingAddress: {
        full_name: "Ayesha Sen",
        email: "ayesha@example.com",
        phone: "9830012345",
        address_line1: "Alipore",
        city: "Kolkata",
        state: "West Bengal",
        pincode: "700027",
      },
      paymentMethod: "upi",
      items: [{ variantId: variant!.id, quantity: 1 }],
    });

    const order = orderRes.order!;
    const intermediateInv = await db.inventory.getByVariantId(variant!.id);
    expect(intermediateInv!.physical_stock).toBe(initialPhysical - 1);

    // 2. Cancel order
    const cancelRes = await db.orders.cancel(order.id, "Customer requested size modification", "admin@lumiere.in");
    expect(cancelRes.success).toBe(true);

    // 3. Verify stock is restored
    const finalInv = await db.inventory.getByVariantId(variant!.id);
    expect(finalInv!.physical_stock).toBe(initialPhysical);

    // 4. Verify cancellation movement
    const movements = await db.inventory.getMovements(variant!.id);
    const restoreMove = movements.find((m) => m.movement_type === "cancellation_restore");
    expect(restoreMove).toBeDefined();
    expect(restoreMove?.quantity_change).toBe(1);
  });

  it("should only restock returned items AFTER receipt and physical inspection", async () => {
    const variant = await db.products.getVariantBySku("LUM-MEN-GRK-M-OLV");
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

    const order = orderRes.order!;
    const item = order.items[0];

    // Check stock after sale
    const invAfterSale = await db.inventory.getByVariantId(variant!.id);
    const stockAfterSale = invAfterSale!.physical_stock;

    // 2. Initiate return request
    const returnRes = await db.returns.create(order.id, item.id, "Fit was slightly loose at waist");
    expect(returnRes.success).toBe(true);
    const returnReq = returnRes.returnRequest!;
    expect(returnReq.status).toBe("requested");

    // Stock should NOT be modified yet!
    const invCheck1 = await db.inventory.getByVariantId(variant!.id);
    expect(invCheck1!.physical_stock).toBe(stockAfterSale);

    // 3. Perform physical inspection and restock
    const inspectRes = await db.returns.inspectAndRestock(
      returnReq.id,
      "Item received at Mumbai hub. Tags attached, unworn, fabric pristine. Restocked.",
      "inspector@lumiere.in"
    );
    expect(inspectRes.success).toBe(true);

    // Stock is NOW restocked
    const invCheck2 = await db.inventory.getByVariantId(variant!.id);
    expect(invCheck2!.physical_stock).toBe(stockAfterSale + 1);

    // Re-inspecting same return should fail
    const duplicateInspect = await db.returns.inspectAndRestock(returnReq.id, "Second inspect", "inspector@lumiere.in");
    expect(duplicateInspect.success).toBe(false);
  });

  it("should validate and apply genuine coupon discount authoritatively", async () => {
    const variant = await db.products.getVariantBySku("LUM-ETH-GUL-S-ROSE");
    expect(variant).toBeDefined();

    // Base price is 6990
    // Coupon FESTIVE500 gives ₹500 off for orders >= 2999
    const orderRes = await db.orders.create({
      customerName: "Rhea Kapoor",
      customerEmail: "rhea@example.com",
      customerPhone: "9820055443",
      shippingAddress: {
        full_name: "Rhea Kapoor",
        email: "rhea@example.com",
        phone: "9820055443",
        address_line1: "Juhu Scheme",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400049",
      },
      paymentMethod: "upi",
      items: [{ variantId: variant!.id, quantity: 1 }],
      couponCode: "FESTIVE500",
    });

    expect(orderRes.success).toBe(true);
    const order = orderRes.order!;
    expect(order.subtotal).toBe(6990);
    expect(order.discount_amount).toBe(500);
    expect(order.coupon_code).toBe("FESTIVE500");
    // Free shipping applies as subtotal >= 2999
    expect(order.shipping_fee).toBe(0);
    expect(order.total_amount).toBe(6490); // 6990 - 500
  });

  it("should authoritatively reject order creation if coupon code does not meet minimum order value", async () => {
    // LUM-MEN-POL-S-SND price is 3690
    // Coupon VIP20 requires min_order_value: 4999
    const variant = await db.products.getVariantBySku("LUM-MEN-POL-S-SND");
    expect(variant).toBeDefined();

    const orderRes = await db.orders.create({
      customerName: "Siddharth Roy",
      customerEmail: "sid@example.com",
      customerPhone: "9820011223",
      shippingAddress: {
        full_name: "Siddharth Roy",
        email: "sid@example.com",
        phone: "9820011223",
        address_line1: "Powai",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400076",
      },
      paymentMethod: "upi",
      items: [{ variantId: variant!.id, quantity: 1 }],
      couponCode: "VIP20", // requires 4999, subtotal is 3690
    });

    expect(orderRes.success).toBe(false);
    expect(orderRes.error).toContain("Minimum bag value");
  });

  it("should authoritatively reject order creation if coupon code is completely invalid", async () => {
    const variant = await db.products.getVariantBySku("LUM-ETH-GUL-S-ROSE");
    expect(variant).toBeDefined();

    const orderRes = await db.orders.create({
      customerName: "Tara Sharma",
      customerEmail: "tara@example.com",
      customerPhone: "9820077889",
      shippingAddress: {
        full_name: "Tara Sharma",
        email: "tara@example.com",
        phone: "9820077889",
        address_line1: "Khar West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400052",
      },
      paymentMethod: "upi",
      items: [{ variantId: variant!.id, quantity: 1 }],
      couponCode: "FAKECOUPON999",
    });

    expect(orderRes.success).toBe(false);
    expect(orderRes.error).toContain("Invalid coupon");
  });
});

