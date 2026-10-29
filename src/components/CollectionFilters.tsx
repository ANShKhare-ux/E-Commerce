"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check
} from "lucide-react";

interface CollectionFiltersProps {
  totalCount: number;
  children?: React.ReactNode;
}

export function CollectionFilters({ totalCount, children }: CollectionFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Read current active filters from URL
  const currentCategory = searchParams.get("category") || "";
  const currentGender = searchParams.get("gender") || "";
  const currentStyle = searchParams.get("style") || "";
  const currentSize = searchParams.get("size") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const currentInStock = searchParams.get("inStock") === "true";
  const currentPriceRange = searchParams.get("price") || "";
  const currentDiscount = searchParams.get("discount") === "true";

  // Accordion toggle states
  const [openSections, setOpenSections] = useState({
    gender: true,
    category: true,
    price: true,
    size: true,
    style: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
    setMobileDrawerOpen(false);
  };

  const activeFiltersCount = [
    currentCategory,
    currentGender,
    currentStyle,
    currentSize,
    currentPriceRange,
    currentInStock ? "inStock" : "",
    currentDiscount ? "discount" : "",
  ].filter(Boolean).length;

  const filterContent = (
    <div className="space-y-6 text-xs text-noir-800">
      {/* Active Filter Badges */}
      {activeFiltersCount > 0 && (
        <div className="p-3 bg-canvas-subtle rounded-sm space-y-2 border border-canvas-border">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-noir-600">
            <span>Active Filters ({activeFiltersCount})</span>
            <button
              onClick={clearAllFilters}
              className="text-red-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentGender && (
              <span className="inline-flex items-center gap-1 bg-white border border-canvas-border px-2 py-0.5 rounded text-[11px]">
                <span>{currentGender}</span>
                <button onClick={() => updateFilter("gender", null)}>✕</button>
              </span>
            )}
            {currentCategory && (
              <span className="inline-flex items-center gap-1 bg-white border border-canvas-border px-2 py-0.5 rounded text-[11px]">
                <span className="capitalize">{currentCategory.replace(/-/g, " ")}</span>
                <button onClick={() => updateFilter("category", null)}>✕</button>
              </span>
            )}
            {currentSize && (
              <span className="inline-flex items-center gap-1 bg-white border border-canvas-border px-2 py-0.5 rounded text-[11px]">
                <span>Size {currentSize}</span>
                <button onClick={() => updateFilter("size", null)}>✕</button>
              </span>
            )}
            {currentStyle && (
              <span className="inline-flex items-center gap-1 bg-white border border-canvas-border px-2 py-0.5 rounded text-[11px]">
                <span>Style: {currentStyle}</span>
                <button onClick={() => updateFilter("style", null)}>✕</button>
              </span>
            )}
            {currentPriceRange && (
              <span className="inline-flex items-center gap-1 bg-white border border-canvas-border px-2 py-0.5 rounded text-[11px]">
                <span>Price Filter</span>
                <button onClick={() => updateFilter("price", null)}>✕</button>
              </span>
            )}
            {currentInStock && (
              <span className="inline-flex items-center gap-1 bg-white border border-canvas-border px-2 py-0.5 rounded text-[11px]">
                <span>In Stock Only</span>
                <button onClick={() => updateFilter("inStock", null)}>✕</button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* 1. Gender / Audience */}
      <div className="border-b border-canvas-border pb-4 space-y-2">
        <button
          onClick={() => toggleSection("gender")}
          className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[11px] text-noir-900"
        >
          <span>Department</span>
          {openSections.gender ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.gender && (
          <div className="space-y-1.5 pt-1">
            {[
              { label: "All Departments", val: "" },
              { label: "Men's Apparel", val: "men" },
              { label: "Women's Collection", val: "women" },
              { label: "Unisex & Oversized", val: "unisex" },
            ].map((opt) => (
              <label key={opt.val} className="flex items-center gap-2 cursor-pointer hover:text-gold-700">
                <input
                  type="radio"
                  name="genderFilter"
                  checked={currentGender === opt.val}
                  onChange={() => updateFilter("gender", opt.val || null)}
                  className="rounded text-noir-900 focus:ring-0"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. Categories */}
      <div className="border-b border-canvas-border pb-4 space-y-2">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[11px] text-noir-900"
        >
          <span>Category</span>
          {openSections.category ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.category && (
          <div className="space-y-1.5 pt-1">
            {[
              { label: "All Categories", val: "" },
              { label: "Artisanal Ethnic Wear", val: "ethnic-wear" },
              { label: "Women's Clothing & Linens", val: "womens-clothing" },
              { label: "Men's Tailoring & Shirts", val: "mens-clothing" },
              { label: "District Zero Streetwear", val: "streetwear" },
              { label: "Haute Luxury & Horlogerie", val: "premium-luxury" },
            ].map((opt) => (
              <label key={opt.val} className="flex items-center gap-2 cursor-pointer hover:text-gold-700">
                <input
                  type="radio"
                  name="categoryFilter"
                  checked={currentCategory === opt.val}
                  onChange={() => updateFilter("category", opt.val || null)}
                  className="rounded text-noir-900 focus:ring-0"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. Sizes */}
      <div className="border-b border-canvas-border pb-4 space-y-2">
        <button
          onClick={() => toggleSection("size")}
          className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[11px] text-noir-900"
        >
          <span>Size</span>
          {openSections.size ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.size && (
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => {
              const isSelected = currentSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => updateFilter("size", isSelected ? null : sz)}
                  className={`py-1.5 rounded-sm border text-center text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-noir-900 text-white border-noir-900"
                      : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Style Matrix */}
      <div className="border-b border-canvas-border pb-4 space-y-2">
        <button
          onClick={() => toggleSection("style")}
          className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[11px] text-noir-900"
        >
          <span>Style & Silhouette</span>
          {openSections.style ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.style && (
          <div className="space-y-1.5 pt-1">
            {["Minimal", "Streetwear", "Oversized", "Ethnic", "Casual"].map((st) => {
              const isSelected = currentStyle.toLowerCase() === st.toLowerCase();
              return (
                <label key={st} className="flex items-center gap-2 cursor-pointer hover:text-gold-700">
                  <input
                    type="radio"
                    name="styleFilter"
                    checked={isSelected}
                    onChange={() => updateFilter("style", isSelected ? null : st.toLowerCase())}
                    className="rounded text-noir-900 focus:ring-0"
                  />
                  <span>{st}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Availability & Discounts */}
      <div className="space-y-2 pt-1">
        <label className="flex items-center gap-2 cursor-pointer hover:text-gold-700 font-medium">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) => updateFilter("inStock", e.target.checked ? "true" : null)}
            className="rounded text-noir-900 focus:ring-0"
          />
          <span>In Stock Only</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:text-gold-700 font-medium">
          <input
            type="checkbox"
            checked={currentDiscount}
            onChange={(e) => updateFilter("discount", e.target.checked ? "true" : null)}
            className="rounded text-noir-900 focus:ring-0"
          />
          <span>Discounted / Archive Deals</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Filter & Sort Bar */}
      <div className="border-b border-canvas-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Mobile Filter Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-canvas-border rounded-sm text-xs font-bold uppercase tracking-wider text-noir-900 bg-white"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold-600" />
            <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
          </button>
          <span className="text-xs text-noir-500 font-light">
            Showing <strong>{totalCount}</strong> {totalCount === 1 ? "design" : "designs"}
          </span>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-noir-500 font-medium">Sort By:</span>
          <select
            value={currentSort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="bg-white border border-canvas-border text-noir-900 text-xs px-3 py-1.5 rounded-sm focus:outline-none focus:border-noir-900"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-canvas-border pb-3">
                <span className="font-serif text-lg font-medium text-noir-900">
                  Refine Collection
                </span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 text-noir-500 hover:text-noir-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterContent}
            </div>

            <div className="pt-4 border-t border-canvas-border">
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-3 bg-noir-900 text-white text-xs font-bold uppercase tracking-wider rounded-sm"
              >
                Apply Filters ({totalCount} Designs)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content: Desktop Filter Sidebar + Children (Product Grid) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 bg-white border border-canvas-border p-5 rounded-sm shadow-subtle">
            <h3 className="font-serif text-base font-medium text-noir-900 mb-4 pb-2 border-b border-canvas-border">
              Filters
            </h3>
            {filterContent}
          </div>
        </div>

        {/* Children Grid */}
        <div className="flex-1 min-w-0 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
