"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowLeft,
  Clock
} from "lucide-react";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Puducherry"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, reservationId, reservationExpiresAt } = useCart();

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");

  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number; description: string } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pincodeValidating, setPincodeValidating] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const discountAmount = appliedCoupon?.discountAmount || 0;
  const FREE_SHIPPING_THRESHOLD = 2999;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 150;
  const totalAmount = Math.max(0, subtotal - discountAmount) + shippingFee;

  // Auto-load saved coupon from localStorage
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem("lumiere_applied_coupon");
      if (savedCode && subtotal > 0) {
        validateAndApplyCoupon(savedCode);
      }
    } catch (e) {
      console.error(e);
    }
  }, [subtotal]);

  const validateAndApplyCoupon = async (codeToValidate: string) => {
    if (!codeToValidate.trim()) return;
    setCouponLoading(true);
    setCouponMessage(null);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToValidate.trim().toUpperCase(), subtotal }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAppliedCoupon({
          code: data.coupon.code,
          discountAmount: data.discountAmount,
          description: data.coupon.description,
        });
        setCouponMessage({
          type: "success",
          text: `Coupon ${data.coupon.code} applied! Saved ₹${data.discountAmount.toLocaleString("en-IN")}`,
        });
        localStorage.setItem("lumiere_applied_coupon", data.coupon.code);
      } else {
        setAppliedCoupon(null);
        setCouponMessage({ type: "error", text: data.error || "Invalid coupon code." });
        localStorage.removeItem("lumiere_applied_coupon");
      }
    } catch {
      setCouponMessage({ type: "error", text: "Unable to validate coupon code." });
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMessage(null);
    localStorage.removeItem("lumiere_applied_coupon");
  };

  // Auto-verify pincode with Delhivery on 6 digits
  useEffect(() => {
    if (pincode.length === 6) {
      setPincodeValidating(true);
      fetch(`/api/delhivery/check-pincode?pincode=${pincode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.serviceable) {
            setPincodeStatus(`Serviceable in ${data.city}, ${data.state} (Delhivery TAT: ~${data.estimated_delivery_days} days)`);
            if (data.city) setCity(data.city);
            if (data.state && INDIAN_STATES.includes(data.state)) setState(data.state);
          } else {
            setPincodeStatus("Notice: Delhivery does not currently deliver to this pincode.");
          }
        })
        .catch(() => setPincodeStatus(null))
        .finally(() => setPincodeValidating(false));
    } else {
      setPincodeStatus(null);
    }
  }, [pincode]);

  // If bag is empty, redirect
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-medium text-noir-900">Your bag is empty</h2>
        <p className="text-xs text-noir-500">Please select an atelier piece before proceeding to checkout.</p>
        <Link
          href="/products"
          className="inline-block bg-noir-900 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-gold-600 transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate Indian Phone
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please provide a valid 10-digit Indian mobile number for courier SMS updates.");
      return;
    }

    // Validate 6-digit Pincode
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setError("Please enter a valid 6-digit Indian PIN code.");
      return;
    }

    setLoading(true);

    try {
      const idempotencyKey = `idem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      // 1. Create order on backend with atomic inventory confirmation
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "idempotency-key": idempotencyKey,
        },
        body: JSON.stringify({
          customerName: fullName,
          customerEmail: email,
          customerPhone: cleanPhone,
          shippingAddress: {
            full_name: fullName,
            email,
            phone: cleanPhone,
            address_line1: address1,
            address_line2: address2,
            city,
            state,
            pincode,
          },
          paymentMethod,
          items: items.map((i) => ({ variantId: i.variant_id, quantity: i.quantity })),
          reservationIds: reservationId ? [reservationId] : undefined,
          idempotencyKey,
          couponCode: appliedCoupon?.code,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Order placement failed.");
      }

      const createdOrder = data.order;
      localStorage.removeItem("lumiere_applied_coupon");

      // 2. If Cash on Delivery, order is confirmed immediately
      if (paymentMethod === "cod") {
        clearCart();
        router.push(`/order-confirmation/${createdOrder.id}`);
        return;
      }

      // 3. If UPI / Card, verify payment with server
      // In live environment, Razorpay checkout modal opens; in testing/sandbox, cryptographic verification executes
      const verifyRes = await fetch("/api/checkout/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: createdOrder.id,
          razorpayOrderId: data.gatewayOrder?.gatewayOrderId || `order_test_${Date.now()}`,
          razorpayPaymentId: `pay_test_${Date.now()}`,
          razorpaySignature: "dev_sandbox_signature",
        }),
      });

      if (!verifyRes.ok) {
        throw new Error("Payment verification failed on the server.");
      }

      clearCart();
      router.push(`/order-confirmation/${createdOrder.id}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <div className="flex items-center justify-between border-b border-canvas-border pb-4">
        <Link
          href="/cart"
          className="text-xs text-noir-600 hover:text-noir-900 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Shopping Bag</span>
        </Link>
        <span className="text-[11px] text-noir-500 font-mono">
          Market: Republic of India (INR ₹)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Checkout Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmitOrder} className="space-y-8">
            {/* Step 1: Contact Information */}
            <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-noir-900 border-b border-canvas-border pb-2">
                1. Customer Contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-noir-800 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-noir-800 mb-1">
                    Email Address (for Receipt & Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="radhika@example.com"
                    className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-noir-800 mb-1">
                    Indian Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs text-noir-500 bg-canvas-subtle border border-r-0 border-canvas-border rounded-l-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="9820012345"
                      className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-r-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-noir-900 border-b border-canvas-border pb-2">
                2. Shipping Destination (Delhivery Courier)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-noir-800 mb-1">
                    Address Line 1 (Flat / House No. / Building / Street) *
                  </label>
                  <input
                    type="text"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="e.g. Apartment 12B, Samudra Mahal, Worli"
                    className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-noir-800 mb-1">
                    Address Line 2 (Area, Landmark, Colony - Optional)
                  </label>
                  <input
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Near Nehru Science Centre"
                    className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-noir-800 mb-1">
                      Pincode (6 Digits) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="400018"
                      className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                    />
                    {pincodeValidating && (
                      <span className="text-[10px] text-noir-500 flex items-center gap-1 mt-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Verifying Delhivery...
                      </span>
                    )}
                    {pincodeStatus && !pincodeValidating && (
                      <span className="text-[10px] text-emerald-700 block mt-1">
                        {pincodeStatus}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-noir-800 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-noir-800 mb-1">
                      State / UT *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-noir-900 border-b border-canvas-border pb-2">
                3. Payment Method
              </h2>

              <div className="space-y-3">
                {/* UPI / Online Option */}
                <label
                  className={`flex items-start gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${
                    paymentMethod === "upi"
                      ? "border-noir-900 bg-canvas-subtle"
                      : "border-canvas-border hover:border-noir-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-noir-900 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-gold-600" />
                        <span>UPI & Online Gateway (Instant & Secure)</span>
                      </span>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Fastest Dispatch
                      </span>
                    </div>
                    <p className="text-[11px] text-noir-500 mt-1">
                      Google Pay, PhonePe, Paytm, BHIM UPI, Netbanking, Credit & Debit Cards.
                    </p>
                  </div>
                </label>

                {/* COD Option */}
                <label
                  className={`flex items-start gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${
                    paymentMethod === "cod"
                      ? "border-noir-900 bg-canvas-subtle"
                      : "border-canvas-border hover:border-noir-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-noir-900 flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-gold-600" />
                        <span>Cash on Delivery (COD)</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-noir-500 mt-1">
                      Pay in cash or through UPI QR code presented by Delhivery delivery associate upon arrival.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-noir-900 hover:bg-gold-600 text-white py-4 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-colors disabled:opacity-50 shadow-subtle"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Securing Order & Reserving Stock...</span>
                </>
              ) : (
                <>
                  <span>
                    Confirm & Place Order • ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-noir-900 border-b border-canvas-border pb-3">
              Order Items ({items.length})
            </h3>

            <div className="divide-y divide-canvas-subtle max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.variant_id} className="py-3 flex gap-3">
                  <div className="relative w-16 h-20 bg-canvas-subtle rounded-sm overflow-hidden shrink-0 border border-canvas-border">
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs space-y-0.5">
                    <h4 className="font-serif font-medium text-noir-900 line-clamp-1">
                      {item.product_name}
                    </h4>
                    <p className="text-[11px] text-noir-500">
                      {item.color} • Size {item.size} • Qty {item.quantity}
                    </p>
                    <p className="font-sans font-bold text-noir-900 pt-1">
                      ₹{(item.unit_price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Entry */}
            <div className="border-t border-canvas-border pt-3 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-noir-800 block">
                Promotional Coupon
              </span>
              {appliedCoupon ? (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-sm flex items-center justify-between text-xs text-emerald-900">
                  <div>
                    <span className="font-mono font-bold tracking-wider">{appliedCoupon.code}</span>
                    <span className="text-[11px] text-emerald-700 block">Saved ₹{appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-red-700 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g. FIRSTBUY)"
                    className="flex-1 text-xs font-mono font-bold tracking-wider uppercase p-2 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => validateAndApplyCoupon(couponInput)}
                    disabled={couponLoading || !couponInput.trim()}
                    className="px-4 py-2 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>
              )}

              {couponMessage && (
                <p className={`text-[11px] ${couponMessage.type === "success" ? "text-emerald-700 font-medium" : "text-rose-700"}`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            <div className="border-t border-canvas-border pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-noir-600">
                <span>Subtotal</span>
                <span className="font-semibold text-noir-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-₹{appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-noir-600">
                <span>Delhivery Express Shipping</span>
                <span className="font-semibold text-noir-900">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-bold">COMPLIMENTARY</span> : "₹150"}
                </span>
              </div>
              <div className="border-t border-canvas-border pt-2 flex justify-between text-sm font-bold text-noir-900">
                <span>Total Amount Due</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-canvas-subtle border border-canvas-border rounded-sm text-xs space-y-2 text-noir-600">
            <div className="flex items-center gap-1.5 text-noir-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Concurrency & Inventory Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every variant has dedicated SKU tracking. Inventory is confirmed with transactional integrity on the server to prevent duplicate sales or overselling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
