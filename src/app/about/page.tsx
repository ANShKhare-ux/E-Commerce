import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AffiliateNotice } from '@/components/common/AffiliateNotice';
import { ShieldCheck, Compass, Eye, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About LUMIÈRE — Fashion Discovery & Affiliate Philosophy',
  description:
    'Learn about LUMIÈRE, an independent fashion discovery platform curating clothing from authorized retailers across India.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Header */}
      <div className="border-b border-border pb-8 space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono">
          Our Purpose & Architecture
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary">
          About LUMIÈRE Atelier
        </h1>
        <p className="text-sm text-muted leading-relaxed font-light">
          An editorial discovery platform designed to simplify how conscious consumers in India find elevated clothing across multiple authorized retailers.
        </p>
      </div>

      {/* The Mission */}
      <section className="space-y-4 text-xs sm:text-sm text-muted leading-relaxed font-light">
        <h2 className="font-serif text-xl sm:text-2xl font-normal text-primary">
          The Purpose Behind The Curation
        </h2>
        <p>
          Online fashion in India is vast and fragmented. Shoppers frequently sift through thousands of poorly photographed, repetitive listings across major retailers to uncover well-constructed, beautifully tailored garments.
        </p>
        <p>
          LUMIÈRE was built to provide an editorial filter. We index, categorize, and present garments based on material honesty, timeless silhouettes, and genuine value—whether that is a 100% French linen shirt from Marks & Spencer, an authentic Okayama selvedge denim pair on AJIO, or an artisanal handwoven Chanderi saree on Nykaa Fashion.
        </p>
      </section>

      {/* Core Principles Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <div className="p-6 bg-surface border border-border-subtle space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#F4F3EF] flex items-center justify-center text-primary mb-3">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-normal text-primary">
            Curated Discovery
          </h3>
          <p className="text-xs text-muted leading-relaxed font-light">
            We focus on silhouette, drape, fabric composition, and enduring style rather than fleeting micro-trends.
          </p>
        </div>

        <div className="p-6 bg-surface border border-border-subtle space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#F4F3EF] flex items-center justify-center text-primary mb-3">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-normal text-primary">
            Total Transparency
          </h3>
          <p className="text-xs text-muted leading-relaxed font-light">
            We clearly identify the destination retailer for every item, verify prices in Indian Rupees (₹), and plainly disclose our affiliate relationships.
          </p>
        </div>

        <div className="p-6 bg-surface border border-border-subtle space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#F4F3EF] flex items-center justify-center text-primary mb-3">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-normal text-primary">
            Zero Markups
          </h3>
          <p className="text-xs text-muted leading-relaxed font-light">
            You pay the exact price determined by the retailer. Our affiliate commissions are paid by merchants, never through added costs to shoppers.
          </p>
        </div>

        <div className="p-6 bg-surface border border-border-subtle space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#F4F3EF] flex items-center justify-center text-primary mb-3">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-normal text-primary">
            Merchant Fulfillment
          </h3>
          <p className="text-xs text-muted leading-relaxed font-light">
            All inventory, shipping, delivery, customer support, and returns are handled directly by the verified retailer you purchase from.
          </p>
        </div>
      </section>

      {/* How The Affiliate Model Works */}
      <section className="p-6 bg-[#F4F3EF] border border-border-subtle space-y-3 text-xs text-muted leading-relaxed">
        <h3 className="font-serif text-base font-medium text-primary">
          Our Affiliate Business Model
        </h3>
        <p>
          LUMIÈRE operates strictly as an affiliate marketing publication. When you click &ldquo;Shop Now&rdquo; on any garment, you are redirected to the merchant&apos;s verified storefront via an attributed referral link. If you decide to make a purchase, the merchant may provide us a small referral commission.
        </p>
        <p>
          This revenue supports our server infrastructure, curation research, and software maintenance, allowing us to keep this discovery tool open, independent, and free from intrusive pop-up ads.
        </p>
        <Link
          href="/affiliate-disclosure"
          className="inline-block text-primary font-medium underline underline-offset-2 hover:text-black pt-1"
        >
          Read our comprehensive Affiliate Disclosure &rarr;
        </Link>
      </section>

      <AffiliateNotice />
    </div>
  );
}
