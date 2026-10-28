import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Info } from 'lucide-react';

interface AffiliateNoticeProps {
  className?: string;
  compact?: boolean;
}

export function AffiliateNotice({ className = '', compact = false }: AffiliateNoticeProps) {
  if (compact) {
    return (
      <div
        className={`flex items-center gap-1.5 text-[11px] text-muted bg-[#F4F3EF] px-3 py-2 border border-border-subtle ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
        <span>
          Purchases completed on authorized retailer site. We may earn an affiliate commission.{' '}
          <Link href="/affiliate-disclosure" className="underline hover:text-primary">
            Learn more
          </Link>
        </span>
      </div>
    );
  }

  return (
    <aside
      aria-label="Affiliate shopping notice"
      className={`bg-[#F4F3EF] border-l-2 border-accent p-4 text-xs text-muted ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-medium text-primary mb-0.5">
            Affiliate Discovery & Merchant Fulfillment
          </p>
          <p className="leading-relaxed">
            LUMIÈRE curates premium clothing from third-party retailers. Clicking &ldquo;Shop Now&rdquo; redirects you directly to the verified merchant (e.g. Myntra, Ajio, Tata CLiQ), where stock, size selection, and checkout occur. We may receive a referral commission at zero additional cost to you.{' '}
            <Link
              href="/affiliate-disclosure"
              className="text-primary font-medium underline underline-offset-2 hover:text-black"
            >
              Read our full disclosure.
            </Link>
          </p>
        </div>
      </div>
    </aside>
  );
}
