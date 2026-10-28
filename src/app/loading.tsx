import React from 'react';

export default function RootLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-80 sm:h-96 bg-[#EAE8E2] border border-border-subtle" />

      {/* Grid skeletons */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-[#EAE8E2]" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[3/4] bg-[#EAE8E2]" />
              <div className="h-3 w-24 bg-[#EAE8E2]" />
              <div className="h-4 w-40 bg-[#EAE8E2]" />
              <div className="h-4 w-16 bg-[#EAE8E2]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
