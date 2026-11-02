"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { logger } from "@/lib/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error("Storefront runtime exception caught by ErrorBoundary", error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-canvas-subtle">
      <div className="max-w-md w-full bg-white border border-[#eaeaec] rounded-sm p-8 shadow-xs text-center space-y-6">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block">
            Atelier Exception
          </span>
          <h1 className="font-serif text-2xl font-bold text-noir-900">
            An Unexpected Disruption Occurred
          </h1>
          <p className="text-xs text-noir-600 leading-relaxed">
            Our atelier encountered a momentary system variance. Your order basket and security state
            remain protected.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-noir-400 bg-[#faf9f5] border border-[#f0e3cc] py-1 px-2 rounded inline-block mt-2">
              Ref: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#f5f5f6] hover:bg-[#ededef] text-noir-900 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
