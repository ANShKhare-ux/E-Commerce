import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { Sparkles, ShieldCheck, Award, CheckCircle2, Lock, Eye, Scale, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Authenticity & Handloom Craft Origin Policy | LUMIÈRE India",
  description:
    "Official Product Authenticity Policy for LUMIÈRE luxury fashion. Discover our artisan sourcing standards, GI tag respect, Silk Mark transparency, white-glove inspection protocols, and anti-counterfeiting measures.",
  alternates: {
    canonical: "/authenticity",
  },
};

const tableOfContents = [
  { id: "craft-provenance", label: "1. Handloom Craft & Weaver Provenance" },
  { id: "gi-compliance", label: "2. Geographical Indication & Silk Mark" },
  { id: "streetwear-benchmarks", label: "3. Haute Tailoring & 450 GSM Streetwear" },
  { id: "white-glove-inspection", label: "4. Atelier White-Glove Inspection" },
  { id: "security-seals", label: "5. Anti-Tamper Security Seals & Tags" },
  { id: "affiliate-authenticity", label: "6. Authenticity of Curated Partner Items" },
  { id: "anti-counterfeit", label: "7. Zero-Tolerance Anti-Counterfeiting" },
  { id: "verification-concierge", label: "8. Authenticity Concierge Verification" },
];

