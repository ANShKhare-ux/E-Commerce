import React from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { Search, SlidersHorizontal, Sparkles, ArrowRight } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    sort?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
    category?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}" | LUMIÈRE India` : "Search Collection | LUMIÈRE India",
    description: `Explore artisanal Indian fashion matching "${q || "our collection"}" at LUMIÈRE.`,
  };
}

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";
  const sort = params.sort || "newest";
  const category = params.category;

  const products = query
    ? await db.products.getAll({
        search: query,
        category,
        sort,
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-canvas-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Catalog Search
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
            {query ? `Results for “${query}”` : "Search Our Collection"}
          </h1>
          <p className="text-xs text-noir-500 font-light mt-1">
            {products.length} {products.length === 1 ? "design" : "designs"} found matching your search.
          </p>
        </div>

        {/* Sort Controls */}
        {products.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-noir-500 font-medium">Sort By:</span>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { label: "Newest", value: "newest" },
                { label: "Price: Low to High", value: "price-asc" },
                { label: "Price: High to Low", value: "price-desc" },
                { label: "Customer Rating", value: "rating" },
              ].map((option) => (
                <Link
                  key={option.value}
                  href={`/search?${new URLSearchParams({
                    ...(query ? { q: query } : {}),
                    ...(category ? { category } : {}),
                    sort: option.value,
                  }).toString()}`}
                  className={`px-3 py-1 rounded-sm border transition-colors ${
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
        )}
      </div>

      {/* Results Grid or Empty State */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white border border-canvas-border rounded-sm space-y-4 max-w-xl mx-auto p-6">
          <div className="w-14 h-14 rounded-full bg-canvas-subtle text-noir-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6 text-gold-600" />
          </div>
          <h2 className="font-serif text-xl font-medium text-noir-900">
            {query ? `No matching designs found for “${query}”` : "Enter a search term to find apparel"}
          </h2>
          <p className="text-xs text-noir-500 leading-relaxed">
            Check your spelling or try broader keywords such as &ldquo;Chanderi&rdquo;, &ldquo;Silk&rdquo;, &ldquo;Oversized&rdquo;, or &ldquo;Streetwear&rdquo;.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {["Ethnic Wear", "Streetwear", "Men's Tailoring", "Women's Collection"].map((cat) => (
              <Link
                key={cat}
                href={`/products`}
                className="px-3 py-1.5 bg-canvas-subtle hover:bg-noir-900 hover:text-white border border-canvas-border text-xs text-noir-800 rounded-sm transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
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
