import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  resetHref?: string;
}

export function ProductGrid({
  products,
  emptyMessage = 'No products match your selected criteria.',
  resetHref = '/shop',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-surface border border-dashed border-border flex flex-col items-center justify-center my-6">
        <PackageOpen className="w-12 h-12 text-muted/60 mb-3 stroke-[1.2]" />
        <h3 className="font-serif text-lg font-normal text-primary mb-1">
          No Garments Found
        </h3>
        <p className="text-xs text-muted max-w-sm mb-6 leading-relaxed">
          {emptyMessage} Try adjusting your price boundaries, removing active category filters, or exploring all clothing.
        </p>
        <Link
          href={resetHref}
          className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
        >
          Reset All Filters
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={idx < 4}
        />
      ))}
    </div>
  );
}
