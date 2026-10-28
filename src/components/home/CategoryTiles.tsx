import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export function CategoryTiles() {
  // Separate audience entrypoints and silhouette categories
  const audienceCategories = CATEGORIES.filter(
    (c) => c.slug === 'mens-clothing' || c.slug === 'womens-clothing'
  );
  const silhouetteCategories = CATEGORIES.filter(
    (c) => c.slug !== 'mens-clothing' && c.slug !== 'womens-clothing'
  ).slice(0, 6);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* 1. Men's & Women's Fashion Entry Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-border pb-4 gap-2">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Curated Wardrobes
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-primary mt-1">
            Men’s &amp; Women’s Curations
          </h2>
        </div>
        <Link
          href="/categories"
          className="text-xs uppercase tracking-widest font-medium text-primary hover:text-black flex items-center gap-1 group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Dual Featured Gender Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audienceCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden bg-[#141414] border border-border-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-subtle"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">
                Wardrobe Edit
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide">
                {cat.name}
              </h3>
              <p className="text-xs text-white/80 font-light max-w-md hidden sm:block line-clamp-1">
                {cat.description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-white group-hover:text-[#D4AF37] transition-colors">
                <span>Explore Curations</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 2. Silhouette Grid */}
      <div className="pt-6">
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-4">
          Discover By Garment Silhouette
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {silhouetteCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[#F4F3EF] border border-border-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-serif text-sm font-normal tracking-wide">{cat.name}</p>
                <p className="text-[10px] text-white/80 uppercase tracking-widest mt-0.5 font-light">
                  Explore &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
