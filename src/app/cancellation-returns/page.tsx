import React from "react";
import { RotateCcw, AlertTriangle, CheckCircle, ShieldCheck } from "lucide-react";

export default function CancellationReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-noir-700 leading-relaxed">
      <div className="border-b border-canvas-border pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Client Protection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Cancellation & 7-Day Return Policy
        </h1>
        <p className="text-noir-500 mt-1">
          Our commitment to craftsmanship and transparent customer service in India.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-gold-600" />
            <span>1. Order Cancellation Window</span>
          </h2>
          <p>
            You may cancel any unfulfilled order directly through your customer dashboard or by emailing <a href="mailto:concierge@lumiere.in" className="text-gold-700 underline">concierge@lumiere.in</a> within <strong>12 hours</strong> of placing the order, or before Delhivery waybill generation. Once an order is manifested and handed to the courier line-haul, standard return procedures apply.
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>2. 7-Day Return & Reverse Pickup</span>
          </h2>
          <p>
            We offer a 7-calendar-day return window starting from the verified Delhivery courier delivery timestamp. A complimentary reverse courier pickup will be scheduled at your doorstep upon return request approval.
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>3. Compulsory Physical Inspection Before Restocking</span>
          </h2>
          <p>
            To prevent fraud and maintain the highest hygienic standards for luxury and silk handlooms:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-noir-600">
            <li>Returned items must be unworn, unwashed, unaltered, and enclosed in original brand packaging with all tags attached.</li>
            <li><strong>Authoritative Rule:</strong> Returned merchandise is <em>never</em> automatically returned to active sellable stock. Every parcel is physically inspected at our Mumbai hub by our textile specialists before inventory restock approval.</li>
            <li>Customized tailoring or items marked as final archive sale are non-returnable.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
