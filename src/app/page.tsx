import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, DollarSign, Crown, Sun, Clock } from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { BrandsBar } from '@/components/home/BrandsBar';
import { EditorialJournal } from '@/components/home/EditorialJournal';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AffiliateNotice } from '@/components/common/AffiliateNotice';
import {
  getTrendingProducts,
  getBudgetProducts,
  getPremiumProducts,
  getSeasonalProducts,
  getRecentProducts,
} from '@/lib/products';

export default async function HomePage() {
  const [trending, budget, premium, seasonal, recent] = await Promise.all([
    getTrendingProducts(4),
    getBudgetProducts(4),
    getPremiumProducts(4),
    getSeasonalProducts(4),
    getRecentProducts(4),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Main Editorial Hero & Primary CTA */}
      <HeroSection />

      {/* 2. Visual Category Discovery (Men's, Women's, and Silhouettes) */}
      <CategoryTiles />

      {/* 3. Trending Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 border-b border-border pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-accent" />
              Most Sought After
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-primary mt-1">
              Trending Silhouettes
            </h2>
          </div>
          <Link
            href="/collections/trending-now"
            className="text-xs uppercase tracking-widest font-medium text-primary hover:text-black flex items-center gap-1 group"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={trending} />
      </section>

      {/* 4. Seasonal Fashion Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 border-b border-border pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-accent" />
              Seasonal Palette &amp; Fabrics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-primary mt-1">
              In-Season Contemporary Style
            </h2>
          </div>
          <Link
            href="/collections/seasonal-style"
            className="text-xs uppercase tracking-widest font-medium text-primary hover:text-black flex items-center gap-1 group"
          >
            <span>View Seasonal Edit</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={seasonal} />
      </section>

      {/* 5. Verified Merchant Partners */}
      <BrandsBar />

      {/* 6. Budget-Friendly Fashion (Under ₹999) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 border-b border-border pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-accent" />
              Smart Spending
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-primary mt-1">
              Under ₹999 Essentials
            </h2>
          </div>
          <Link
            href="/collections/under-999"
            className="text-xs uppercase tracking-widest font-medium text-primary hover:text-black flex items-center gap-1 group"
          >
            <span>View Under ₹999 Edits</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={budget} />
      </section>

      {/* 7. Curated Collections Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141414] text-[#FAF9F6] p-8 sm:p-12 lg:p-16 border border-[#2A2A2A] relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono">
              Curated Style Edit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light leading-tight">
              The Everyday Foundation Wardrobe
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A49A] leading-relaxed font-light">
              Invest in pieces that transcend trends. From pure heavyweight cotton t-shirts to relaxed wool chore jackets, discover timeless essentials designed for longevity.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/collections/everyday-essentials"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF9F6] text-[#141414] text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
              >
                <span>Shop Everyday Essentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/shop?sort=newest"
                className="inline-flex items-center px-6 py-3 border border-[#444444] text-white text-xs uppercase tracking-widest font-medium hover:border-white transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Recently Added Products (New Arrivals) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 border-b border-border pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              Recently Curated
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-primary mt-1">
              New Arrivals Just Indexed
            </h2>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="text-xs uppercase tracking-widest font-medium text-primary hover:text-black flex items-center gap-1 group"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={recent} />
      </section>

      {/* 9. Premium & Designer Picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 border-b border-border pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-accent" />
              Investment Pieces
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-primary mt-1">
              Luxury &amp; Designer Picks
            </h2>
          </div>
          <Link
            href="/collections/premium-picks"
            className="text-xs uppercase tracking-widest font-medium text-primary hover:text-black flex items-center gap-1 group"
          >
            <span>View All Luxury</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={premium} />
      </section>

      {/* 10. Editorial Inspiration & Style Journal */}
      <EditorialJournal />

      {/* 11. Interactive Newsletter Subscription Section */}
      <NewsletterSection />

      {/* 12. Affiliate Transparency Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateNotice />
      </div>
    </div>
  );
}
