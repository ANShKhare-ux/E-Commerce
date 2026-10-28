import React from 'react';
import Link from 'next/link';
import { MERCHANTS } from '@/data/merchants';
import { ExternalLink } from 'lucide-react';

export function BrandsBar() {
  const merchantsList = Object.values(MERCHANTS);

  return (
    <section className="bg-surface border-y border-border-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
            Verified Retail Network
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-light text-primary mt-1">
            Featured Partner Destinations
          </h2>
          <p className="text-xs text-muted mt-2 leading-relaxed font-light">
            Every garment featured on LUMIÈRE links directly to authorized, authentic storefronts across India.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {merchantsList.map((m) => (
            <div
              key={m.id}
              className="p-4 bg-[#FAF9F6] border border-border-subtle flex flex-col justify-between items-center text-center hover:border-border transition-colors group"
            >
              <div className="my-auto py-2">
                <span className="font-serif text-sm font-semibold tracking-wider text-primary group-hover:text-black">
                  {m.name}
                </span>
                <span className="block text-[10px] text-muted tracking-widest uppercase mt-0.5">
                  {m.trustBadge}
                </span>
              </div>
              <Link
                href={`/shop?merchant=${m.id}`}
                className="mt-2 text-[10px] uppercase tracking-wider text-primary font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Curations</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
