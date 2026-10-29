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

  return <ProductDetailClient product={product} />;
}
