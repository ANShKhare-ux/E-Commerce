"use client";

import React, { useState } from "react";
import { DelhiveryServiceabilityResponse } from "@/lib/services/delhivery";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DelhiveryServiceabilityResponse | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/delhivery/check-pincode?pincode=${encodeURIComponent(pincode.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        serviceable: false,
        pincode,
        cod_available: false,
        prepaid_available: false,
        estimated_delivery_days: 0,
        error: "Unable to verify serviceability at this time.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-canvas-border bg-canvas-subtle p-4 rounded-sm">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-noir-800">
        <MapPin className="w-4 h-4 text-gold-600" />
        <span>Check Delhivery Express Delivery & COD</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="Enter 6-digit Indian PIN code"
          className="flex-1 bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
        />
        <button
          type="submit"
          disabled={loading || pincode.length !== 6}
          className="bg-noir-900 hover:bg-gold-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-sm disabled:opacity-50 flex items-center justify-center min-w-[70px]"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Check"}
        </button>
      </form>

      {result && (
        <div className="mt-3 text-xs">
          {result.serviceable ? (
            <div className="space-y-1 text-emerald-800 bg-emerald-50 p-2.5 rounded-sm border border-emerald-200">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Serviceable in {result.city}, {result.state}</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                • Standard delivery in <strong>{result.estimated_delivery_days} business days</strong>
              </p>
              <p className="text-[11px] text-emerald-700">
                • Cash on Delivery (COD): <strong>{result.cod_available ? "Available" : "Prepaid Only"}</strong>
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-1.5 text-rose-800 bg-rose-50 p-2.5 rounded-sm border border-rose-200">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{result.error || "Currently not serviceable by courier partner."}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
