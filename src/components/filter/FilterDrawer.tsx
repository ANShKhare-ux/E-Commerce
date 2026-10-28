'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';

interface FilterDrawerProps {
  categories: string[];
  brands: string[];
  totalResults: number;
}

export function FilterDrawer({ categories, brands, totalResults }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-1.5 px-3.5 py-1.5 border border-border text-xs uppercase tracking-wider font-medium text-primary hover:border-primary transition-colors bg-surface"
        aria-label="Open filter options"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Product Filters"
        >
          {/* Backdrop click dismiss */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Drawer Pane */}
          <div className="relative w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-hidden z-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-surface">
              <div>
                <h3 className="font-serif text-base font-normal text-primary">
                  Refine Discovery
                </h3>
                <p className="text-[11px] text-muted">{totalResults} products available</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted hover:text-primary rounded-full"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="p-6 overflow-y-auto flex-1">
              <FilterSidebar
                categories={categories}
                brands={brands}
                onFilterChange={() => setIsOpen(false)}
              />
            </div>

            {/* Sticky Apply Button */}
            <div className="p-4 border-t border-border bg-surface">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
              >
                Apply & View Results ({totalResults})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
