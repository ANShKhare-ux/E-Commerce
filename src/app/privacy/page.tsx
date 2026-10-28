import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'LUMIÈRE Privacy Policy detailing data collection, cookies, affiliate referral tracking, and user rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="border-b border-border pb-6 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono">
          Data Governance & Privacy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed font-light">
          Effective Date: October 28, 2026 • Platform: LUMIÈRE Fashion Discovery
        </p>
      </div>

      <div className="p-4 bg-[#F4F3EF] border-l-2 border-primary text-xs text-muted leading-relaxed">
        <strong>Review Note for Production Deployment:</strong> This policy accurately reflects the technical features implemented in the current codebase (Next.js server-rendered application, demonstration forms, newsletter opt-in, and outbound referral links). Before commercial deployment, have this document reviewed by qualified legal counsel in India according to the Information Technology Act, 2000 and Digital Personal Data Protection Act (DPDP Act), 2023.
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-muted leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            1. Information We Collect
          </h2>
          <p>
            LUMIÈRE is committed to data minimization. We do not require account registration or collect credit card information:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Voluntarily Provided Information:</strong> When you submit an inquiry through our Concierge form or subscribe to our Fashion Journal, we collect your name and email address.
            </li>
            <li>
              <strong>Technical Logs:</strong> Server access logs may record standard HTTP request data including IP address, user-agent, timestamp, and referring URL strictly for security monitoring and fraud prevention.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            2. Cookies and Tracking Technologies
          </h2>
          <p>
            We do not utilize invasive third-party cross-site trackers on this website. When you click an affiliate link to an external retailer (such as Myntra or Ajio), the destination retailer or their affiliate network may place an attribution cookie on your device according to their respective privacy terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            3. Third-Party Merchant Links
          </h2>
          <p>
            Our website contains outbound links to third-party merchant storefronts. Once you navigate away from LUMIÈRE to an external retailer, their privacy practices, terms of service, and cookie disclosures govern any data you share or purchases you complete. We encourage reviewing the privacy notices of each destination retailer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-normal text-primary">
            4. Data Retention & User Rights
          </h2>
          <p>
            Newsletter subscription records are retained until you request unsubscribing. You have the right to request access to or deletion of your email address from our communications registry at any time by contacting{' '}
            <a href="mailto:privacy@lumierefashion.in" className="text-primary underline">
              privacy@lumierefashion.in
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
