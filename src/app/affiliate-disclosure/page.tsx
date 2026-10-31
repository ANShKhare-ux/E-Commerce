import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { ExternalLink, ShieldCheck, Scale, CheckCircle2, AlertCircle, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate & Partner Store Disclosure | ASCI Transparency | LUMIÈRE India",
  description:
    "Official Affiliate Disclosure for LUMIÈRE luxury fashion in compliance with the Consumer Protection (E-Commerce) Rules 2020 and ASCI guidelines. Learn about our direct atelier inventory vs curated partner retail curations.",
  alternates: {
    canonical: "/affiliate-disclosure",
  },
};

const tableOfContents = [
  { id: "dual-business-model", label: "1. Dual Business Model Architecture" },
  { id: "asci-compliance", label: "2. ASCI & Consumer Protection Compliance" },
  { id: "commissions-pricing", label: "3. Commissions & Zero-Markup Pricing" },
  { id: "partner-merchants", label: "4. Authorized Partner Merchants" },
  { id: "external-fulfilment", label: "5. Fulfilment, Billing & Warranties" },
  { id: "cookie-tracking", label: "6. Affiliate Tracking & Cookies" },
  { id: "editorial-independence", label: "7. Editorial Independence & Integrity" },
];

export default function AffiliateDisclosurePage() {
  return (
    <LegalPageLayout
      title="Affiliate & Partner Store Disclosure"
      subtitle="Published in compliance with the Consumer Protection (E-Commerce) Rules, 2020 and ASCI Guidelines for Commercial Disclosures."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="compliance"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Total Commercial Transparency</p>
        <p>
          At LUMIÈRE, patron trust is our most valuable asset. We maintain strict separation between our physically
          manufactured and stocked atelier garments and the luxury fashion items curated by our editors from authorized
          third-party e-commerce platforms. This disclosure explains our dual business model and statutory compliance.
        </p>
      </div>

      {/* Section 1 */}
      <section id="dual-business-model" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#C59B48]" />
          <span>1. Dual Business Model Architecture</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          The LUMIÈRE storefront presents two distinctly defined product models:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C59B48] block">Inventory Category A</span>
            <h3 className="font-serif text-base font-bold text-noir-900">Direct Atelier Products</h3>
            <p className="text-noir-600 leading-relaxed">
              Designed, manufactured, stocked, and inventoried directly by LUMIÈRE at our Mumbai fulfillment center.
              For these items, LUMIÈRE handles end-to-end checkout, GST tax invoicing, Delhivery express shipping,
              and 7-day customer returns.
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-700 block">Inventory Category B</span>
            <h3 className="font-serif text-base font-bold text-noir-900">Affiliate Curated Products</h3>
            <p className="text-noir-600 leading-relaxed">
              Select designer fashion, haute horlogerie, and luxury accessories curated by our style editors from authorized
              third-party Indian luxury retailers. These items are prominently badged with a <strong>"Partner Store"</strong> tag
              and redirect you to the merchant’s website.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="asci-compliance" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#C59B48]" />
          <span>2. ASCI & Consumer Protection (E-Commerce) Rules, 2020 Compliance</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Pursuant to the <strong>Advertising Standards Council of India (ASCI) Guidelines for Influencer and Commercial Disclosures</strong>{" "}
          and Rule 5 of the <strong>Consumer Protection (E-Commerce) Rules, 2020</strong>:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>Every external affiliate link is visually marked with an outbound external link icon.</li>
          <li>We explicitly disclose our commercial relationships prior to redirecting patrons away from our platform.</li>
          <li>We never make deceptive or unsubstantiated claims regarding the inventory, price, or authenticity of third-party products.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section id="commissions-pricing" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>3. Commissions & Zero-Markup Pricing Guarantee</span>
        </h2>
        <div className="bg-[#f9f9fb] border border-[#eaeaec] p-4 space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">Zero Added Cost to Patrons:</p>
          <p className="text-noir-600">
            When you click on a curated affiliate product link on LUMIÈRE and finalize a purchase on the partner merchant’s
            website, LUMIÈRE may receive a modest referral commission from the merchant at zero additional cost to you.
          </p>
          <p className="text-noir-600">
            <strong>Price Integrity Guarantee:</strong> You will pay the exact same price (including any valid promotional discounts,
            bank offers, or seasonal sales) as any other customer shopping directly on the partner’s platform. We never mark up
            or artificially inflate prices for affiliate links.
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section id="partner-merchants" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-[#C59B48]" />
          <span>4. Authorized Indian Luxury Partner Merchants</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE only curates affiliate fashion from authorized, premium Indian luxury platforms that maintain verified
          merchant agreements and manufacturer guarantees:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li><strong>Tata CLiQ Luxury:</strong> Curated designer apparel, luxury watches, and leather goods.</li>
          <li><strong>Ajio Luxe:</strong> International designer runway collections and bridge luxury labels.</li>
          <li><strong>Myntra Luxe:</strong> Premium global designer labels and premium beauty formulations.</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section id="external-fulfilment" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C59B48]" />
          <span>5. Fulfilment, Billing & Warranty Separation</span>
        </h2>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm text-xs text-amber-900 space-y-2">
          <p className="font-semibold">Important Distinction for Affiliate Purchases:</p>
          <p>
            Because transactions for affiliate products take place entirely on the partner merchant's website:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The external merchant captures your payment credentials, issues the official GST tax invoice, and fulfills delivery through their chosen courier partners.</li>
            <li>Any order cancellation, return request, refund processing, or warranty claim for an affiliate item must be initiated directly with the partner merchant where the transaction was finalized.</li>
            <li>LUMIÈRE does not store your payment information, order history, or delivery tracking data for external partner purchases.</li>
          </ul>
        </div>
      </section>

      {/* Section 6 */}
      <section id="cookie-tracking" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C59B48]" />
          <span>6. Affiliate Tracking Cookies</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          When you click an outbound link to an affiliate partner, a secure tracking cookie is stored in your browser by
          the affiliate network or merchant. This cookie identifies LUMIÈRE as the referring source so that a commission
          can be attributed. These cookies typically expire within 24 to 30 days and collect no personally identifiable
          information. For additional details, please consult our <Link href="/cookie-policy" className="text-[#C59B48] font-semibold underline">Cookie Policy</Link>.
        </p>
      </section>

      {/* Section 7 */}
      <section id="editorial-independence" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>7. Editorial Independence & Curatorial Integrity</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Our editorial style team operates independently of commercial affiliate partnerships. We only feature third-party
          luxury designs that meet our uncompromising standards of fabric quality, cut, tailoring excellence, and aesthetic
          distinction. We decline affiliate relationships with merchants whose manufacturing ethics or customer service
          fail to meet LUMIÈRE standards.
        </p>
      </section>
    </LegalPageLayout>
  );
}
