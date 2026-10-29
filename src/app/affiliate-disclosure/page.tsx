import React from "react";
import { ExternalLink, ShieldCheck, CheckCircle } from "lucide-react";

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-noir-700 leading-relaxed">
      <div className="border-b border-canvas-border pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Consumer Transparency & Legal Compliance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Affiliate & External Retailer Disclosure
        </h1>
        <p className="text-noir-500 mt-1">
          Published in compliance with the Consumer Protection (E-Commerce) Rules, 2020 and ASCI guidelines for India.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gold-600" />
            <span>1. Physical Stock vs. Affiliate Curations</span>
          </h2>
          <p>
            At LUMIÈRE, we take pride in honesty. We operate two distinct product categories across our digital storefront:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-noir-600">
            <li>
              <strong>LUMIÈRE Direct Atelier Products:</strong> Garments physically designed, manufactured, stocked, and dispatched by LUMIÈRE from our Mumbai fulfilment facility. For these items, LUMIÈRE manages billing, Delhivery shipping, customer care, and returns directly.
            </li>
            <li>
              <strong>Affiliate Curated Products:</strong> Fashion designs and luxury accessories curated by our style editors from authorized third-party Indian retailers, including <em>Tata CLiQ Luxury</em>, <em>Ajio Luxe</em>, and <em>Myntra Luxe</em>. Every such product is clearly badged with a "Partner Store" tag and discloses the retailer's identity.
            </li>
          </ul>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>2. Affiliate Commissions & Pricing Integrity</span>
          </h2>
          <p>
            When you click an affiliate product link on LUMIÈRE, you are securely redirected to the external retailer's official e-commerce platform to complete your transaction. If you make a purchase, LUMIÈRE may earn a verified referral commission from the partner retailer.
          </p>
          <p className="font-semibold text-noir-900">
            This commission is paid by the retailer and does not increase the purchase price for you in any way. You receive the exact same retail or discounted price offered by the partner.
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
          <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gold-600" />
            <span>3. Order Fulfilment & Warranties for Affiliate Purchases</span>
          </h2>
          <p>
            Because affiliate transactions occur directly on the external merchant's platform, the partner retailer is solely responsible for payment capture, courier dispatch, invoicing, return processing, and product warranties. LUMIÈRE does not process or hold customer payment credentials or customer orders for third-party affiliate items.
          </p>
        </div>
      </div>
    </div>
  );
}
