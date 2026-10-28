import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AffiliateNotice } from '@/components/common/AffiliateNotice';
import { Search as SearchIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search Fashion Discoveries',
  description: 'Search clothing across linen shirts, selvedge denim, dresses, budget finds, and luxury outerwear.',
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  };
}

const POPULAR_SEARCHES = [
  'Linen Shirt',
  'Selvedge Denim',
  'Silk Dress',
  'Under ₹999',
  'Khadi Kurta',
  'Wool Jacket',
  'Leather Loafers',
  'Heavyweight T-Shirt',
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q ? searchParams.q.trim() : '';

  const result = await getProducts({
    search: query,
    sort: searchParams.sort,
    limit: 30,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Search' }]} />

      {/* Search Header Form */}
      <div className="border-b border-border pb-8 space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
            Direct Inventory Query
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary mt-1">
            {query ? (
              <>
                Search Results for <span className="italic font-normal">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              'Search The Catalog'
            )}
          </h1>
          {query && (
            <p className="text-xs text-muted mt-1">
              Found {result.products.length} matching clothing recommendations
            </p>
          )}
        </div>

        {/* Search Bar Input */}
        <form method="GET" action="/search" className="max-w-2xl relative">
          <label htmlFor="search-input" className="sr-only">
            Search Clothing
          </label>
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            id="search-input"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search by garment name, brand (e.g. Reformation, Fabindia), material, or style..."
            className="w-full pl-11 pr-28 py-3 bg-surface border border-border text-sm text-primary placeholder:text-muted/60 focus:outline-none focus:border-primary rounded-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
          >
            Search
          </button>
        </form>

        {/* Popular Search Suggestions */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-muted pt-1">
          <span className="text-[11px] uppercase tracking-wider font-medium text-primary">
            Popular:
          </span>
          {POPULAR_SEARCHES.map((item) => (
            <Link
              key={item}
              href={`/search?q=${encodeURIComponent(item)}`}
              className="px-2.5 py-1 bg-[#F4F3EF] border border-border-subtle hover:border-primary text-primary transition-colors text-[11px]"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {query ? (
        <ProductGrid
          products={result.products}
          emptyMessage={`No clothing matched "${query}".`}
          resetHref="/shop"
        />
      ) : (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          <p className="text-xs text-muted leading-relaxed">
            Enter a search term above to explore curated products by style, silhouette, brand, or fabric composition.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
          >
            Browse All Clothing
          </Link>
        </div>
      )}

      {/* Affiliate Notice */}
      <AffiliateNotice compact />
    </div>
  );
}
