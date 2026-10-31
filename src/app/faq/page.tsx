"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2 } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "orders" | "shipping" | "payments" | "returns" | "fabric" | "affiliate";
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "orders",
    q: "Why does LUMIÈRE reserve garments for only 15 minutes during checkout?",
    a: "Because our atelier inventory features limited-run handloom weaves, master artisan embroidery, and heavy 450 GSM streetwear drops, each size and silhouette exists in limited quantities. To prevent overselling and ensure fair access, items in your cart are locked exclusively for 15 minutes. If checkout is not finalized within that window, the hold expires atomically back to the available inventory pool.",
  },
  {
    category: "orders",
    q: "Can I cancel an order after it has been placed?",
    a: "Yes. You may cancel your order at any time before it transitions to 'Shipped' status directly from your Patron Account dashboard (/account) or by notifying our concierge. Cancellations prior to dispatch incur zero cancellation fees, and stock is automatically restored to the atelier catalog.",
  },
  {
    category: "orders",
    q: "Can I modify my delivery address after placing an order?",
    a: "Yes, provided the order has not yet been manifested with Delhivery Express. Simply reach out to our Mumbai concierge immediately at concierge@lumiere.in or +91 22 4900 8800 with your Order ID and corrected address.",
  },
  {
    category: "shipping",
    q: "How does LUMIÈRE ship orders across India?",
    a: "All domestic orders are fulfilled directly from our central facility in the Royal Opera House District, Girgaon, Mumbai using Delhivery Express Logistics. Every consignment is assigned an official Air Waybill (AWB) providing live tracking across 19,000+ Indian PIN codes.",
  },
  {
    category: "shipping",
    q: "What are the shipping charges and delivery timeframes?",
    a: "We offer Complimentary Express Shipping on all orders of ₹2,999 or more. For orders below ₹2,999, a flat fee of ₹150 applies. Estimated delivery is 2–3 business days for major metros (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata), 3–4 days for Tier 2 cities, and 4–7 days for regional towns and special logistics zones.",
  },
  {
    category: "shipping",
    q: "What should I do if the delivery box appears opened or damaged?",
    a: "All LUMIÈRE luxury apparel is shipped in tamper-evident security boxes sealed with reinforced void tape. DO NOT ACCEPT any parcel if the outer packaging is visibly torn, unsealed, or resealed with transparent tape. Refuse delivery and notify our concierge within 24 hours.",
  },
  {
    category: "payments",
    q: "What payment methods are supported on LUMIÈRE?",
    a: "We support instant online payments via Unified Payments Interface (PhonePe, Google Pay, Paytm, BHIM UPI), Credit/Debit Cards (Visa, MasterCard, RuPay, Amex) with mandatory RBI 2FA OTP verification, NetBanking across 50+ Indian banks, and Cash on Delivery (COD) for eligible PIN codes up to ₹15,000.",
  },
  {
    category: "payments",
    q: "Are prices inclusive of Goods and Services Tax (GST)?",
    a: "Yes. All listed retail prices authoritatively include 12% GST applicable to textiles and apparel under Indian tax law. An official Rule 46 GST Tax Invoice is included in your parcel and delivered electronically.",
  },
  {
    category: "payments",
    q: "My bank account was debited, but my order is unconfirmed. What happens?",
    a: "This happens during bank network timeouts. Our payment engine reconciles transactions every 15 minutes. In accordance with RBI guidelines, if an order session was not successfully generated, your funds are reversed automatically by your bank within 3 to 5 business days.",
  },
  {
    category: "returns",
    q: "What is LUMIÈRE's 7-Day Return and Physical Inspection policy?",
    a: "You may request a return or exchange within 7 days of delivery. To protect luxury standards, returned items must be in pristine unworn condition with our security tag intact. Consignments undergo white-glove inspection at our Mumbai hub before a refund is issued. Returned items are never restocked automatically.",
  },
  {
    category: "returns",
    q: "Which items are non-returnable?",
    a: "For hygiene and statutory reasons, pierced jewellery/earrings, unsealed fragrances and grooming items, intimate apparel, bespoke tailored or altered pieces, and items marked 'Final Archive Sale' are non-returnable unless received in a damaged or defective state.",
  },
  {
    category: "fabric",
    q: "Why do handloom fabrics show minor weave irregularities or slubs?",
    a: "Natural slubs, minute unevenness in weave tension, and slight variations in zari motifs are the definitive hallmarks of authentic hand-loomed textiles (such as Banarasi, Chanderi, and Kadhwa weaves). They are not defects, but the authentic signature of the master weaver's pit-loom.",
  },
  {
    category: "fabric",
    q: "Why might the fabric color look slightly different from the website?",
    a: "While our photographs are taken in color-calibrated 5600K studio conditions, display panels on consumer phones and laptops vary in color gamut and brightness. Additionally, natural silks and metallic zari reflect ambient indoor versus outdoor lighting dynamically.",
  },
  {
    category: "affiliate",
    q: "What are 'Partner Store' or affiliate products?",
    a: "In addition to our Mumbai-manufactured direct atelier inventory, our editors curate exceptional designer fashion and accessories from authorized partner retailers like Tata CLiQ Luxury, Ajio Luxe, and Myntra Luxe. These items are badged with a 'Partner Store' tag and redirect you to the merchant's portal for fulfillment.",
  },
];

