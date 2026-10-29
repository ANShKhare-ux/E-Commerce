"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, Truck, ShieldCheck, ShoppingBag, Tag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalCount } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  const discountAmount = appliedCoupon?.discountAmount || 0;
  const FREE_SHIPPING_THRESHOLD = 2999;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 150;
  const totalAmount = Math.max(0, subtotal - discountAmount) + shippingFee;

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
        setCouponError(data.error || "Invalid coupon code.");
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-canvas-border pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Review Bag
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Shopping Bag ({totalCount} {totalCount === 1 ? "Item" : "Items"})
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white border border-canvas-border rounded-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-canvas-subtle text-noir-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-gold-600" />
          </div>
          <h2 className="font-serif text-xl font-medium text-noir-900">Your bag is empty</h2>
          <p className="text-xs text-noir-500 max-w-sm mx-auto">
            Discover artisanal handlooms, Giza cotton tailoring, and curated fashion in our catalog.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-noir-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-gold-600 transition-colors rounded-luxury"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items Table (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-canvas-border rounded-sm divide-y divide-canvas-border">
            {items.map((item) => (
              <div key={item.variant_id} className="p-6 flex flex-col sm:flex-row gap-6">
                <div className="relative w-28 h-36 bg-canvas-subtle rounded-sm overflow-hidden shrink-0 border border-canvas-border">
                  <Image
                    src={item.product_image}
                    alt={item.product_name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/products/${item.product_slug}`}
                        className="font-serif text-base font-medium text-noir-900 hover:text-gold-700 transition-colors"
                      >
                        {item.product_name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.variant_id)}
                        className="text-noir-400 hover:text-red-600 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-noir-600">
                      <span>Color: <strong>{item.color}</strong></span>
                      <span>•</span>
                      <span>Size: <strong>{item.size}</strong></span>
                    </div>

                    <p className="text-[11px] text-noir-400 font-mono">
                      SKU: {item.sku}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center border border-canvas-border rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                        className="p-1.5 hover:bg-canvas-subtle text-noir-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-noir-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                        className="p-1.5 hover:bg-canvas-subtle text-noir-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-noir-900 font-sans">
                        ₹{(item.unit_price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-noir-400">
                          ₹{item.unit_price.toLocaleString("en-IN")} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4 shadow-subtle">
              <h2 className="font-serif text-lg font-bold text-noir-900 pb-3 border-b border-canvas-border">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div className="pt-1 pb-3 border-b border-canvas-border space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gold-600" />
                  <span>Promotional Coupon</span>
                </label>
                {appliedCoupon ? (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-sm flex items-center justify-between text-xs text-emerald-900">
                    <div>
                      <span className="font-mono font-bold">{appliedCoupon.code}</span>
                      <span className="text-[10px] text-emerald-700 block">Saved ₹{appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[11px] text-rose-700 hover:underline font-semibold"
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
                      placeholder="e.g. FIRSTBUY, LUMIERE10"
                      className="flex-1 text-xs font-mono font-bold uppercase p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => validateCoupon(couponInput)}
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-4 py-2.5 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-noir-600">
                  <span>Bag Subtotal</span>
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
                  <span>Delhivery Express Courier</span>
                  <span className="font-semibold text-noir-900">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">COMPLIMENTARY</span> : "₹150"}
                  </span>
                </div>
                <div className="flex justify-between text-noir-600">
                  <span>GST (12% Textile Inclusive)</span>
                  <span className="font-semibold text-noir-900">₹0</span>
                </div>
                <div className="border-t border-canvas-border pt-3 flex justify-between text-base font-bold text-noir-900">
                  <span>Estimated Total</span>
                  <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-noir-900 hover:bg-gold-600 text-white py-4 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-colors shadow-subtle mt-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-4 bg-canvas-subtle border border-canvas-border rounded-sm space-y-2 text-xs text-noir-600">
              <div className="flex items-center gap-2 text-noir-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>LUMIÈRE Client Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                • Genuine Indian handlooms with certificate of origin<br />
                • Inspected 7-day reverse pickups<br />
                • Real-time SMS & Email tracking via Delhivery
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
