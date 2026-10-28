import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getCategoryBySlug, getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AffiliateNotice } from '@/components/common/AffiliateNotice';
import { SortDropdown } from '@/components/filter/SortDropdown';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    audience?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} | Curated Fashion Discoveries`,
    description: category.description,
    openGraph: {
      title: `${category.name} | LUMIÈRE Fashion`,
      description: category.description,
      images: [{ url: category.image, alt: category.name }],
    },
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
  };
}

export default async function CategoryDetailPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;

  const result = await getProducts({
    category: category.slug,
    audience: searchParams.audience,
    brand: searchParams.brand,
    minPrice,
    maxPrice,
    sort: searchParams.sort,
    limit: 24,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
      />

      {/* Hero Category Banner */}
      <div className="relative bg-[#141414] text-[#FAF9F6] border border-[#2A2A2A] overflow-hidden p-8 sm:p-12 lg:p-16">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono">
            Category Edit
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#A8A49A] leading-relaxed font-light">
            {category.description}
          </p>
          <p className="text-[11px] text-[#A8A49A] pt-2">
            Showing {result.products.length} garments • Verified retailer direct links
          </p>
        </div>

        {/* Decorative background image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden sm:block pointer-events-none">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="text-xs text-muted">
          Showing {result.products.length} of {result.total} items
        </span>
        <SortDropdown />
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={result.products}
        emptyMessage={`No products currently match your criteria in ${category.name}.`}
        resetHref={`/categories/${category.slug}`}
      />

      {/* Affiliate Notice */}
      <AffiliateNotice compact />
    </div>
  );
}