export default function AuthenticityPage() {
  return (
    <LegalPageLayout
      title="Product Authenticity & Craft Origin"
      subtitle="Ensuring verified origin, master handloom provenance, and uncompromising material integrity."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="compliance"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Haute Indian Craftsmanship Guarantee</p>
        <p>
          At LUMIÈRE, authenticity is the bedrock of everything we create. We bridge the world of heritage Indian
          handloom traditions with contemporary architectural silhouettes. Every garment bearing our label undergoes
          rigorous provenance validation and white-glove physical quality inspection before it is delivered to our patrons.
        </p>
      </div>

      {/* Section 1 */}
      <section id="craft-provenance" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C59B48]" />
          <span>1. Handloom Craft & Master Weaver Provenance</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Our heritage collections are co-created directly in partnership with multi-generational weaver families and
          master artisan clusters across India. By bypassing exploitative intermediaries, we guarantee:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li><strong>Direct Artisan Remuneration:</strong> Fair, ethical, above-market wage compensation to master weavers.</li>
          <li><strong>Authentic Pit-Loom Weaving:</strong> True hand-woven textiles created without deceptive power-loom substitution.</li>
          <li><strong>Pure Raw Materials:</strong> High-grade natural mulberry silks, wild tussar silks, organic cottons, and genuine gold/silver electroplated zari threads.</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section id="gi-compliance" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#C59B48]" />
          <span>2. Geographical Indications (GI) & Silk Mark Certification</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE strictly adheres to the <strong>Geographical Indications of Goods (Registration and Protection) Act, 1999</strong>.
          We take pride in preserving the legal geographic identity of India's most celebrated heritage crafts:
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs text-noir-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-noir-900 block">Banarasi Kadhwa Zari & Brocades</strong>
              <span>Woven exclusively in certified artisan clusters within Varanasi and surrounding districts of Uttar Pradesh.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-[#f0f0f2]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-noir-900 block">Chanderi Weaves & Tissue Silks</strong>
              <span>Woven by authorized master handloom weavers in the historic town of Chanderi, Madhya Pradesh.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-[#f0f0f2]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-noir-900 block">Silk Mark Authentication</strong>
              <span>Pure silk garments include the official Silk Mark Organization of India (SMOI) verification label assuring 100% natural silk fiber purity.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="streetwear-benchmarks" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>3. Haute Tailoring & 450 GSM Streetwear Standards</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          For our contemporary and streetwear silhouettes (such as the <em>District Zero</em> collection):
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>We engineer our heavyweight garments with custom-knitted <strong>450 GSM French Terry</strong> and 280 GSM combed organic cotton.</li>
          <li>Every seam is reinforced with twin-needle chain stitching, pre-shrunk to prevent dimensional distortion, and dyed using eco-friendly, non-toxic reactive dyes.</li>
          <li>Hardware components—including custom zipper pulls, snap closures, and eyelets—are cast from premium nickel-free zinc alloy.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="white-glove-inspection" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#C59B48]" />
          <span>4. Atelier White-Glove Physical Inspection Protocol</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Before any garment leaves our central Mumbai fulfillment hub, it undergoes our signature 5-point physical inspection:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li><strong>Weave & Fiber Scrutiny:</strong> Micro-inspection of handloom wefts, silk luster, and absence of snags or fabric tears.</li>
          <li><strong>Pattern & Measurement Verification:</strong> Physical caliper verification against published dimensional tolerance charts.</li>
          <li><strong>Embroidery & Embellishment Check:</strong> Verification that all hand embroidery, zari motifs, and beadwork are securely knotted.</li>
          <li><strong>Hardware & Closure Testing:</strong> Testing all zippers, buttons, and clasps for fluid mechanical operation.</li>
          <li><strong>Security Barcoding:</strong> Affixing of serial-numbered security labels and tamper-evident void tape.</li>
        </ol>
      </section>

      {/* Section 5 */}
      <section id="security-seals" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#C59B48]" />
          <span>5. Anti-Tamper Security Seals & Tags</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Every direct LUMIÈRE garment is shipped with a tamper-evident <strong>LUMIÈRE Atelier Security Tag</strong>{" "}
          attached via an unbroken serial-coded ribbon. This tag certifies that the garment was inspected and approved by
          our Mumbai master tailors.
        </p>
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-sm text-xs text-amber-900">
          <p className="font-semibold mb-0.5">Crucial Return & Exchange Requirement:</p>
          <p>
            As detailed in our <Link href="/returns-policy" className="underline font-bold">Returns Policy</Link>, the security tag
            must remain completely intact, uncut, and untampered for any return or exchange request to be approved.
          </p>
        </div>
      </section>

      {/* Section 6 */}
      <section id="affiliate-authenticity" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#C59B48]" />
          <span>6. Authenticity of Curated Partner Affiliate Merchandise</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          For products curated from third-party luxury platforms (such as <em>Tata CLiQ Luxury</em>, <em>Ajio Luxe</em>, and{" "}
          <em>Myntra Luxe</em>):
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>LUMIÈRE only links to authorized, direct Indian distributors and luxury platforms with verifiable manufacturer agreements.</li>
          <li>Each external luxury item is backed by the respective partner store’s brand authorization warranty, import permits, and official brand certificates.</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section id="anti-counterfeit" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>7. Zero-Tolerance Anti-Counterfeiting Policy</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE maintains a zero-tolerance policy regarding counterfeit goods, stolen designs, and fraudulent merchandise.
          Any supplier, vendor, or contractor found attempting to supply replica fabrics, synthetic substitutes passed as pure
          silks, or unauthorized brand reproductions is immediately terminated and referred to Indian criminal law enforcement
          under the Indian Penal Code and the Trade Marks Act, 1999.
        </p>
      </section>

      {/* Section 8 */}
      <section id="verification-concierge" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#C59B48]" />
          <span>8. Patron Authenticity Verification Concierge</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          If you have questions regarding the weave provenance, yarn count, or craftsmanship technique of any garment in
          our collection, our Mumbai styling concierge is delighted to share artisan provenance documentation and weaver
          cluster details:
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm text-xs text-noir-700 space-y-1">
          <p><strong>Artisan Concierge:</strong> <a href="mailto:concierge@lumiere.in" className="text-[#C59B48] font-semibold underline">concierge@lumiere.in</a></p>
          <p><strong>Helpline:</strong> +91 22 4900 8800 (Monday–Saturday, 10:00 AM – 7:00 PM IST)</p>
          <p><strong>Atelier Visits:</strong> Private atelier viewings available in Mumbai by prior appointment.</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
