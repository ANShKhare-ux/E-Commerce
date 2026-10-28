'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { X, Check } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  className?: string;
  onFilterChange?: () => void;
}

const AUDIENCE_OPTIONS = [
  { value: 'all', label: 'All Genders' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
];

const PRICE_TIERS = [
  { label: 'All Prices', min: undefined, max: undefined },
  { label: 'Under ₹999', min: 0, max: 999 },
  { label: '₹1,000 – ₹4,999', min: 1000, max: 4999 },
  { label: '₹5,000 – ₹9,999', min: 5000, max: 9999 },
  { label: '₹10,000 & Above', min: 10000, max: undefined },
];

export function FilterSidebar({
  categories,
  brands,
  className = '',
  onFilterChange,
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const activeAudience = searchParams.get('audience') || 'all';
  const activeBrand = searchParams.get('brand') || 'all';
  const activeMinPrice = searchParams.get('minPrice');
  const activeMaxPrice = searchParams.get('maxPrice');

  const updateParam = (key: string, val: string | number | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === undefined || val === 'all' || val === '') {
      params.delete(key);
    } else {
      params.set(key, String(val));
    }
    params.delete('page'); // Reset to page 1
    router.push(`${pathname}?${params.toString()}`);
    if (onFilterChange) onFilterChange();
  };

  const setPriceRange = (min?: number, max?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (min !== undefined) {
      params.set('minPrice', String(min));
    } else {
      params.delete('minPrice');
    }

    if (max !== undefined) {
      params.set('maxPrice', String(max));
    } else {
      params.delete('maxPrice');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
    if (onFilterChange) onFilterChange();
  };

  const clearAllFilters = () => {
    router.push(pathname);
    if (onFilterChange) onFilterChange();
  };

  const hasActiveFilters =
    activeCategory !== 'all' ||
    activeAudience !== 'all' ||
    activeBrand !== 'all' ||
    activeMinPrice !== null ||
    activeMaxPrice !== null;

  return (
    <div className={`space-y-8 text-xs ${className}`}>
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <h3 className="uppercase tracking-[0.18em] font-semibold text-primary">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-[11px] text-muted hover:text-primary underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Target Audience / Gender */}
      <div>
        <h4 className="uppercase tracking-[0.15em] font-medium text-primary mb-3 text-[11px]">
          Audience
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {AUDIENCE_OPTIONS.map((item) => {
            const isSelected = activeAudience === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => updateParam('audience', item.value)}
                className={`py-2 px-3 text-center text-xs tracking-wider uppercase transition-colors border ${
                  isSelected
                    ? 'bg-primary text-white border-primary font-medium'
                    : 'bg-surface text-primary border-border hover:border-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="uppercase tracking-[0.15em] font-medium text-primary mb-3 text-[11px]">
          Category
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => updateParam('category', 'all')}
            className={`w-full text-left py-1.5 px-2 text-xs flex items-center justify-between transition-colors ${
              activeCategory === 'all'
                ? 'font-semibold text-primary bg-[#F4F3EF]'
                : 'text-muted hover:text-primary'
            }`}
          >
            <span>All Categories</span>
            {activeCategory === 'all' && <Check className="w-3 h-3 text-primary" />}
          </button>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateParam('category', cat)}
                className={`w-full text-left py-1.5 px-2 text-xs capitalize flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'font-semibold text-primary bg-[#F4F3EF]'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <span>{cat.replace('-', ' ')}</span>
                {isSelected && <Check className="w-3 h-3 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Tiers */}
      <div>
        <h4 className="uppercase tracking-[0.15em] font-medium text-primary mb-3 text-[11px]">
          Price Range (INR)
        </h4>
        <div className="space-y-1.5">
          {PRICE_TIERS.map((tier) => {
            const isSelected =
              (tier.min === undefined && tier.max === undefined && !activeMinPrice && !activeMaxPrice) ||
              (String(tier.min) === activeMinPrice && String(tier.max) === activeMaxPrice) ||
              (tier.min === 10000 && activeMinPrice === '10000' && !activeMaxPrice);

            return (
              <button
                key={tier.label}
                type="button"
                onClick={() => setPriceRange(tier.min, tier.max)}
                className={`w-full text-left py-1.5 px-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'font-semibold text-primary bg-[#F4F3EF]'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <span>{tier.label}</span>
                {isSelected && <Check className="w-3 h-3 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Selector */}
      {brands.length > 0 && (
        <div>
          <h4 className="uppercase tracking-[0.15em] font-medium text-primary mb-3 text-[11px]">
            Brands
          </h4>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => updateParam('brand', 'all')}
              className={`w-full text-left py-1.5 px-2 text-xs flex items-center justify-between transition-colors ${
                activeBrand === 'all'
                  ? 'font-semibold text-primary bg-[#F4F3EF]'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <span>All Brands</span>
              {activeBrand === 'all' && <Check className="w-3 h-3 text-primary" />}
            </button>
            {brands.map((b) => {
              const isSelected = activeBrand === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateParam('brand', b)}
                  className={`w-full text-left py-1.5 px-2 text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'font-semibold text-primary bg-[#F4F3EF]'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  <span>{b}</span>
                  {isSelected && <Check className="w-3 h-3 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
