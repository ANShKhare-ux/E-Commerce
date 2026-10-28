import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Product } from '@/types/product';
import { formatINR, calculateDiscount } from '@/lib/currency';
import { getOutboundRedirectPath } from '@/lib/affiliate';
import { ImageFallback } from './ImageFallback';
import { MERCHANTS } from '@/data/merchants';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const merchant = MERCHANTS[product.merchantId];
  const discount = calculateDiscount(product.currentPrice, product.originalPrice);
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const outboundUrl = getOutboundRedirectPath(product.id);

  return (
    <article className="group bg-surface border border-border-subtle hover:border-border transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] bg-[#F4F3EF] overflow-hidden">
        <Link
          href={`/products/${product.slug}`}
          className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          tabIndex={-1}
          aria-hidden="true"
        >
          <ImageFallback
            src={primaryImage?.url || ''}
            alt={primaryImage?.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {discount && (
            <span className="bg-[#141414] text-[#FAF9F6] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 shadow-sm">
              {discount}% OFF
            </span>
          )}
          {product.under999 && (
            <span className="bg-accent text-white text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 shadow-sm">
              Under ₹999
            </span>
          )}
        </div>

        {/* Merchant Retailer Badge */}
        {merchant && (
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <span className="bg-surface/90 backdrop-blur-sm text-primary text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 border border-border-subtle shadow-xs">
              {merchant.name}
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Audience */}
          <div className="flex items-center justify-between text-[11px] text-muted uppercase tracking-[0.15em] mb-1">
            <span className="font-semibold text-primary">{product.brand}</span>
            <span className="text-[10px] text-muted/80">{product.audience}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-sm font-normal text-primary line-clamp-2 leading-snug group-hover:text-black transition-colors">
            <Link
              href={`/products/${product.slug}`}
              className="focus:outline-none focus-visible:underline"
            >
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Pricing & Outbound Affiliate Action */}
        <div className="pt-2 border-t border-border-subtle/80 flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-primary">
              {formatINR(product.currentPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Details Link */}
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 text-center py-2 px-2 text-[11px] uppercase tracking-wider font-medium border border-border hover:border-primary text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Details
            </Link>

            {/* Outbound Affiliate CTA */}
            <a
              href={outboundUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 py-2 px-2 text-[11px] uppercase tracking-wider font-medium bg-primary text-white hover:bg-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Shop ${product.name} at ${merchant?.name || 'merchant'} (opens in new tab)`}
            >
              <span>Shop Now</span>
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
