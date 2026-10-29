"use client";

import React, { useState } from "react";
import {
  Sliders,
  Truck,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Save,
} from "lucide-react";

export default function AdminPoliciesPage() {
  // Shipping settings
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("2999");
  const [standardShippingFee, setStandardShippingFee] = useState("199");
  const [codHandlingFee, setCodHandlingFee] = useState("0");
  const [metroSlaDays, setMetroSlaDays] = useState("3");
  const [regionalSlaDays, setRegionalSlaDays] = useState("5");

  // Returns settings
  const [returnWindowDays, setReturnWindowDays] = useState("7");
  const [inspectionRequired, setInspectionRequired] = useState(true);
  const [restockFeePercent, setRestockFeePercent] = useState("0");
  const [allowCodReturns, setAllowCodReturns] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Store Governance
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Shipping, Delivery & Returns Policies
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Configure pan-India logistics parameters, Delhivery SLAs, and quality inspection rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-noir-900 hover:bg-gold-600 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Policy Configuration</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Logistics thresholds and return inspection policies updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SHIPPING & DELHIVERY SETTINGS */}
        <div className="bg-white border border-canvas-border p-6 rounded-sm shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-canvas-border pb-3">
            <Truck className="w-5 h-5 text-gold-600" />
            <h3 className="font-serif text-lg font-bold text-noir-900">
              Pan-India Shipping & Courier Rules
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                Complimentary Shipping Threshold (INR ₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-noir-400">₹</span>
                <input
                  type="number"
                  min="0"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900 font-mono"
                />
              </div>
              <p className="text-[11px] text-noir-500 mt-1">
                Orders with cart subtotal exceeding this amount receive free Delhivery express courier.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                  Standard Shipping Fee (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-noir-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={standardShippingFee}
                    onChange={(e) => setStandardShippingFee(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                  COD Convenience Fee (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-noir-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={codHandlingFee}
                    onChange={(e) => setCodHandlingFee(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                  Metro Delivery SLA (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={metroSlaDays}
                  onChange={(e) => setMetroSlaDays(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                  Regional Delivery SLA (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={regionalSlaDays}
                  onChange={(e) => setRegionalSlaDays(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RETURNS & QUALITY INSPECTION RULES */}
        <div className="bg-white border border-canvas-border p-6 rounded-sm shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-canvas-border pb-3">
            <RotateCcw className="w-5 h-5 text-gold-600" />
            <h3 className="font-serif text-lg font-bold text-noir-900">
              Returns & Inspection Protocol
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                Return Window Eligibility (Days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={returnWindowDays}
                onChange={(e) => setReturnWindowDays(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900 font-mono"
              />
              <p className="text-[11px] text-noir-500 mt-1">
                Standard luxury apparel return window starting from Delhivery delivery timestamp.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inspectionRequired}
                  onChange={(e) => setInspectionRequired(e.target.checked)}
                  className="w-4 h-4 accent-gold-600 mt-0.5"
                />
                <div>
                  <span className="text-xs font-bold text-noir-900 block">
                    Mandatory Physical Hub Inspection Before Restock
                  </span>
                  <span className="text-[11px] text-noir-500">
                    Restocking is strictly blocked until an authorized inspector verifies tags, seams, and fabric condition at Mumbai fulfillment center.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowCodReturns}
                  onChange={(e) => setAllowCodReturns(e.target.checked)}
                  className="w-4 h-4 accent-gold-600 mt-0.5"
                />
                <div>
                  <span className="text-xs font-bold text-noir-900 block">
                    Allow Cash on Delivery Returns via Bank NEFT / UPI
                  </span>
                  <span className="text-[11px] text-noir-500">
                    COD refunds are disbursed via verified bank account or UPI handle post physical inspection approval.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
