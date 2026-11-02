// =============================================================================
// LUMIÈRE - Strict Schema Validation & Sanitization Engine
// Provides type-safe, zero-dependency schema validation and sanitization
// to prevent SQL/NoSQL injection, Cross-Site Scripting (XSS), and payload tampering.
// =============================================================================

import { sanitizeText, sanitizeIndianPhone, sanitizePincode } from "./sanitize";

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
  errorMessage?: string;
}

// -----------------------------------------------------------------------------
// Common Regex Patterns
// -----------------------------------------------------------------------------
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
const INDIAN_PHONE_REGEX = /^[6-9][0-9]{9}$/;

// -----------------------------------------------------------------------------
// Newsletter Subscription Validation
// -----------------------------------------------------------------------------
export interface NewsletterInput {
  email: string;
}

export function validateNewsletterInput(raw: unknown): ValidationResult<NewsletterInput> {
  if (!raw || typeof raw !== "object") {
    return { success: false, errorMessage: "Invalid payload format." };
  }

  const { email } = raw as Record<string, unknown>;
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!cleanEmail) {
    return { success: false, errors: { email: "Email address is required." }, errorMessage: "Email address is required." };
  }

  if (cleanEmail.length > 254 || !EMAIL_REGEX.test(cleanEmail)) {
    return { success: false, errors: { email: "Please enter a valid email address." }, errorMessage: "Please enter a valid email address." };
  }

  return {
    success: true,
    data: { email: cleanEmail },
  };
}

// -----------------------------------------------------------------------------
// Inventory Reservation Validation
// -----------------------------------------------------------------------------
export interface ReservationInput {
  sessionId: string;
  variantId: string;
  quantity: number;
}

export function validateReservationInput(raw: unknown): ValidationResult<ReservationInput> {
  if (!raw || typeof raw !== "object") {
    return { success: false, errorMessage: "Invalid payload format." };
  }

  const { sessionId, variantId, quantity } = raw as Record<string, unknown>;

  const cleanSessionId = typeof sessionId === "string" ? sanitizeText(sessionId) : "";
  const cleanVariantId = typeof variantId === "string" ? sanitizeText(variantId) : "";
  const isInt = typeof quantity === "number" ? Number.isInteger(quantity) : /^-?\d+$/.test(String(quantity).trim());
  const qtyNum = typeof quantity === "number" ? quantity : parseInt(String(quantity), 10);

  const errors: Record<string, string> = {};

  if (!cleanSessionId || cleanSessionId.length < 3 || cleanSessionId.length > 128) {
    errors.sessionId = "Invalid or missing session identifier.";
  }

  if (!cleanVariantId || cleanVariantId.length < 2 || cleanVariantId.length > 128) {
    errors.variantId = "Invalid or missing product variant identifier.";
  }

  if (!isInt || isNaN(qtyNum) || qtyNum < 1 || qtyNum > 10) {
    errors.quantity = "Quantity must be an integer between 1 and 10.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, errorMessage: Object.values(errors)[0] };
  }

  return {
    success: true,
    data: {
      sessionId: cleanSessionId,
      variantId: cleanVariantId,
      quantity: Math.floor(qtyNum),
    },
  };
}

// -----------------------------------------------------------------------------
// Checkout Order Creation Validation
// -----------------------------------------------------------------------------
export interface OrderAddressInput {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutOrderItemInput {
  variantId: string;
  variant_id?: string;
  product_id?: string;
  quantity: number;
}

export interface CheckoutOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: OrderAddressInput;
  paymentMethod: "phonepe" | "upi" | "cod";
  items: CheckoutOrderItemInput[];
  reservationIds?: string[];
  idempotencyKey?: string;
  couponCode?: string;
}

