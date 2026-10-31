import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy | LUMIÈRE Legal",
  description:
    "Official Privacy Policy of LUMIÈRE formulated in compliance with the Digital Personal Data Protection Act, 2023 and Information Technology Act, 2000.",
  alternates: {
    canonical: "https://lumiere.in/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const tableOfContents = [
    { id: "statutory-basis", label: "1. Data Fiduciary & Statutory Basis" },
    { id: "data-collected", label: "2. Personal Data We Collect" },
    { id: "payment-security", label: "3. Payment Gateway & Card Security" },
    { id: "purpose-processing", label: "4. Purposes of Data Processing" },
    { id: "third-parties", label: "5. Third-Party Processors (Delhivery, PhonePe)" },
    { id: "cookies", label: "6. Cookies & Storage Technologies" },
    { id: "retention", label: "7. Data Retention & GST Compliance" },
    { id: "data-principal-rights", label: "8. Your Rights Under DPDP Act 2023" },
    { id: "security-measures", label: "9. Technical & Operational Safeguards" },
    { id: "grievance-officer", label: "10. Grievance Redressal Officer" },
  ];

  return (
    <LegalPageLayout
      title="Privacy & Data Protection Policy"
      subtitle="Safeguarding patron personal data in strict adherence with Indian data governance laws."
      effectiveDate="October 1, 2025"
      lastUpdated="October 31, 2026"
      category="legal"
      tableOfContents={tableOfContents}
    >
      <div className="space-y-8 text-xs text-noir-700 leading-relaxed">
        {/* Statutory Compliance Notice */}
        <div className="p-4 bg-white border-l-4 border-[#C59B48] border-y border-r border-[#eaeaec] rounded-sm text-noir-800">
          <p className="font-semibold text-noir-900">Digital Personal Data Protection Act, 2023 Notice</p>
          <p className="mt-1 text-[11px] text-noir-600">
            This Privacy Policy is drafted in accordance with the provisions of the Digital Personal Data Protection Act, 2023 (DPDP Act),
            the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and
            Sensitive Personal Data or Information) Rules, 2011. It outlines our responsibilities as a Data Fiduciary and your rights
            as a Data Principal.
          </p>
        </div>

        {/* Section 1 */}
        <section id="statutory-basis" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            1. Data Fiduciary Identity & Scope
          </h2>
          <p>
            The Data Fiduciary responsible for the collection, processing, and protection of your personal data on this platform
            is <strong>[LUMIÈRE Luxury Retail Private Limited]</strong>, having its central fulfillment and styling hub at:
          </p>
          <div className="p-3 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm text-[11px] text-noir-800">
            <p><strong>[LUMIÈRE Luxury Retail Private Limited]</strong></p>
            <p>Royal Opera House District, Girgaon, Mumbai, Maharashtra 400004, India</p>
            <p>CIN: [U18109MH2025PTC000000] • GSTIN: 27AABCL9841K1Z3</p>
            <p>Data Protection Officer: <a href="mailto:privacy@lumiere.in" className="text-[#C59B48] underline">privacy@lumiere.in</a></p>
          </div>
          <p>
            This policy applies to all personal data collected through <strong>lumiere.in</strong>, our mobile web interface,
            and direct communications with our Client Concierge team.
          </p>
        </section>

        {/* Section 2 */}
        <section id="data-collected" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            2. Categories of Personal Data We Collect
          </h2>
          <p>
            We adhere to the principle of data minimization, collecting only personal data that is strictly necessary to deliver
            our luxury atelier apparel, process payments, and fulfill courier deliveries:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-noir-600">
            <li>
              <strong>Patron Identity Data:</strong> Full legal name, title, and date of birth (where provided voluntarily for patron birthday benefits).
            </li>
            <li>
              <strong>Contact & Logistics Data:</strong> Delivery street address, landmark, apartment/suite number, 6-digit Indian PIN code,
              city, state, primary mobile telephone number, and email address.
            </li>
            <li>
              <strong>Order & Commercial Data:</strong> Order identification numbers, SKU records, size, color, transaction amounts,
              invoice data, GST breakdown, voucher redemption history, and delivery status logs.
            </li>
            <li>
              <strong>Technical & Session Data:</strong> IP address, device operating system, browser type, referring URL, session identifiers,
              and interaction telemetry used to preserve your shopping bag and recently viewed preferences.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section id="payment-security" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            3. Payment Gateway Credentials & Card Security
          </h2>
          <p className="font-semibold text-noir-900">
            LUMIÈRE never captures, stores, or handles sensitive payment credentials on our internal servers.
          </p>
          <p>
            All electronic payment transactions—including credit cards, debit cards, netbanking, and UPI transfers—are processed
            through RBI-authorized, PCI-DSS Level 1 compliant payment gateways (PhonePe Standard Checkout and Google Pay / NPCI UPI).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>We do not store your 16-digit card number, CVV/CVC, expiration dates, or bank account login passwords.</li>
            <li>We do not have access to your personal UPI MPIN.</li>
            <li>For Cash on Delivery (COD) refunds, beneficiary bank account details or UPI VPA IDs submitted by customers are used exclusively for one-time NEFT/IMPS/UPI disbursement and encrypted at rest.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="purpose-processing" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            4. Purposes of Data Processing & Legal Grounds
          </h2>
          <p>
            Under Section 4 and Section 7 of the Digital Personal Data Protection Act, 2023, we process personal data under the lawful grounds
            of specific consent and legitimate uses:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <h4 className="font-bold text-noir-900 text-xs mb-1">Order Fulfillment & Delivery</h4>
              <p className="text-[11px] text-noir-600">
                Generating Delhivery logistics waybills, scheduling line-haul transit, dispatching delivery OTPs, and conducting 7-day doorstep return pickups.
              </p>
            </div>
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <h4 className="font-bold text-noir-900 text-xs mb-1">Statutory Tax & Invoicing</h4>
              <p className="text-[11px] text-noir-600">
                Issuing compliant tax invoices reflecting 12% GST allocations in compliance with the Central Goods and Services Tax Act, 2017.
              </p>
            </div>
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <h4 className="font-bold text-noir-900 text-xs mb-1">Client Concierge Support</h4>
              <p className="text-[11px] text-noir-600">
                Addressing styling inquiries, size customization requests, return quality inspection assessments, and parcel tracking escalations.
              </p>
            </div>
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <h4 className="font-bold text-noir-900 text-xs mb-1">Fraud Prevention & Security</h4>
              <p className="text-[11px] text-noir-600">
                Safeguarding atomic checkout inventory reservation holds against automated bots and authenticating COD orders via SMS OTP.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="third-parties" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            5. Third-Party Service Providers & Sub-processors
          </h2>
          <p>
            We do not sell, rent, or trade your personal information to third-party data brokers or marketing agencies.
            We share necessary personal data strictly with authorized technical sub-processors under binding confidentiality contracts:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-noir-600">
            <li>
              <strong>Delhivery Express Logistics:</strong> Name, recipient shipping address, Indian PIN code, and contact number shared
              solely to execute doorstep order delivery and return reverse pickups across India.
            </li>
            <li>
              <strong>PhonePe & NPCI UPI Infrastructure:</strong> Transaction reference IDs, net order value, and customer identifier shared
              to authenticate payment settlements and process return refunds.
            </li>
            <li>
              <strong>Transactional Communication Infrastructure:</strong> Secure transactional outbox services for dispatching order confirmations,
              AWB tracking links, and reset password links.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="cookies" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            6. Cookies, Local Storage & Session State
          </h2>
          <p>
            Our web application utilizes HTTP cookies, browser local storage, and session storage to deliver responsive e-commerce features:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li><strong>Strictly Necessary Storage:</strong> Managing your authenticated session, 15-minute reservation hold ledger, and cart contents.</li>
            <li><strong>Functional Preferences:</strong> Retaining saved wishlist items and currency presentation.</li>
            <li><strong>Welcome & Announcement State:</strong> Ensuring promotional modal notifications are displayed only on initial entry and suppressed during internal navigation.</li>
          </ul>
          <p>
            For granular explanations and browser opt-out controls, please inspect our dedicated <Link href="/cookie-policy" className="text-[#C59B48] underline">Cookie Policy</Link>.
          </p>
        </section>

        {/* Section 7 */}
        <section id="retention" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            7. Data Retention & Statutory Accounting Obligations
          </h2>
          <p>
            We retain personal data only for as long as necessary to fulfill the purposes for which it was gathered:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li><strong>Commercial & Invoice Records:</strong> Retained for a mandatory period of eight (8) statutory years in compliance with Section 128 of the Companies Act, 2013 and Section 36 of the Central Goods and Services Tax Act, 2017.</li>
            <li><strong>Active Customer Profiles:</strong> Maintained for the duration of your registered account. Profiles inactive for more than thirty-six (36) consecutive months are subject to automated data anonymization.</li>
            <li><strong>Customer Concierge Logs:</strong> Support correspondence and email inquiries are retained for two (2) years to maintain service quality and verify return inspection histories.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section id="data-principal-rights" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            8. Your Statutory Rights Under the DPDP Act, 2023
          </h2>
          <p>
            As a Data Principal under Indian law, you are entitled to exercise the following statutory rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-noir-600">
            <li><strong>Right to Access:</strong> The right to request an itemized summary of personal data being processed by LUMIÈRE, including identities of data processors with whom your data has been shared.</li>
            <li><strong>Right to Correction & Updating:</strong> The right to update inaccurate, outdated, or incomplete personal data via your authenticated patron dashboard at <Link href="/account" className="text-[#C59B48] underline">/account</Link>.</li>
            <li><strong>Right to Erasure:</strong> The right to request the deletion of your personal data, subject to statutory retention obligations under Indian taxation and corporate laws.</li>
            <li><strong>Right of Grievance Redressal:</strong> The right to readily available grievance redressal through our designated Grievance Officer.</li>
            <li><strong>Right to Nominate:</strong> The right to nominate an authorized individual who, in the event of death or incapacity, shall exercise your data rights.</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section id="security-measures" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            9. Technical Safeguards & Data Security Practices
          </h2>
          <p>
            In compliance with Rule 8 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal
            Data or Information) Rules, 2011, LUMIÈRE implements comprehensive physical, electronic, and managerial controls:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>End-to-end transport layer security (TLS 1.3 / 256-bit SSL encryption) across all web traffic.</li>
            <li>Database row-level security (RLS) isolating customer profile records, saved addresses, and order histories.</li>
            <li>Strict administrative role-based access control (RBAC) enforced via multi-factor authentication.</li>
            <li>Regular automated vulnerability assessments and code reviews.</li>
          </ul>
        </section>

        {/* Section 10 */}
        <section id="grievance-officer" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            10. Designated Grievance Officer Contact Information
          </h2>
          <p>
            In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023,
            the name and contact details of our appointed Grievance Officer are published below:
          </p>
          <div className="p-4 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm space-y-1 text-xs text-noir-800">
            <p><strong>Designated Grievance Redressal Officer:</strong> [Mr. Vikramaditya Sharma / Senior Legal Counsel]</p>
            <p><strong>Entity:</strong> [LUMIÈRE Luxury Retail Private Limited]</p>
            <p><strong>Address:</strong> Royal Opera House District, Girgaon, Mumbai, Maharashtra 400004, India</p>
            <p><strong>Direct Email:</strong> <a href="mailto:grievance@lumiere.in" className="text-[#C59B48] underline">grievance@lumiere.in</a></p>
            <p><strong>Telephone:</strong> +91 22 4900 8800 (Mon–Fri, 10:00 AM – 6:00 PM IST)</p>
            <p className="text-[11px] text-noir-500 pt-1">
              Statutory SLA: Acknowledgment within forty-eight (48) hours; resolution within thirty (30) days from formal receipt.
            </p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
