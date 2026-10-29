"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-canvas-border pb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
            Saved In Your Wishlist
          </h1>
          <p className="text-xs text-noir-500 font-light mt-1">
            {wishlist.length} {wishlist.length === 1 ? "design" : "designs"} reserved in your private wishlist.
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white border border-canvas-border rounded-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-xl font-medium text-noir-900">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-noir-500 max-w-sm mx-auto">
            Explore our collections and tap the heart icon on any design to bookmark it for later.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-noir-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-gold-600 transition-colors rounded-luxury"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
