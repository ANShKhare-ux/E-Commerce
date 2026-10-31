import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { CreditCard, ShieldCheck, Lock, AlertTriangle, FileText, CheckCircle2, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Policy & Security | GST Compliant Checkout | LUMIÈRE India",
  description:
    "Official Payment Policy for LUMIÈRE luxury fashion. Discover our accepted payment modes (PhonePe, UPI, Cards, NetBanking, COD), RBI-mandated 2FA security, GST tax transparency, and failed transaction reversal protocols.",
  alternates: {
    canonical: "/payment-policy",
  },
};

const tableOfContents = [
  { id: "currency-pricing", label: "1. Currency & Server-Authoritative Pricing" },
  { id: "accepted-methods", label: "2. Accepted Payment Methods" },
  { id: "payment-security", label: "3. Encryption & RBI Compliance" },
  { id: "failed-transactions", label: "4. Failed Transactions & Auto-Reversals" },
  { id: "cod-guidelines", label: "5. Cash on Delivery (COD) Safeguards" },
  { id: "gst-invoicing", label: "6. Tax Invoices & GST Disclosures" },
  { id: "duplicate-charges", label: "7. Duplicate Charges & Inquiries" },
  { id: "fraud-monitoring", label: "8. Chargebacks & Anti-Fraud Monitoring" },
];

