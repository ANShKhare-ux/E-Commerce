import React from "react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { Filter, SlidersHorizontal } from "lucide-react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
    search?: string;
    deal?: string;
    affiliate?: string;
  }>;
}

export default async function ProductsCatalogPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category;
  const sort = params.sort || "newest";
  const search = params.search;
  const isDeal = params.deal === "true" ? true : undefined;
  const isAffiliate = params.affiliate === "true" ? true : params.affiliate === "false" ? false : undefined;

  const products = await db.products.getAll({
    category,
    sort,
    search,
    isDeal,
    isAffiliate,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. Header */}
      <div className="border-b border-canvas-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            LUMIÈRE Atelier & Curations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
            {search ? `Search results for "${search}"` : category ? category.replace(/-/g, " ").toUpperCase() : "The Complete Atelier"}
          </h1>
          <p className="text-xs text-noir-500 font-light mt-1">
            Displaying {products.length} {products.length === 1 ? "design" : "designs"} crafted or curated for India.
          </p>
        </div>

        {/* Filter / Sort Bar */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-noir-600 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort By:</span>
          </div>
          <div className="flex gap-2">
            {[
              { label: "Newest", value: "newest" },
              { label: "Price: Low to High", value: "price-asc" },
              { label: "Price: High to Low", value: "price-desc" },
              { label: "Customer Rating", value: "rating" },
            ].map((option) => (
              <Link
                key={option.value}
                href={`/products?${new URLSearchParams({
                  ...(category ? { category } : {}),
                  ...(search ? { search } : {}),
                  sort: option.value,
                }).toString()}`}
                className={`px-3 py-1.5 rounded-sm border transition-colors ${
                  sort === option.value
                    ? "bg-noir-900 text-white border-noir-900 font-semibold"
                    : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Filter Pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        <Link
          href="/products"
          className={`px-3.5 py-1.5 rounded-sm border transition-colors ${
            !category && isAffiliate === undefined && !isDeal
              ? "bg-noir-900 text-white border-noir-900 font-bold"
              : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
          }`}
        >
          All Designs
        </Link>
        <Link
          href="/category/ethnic-wear"
          className={`px-3.5 py-1.5 rounded-sm border transition-colors ${
            category === "ethnic-wear"
              ? "bg-noir-900 text-white border-noir-900 font-bold"
              : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
          }`}
        >
          Ethnic Wear
        </Link>
        <Link
          href="/category/womens-clothing"
          className={`px-3.5 py-1.5 rounded-sm border transition-colors ${
            category === "womens-clothing"
              ? "bg-noir-900 text-white border-noir-900 font-bold"
              : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
          }`}
        >
          Women's Clothing
        </Link>
        <Link
          href="/category/mens-clothing"
          className={`px-3.5 py-1.5 rounded-sm border transition-colors ${
            category === "mens-clothing"
              ? "bg-noir-900 text-white border-noir-900 font-bold"
              : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
          }`}
        >
          Men's Clothing
        </Link>
        <Link
          href="/category/streetwear"
          className={`px-3.5 py-1.5 rounded-sm border transition-colors ${
            category === "streetwear"
              ? "bg-noir-900 text-white border-noir-900 font-bold"
              : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
          }`}
        >
          District Zero Streetwear
        </Link>
        <Link
          href="/category/premium-luxury"
          className={`px-3.5 py-1.5 rounded-sm border transition-colors ${
            category === "premium-luxury"
              ? "bg-noir-900 text-white border-noir-900 font-bold"
              : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
          }`}
        >
          Haute Luxury
        </Link>
        <Link
          href="/products?affiliate=true"
          className={`px-3.5 py-1.5 rounded-sm border transition-colors ${
            isAffiliate === true
              ? "bg-gold-600 text-noir-900 border-gold-600 font-bold"
              : "bg-white text-gold-700 border-gold-300 hover:border-gold-600"
          }`}
        >
          Partner Curations Only
        </Link>
        <Link
          href="/deals"
          className={`px-3.5 py-1.5 rounded-sm border transition-colors ${
            isDeal
              ? "bg-red-700 text-white border-red-700 font-bold"
              : "bg-white text-red-700 border-red-200 hover:border-red-700"
          }`}
        >
          Archived Deals
        </Link>
      </div>

      {/* 3. Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-24 bg-white border border-canvas-border rounded-sm">
          <Filter className="w-10 h-10 text-noir-400 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-medium text-noir-900">
            No matching designs found
          </h3>
          <p className="text-xs text-noir-500 max-w-sm mx-auto mt-1 mb-6">
            We couldn't find any items matching your selected criteria. Try adjusting your filters or search terms.
          </p>
          <Link
            href="/products"
            className="bg-noir-900 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-gold-600 transition-colors"
          >
            Clear All Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
