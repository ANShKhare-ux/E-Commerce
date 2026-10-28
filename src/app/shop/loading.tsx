import React from 'react';

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="h-3 w-32 bg-[#EAE8E2]" />
        <div className="h-8 w-64 bg-[#EAE8E2]" />
        <div className="h-4 w-40 bg-[#EAE8E2]" />
      </div>

      {/* Catalog Layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-2">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="h-6 w-24 bg-[#EAE8E2]" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-[#EAE8E2]" />
            <div className="h-8 w-full bg-[#EAE8E2]" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-[#EAE8E2]" />
            <div className="h-8 w-full bg-[#EAE8E2]" />
          </div>
        </div>

        {/* Product Cards skeleton */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3 bg-surface p-2 border border-border-subtle">
                <div className="aspect-[3/4] bg-[#EAE8E2]" />
                <div className="h-3 w-20 bg-[#EAE8E2]" />
                <div className="h-4 w-36 bg-[#EAE8E2]" />
                <div className="h-4 w-24 bg-[#EAE8E2]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