export default function PaymentPolicyPage() {
  return (
    <LegalPageLayout
      title="Payment Policy & Security"
      subtitle="Ensuring end-to-end transaction security, regulatory compliance, and total billing transparency."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="service"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Uncompromising Financial Security</p>
        <p>
          LUMIÈRE implements enterprise-grade, RBI-compliant payment processing in collaboration with leading authorized
          Indian payment aggregators (PhonePe, NPCI UPI, and PCI-DSS Level 1 certified gateways). We maintain an
          authoritative server-side pricing engine to ensure absolute integrity of every rupee charged.
        </p>
      </div>

      {/* Section 1 */}
      <section id="currency-pricing" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#C59B48]" />
          <span>1. Authoritative Currency & Transparent Tax Inclusions</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          All transactions on LUMIÈRE are invoiced and collected exclusively in <strong>Indian Rupees (INR ₹)</strong>.
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">Core Pricing Principles:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>
              <strong>Inclusive of GST:</strong> All displayed retail prices on product pages and catalog listings are
              100% inclusive of statutory <strong>Goods and Services Tax (GST)</strong>—calculated at 12% on apparel and textiles
              pursuant to Indian GST Council rate schedules.
            </li>
            <li>
              <strong>Authoritative Server Pricing:</strong> Unit prices, cart discounts, voucher deductions, and final
              payable amounts are strictly computed by our hardened server backend at checkout initiation. Client-side
              browser values are never accepted as financial authorization.
            </li>
            <li>
              <strong>Zero Hidden Surcharges:</strong> We never assess surprise convenience charges or platform access fees at checkout.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2 */}
      <section id="accepted-methods" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#C59B48]" />
          <span>2. Accepted Payment Instruments</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE provides seamless access to India’s most trusted digital payment rails:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2">
            <h3 className="font-serif text-sm font-bold text-noir-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Unified Payments Interface (UPI)</span>
            </h3>
            <p className="text-xs text-noir-600">
              Instant mobile payment via PhonePe, Google Pay (GPay), Paytm, BHIM, and any bank VPA handle. Direct app intent invocation on mobile devices.
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2">
            <h3 className="font-serif text-sm font-bold text-noir-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Credit & Debit Cards</span>
            </h3>
            <p className="text-xs text-noir-600">
              Visa, MasterCard, RuPay, and American Express issued by all major Indian commercial and private banks. Mandatory RBI 2FA OTP verification.
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2">
            <h3 className="font-serif text-sm font-bold text-noir-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Net Banking</span>
            </h3>
            <p className="text-xs text-noir-600">
              Direct account debit across 50+ Indian retail and commercial banks (HDFC, ICICI, SBI, Axis, Kotak Mahindra, and others).
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2">
            <h3 className="font-serif text-sm font-bold text-noir-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cash on Delivery (COD)</span>
            </h3>
            <p className="text-xs text-noir-600">
              Pay upon doorstep physical delivery across serviceable Delhivery PIN codes up to ₹15,000 per single consignment.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="payment-security" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#C59B48]" />
          <span>3. Encryption, Tokenization & RBI Compliance</span>
        </h2>
        <div className="bg-[#f9f9fb] border border-[#eaeaec] p-4 space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">Card Data Security Standards:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>
              <strong>Zero Card Data Storage:</strong> In strict compliance with Reserve Bank of India (RBI) card-on-file tokenization mandates, LUMIÈRE never stores or caches complete 16-digit card numbers, expiration dates, or CVV/CVC codes on its servers.
            </li>
            <li>
              <strong>PCI-DSS Certified Processing:</strong> All sensitive payment credentials are transmitted over encrypted TLS 1.3 channels directly to certified PCI-DSS Level 1 payment gateway infrastructure.
            </li>
            <li>
              <strong>Mandatory Two-Factor Authentication (2FA):</strong> All domestic card transactions are routed through 3D Secure 2.0 requiring an explicit OTP sent to your registered mobile device.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section id="failed-transactions" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#C59B48]" />
          <span>4. Failed Transactions & Automated Banking Auto-Reversals</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Occasionally, a transaction may fail due to bank server timeouts, network latency, or unexpected UPI session expirations. In such situations:
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">When your bank account is debited without an order confirmation:</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-noir-600">
            <li>
              <strong>Auto-Reconciliation:</strong> Our payment gateway engine reconciles banking transactions every 15 minutes. If no valid order session matches the captured charge, a reversal instruction is triggered immediately.
            </li>
            <li>
              <strong>NPCI & Banking Turnaround:</strong> Pursuant to RBI Harmonization of Turnaround Time (TAT) guidelines, funds deducted from your bank are reversed back to your source account within <strong>3 to 5 business days</strong>.
            </li>
            <li>
              <strong>Support Assistance:</strong> If your funds are not credited within 5 business days, please share your Bank Reference Number (UTR / RRN) with our concierge at <a href="mailto:concierge@lumiere.in" className="text-[#C59B48] font-semibold underline">concierge@lumiere.in</a> for priority escalation.
            </li>
          </ol>
        </div>
      </section>

      {/* Section 5 */}
      <section id="cod-guidelines" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>5. Cash on Delivery (COD) Safeguards & Limits</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          To maintain logistics integrity and prevent artificial inventory reservation lockups:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>
            <strong>Cart Threshold:</strong> COD is permissible on cart values up to ₹15,000. Orders exceeding this limit must be settled using digital payment instruments.
          </li>
          <li>
            <strong>Pre-Dispatch Verification:</strong> A verification link or automated telephonic confirmation is issued for all COD checkouts. Consignments are held until verified.
          </li>
          <li>
            <strong>Repeated Refusals:</strong> Accounts that record two (2) consecutive rejected COD deliveries will have COD privileges suspended and will be limited to prepaid digital payments.
          </li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="gst-invoicing" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#C59B48]" />
          <span>6. Tax Invoices & Statutory GST Disclosures</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          For every order fulfilled by LUMIÈRE, an official GST Tax Invoice compliant with Rule 46 of the Central Goods
          and Services Tax Rules, 2017 is generated and tucked securely inside the delivery parcel as well as emailed
          in PDF format.
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm text-xs text-noir-700 space-y-1.5">
          <p><strong>Corporate Entity:</strong> [LUMIÈRE Luxury Retail Private Limited]</p>
          <p><strong>Registered Hub:</strong> Royal Opera House District, Girgaon, Mumbai, Maharashtra 400004</p>
          <p><strong>Provisional GSTIN:</strong> 27AABCL9841K1Z3 (State Code: 27 - Maharashtra)</p>
          <p><strong>HSN Classification:</strong> Chapter 61 & 62 (Apparel, Knitted, Woven & Handloom Textiles)</p>
          <p className="text-[11px] text-noir-500 pt-1">
            * Note: If you require a B2B Tax Invoice with your business GSTIN for Input Tax Credit (ITC), please input your GSTIN in the billing notes during checkout.
          </p>
        </div>
      </section>

      {/* Section 7 */}
      <section id="duplicate-charges" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#C59B48]" />
          <span>7. Duplicate Deductions & Inquiries</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          If your account is billed more than once for a single order due to multiple checkout clicks or network latency,
          the duplicate capture is identified automatically by our payment reconciliation engine. The secondary charge will
          be reversed back to your originating account within 48 to 72 banking hours.
        </p>
      </section>

      {/* Section 8 */}
      <section id="fraud-monitoring" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>8. Chargebacks & Anti-Fraud Monitoring</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE actively monitors transactions for suspicious patterns, stolen card alerts, and artificial spoofing.
          If you believe an unauthorized charge was made on your card using LUMIÈRE, please inform both your issuing bank
          and our risk desk immediately at <a href="mailto:grievance@lumiere.in" className="text-[#C59B48] font-semibold underline">grievance@lumiere.in</a>.
          We cooperate fully with Indian law enforcement agencies and cyber-crime cells in investigating illicit card abuse.
        </p>
      </section>
    </LegalPageLayout>
  );
}
