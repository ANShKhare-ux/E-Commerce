"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Clock } from "lucide-react";

export function isValidRecentlyViewedProduct(p: unknown): p is Product {
  if (!p || typeof p !== "object") return false;
  const prod = p as Record<string, unknown>;
  return (
    typeof prod.id === "string" &&
    prod.id.trim().length > 0 &&
    typeof prod.name === "string" &&
    prod.name.trim().length > 0 &&
    typeof prod.slug === "string" &&
    prod.slug.trim().length > 0 &&
    typeof prod.base_price === "number" &&
    !isNaN(prod.base_price) &&
    prod.base_price >= 0
  );
}

export function getStoredRecentlyViewed(limit = 4, excludeId?: string): Product[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    if (!window.localStorage) return [];
    const raw = window.localStorage.getItem("lumiere_recently_viewed");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter(isValidRecentlyViewedProduct);
    const filtered = excludeId ? valid.filter((p) => p.id !== excludeId) : valid;
    return filtered.slice(0, limit);
  } catch {
    return [];
  }
}

export interface RecentlyViewedProps {
  excludeId?: string;
  limit?: number;
}

export function RecentlyViewed({ excludeId, limit = 4 }: RecentlyViewedProps = {}) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRecentProducts(getStoredRecentlyViewed(limit, excludeId));

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "lumiere_recently_viewed" || e.key === null) {
        setRecentProducts(getStoredRecentlyViewed(limit, excludeId));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [excludeId, limit]);

  if (!mounted || recentProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center gap-2 border-b border-canvas-border pb-3">
        <Clock className="w-4 h-4 text-gold-600" />
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-noir-500">
          Personal History
        </span>
        <h2 className="font-serif text-xl sm:text-2xl text-noir-900 font-medium ml-2">
          Recently Viewed Designs
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewed;

