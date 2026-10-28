import React from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/filter/FilterSidebar';
import { FilterDrawer } from '@/components/filter/FilterDrawer';
import { SortDropdown } from '@/components/filter/SortDropdown';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AffiliateNotice } from '@/components/common/AffiliateNotice';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Clothing & Fashion Curations',
  description:
    'Browse our comprehensive catalog of shirts, dresses, denim, jackets, and accessories from leading Indian fashion retailers.',
};

interface ShopPageProps {
  searchParams: {
    category?: string;
    audience?: string;
    brand?: string;
    merchant?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
    collection?: string;
    search?: string;
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;

  const result = await getProducts({
    category: searchParams.category,
    audience: searchParams.audience,
    brand: searchParams.brand,
    merchant: searchParams.merchant,
    minPrice,
    maxPrice,
    sort: searchParams.sort,
    collection: searchParams.collection,
    search: searchParams.search,
    page,
    limit: 12,
  });

  const { products, total, totalPages, currentPage, categories, brands } = result;

  const buildPageUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    if (searchParams.category) params.set('category', searchParams.category);
    if (searchParams.audience) params.set('audience', searchParams.audience);
    if (searchParams.brand) params.set('brand', searchParams.brand);
    if (searchParams.merchant) params.set('merchant', searchParams.merchant);
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
    if (searchParams.sort) params.set('sort', searchParams.sort);
    if (searchParams.collection) params.set('collection', searchParams.collection);
    if (searchParams.search) params.set('search', searchParams.search);
    params.set('page', String(targetPage));
    return `/shop?${params.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Shop Catalog' }]} />

      {/* Header and Title */}
      <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
            Curated Clothing Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary mt-1">
            All Fashion Discoveries
          </h1>
          <p className="text-xs text-muted mt-1">
            Showing {products.length} of {total} verified products
          </p>
        </div>

        {/* Mobile Filter Toggle & Sort Selector */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <FilterDrawer
            categories={categories}
            brands={brands}
            totalResults={total}
          />
          <SortDropdown />
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-2">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 bg-surface p-6 border border-border-subtle shadow-subtle">
            <FilterSidebar categories={categories} brands={brands} />
          </div>
        </aside>

        {/* Product Grid & Pagination */}
        <div className="lg:col-span-3 space-y-8">
          <ProductGrid products={products} resetHref="/shop" />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-8 border-t border-border flex items-center justify-between text-xs">
              <Link
                href={buildPageUrl(currentPage - 1)}
                className={`flex items-center gap-1 px-4 py-2 border border-border text-primary hover:border-primary transition-colors ${
                  currentPage <= 1 ? 'pointer-events-none opacity-40' : ''
                }`}
                aria-disabled={currentPage <= 1}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Link>

              <span className="text-muted">
                Page <span className="font-semibold text-primary">{currentPage}</span> of{' '}
                <span className="font-semibold text-primary">{totalPages}</span>
              </span>

              <Link
                href={buildPageUrl(currentPage + 1)}
                className={`flex items-center gap-1 px-4 py-2 border border-border text-primary hover:border-primary transition-colors ${
                  currentPage >= totalPages ? 'pointer-events-none opacity-40' : ''
                }`}
                aria-disabled={currentPage >= totalPages}
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Affiliate Disclosure Notice */}
          <AffiliateNotice compact />
        </div>
      </div>
    </div>
  );
}
