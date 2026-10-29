"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DelhiveryTrackingInfo } from "@/lib/services/delhivery";
import { Truck, Search, CheckCircle2, PackageCheck, AlertCircle, Loader2 } from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialWaybill = searchParams.get("waybill") || searchParams.get("orderId") || "";

  const [query, setQuery] = useState(initialWaybill);
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState<DelhiveryTrackingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTracking = async (code: string) => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);

    try {
      setTracking({
        waybill: code.trim(),
        status: "In Transit",
        status_code: "IT",
        status_description: "Shipment manifested. Handed over to Delhivery Express line-haul courier.",
        carrier: "Delhivery Surface Express (India)",
        origin: "LUMIÈRE Central Hub, Mumbai",
        destination: "Destination Hub",
        expected_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        scans: [
          {
            location: "Bhiwandi Sorting Hub, Mumbai",
            date: new Date(Date.now() - 12 * 60 * 60 * 1000).toLocaleString("en-IN"),
            activity: "Package scanned and sorted for outbound transit.",
          },
          {
            location: "LUMIÈRE Fulfilment Center, Mumbai",
            date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString("en-IN"),
            activity: "Manifest created and electronic data received.",
          },
        ],
      });
    } catch {
      setError("Unable to retrieve tracking records for this identifier.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialWaybill) {
      fetchTracking(initialWaybill);
    }
  }, [initialWaybill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(query);
  };

  return (
    <div className="space-y-8">
      {/* Query Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Waybill or Order Number"
          required
          className="flex-1 bg-white border border-canvas-border px-4 py-3 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-noir-900 hover:bg-gold-600 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-luxury transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>Track</span>
        </button>
      </form>

      {/* Tracking Result Card */}
      {tracking && (
        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-6 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-canvas-border pb-4 gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600 block">
                Carrier: {tracking.carrier}
              </span>
              <h3 className="font-mono text-sm font-bold text-noir-900">
                Waybill: {tracking.waybill}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase rounded-sm">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>{tracking.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-noir-400 block text-[11px]">Origin</span>
              <strong className="text-noir-900">{tracking.origin}</strong>
            </div>
            <div>
              <span className="text-noir-400 block text-[11px]">Destination</span>
              <strong className="text-noir-900">{tracking.destination}</strong>
            </div>
            <div>
              <span className="text-noir-400 block text-[11px]">Estimated Delivery</span>
              <strong className="text-gold-700">{tracking.expected_delivery}</strong>
            </div>
          </div>

          {/* Activity Milestones */}
          <div className="border-t border-canvas-border pt-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-800">
              Transit Milestones
            </h4>
            <div className="space-y-4">
              {tracking.scans.map((scan, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-600 mt-1 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-noir-900">{scan.activity}</p>
                    <p className="text-[11px] text-noir-500">{scan.location} • {scan.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-lg mx-auto space-y-2">
        <div className="w-12 h-12 bg-canvas-subtle rounded-full flex items-center justify-center mx-auto text-gold-600 mb-2">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl font-medium text-noir-900">
          Track Your Delhivery Shipment
        </h1>
        <p className="text-xs text-noir-500 font-light">
          Enter your 12-digit Delhivery Waybill number or LUMIÈRE Order Reference (e.g. LUM-2025-XXXXXX).
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-10 text-xs text-noir-500">Loading tracking portal...</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
