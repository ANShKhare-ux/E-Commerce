import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { AlertCircle, Sparkles, Scissors, Eye, ShieldAlert, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Product & Atelier Disclaimer | Fabric & Color Disclosures | LUMIÈRE India",
  description:
    "Official Store Disclaimer for LUMIÈRE luxury fashion. Read essential disclosures regarding natural handloom variations, digital screen color calibration, measurement tolerances, and garment care.",
  alternates: {
    canonical: "/disclaimer",
  },
};

const tableOfContents = [
  { id: "color-calibration", label: "1. Screen Calibration & Color Fidelity" },
  { id: "handloom-variations", label: "2. Handloom Weaves & Slub Character" },
  { id: "sizing-tolerances", label: "3. Sizing & Measurement Tolerances" },
  { id: "fabric-care", label: "4. Garment Care & Maintenance" },
  { id: "jewellery-metals", label: "5. Jewellery, Plating & Skin Sensitivity" },
  { id: "affiliate-disclaimer", label: "6. Affiliate Pricing & Stock Sync" },
  { id: "wellness-claims", label: "7. No Medical or Therapeutic Claims" },
  { id: "limitation-liability", label: "8. Limitation of Platform Liability" },
];

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Store & Fashion Product Disclaimer"
      subtitle="Important disclosures concerning craftsmanship characteristics, digital imagery, measurement tolerances, and material properties."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="legal"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Authentic Artisanal Craftsmanship</p>
        <p>
          At LUMIÈRE, we celebrate the idiosyncratic beauty of handmade Indian luxury. Before purchasing, we invite you
          to review these authentic craftsmanship disclosures, intended to foster transparency and realistic expectations
          regarding handloom textiles, digital screen color rendering, and garment care.
        </p>
      </div>

      {/* Section 1 */}
      <section id="color-calibration" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#C59B48]" />
          <span>1. Screen Calibration & Digital Color Fidelity</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          While LUMIÈRE conducts product photography under high-CRI 5600K calibrated studio lighting using color-accurate
          capture standards:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>
            <strong>Display Variations:</strong> Due to variations in display panels across mobile phones, laptops, and tablets
            (such as Apple True Tone, Samsung Super AMOLED, sRGB vs. DCI-P3 color gamuts, and varying brightness settings),
            actual fabric shades may appear slightly different in person.
          </li>
          <li>
            <strong>Ambient Lighting:</strong> Luxury textiles—especially Mulberry silk, Chanderi tissue, velvet, and metallic zari—exhibit
            iridescent, dynamic sheen characteristics that naturally shift between indoor incandescent warmth and outdoor sunlight.
          </li>
          <li>
            <strong>Dye Lot Differences:</strong> Natural vegetable and azo-free reactive dye lots prepared in limited artisan vats
            may exhibit minor tonal variations between production runs.
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section id="handloom-variations" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C59B48]" />
          <span>2. Handloom Weaves, Slub Yarn & Artisanal Inconsistencies</span>
        </h2>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">The Hallmarks of Genuine Handcraft:</p>
          <p className="text-noir-600">
            Our traditional Banarasi, Kadhwa zari, Chanderi, and raw silk silhouettes are woven manually on hand-operated
            pit looms. The presence of:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-noir-600">
            <li>Subtle unevenness in weave tension or slub yarns;</li>
            <li>Minute discrepancies in zari motif spacing or floating weft threads on the reverse;</li>
            <li>Tiny hand-block printing dye flecks or border alignment micro-shifts;</li>
          </ul>
          <p className="text-noir-600 pt-1">
            are <strong>not defects or damages</strong>. Rather, they serve as the irreplaceable fingerprint of the human weaver
            and tangible proof of authentic handloom origin.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section id="sizing-tolerances" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Scissors className="w-4 h-4 text-[#C59B48]" />
          <span>3. Sizing, Fit & Measurement Tolerances</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          All size charts and garment dimensions published on our product pages represent garment measurements laid flat.
          Because luxury apparel is individually hand-cut and sewn by master craftsmen:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>
            A standard tailoring tolerance of <strong>±0.5 inches to ±1.0 inch</strong> across chest, waist, and length is
            recognized as normal industry variation.
          </li>
          <li>
            Heavyweight streetwear silhouettes (e.g., our 450 GSM French Terry hoodies and oversized tees) are intentionally
            engineered with dropped shoulders and relaxed proportions as described in the product specifications.
          </li>
          <li>
            We strongly encourage patrons to consult our <Link href="/size-guide" className="text-[#C59B48] font-semibold underline hover:text-noir-900">Comprehensive Size Guide</Link> or connect with our concierge prior to placing an order.
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="fabric-care" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C59B48]" />
          <span>4. Garment Care & Maintenance Disclaimer</span>
        </h2>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm text-xs text-amber-900 space-y-2">
          <p className="font-semibold">Preserving Haute Craftsmanship:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Silk & Handloom Apparel:</strong> Strictly <strong>Professional Dry Clean Only</strong>. Never hand-wash or machine-wash pure silks, brocades, or garments featuring zari work.
            </li>
            <li>
              <strong>Zari & Metal Thread Care:</strong> Store wrapped in unbleached muslin cloth away from direct moisture, perfumes, and synthetic insect repellents. Avoid spraying alcohol-based fragrances directly onto zari borders.
            </li>
            <li>
              <strong>Heavy Streetwear:</strong> Machine wash cold, inside out, on gentle cycle. Do not tumble dry. Flat dry in shade to preserve high-density cotton fibers and puff prints.
            </li>
          </ul>
          <p className="text-[11px] text-amber-800 pt-1">
            * LUMIÈRE shall not be held liable for garment shrinkage, bleeding, or fiber distortion caused by laundering that contradicts published care labels.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section id="jewellery-metals" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C59B48]" />
          <span>5. Jewellery, Plating & Skin Sensitivity</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Fashion jewellery curated by LUMIÈRE is crafted using brass, copper alloys, 18K/24K gold micron plating, silver
          plating, and semi-precious quartz stones:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>Avoid contact with perfumes, chlorine water, sanitisers, and domestic cleaning chemicals.</li>
          <li>While our pieces are nickel-tested, individuals with acute metal allergies should exercise caution. LUMIÈRE cannot accept liability for dermatological reactions or allergic sensitivities.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="affiliate-disclaimer" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-[#C59B48]" />
          <span>6. Affiliate Pricing, Stock & Retailer Disclaimers</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          For merchandise tagged as <strong>"Partner Store"</strong> (sourced through affiliate integrations with Tata CLiQ Luxury,
          Ajio Luxe, or Myntra Luxe):
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>Prices, stock availability, and promotional discounts are governed strictly by the external retailer.</li>
          <li>While we strive to keep pricing synchronized, any discrepancy between LUMIÈRE display and the partner’s checkout price is governed authoritatively by the partner merchant.</li>
          <li>Warranties, invoicing, and fulfillment for external partner products reside entirely with the external merchant.</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section id="wellness-claims" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#C59B48]" />
          <span>7. No Medical, Health or Therapeutic Claims</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          No statement, material description, or artisanal profile published on this website regarding herbal dyes,
          ayurvedic fabric washes, or organic cotton fibers is intended to serve as medical advice, therapeutic claim,
          or clinical guarantee.
        </p>
      </section>

      {/* Section 8 */}
      <section id="limitation-liability" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C59B48]" />
          <span>8. General Limitation of Platform Liability</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          To the maximum extent permitted under applicable Indian law, LUMIÈRE provides this website and its contents
          on an "as-is" and "as-available" basis without representations or warranties of any kind, express or implied.
          Our aggregate liability arising out of any product purchased through this website shall in no event exceed the
          actual purchase price paid by the customer for that specific item.
        </p>
      </section>
    </LegalPageLayout>
  );
}
