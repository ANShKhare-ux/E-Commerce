import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-[#F4F3EF] border-b border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-subtle text-[11px] uppercase tracking-widest text-primary font-medium">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Contemporary Fashion Affiliate Edit • India</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-primary leading-[1.1] tracking-tight">
              Modern Silhouettes. <br />
              <span className="italic font-normal">Thoughtful Discovery.</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              We curate the finest clothing from verified retailers across India. Explore artisanal handlooms, Japanese selvedge denim, pure linens, and contemporary wardrobe staples with zero intermediary markups.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/collections/under-999"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-primary text-primary text-xs uppercase tracking-widest font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Under ₹999 Edits
              </Link>
            </div>

            {/* Micro-trust indicators */}
            <div className="pt-6 border-t border-border-subtle/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                Verified Retailer Links
              </span>
              <span>•</span>
              <span>Transparent Affiliate Attribution</span>
              <span>•</span>
              <span>Prices in INR (₹)</span>
            </div>
          </div>

          {/* Editorial Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] bg-surface shadow-elevated border border-border-subtle overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=85&auto=format"
                alt="Editorial contemporary fashion discovery showcasing natural linen and minimalist tailoring"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-surface/95 backdrop-blur-sm border border-border-subtle text-primary">
                <p className="text-[10px] uppercase tracking-widest text-muted">Featured Collection</p>
                <p className="font-serif text-sm font-medium">The Architectural Tailoring Edit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
