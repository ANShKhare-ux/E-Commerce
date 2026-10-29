"use client";

import React, { useState } from "react";
import { InventoryRecord, InventoryMovement } from "@/types";
import { 
  Boxes, 
  Upload, 
  AlertTriangle, 
  History, 
  Check, 
  X, 
  Edit3, 
  Loader2, 
  PlusCircle,
  FileSpreadsheet
} from "lucide-react";

interface InventoryClientProps {
  initialInventory: Array<InventoryRecord & { sku: string; productName: string; variantTitle: string }>;
  initialMovements: InventoryMovement[];
}

export function InventoryClient({ initialInventory, initialMovements }: InventoryClientProps) {
  const [inventoryList, setInventoryList] = useState(initialInventory);
  const [movements, setMovements] = useState(initialMovements);
  const [search, setSearch] = useState("");
  const [showMovements, setShowMovements] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);

  // Stock Adjustment Modal State
  const [selectedItem, setSelectedItem] = useState<(InventoryRecord & { sku: string; productName: string; variantTitle: string }) | null>(null);
  const [newStock, setNewStock] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // CSV Import State
  const [csvContent, setCsvContent] = useState("");
  const [csvResult, setCsvResult] = useState<{ updatedCount: number; errors: string[] } | null>(null);

  const filteredInventory = inventoryList.filter((item) =>
    item.sku.toLowerCase().includes(search.toLowerCase()) ||
    item.productName.toLowerCase().includes(search.toLowerCase()) ||
    item.variantTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !adjustmentReason.trim()) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/inventory/adjust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId: selectedItem.variant_id,
          newPhysicalStock: parseInt(newStock, 10),
          reason: adjustmentReason.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Update local state
      setInventoryList((prev) =>
        prev.map((i) =>
          i.variant_id === selectedItem.variant_id
            ? {
                ...i,
                physical_stock: parseInt(newStock, 10),
                available_stock: Math.max(0, parseInt(newStock, 10) - i.reserved_stock),
              }
            : i
        )
      );

      // Add movement record
      setMovements((prev) => [
        {
          id: `mov-${Date.now()}`,
          variant_id: selectedItem.variant_id,
          sku: selectedItem.sku,
          quantity_change: parseInt(newStock, 10) - selectedItem.physical_stock,
          movement_type: "manual_adjustment",
          reason: adjustmentReason.trim(),
          created_by: "administrator",
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);

      setSelectedItem(null);
      setAdjustmentReason("");
      setStatusMessage("Stock level successfully adjusted with audit entry.");
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCsvImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvContent.trim()) return;

    setLoading(true);
    setCsvResult(null);

    try {
      const res = await fetch("/api/admin/inventory/bulk-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvData: csvContent }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCsvResult({
        updatedCount: data.updatedCount,
        errors: data.errors || [],
      });

      // Refresh list
      window.location.reload();
    } catch (err: any) {
      setCsvResult({ updatedCount: 0, errors: [err.message] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            SKU & Stock Control
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Automatic Inventory & Movement Audits
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Concurrency-guaranteed inventory tracking with atomic reservation holds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMovements(!showMovements)}
            className="bg-white border border-canvas-border hover:border-noir-900 text-noir-800 text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-sm transition-colors flex items-center gap-1.5"
          >
            <History className="w-4 h-4 text-gold-600" />
            <span>{showMovements ? "Hide History" : "View Movements Log"}</span>
          </button>

          <button
            onClick={() => setShowCsvModal(true)}
            className="bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-sm transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Import CSV</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-canvas-light border border-canvas-border text-xs rounded-sm font-medium text-noir-800">
          {statusMessage}
        </div>
      )}

      {/* 2. Movements Log Overlay / Section */}
      {showMovements && (
        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4 shadow-subtle">
          <div className="flex items-center justify-between border-b border-canvas-border pb-3">
            <h3 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
              <History className="w-4 h-4 text-gold-600" />
              <span>Full Inventory Movements Audit Log</span>
            </h3>
            <span className="text-xs text-noir-500 font-mono">
              Total {movements.length} audit entries
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-canvas-border text-noir-500 text-[10px] uppercase tracking-wider">
                  <th className="py-2">Timestamp</th>
                  <th className="py-2">SKU / Variant</th>
                  <th className="py-2">Type</th>
                  <th className="py-2 text-center">Change</th>
                  <th className="py-2">Reason / Audit Trail</th>
                  <th className="py-2 text-right">Initiator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-canvas-subtle font-mono text-[11px]">
                {movements.map((mov) => (
                  <tr key={mov.id} className="hover:bg-canvas-light">
                    <td className="py-2 text-noir-400">
                      {new Date(mov.created_at).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-2 font-bold text-noir-800">{mov.sku || mov.variant_id}</td>
                    <td className="py-2">
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider bg-canvas-subtle border border-canvas-border">
                        {mov.movement_type}
                      </span>
                    </td>
                    <td className="py-2 text-center font-bold font-sans">
                      <span
                        className={
                          mov.quantity_change > 0
                            ? "text-emerald-700"
                            : mov.quantity_change < 0
                            ? "text-red-700"
                            : "text-noir-500"
                        }
                      >
                        {mov.quantity_change > 0 ? `+${mov.quantity_change}` : mov.quantity_change}
                      </span>
                    </td>
                    <td className="py-2 font-sans text-noir-600 max-w-xs truncate" title={mov.reason}>
                      {mov.reason}
                    </td>
                    <td className="py-2 text-right text-noir-500">{mov.created_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Search Bar */}
      <div className="flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by SKU (e.g. LUM-ETH-GUL-S-ROSE) or Product Title..."
          className="flex-1 bg-white border border-canvas-border px-4 py-2.5 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
        />
        <div className="bg-white border border-canvas-border px-3 py-2 text-xs text-noir-500 flex items-center gap-1 rounded-sm">
          <span>Displaying {filteredInventory.length} of {inventoryList.length} SKUs</span>
        </div>
      </div>

      {/* 4. SKU Inventory Table */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-canvas-border text-noir-600 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">Product Name & Variant</th>
                <th className="py-3 px-4 text-center">Physical Stock</th>
                <th className="py-3 px-4 text-center">Active Reserved</th>
                <th className="py-3 px-4 text-center">Available Stock</th>
                <th className="py-3 px-4 text-center">Low-Stock Alert</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas-subtle">
              {filteredInventory.map((item) => {
                const isLow = item.available_stock <= item.low_stock_threshold;

                return (
                  <tr key={item.id} className="hover:bg-canvas-light transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-noir-900">
                      {item.sku}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-serif font-medium text-noir-900">{item.productName}</p>
                      <p className="text-[11px] text-noir-500">{item.variantTitle}</p>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-noir-800">
                      {item.physical_stock}
                    </td>
                    <td className="py-3.5 px-4 text-center text-noir-600">
                      {item.reserved_stock > 0 ? (
                        <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {item.reserved_stock} reserved
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-sm">
                      <span className={item.available_stock === 0 ? "text-red-700" : isLow ? "text-amber-700" : "text-emerald-700"}>
                        {item.available_stock}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Low (≤ {item.low_stock_threshold})</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-noir-400">Normal</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setNewStock(item.physical_stock.toString());
                        }}
                        className="inline-flex items-center gap-1 bg-noir-900 hover:bg-gold-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-sm transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Adjust</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Adjust Stock Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-canvas-border rounded-sm max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-canvas-border pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-noir-900">
                  Manual Stock Adjustment
                </h3>
                <p className="text-xs text-noir-500 font-mono mt-0.5">
                  SKU: {selectedItem.sku}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-noir-400 hover:text-noir-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-canvas-subtle rounded-sm space-y-1">
                <p className="font-medium text-noir-800">{selectedItem.productName}</p>
                <p className="text-noir-500">{selectedItem.variantTitle}</p>
                <p className="text-[11px] text-noir-400">
                  Current Physical Stock: <strong>{selectedItem.physical_stock}</strong> (Active Reserved: {selectedItem.reserved_stock})
                </p>
              </div>

              <div>
                <label className="block font-semibold text-noir-800 mb-1">
                  New Physical Stock Count *
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm font-bold text-base"
                />
              </div>

              <div>
                <label className="block font-semibold text-noir-800 mb-1">
                  Adjustment Reason (Strictly Required for Audit) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  placeholder="e.g., Physical stock intake from Jaipur loom, Damaged piece write-off, Cycle count correction..."
                  className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-canvas-border">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs text-noir-600 hover:text-noir-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !adjustmentReason.trim()}
                  className="bg-noir-900 hover:bg-gold-600 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Adjustment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Bulk CSV Import Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-canvas-border rounded-sm max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-canvas-border pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-gold-600" />
                  <span>Bulk Inventory CSV Intake</span>
                </h3>
                <p className="text-xs text-noir-500 font-light mt-0.5">
                  Update inventory counts across multiple SKUs in a single batch.
                </p>
              </div>
              <button
                onClick={() => setShowCsvModal(false)}
                className="text-noir-400 hover:text-noir-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCsvImport} className="space-y-4 text-xs">
              <div className="p-3 bg-canvas-subtle rounded-sm text-[11px] text-noir-600 space-y-1">
                <p className="font-bold text-noir-800">Expected CSV Format (Comma-separated):</p>
                <p className="font-mono text-[10px] text-noir-700 bg-white p-2 border border-canvas-border rounded">
                  SKU,PhysicalStock,LowStockThreshold,Reason<br />
                  LUM-ETH-GUL-S-ROSE,25,5,Restocked from Chanderi workshop<br />
                  LUM-STR-HD1-M-BLK,50,8,New drop intake
                </p>
              </div>

              <div>
                <label className="block font-semibold text-noir-800 mb-1">
                  Paste CSV Content *
                </label>
                <textarea
                  rows={6}
                  required
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  placeholder="Paste your CSV rows here..."
                  className="w-full bg-white border border-canvas-border p-3 text-xs font-mono focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              {csvResult && (
                <div
                  className={`p-3 rounded-sm text-xs border ${
                    csvResult.errors.length > 0
                      ? "bg-rose-50 border-rose-200 text-rose-800"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  }`}
                >
                  <p className="font-bold">
                    Successfully updated {csvResult.updatedCount} SKU record(s).
                  </p>
                  {csvResult.errors.length > 0 && (
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
                      {csvResult.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-canvas-border">
                <button
                  type="button"
                  onClick={() => setShowCsvModal(false)}
                  className="px-4 py-2 text-xs text-noir-600 hover:text-noir-900"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading || !csvContent.trim()}
                  className="bg-noir-900 hover:bg-gold-600 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Import Records</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
