"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CartItem, Product } from "@/types";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Percent,
  Sparkles,
  MapPin,
  RefreshCw,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalCount,
    reservationExpiresAt,
  } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccessMsg, setCouponSuccessMsg] = useState<string | null>(null);

  // Delhivery Pincode check state
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeResult, setPincodeResult] = useState<{
    checked: boolean;
    serviceable: boolean;
    city?: string;
    estimatedDays?: number;
    codAvailable?: boolean;
    error?: string;
  } | null>(null);

  // Reservation countdown timer
  const [timeLeft, setTimeLeft] = useState<string>("");

  const FREE_SHIPPING_THRESHOLD = 2999;
  const discountAmount = appliedCoupon?.discountAmount || 0;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 150;
  const totalAmount = Math.max(0, subtotal - discountAmount) + shippingFee;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Sync applied coupon from localStorage
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem("lumiere_applied_coupon");
      if (savedCode && subtotal > 0) {
        validateCoupon(savedCode, true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [subtotal]);

  // Reservation countdown ticker
  useEffect(() => {
    if (!reservationExpiresAt) return;

    const interval = setInterval(() => {
      const remainingMs = new Date(reservationExpiresAt).getTime() - Date.now();
      if (remainingMs <= 0) {
        setTimeLeft("Hold expired — re-added to catalog");
      } else {
        const mins = Math.floor(remainingMs / 60000);
        const secs = Math.floor((remainingMs % 60000) / 1000);
        setTimeLeft(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservationExpiresAt]);

  const validateCoupon = async (code: string, isSilent = false) => {
    if (!code.trim()) return;
    setCouponLoading(true);
    setCouponError(null);
    setCouponSuccessMsg(null);

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
        if (!isSilent) {
          setCouponSuccessMsg(
            `Voucher ${data.coupon.code} applied! You saved ₹${data.discountAmount.toLocaleString("en-IN")}`
          );
        }
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
    setCouponSuccessMsg(null);
    localStorage.removeItem("lumiere_applied_coupon");
  };

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      setPincodeResult({
        checked: true,
        serviceable: false,
        error: "Enter a valid 6-digit Indian PIN code.",
      });
      return;
    }

    setPincodeLoading(true);
    try {
      const res = await fetch(`/api/delhivery/check-pincode?pincode=${cleanPin}`);
      const data = await res.json();
      if (res.ok && data.serviceable) {
        setPincodeResult({
          checked: true,
          serviceable: true,
          city: data.city || "Destination",
          estimatedDays: data.estimated_delivery_days || 3,
          codAvailable: data.cod_available !== false,
        });
      } else {
        setPincodeResult({
          checked: true,
          serviceable: false,
          error: data.error || "PIN code not currently serviceable by Delhivery Express.",
        });
      }
    } catch {
      setPincodeResult({
        checked: true,
        serviceable: false,
        error: "Could not connect to Delhivery logistics server.",
      });
    } finally {
      setPincodeLoading(false);
    }
  };

  const handleMoveToWishlist = (item: CartItem) => {
    const productMock: Product = {
      id: item.product_id,
      name: item.product_name,
      slug: item.product_slug,
      brand: "LUMIÈRE",
      category_slug: "mens-clothing",
      description: "",
      fabric_care: "",
      origin: "India",
      is_affiliate: false,
      rating: 5,
      review_count: 1,
      status: "active",
      base_price: item.unit_price,
      images: [
        {
          id: `img_${item.product_id}`,
          product_id: item.product_id,
          url: item.product_image,
          alt_text: item.product_name,
          display_order: 1,
          is_primary: true,
        },
      ],
      variants: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    toggleWishlist(productMock);
    removeItem(item.variant_id);
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* 1. Header & Luxury Checkout Progression Breadcrumb */}
        <div className="border-b border-[#eaeaec] pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-noir-400 mb-1">
              <Link href="/" className="hover:text-noir-900 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-noir-300" />
              <span className="text-noir-900">Shopping Bag</span>
            </nav>
            <h1 className="font-serif text-2xl sm:text-3xl text-noir-900 font-bold tracking-tight">
              Shopping Bag
              {totalCount > 0 && (
                <span className="text-sm font-sans font-medium text-noir-500 ml-3">
                  ({totalCount} {totalCount === 1 ? "piece" : "pieces"})
                </span>
              )}
            </h1>
          </div>

          {/* Checkout Steps Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-noir-900 border-b-2 border-[#C59B48] pb-1">
              <span className="w-5 h-5 rounded-full bg-[#C59B48] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Bag</span>
            </span>
            <span className="w-8 h-[1px] bg-gray-200" />
            <span className="flex items-center gap-1.5 text-noir-400">
              <span className="w-5 h-5 rounded-full bg-gray-200 text-noir-600 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Address</span>
            </span>
            <span className="w-8 h-[1px] bg-gray-200" />
            <span className="flex items-center gap-1.5 text-noir-400">
              <span className="w-5 h-5 rounded-full bg-gray-200 text-noir-600 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Payment</span>
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="text-center py-20 px-6 bg-white border border-[#eaeaec] rounded shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#faf9f5] border border-[#eaeaec] text-[#C59B48] mx-auto flex items-center justify-center shadow-inner">
              <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-noir-900">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-noir-500 max-w-md mx-auto leading-relaxed">
                Explore our curated handcrafted Indian silks, 450 GSM heavyweight
                streetwear, and bespoke atelier tailoring.
              </p>
            </div>

            {/* Quick Exploration Links */}
            <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-wider">
              <Link
                href="/category/mens-clothing"
                className="px-5 py-3 bg-noir-900 hover:bg-[#C59B48] text-white rounded transition-colors shadow-sm"
              >
                Men&apos;s Tailoring
              </Link>
              <Link
                href="/category/womens-clothing"
                className="px-5 py-3 bg-noir-900 hover:bg-[#C59B48] text-white rounded transition-colors shadow-sm"
              >
                Women&apos;s Collection
              </Link>
              <Link
                href="/category/streetwear"
                className="px-5 py-3 bg-noir-900 hover:bg-[#C59B48] text-white rounded transition-colors shadow-sm"
              >
                Unisex Streetwear
              </Link>
              <Link
                href="/products"
                className="px-5 py-3 border border-[#d4d5d9] hover:border-noir-900 text-noir-900 rounded transition-colors"
              >
                Full Catalog
              </Link>
            </div>
          </div>
        ) : (
          /* Active Bag Grid (8 cols / 4 cols) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column (8 Cols): Items, Delivery Banner & Reservation */}
            <div className="lg:col-span-8 space-y-6">
              {/* Complimentary Shipping Progress Banner */}
              <div className="bg-white border border-[#eaeaec] rounded p-4 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C59B48]" />
                    <span className="font-bold text-noir-900">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-emerald-700">
                          🎉 You have unlocked COMPLIMENTARY Delhivery Express Shipping!
                        </span>
                      ) : (
                        <span>
                          Add{" "}
                          <strong className="text-noir-900 font-sans">
                            ₹{remainingForFreeShipping.toLocaleString("en-IN")}
                          </strong>{" "}
                          more for FREE Express Delivery
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-noir-500 font-semibold">
                    ₹{subtotal.toLocaleString("en-IN")} / ₹
                    {FREE_SHIPPING_THRESHOLD.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-[#f0f0f2] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C59B48] to-emerald-600 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* 15-Minute Concurrency Reservation Notice */}
              {timeLeft && (
                <div className="bg-[#fffdfa] border border-[#f5e6cb] rounded p-3.5 flex items-center justify-between text-xs text-noir-800">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#C59B48] animate-pulse" />
                    <span>
                      Items reserved for you to protect against overselling.
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#C59B48] bg-[#faf0dc] px-2 py-0.5 rounded text-[11px]">
                    {timeLeft}
                  </span>
                </div>
              )}

              {/* Items Card List */}
              <div className="bg-white border border-[#eaeaec] rounded shadow-xs divide-y divide-[#f5f5f6]">
                <div className="p-4 sm:p-5 bg-[#fafafa] flex items-center justify-between border-b border-[#eaeaec]">
                  <span className="text-xs font-bold uppercase tracking-wider text-noir-700">
                    Product Details
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-noir-700">
                    Subtotal
                  </span>
                </div>

                {items.map((item) => (
                  <div
                    key={item.variant_id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 transition-colors hover:bg-[#fafafa]/50"
                  >
                    {/* Item Image */}
                    <Link
                      href={`/products/${item.product_slug}`}
                      className="relative w-28 h-36 bg-[#f5f5f6] rounded overflow-hidden shrink-0 border border-[#eaeaec] group block"
                    >
                      <Image
                        src={
                          item.product_image ||
                          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={item.product_name}
                        fill
                        sizes="120px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Item Metadata */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C59B48] block">
                              LUMIÈRE ATELIER
                            </span>
                            <Link
                              href={`/products/${item.product_slug}`}
                              className="font-serif text-base sm:text-lg font-bold text-noir-900 hover:text-[#C59B48] transition-colors leading-snug block mt-0.5"
                            >
                              {item.product_name}
                            </Link>
                          </div>
                          <span className="text-base sm:text-lg font-bold text-noir-900 font-sans whitespace-nowrap">
                            ₹{(item.unit_price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* Variant Badges */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-noir-600">
                          {item.color && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-[#f5f5f6] border border-[#eaeaec] rounded text-[11px] font-medium">
                              Color: <strong className="ml-1 text-noir-900">{item.color}</strong>
                            </span>
                          )}
                          {item.size && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-[#f5f5f6] border border-[#eaeaec] rounded text-[11px] font-medium">
                              Size: <strong className="ml-1 text-noir-900">{item.size}</strong>
                            </span>
                          )}
                          <span className="text-[10px] text-noir-400 font-mono">
                            SKU: {item.sku}
                          </span>
                        </div>

                        {/* Dispatch Speed */}
                        <p className="text-[11px] text-emerald-700 flex items-center gap-1 pt-1 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Dispatches within 24 hours via Delhivery Express</span>
                        </p>
                      </div>

                      {/* Bottom Controls: Quantity + Wishlist + Remove */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#f5f5f6]">
                        {/* Quantity Increment/Decrement */}
                        <div className="flex items-center border border-[#d4d5d9] rounded bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                            className="p-2 hover:bg-[#f5f5f6] text-noir-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3.5 text-xs font-bold text-noir-900 min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                            className="p-2 hover:bg-[#f5f5f6] text-noir-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleMoveToWishlist(item)}
                            className="text-xs font-bold text-noir-600 hover:text-[#C59B48] flex items-center gap-1.5 transition-colors py-1 px-2 rounded hover:bg-[#f5f5f6]"
                            title="Save to Wishlist"
                          >
                            <Heart className="w-3.5 h-3.5 text-rose-500" />
                            <span>Move to Wishlist</span>
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.variant_id)}
                            className="text-xs font-bold text-noir-600 hover:text-rose-600 flex items-center gap-1.5 transition-colors py-1 px-2 rounded hover:bg-rose-50"
                            title="Remove from bag"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promotional Voucher Quick Apply */}
              <div className="bg-white border border-[#eaeaec] rounded p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-noir-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#C59B48]" />
                    <span>Apply Promotional Voucher</span>
                  </h3>
                  <span className="text-[11px] text-noir-500">1 voucher per order</span>
                </div>

                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between text-xs text-emerald-900">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-mono font-bold tracking-wider">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-[11px] text-emerald-700 block">
                          Savings of ₹{appliedCoupon.discountAmount.toLocaleString("en-IN")} applied
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-rose-700 hover:underline font-bold px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="ENTER COUPON CODE"
                        className="flex-1 text-xs font-mono font-bold uppercase px-3.5 py-2.5 border border-[#d4d5d9] rounded focus:border-[#C59B48] focus:ring-1 focus:ring-[#C59B48] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => validateCoupon(couponInput)}
                        disabled={couponLoading || !couponInput.trim()}
                        className="px-5 py-2.5 bg-noir-900 hover:bg-[#C59B48] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50 shrink-0 shadow-sm"
                      >
                        {couponLoading ? "Validating..." : "Apply"}
                      </button>
                    </div>

                    {/* Quick Voucher Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[11px] text-noir-500 font-medium">Quick Apply:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCouponInput("FIRSTBUY");
                          validateCoupon("FIRSTBUY");
                        }}
                        className="px-2.5 py-1 bg-[#faf9f5] border border-dashed border-[#C59B48] rounded text-[11px] font-mono font-bold text-[#C59B48] hover:bg-[#C59B48] hover:text-white transition-colors"
                      >
                        FIRSTBUY (₹300 off)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCouponInput("LUMIERE10");
                          validateCoupon("LUMIERE10");
                        }}
                        className="px-2.5 py-1 bg-[#faf9f5] border border-dashed border-[#C59B48] rounded text-[11px] font-mono font-bold text-[#C59B48] hover:bg-[#C59B48] hover:text-white transition-colors"
                      >
                        LUMIERE10 (10% off)
                      </button>
                    </div>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{couponError}</span>
                  </p>
                )}
                {couponSuccessMsg && (
                  <p className="text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{couponSuccessMsg}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Right Column (4 Cols): Pincode Check, Order Summary & Checkout CTA */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Delhivery Pincode Serviceability Check */}
              <div className="bg-white border border-[#eaeaec] rounded p-5 shadow-xs space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-noir-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C59B48]" />
                  <span>Check Delhivery Express Delivery</span>
                </span>
                <p className="text-[11px] text-noir-500">
                  Enter your 6-digit PIN code to check instant serviceability & delivery dates.
                </p>

                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 400001, 110001"
                    className="flex-1 text-xs font-mono font-semibold px-3 py-2 border border-[#d4d5d9] rounded focus:border-[#C59B48] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={pincodeLoading || pincodeInput.length !== 6}
                    className="px-4 py-2 border border-[#282c3f] hover:bg-noir-900 hover:text-white text-noir-900 text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50 shrink-0"
                  >
                    {pincodeLoading ? "..." : "Check"}
                  </button>
                </form>

                {pincodeResult && (
                  <div className="pt-1 text-xs">
                    {pincodeResult.serviceable ? (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 space-y-1">
                        <span className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Serviceable to {pincodeResult.city}</span>
                        </span>
                        <p className="text-[11px] text-emerald-700">
                          Estimated delivery in {pincodeResult.estimatedDays} business days via
                          Delhivery Express.
                          {pincodeResult.codAvailable && " Cash on Delivery available."}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{pincodeResult.error}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Order Summary Card */}
              <div className="bg-white border border-[#eaeaec] rounded p-6 shadow-xs space-y-4">
                <h2 className="font-serif text-lg font-bold text-noir-900 pb-3 border-b border-[#eaeaec]">
                  Price Details ({totalCount} {totalCount === 1 ? "Item" : "Items"})
                </h2>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-noir-600">
                    <span>Total Bag MRP</span>
                    <span className="font-semibold text-noir-900 font-sans">
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
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase">
                          FREE
                        </span>
                      ) : (
                        "₹150"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-noir-600">
                    <span>GST (12% Textile Inclusive)</span>
                    <span className="font-semibold text-noir-900">₹0</span>
                  </div>

                  {/* Divider and Total */}
                  <div className="border-t border-[#eaeaec] pt-3.5 flex justify-between items-baseline text-base sm:text-lg font-bold text-noir-900">
                    <span>Total Amount</span>
                    <span className="font-serif text-xl sm:text-2xl text-noir-900">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Primary Proceed to Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full bg-noir-900 hover:bg-[#C59B48] text-white py-4 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded transition-colors shadow-md mt-4 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-[10px] text-center text-noir-400">
                  By placing your order, you agree to LUMIÈRE Terms of Service & Privacy Policy.
                </p>
              </div>

              {/* Client Guarantees & Payment Security */}
              <div className="p-4 bg-white border border-[#eaeaec] rounded space-y-3 text-xs text-noir-600 shadow-xs">
                <div className="flex items-center gap-2 text-noir-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
                  <span>The LUMIÈRE Client Privilege</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-noir-600 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#C59B48]">•</span>
                    <span>100% Authentic Handlooms with Indian Origin Certificate</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#C59B48]">•</span>
                    <span>7-Day Doorstep Reverse Pickup & Inspection</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#C59B48]">•</span>
                    <span>Secured by PhonePe, Google Pay & Cash on Delivery (COD)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
