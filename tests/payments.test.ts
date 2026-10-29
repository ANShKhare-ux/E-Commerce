import { describe, it, expect, beforeEach } from "vitest";
import { PaymentService } from "@/lib/services/payments";
import crypto from "crypto";

describe("LUMIÈRE Indian Payment Gateway Verification (PhonePe & Google Pay / GPay UPI)", () => {
  beforeEach(() => {
    delete process.env.PHONEPE_SALT_KEY;
    delete process.env.PHONEPE_SALT_INDEX;
    delete process.env.PHONEPE_MERCHANT_ID;
    delete process.env.GPAY_SECRET_KEY;
    delete process.env.GPAY_MERCHANT_ID;
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
  });

  it("should create Google Pay (GPay) UPI deep-link intent order with NPCI standard parameters", async () => {
    const order = await PaymentService.createGatewayOrder({
      orderNumber: "LUM-TEST-002",
      amountInINR: 4850, // ₹4,850
      paymentMethod: "gpay",
      customerEmail: "client@lumiere.in",
      customerPhone: "9820012345",
    });

    expect(order.success).toBe(true);
    expect(order.provider).toBe("gpay");
    expect(order.currency).toBe("INR");
    expect(order.upiIntentUrl).toContain("upi://pay");
    expect(order.upiIntentUrl).toContain("am=4850.00");
    expect(order.upiIntentUrl).toContain("cu=INR");
  });

  it("should cryptographically verify Google Pay signatures and reject tampered attempts", () => {
    const mockSecret = "gpay_secret_key_sample_12345";
    process.env.GPAY_SECRET_KEY = mockSecret;

    const orderId = "order_OId987123";
    const txnId = "gpay_txn_456789";
    const validSignature = crypto
      .createHmac("sha256", mockSecret)
      .update(`${orderId}|${txnId}`)
      .digest("hex");

    // 1. Valid signature
    const validCheck = PaymentService.verifyPayment({
      orderId,
      paymentMethod: "gpay",
      gatewayTransactionId: txnId,
      signature: validSignature,
    });
    expect(validCheck.isValid).toBe(true);

    // 2. Tampered signature
    const tamperedCheck = PaymentService.verifyPayment({
      orderId,
      paymentMethod: "gpay",
      gatewayTransactionId: txnId,
      signature: "tampered_signature_hex",
    });
    expect(tamperedCheck.isValid).toBe(false);
    expect(tamperedCheck.error).toContain("signature mismatch");
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
});
