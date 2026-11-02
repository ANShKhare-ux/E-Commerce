import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { ShieldCheck, Lock, Eye, Database, Globe, Bell, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | LUMIÈRE Legal & Data Protection",
  description:
    "Official Privacy Policy of LUMIÈRE governing data collection, usage, cookies, third-party disclosure, security controls, and user rights under GDPR, CCPA/CPRA, and the Digital Personal Data Protection Act, 2023.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const tableOfContents = [
    { id: "data-collection", label: "1. Data Collection" },
    { id: "usage", label: "2. Usage of Personal Data" },
    { id: "cookies-tracking", label: "3. Cookies & Tracking Technologies" },
    { id: "third-party-disclosure", label: "4. Third-Party Disclosure" },
    { id: "data-security", label: "5. Data Security & Retention" },
    { id: "user-rights", label: "6. User Rights (GDPR / CCPA / DPDP)" },
    { id: "contact-information", label: "7. Contact Information & Redressal" },
  ];

  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Comprehensive data governance and privacy commitments safeguarding our patrons across India and global luxury curations."
      effectiveDate="October 1, 2025"
      lastUpdated="November 2, 2026"
      category="legal"
      tableOfContents={tableOfContents}
    >
      <div className="space-y-8 text-xs text-noir-700 leading-relaxed">
        {/* Atelier Commitment Banner */}
        <div className="p-5 bg-white border-l-4 border-[#C59B48] border-y border-r border-[#eaeaec] rounded-sm text-noir-800 space-y-2">
          <div className="flex items-center gap-2 text-noir-900 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
            <span>LUMIÈRE Data Protection Pledge</span>
          </div>
          <p className="text-[11px] text-noir-600 leading-relaxed">
            At LUMIÈRE, we hold the privacy of our patrons to the same uncompromising standards of precision and integrity
            that define our atelier handlooms. We never sell, rent, or trade your personal data. This policy details how we
            collect, use, secure, and honor your fundamental data rights under the Digital Personal Data Protection Act, 2023
            (India), the General Data Protection Regulation (GDPR - Regulation (EU) 2016/679), and the California Consumer
            Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA).
          </p>
        </div>

        {/* Section 1: Data Collection */}
        <section id="data-collection" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#C59B48]" />
            <h2 className="font-serif text-base font-bold text-noir-900">
              1. Data Collection
            </h2>
          </div>
          <p>
            We collect personal information directly from you when you browse our collections, create an account, place an
            order, subscribe to the LUMIÈRE Gazette, or communicate with our Client Concierge. In accordance with data
            minimization principles, we collect only information necessary to deliver our luxury commerce services:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm space-y-1">
              <h4 className="font-semibold text-noir-900 text-xs">A. Patron Identity & Contact Information</h4>
              <p className="text-[11px] text-noir-600">
                Full legal name, email address, 10-digit Indian mobile telephone number, shipping street address, city, state,
                and 6-digit Indian Postal PIN code.
              </p>
            </div>
            <div className="p-3 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm space-y-1">
              <h4 className="font-semibold text-noir-900 text-xs">B. Transactional & Order Records</h4>
              <p className="text-[11px] text-noir-600">
                Authoritative order numbers, purchased garment SKUs, variant attributes (size, hue, weave), payment transaction
                identifiers, applied promotional vouchers, and GST tax invoice records.
              </p>
            </div>
            <div className="p-3 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm space-y-1">
              <h4 className="font-semibold text-noir-900 text-xs">C. Account & Wardrobe Preferences</h4>
              <p className="text-[11px] text-noir-600">
                Saved shipping destinations, curated wishlist selections, recently viewed couture pieces, and sizing
                preferences.
              </p>
            </div>
            <div className="p-3 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm space-y-1">
              <h4 className="font-semibold text-noir-900 text-xs">D. Technical & Session Telemetry</h4>
              <p className="text-[11px] text-noir-600">
                IP address, browser type, device operating system, referring URL, time-stamped server logs, and 15-minute checkout
                concurrency hold tokens.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Usage */}
        <section id="usage" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#C59B48]" />
            <h2 className="font-serif text-base font-bold text-noir-900">
              2. Usage of Personal Data
            </h2>
          </div>
          <p>
            We process your personal information strictly for legitimate commercial purposes and under recognized lawful
            bases, including contractual fulfillment, legal compliance, and explicit consent:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-noir-600">
            <li>
              <strong>Order Fulfillment & Line-Haul Delivery:</strong> Generating waybills, scheduling line-haul transit,
              dispatching delivery status SMS/email notices, and orchestrating 7-day doorstep return inspections.
            </li>
            <li>
              <strong>Statutory Accounting & Taxation:</strong> Generating GST-compliant tax invoices reflecting 12% textile
              tax allocations pursuant to the Central Goods and Services Tax Act, 2017.
            </li>
            <li>
              <strong>Authentication & Account Governance:</strong> Authenticating customer logins via Supabase SSR and
              Google OAuth, safeguarding your private account dashboard, and maintaining order histories.
            </li>
            <li>
              <strong>Fraud Mitigation & Concurrency Protection:</strong> Protecting the checkout reservation ledger against
              automated bot scraping and scalping of limited-edition artisanal drops.
            </li>
            <li>
              <strong>Editorial Communications (With Opt-In):</strong> Delivering private previews, festive lookbooks, and
              handloom stories via the LUMIÈRE Gazette. You may unsubscribe at any time.
            </li>
          </ul>
        </section>

        {/* Section 3: Cookies & Tracking */}
        <section id="cookies-tracking" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#C59B48]" />
            <h2 className="font-serif text-base font-bold text-noir-900">
              3. Cookies & Tracking Technologies
            </h2>
          </div>
          <p>
            Our web platform uses HTTP cookies, secure local storage, and session storage to provide a seamless atelier
            experience:
          </p>
          <div className="space-y-2.5">
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <span className="font-bold text-noir-900 block text-xs">Strictly Necessary Cookies</span>
              <p className="text-[11px] text-noir-600 mt-0.5">
                Essential for website operations. Includes authentication session tokens (`sb-*-auth-token`) set with `HttpOnly`,
                `SameSite=Lax`, and `Secure` attributes, and 15-minute checkout reservation hold identifiers.
              </p>
            </div>
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <span className="font-bold text-noir-900 block text-xs">Functional Storage</span>
              <p className="text-[11px] text-noir-600 mt-0.5">
                Browser `localStorage` is used to persist your shopping bag, saved wishlist items, and recently viewed pieces
                between visits without tracking you across third-party websites.
              </p>
            </div>
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <span className="font-bold text-noir-900 block text-xs">Session & Frequency Guards</span>
              <p className="text-[11px] text-noir-600 mt-0.5">
                `sessionStorage` preserves single-session states, such as ensuring our introductory entrance animation and
                welcome modal display strictly once on entry and never replay during internal navigation.
              </p>
            </div>
          </div>
          <p className="text-[11px] text-noir-500">
            For browser-specific cookie blocking and granular controls, inspect our dedicated{" "}
            <Link href="/cookie-policy" className="text-[#C59B48] underline">
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        {/* Section 4: Third-Party Disclosure */}
        <section id="third-party-disclosure" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C59B48]" />
            <h2 className="font-serif text-base font-bold text-noir-900">
              4. Third-Party Disclosure & Sub-Processors
            </h2>
          </div>
          <p className="font-semibold text-noir-900">
            LUMIÈRE does not sell, trade, or monetize personal information under any circumstance.
          </p>
          <p>
            We disclose necessary data strictly to vetted service partners under binding data processing agreements with
            explicit confidentiality and security covenants:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-noir-600">
            <li>
              <strong>Delhivery Express Logistics (India):</strong> We share the recipient name, shipping address, 6-digit PIN
              code, and telephone number solely to execute line-haul delivery and 7-day doorstep return collections.
            </li>
            <li>
              <strong>PhonePe Standard Checkout & NPCI UPI:</strong> We transmit merchant transaction identifiers and payable amounts
              in paise. <em>We never receive, process, or store credit card numbers, CVVs, or UPI MPINs on LUMIÈRE servers.</em>
            </li>
            <li>
              <strong>Resend Transactional Email Infrastructure:</strong> Order confirmations, shipment dispatch notifications,
              and password reset tokens are dispatched through secure email gateways.
            </li>
            <li>
              <strong>Affiliate Luxury Partners:</strong> For external curated drops (Tata CLiQ Luxury, Ajio Luxe, Myntra Luxe),
              clicking outbound links directs your browser directly to the merchant partner; LUMIÈRE does not share your account
              profile with affiliate merchants.
            </li>
          </ul>
        </section>

        {/* Section 5: Data Security & Retention */}
        <section id="data-security" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C59B48]" />
            <h2 className="font-serif text-base font-bold text-noir-900">
              5. Data Security & Retention Practices
            </h2>
          </div>
          <p>
            We employ enterprise-grade technical and managerial safeguards compliant with Rule 8 of the Information
            Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B48] mt-1.5 shrink-0" />
              <p>
                <strong>Encryption in Transit & At Rest:</strong> All web communication is encrypted using TLS 1.3 / 256-bit SSL.
                Database storage utilizes AES-256 encryption at rest.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B48] mt-1.5 shrink-0" />
              <p>
                <strong>PostgreSQL Row Level Security (RLS):</strong> Database-level access rules guarantee that customer order
                histories, profile records, and saved addresses can only be read by the authenticated account holder.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B48] mt-1.5 shrink-0" />
              <p>
                <strong>Role-Based Access Control (RBAC):</strong> Administrative mutations require verified SuperAdmin credentials
                with audit logging recorded on every state change.
              </p>
            </div>
          </div>
          <div className="pt-2">
            <h4 className="font-bold text-noir-900 text-xs mb-1">Data Retention Schedules:</h4>
            <p className="text-noir-600 text-[11px]">
              Tax and commercial records are retained for eight (8) statutory years in compliance with Section 128 of the
              Companies Act, 2013 and Section 36 of the CGST Act, 2017. Customer accounts remain active until deletion is
              requested. Accounts dormant for 36 consecutive months are automatically anonymized.
            </p>
          </div>
        </section>

        {/* Section 6: User Rights */}
        <section id="user-rights" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
            <h2 className="font-serif text-base font-bold text-noir-900">
              6. Your Statutory Rights (GDPR, CCPA/CPRA, and DPDP Act)
            </h2>
          </div>
          <p>
            Depending on your jurisdiction, you possess fundamental legal rights regarding your personal information:
          </p>

          {/* Sub-sections */}
          <div className="space-y-3 pt-1">
            <div className="p-3.5 bg-[#fafafa] border border-[#eaeaec] rounded-sm space-y-1.5">
              <h4 className="font-bold text-noir-900 text-xs uppercase tracking-wider">
                A. Indian Patrons (Digital Personal Data Protection Act, 2023)
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-noir-600">
                <li><strong>Right to Access:</strong> Request an itemized summary of personal data being processed.</li>
                <li><strong>Right to Correction & Updating:</strong> Rectify inaccurate or outdated records via your dashboard.</li>
                <li><strong>Right to Erasure:</strong> Request permanent deletion of data not subject to statutory tax retention.</li>
                <li><strong>Right to Nominate:</strong> Designate a representative to exercise rights in the event of incapacity.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-[#fafafa] border border-[#eaeaec] rounded-sm space-y-1.5">
              <h4 className="font-bold text-noir-900 text-xs uppercase tracking-wider">
                B. European Union & UK Residents (GDPR / UK GDPR)
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-noir-600">
                <li><strong>Right of Access & Portability (Art. 15 & 20):</strong> Obtain a machine-readable copy of your data.</li>
                <li><strong>Right to Rectification (Art. 16):</strong> Correct inaccurate personal data without undue delay.</li>
                <li><strong>Right to Erasure / &quot;Right to Be Forgotten&quot; (Art. 17):</strong> Have your personal data erased.</li>
                <li><strong>Right to Restriction & Objection (Art. 18 & 21):</strong> Object to processing based on legitimate interests.</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time with immediate effect.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-[#fafafa] border border-[#eaeaec] rounded-sm space-y-1.5">
              <h4 className="font-bold text-noir-900 text-xs uppercase tracking-wider">
                C. California Residents (CCPA / CPRA)
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-noir-600">
                <li><strong>Right to Know & Access:</strong> Learn categories and specific pieces of personal information collected.</li>
                <li><strong>Right to Delete:</strong> Request deletion of personal information collected from you.</li>
                <li><strong>Right to Correct:</strong> Direct us to correct inaccurate personal information.</li>
                <li><strong>Right to Opt-Out of Sale / Sharing:</strong> LUMIÈRE does not sell or share personal data for cross-context behavioral advertising.</li>
                <li><strong>Right to Non-Discrimination:</strong> We never discriminate against you for exercising your privacy rights.</li>
              </ul>
            </div>
          </div>
          <p className="text-[11px] text-noir-600">
            To exercise any of these rights, submit your request to our Data Protection Officer at{" "}
            <a href="mailto:privacy@lumiere.in" className="text-[#C59B48] font-semibold underline">
              privacy@lumiere.in
            </a>
            . We verify and respond to all authenticated requests within thirty (30) calendar days at zero cost.
          </p>
        </section>

        {/* Section 7: Contact Information */}
        <section id="contact-information" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C59B48]" />
            <h2 className="font-serif text-base font-bold text-noir-900">
              7. Contact Information & Grievance Redressal
            </h2>
          </div>
          <p>
            If you have questions, concerns, or formal grievances concerning this Privacy Policy or our data handling
            practices, contact our designated Grievance and Data Protection Officer:
          </p>
          <div className="p-4 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm space-y-1 text-xs text-noir-800">
            <p><strong>Entity:</strong> [LUMIÈRE Luxury Retail Private Limited]</p>
            <p><strong>Designated Grievance & Data Protection Officer:</strong> [Mr. Vikramaditya Sharma / Senior Legal Counsel]</p>
            <p><strong>Corporate Address:</strong> Royal Opera House District, Girgaon, Mumbai, Maharashtra 400004, India</p>
            <p><strong>Direct Privacy Email:</strong> <a href="mailto:privacy@lumiere.in" className="text-[#C59B48] underline">privacy@lumiere.in</a></p>
            <p><strong>Grievance Redressal:</strong> <a href="mailto:grievance@lumiere.in" className="text-[#C59B48] underline">grievance@lumiere.in</a></p>
            <p><strong>Concierge Telephone:</strong> +91 22 4900 8800 (Mon–Fri, 10:00 AM – 6:00 PM IST)</p>
            <p className="text-[11px] text-noir-500 pt-1">
              Statutory Resolution SLA: Acknowledgment within 48 hours; resolution within 30 days from formal receipt.
            </p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
