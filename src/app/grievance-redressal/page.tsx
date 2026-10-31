import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { UserCheck, ShieldCheck, Clock, Mail, Phone, MapPin, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Grievance Redressal Mechanism & Officer Appointment | LUMIÈRE India",
  description:
    "Official Grievance Redressal Mechanism for LUMIÈRE luxury fashion in compliance with the Consumer Protection (E-Commerce) Rules 2020 and DPDP Act 2023. View officer contact, 48-hour SLA, and escalation matrix.",
  alternates: {
    canonical: "/grievance-redressal",
  },
};

const tableOfContents = [
  { id: "statutory-framework", label: "1. Statutory Mandate & Purpose" },
  { id: "grievance-officer", label: "2. Designated Grievance Officer Details" },
  { id: "nodal-officer", label: "3. Nodal Officer for Law Enforcement" },
  { id: "resolution-slas", label: "4. Timelines: 48h Ack & 30-Day Resolution" },
  { id: "how-to-file", label: "5. How to Lodge a Grievance" },
  { id: "escalation-matrix", label: "6. Three-Tier Escalation Matrix" },
  { id: "national-consumer-helpline", label: "7. External Regulatory Escalations" },
  { id: "annual-reporting", label: "8. Transparency & Compliance Audits" },
];

export default function GrievanceRedressalPage() {
  return (
    <LegalPageLayout
      title="Grievance Redressal Policy"
      subtitle="Published in statutory compliance with Rule 5(9) of the Consumer Protection (E-Commerce) Rules, 2020 and the DPDP Act, 2023."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="compliance"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Consumer First Governance</p>
        <p>
          At LUMIÈRE, patron satisfaction is sacred. In accordance with the Consumer Protection (E-Commerce) Rules, 2020,
          the Information Technology Act, 2000 (and associated Intermediary Guidelines), and the Digital Personal Data
          Protection Act, 2023, we provide an independent, transparent, and time-bound grievance redressal mechanism.
        </p>
      </div>

      {/* Section 1 */}
      <section id="statutory-framework" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#C59B48]" />
          <span>1. Statutory Mandate & Scope</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          This mechanism governs all consumer disputes, product serviceability complaints, payment failure reconciliations,
          return disputes, and personal data privacy inquiries arising from transactions conducted on LUMIÈRE.
        </p>
      </section>

      {/* Section 2 */}
      <section id="grievance-officer" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#C59B48]" />
          <span>2. Designated Grievance Redressal Officer</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Pursuant to Rule 5(9) of the Consumer Protection (E-Commerce) Rules, 2020 and Section 8 of the DPDP Act 2023,
          the following senior executive is officially appointed as the Grievance Officer for LUMIÈRE:
        </p>
        <div className="bg-white border border-[#eaeaec] p-5 rounded-sm space-y-3 text-xs text-noir-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#f0f0f2] gap-2">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C59B48] block">Designated Officer</span>
              <h3 className="font-serif text-base font-bold text-noir-900">[Mr. Rajeshwar Sharma]</h3>
              <p className="text-noir-500">Head of Legal Compliance & Consumer Affairs</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold rounded-full self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Statutory Officer In-Charge
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C59B48] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-noir-900 mb-0.5">Physical Registered Office</strong>
                <p>[LUMIÈRE Luxury Retail Private Limited]</p>
                <p>Royal Opera House District, Girgaon,</p>
                <p>Mumbai, Maharashtra 400004, India</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#C59B48] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-noir-900 mb-0.5">Official Direct Grievance Email</strong>
                <p>
                  <a href="mailto:grievance@lumiere.in" className="text-[#C59B48] font-bold hover:underline">
                    grievance@lumiere.in
                  </a>
                </p>
                <p className="text-noir-500 text-[11px]">Direct priority inbox</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#C59B48] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-noir-900 mb-0.5">Telephone Helpline</strong>
                <p>+91 22 4900 8855</p>
                <p className="text-noir-500 text-[11px]">Mon–Fri: 10:00 AM – 6:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#C59B48] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-noir-900 mb-0.5">Corporate Identification (CIN)</strong>
                <p>[U18109MH2025PTC000000]</p>
                <p className="text-noir-500 text-[11px]">RoC Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="nodal-officer" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>3. Nodal Officer for Law Enforcement Coordination</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Pursuant to Rule 4 of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021,
          LUMIÈRE has designated a 24x7 Nodal Contact Person for coordination with Indian cyber-crime cells, intelligence wings,
          and judicial authorities:
        </p>
        <div className="bg-[#f9f9fb] border border-[#eaeaec] p-4 text-xs text-noir-700 space-y-1">
          <p><strong>Nodal Officer:</strong> [Director of Information Security & Legal Affairs]</p>
          <p><strong>Dedicated Law Enforcement Channel:</strong> <a href="mailto:nodal@lumiere.in" className="text-[#C59B48] underline font-semibold">nodal@lumiere.in</a></p>
          <p className="text-[11px] text-noir-500">Note: This address is strictly reserved for government law enforcement communication and judicial summons.</p>
        </div>
      </section>

      {/* Section 4 */}
      <section id="resolution-slas" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C59B48]" />
          <span>4. Statutory Resolution Timelines (48h / 30-Day SLAs)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 block">SLA Commitment 1</span>
            <h3 className="font-serif text-base font-bold text-noir-900">48-Hour Acknowledgment</h3>
            <p className="text-noir-600 leading-relaxed">
              Every formal complaint lodged with the Grievance Officer receives a distinct, trackable <strong>Ticket Reference Number</strong>{" "}
              via email within <strong>48 hours</strong> of receipt.
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 block">SLA Commitment 2</span>
            <h3 className="font-serif text-base font-bold text-noir-900">30-Day Resolution Mandate</h3>
            <p className="text-noir-600 leading-relaxed">
              All grievances are thoroughly investigated and conclusively redressed with a detailed written resolution
              within <strong>30 days</strong> from the date of receipt, as mandated by Rule 5(9).
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section id="how-to-file" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#C59B48]" />
          <span>5. How to Lodge a Grievance</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          To ensure prompt redressal, please structure your email to <a href="mailto:grievance@lumiere.in" className="text-[#C59B48] font-semibold underline">grievance@lumiere.in</a> with:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li><strong>Subject Line:</strong> Formal Grievance — [Order ID / Account Number] — [Short Issue Summary]</li>
          <li><strong>Full Name & Contact Details:</strong> Registered phone number and address.</li>
          <li><strong>Order Particulars:</strong> Order number, Delhivery AWB number, and date of purchase.</li>
          <li><strong>Detailed Description:</strong> Clear chronology of facts, including previous interactions with client concierge.</li>
          <li><strong>Supporting Evidence:</strong> Photographic evidence of garment condition, courier box packaging, or banking debited proof.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="escalation-matrix" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C59B48]" />
          <span>6. Three-Tier Escalation Matrix</span>
        </h2>
        <div className="space-y-3 text-xs">
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm">
            <strong className="text-noir-900 block font-serif">Tier 1: Client Concierge (Frontline)</strong>
            <p className="text-noir-600 mt-1">
              Contact our styling and fulfillment desk at <a href="mailto:concierge@lumiere.in" className="text-[#C59B48] underline">concierge@lumiere.in</a> or +91 22 4900 8800. Average resolution time: 4 to 24 hours.
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm">
            <strong className="text-noir-900 block font-serif">Tier 2: Grievance Redressal Officer (Legal Escalation)</strong>
            <p className="text-noir-600 mt-1">
              If Tier 1 resolution is unsatisfactory or delayed beyond 48 hours, escalate directly to <a href="mailto:grievance@lumiere.in" className="text-[#C59B48] underline">grievance@lumiere.in</a>. Ticket acknowledged within 48h.
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm">
            <strong className="text-noir-900 block font-serif">Tier 3: Executive Leadership Review</strong>
            <p className="text-noir-600 mt-1">
              Unresolved disputes undergo formal review by our Board of Directors and Principal Legal Counsel within 15 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7 */}
      <section id="national-consumer-helpline" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>7. External Regulatory & Consumer Forums</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          If you remain dissatisfied after exhausting our internal grievance redressal mechanism, you have the statutory
          right to lodge a complaint with government authorities:
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs text-noir-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-noir-900 block">National Consumer Helpline (NCH - Ministry of Consumer Affairs)</strong>
              <span>Toll-Free Helpline: <strong>1915</strong> or <strong>1800-11-4000</strong> • Web: <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#C59B48] underline">consumerhelpline.gov.in</a></span>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-[#f0f0f2]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-noir-900 block">Data Protection Board of India (DPBI)</strong>
              <span>For matters concerning digital privacy or personal data misuse under the DPDP Act, 2023.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 */}
      <section id="annual-reporting" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C59B48]" />
          <span>8. Transparency & Compliance Audits</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE maintains complete digital audit logs of all patron grievances, tickets, and resolution timelines.
          Our internal compliance board conducts bi-annual reviews to identify service bottlenecks, refine artisan quality
          standards, and ensure complete fidelity to Indian e-commerce consumer protection laws.
        </p>
      </section>
    </LegalPageLayout>
  );
}
