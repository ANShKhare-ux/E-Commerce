"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Star, ExternalLink, ShieldCheck } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
  const secondaryImage = product.images.find(img => !img.is_primary) || primaryImage;

  const currentPrice = product.discount_price ?? product.base_price;
  const originalPrice = product.discount_price ? product.base_price : undefined;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  // Compute total available stock across variants
  const totalStock = product.variants.reduce((acc, v) => {
    return acc + (v.inventory?.available_stock ?? 10);
  }, 0);

  const isLowStock = !product.is_affiliate && totalStock > 0 && totalStock <= 5;

  return (
    <div className="group relative flex flex-col bg-white border border-canvas-border rounded-sm overflow-hidden hover:shadow-card transition-all duration-300">
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas-subtle">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"}
            alt={primaryImage?.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.is_affiliate ? (
            <span className="bg-noir-900/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm backdrop-blur-sm flex items-center gap-1">
              <ExternalLink className="w-2.5 h-2.5 text-gold-400" />
              <span>{product.affiliate_source_name || "Partner Edit"}</span>
            </span>
          ) : (
            <span className="bg-canvas-light/95 text-noir-900 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm border border-canvas-border shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-gold-600" />
              <span>LUMIÈRE Direct</span>
            </span>
          )}

          {discountPercent > 0 && (
            <span className="bg-red-700 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm">
              {discountPercent}% OFF
            </span>
          )}

          {isLowStock && (
            <span className="bg-amber-600 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm animate-pulse">
              Only {totalStock} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-colors z-10 backdrop-blur-sm ${
            wishlisted
              ? "bg-rose-50 text-rose-600"
              : "bg-white/80 text-noir-700 hover:bg-white hover:text-rose-600"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-rose-600" : ""}`} />
        </button>

        {/* Quick Sizes Strip on Hover */}
        {!product.is_affiliate && (
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm py-2 px-3 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-t border-canvas-border">
            <span className="text-[10px] uppercase font-semibold text-noir-500 mr-1">Sizes:</span>
            {product.variants.map(v => (
              <span
                key={v.id}
                className="text-[10px] font-medium border border-noir-300 px-1.5 py-0.5 rounded text-noir-800"
              >
                {v.size}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 2. Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-noir-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-gold-600">
              {product.brand}
            </span>
            {product.rating > 0 && product.review_count > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-noir-700 font-medium">
                <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                <span>{product.rating}</span>
                <span className="text-noir-400 text-[10px]">({product.review_count})</span>
              </span>
            )}
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-sm font-medium text-noir-900 line-clamp-1 group-hover:text-gold-700 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-noir-500 line-clamp-1 mt-1 font-light">
            {product.origin}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-3 border-t border-canvas-subtle flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-base font-bold text-noir-900">
              ₹{currentPrice.toLocaleString("en-IN")}
            </span>
            {originalPrice && (
              <span className="text-xs text-noir-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {product.is_affiliate ? (
            <span className="text-[11px] font-semibold text-gold-700 flex items-center gap-1">
              <span>View Partner</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          ) : (
            <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-light px-2 py-0.5 rounded">
              Ready to Ship
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
