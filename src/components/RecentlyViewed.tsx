"use client";

import React, { useEffect, useState, Component, type ReactNode } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Clock } from "lucide-react";

class RecentlyViewedErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("RecentlyViewed render error caught:", error);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("lumiere_recently_viewed");
      }
    } catch {
      // ignore
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function RecentlyViewedContent() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("lumiere_recently_viewed");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.filter(
            (p): p is Product =>
              Boolean(p && typeof p === "object" && p.id && typeof p.base_price === "number")
          );
          setRecentProducts(valid.slice(0, 4));
        }
      }
    } catch (e) {
      console.error("Failed to load recently viewed products", e);
    }
  }, []);

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

export function RecentlyViewed() {
  return (
    <RecentlyViewedErrorBoundary>
      <RecentlyViewedContent />
    </RecentlyViewedErrorBoundary>
  );
}