export function validateCheckoutOrderInput(raw: unknown): ValidationResult<CheckoutOrderInput> {
  if (!raw || typeof raw !== "object") {
    return { success: false, errorMessage: "Invalid checkout request body." };
  }

  const body = raw as Record<string, unknown>;
  const errors: Record<string, string> = {};

  // 1. Customer Name
  const rawName = typeof body.customerName === "string" ? sanitizeText(body.customerName) : "";
  if (!rawName || rawName.length < 2 || rawName.length > 100) {
    errors.customerName = "Full legal name must be between 2 and 100 characters.";
  }

  // 2. Customer Email
  const rawEmail = typeof body.customerEmail === "string" ? body.customerEmail.trim().toLowerCase() : "";
  if (!rawEmail || !EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254) {
    errors.customerEmail = "Please enter a valid email address.";
  }

  // 3. Customer Phone
  const rawPhone = sanitizeIndianPhone(body.customerPhone);
  if (!rawPhone || !INDIAN_PHONE_REGEX.test(rawPhone)) {
    errors.customerPhone = "Please enter a valid 10-digit Indian mobile number (e.g., 9820098200).";
  }

  // 4. Payment Method (Case-insensitive normalization)
  const rawMethod = typeof body.paymentMethod === "string" ? body.paymentMethod.trim().toLowerCase() : "";
  if (rawMethod !== "phonepe" && rawMethod !== "upi" && rawMethod !== "cod") {
    errors.paymentMethod = "Invalid payment method. Choose PhonePe or Cash on Delivery.";
  }

  // 5. Shipping Address
  const addr = body.shippingAddress;
  if (!addr || typeof addr !== "object") {
    errors.shippingAddress = "Shipping address is required.";
  }

  const rawAddr = (addr || {}) as Record<string, unknown>;
  const cleanAddressLine1 = typeof rawAddr.address_line1 === "string" ? sanitizeText(rawAddr.address_line1) : "";
  const cleanCity = typeof rawAddr.city === "string" ? sanitizeText(rawAddr.city) : "";
  const cleanState = typeof rawAddr.state === "string" ? sanitizeText(rawAddr.state) : "";
  const cleanPincode = sanitizePincode(rawAddr.pincode);

  if (!cleanAddressLine1 || cleanAddressLine1.length < 5) {
    errors["shippingAddress.address_line1"] = "Please provide a complete street address.";
  }
  if (!cleanCity || cleanCity.length < 2) {
    errors["shippingAddress.city"] = "City name is required.";
  }
  if (!cleanState || cleanState.length < 2) {
    errors["shippingAddress.state"] = "State is required.";
  }
  if (!cleanPincode || !PINCODE_REGEX.test(cleanPincode)) {
    errors["shippingAddress.pincode"] = "Valid 6-digit Indian Postal PIN code is required.";
  }

  // 6. Items & Aggregated Quantity Limits
  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.items = "Your order basket cannot be empty.";
  }

  const validItems: CheckoutOrderItemInput[] = [];
  const variantQuantities = new Map<string, number>();

  if (Array.isArray(body.items)) {
    for (let i = 0; i < body.items.length; i++) {
      const it = body.items[i];
      if (!it || typeof it !== "object") {
        errors[`items[${i}]`] = "Invalid cart item.";
        continue;
      }
      const rawVId = (it as Record<string, unknown>).variant_id || (it as Record<string, unknown>).variantId;
      const rawPId = (it as Record<string, unknown>).product_id || (it as Record<string, unknown>).productId;
      const vId = typeof rawVId === "string" ? sanitizeText(rawVId) : "";
      const pId = typeof rawPId === "string" ? sanitizeText(rawPId) : "";
      const rawQ = (it as Record<string, unknown>).quantity;
      const isInt = typeof rawQ === "number" ? Number.isInteger(rawQ) : /^-?\d+$/.test(String(rawQ).trim());
      const q = typeof rawQ === "number" ? rawQ : parseInt(String(rawQ), 10);

      if (!vId || !isInt || isNaN(q) || q <= 0 || q > 10) {
        errors[`items[${i}]`] = "Invalid product variant or quantity (max 10 units per SKU).";
      } else {
        const currentTotal = (variantQuantities.get(vId) || 0) + q;
        if (currentTotal > 10) {
          errors[`items[${i}]`] = `Total order quantity for variant ${vId} cannot exceed 10 units.`;
        } else {
          variantQuantities.set(vId, currentTotal);
          validItems.push({
            variantId: vId,
            variant_id: vId,
            product_id: pId || undefined,
            quantity: q,
          });
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      errorMessage: Object.values(errors)[0],
    };
  }

  const cleanAddress: OrderAddressInput = {
    full_name: sanitizeText(rawAddr.full_name || rawName),
    email: rawEmail,
    phone: rawPhone,
    address_line1: cleanAddressLine1,
    address_line2: rawAddr.address_line2 ? sanitizeText(rawAddr.address_line2) : undefined,
    city: cleanCity,
    state: cleanState,
    pincode: cleanPincode,
  };

  const cleanReservationIds = Array.isArray(body.reservationIds)
    ? body.reservationIds.filter((id): id is string => typeof id === "string" && id.length > 0).map(sanitizeText)
    : undefined;

  const cleanCoupon = typeof body.couponCode === "string" && body.couponCode.trim()
    ? sanitizeText(body.couponCode).toUpperCase()
    : undefined;

  const cleanIdempotencyKey = typeof body.idempotencyKey === "string" && body.idempotencyKey.trim()
    ? sanitizeText(body.idempotencyKey).slice(0, 128)
    : undefined;

  return {
    success: true,
    data: {
      customerName: rawName,
      customerEmail: rawEmail,
      customerPhone: rawPhone,
      shippingAddress: cleanAddress,
      paymentMethod: rawMethod as "phonepe" | "upi" | "cod",
      items: validItems,
      reservationIds: cleanReservationIds,
      idempotencyKey: cleanIdempotencyKey,
      couponCode: cleanCoupon,
    },
  };
}

// -----------------------------------------------------------------------------
// Payment Verification Validation
// -----------------------------------------------------------------------------
export interface PaymentVerifyInput {
  orderId: string;
  paymentMethod: "phonepe" | "upi";
  gatewayTransactionId: string;
  gatewayOrderId?: string;
  signature?: string;
  checksum?: string;
}

export function validatePaymentVerifyInput(raw: unknown): ValidationResult<PaymentVerifyInput> {
  if (!raw || typeof raw !== "object") {
    return { success: false, errorMessage: "Invalid payment payload." };
  }

  const {
    orderId,
    paymentMethod = "phonepe",
    gatewayTransactionId,
    gatewayOrderId,
    signature,
    checksum,
  } = raw as Record<string, unknown>;

  const cleanMethod = typeof paymentMethod === "string" ? paymentMethod.trim().toLowerCase() : "phonepe";

  if (cleanMethod !== "phonepe" && cleanMethod !== "upi") {
    return { success: false, errorMessage: "Unsupported payment method for verification." };
  }

  const cleanOrderId = typeof orderId === "string" ? sanitizeText(orderId) : "";
  const cleanTxnId = typeof gatewayTransactionId === "string" ? sanitizeText(gatewayTransactionId) : "";

  if (!cleanOrderId) {
    return { success: false, errorMessage: "Missing authoritative orderId." };
  }
  if (!cleanTxnId) {
    return { success: false, errorMessage: "Missing payment transaction identifier." };
  }

  return {
    success: true,
    data: {
      orderId: cleanOrderId,
      paymentMethod: cleanMethod as "phonepe" | "upi",
      gatewayTransactionId: cleanTxnId,
      gatewayOrderId: typeof gatewayOrderId === "string" ? sanitizeText(gatewayOrderId) : undefined,
      signature: typeof signature === "string" ? sanitizeText(signature) : undefined,
      checksum: typeof checksum === "string" ? sanitizeText(checksum) : undefined,
    },
  };
}
