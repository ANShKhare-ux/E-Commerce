import { describe, it, expect, beforeEach } from "vitest";
import { db } from "@/lib/db";
import { DelhiveryService } from "@/lib/services/delhivery";
import { EmailService } from "@/lib/services/email";

describe("LUMIÈRE End-to-End Customer Purchase & Fulfillment Lifecycle", () => {
  beforeEach(() => {
    db.reset();
  });

  it("should complete full customer journey from catalog discovery to Delhivery dispatch", async () => {
    // 1. DISCOVERY: Customer browses catalog for Ethnic Wear
    const catalog = await db.products.getAll({ category: "ethnic-wear" });
    expect(catalog.length).toBeGreaterThan(0);

    const product = catalog.find((p) => p.slug === "chanderi-silk-anarkali-set-gulabi");
    expect(product).toBeDefined();
    expect(product?.name).toContain("Gulabi");

    // 2. VARIANT SELECTION: Select Size S variant
    const selectedVariant = product!.variants.find((v) => v.size === "S");
    expect(selectedVariant).toBeDefined();

    const initialInv = await db.inventory.getByVariantId(selectedVariant!.id);
    expect(initialInv).toBeDefined();
    const initialPhysical = initialInv!.physical_stock;
    const initialAvailable = initialInv!.available_stock;

    // 3. CART & RESERVATION: Customer adds to bag and initiates checkout
    const sessionId = "session_e2e_patron_mumbai_991";
    const reservationRes = await db.inventory.reserveStock(
      sessionId,
      selectedVariant!.id,
      1,
      15 // 15-minute checkout reservation hold
    );
    expect(reservationRes.success).toBe(true);
    expect(reservationRes.reservationId).toBeDefined();

    // Verify hold reflected in available stock
    const holdingInv = await db.inventory.getByVariantId(selectedVariant!.id);
    expect(holdingInv!.reserved_stock).toBe(initialInv!.reserved_stock + 1);
    expect(holdingInv!.available_stock).toBe(initialAvailable - 1);

    // 4. LOGISTICS SERVICEABILITY CHECK: Customer enters Mumbai delivery PIN code
    const deliveryPincode = "400050"; // Bandra West
    const pincodeCheck = await DelhiveryService.checkServiceability(deliveryPincode);
    expect(pincodeCheck.serviceable).toBe(true);
    expect(pincodeCheck.city).toBe("Mumbai");

    // 5. CHECKOUT & PAYMENT: Customer places order via Razorpay UPI
    const orderRes = await db.orders.create({
      customerName: "Radhika Merchant",
      customerEmail: "radhika@merchant.in",
      customerPhone: "9820098765",
      shippingAddress: {
        full_name: "Radhika Merchant",
        email: "radhika@merchant.in",
        phone: "9820098765",
        address_line1: "Pali Hill, Nargis Dutt Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: deliveryPincode,
      },
      paymentMethod: "upi",
      items: [{ variantId: selectedVariant!.id, quantity: 1 }],
      reservationIds: [reservationRes.reservationId!],
    });

    expect(orderRes.success).toBe(true);
    const order = orderRes.order!;
    expect(order.order_status).toBe("processing");
    expect(order.payment_status).toBe("captured");
    expect(order.total_amount).toBe(selectedVariant!.price);

    // 6. INVENTORY FINALIZATION: Physical stock deducted, reservation closed
    const finalizedInv = await db.inventory.getByVariantId(selectedVariant!.id);
    expect(finalizedInv!.physical_stock).toBe(initialPhysical - 1);

    // 7. DELHIVERY SHIPMENT CREATION: Atelier generates shipping manifest & waybill
    const shipmentRes = await db.shipments.createForOrder(order.id);
    expect(shipmentRes.success).toBe(true);
    const shipment = shipmentRes.shipment!;
    expect(shipment.waybill).toBeDefined();
    expect(shipment.carrier).toBe("delhivery");
    expect(shipment.status).toBe("manifested");

    // 8. TRANSACTIONAL NOTIFICATIONS: Send order confirmation email
    const emailRes = await EmailService.send({
      to: order.customer_email,
      subject: `LUMIÈRE Order Confirmation #${order.order_number}`,
      template: "order_confirmation",
      data: {
        orderNumber: order.order_number,
        total: order.total_amount,
        items: order.items,
        waybill: shipment.waybill,
      },
    });
    expect(emailRes.success).toBe(true);

    // 9. PATRON ACCOUNT LOOKUP: Verify order appears in customer's order history
    const customerOrders = await db.orders.getAll({ customerEmail: "radhika@merchant.in" });
    expect(customerOrders.length).toBe(1);
    expect(customerOrders[0].order_number).toBe(order.order_number);
    expect(customerOrders[0].order_status).toBe("shipped");
  });
});
