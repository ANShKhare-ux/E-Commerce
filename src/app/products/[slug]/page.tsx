import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/products';
import { getMerchantById } from '@/lib/merchants';
import { formatINR, calculateDiscount } from '@/lib/currency';
import { getOutboundRedirectPath } from '@/lib/affiliate';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AffiliateNotice } from '@/components/common/AffiliateNotice';
import {
  ExternalLink,
  ShieldCheck,
  Clock,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return {
    title: `${product.name} by ${product.brand}`,
    description: `${product.description.slice(0, 155)}... Curated from ${product.merchantId}. Verified price in INR: ${formatINR(product.currentPrice)}.`,
    openGraph: {
      title: `${product.name} | LUMIÈRE Fashion`,
      description: product.description,
      images: primaryImage ? [{ url: primaryImage.url, alt: primaryImage.alt }] : [],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const [merchant, related] = await Promise.all([
    getMerchantById(product.merchantId),
    getRelatedProducts(product, 4),
  ]);

  const discount = calculateDiscount(product.currentPrice, product.originalPrice);
  const outboundUrl = getOutboundRedirectPath(product.id);
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  // Verified timestamp formatted for readability
  const lastVerifiedDate = new Date(product.lastPriceVerifiedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Schema.org Product Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.currentPrice,
      // Note: Live inventory availability is governed solely by the retailer at checkout and is not fabricated here.
      url: `https://lumierefashion.in/products/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: merchant?.name || 'Verified Merchant',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.category.replace('-', ' '), href: `/categories/${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Visual Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* Right Column: Information, Pricing, & Outbound Action */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Metadata */}
          <div className="space-y-2 border-b border-border pb-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted">
              <span className="font-semibold text-primary">{product.brand}</span>
              <span className="text-[11px] text-muted">{product.audience}’s Wardrobe</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-light text-primary leading-snug">
              {product.name}
            </h1>

            {/* Merchant Tag */}
            {merchant && (
              <div className="pt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary bg-surface px-2.5 py-1 border border-border-subtle">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  Available at {merchant.name}
                </span>
                <span className="text-[11px] text-muted">{merchant.trustBadge}</span>
              </div>
            )}
          </div>

          {/* Pricing & Verification */}
          <div className="space-y-2 border-b border-border pb-6">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-light text-primary">
                {formatINR(product.currentPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {discount && (
                <span className="bg-[#141414] text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5">
                  Save {discount}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              <Clock className="w-3.5 h-3.5 text-muted/70" />
              <span>Price last verified: {lastVerifiedDate}</span>
            </div>
          </div>

          {/* Sizing & Color Specs */}
          <div className="space-y-4 border-b border-border pb-6">
            {/* Sizes */}
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-muted font-medium mb-2">
                Available Sizes (At Merchant)
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1.5 border border-border text-xs text-primary font-mono bg-surface"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-muted font-medium mb-2">
                Color Options
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 bg-[#F4F3EF] border border-border-subtle text-xs text-primary"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Material */}
            {product.material && (
              <div className="text-xs text-muted flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>
                  <strong className="text-primary font-medium">Composition:</strong> {product.material}
                </span>
              </div>
            )}
          </div>

          {/* Primary Affiliate Call To Action */}
          <div className="space-y-3 pt-2">
            <a
              href={outboundUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Shop Now at {merchant?.name || 'Retailer'}</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>

            {/* Retailer Purchasing Disclaimer */}
            <div className="p-3 bg-[#F4F3EF] border border-border-subtle text-[11px] text-muted space-y-1">
              <div className="flex items-center gap-1.5 text-primary font-medium">
                <Info className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Purchasing & Fulfillment Notice</span>
              </div>
              <p className="leading-relaxed">
                Clicking &ldquo;Shop Now&rdquo; opens the official storefront for {merchant?.name || 'the retailer'}. Final stock availability, applicable delivery fees, returns policy, and payment processing are managed entirely by the retailer.
              </p>
            </div>
          </div>

          {/* Description & Key Details */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">
                Curator’s Overview
              </h3>
              <p className="text-xs text-muted leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {product.details && product.details.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">
                  Key Specifications
                </h4>
                <ul className="space-y-1 text-xs text-muted list-disc list-inside">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Affiliate Notice Block */}
      <AffiliateNotice />

      {/* Related Products Showcase */}
      {related.length > 0 && (
        <section className="pt-12 border-t border-border space-y-6">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
                Complementary Pieces
              </span>
              <h2 className="font-serif text-2xl font-light text-primary mt-0.5">
                Complete The Silhouette
              </h2>
            </div>
            <Link
              href={`/categories/${product.category}`}
              className="text-xs uppercase tracking-widest font-medium text-primary hover:underline"
            >
              More in {product.category.replace('-', ' ')}
            </Link>
          </div>

          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
