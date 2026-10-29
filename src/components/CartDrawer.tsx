"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Clock, Truck } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, reservationExpiresAt } = useCart();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  const discountAmount = appliedCoupon?.discountAmount || 0;
  const FREE_SHIPPING_THRESHOLD = 2999;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 150;
  const totalAmount = Math.max(0, subtotal - discountAmount) + shippingFee;

  // Sync applied coupon from localStorage
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem("lumiere_applied_coupon");
      if (savedCode && subtotal > 0) {
        validateCoupon(savedCode);
      }
    } catch (e) {
      console.error(e);
    }
  }, [subtotal]);

  const validateCoupon = async (code: string) => {
    if (!code.trim()) return;
    setCouponLoading(true);
    setCouponError(null);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase(), subtotal }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAppliedCoupon({
          code: data.coupon.code,
          discountAmount: data.discountAmount,
        });
        localStorage.setItem("lumiere_applied_coupon", data.coupon.code);
      } else {
        setAppliedCoupon(null);
        setCouponError(data.error || "Invalid coupon.");
        localStorage.removeItem("lumiere_applied_coupon");
      }
    } catch {
      setCouponError("Failed to validate coupon.");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
    localStorage.removeItem("lumiere_applied_coupon");
  };

  // Reservation countdown timer
  useEffect(() => {
    if (!reservationExpiresAt) return;

    const interval = setInterval(() => {
      const remainingMs = new Date(reservationExpiresAt).getTime() - Date.now();
      if (remainingMs <= 0) {
        setTimeLeft("Expired");
      } else {
        const mins = Math.floor(remainingMs / 60000);
        const secs = Math.floor((remainingMs % 60000) / 1000);
        setTimeLeft(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservationExpiresAt]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-canvas-border">
          {/* Header */}
          <div className="px-6 py-5 border-b border-canvas-border flex items-center justify-between bg-canvas-light">
            <div>
              <h2 className="font-serif text-lg font-bold text-noir-900 tracking-wide">
                Your Shopping Bag
              </h2>
              <p className="text-xs text-noir-500 font-light">
                {items.length} unique {items.length === 1 ? "design" : "designs"} selected
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-noir-500 hover:text-noir-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reservation Urgency Notice */}
          {reservationExpiresAt && timeLeft && timeLeft !== "Expired" && (
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center gap-2 text-xs text-amber-900">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Inventory reserved for <strong>{timeLeft}</strong>. Complete order before release.
              </span>
            </div>
          )}

          {/* Free Shipping Progress */}
          <div className="px-6 py-3.5 bg-canvas-subtle border-b border-canvas-border">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-noir-800 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-gold-600" />
                {remainingForFreeShipping > 0
                  ? `Add ₹${remainingForFreeShipping.toLocaleString("en-IN")} more for Complimentary Shipping`
                  : "Complimentary Express Shipping Unlocked"}
              </span>
              <span className="font-bold text-noir-900">{progressPercent}%</span>
            </div>
            <div className="w-full bg-noir-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gold-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-canvas-subtle">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-canvas-subtle flex items-center justify-center text-noir-400 mb-4">
                  <ShieldCheck className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="font-serif text-lg font-medium text-noir-900 mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-noir-500 max-w-xs mb-6">
                  Explore our handcrafted Chanderi silks, relaxed linen pieces, and contemporary luxury edits.
                </p>
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="bg-noir-900 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variant_id} className="py-4 flex gap-4">
                  <div className="relative w-20 h-26 shrink-0 bg-canvas-subtle rounded-sm overflow-hidden border border-canvas-border">
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-medium text-noir-900 line-clamp-1">
                          {item.product_name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.variant_id)}
                          className="text-noir-400 hover:text-red-600 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-noir-500 mt-0.5 space-x-2">
                        <span>Color: <strong>{item.color}</strong></span>
                        <span>•</span>
                        <span>Size: <strong>{item.size}</strong></span>
                      </div>

                      <p className="text-[10px] text-noir-400 font-mono mt-0.5">
                        SKU: {item.sku}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-canvas-border rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                          className="p-1 hover:bg-canvas-subtle text-noir-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-noir-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                          className="p-1 hover:bg-canvas-subtle text-noir-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-sans text-sm font-bold text-noir-900">
                        ₹{(item.unit_price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-canvas-border bg-canvas-light space-y-4">
              {/* Coupon Form */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-sm flex items-center justify-between text-xs text-emerald-900">
                    <div>
                      <span className="font-mono font-bold">{appliedCoupon.code}</span>
                      <span className="text-[10px] text-emerald-700 block">Saved ₹{appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[11px] text-red-700 hover:underline font-semibold"
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
                      placeholder="Coupon Code"
                      className="flex-1 text-xs font-mono font-bold uppercase p-2 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => validateCoupon(couponInput)}
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-3 py-2 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[10px] text-rose-600">{couponError}</p>}
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-noir-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-noir-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-noir-600">
                  <span>Estimated India Shipping (Delhivery)</span>
                  <span className="font-semibold text-noir-900">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      "₹150"
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-noir-600">
                  <span>Taxes (12% GST Inclusive)</span>
                  <span className="font-semibold text-noir-900">₹0</span>
                </div>
                <div className="border-t border-canvas-border pt-2 flex justify-between text-sm font-bold text-noir-900">
                  <span>Total Amount</span>
                  <span>
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm transition-colors shadow-subtle"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-center text-noir-500 font-light">
                Secured by 256-bit SSL • Official Delhivery Express Courier
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
