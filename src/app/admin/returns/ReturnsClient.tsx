"use client";

import React, { useState } from "react";
import { ReturnRequest } from "@/types";
import { RotateCcw, CheckCircle2, ShieldCheck, AlertCircle, Loader2, X } from "lucide-react";

interface ReturnsClientProps {
  initialReturns: ReturnRequest[];
}

export function ReturnsClient({ initialReturns }: ReturnsClientProps) {
  const [returns, setReturns] = useState(initialReturns);
  const [selectedReturn, setSelectedReturn] = useState<ReturnRequest | null>(null);
  const [inspectionNotes, setInspectionNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleInspectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReturn || !inspectionNotes.trim()) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/returns/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          returnId: selectedReturn.id,
          notes: inspectionNotes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setReturns((prev) =>
        prev.map((r) =>
          r.id === selectedReturn.id
            ? {
                ...r,
                status: "received_and_inspected",
                inspection_notes: inspectionNotes.trim(),
                restocked_at: new Date().toISOString(),
              }
            : r
        )
      );

      setSelectedReturn(null);
      setInspectionNotes("");
      setStatusMessage("Inspection logged. Garment successfully restocked to available physical inventory.");
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Reverse Logistics & Quality Assurance
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Returns & Physical Restock Inspection
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Strict policy enforcement: stock is only replenished after verified physical inspection.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-canvas-light border border-canvas-border text-xs rounded-sm font-medium text-noir-800">
          {statusMessage}
        </div>
      )}

      <div className="bg-white border border-canvas-border rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-canvas-border text-noir-600 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Return ID</th>
                <th className="py-3 px-4">Reverse Waybill</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Restocked Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas-subtle">
              {returns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-noir-500">
                    No return requests currently logged.
                  </td>
                </tr>
              ) : (
                returns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-canvas-light transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-noir-900">{ret.id}</td>
                    <td className="py-3 px-4 font-mono text-noir-600">{ret.return_tracking_number || "—"}</td>
                    <td className="py-3 px-4 text-noir-800">{ret.reason}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        ret.status === "received_and_inspected"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {ret.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-noir-500">
                      {ret.restocked_at ? new Date(ret.restocked_at).toLocaleDateString("en-IN") : "Pending Inspection"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {!ret.restocked_at ? (
                        <button
                          onClick={() => setSelectedReturn(ret)}
                          className="bg-noir-900 hover:bg-gold-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm transition-colors"
                        >
                          Inspect & Restock
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-semibold text-[11px] flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Restocked</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspection Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-canvas-border rounded-sm max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-canvas-border pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-noir-900">
                  Inspect Returned Merchandise
                </h3>
                <p className="text-xs text-noir-500 font-mono mt-0.5">
                  Return ID: {selectedReturn.id}
                </p>
              </div>
              <button onClick={() => setSelectedReturn(null)} className="text-noir-400 hover:text-noir-900 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInspectSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-canvas-subtle rounded-sm text-noir-700 space-y-1">
                <p><strong>Customer Return Reason:</strong> {selectedReturn.reason}</p>
                <p className="text-[11px] text-noir-500">Check for: Unworn state, original tags, zero perfume odor, intact gota patti / zari work.</p>
              </div>

              <div>
                <label className="block font-semibold text-noir-800 mb-1">
                  Physical Inspection Notes *
                </label>
                <textarea
                  rows={3}
                  required
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  placeholder="e.g. Fabric verified in pristine unworn condition. Original security tag intact. Approved for immediate inventory restoration."
                  className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-canvas-border">
                <button
                  type="button"
                  onClick={() => setSelectedReturn(null)}
                  className="px-4 py-2 text-xs text-noir-600 hover:text-noir-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !inspectionNotes.trim()}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Pass Inspection & Restock</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
