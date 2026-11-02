import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-canvas-border rounded-sm overflow-hidden animate-pulse">
      {/* 3:4 Image Skeleton */}
      <div className="relative aspect-[3/4] w-full bg-canvas-subtle overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
      </div>

      {/* Card Content Skeleton */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-2">
          {/* Brand Tag */}
          <div className="h-2.5 w-16 bg-noir-200/60 rounded-xs" />

          {/* Product Title */}
          <div className="h-4 w-3/4 bg-noir-200/80 rounded-xs" />

          {/* Origin / Subtitle */}
          <div className="h-2.5 w-1/2 bg-noir-200/50 rounded-xs" />
        </div>

        {/* Pricing Footer */}
        <div className="pt-2.5 border-t border-canvas-subtle flex items-baseline justify-between">
          <div className="h-4 w-20 bg-noir-200/80 rounded-xs" />
          <div className="h-3 w-14 bg-noir-200/50 rounded-xs" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
