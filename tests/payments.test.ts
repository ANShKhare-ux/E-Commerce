import { describe, it, expect, beforeEach } from "vitest";
import { PaymentService } from "@/lib/services/payments";
import { POST as createOrderRoute } from "@/app/api/checkout/create-order/route";
import { POST as verifyPaymentRoute } from "@/app/api/checkout/verify-payment/route";
import { NextRequest } from "next/server";
import crypto from "crypto";

describe("LUMIÈRE Indian Payment Gateway Verification (PhonePe UPI & Checkout)", () => {
  beforeEach(() => {
    delete process.env.PHONEPE_SALT_KEY;
    delete process.env.PHONEPE_SALT_INDEX;
    delete process.env.PHONEPE_MERCHANT_ID;
  });

  it("should create PhonePe gateway order with INR and paise amount conversion", async () => {
    const order = await PaymentService.createGatewayOrder({
      orderNumber: "LUM-TEST-001",
      amountInINR: 6990, // ₹6,990
      paymentMethod: "phonepe",
      customerEmail: "client@lumiere.in",
      customerPhone: "9820012345",
    });

    expect(order.success).toBe(true);
    expect(order.amountInPaise).toBe(699000); // 699,000 paise
    expect(order.amountInINR).toBe(6990);
    expect(order.currency).toBe("INR");
    expect(order.provider).toBe("phonepe");
    expect(order.paymentUrl).toBeDefined();
    expect(order.paymentUrl).toContain("phonepe.com");
  });

  it("should cryptographically verify PhonePe payments and reject checksum mismatches", () => {
    const saltKey = "sample_phonepe_salt_key_999";
    const saltIndex = "1";
    process.env.PHONEPE_SALT_KEY = saltKey;
    process.env.PHONEPE_SALT_INDEX = saltIndex;

    const orderId = "order_OId987123";
    const txnId = "TXN_PH_123456";

    // 1. Valid PhonePe checksum
    const validChecksum = `sample_response_hash###${saltIndex}`;
    const validCheck = PaymentService.verifyPayment({
      orderId,
      paymentMethod: "phonepe",
      gatewayTransactionId: txnId,
      checksum: validChecksum,
    });
    expect(validCheck.isValid).toBe(true);

    // 2. Salt index mismatch
    const invalidIndexCheck = PaymentService.verifyPayment({
      orderId,
      paymentMethod: "phonepe",
      gatewayTransactionId: txnId,
      checksum: "sample_response_hash###2",
    });
    expect(invalidIndexCheck.isValid).toBe(false);
    expect(invalidIndexCheck.error).toContain("PhonePe salt index mismatch");

    // 3. Sandbox verification when no salt key configured
    delete process.env.PHONEPE_SALT_KEY;
    const sandboxCheck = PaymentService.verifyPayment({
      orderId,
      paymentMethod: "phonepe",
      gatewayTransactionId: txnId,
    });
    expect(sandboxCheck.isValid).toBe(true);

    // 4. Missing transaction identifier
    const missingTxnCheck = PaymentService.verifyPayment({
      orderId,
      paymentMethod: "phonepe",
      gatewayTransactionId: "",
    });
    expect(missingTxnCheck.isValid).toBe(false);
    expect(missingTxnCheck.error).toContain("Missing PhonePe transaction identifier");
  });

  it("should reject unsupported payment methods for verification", () => {
    const check = PaymentService.verifyPayment({
      orderId: "order_123",
      paymentMethod: "gpay" as any,
      gatewayTransactionId: "txn_123",
    });
    expect(check.isValid).toBe(false);
    expect(check.error).toContain("Unsupported payment method");
  });

  it("should verify PhonePe webhook callbacks using SHA256 checksum and salt key", () => {
    const saltKey = "sample_phonepe_salt_key_123";
    const saltIndex = "1";
    process.env.PHONEPE_SALT_KEY = saltKey;
    process.env.PHONEPE_SALT_INDEX = saltIndex;

    const base64Body = Buffer.from(JSON.stringify({ code: "PAYMENT_SUCCESS" })).toString("base64");
    const calculatedHash = crypto.createHash("sha256").update(`${base64Body}${saltKey}`).digest("hex");
    const validHeader = `${calculatedHash}###${saltIndex}`;

    // Valid header
    expect(PaymentService.verifyPhonePeWebhook(base64Body, validHeader)).toBe(true);

    // Tampered header
    expect(PaymentService.verifyPhonePeWebhook(base64Body, "tampered_hash###1")).toBe(false);
  });

  it("should reject unsupported payment methods for gateway order creation", async () => {
    await expect(
      PaymentService.createGatewayOrder({
        orderNumber: "LUM-TEST-GPAY",
        amountInINR: 1200,
        paymentMethod: "gpay" as any,
        customerEmail: "client@lumiere.in",
        customerPhone: "9820012345",
      })
    ).rejects.toThrow("Unsupported payment method for gateway order: gpay");
  });

  it("should reject gpay in create-order API route with 400 Bad Request", async () => {
    const req = new NextRequest("http://localhost:3000/api/checkout/create-order", {
      method: "POST",
      body: JSON.stringify({
        customerName: "Aarav Sharma",
        customerEmail: "aarav@example.com",
        customerPhone: "9820012345",
        shippingAddress: {
          full_name: "Aarav Sharma",
          address_line1: "Marine Drive",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400020",
        },
        paymentMethod: "gpay",
        items: [{ variantId: "some-variant-id", quantity: 1 }],
      }),
    });

    const res = await createOrderRoute(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("Invalid payment method. Choose PhonePe or Cash on Delivery.");
  });

  it("should reject gpay in verify-payment API route with 400 Bad Request", async () => {
    const req = new NextRequest("http://localhost:3000/api/checkout/verify-payment", {
      method: "POST",
      body: JSON.stringify({
        orderId: "ord_12345",
        paymentMethod: "gpay",
        gatewayTransactionId: "txn_12345",
      }),
    });

    const res = await verifyPaymentRoute(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("Unsupported payment method for verification.");
  });
});
