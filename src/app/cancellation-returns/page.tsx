import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { RotateCcw, XCircle, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation & Returns Guide | LUMIÈRE India",
  description:
    "Quick guide to cancellations and returns at LUMIÈRE luxury fashion. Access our dedicated 7-day return policy and order cancellation guidelines.",
  alternates: {
    canonical: "/cancellation-returns",
  },
};

export default function CancellationReturnsPage() {
  return (
    <LegalPageLayout
      title="Cancellations, Returns & Exchanges"
      subtitle="Comprehensive policies governing post-purchase adjustments, reverse pickups, and order modifications."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="service"
    >
      <div className="space-y-6 text-xs text-noir-700 leading-relaxed">
        <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4">
          <p className="font-semibold text-noir-900 mb-1">Dedicated Policy Portals</p>
          <p>
            To provide comprehensive legal transparency for Indian consumers, LUMIÈRE maintains dedicated, detailed
            documentation for both order cancellations and returns. Please select the specific policy below:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Link
            href="/returns-policy"
            className="group block bg-white border border-[#eaeaec] p-5 rounded-sm hover:border-noir-900 transition-colors"
          >
            <div className="flex items-center gap-2 text-[#C59B48] mb-2">
              <RotateCcw className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-noir-500">Full Policy</span>
            </div>
            <h3 className="font-serif text-base font-bold text-noir-900 group-hover:text-[#C59B48] flex items-center justify-between">
              <span>7-Day Return & Exchange Policy</span>
              <ArrowRight className="w-4 h-4 text-noir-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-noir-600 mt-2">
              Review eligibility criteria, Delhivery reverse pickups, two-stage warehouse inspection, non-returnable hygiene items, and refund processing.
            </p>
          </Link>

          <Link
            href="/cancellation-policy"
            className="group block bg-white border border-[#eaeaec] p-5 rounded-sm hover:border-noir-900 transition-colors"
          >
            <div className="flex items-center gap-2 text-[#C59B48] mb-2">
              <XCircle className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-noir-500">Full Policy</span>
            </div>
            <h3 className="font-serif text-base font-bold text-noir-900 group-hover:text-[#C59B48] flex items-center justify-between">
              <span>Order Cancellation Policy</span>
              <ArrowRight className="w-4 h-4 text-noir-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-noir-600 mt-2">
              Learn how to cancel an order prior to dispatch, automated atomic stock reversion, turnaround timelines, and merchant cancellation protocols.
            </p>
          </Link>
        </div>

        <div className="bg-white border border-[#eaeaec] p-5 rounded-sm space-y-3 pt-4">
          <h3 className="font-serif text-sm font-bold text-noir-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
            <span>Key Patron Guarantees</span>
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li><strong>7-Calendar-Day Return Window:</strong> Beginning from verified Delhivery delivery timestamp.</li>
            <li><strong>Zero Reverse Pickup Fee:</strong> Complimentary doorstep collection across 19,000+ PIN codes.</li>
            <li><strong>Authoritative Two-Stage Restock:</strong> Garments are inspected by textile specialists at our Mumbai hub before inventory restock sign-off.</li>
            <li><strong>Source Account Refunds:</strong> Direct reversal to original UPI / Bank Account within 24–48 hours of inspection approval.</li>
          </ul>
        </div>
      </div>
    </LegalPageLayout>
  );
}
