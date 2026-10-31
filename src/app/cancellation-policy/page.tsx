import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { XCircle, Clock, RotateCcw, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Cancellation Policy | LUMIÈRE India",
  description:
    "Official Order Cancellation Policy for LUMIÈRE luxury fashion. Learn about our self-service cancellation window, dispatch cutoff rules, atomic stock restoration, and refund turnaround timelines.",
  alternates: {
    canonical: "/cancellation-policy",
  },
};

const tableOfContents = [
  { id: "cancellation-window", label: "1. Self-Service Cancellation Window" },
  { id: "in-transit-policy", label: "2. Cancellations After Dispatch" },
  { id: "atomic-reversion", label: "3. Atomic Stock Pool Restoration" },
  { id: "refund-timelines", label: "4. Cancellation Refund Processing" },
  { id: "merchant-cancellations", label: "5. Merchant Initiated Cancellations" },
  { id: "bespoke-tailoring", label: "6. Bespoke & Tailored Item Exceptions" },
  { id: "promotions-vouchers", label: "7. Coupon & Voucher Revalidation" },
  { id: "affiliate-orders", label: "8. Affiliate Order Cancellations" },
];

export default function CancellationPolicyPage() {
  return (
    <LegalPageLayout
      title="Order Cancellation Policy"
      subtitle="Clear and fair parameters for modifying or cancelling orders placed on the LUMIÈRE atelier storefront."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="service"
      tableOfContents={tableOfContents}
    >
      {/* Policy Summary Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Effortless Patron Flexibility</p>
        <p>
          At LUMIÈRE, we believe luxury commerce should be transparent and stress-free. You may cancel any direct
          atelier purchase at zero penalty prior to courier dispatch through your Patron Account dashboard or by
          notifying our Mumbai concierge team.
        </p>
      </div>

      {/* Section 1 */}
      <section id="cancellation-window" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C59B48]" />
          <span>1. Self-Service Cancellation Window</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Patrons may cancel an order directly from their account dashboard as long as the status is marked as{" "}
          <strong>"Order Placed"</strong>, <strong>"Payment Confirmed"</strong>, or <strong>"Processing in Atelier"</strong>.
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">How to cancel your order:</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-noir-600">
            <li>
              Log into your LUMIÈRE account and navigate to{" "}
              <Link href="/account" className="text-[#C59B48] font-semibold underline hover:text-noir-900">
                Patron Dashboard &rarr; Orders
              </Link>.
            </li>
            <li>Select the order you wish to cancel and click the <strong>"Cancel Order"</strong> button.</li>
            <li>
              Select a cancellation reason (e.g., incorrect size selected, change of mind, alternate payment preference).
            </li>
            <li>
              Confirm cancellation. A formal cancellation invoice and refund reference number will be sent immediately via email and SMS.
            </li>
          </ol>
        </div>
      </section>

      {/* Section 2 */}
      <section id="in-transit-policy" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-[#C59B48]" />
          <span>2. Cancellations After Dispatch & In-Transit Consignments</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Once an order has been quality-checked, sealed, and assigned a live Delhivery Air Waybill (AWB) with status{" "}
          <strong>"Shipped"</strong> or <strong>"Out for Delivery"</strong>, automated cancellation from the website is
          locked. At this juncture, the parcel is physically in the custody of Delhivery Express logistics.
        </p>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm text-xs text-amber-900 space-y-2">
          <p className="font-semibold">Options if your order has already shipped:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Refuse Delivery at Doorstep:</strong> When the Delhivery courier executive arrives, simply decline receipt stating order cancellation. The parcel will be returned safely to our Mumbai hub as RTO.
            </li>
            <li>
              <strong>Accept and Utilize 7-Day Returns:</strong> Alternatively, accept the parcel, inspect the craftsmanship, and if desired, initiate a hassle-free reverse pickup within 7 days via our{" "}
              <Link href="/returns-policy" className="underline font-bold">
                Returns & Exchange Policy
              </Link>.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3 */}
      <section id="atomic-reversion" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#C59B48]" />
          <span>3. Atomic Stock Pool Restoration</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Because LUMIÈRE operates on limited-edition drops and handloom single-SKU inventory with a 3-pool stock model
          (<em>Physical, Reserved, Available</em>), cancellation immediately triggers an atomic transaction in our database:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>The reserved SKU allocation is immediately released back to the general public catalog.</li>
          <li>Our inventory ledger records an immutable cancellation audit log with timestamp and customer ID.</li>
          <li>Other patrons waitlisted for that size or silhouette are immediately notified of renewed availability.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="refund-timelines" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#C59B48]" />
          <span>4. Cancellation Refund Processing & Timelines</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          All refunds for successfully cancelled orders are processed automatically to the original payment instrument
          without deduction of any cancellation fees or convenience charges:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#eaeaec] bg-white">
            <thead className="bg-[#f9f9fb] border-b border-[#eaeaec] text-noir-900 font-semibold">
              <tr>
                <th className="p-3">Payment Method Used</th>
                <th className="p-3">Refund Channel</th>
                <th className="p-3">Estimated Banking Turnaround</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaeaec] text-noir-700">
              <tr>
                <td className="p-3 font-medium text-noir-900">UPI (PhonePe, GPay, Paytm)</td>
                <td className="p-3">Direct VPA reversal via NPCI</td>
                <td className="p-3 font-semibold text-emerald-700">Instant to 24 Hours</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Credit / Debit Cards (Visa, RuPay, Mastercard)</td>
                <td className="p-3">Original card issuer / acquiring bank</td>
                <td className="p-3">3 to 5 Business Days</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Net Banking</td>
                <td className="p-3">Source bank account via IMPS/NEFT</td>
                <td className="p-3">2 to 4 Business Days</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Cash on Delivery (COD)</td>
                <td className="p-3">N/A (No payment was collected)</td>
                <td className="p-3 text-noir-500">Immediate order voidance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5 */}
      <section id="merchant-cancellations" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>5. Merchant-Initiated Cancellations</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          In exceptional circumstances, LUMIÈRE reserves the statutory right under the Consumer Protection (E-Commerce) Rules,
          2020 to cancel an order prior to dispatch. Such instances include:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>
            <strong>Quality Inspection Failure:</strong> If a handloom weave, zari motif, or artisanal fabric fails our
            strict pre-dispatch white-glove inspection and an authentic replacement cannot be sourced within 48 hours.
          </li>
          <li>
            <strong>Unforeseen Inventory Discrepancy:</strong> Physical stock damage at our Mumbai hub resulting in SKU unavailability.
          </li>
          <li>
            <strong>Fraud / Payment Gateway Risk Flag:</strong> High-risk transactions identified by our automated payment gateway security protocols or unauthorized card usage indicators.
          </li>
          <li>
            <strong>Non-Serviceable Logistics Pincode:</strong> Remote locations temporarily unreachable by Delhivery due to civic unrest, natural disaster, or regional regulatory suspensions.
          </li>
        </ul>
        <p className="text-xs text-noir-700 leading-relaxed font-semibold">
          In all merchant cancellation scenarios, a full 100% refund is initiated immediately, accompanied by a personal
          explanation and apology from our client concierge.
        </p>
      </section>

      {/* Section 6 */}
      <section id="bespoke-tailoring" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C59B48]" />
          <span>6. Bespoke, Altered & Made-to-Order Exceptions</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Orders involving custom pattern grading, monogramming, bespoke sleeve adjustments, or customized blouse
          stitching can only be cancelled within <strong>6 hours</strong> of order placement. Once our master tailors in
          Mumbai have commenced fabric cutting or embroidery, cancellations and refunds are not permissible under Section 19
          of the Consumer Protection Act, 2019.
        </p>
      </section>

      {/* Section 7 */}
      <section id="promotions-vouchers" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#C59B48]" />
          <span>7. Coupon & Voucher Revalidation</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          If a single-use promotional coupon code was utilized on a cancelled order, the coupon code will be automatically
          revalidated within 24 hours of cancellation so you can apply it to a subsequent luxury purchase.
        </p>
      </section>

      {/* Section 8 */}
      <section id="affiliate-orders" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-[#C59B48]" />
          <span>8. Affiliate Order Cancellations</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          For merchandise purchased via external partner platforms (Tata CLiQ Luxury, Ajio Luxe, Myntra Luxe),
          cancellations must be processed directly on the respective partner retailer's platform in accordance with their
          specific terms. LUMIÈRE cannot cancel or modify orders placed with external merchants.
        </p>
      </section>
    </LegalPageLayout>
  );
}