const tableOfContents = [
  { id: "all-questions", label: "Interactive FAQ Library" },
  { id: "need-assistance", label: "Personal Concierge Assistance" },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filtered =
    selectedCategory === "all"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === selectedCategory);

  return (
    <LegalPageLayout
      title="Frequently Asked Questions"
      subtitle="Clear and authoritative answers regarding ordering, 15-minute holds, Delhivery logistics, returns, and craftsmanship."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="service"
      tableOfContents={tableOfContents}
    >
      <section id="all-questions" className="space-y-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
          {[
            { id: "all", label: "All Questions" },
            { id: "orders", label: "Orders & Holds" },
            { id: "shipping", label: "Delhivery Shipping" },
            { id: "payments", label: "Payments & GST" },
            { id: "returns", label: "Returns & Restock" },
            { id: "fabric", label: "Fabrics & Care" },
            { id: "affiliate", label: "Affiliate Curations" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                setExpandedIndex(null);
              }}
              className={`px-3 py-1.5 rounded-sm border transition-colors ${
                selectedCategory === tab.id
                  ? "bg-noir-900 text-white border-noir-900 font-bold"
                  : "bg-white text-noir-700 border-[#eaeaec] hover:border-noir-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="bg-white border border-[#eaeaec] rounded-sm divide-y divide-[#eaeaec] overflow-hidden">
          {filtered.map((item, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <div key={idx} className="p-4 sm:p-5 space-y-2">
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-serif text-sm sm:text-base font-semibold text-noir-900 group"
                >
                  <span className="group-hover:text-[#C59B48] transition-colors pr-4">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C59B48] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-noir-400 group-hover:text-noir-900 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <p className="text-xs text-noir-600 font-light leading-relaxed pt-2 border-t border-[#f0f0f2] animate-in fade-in duration-200">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Concierge Assistance Card */}
      <section id="need-assistance" className="pt-4">
        <div className="text-center p-6 bg-[#f9f9fb] border border-[#eaeaec] rounded-sm space-y-3">
          <h3 className="font-serif text-lg font-bold text-noir-900">
            Require Bespoke Assistance?
          </h3>
          <p className="text-xs text-noir-500 max-w-md mx-auto">
            Our Mumbai styling concierge and logistics desk is available Monday through Saturday, 10:00 AM – 7:00 PM IST.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-noir-900 hover:bg-[#C59B48] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm transition-colors"
            >
              <span>Contact Concierge Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
