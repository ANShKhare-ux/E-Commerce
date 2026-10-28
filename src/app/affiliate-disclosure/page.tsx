import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ShieldCheck, ExternalLink, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Marketing Disclosure',
  description:
    'Full transparency regarding our affiliate partnerships, commercial relationships, pricing guarantees, and advertising disclosures.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Affiliate Disclosure' }]} />

      <div className="border-b border-border pb-6 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          Transparency & Advertising Standards
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary">
          Affiliate Relationship Disclosure
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed font-light">
          Last updated: October 2026 • Compliant with FTC Guidelines and ASCI (Advertising Standards Council of India) Guidelines.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-muted leading-relaxed font-light">
        {/* Core Statement */}
        <section className="p-6 bg-[#F4F3EF] border-l-2 border-primary space-y-3">
          <h2 className="font-serif text-lg font-medium text-primary">
            Summary of Commercial Relationships
          </h2>
          <p>
            LUMIÈRE (accessible at lumierefashion.in) is an independent contemporary fashion curation website that participates in affiliate marketing programs.
            This means that some links on this website are &ldquo;affiliate links.&rdquo; If you click on an affiliate link and subsequently make a purchase on the destination merchant&apos;s website, we may receive a referral commission from the retailer at <strong>zero additional cost to you</strong>.
          </p>
        </section>

        {/* What We Do and Do Not Do */}
        <section className="space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary">
            What We Do and Do Not Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-surface border border-border-subtle space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-primary flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Our Role: Curation & Discovery
              </span>
              <ul className="space-y-1.5 text-xs text-muted list-disc list-inside">
                <li>We research and categorize high-quality clothing across India.</li>
                <li>We verify product specifications, fabrics, and INR pricing.</li>
                <li>We direct shoppers safely to authorized retailer storefronts.</li>
                <li>We maintain an independent editorial perspective on design and drape.</li>
              </ul>
            </div>

            <div className="p-5 bg-surface border border-border-subtle space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-primary flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Retailer Responsibility
              </span>
              <ul className="space-y-1.5 text-xs text-muted list-disc list-inside">
                <li>We do <strong>not</strong> stock, hold, or ship physical inventory.</li>
                <li>We do <strong>not</strong> collect or process customer payment details.</li>
                <li>Order confirmation, shipping, tracking, and delivery are fulfilled by the merchant.</li>
                <li>Returns, cancellations, and warranties are governed strictly by the merchant&apos;s policies.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Participating Retailers */}
        <section className="space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary">
            Participating Merchants & Affiliate Networks
          </h2>
          <p>
            We curate clothing from authorized third-party fashion retailers including but not limited to:
          </p>
          <ul className="space-y-2 pl-4 list-disc">
            <li>
              <strong>Myntra</strong> (Myntra Designs Private Limited) via approved affiliate partner networks.
            </li>
            <li>
              <strong>AJIO / AJIO Luxe</strong> (Reliance Retail Limited) via authorized affiliate channels.
            </li>
            <li>
              <strong>Tata CLiQ & Tata CLiQ Luxury</strong> (Tata UniStore Limited) partner integrations.
            </li>
            <li>
              <strong>Amazon India</strong> (Amazon Seller Services Private Limited) via the Amazon Associates Programme. As an Amazon Associate, we earn from qualifying purchases.
            </li>
            <li>
              <strong>Nykaa Fashion</strong> (FSN E-Commerce Ventures Limited) affiliate program.
            </li>
            <li>
              <strong>Marks & Spencer Reliance India</strong> affiliate network.
            </li>
          </ul>
        </section>

        {/* Pricing & Stock Guarantee */}
        <section className="space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary">
            Pricing, Stock & Availability Notice
          </h2>
          <p>
            Prices and stock availability displayed on LUMIÈRE are accurate at the time of catalog indexing and verification.
            However, external merchants may adjust prices, launch limited-time promotional sales, or run out of specific sizes without prior notification.
          </p>
          <p>
            The price and inventory level displayed on the merchant’s official checkout page at the exact moment of purchase represents the final, governing transaction term. We encourage shoppers to verify garment details and sizing charts on the retailer&apos;s site prior to checkout.
          </p>
        </section>

        {/* Questions */}
        <section className="pt-4 border-t border-border">
          <h2 className="font-serif text-base font-normal text-primary mb-2">
            Questions Regarding Our Commercial Disclosures
          </h2>
          <p>
            If you have questions or require further information regarding our affiliate partnerships, please visit our{' '}
            <Link href="/contact" className="text-primary underline font-medium hover:text-black">
              Concierge Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
