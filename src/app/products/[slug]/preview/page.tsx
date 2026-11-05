import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductPreviewClient } from "./ProductPreviewClient";
import type { Metadata } from "next";

interface ProductPreviewPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPreviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.products.getBySlug(slug);

  if (!product) {
    return { title: "Product Preview Not Found | LUMIÈRE" };
  }

  const primaryImage =
    product.images?.find((img) => img.is_primary)?.url ||
    product.images?.[0]?.url;

  return {
    title: `Full Preview: ${product.name} | LUMIÈRE Atelier`,
    description: `Inspect high-resolution visual previews, authoritative pricing, 7-day return policy, Delhivery logistics, and craft specifications for ${product.name}.`,
    alternates: {
      canonical: `/products/${product.slug}/preview`,
    },
    openGraph: {
      title: `${product.name} — Full High-Res Preview | LUMIÈRE`,
      description: product.description.slice(0, 160),
      images: primaryImage ? [{ url: primaryImage, alt: product.name }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Full Preview | LUMIÈRE`,
      description: product.description.slice(0, 160),
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

export default async function ProductPreviewPage({
  params,
}: ProductPreviewPageProps) {
  const { slug } = await params;
  const product = await db.products.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const primaryImage =
    product.images?.find((img) => img.is_primary)?.url ||
    product.images?.[0]?.url;
  const inStock =
    product.variants?.some(
      (v) => (v.inventory?.available_stock ?? 0) > 0
    ) ?? false;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: primaryImage,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.discount_price ?? product.base_price,
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "LUMIÈRE Atelier",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPreviewClient product={product} />
    </>
  );
}
