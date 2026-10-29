import { describe, it, expect } from "vitest";
import { PaymentService } from "@/lib/services/razorpay";
import crypto from "crypto";

describe("LUMIÈRE Indian Payment Gateway Verification (Razorpay / UPI)", () => {
  it("should correctly convert INR amounts into paise for payment order creation", async () => {
    const order = await PaymentService.createGatewayOrder({
      orderNumber: "LUM-TEST-001",
      amountInINR: 6990, // ₹6,990
      customerEmail: "client@lumiere.in",
      customerPhone: "9820012345",
    });

    expect(order.success).toBe(true);
    expect(order.amountInPaise).toBe(699000); // 699,000 paise
    expect(order.currency).toBe("INR");
  });

  it("should cryptographically verify authentic payment signatures", () => {
    const mockSecret = "rzp_secret_key_sample_12345";
    process.env.RAZORPAY_KEY_SECRET = mockSecret;

    const orderId = "order_OId987123";
    const paymentId = "pay_PId987123";
    const expectedSignature = crypto
      .createHmac("sha256", mockSecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const verification = PaymentService.verifyPaymentSignature({
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: expectedSignature,
    });

    expect(verification.isValid).toBe(true);
  });

  it("should detect and reject tampered or fraudulent payment signatures", () => {
    const mockSecret = "rzp_secret_key_sample_12345";
    process.env.RAZORPAY_KEY_SECRET = mockSecret;

    const verification = PaymentService.verifyPaymentSignature({
      razorpayOrderId: "order_OId987123",
      razorpayPaymentId: "pay_PId987123",
      razorpaySignature: "fraudulent_tampered_signature_hex",
    });

    expect(verification.isValid).toBe(false);
    expect(verification.error).toContain("tampering detected");
  });
});
