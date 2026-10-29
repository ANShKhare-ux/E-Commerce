"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "orders" | "shipping" | "payments" | "returns" | "affiliate";
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "orders",
    q: "Why does LUMIÈRE reserve my garment for only 15 minutes during checkout?",
    a: "Because our atelier inventory consists of handloom pieces and limited-run 450 GSM streetwear drops, each size and color has a unique physical SKU. To prevent overselling and allow equal access to all patrons, units added to your bag are locked exclusively for 15 minutes. If checkout is not finalized within 15 minutes, the hold expires atomically back to the available inventory pool.",
  },
  {
    category: "orders",
    q: "Can I cancel an order after it has been placed?",
    a: "Yes. You may cancel your order at any time before it transitions to 'shipped' status via your Patron Account dashboard (/account) or by notifying our concierge. Upon cancellation, your payment will be refunded, and physical inventory is restored atomically to the warehouse pool with an audit trail.",
  },
  {
    category: "shipping",
    q: "How does LUMIÈRE ship orders across India?",
    a: "All domestic orders are dispatched from our central fulfillment hub at the Royal Opera House District in Mumbai using Delhivery Express Courier. Every parcel receives an official waybill (e.g. DEL-AWB-...) with real-time tracking across 19,000+ Indian postal PIN codes.",
  },
  {
    category: "shipping",
    q: "What are the shipping charges and delivery timeframes?",
    a: "We offer Complimentary Express Shipping on all orders of ₹2,999 or more. For orders below ₹2,999, a flat delivery fee of ₹150 applies. Typical transit time is 2–4 business days depending on your destination city and region.",
  },
  {
    category: "payments",
    q: "What payment methods are supported on LUMIÈRE?",
    a: "We support instant online payments via PhonePe Standard Checkout, Google Pay (GPay UPI), and Cash on Delivery (COD) for eligible pincodes across India.",
  },
  {
    category: "payments",
    q: "Are prices inclusive of Goods and Services Tax (GST)?",
    a: "Yes. All listed retail prices authoritatively include 12% GST applicable to textiles and luxury apparel in India. No hidden taxes are added at checkout.",
  },
  {
    category: "returns",
    q: "How does the 7-day return and inspection process work?",
    a: "We accept return requests within 7 days of courier delivery. Unlike automated platforms, returned garments must be received at our Mumbai hub and undergo physical inspection by our quality team to verify that security tags remain intact and the garment is unworn. Once sign-off is completed, refunds are dispatched immediately.",
  },
  {
    category: "affiliate",
    q: "What are 'Affiliate Partner' products?",
    a: "In addition to our own stocked inventory, our editorial directors curate verified luxury apparel from authorized retail partners such as Tata CLiQ Luxury, Ajio Luxe, and Myntra Luxe. External affiliate items are clearly labeled on every card and redirect directly to official partner portals for purchase.",
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filtered = selectedCategory === "all"
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block">
          Patron Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-noir-900 font-medium">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-noir-500 font-light leading-relaxed">
          Clear, transparent information regarding our Indian commerce practices, Delhivery courier logistics, 15-minute inventory holds, and inspection return policies.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
        {[
          { id: "all", label: "All Questions" },
          { id: "orders", label: "Orders & Holds" },
          { id: "shipping", label: "Delhivery Shipping" },
          { id: "payments", label: "Payments & GST" },
          { id: "returns", label: "Returns & Restock" },
          { id: "affiliate", label: "Affiliate Curations" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedCategory(tab.id);
              setExpandedIndex(null);
            }}
            className={`px-4 py-2 rounded-sm border transition-colors ${
              selectedCategory === tab.id
                ? "bg-noir-900 text-white border-noir-900 font-bold"
                : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-subtle divide-y divide-canvas-border overflow-hidden">
        {filtered.map((item, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <div key={idx} className="p-6 space-y-2">
              <button
                onClick={() => setExpandedIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg font-medium text-noir-900 group"
              >
                <span className="group-hover:text-gold-700 transition-colors pr-4">
                  {item.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gold-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-noir-400 group-hover:text-noir-900 shrink-0" />
                )}
              </button>

              {isOpen && (
                <p className="text-xs sm:text-sm text-noir-600 font-light leading-relaxed pt-2 border-t border-canvas-subtle animate-in fade-in duration-200">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Concierge */}
      <div className="text-center p-8 bg-canvas-subtle border border-canvas-border rounded-sm space-y-3">
        <h3 className="font-serif text-xl font-medium text-noir-900">
          Have Further Questions?
        </h3>
        <p className="text-xs text-noir-500 max-w-md mx-auto">
          Our Mumbai concierge desk is pleased to assist with custom orders, waybill tracking, and fabric inquiries.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
          >
            <span>Contact Concierge Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
