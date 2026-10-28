import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Affiliate disclosure and announcements"
      className="bg-[#141414] text-[#FAF9F6] text-xs py-2 px-4 border-b border-[#2A2A2A]"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
          <span className="font-light tracking-wide">
            Curated Fashion Affiliate Discovery • All Purchases Fulfilled Direct by Verified Retailers
          </span>
        </div>
        <div className="flex items-center gap-3 justify-center text-[11px] text-[#A8A49A]">
          <span>Prices in INR (₹)</span>
          <span className="hidden sm:inline" aria-hidden="true">•</span>
          <Link
            href="/affiliate-disclosure"
            className="hover:text-white transition-colors underline underline-offset-2 flex items-center gap-0.5"
          >
            Affiliate Disclosure
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
