import React from "react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CollectionFilters } from "@/components/CollectionFilters";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Complete Atelier & Curations | LUMIÈRE India",
  description: "Browse luxury Indian handlooms, 450 GSM streetwear drops, and verified external affiliate discoveries.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    gender?: "men" | "women" | "unisex";
    style?: string;
    size?: string;
    sort?: "featured" | "price-asc" | "price-desc" | "rating" | "newest" | "discount";
    search?: string;
    deal?: string;
    discount?: string;
    inStock?: string;
    affiliate?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ProductsCatalogPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category;
  const gender = params.gender;
  const style = params.style;
  const size = params.size;
  const sort = params.sort || "newest";
  const search = params.search;
  const isDeal = params.deal === "true" || params.discount === "true" ? true : undefined;
  const inStock = params.inStock === "true" ? true : undefined;
  const isAffiliate = params.affiliate === "true" ? true : params.affiliate === "false" ? false : undefined;
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined;

  const products = await db.products.getAll({
    category,
    gender,
    style,
    size,
    sort,
    search,
    isDeal,
    inStock,
    isAffiliate,
    minPrice,
    maxPrice,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-canvas-border pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          LUMIÈRE Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          {search
            ? `Search: “${search}”`
            : category
            ? category.replace(/-/g, " ").toUpperCase()
            : gender
            ? `${gender.toUpperCase()}'S ATELIER`
            : "The Complete Atelier"}
        </h1>
        <p className="text-xs text-noir-500 font-light mt-1 max-w-2xl">
          Indigenous Indian handloom craftsmanship, heavyweight streetwear drops, and verified external fashion discoveries.
        </p>
      </div>

      {/* Main Filter & Grid Layout */}
      <CollectionFilters totalCount={products.length}>
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-canvas-border rounded-sm space-y-4 p-8">
            <Sparkles className="w-8 h-8 text-gold-600 mx-auto" />
            <h3 className="font-serif text-xl font-medium text-noir-900">
              No designs match your active filter criteria
            </h3>
            <p className="text-xs text-noir-500 max-w-md mx-auto leading-relaxed">
              We never display artificial inventory cards. Try removing one or more active filters or explore our complete catalog.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 bg-noir-900 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-gold-600 transition-colors"
              >
                <span>Reset All Filters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </CollectionFilters>
    </div>
  );
}
