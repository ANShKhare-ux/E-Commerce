import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { Award, ShieldCheck, FileText, Lock, AlertTriangle, Scale, Mail, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Intellectual Property & Copyright Policy | LUMIÈRE India",
  description:
    "Official Intellectual Property and Copyright Policy for LUMIÈRE luxury fashion. Review trademark protections, atelier design copyrights, prohibited commercial uses, and statutory takedown notice procedures.",
  alternates: {
    canonical: "/intellectual-property",
  },
};

const tableOfContents = [
  { id: "brand-trademarks", label: "1. Trademarks & Brand Monograms" },
  { id: "copyright-creations", label: "2. Copyright in Atelier Photography & Motifs" },
  { id: "platform-code", label: "3. Platform Architecture & Software" },
  { id: "permitted-use", label: "4. Permitted vs. Prohibited Exploitation" },
  { id: "gi-protection", label: "5. Respect for Geographical Indications" },
  { id: "infringement-notice", label: "6. Notice of Infringement & Takedown" },
  { id: "counter-notice", label: "7. Counter-Notification Procedure" },
  { id: "statutory-remedies", label: "8. Remedies Under Indian IP Laws" },
];

export default function IntellectualPropertyPage() {
  return (
    <LegalPageLayout
      title="Intellectual Property & Copyright Policy"
      subtitle="Safeguarding artisanal designs, brand trademarks, photographic assets, and proprietary digital architecture."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="legal"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Preserving Creative Originality</p>
        <p>
          Every silhouette, lookbook photograph, textile motif, and digital interface on LUMIÈRE is the product of
          extensive creative innovation, artisanal collaboration, and proprietary design. This policy outlines our
          intellectual property protections under the Indian Copyright Act, 1957, Trade Marks Act, 1999, and the
          Designs Act, 2000.
        </p>
      </div>

      {/* Section 1 */}
      <section id="brand-trademarks" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#C59B48]" />
          <span>1. Trademarks & Brand Monograms</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          The name <strong>LUMIÈRE</strong>, the stylized serif wordmark, the geometric diamond monogram, the phrase{" "}
          <em>"Atelier & Horlogerie"</em>, the label <em>"District Zero"</em>, and all associated artistic logos are the
          exclusive proprietary trademarks and trade dress of [LUMIÈRE Luxury Retail Private Limited].
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm text-xs text-noir-700 space-y-1.5">
          <p>
            Any unauthorized use, reproduction, imitation, or deceptive adoption of these marks in connection with any
            merchandise, marketing collateral, domain names, or social media handles constitutes statutory trademark
            infringement and common law passing off.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section id="copyright-creations" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#C59B48]" />
          <span>2. Copyright in Atelier Photography, Lookbooks & Motifs</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          All original works published on this website—including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>High-resolution lookbook and campaign photography, model imagery, and editorial video clips;</li>
          <li>Original garment sketches, technical flats, pattern grading specifications, and bespoke embroidery motifs;</li>
          <li>Editorial journalism, handloom historical essays, craft profiles, and styling guides;</li>
        </ul>
        <p className="text-xs text-noir-700 leading-relaxed">
          are protected under the <strong>Indian Copyright Act, 1957</strong>. LUMIÈRE holds exclusive worldwide copyright
          or legitimate licenses for all such creative materials.
        </p>
      </section>

      {/* Section 3 */}
      <section id="platform-code" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#C59B48]" />
          <span>3. Platform Architecture & Proprietary Software</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          The underlying software code, database architecture, user interface components, and custom algorithms
          (including our atomic 3-pool stock engine and 15-minute checkout reservation hold system) are proprietary
          intellectual assets. Decompilation, reverse engineering, unauthorized mirroring, or systematic scraping of
          our pricing APIs is strictly prohibited.
        </p>
      </section>

      {/* Section 4 */}
      <section id="permitted-use" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C59B48]" />
          <span>4. Permitted vs. Prohibited Exploitation</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-sm space-y-2">
            <strong className="text-emerald-900 font-serif block">Permitted Use:</strong>
            <ul className="list-disc pl-4 space-y-1 text-emerald-800">
              <li>Browsing and purchasing apparel for personal, non-commercial use.</li>
              <li>Sharing direct links to LUMIÈRE product pages on social media with appropriate brand attribution.</li>
              <li>Downloading single copies of tax invoices and size guides for personal records.</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-sm space-y-2">
            <strong className="text-rose-900 font-serif block">Prohibited Exploitation:</strong>
            <ul className="list-disc pl-4 space-y-1 text-rose-800">
              <li>Commercial re-hosting, scraping, or reselling of our product photography or descriptions.</li>
              <li>Manufacturing physical garments that copy registered LUMIÈRE proprietary silhouettes or embroidery motifs.</li>
              <li>Utilizing our photographic assets to train machine learning models without explicit written licensing.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section id="gi-protection" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#C59B48]" />
          <span>5. Respect for Geographical Indications (GI)</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE strictly upholds the <strong>Geographical Indications of Goods (Registration and Protection) Act, 1999</strong>.
          We only apply terms such as <em>Banarasi Brocade</em>, <em>Chanderi</em>, <em>Pashmina</em>, or <em>Kanchipuram Silk</em>{" "}
          to textiles authentically woven by registered weavers in certified geographical clusters. We condemn counterfeit
          power-loom reproductions falsely labelled as heritage handlooms.
        </p>
      </section>

      {/* Section 6 */}
      <section id="infringement-notice" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#C59B48]" />
          <span>6. Statutory Notice of Infringement & Takedown Protocol</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          If you are an intellectual property owner or authorized agent who believes that any material on our platform
          infringes your copyright or trademark, please deliver a formal Takedown Notice to our Designated IP Officer:
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs text-noir-700">
          <p className="font-semibold text-noir-900">Required notice elements:</p>
          <ul className="list-disc pl-5 space-y-1 text-noir-600">
            <li>Identification of the copyrighted work or trademark claimed to be infringed (including registration details).</li>
            <li>Direct URL link on LUMIÈRE where the infringing content appears.</li>
            <li>Your contact details: Name, physical address, telephone number, and official email.</li>
            <li>A statement of good-faith belief that the disputed use is not authorized by the owner, agent, or the law.</li>
            <li>Physical or electronic signature under declaration of perjury.</li>
          </ul>
          <div className="pt-2 text-noir-800">
            <p><strong>Designated IP & Grievance Officer:</strong> Legal Counsel, LUMIÈRE Fashions</p>
            <p><strong>Email:</strong> <a href="mailto:ip-takedown@lumiere.in" className="text-[#C59B48] underline font-semibold">ip-takedown@lumiere.in</a></p>
            <p><strong>Address:</strong> Royal Opera House District, Girgaon, Mumbai, Maharashtra 400004</p>
          </div>
        </div>
      </section>

      {/* Section 7 */}
      <section id="counter-notice" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#C59B48]" />
          <span>7. Counter-Notification Procedure</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Upon receiving a valid takedown notice, LUMIÈRE will expeditiously remove or disable access to the content within
          36 hours and notify the affected party. If the party believes the material was removed due to mistake or
          misidentification, a counter-notice may be submitted under Rule 3(2)(b) of the Information Technology (Intermediary
          Guidelines) Rules.
        </p>
      </section>

      {/* Section 8 */}
      <section id="statutory-remedies" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>8. Enforcement & Legal Remedies Under Indian Law</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          LUMIÈRE actively prosecutes willful intellectual property infringements. Violators will be subject to injunctive
          relief, statutory damages, and criminal prosecution under Sections 63 and 64 of the Indian Copyright Act, 1957,
          and Section 103 of the Trade Marks Act, 1999, before competent courts of jurisdiction in Mumbai, Maharashtra.
        </p>
      </section>
    </LegalPageLayout>
  );
}
