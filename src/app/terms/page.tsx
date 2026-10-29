import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs text-noir-700 leading-relaxed">
      <div className="border-b border-canvas-border pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Terms & Conditions of Service
        </h1>
        <p className="text-noir-500 mt-1">Jurisdiction: Courts of Mumbai, Maharashtra, India.</p>
      </div>

      <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4">
        <h2 className="font-serif text-base font-bold text-noir-900">1. Overview</h2>
        <p>
          By accessing and utilizing the LUMIÈRE storefront, you agree to comply with and be bound by these Terms. LUMIÈRE reserves the right to revise or modify products, inventory allocations, and pricing without prior notice.
        </p>

        <h2 className="font-serif text-base font-bold text-noir-900">2. Pricing & Intellectual Property</h2>
        <p>
          All prices are quoted in Indian National Rupees (₹) inclusive of applicable GST. Photography, styling designs, and brand trademarks are the intellectual property of LUMIÈRE Fashions India Pvt. Ltd.
        </p>

        <h2 className="font-serif text-base font-bold text-noir-900">3. Dispute Resolution</h2>
        <p>
          Any disputes arising out of your purchases shall be subject to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration situated in Mumbai.
        </p>
      </div>
    </div>
  );
}
