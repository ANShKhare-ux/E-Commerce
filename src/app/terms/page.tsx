import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions of Service | LUMIÈRE Legal",
  description:
    "Comprehensive terms of service governing purchases, accounts, intellectual property, and transactions on the LUMIÈRE e-commerce platform in India.",
  alternates: {
    canonical: "https://lumiere.in/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const tableOfContents = [
    { id: "overview", label: "1. Overview & Agreement" },
    { id: "eligibility", label: "2. Eligibility to Contract" },
    { id: "account", label: "3. Account Security & Responsibilities" },
    { id: "business-model", label: "4. Dual Business Model & Affiliate Curations" },
    { id: "products-craft", label: "5. Textile Craftsmanship & Sizing Disclaimers" },
    { id: "pricing-gst", label: "6. Authoritative Pricing & 12% GST" },
    { id: "orders-reservation", label: "7. Order Acceptance & 15-Min Reservation Hold" },
    { id: "cancellations-returns", label: "8. Cancellations & Returns Reference" },
    { id: "shipping-risk", label: "9. Shipping, Title & Courier Dispatch" },
    { id: "intellectual-property", label: "10. Intellectual Property Rights" },
    { id: "limitation-liability", label: "11. Limitation of Liability & Warranties" },
    { id: "disputes-jurisdiction", label: "12. Governing Law, Arbitration & Jurisdiction" },
    { id: "amendments", label: "13. Policy Amendments & Contact" },
  ];

  return (
    <LegalPageLayout
      title="Terms & Conditions of Service"
      subtitle="Governing the purchase of luxury apparel, artisanal textiles, and use of the LUMIÈRE platform."
      effectiveDate="October 1, 2025"
      lastUpdated="October 31, 2026"
      category="legal"
      tableOfContents={tableOfContents}
    >
      <div className="space-y-8 text-xs text-noir-700 leading-relaxed">
        {/* Notice Card */}
        <div className="p-4 bg-white border-l-4 border-[#C59B48] border-y border-r border-[#eaeaec] rounded-sm text-noir-800">
          <p className="font-semibold text-noir-900">Important Statutory Notice</p>
          <p className="mt-1 text-[11px] text-noir-600">
            This electronic document is published in accordance with the provisions of Rule 3(1) of the Information
            Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Consumer
            Protection (E-Commerce) Rules, 2020. These terms govern the relationship between you (“Customer”, “Patron”, or “User”)
            and LUMIÈRE (operating under <strong>[LUMIÈRE Luxury Retail Private Limited]</strong>, CIN: <strong>[U18109MH2025PTC000000]</strong>).
          </p>
        </div>

        {/* Section 1 */}
        <section id="overview" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            1. Overview & Acceptance of Terms
          </h2>
          <p>
            Welcome to LUMIÈRE. By visiting our website (<strong>lumiere.in</strong>), creating a patron account,
            browsing our collections, or placing an order, you confirm that you have read, understood, and agree to be bound
            by these Terms and Conditions (“Terms”), together with our Privacy Policy, Return & Refund Policy, and Shipping Policy.
          </p>
          <p>
            If you do not agree to all provisions contained within these Terms, you must discontinue your use of the website
            and refrain from placing orders through our services.
          </p>
        </section>

        {/* Section 2 */}
        <section id="eligibility" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            2. Eligibility to Contract
          </h2>
          <p>
            In accordance with the Indian Contract Act, 1872, only individuals who are competent to enter into legally
            binding agreements may utilize our ordering facilities. You affirm that you are at least 18 years of age or,
            if you are under 18 years of age, that you are accessing the website under the direct supervision and consent of a parent
            or legal guardian who agrees to be bound by these Terms.
          </p>
          <p>
            LUMIÈRE reserves the right to terminate your account or refuse service if it is discovered that you are under 18
            years of age and transacting without requisite legal guardianship.
          </p>
        </section>

        {/* Section 3 */}
        <section id="account" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            3. Account Security & Customer Responsibilities
          </h2>
          <p>
            When registering an account with LUMIÈRE, you agree to provide true, accurate, current, and complete contact details,
            including your legal name, delivery address with valid 6-digit Indian PIN code, mobile telephone number, and email address.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>You are solely responsible for maintaining the confidentiality of your account credentials and password.</li>
            <li>You agree to accept responsibility for all activities that occur under your account or authenticated session.</li>
            <li>You agree to immediately notify LUMIÈRE Concierge (<a href="mailto:concierge@lumiere.in" className="text-[#C59B48] underline">concierge@lumiere.in</a>) of any unauthorized use or security breach.</li>
            <li>LUMIÈRE shall not be liable for any loss or damage arising from your failure to protect your login credentials.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="business-model" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            4. Dual Business Model & Third-Party Affiliate Curations
          </h2>
          <p>
            LUMIÈRE operates a dual-model digital commerce architecture to bring together proprietary craftsmanship and global luxury discovery:
          </p>
          <div className="space-y-3 pt-1">
            <div className="p-3.5 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm">
              <h4 className="font-bold text-noir-900 text-xs mb-1">A. LUMIÈRE Direct Atelier Inventory</h4>
              <p className="text-[11px] text-noir-600">
                Garments and luxury items physically designed, manufactured, stocked in our Mumbai central fulfillment facility,
                and dispatched directly via Delhivery Express Logistics. For these orders, LUMIÈRE is the primary contracting merchant,
                responsible for payment collection, invoice generation, warranty, and return handling.
              </p>
            </div>
            <div className="p-3.5 bg-[#f5f5f6] border border-[#eaeaec] rounded-sm">
              <h4 className="font-bold text-noir-900 text-xs mb-1">B. Curated Affiliate Discoveries</h4>
              <p className="text-[11px] text-noir-600">
                Products curated by our styling editors from authorized partner luxury platforms (including Tata CLiQ Luxury,
                Ajio Luxe, and Myntra Luxe). These items are clearly designated with a “Partner Store” badge. Clicking on these items
                securely redirects you to the third-party merchant&apos;s verified store where your transaction occurs. LUMIÈRE does not
                collect payments, hold inventory, or process returns for external affiliate transactions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="products-craft" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            5. Textile Craftsmanship, Sizing & Fashion Product Disclaimers
          </h2>
          <p>
            LUMIÈRE specializes in authentic Indian handloom textiles (including Chanderi silks, Banarasi brocades, and Kadhwa zari weaves)
            as well as heavyweight 450 GSM French Terry streetwear. By purchasing handloom apparel, you acknowledge:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>
              <strong>Artisanal Weave Characteristics:</strong> Minor variations in yarn slubs, weaving tension, motifs, and dye penetration
              are hallmarks of genuine hand-spun craftsmanship and do not constitute manufacturing defects.
            </li>
            <li>
              <strong>Color Fidelity on Digital Displays:</strong> While our photography studio uses calibrated strobe lighting to ensure
              color precision, actual garment colors may exhibit slight visual variance across different smartphone screens, monitor color profiles,
              and ambient room lighting.
            </li>
            <li>
              <strong>Size & Measurement Tolerances:</strong> Hand-tailored garments are subject to an industry-standard manufacturing
              tolerance of ±0.5 to 1 inch. Customers are advised to consult our comprehensive <Link href="/size-guide" className="text-[#C59B48] underline">Size & Fit Guide</Link> before order placement.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="pricing-gst" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            6. Authoritative Pricing, Taxes & 12% GST
          </h2>
          <p>
            All prices displayed on LUMIÈRE are quoted in Indian National Rupees (₹) and are inclusive of Goods and Services Tax (GST)
            at the authoritative statutory rate of 12% on apparel and garments.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li><strong>Server-Authoritative Pricing:</strong> All final unit prices, promotional coupon discounts, and order totals are calculated exclusively on our secure server runtime. Client-side price tampering or script manipulation is blocked and void.</li>
            <li><strong>Typographical or Listing Errors:</strong> In the rare event a product is listed at an incorrect price due to technical error, LUMIÈRE reserves the right to cancel the order prior to dispatch and refund 100% of the transaction amount.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="orders-reservation" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            7. Order Acceptance & 15-Minute Concurrency Reservation Hold
          </h2>
          <p>
            Your order constitutes an offer to purchase. Order confirmation emails acknowledge receipt of your order; contract formation
            occurs when your order is quality-inspected, packed, and assigned an official Delhivery AWB tracking waybill.
          </p>
          <div className="p-3 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm text-[11px] text-noir-700">
            <strong>15-Minute Concurrency Hold Protocol:</strong> To eliminate overselling during high-demand collection drops,
            items added to active checkout sessions are temporarily locked in our atomic 3-pool reservation ledger for exactly
            fifteen (15) minutes. If checkout payment is not authorized within this window, reserved inventory is automatically restored
            to the live catalog.
          </div>
        </section>

        {/* Section 8 */}
        <section id="cancellations-returns" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            8. Cancellations & Returns Reference
          </h2>
          <p>
            Orders may be cancelled within twelve (12) hours of placement or prior to courier waybill generation.
            We offer a comprehensive 7-calendar-day return window from the verified delivery timestamp on eligible apparel,
            subject to mandatory two-stage warehouse inspection. For comprehensive guidelines, conditions, and non-returnable categories,
            please review our dedicated <Link href="/returns-policy" className="text-[#C59B48] underline">Return & Refund Policy</Link> and <Link href="/cancellation-policy" className="text-[#C59B48] underline">Cancellation Policy</Link>.
          </p>
        </section>

        {/* Section 9 */}
        <section id="shipping-risk" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            9. Shipping, Risk of Loss & Courier Dispatch
          </h2>
          <p>
            All deliveries are handled exclusively through Delhivery Express Logistics covering over 19,000 Indian PIN codes.
            Complimentary shipping is provided for orders valued at ₹2,999 and above. Orders under ₹2,999 incur a flat courier fee of ₹150.
            Title and risk of loss pass to the customer upon verified delivery confirmation by the courier associate at the destination address.
            Full logistics timelines are detailed in our <Link href="/shipping-policy" className="text-[#C59B48] underline">Shipping & Delivery Policy</Link>.
          </p>
        </section>

        {/* Section 10 */}
        <section id="intellectual-property" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            10. Intellectual Property Rights
          </h2>
          <p>
            All content published on this platform—including but not limited to the LUMIÈRE trademark, the Sovereign L Monogram,
            custom Didone typography, editorial lookbooks, product photography, video assets, source code, UI designs, and database
            compilations—is the exclusive intellectual property of LUMIÈRE Fashions India Pvt. Ltd. and protected under the Indian
            Copyright Act, 1957, and Trade Marks Act, 1999.
          </p>
          <p>
            Reproduction, scraping, hotlinking, copying, or commercial exploitation without prior written consent from LUMIÈRE is strictly prohibited.
          </p>
        </section>

        {/* Section 11 */}
        <section id="limitation-liability" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            11. Limitation of Liability & Warranties
          </h2>
          <p>
            To the maximum extent permitted by applicable Indian law, LUMIÈRE disclaims all implied warranties of merchantability
            or fitness for a particular purpose, save for warranties explicitly guaranteed under the Consumer Protection Act, 2019.
            In no event shall LUMIÈRE&apos;s aggregate financial liability exceed the total transactional amount paid by the customer
            for the specific product giving rise to the claim.
          </p>
        </section>

        {/* Section 12 */}
        <section id="disputes-jurisdiction" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            12. Governing Law, Arbitration & Jurisdiction
          </h2>
          <p>
            These Terms and any non-contractual obligations arising out of or in connection with them shall be governed by and construed
            in accordance with the laws of the Republic of India.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li><strong>Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to these Terms shall be referred to and finally resolved by arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Mumbai, Maharashtra.</li>
            <li><strong>Exclusive Jurisdiction:</strong> Subject to arbitration, the competent courts at Mumbai, Maharashtra, India, shall have exclusive territorial jurisdiction.</li>
          </ul>
        </section>

        {/* Section 13 */}
        <section id="amendments" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            13. Policy Amendments & Contact
          </h2>
          <p>
            LUMIÈRE reserves the right to amend, update, or revise these Terms at any time to reflect legislative enactments,
            logistics enhancements, or business changes. Updated terms become effective upon publication on this page with an updated
            “Effective Date”. Continued use of the website following amendments constitutes acceptance of revised terms.
          </p>
          <div className="pt-2 text-xs text-noir-600">
            <p><strong>Corporate Contact:</strong> [LUMIÈRE Luxury Retail Private Limited]</p>
            <p>Royal Opera House District, Girgaon, Mumbai, Maharashtra 400004, India</p>
            <p>Email: <a href="mailto:concierge@lumiere.in" className="text-[#C59B48] underline">concierge@lumiere.in</a> | Phone: +91 22 4900 8800</p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
