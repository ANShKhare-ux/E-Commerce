import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { Eye, CheckCircle2, ShieldCheck, Mail, Keyboard, Sliders, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessibility Statement | WCAG 2.1 Level AA Standards | LUMIÈRE India",
  description:
    "Official Web Accessibility Statement for LUMIÈRE luxury fashion. Learn about our commitment to digital inclusivity, keyboard navigation, screen reader compatibility, and WCAG 2.1 Level AA benchmarks.",
  alternates: {
    canonical: "/accessibility",
  },
};

const tableOfContents = [
  { id: "accessibility-commitment", label: "1. Commitment to Digital Inclusivity" },
  { id: "wcag-standards", label: "2. Standards & Guidelines (WCAG 2.1 AA)" },
  { id: "key-features", label: "3. Accessible Features Implemented" },
  { id: "assistive-tech", label: "4. Assistive Technology Compatibility" },
  { id: "known-limitations", label: "5. Ongoing Areas of Refinement" },
  { id: "feedback-support", label: "6. Accessibility Assistance & Contact" },
];

export default function AccessibilityPage() {
  return (
    <LegalPageLayout
      title="Accessibility Statement"
      subtitle="Ensuring an inclusive, barrier-free luxury digital atelier experience for every patron."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="compliance"
      tableOfContents={tableOfContents}
    >
      {/* Overview Card */}
      <div className="bg-[#f5f5f3] border-l-2 border-[#C59B48] p-4 text-xs text-noir-700 leading-relaxed mb-6">
        <p className="font-semibold text-noir-900 mb-1">Inclusivity in Haute Couture</p>
        <p>
          LUMIÈRE believes that true luxury must be accessible to all. We are dedicated to ensuring that our digital storefront
          and online services are fully accessible to patrons with diverse abilities, including those who rely on screen
          readers, keyboard navigation, or assistive devices.
        </p>
      </div>

      {/* Section 1 */}
      <section id="accessibility-commitment" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#C59B48]" />
          <span>1. Commitment to Digital Inclusivity</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          In alignment with the Rights of Persons with Disabilities Act, 2016 (India) and global web accessibility standards,
          LUMIÈRE actively designs and tests its web application to conform to the World Wide Web Consortium’s (W3C)
          <strong> Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
        </p>
      </section>

      {/* Section 2 */}
      <section id="wcag-standards" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
          <span>2. Standards & Accessibility Principles</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          Our engineering framework adheres to the four fundamental pillars of WCAG accessibility:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-1">
            <strong className="text-noir-900 font-serif block">1. Perceivable</strong>
            <p className="text-noir-600">
              Information and user interface components are presented in ways patrons can perceive. High-contrast typography, descriptive alt text on luxury fashion imagery, and scalable viewports.
            </p>
          </div>
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-1">
            <strong className="text-noir-900 font-serif block">2. Operable</strong>
            <p className="text-noir-600">
              User interface components and navigation are operable entirely via keyboard without traps. Ample interactive target sizes (minimum 44x44 CSS pixels) for touch interfaces.
            </p>
          </div>
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-1">
            <strong className="text-noir-900 font-serif block">3. Understandable</strong>
            <p className="text-noir-600">
              Information and operations are intuitive and predictable. Consistent navigation patterns, unambiguous error states, and clear form instructions throughout cart and checkout.
            </p>
          </div>
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-1">
            <strong className="text-noir-900 font-serif block">4. Robust</strong>
            <p className="text-noir-600">
              Content is authored using semantic HTML5, enabling reliable interpretation by modern web browsers and assistive technologies across desktop and mobile.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="key-features" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-[#C59B48]" />
          <span>3. Key Features Implemented</span>
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-noir-700 leading-relaxed">
          <li>
            <strong>Full Keyboard Navigation:</strong> All interactive elements—including mega menus, cart flyouts, product galleries, size selectors, and checkout inputs—are navigable via standard Tab, Shift+Tab, Enter, and Escape keys.
          </li>
          <li>
            <strong>Text Contrast & Scalability:</strong> Our high-contrast atelier palette maintains a minimum contrast ratio of 4.5:1 for body copy and 3:1 for large display headlines against light backgrounds.
          </li>
          <li>
            <strong>Descriptive Alt Text:</strong> Lookbook imagery and garment swatches include detailed alternative text describing silhouettes, cuts, embroidery techniques, and colors for screen-reader users.
          </li>
          <li>
            <strong>Reduced Motion Support:</strong> We honor the <code>prefers-reduced-motion</code> operating system setting by automatically disabling or dampening non-essential parallax, hover, and slide transitions.
          </li>
          <li>
            <strong>Clear Form Labels & Validation:</strong> Checkout and inquiry forms utilize explicit <code>&lt;label&gt;</code> tags and ARIA error associations to announce validation status audibly.
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="assistive-tech" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#C59B48]" />
          <span>4. Assistive Technology Compatibility</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          The LUMIÈRE storefront is regularly audited against popular assistive technologies and screen readers, including:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-noir-600">
          <li>Apple VoiceOver on iOS and macOS</li>
          <li>NVDA (NonVisual Desktop Access) on Windows</li>
          <li>Google TalkBack on Android</li>
          <li>Built-in browser magnification up to 200% without horizontal scroll disruption</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section id="known-limitations" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#C59B48]" />
          <span>5. Ongoing Areas of Refinement</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          While we strive for comprehensive accessibility across all pages, certain third-party elements (such as external
          embedded payment aggregator iframe dialogs or partner affiliate redirect links) may occasionally present
          unintended keyboard traps or contrasting limits beyond our direct codebase control. We work continuously with our
          vendors to resolve these edge cases.
        </p>
      </section>

      {/* Section 6 */}
      <section id="feedback-support" className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-noir-900 flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#C59B48]" />
          <span>6. Dedicated Accessibility Assistance & Feedback</span>
        </h2>
        <p className="text-xs text-noir-700 leading-relaxed">
          If you encounter any difficulty navigating our platform or require assistance with size selection, order placement,
          or policy documentation, our concierge team is on hand to assist you directly:
        </p>
        <div className="bg-white border border-[#eaeaec] p-4 rounded-sm text-xs text-noir-700 space-y-1">
          <p><strong>Dedicated Accessibility Desk:</strong> <a href="mailto:accessibility@lumiere.in" className="text-[#C59B48] font-semibold underline">accessibility@lumiere.in</a></p>
          <p><strong>Direct Helpline:</strong> +91 22 4900 8800 (Mon–Sat, 10:00 AM – 7:00 PM IST)</p>
          <p><strong>Assisted Checkout:</strong> Our styling team can initiate a customized telephone-assisted order for patrons requiring hands-on navigation guidance.</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
