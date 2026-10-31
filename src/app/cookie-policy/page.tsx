import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { Cookie, ShieldCheck, Database, Eye, Settings, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy & Tracking Technologies | LUMIÈRE India",
  description:
    "Official Cookie Policy for LUMIÈRE luxury fashion. Discover how we utilize essential cookies, local storage, 15-minute checkout reservation hold tokens, and privacy controls under DPDP Act 2023.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

const tableOfContents = [
  { id: "what-are-cookies", label: "1. What Are Cookies & Storage Tokens" },
  { id: "cookie-categories", label: "2. Categories of Cookies We Use" },
  { id: "cart-reservation-tokens", label: "3. 15-Minute Reservation Cookies" },
  { id: "third-party-tracking", label: "4. Third-Party Analytics & Pixels" },
  { id: "dpdp-compliance", label: "5. DPDP Act 2023 & Consent Principles" },
  { id: "cookie-management", label: "6. Managing Browser Cookies" },
  { id: "policy-updates", label: "7. Policy Updates & Inquiries" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy & Tracking Technologies"
      subtitle="Transparent disclosure regarding cookies, local browser storage, and session tokens utilized across the LUMIÈRE platform."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="legal"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Our Privacy-First Commitment</p>
        <p>
          At LUMIÈRE, we respect your digital discretion. We do not sell your browsing habits or deploy invasive
          third-party trackers. Our use of cookies is strictly focused on delivering a flawless shopping experience,
          securing your patron sessions, and managing real-time inventory holds.
        </p>
      </div>

      {/* Section 1 */}
      <section id="what-are-cookies" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Cookie className="w-4 h-4 text-[#C59B48]" />
          <span>1. What Are Cookies & Web Storage Tokens?</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Cookies are small text files placed on your computer, smartphone, or tablet when you navigate our digital atelier.
          Alongside traditional HTTP cookies, our platform employs modern web storage technologies such as{" "}
          <strong>HTML5 LocalStorage</strong> and <strong>SessionStorage</strong>. These tokens enable our system to remember
          your shopping bag, authenticate your login session, and deliver an uninterrupted luxury experience.
        </p>
      </section>

      {/* Section 2 */}
      <section id="cookie-categories" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Database className="w-4 h-4 text-[#C59B48]" />
          <span>2. Categories of Cookies We Use</span>
        </h2>
        <div className="space-y-4">
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <strong className="text-noir-900 font-serif text-sm">A. Strictly Necessary & Security Cookies</strong>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Always Active
              </span>
            </div>
            <p className="text-noir-600">
              Essential for the core functionality and security of the website. They enable secure HTTPS communication,
              CSRF protection, patron authentication, and session identity. Without these cookies, services like login,
              bag retention, and checkout cannot function.
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <strong className="text-noir-900 font-serif text-sm">B. Functional & Preference Tokens</strong>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                User Experience
              </span>
            </div>
            <p className="text-noir-600">
              Remember choices you make—such as your saved wishlist, PIN code delivery preference, and previously viewed
              garment silhouettes—to offer a curated, personalized atelier visit.
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <strong className="text-noir-900 font-serif text-sm">C. Performance & Analytics Cookies</strong>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Aggregated & Anonymous
              </span>
            </div>
            <p className="text-noir-600">
              Collect aggregated, de-identified telemetry regarding page response times, navigation flows, and rendering
              bottlenecks. This data helps our engineering team optimize platform speed and visual fluidity.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="cart-reservation-tokens" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C59B48]" />
          <span>3. 15-Minute Inventory Hold & Session Storage</span>
        </h2>
        <div className="bg-[#f9f9fb] border border-[#eaeaec] p-4 space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">Technical Details of Our Reservation Engine:</p>
          <p className="text-noir-600">
            Because our atelier crafts limited-run handloom garments and high-density streetwear drops, each item has a
            finite physical inventory. When you add a garment to your shopping bag or initiate checkout:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-noir-600">
            <li>
              A temporary cryptographic session key (<code>lumiere_reservation_hold</code>) is stored in your browser session.
            </li>
            <li>
              This token synchronizes with our Mumbai warehouse database to maintain an atomic <strong>15-minute lock</strong> on your selected size and colorway.
            </li>
            <li>
              If you finalize checkout, the token converts into a permanent order ID. If the 15-minute window expires without checkout completion, the token is automatically invalidated, and the physical item is released back into the catalog.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section id="third-party-tracking" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#C59B48]" />
          <span>4. Third-Party Analytics & Marketing Pixels</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          We work with select, vetted third-party service providers who may set cookies on our behalf:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>
            <strong>Payment Aggregators (PhonePe / Card Gateways):</strong> Deploy fraud prevention and session cookies during the secure checkout redirect to authenticate transactions and prevent carding fraud.
          </li>
          <li>
            <strong>Delivery Partner (Delhivery):</strong> Generates temporary tracking cookies when you query postal code serviceability or track live parcel status.
          </li>
          <li>
            <strong>Affiliate Partner Merchants:</strong> When you navigate to curated partner products (Tata CLiQ Luxury, Ajio Luxe, Myntra Luxe), the target platform places its own tracking cookie to attribute referrals according to industry standards.
          </li>
        </ul>
      </section>

      {/* Section 5 */}
      <section id="dpdp-compliance" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>5. Digital Personal Data Protection Act (DPDP Act), 2023 Compliance</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          In alignment with the Digital Personal Data Protection Act, 2023 of India:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>We only collect telemetry and cookie data for legitimate and specified retail purposes.</li>
          <li>We do not engage in behavioral tracking or profiling of minors under 18 years of age.</li>
          <li>You retain the fundamental right to withdraw consent and request erasure of associated personal identifiers by contacting our Grievance Officer.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="cookie-management" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#C59B48]" />
          <span>6. Managing & Disabling Cookies in Your Browser</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Most web browsers allow you to control cookies through their settings preferences. You may configure your
          browser to block cookies, alert you before receiving a cookie, or purge existing cookies.
        </p>
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-sm text-xs text-amber-900">
          <p className="font-semibold mb-0.5">Note on Disabling Essential Cookies:</p>
          <p>
            Please note that disabling strictly necessary cookies will prevent our shopping bag, 15-minute reservation timer,
            and patron authentication from functioning properly.
          </p>
        </div>
      </section>

      {/* Section 7 */}
      <section id="policy-updates" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C59B48]" />
          <span>7. Policy Revisions & Inquiries</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE reserves the right to periodically update this Cookie Policy to reflect technical enhancements or
          statutory adjustments under Indian law. For any inquiries regarding our tracking practices, please email{" "}
          <a href="mailto:privacy@lumiere.in" className="text-[#C59B48] font-semibold underline">privacy@lumiere.in</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
