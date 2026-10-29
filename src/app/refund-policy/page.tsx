import React from "react";
import { CreditCard, Banknote, ShieldCheck } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-noir-700 leading-relaxed">
      <div className="border-b border-canvas-border pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Settlement Terms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Refund Policy
        </h1>
        <p className="text-noir-500 mt-1">
          Transparent reimbursement timelines for Indian banking channels and Cash on Delivery.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gold-600" />
            <span>1. Prepaid UPI, Cards & Netbanking Refunds</span>
          </h2>
          <p>
            Upon successful physical inspection and approval of your returned garment, refunds are initiated immediately through PhonePe / Google Pay UPI to the original source account. Funds typically reflect within <strong>24 to 48 hours</strong> depending on your issuing bank.
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-gold-600" />
            <span>2. Cash on Delivery (COD) Refunds</span>
          </h2>
          <p>
            For COD orders where cash was remitted to the courier associate, refunds are processed via instant <strong>NEFT / IMPS bank transfer</strong> or verified UPI ID. Our concierge team will send a secure link to provide your beneficiary account details. Transfers are completed within 24 to 48 hours of inspection approval.
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>3. No Inventory or Price Manipulation</span>
          </h2>
          <p>
            Refund amounts strictly match the net transactional price paid at checkout, inclusive of applicable GST. We do not charge restocking fees on legitimate returns.
          </p>
        </div>
      </div>
    </div>
  );
}
