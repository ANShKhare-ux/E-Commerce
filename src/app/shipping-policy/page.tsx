import React from "react";
import { Truck, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-noir-700 leading-relaxed">
      <div className="border-b border-canvas-border pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Fulfilment Guidelines
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Shipping & Courier Policy (India)
        </h1>
        <p className="text-noir-500 mt-1">
          Last updated: October 2025 • Governing shipments within the Republic of India.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-gold-600" />
            <span>1. Courier Partner & Delivery Coverage</span>
          </h2>
          <p>
            All physically stocked LUMIÈRE apparel is fulfilled directly from our central warehouse in Mumbai, Maharashtra. We have partnered exclusively with <strong>Delhivery Express Logistics</strong> to service over 19,000 PIN codes across Tier 1, Tier 2, and Tier 3 Indian towns.
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-600" />
            <span>2. Dispatch & Turnaround Time (TAT)</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li><strong>Dispatch Timeline:</strong> Orders received before 2:00 PM IST Monday through Saturday are dispatched the same day after quality inspection.</li>
            <li><strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 business days.</li>
            <li><strong>Rest of India:</strong> 3 to 5 business days.</li>
            <li><strong>Remote & Hill Station Regions:</strong> 5 to 7 business days.</li>
          </ul>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>3. Shipping Charges & Free Threshold</span>
          </h2>
          <p>
            • <strong>Complimentary Express Shipping:</strong> Orders valued at ₹2,999 and above qualify for free delivery across India.<br />
            • <strong>Standard Flat Rate:</strong> Orders under ₹2,999 are subject to a nominal courier fee of ₹150 inclusive of GST.
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gold-600" />
            <span>4. Cash on Delivery (COD) Protocol</span>
          </h2>
          <p>
            Cash on Delivery is available across serviceable PIN codes. To ensure delivery integrity, our logistics engine sends an automated SMS verification OTP prior to Delhivery courier dispatch. Please ensure correct mobile contact details during checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
