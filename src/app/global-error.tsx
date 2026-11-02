"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { logger } from "@/lib/logger";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logger.error("Root critical runtime error caught by GlobalError", error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf9f5] flex items-center justify-center p-4 font-sans text-[#282c3f]">
        <div className="max-w-md w-full bg-white border border-[#eaeaec] rounded-sm p-8 shadow-xs text-center space-y-6">
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C59B48] block font-mono">
              LUMIÈRE Atelier • India
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#14151a]">
              Critical System Disruption
            </h1>
            <p className="text-xs text-[#696e79] leading-relaxed">
              A foundational error interrupted the application lifecycle. Please attempt to reset
              the session.
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-[#696e79] bg-[#f5f5f6] py-1 px-2 rounded inline-block mt-2">
                Trace: {error.digest}
              </p>
            )}
          </div>

          <div>
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#14151a] hover:bg-[#C59B48] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
