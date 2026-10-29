"use client";

import React, { useState } from "react";
import { Coupon } from "@/types";
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Percent,
  DollarSign
} from "lucide-react";

interface PromotionsClientProps {
  initialCoupons: Coupon[];
}

export function PromotionsClient({ initialCoupons }: PromotionsClientProps) {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New Coupon Form
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("1999");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!code.trim()) {
      setMessage({ type: "error", text: "Please enter a valid coupon code." });
      return;
    }

    const val = parseFloat(discountValue);
    const minVal = parseFloat(minOrderValue);

    if (isNaN(val) || val <= 0) {
      setMessage({ type: "error", text: "Discount value must be greater than 0." });
      return;
    }

    if (discountType === "percentage" && val > 90) {
      setMessage({ type: "error", text: "Percentage discount cannot exceed 90%." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          description: description.trim(),
          discount_type: discountType,
          discount_value: val,
          min_order_value: isNaN(minVal) ? 0 : minVal,
          max_discount: maxDiscount ? parseFloat(maxDiscount) : undefined,
          usage_limit: usageLimit ? parseInt(usageLimit, 10) : undefined,
          expires_at: expiresAt || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCoupons([data.coupon, ...coupons]);
        setIsCreating(false);
        setCode("");
        setDescription("");
        setDiscountValue("");
        setMaxDiscount("");
        setUsageLimit("");
        setExpiresAt("");
        setMessage({ type: "success", text: `Coupon ${data.coupon.code} created successfully.` });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to create coupon." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error creating coupon." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async (couponCode: string) => {
    if (!confirm(`Are you sure you want to deactivate and remove coupon ${couponCode}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/promotions?code=${encodeURIComponent(couponCode)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCoupons(coupons.filter((c) => c.code !== couponCode));
        setMessage({ type: "success", text: `Coupon ${couponCode} deleted.` });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to delete coupon." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error deleting coupon." });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Marketing & Revenue
          </span>
          <h1 className="font-serif text-3xl text-noir-900 font-medium">
            Promotions & Coupon Management
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Configure server-authoritative discount codes, prepaid offers, and cart minimums.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? "Cancel" : "Create New Coupon"}</span>
        </button>
      </div>

      {/* Notifications */}
      {message && (
        <div
          className={`p-4 rounded-sm text-xs flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Create Coupon Drawer/Form */}
      {isCreating && (
        <form
          onSubmit={handleCreateCoupon}
          className="bg-white border border-canvas-border p-6 rounded-sm shadow-subtle space-y-6"
        >
          <div className="flex items-center gap-2 text-noir-900 font-serif text-lg font-medium border-b border-canvas-border pb-3">
            <Tag className="w-5 h-5 text-gold-600" />
            <span>Issue New Promotional Coupon</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
                Coupon Code *
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. FESTIVE2025"
                required
                className="w-full text-xs font-mono font-bold tracking-wider uppercase p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
                Discount Type *
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              >
                <option value="percentage">Percentage (%) Discount</option>
                <option value="fixed">Fixed Amount (₹ INR) Discount</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
                {discountType === "percentage" ? "Discount Percentage (%) *" : "Discount Amount (₹ INR) *"}
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountType === "percentage" ? "15" : "500"}
                min="1"
                max={discountType === "percentage" ? "90" : "50000"}
                required
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
                Minimum Cart Value (₹ INR) *
              </label>
              <input
                type="number"
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(e.target.value)}
                placeholder="1999"
                min="0"
                required
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>

            {discountType === "percentage" && (
              <div>
                <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
                  Maximum Discount Cap (₹ INR Optional)
                </label>
                <input
                  type="number"
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(e.target.value)}
                  placeholder="e.g. 1500"
                  min="0"
                  className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
                Usage Limit (Total Claims Optional)
              </label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                placeholder="e.g. 500"
                min="1"
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
                Description / Terms
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Flat ₹500 off on festive atelier orders above ₹2,999"
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-canvas-border">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-5 py-2 text-xs font-medium text-noir-600 hover:text-noir-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gold-600 hover:bg-gold-500 text-noir-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Coupon"}
            </button>
          </div>
        </form>
      )}

      {/* Coupons Table */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs overflow-hidden">
        <div className="p-4 border-b border-canvas-border bg-canvas-subtle/50 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-noir-800">
            Active Store Coupons ({coupons.length})
          </span>
          <span className="text-[11px] text-noir-500">
            Coupons are verified authoritatively on server checkout
          </span>
        </div>

        {coupons.length === 0 ? (
          <div className="p-12 text-center text-xs text-noir-500 space-y-2">
            <Tag className="w-8 h-8 text-noir-400 mx-auto" />
            <p>No promotional coupons configured yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-canvas-border">
              <thead className="bg-canvas-subtle text-noir-600 text-[11px] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Coupon Code</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Min Spend</th>
                  <th className="py-3 px-4">Cap</th>
                  <th className="py-3 px-4">Usage</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-canvas-border text-noir-800">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-canvas-subtle/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-noir-900">
                      <span className="bg-noir-100 border border-noir-300 px-2 py-0.5 rounded text-xs tracking-wider">
                        {c.code}
                      </span>
                      {c.description && (
                        <p className="font-sans font-normal text-[11px] text-noir-500 mt-1">
                          {c.description}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-emerald-800">
                      {c.discount_type === "percentage" ? `${c.discount_value}% OFF` : `₹${c.discount_value.toLocaleString("en-IN")} OFF`}
                    </td>
                    <td className="py-3.5 px-4">
                      ₹{c.min_order_value.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 text-noir-500">
                      {c.max_discount ? `₹${c.max_discount.toLocaleString("en-IN")}` : "No Cap"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-noir-900">{c.usage_count}</span>
                      {c.usage_limit ? (
                        <span className="text-noir-500 text-[11px]"> / {c.usage_limit}</span>
                      ) : (
                        <span className="text-noir-400 text-[11px]"> (unlimited)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          c.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-noir-200 text-noir-700"
                        }`}
                      >
                        {c.is_active ? "Active" : "Archived"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteCoupon(c.code)}
                        className="p-1.5 text-noir-400 hover:text-red-700 transition-colors"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
