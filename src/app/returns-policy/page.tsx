import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2, Clock, Truck, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Return, Exchange & Refund Policy | LUMIÈRE Legal",
  description:
    "Official 7-day return policy, fashion condition guidelines, Delhivery reverse pickups, two-stage inspection protocol, and refund timelines for LUMIÈRE India.",
  alternates: {
    canonical: "https://lumiere.in/returns-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReturnsPolicyPage() {
  const tableOfContents = [
    { id: "return-window", label: "1. 7-Day Return Window & Eligibility" },
    { id: "condition-guidelines", label: "2. Fashion Apparel Condition Standards" },
    { id: "non-returnable", label: "3. Non-Returnable & Hygiene Categories" },
    { id: "damaged-defective", label: "4. Damaged, Defective or Incorrect Items" },
    { id: "reverse-pickup", label: "5. Complimentary Delhivery Reverse Pickup" },
    { id: "inspection-workflow", label: "6. Two-Stage Warehouse Physical Inspection" },
    { id: "refund-methods", label: "7. Refund Methods & Settlement Timelines" },
    { id: "exchanges", label: "8. Size & Color Exchange Policy" },
    { id: "how-to-initiate", label: "9. How to Initiate a Return Request" },
  ];

  return (
    <LegalPageLayout
      title="Return, Exchange & Refund Policy"
      subtitle="Ensuring fairness, uncompromising hygiene standards, and rapid reimbursement across India."
      effectiveDate="October 1, 2025"
      lastUpdated="October 31, 2026"
      category="service"
      tableOfContents={tableOfContents}
    >
      <div className="space-y-8 text-xs text-noir-700 leading-relaxed">
        {/* Policy Summary Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-[#eaeaec] rounded-sm space-y-1">
            <span className="flex items-center gap-1.5 font-bold text-noir-900 text-xs">
              <Clock className="w-4 h-4 text-[#C59B48]" />
              <span>7-Day Return Window</span>
            </span>
            <p className="text-[11px] text-noir-500">
              Calculated from verified Delhivery courier delivery timestamp.
            </p>
          </div>
          <div className="p-4 bg-white border border-[#eaeaec] rounded-sm space-y-1">
            <span className="flex items-center gap-1.5 font-bold text-noir-900 text-xs">
              <Truck className="w-4 h-4 text-[#C59B48]" />
              <span>Free Doorstep Pickup</span>
            </span>
            <p className="text-[11px] text-noir-500">
              Complimentary reverse courier pickup across 19,000+ PIN codes.
            </p>
          </div>
          <div className="p-4 bg-white border border-[#eaeaec] rounded-sm space-y-1">
            <span className="flex items-center gap-1.5 font-bold text-noir-900 text-xs">
              <CreditCard className="w-4 h-4 text-[#C59B48]" />
              <span>24–48 Hr Reimbursement</span>
            </span>
            <p className="text-[11px] text-noir-500">
              Instant credit to UPI, original card, or NEFT for COD orders.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section id="return-window" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#C59B48]" />
            <span>1. 7-Calendar-Day Return Window</span>
          </h2>
          <p>
            At LUMIÈRE, we take immense pride in the craftsmanship of our handloom silks, bespoke tailoring, and heavyweight streetwear.
            If you are not entirely satisfied with your purchase, you may initiate a return within <strong>seven (7) calendar days</strong> from
            the date the shipment is delivered to your destination address as recorded by Delhivery Express Logistics.
          </p>
          <p>
            Return requests submitted after seven (7) calendar days from delivery cannot be accepted under our automated logistics pipeline.
          </p>
        </section>

        {/* Section 2 */}
        <section id="condition-guidelines" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
            <span>2. Fashion Apparel & Luxury Condition Standards</span>
          </h2>
          <p>
            To uphold the highest hygiene, authentic handloom integrity, and luxury presentation standards for all patrons,
            returned merchandise must strictly comply with the following physical criteria:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-noir-600">
            <li>
              <strong>Unworn & Unaltered:</strong> Garments must not show any signs of wear, body odor, perfume, deodorant marks, makeup stains,
              or fabric stretching. Handloom silks (Chanderi, Banarasi) must retain their original crisp press and fold lines.
            </li>
            <li>
              <strong>Unwashed & Undamaged:</strong> Items that have been hand-washed, dry-cleaned, machine-laundered, or ironed will be rejected.
            </li>
            <li>
              <strong>Original Tags & Seals Intact:</strong> The garment must retain its original woven LUMIÈRE atelier neck labels,
              external brand swing tags, barcode security seals, and extra button sachets intact and unsevered.
            </li>
            <li>
              <strong>Original Packaging:</strong> Merchandise must be enclosed in its original brand garment bag, dust cover, and protective box.
            </li>
            <li>
              <strong>Footwear & Accessories:</strong> Footwear must include the original undamaged shoe box placed inside an external protective shipping carton. Soles must be entirely spotless and free of abrasions.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section id="non-returnable" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>3. Non-Returnable & Hygiene-Sensitive Categories</span>
          </h2>
          <p>
            In accordance with the Consumer Protection (E-Commerce) Rules, 2020 and standard hygiene regulations, the following product categories
            are strictly non-returnable and non-exchangeable, unless delivered in a damaged, defective, or incorrect condition:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li><strong>Custom Tailoring & Bespoke Alterations:</strong> Garments tailored or adjusted to personal body measurements.</li>
            <li><strong>Fine Jewelry & Pierced Ornaments:</strong> Earrings, nose pins, and intimate jewelry due to statutory hygiene mandates.</li>
            <li><strong>Intimate Apparel & Shapewear:</strong> Any innerwear, bodysuits, or swimwear where hygiene strips have been unsealed.</li>
            <li><strong>Luxury Perfumery & Botanical Elixirs:</strong> Fragrances, body mists, and skincare oils where the tamper-evident cellophane seal is broken.</li>
            <li><strong>Final Archive Sale Items:</strong> Clearance inventory explicitly marked as &quot;Final Sale — Non-Returnable&quot; on the PDP at the time of purchase.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="damaged-defective" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            4. Damaged, Defective or Incorrect Merchandise
          </h2>
          <p>
            Every LUMIÈRE creation undergoes a strict 3-point quality inspection prior to dispatch. However, if your order arrives damaged,
            exhibits a structural manufacturing defect, or if an incorrect item/size was packed:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>You must notify LUMIÈRE Concierge (<a href="mailto:concierge@lumiere.in" className="text-[#C59B48] underline">concierge@lumiere.in</a>) within <strong>forty-eight (48) hours</strong> of verified delivery.</li>
            <li>Please share clear photographic evidence showing the parcel shipping label, the affected garment area, and the original barcode tag.</li>
            <li>Upon verification, we will schedule an expedited priority reverse pickup and dispatch a complimentary replacement or issue a full refund, including original shipping fees.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="reverse-pickup" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            5. Complimentary Delhivery Reverse Pickup Protocol
          </h2>
          <p>
            LUMIÈRE provides complimentary reverse pickup across all 19,000+ serviceable PIN codes in India. You do not need to ship
            the parcel yourself:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>Once your return request is approved in your dashboard, our logistics system generates a Delhivery reverse AWB waybill.</li>
            <li>A courier associate will attempt pickup within <strong>24 to 48 business hours</strong> at your original delivery address.</li>
            <li>Three (3) pickup attempts will be made. If all three attempts fail due to customer unavailability, the return request will be closed.</li>
            <li>The courier associate will conduct an initial superficial check for brand tags before handing you an official physical or SMS receipt.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="inspection-workflow" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            6. Mandatory Two-Stage Warehouse Physical Inspection
          </h2>
          <div className="p-3.5 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm space-y-2">
            <h4 className="font-bold text-noir-900 text-xs">Authoritative Storefront Restock Rule</h4>
            <p className="text-[11px] text-noir-700 leading-relaxed">
              Returned merchandise is <strong>never</strong> automatically added back to active inventory upon return creation.
              Every return parcel is physically transported to our central Mumbai facility, unboxed under high-definition cameras,
              and rigorously evaluated by our textile specialists before restock sign-off and refund authorization.
            </p>
          </div>
          <p className="text-noir-600">
            If an item fails physical inspection due to wear, odor, wash damage, or missing tags:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-noir-600">
            <li>The refund request will be rejected with an itemized inspection report and high-resolution photographs.</li>
            <li>The garment will be re-dispatched to your registered delivery address at customer expense.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="refund-methods" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#C59B48]" />
            <span>7. Refund Methods & Settlement Timelines</span>
          </h2>
          <p>
            Upon successful inspection approval, refunds are processed strictly to the net transaction price paid, inclusive of 12% GST.
            <strong> We charge zero restocking fees on legitimate returns.</strong>
          </p>
          <div className="space-y-3 pt-1">
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <span className="font-bold text-noir-900 text-xs block mb-1">Prepaid Orders (PhonePe, UPI, Credit/Debit Cards, Netbanking)</span>
              <p className="text-[11px] text-noir-600">
                Refunds are initiated back to the original source account within <strong>24 hours</strong> of inspection approval.
                Funds reflect in your bank account or card balance within <strong>2 to 4 business days</strong>, governed by your bank&apos;s settlement schedule.
              </p>
            </div>
            <div className="p-3 bg-[#fafafa] border border-[#eaeaec] rounded-sm">
              <span className="font-bold text-noir-900 text-xs block mb-1">Cash on Delivery (COD) Orders</span>
              <p className="text-[11px] text-noir-600">
                For cash collected by Delhivery associates, refunds are executed via direct <strong>NEFT / IMPS bank transfer</strong> or verified UPI VPA ID.
                Our concierge desk will provide a secure form upon inspection sign-off. Bank transfers are completed within <strong>24 to 48 hours</strong> of verified bank detail submission.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section id="exchanges" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900">
            8. Size & Color Exchange Policy
          </h2>
          <p>
            If you love your garment but require an alternate size (e.g., Medium to Large) or color variant:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>You may request a one-time complimentary size exchange within seven (7) days of delivery via your patron account dashboard.</li>
            <li>Exchanges are contingent on active inventory availability in our Mumbai fulfillment center.</li>
            <li>The replacement size will be dispatched immediately following physical receipt and verification of the returned piece.</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section id="how-to-initiate" className="bg-white border border-[#eaeaec] p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>9. Step-by-Step: How to Initiate a Return</span>
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-noir-600">
            <li>
              <strong>Access Account:</strong> Navigate to your patron dashboard at <Link href="/account" className="text-[#C59B48] underline">lumiere.in/account</Link> and select “Orders & Returns”.
            </li>
            <li>
              <strong>Select Item:</strong> Choose the delivered order, select the specific piece you wish to return, and indicate the primary reason (e.g. Size fit, Color variation, Defect).
            </li>
            <li>
              <strong>Pack Securely:</strong> Enclose the unworn garment in its original protective cover, ensure tags are attached, and seal it inside the courier box.
            </li>
            <li>
              <strong>Handover to Delhivery:</strong> Our courier associate will visit your address to collect the parcel and provide tracking confirmation.
            </li>
          </ol>
        </section>
      </div>
    </LegalPageLayout>
  );
}
