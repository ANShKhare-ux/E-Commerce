'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors securely without leaking private state
    console.error('[LUMIÈRE Client Error Boundary]', error.message);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
        <AlertCircle className="w-6 h-6 stroke-[1.5]" />
      </div>

      <span className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono">
        Application Recovery
      </span>

      <h1 className="font-serif text-2xl sm:text-3xl font-light text-primary">
        An Unexpected Error Occurred
      </h1>

      <p className="text-xs sm:text-sm text-muted leading-relaxed font-light">
        We encountered a temporary issue while assembling this curation. Please attempt refreshing or return to the main catalog.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-2.5 border border-border text-primary text-xs uppercase tracking-widest font-medium hover:border-primary transition-colors"
        >
          Explore Catalog
        </Link>
      </div>
    </div>
  );
}
