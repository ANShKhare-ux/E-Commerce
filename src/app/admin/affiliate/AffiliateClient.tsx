"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AffiliateProduct } from "@/types";
import { 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Loader2, 
  AlertTriangle 
} from "lucide-react";

interface AffiliateClientProps {
  initialQueue: AffiliateProduct[];
}

export function AffiliateClient({ initialQueue }: AffiliateClientProps) {
  const [queue, setQueue] = useState(initialQueue);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = async (id: string, reviewStatus: 'pending' | 'approved' | 'rejected', isPublished: boolean) => {
    setLoadingId(id);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/affiliate/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, reviewStatus, isPublished }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setQueue((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, review_status: reviewStatus, is_published: isPublished } : item
        )
      );
      setMessage(`Item status updated to ${reviewStatus} (Published: ${isPublished ? "Yes" : "No"}).`);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  const handleSyncFeeds = async () => {
    setSyncing(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/affiliate/sync", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage(data.message);
    } catch (err: any) {
      setMessage(`Sync error: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            External Partnerships
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Affiliate Curation Review Queue
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Workflow: Import → Validate → Admin Approval → Publish → Synchronize
          </p>
        </div>

        <button
          onClick={handleSyncFeeds}
          disabled={syncing}
          className="bg-gold-600 hover:bg-gold-500 text-noir-900 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
        >
          {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          <span>Synchronize Feeds Now</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-canvas-light border border-canvas-border text-xs rounded-sm font-medium text-noir-800">
          {message}
        </div>
      )}

      {/* Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {queue.map((item) => {
          const isProcessing = loadingId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-sm p-5 space-y-4 shadow-xs transition-colors ${
                !item.in_stock
                  ? "border-amber-300 bg-amber-50/20"
                  : "border-canvas-border"
              }`}
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-28 bg-canvas-subtle rounded-sm overflow-hidden shrink-0 border border-canvas-border">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600">
                      {item.source_name}
                    </span>
                    <span className="text-[10px] font-mono text-noir-400">{item.external_id}</span>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-noir-900 line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-noir-600 font-medium">Brand: {item.brand}</p>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-sans font-bold text-sm text-noir-900">
                      ₹{item.original_price.toLocaleString("en-IN")}
                    </span>
                    {!item.in_stock && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                        Out of Stock at Partner
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status and Direct Link */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-canvas-subtle">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-noir-500">Review Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.review_status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.review_status === "rejected"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.review_status}
                  </span>
                  {item.is_published && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Live on Store
                    </span>
                  )}
                </div>

                <a
                  href={item.destination_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-700 hover:text-gold-900 font-bold flex items-center gap-1 text-[11px]"
                >
                  <span>Verify Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-1">
                {item.review_status !== "approved" && (
                  <button
                    onClick={() => handleUpdate(item.id, "approved", true)}
                    disabled={isProcessing}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>Approve & Publish</span>
                  </button>
                )}

                {item.is_published && (
                  <button
                    onClick={() => handleUpdate(item.id, "approved", false)}
                    disabled={isProcessing}
                    className="bg-noir-700 hover:bg-noir-900 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-colors"
                  >
                    Unpublish
                  </button>
                )}

                {item.review_status !== "rejected" && (
                  <button
                    onClick={() => handleUpdate(item.id, "rejected", false)}
                    disabled={isProcessing}
                    className="bg-rose-100 hover:bg-rose-200 text-rose-800 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
