import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { Truck, Clock, ShieldCheck, MapPin, AlertTriangle, RefreshCw, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Delhivery Courier Timelines | LUMIÈRE India",
  description:
    "Official Shipping and Delivery Policy for LUMIÈRE luxury fashion. Discover domestic courier timelines across 19,000+ PIN codes via Delhivery, free shipping thresholds, dispatch SLAs, and tracking procedures.",
  alternates: {
    canonical: "/shipping-policy",
  },
};

const tableOfContents = [
  { id: "fulfillment-hub", label: "1. Fulfillment Hub & Delhivery Network" },
  { id: "dispatch-slas", label: "2. Dispatch Schedules & Cutoff Times" },
  { id: "delivery-timelines", label: "3. Regional Delivery Timelines" },
  { id: "shipping-charges", label: "4. Shipping Fees & Free Delivery" },
  { id: "order-tracking", label: "5. Real-Time Tracking & AWB Generation" },
  { id: "delivery-attempts", label: "6. Delivery Attempts & COD Protocol" },
  { id: "failed-deliveries", label: "7. Undelivered Shipments & RTO" },
  { id: "tamper-guidelines", label: "8. Tamper Guidelines & Lost Parcels" },
  { id: "address-amendments", label: "9. Address Changes & Redirects" },
  { id: "affiliate-shipping", label: "10. Affiliate Fulfilment Distinction" },
];

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout
      title="Shipping & Delivery Policy"
      subtitle="Governing nationwide logistics, dispatch timelines, and delivery protocols across the Republic of India."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="service"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Domestic Courier Commitment</p>
        <p>
          LUMIÈRE partners exclusively with <strong>Delhivery Express Logistics</strong> to provide secure, insured,
          and trackable express courier delivery to more than 19,000 postal PIN codes across India. All direct atelier
          garments undergo physical white-glove inspection at our Mumbai fulfillment center prior to tamper-evident sealing.
        </p>
      </div>

      {/* Section 1 */}
      <section id="fulfillment-hub" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#C59B48]" />
          <span>1. Central Fulfillment Hub & Courier Network</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          All physically inventoried LUMIÈRE garments, handloom sarees, and limited-edition luxury streetwear are
          dispatched directly from our primary fulfillment facility situated in the Royal Opera House District, Girgaon,
          Mumbai, Maharashtra 400004.
        </p>
        <p className="text-xs text-noir-700 leading-relaxed">
          Through our enterprise integration with <strong>Delhivery Express</strong>, we service residential and commercial
          addresses across Tier 1 metropolitan zones, Tier 2 commercial hubs, and Tier 3 township PIN codes. At this time,
          LUMIÈRE only fulfills orders destined for addresses within the sovereign territory of the Republic of India.
          International delivery is currently offered only via custom styling concierge requests.
        </p>
      </section>

      {/* Section 2 */}
      <section id="dispatch-slas" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C59B48]" />
          <span>2. Dispatch Schedules & Cutoff Times</span>
        </h2>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs text-noir-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-noir-900 block">Same-Day Dispatch Window</strong>
              <span>
                Orders placed and payment-authorized before <strong>2:00 PM IST (Monday through Saturday)</strong> are
                packaged, barcoded, and handed over to Delhivery logistics on the same business day.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-[#f0f0f2]">
            <Clock className="w-4 h-4 text-[#C59B48] shrink-0 mt-0.5" />
            <div>
              <strong className="text-noir-900 block">After-Hours & Sunday Processing</strong>
              <span>
                Orders placed after 2:00 PM IST or on Sundays and national public holidays are prioritized for dispatch
                on the subsequent business day.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="delivery-timelines" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#C59B48]" />
          <span>3. Regional Delivery Timelines</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Estimated transit times are computed from the moment your parcel leaves our Mumbai hub with a validated
          Delhivery Air Waybill (AWB):
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#eaeaec] bg-white">
            <thead className="bg-[#f9f9fb] border-b border-[#eaeaec] text-noir-900 font-semibold">
              <tr>
                <th className="p-3">Destination Tier</th>
                <th className="p-3">Key Indian Cities / Regions</th>
                <th className="p-3">Estimated Transit Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaeaec] text-noir-700">
              <tr>
                <td className="p-3 font-medium text-noir-900">Metro Hubs</td>
                <td className="p-3">Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad</td>
                <td className="p-3 font-semibold text-emerald-700">2 to 3 Business Days</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Tier 2 Commercial Centers</td>
                <td className="p-3">Jaipur, Lucknow, Chandigarh, Kochi, Surat, Indore, Nagpur, Coimbatore, Patna</td>
                <td className="p-3">3 to 4 Business Days</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Tier 3 & Regional Towns</td>
                <td className="p-3">Interior district headquarters and suburban serviceable pin codes</td>
                <td className="p-3">4 to 5 Business Days</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Special Logistics Zones</td>
                <td className="p-3">North-Eastern States, Jammu & Kashmir, Ladakh, Andaman & Nicobar, Lakshadweep</td>
                <td className="p-3">5 to 7 Business Days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-noir-500 italic">
          * Note: Transit times may be subject to minor fluctuations during major festive seasons (Diwali, Eid, New Year) or force majeure weather conditions.
        </p>
      </section>

      {/* Section 4 */}
      <section id="shipping-charges" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>4. Shipping Fees & Free Delivery Threshold</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm">
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 block mb-1">
              Complimentary
            </span>
            <h3 className="font-serif text-base font-bold text-noir-900">Orders ₹2,999 & Above</h3>
            <p className="text-xs text-noir-600 mt-1">
              All domestic orders with a net merchandise value of ₹2,999 or higher qualify for 100% free express delivery.
            </p>
          </div>
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm">
            <span className="text-[10px] font-bold tracking-widest uppercase text-noir-500 block mb-1">
              Standard Courier Flat Fee
            </span>
            <h3 className="font-serif text-base font-bold text-noir-900">₹150 Flat (Orders &lt; ₹2,999)</h3>
            <p className="text-xs text-noir-600 mt-1">
              For smaller orders below ₹2,999, a flat subsidized fee of ₹150 (inclusive of 18% GST) is applied at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section id="order-tracking" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#C59B48]" />
          <span>5. Real-Time Tracking & AWB Generation</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Upon physical scan and handover to Delhivery at our Mumbai hub:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>
            An automated notification containing your Delhivery Air Waybill number (e.g., <code>DEL-AWB-XXXXXXXX</code>) is
            dispatched to your registered mobile phone via SMS/WhatsApp and to your primary email address.
          </li>
          <li>
            You can monitor real-time courier milestones anytime using our dedicated{" "}
            <Link href="/track-order" className="text-[#C59B48] font-semibold underline hover:text-noir-900">
              Track Delhivery Parcel
            </Link>{" "}
            portal or via your <Link href="/account" className="text-[#C59B48] font-semibold underline hover:text-noir-900">Patron Account</Link>.
          </li>
          <li>
            Live status includes: Manifest Created, Picked Up, In Transit, Arrived at Local Delivery Hub, Out for Delivery, and Delivered.
          </li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="delivery-attempts" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C59B48]" />
          <span>6. Delivery Attempts & Cash on Delivery (COD) Protocol</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Delhivery courier delivery associates will make up to <strong>three (3) consecutive delivery attempts</strong> on
          successive business days before flagging a consignment as non-deliverable.
        </p>
        <div className="bg-[#f9f9fb] border border-[#eaeaec] p-4 space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">Cash on Delivery Security Measures:</p>
          <ul className="list-disc pl-5 space-y-1 text-noir-600">
            <li>
              Prior to dispatch, all COD orders undergo an automated SMS / phone confirmation verification to confirm patron availability.
            </li>
            <li>
              At the doorstep, patrons must verify receipt with a secure One-Time Password (OTP) delivered to the recipient’s phone.
            </li>
            <li>
              Payment must be tendered in Indian Rupees cash or via dynamic UPI QR code displayed by the Delhivery courier executive prior to unsealing the transit box.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 7 */}
      <section id="failed-deliveries" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>7. Undelivered Shipments & Return-to-Origin (RTO)</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          If all three delivery attempts fail due to customer unavailability, incorrect contact number, refusal to accept,
          or address non-identification, the shipment is marked as <strong>Return-to-Origin (RTO)</strong> and routed back to
          our Mumbai hub.
        </p>
        <p className="text-xs text-noir-700 leading-relaxed">
          For prepaid orders that return to us as RTO, our concierge will attempt to contact you within 48 hours to confirm an
          alternate delivery address. If no response is received within 5 business days, the order will be cancelled and
          the merchandise amount refunded to the original payment source, minus outbound shipping costs incurred.
        </p>
      </section>

      {/* Section 8 */}
      <section id="tamper-guidelines" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>8. Tamper Guidelines, Inspection & Lost Shipments</span>
        </h2>
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-sm text-xs text-rose-900 space-y-2">
          <p className="font-semibold">Mandatory Parcel Inspection Upon Delivery:</p>
          <p>
            All LUMIÈRE luxury apparel is shipped in branded, tamper-evident security boxes sealed with reinforced void tape.
            <strong> DO NOT ACCEPT</strong> any parcel if the outer packaging is visibly torn, crushed, unsealed, or resealed
            with transparent tape.
          </p>
          <p>
            If you suspect tampering, immediately refuse delivery and alert our concierge at{" "}
            <a href="mailto:concierge@lumiere.in" className="underline font-bold">concierge@lumiere.in</a> or{" "}
            <strong>+91 22 4900 8800</strong> within 24 hours.
          </p>
        </div>
        <p className="text-xs text-noir-700 leading-relaxed">
          In the rare event that a consignment is declared lost in transit by Delhivery, LUMIÈRE assumes 100% financial
          responsibility. We will dispatch an identical replacement garment immediately or issue a full 100% refund to
          your original payment method without delay.
        </p>
      </section>

      {/* Section 9 */}
      <section id="address-amendments" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#C59B48]" />
          <span>9. Address Changes & Rerouting Protocol</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          If you need to amend your shipping address or contact details after placing an order, please contact our
          concierge immediately. Amendments can be accommodated without charge as long as the parcel has not yet been
          manifested and handed over to Delhivery. Once a shipment is in transit, rerouting to an alternate PIN code or city
          is subject to Delhivery logistics feasibility and may incur transit rebooking charges.
        </p>
      </section>

      {/* Section 10 */}
      <section id="affiliate-shipping" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#C59B48]" />
          <span>10. Affiliate Fulfilment Distinction</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Please note that products designated with a <strong>"Partner Store"</strong> or affiliate badge (sourced from
          authorized luxury retailers such as <em>Tata CLiQ Luxury</em>, <em>Ajio Luxe</em>, or <em>Myntra Luxe</em>) are
          fulfilled and shipped directly by the respective external partner platform according to their independent
          courier partnerships and shipping policies.
        </p>
      </section>
    </LegalPageLayout>
  );
}
