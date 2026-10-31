import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { CreditCard, RotateCcw, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy & Settlement Terms | LUMIÈRE India",
  description:
    "Official Refund Policy and banking reimbursement guidelines for LUMIÈRE luxury fashion. Review UPI, card, and COD refund timelines.",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund Policy & Banking Settlements"
      subtitle="Comprehensive reimbursement timelines and procedures for UPI, card gateways, NetBanking, and Cash on Delivery."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="service"
    >
      <div className="space-y-6 text-xs text-noir-700 leading-relaxed">
        <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4">
          <p className="font-semibold text-noir-900 mb-1">Authoritative Refund Terms</p>
          <p>
            Refund processing at LUMIÈRE is directly governed by our{" "}
            <Link href="/returns-policy" className="text-[#C59B48] underline font-bold">
              Returns & Exchange Policy
            </Link>{" "}
            and{" "}
            <Link href="/payment-policy" className="text-[#C59B48] underline font-bold">
              Payment Policy
            </Link>.
            All refunds are initiated within 24 to 48 hours of physical inspection sign-off at our Mumbai hub.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#eaeaec] bg-white">
            <thead className="bg-[#f9f9fb] border-b border-[#eaeaec] text-noir-900 font-semibold">
              <tr>
                <th className="p-3">Payment Mode</th>
                <th className="p-3">Settlement Mechanism</th>
                <th className="p-3">Turnaround Time (Post-Inspection)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaeaec] text-noir-700">
              <tr>
                <td className="p-3 font-medium text-noir-900">UPI (PhonePe, GPay, Paytm)</td>
                <td className="p-3">Instant VPA refund via NPCI rails</td>
                <td className="p-3 font-semibold text-emerald-700">Instant to 24 Hours</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Credit / Debit Cards</td>
                <td className="p-3">Original card issuer / acquiring bank</td>
                <td className="p-3">3 to 5 Business Days</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Net Banking</td>
                <td className="p-3">Source account via IMPS/NEFT</td>
                <td className="p-3">2 to 4 Business Days</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-noir-900">Cash on Delivery (COD)</td>
                <td className="p-3">Direct NEFT / IMPS to verified patron bank account</td>
                <td className="p-3">24 to 48 Hours from bank details verification</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-[#eaeaec] p-5 rounded-sm space-y-3">
          <h3 className="font-serif text-sm font-bold text-noir-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
            <span>Integrity & No Restocking Fees</span>
          </h3>
          <p className="text-noir-600">
            Refunds issued by LUMIÈRE strictly match the net transactional price paid at checkout, inclusive of all 12% GST
            levies. We never charge restocking, handling, or administrative fees on legitimate returns.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/returns-policy"
              className="inline-flex items-center gap-1.5 text-[#C59B48] font-bold hover:underline"
            >
              <span>View Full Returns & Exchange Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/cancellation-policy"
              className="inline-flex items-center gap-1.5 text-[#C59B48] font-bold hover:underline"
            >
              <span>View Cancellation Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </LegalPageLayout>
  );
}
