import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/lib/products';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fashion Categories & Silhouettes',
  description:
    'Explore clothing across 11 curated categories: Shirts, Dresses, Denim, Jackets, Ethnic Wear, Trousers, Hoodies, Footwear, and Accessories.',
};

export default async function CategoriesIndexPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Categories' }]} />

      <div className="border-b border-border pb-6">
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
          Wardrobe Taxonomy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary mt-1">
          Explore By Category
        </h1>
        <p className="text-xs text-muted max-w-xl mt-2 leading-relaxed">
          From crisp European linens and Okayama selvedge denim to handcrafted Chanderi silks, discover elevated fashion sorted by silhouette.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group bg-surface border border-border-subtle hover:border-border transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="relative aspect-[16/10] bg-[#F4F3EF] overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="p-5 flex flex-col flex-1 justify-between gap-3">
              <div>
                <h2 className="font-serif text-xl font-normal text-primary group-hover:text-black transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-primary font-medium uppercase tracking-wider">
                <span>View Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
