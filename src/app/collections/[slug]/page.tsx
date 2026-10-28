import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getCollectionBySlug, getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AffiliateNotice } from '@/components/common/AffiliateNotice';
import { SortDropdown } from '@/components/filter/SortDropdown';

interface CollectionPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
    audience?: string;
  };
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: `${collection.title} | ${collection.subtitle}`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} | LUMIÈRE Fashion`,
      description: collection.description,
      images: [{ url: collection.heroImage, alt: collection.title }],
    },
    alternates: {
      canonical: `/collections/${collection.slug}`,
    },
  };
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) {
    notFound();
  }

  const result = await getProducts({
    collection: collection.slug,
    audience: searchParams.audience,
    sort: searchParams.sort || (collection.slug === 'new-arrivals' ? 'newest' : undefined),
    limit: 24,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Collections', href: '/collections' },
          { label: collection.title },
        ]}
      />

      {/* Hero Collection Header */}
      <div className="relative bg-[#141414] text-[#FAF9F6] border border-[#2A2A2A] overflow-hidden p-8 sm:p-12 lg:p-16">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono">
            {collection.tag} • Curated Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light">
            {collection.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#A8A49A] leading-relaxed font-light">
            {collection.description}
          </p>
          <p className="text-[11px] text-[#A8A49A] pt-2">
            {result.products.length} garments indexed in this edit
          </p>
        </div>

        {/* Decorative backdrop */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden sm:block pointer-events-none">
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="text-xs text-muted">
          Showing {result.products.length} items
        </span>
        <SortDropdown />
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={result.products}
        emptyMessage={`No items found in the ${collection.title} collection matching your filters.`}
        resetHref={`/collections/${collection.slug}`}
      />

      {/* Affiliate Notice */}
      <AffiliateNotice compact />
    </div>
  );
}
