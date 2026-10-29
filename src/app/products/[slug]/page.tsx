import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.products.getBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | LUMIÈRE" };
  }

  const primaryImage = product.images.find((img) => img.is_primary)?.url || product.images[0]?.url;

  return {
    title: `${product.name} | LUMIÈRE India`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | LUMIÈRE Atelier`,
      description: product.description.slice(0, 160),
      images: primaryImage ? [{ url: primaryImage }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await db.products.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const primaryImage = product.images.find((img) => img.is_primary)?.url || product.images[0]?.url;
  const inStock = product.variants.some((v) => (v.inventory?.available_stock ?? 0) > 0);

  const related = (await db.products.getAll({ category: product.category_slug }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

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
      <ProductDetailClient product={product} relatedProducts={related} />
    </>
  );
}
