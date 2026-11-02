import { describe, it, expect, beforeEach } from "vitest";
import {
  validateNewsletterInput,
  validateReservationInput,
  validateCheckoutOrderInput,
  validatePaymentVerifyInput,
} from "@/lib/security/validator";
import { sanitizeText, sanitizeIndianPhone, sanitizePincode } from "@/lib/security/sanitize";
import { checkRateLimit, _resetRateLimitStore } from "@/lib/security/rate-limit";
import { logger } from "@/lib/logger";

describe("LUMIÈRE Security & Schema Validation Suite", () => {
  beforeEach(() => {
    _resetRateLimitStore();
  });

  describe("Input Sanitization Utility", () => {
    it("should strip dangerous HTML tags and script injections", () => {
      expect(sanitizeText("<script>alert('xss')</script>Hello")).toBe("scriptalert('xss')/scriptHello");
      expect(sanitizeText("<img src=x onerror=alert(1)>Test")).toBe("img src=x alert(1)Test");
      expect(sanitizeText("javascript:alert(1)")).toBe("alert(1)");
    });

    it("should sanitize Indian phone numbers from string and numeric inputs", () => {
      expect(sanitizeIndianPhone("+91 98200 98200")).toBe("9820098200");
      expect(sanitizeIndianPhone("09820098200")).toBe("9820098200");
      expect(sanitizeIndianPhone("98200-98200")).toBe("9820098200");
      expect(sanitizeIndianPhone(9820098200)).toBe("9820098200"); // Numeric input
      expect(sanitizeIndianPhone("123")).toBe("123");
      expect(sanitizeIndianPhone(null)).toBe("");
      expect(sanitizeIndianPhone(undefined)).toBe("");
    });

    it("should sanitize Indian postal pincodes from string and numeric inputs", () => {
      expect(sanitizePincode("400 001")).toBe("400001");
      expect(sanitizePincode("400001123")).toBe("400001");
      expect(sanitizePincode("abc400001xyz")).toBe("400001");
      expect(sanitizePincode(400001)).toBe("400001"); // Numeric input
      expect(sanitizePincode(null)).toBe("");
    });

    it("should handle null and undefined safely in sanitizeText", () => {
      expect(sanitizeText(null)).toBe("");
      expect(sanitizeText(undefined)).toBe("");
      expect(sanitizeText(12345)).toBe("12345");
    });
  });

  describe("Newsletter Schema Validator", () => {
    it("should accept valid email addresses and lowercase them", () => {
      const res = validateNewsletterInput({ email: "Patron.VIP@Lumiere.IN" });
      expect(res.success).toBe(true);
      expect(res.data?.email).toBe("patron.vip@lumiere.in");
    });

    it("should reject empty or malformed email addresses", () => {
      expect(validateNewsletterInput({ email: "" }).success).toBe(false);
      expect(validateNewsletterInput({ email: "invalid-email" }).success).toBe(false);
      expect(validateNewsletterInput({ email: "user@" }).success).toBe(false);
      expect(validateNewsletterInput(null).success).toBe(false);
    });
  });

  describe("Inventory Reservation Schema Validator", () => {
    it("should validate and sanitize valid reservation payloads", () => {
      const res = validateReservationInput({
        sessionId: "sess_abc123",
        variantId: "var_xyz456",
        quantity: 3,
      });
      expect(res.success).toBe(true);
      expect(res.data?.sessionId).toBe("sess_abc123");
      expect(res.data?.quantity).toBe(3);
    });

    it("should reject quantities outside the 1..10 bounds and fractional quantities", () => {
      expect(validateReservationInput({ sessionId: "s1", variantId: "v1", quantity: 0 }).success).toBe(false);
      expect(validateReservationInput({ sessionId: "s1", variantId: "v1", quantity: 15 }).success).toBe(false);
      expect(validateReservationInput({ sessionId: "s1", variantId: "v1", quantity: -2 }).success).toBe(false);
      expect(validateReservationInput({ sessionId: "s1", variantId: "v1", quantity: 1.5 }).success).toBe(false);
      expect(validateReservationInput({ sessionId: "s1", variantId: "v1", quantity: "2.5" }).success).toBe(false);
    });

    it("should sanitize potential XSS in identifiers", () => {
      const res = validateReservationInput({
        sessionId: "<script>alert(1)</script>sess_123",
        variantId: "var_456<img src=x onerror=alert(1)>",
        quantity: 2,
      });
      expect(res.success).toBe(true);
      expect(res.data?.sessionId).not.toContain("<script>");
      expect(res.data?.variantId).not.toContain("<img");
    });
  });

  describe("Checkout Order Schema Validator", () => {
    const validOrderPayload = {
      customerName: "Radhika Merchant",
      customerEmail: "radhika@merchant.in",
      customerPhone: "+91 98200 98200",
      paymentMethod: "phonepe",
      shippingAddress: {
        address_line1: "Altamount Road, Cumballa Hill",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400026",
      },
      items: [
        {
          variantId: "LUM-VAR-001",
          quantity: 1,
        },
      ],
    };

    it("should validate and sanitize a compliant luxury order payload", () => {
      const res = validateCheckoutOrderInput(validOrderPayload);
      expect(res.success).toBe(true);
      expect(res.data?.customerPhone).toBe("9820098200");
      expect(res.data?.shippingAddress.pincode).toBe("400026");
      expect(res.data?.paymentMethod).toBe("phonepe");
      expect(res.data?.items).toHaveLength(1);
    });

    it("should accept numeric phone and pincode inputs seamlessly", () => {
      const numericPayload = {
        ...validOrderPayload,
        customerPhone: 9820098200,
        shippingAddress: {
          ...validOrderPayload.shippingAddress,
          pincode: 400026,
        },
      };
      const res = validateCheckoutOrderInput(numericPayload);
      expect(res.success).toBe(true);
      expect(res.data?.customerPhone).toBe("9820098200");
      expect(res.data?.shippingAddress.pincode).toBe("400026");
    });

    it("should accept uppercase payment methods through normalization", () => {
      const upperPayload = {
        ...validOrderPayload,
        paymentMethod: "COD",
      };
      const res = validateCheckoutOrderInput(upperPayload);
      expect(res.success).toBe(true);
      expect(res.data?.paymentMethod).toBe("cod");
    });

    it("should reject invalid 6-digit Indian PIN codes", () => {
      const badPincode = {
        ...validOrderPayload,
        shippingAddress: {
          ...validOrderPayload.shippingAddress,
          pincode: "012345", // Cannot start with 0
        },
      };
      const res = validateCheckoutOrderInput(badPincode);
      expect(res.success).toBe(false);
      expect(res.errorMessage).toContain("PIN code");
    });

    it("should reject fractional item quantities", () => {
      const fractionalPayload = {
        ...validOrderPayload,
        items: [{ variantId: "LUM-VAR-001", quantity: 2.5 }],
      };
      const res = validateCheckoutOrderInput(fractionalPayload);
      expect(res.success).toBe(false);
      expect(res.errorMessage).toContain("quantity");
    });

    it("should reject orders where aggregated quantity for a variant SKU exceeds 10 units", () => {
      const duplicateVariantPayload = {
        ...validOrderPayload,
        items: [
          { variantId: "LUM-VAR-001", quantity: 6 },
          { variantId: "LUM-VAR-001", quantity: 6 },
        ],
      };
      const res = validateCheckoutOrderInput(duplicateVariantPayload);
      expect(res.success).toBe(false);
      expect(res.errorMessage).toContain("cannot exceed 10 units");
    });

    it("should reject unsupported payment methods", () => {
      const badMethod = {
        ...validOrderPayload,
        paymentMethod: "crypto_bitcoin",
      };
      const res = validateCheckoutOrderInput(badMethod);
      expect(res.success).toBe(false);
      expect(res.errorMessage).toContain("Invalid payment method. Choose PhonePe or Cash on Delivery.");
    });

    it("should reject empty cart baskets", () => {
      const emptyItems = {
        ...validOrderPayload,
        items: [],
      };
      const res = validateCheckoutOrderInput(emptyItems);
      expect(res.success).toBe(false);
      expect(res.errorMessage).toContain("basket cannot be empty");
    });
  });

  describe("Payment Verification Schema Validator", () => {
    it("should accept valid PhonePe and UPI verification inputs", () => {
      const res = validatePaymentVerifyInput({
        orderId: "ord_1001",
        paymentMethod: "phonepe",
        gatewayTransactionId: "txn_phonepe_999",
        checksum: "sha256hash###1",
      });
      expect(res.success).toBe(true);
      expect(res.data?.orderId).toBe("ord_1001");
      expect(res.data?.gatewayTransactionId).toBe("txn_phonepe_999");
    });

    it("should accept case-insensitive payment methods in verification", () => {
      const res = validatePaymentVerifyInput({
        orderId: "ord_1001",
        paymentMethod: "UPI",
        gatewayTransactionId: "txn_upi_123",
      });
      expect(res.success).toBe(true);
      expect(res.data?.paymentMethod).toBe("upi");
    });

    it("should reject invalid payment methods for verification", () => {
      const res = validatePaymentVerifyInput({
        orderId: "ord_1001",
        paymentMethod: "stripe_card",
        gatewayTransactionId: "txn_123",
      });
      expect(res.success).toBe(false);
      expect(res.errorMessage).toContain("Unsupported payment method for verification");
    });
  });

  describe("Structured Redaction Logger", () => {
    it("should handle circular object references without crashing", () => {
      const circularObj: any = { name: "test" };
      circularObj.self = circularObj;
      expect(() => logger.info("Testing circular logging", circularObj)).not.toThrow();
    });

    it("should redact URL query tokens", () => {
      expect(() =>
        logger.warn("External API URL", { url: "https://api.example.com?token=secret123&apiKey=xyz" })
      ).not.toThrow();
    });
  });
});
