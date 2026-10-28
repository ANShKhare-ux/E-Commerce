import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCollections } from '@/lib/products';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Curated Fashion Collections',
  description:
    'Discover curated fashion collections: Trending Now, Under ₹999 Finds, Everyday Essentials, Premium Picks, and Seasonal Edits.',
};

export default async function CollectionsIndexPage() {
  const collections = await getAllCollections();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Collections' }]} />

      <div className="border-b border-border pb-6">
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          Themed Wardrobes
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary mt-1">
          Curated Edits & Collections
        </h1>
        <p className="text-xs text-muted max-w-xl mt-2 leading-relaxed">
          Thematic curations assembled for specific lifestyles, price brackets, and seasonal transitions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((coll) => (
          <Link
            key={coll.slug}
            href={`/collections/${coll.slug}`}
            className="group bg-surface border border-border-subtle hover:border-border transition-all flex flex-col justify-between overflow-hidden shadow-subtle"
          >
            <div className="relative aspect-[16/10] bg-[#F4F3EF] overflow-hidden">
              <Image
                src={coll.heroImage}
                alt={coll.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-3 left-3 bg-[#141414] text-[#FAF9F6] text-[10px] uppercase tracking-wider px-2 py-0.5">
                {coll.tag}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-accent font-mono">
                  {coll.subtitle}
                </span>
                <h2 className="font-serif text-xl font-normal text-primary group-hover:text-black transition-colors mt-0.5">
                  {coll.title}
                </h2>
                <p className="text-xs text-muted mt-2 leading-relaxed line-clamp-2">
                  {coll.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-primary font-medium uppercase tracking-wider">
                <span>Explore Edit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
