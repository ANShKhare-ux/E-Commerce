import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-[#F4F3EF] flex items-center justify-center text-primary mx-auto">
        <Compass className="w-6 h-6 stroke-[1.2]" />
      </div>

      <span className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono">
        404 — Silhouette Not Found
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary">
        The Requested Piece Has Moved
      </h1>

      <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed font-light">
        The garment, curation, or page you were looking for is no longer indexed or may have moved to an updated URL.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-3 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
        >
          Explore Catalog
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-3 border border-border text-primary text-xs uppercase tracking-widest font-medium hover:border-primary transition-colors"
        >
          Return Home
        </Link>
      </div>

      <div className="pt-8 border-t border-border-subtle max-w-md mx-auto">
        <p className="text-[11px] uppercase tracking-wider text-muted mb-3">
          Popular Curations
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <Link
            href="/collections/trending-now"
            className="px-3 py-1 bg-surface border border-border-subtle hover:border-primary text-primary transition-colors text-[11px]"
          >
            Trending Now
          </Link>
          <Link
            href="/collections/under-999"
            className="px-3 py-1 bg-surface border border-border-subtle hover:border-primary text-primary transition-colors text-[11px]"
          >
            Under ₹999
          </Link>
          <Link
            href="/categories/shirts"
            className="px-3 py-1 bg-surface border border-border-subtle hover:border-primary text-primary transition-colors text-[11px]"
          >
            Linen Shirts
          </Link>
          <Link
            href="/categories/jeans"
            className="px-3 py-1 bg-surface border border-border-subtle hover:border-primary text-primary transition-colors text-[11px]"
          >
            Selvedge Denim
          </Link>
        </div>
      </div>
    </div>
  );
}
