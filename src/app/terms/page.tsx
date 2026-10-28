import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'LUMIÈRE Terms and Conditions governing website use, affiliate merchant links, product accuracy, and liability.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

      <div className="border-b border-border pb-6 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono">
          Legal Agreement & Website Terms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed font-light">
          Effective Date: October 2026 • Governing Law: Jurisdiction of New Delhi, India
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-muted leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or browsing LUMIÈRE (the &ldquo;Website&rdquo;), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any provision, please discontinue using this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            2. Nature of Platform & Affiliate Discovery
          </h2>
          <p>
            LUMIÈRE is exclusively an editorial fashion discovery and affiliate marketing service. We curate garments and supply outbound links to third-party retailers (e.g. Myntra, Ajio, Tata CLiQ, Amazon).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We are <strong>not</strong> the seller, merchant, or manufacturer of any products featured.</li>
            <li>We do not take possession of goods or process commercial retail payments.</li>
            <li>A contract of sale is formed solely between you and the destination retailer upon checkout on their site.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            3. Product Information & Pricing Accuracy
          </h2>
          <p>
            While we diligently verify product details, descriptions, fabric compositions, and INR prices, retailer prices and inventory fluctuate rapidly. We cannot guarantee that an item remains in stock, available in your size, or at the exact displayed price when you visit the retailer. The price and terms on the retailer’s site at purchase time govern your transaction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            4. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable Indian law, LUMIÈRE and its operators disclaim all warranties and shall not be held liable for any direct, indirect, incidental, or consequential damages arising from:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Defective, delayed, or non-delivered merchandise ordered from third-party retailers.</li>
            <li>Inaccuracies in merchant descriptions, colors, or sizing guides.</li>
            <li>Disputes with external payment gateways or merchants.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            5. Intellectual Property
          </h2>
          <p>
            All original text, website design, curation layouts, and code on LUMIÈRE are the property of LUMIÈRE. Retailer brand names, logos, and product trademarks (such as Myntra, AJIO, Tata CLiQ, Reformation, Nudie Jeans) are the property of their respective trademark holders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            6. Contact Details & Placeholders
          </h2>
          <p>
            [Operating Entity Placeholder: <em>LUMIÈRE Fashion Atelier / Individual Operator</em>]<br />
            Registered Inquiries: <a href="mailto:concierge@lumierefashion.in" className="text-primary underline">concierge@lumierefashion.in</a><br />
            Address: [Commercial Operating Address Placeholder, New Delhi, India]
          </p>
        </section>
      </div>
    </div>
  );
}
