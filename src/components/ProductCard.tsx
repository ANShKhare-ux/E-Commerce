"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { QuickViewModal } from "@/components/QuickViewModal";
import {
  Heart,
  Star,
  ExternalLink,
  ShieldCheck,
  Eye,
  Plus,
  Check,
  ShoppingBag,
  Flame,
  Sparkles
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem, setIsOpen } = useCart();
  const wishlisted = isInWishlist(product.id);

  // Quick View Modal State
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [addingVariantId, setAddingVariantId] = useState<string | null>(null);

  // Variant and Image selection
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(variants[0]);
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  const secondaryImage = product.images?.find((img) => !img.is_primary) || primaryImage;
  const [activeImage, setActiveImage] = useState<string>(primaryImage?.url || "");

  // Prices and Discounts
  const currentPrice = selectedVariant?.price ?? (product.discount_price ?? product.base_price);
  const originalPrice = selectedVariant?.compare_at_price ?? (product.discount_price ? product.base_price : undefined);
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  // Stock calculation
  const totalStock = variants.reduce((acc, v) => {
    return acc + (v.inventory?.available_stock ?? 10);
  }, 0);

  const isLowStock = !product.is_affiliate && totalStock > 0 && totalStock <= 4;
  const isAllOutOfStock = !product.is_affiliate && variants.length > 0 && totalStock <= 0;

  // Unique colors
  const uniqueColors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)));

  const handleColorSelect = (colorName: string) => {
    const matched = variants.find((v) => v.color === colorName);
    if (matched) {
      setSelectedVariant(matched);
      // Requirement 4: Selecting a color should update the displayed product image when variant images exist
      const variantImg =
        matched.image_url ||
        product.images?.find(
          (img) =>
            img.color?.toLowerCase() === colorName.toLowerCase() ||
            img.alt_text?.toLowerCase().includes(colorName.toLowerCase())
        )?.url;
      if (variantImg) {
        setActiveImage(variantImg);
      }
    }
  };

  const handleQuickAddSize = async (variant: ProductVariant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const stock = variant.inventory?.available_stock ?? 10;
    if (stock <= 0) return;

    setAddingVariantId(variant.id);
    const res = await addItem({
      variant_id: variant.id,
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      product_image: activeImage || primaryImage?.url || "",
      sku: variant.sku,
      color: variant.color,
      size: variant.size,
      unit_price: variant.price,
      quantity: 1,
    });

    setAddingVariantId(null);
    if (res.success) {
      setIsOpen(true);
      setQuickAddOpen(false);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col bg-white border border-canvas-border rounded-sm overflow-hidden hover:shadow-card transition-all duration-300">
        {/* 1. Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas-subtle">
          <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
            {/* Primary Image */}
            <Image
              src={activeImage || primaryImage?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out ${
                secondaryImage && secondaryImage.url !== activeImage
                  ? "group-hover:opacity-0 group-hover:scale-105"
                  : "group-hover:scale-105"
              }`}
            />

            {/* Secondary Image on Hover */}
            {secondaryImage && secondaryImage.url !== activeImage && (
              <Image
                src={secondaryImage.url}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
              />
            )}
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.is_affiliate ? (
              <span className="bg-noir-900/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm backdrop-blur-sm flex items-center gap-1">
                <ExternalLink className="w-2.5 h-2.5 text-gold-400" />
                <span>{product.affiliate_source_name || "Partner Edit"}</span>
              </span>
            ) : product.badge === "new" || product.is_new ? (
              <span className="bg-gold-600 text-noir-900 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5" />
                <span>New Arrival</span>
              </span>
            ) : product.badge === "bestseller" || product.is_bestseller ? (
              <span className="bg-noir-900 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-xs">
                <Flame className="w-2.5 h-2.5 text-gold-400" />
                <span>Bestseller</span>
              </span>
            ) : (
              <span className="bg-canvas-light/95 text-noir-900 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm border border-canvas-border shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-gold-600" />
                <span>LUMIÈRE</span>
              </span>
            )}

            {discountPercent > 0 && (
              <span className="bg-red-700 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-xs">
                {discountPercent}% OFF
              </span>
            )}

            {isLowStock && (
              <span className="bg-amber-600 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-xs animate-pulse">
                Only {totalStock} Left
              </span>
            )}

            {isAllOutOfStock && (
              <span className="bg-noir-800 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-xs">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-colors z-10 backdrop-blur-sm shadow-xs ${
              wishlisted
                ? "bg-rose-50 text-rose-600"
                : "bg-white/90 text-noir-700 hover:bg-white hover:text-rose-600"
            }`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-rose-600" : ""}`} />
          </button>

          {/* Quick Actions Strip (Appears on Hover) */}
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 border-t border-canvas-border z-10">
            {/* If Quick Add size selector is opened */}
            {quickAddOpen ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-noir-600 px-1">
                  <span>Select Size:</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickAddOpen(false);
                    }}
                    className="text-noir-400 hover:text-noir-800"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {variants.map((v) => {
                    const vStock = v.inventory?.available_stock ?? 10;
                    const vOut = vStock <= 0;
                    const isProcessing = addingVariantId === v.id;

                    return (
                      <button
                        key={v.id}
                        onClick={(e) => handleQuickAddSize(v, e)}
                        disabled={vOut || isProcessing}
                        className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors ${
                          vOut
                            ? "border-canvas-border text-noir-300 line-through cursor-not-allowed bg-canvas-subtle"
                            : "border-noir-900 bg-white text-noir-900 hover:bg-noir-900 hover:text-white"
                        }`}
                        title={vOut ? "Out of Stock" : `Add ${v.size} to bag`}
                      >
                        {isProcessing ? "..." : v.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                {/* Quick View Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickViewOpen(true);
                  }}
                  className="flex-1 py-1.5 px-2 bg-white hover:bg-noir-100 text-noir-800 text-[11px] font-bold uppercase tracking-wider border border-canvas-border rounded-sm transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quick View</span>
                </button>

                {/* Quick Add Button */}
                {!product.is_affiliate && variants.length > 0 && !isAllOutOfStock && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickAddOpen(true);
                    }}
                    className="flex-1 py-1.5 px-2 bg-noir-900 hover:bg-gold-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 2. Card Content */}
        <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
          <div className="space-y-1">
            {/* Color Swatches if multiple colors exist */}
            {uniqueColors.length > 1 && (
              <div className="flex items-center gap-1.5 mb-1.5">
                {uniqueColors.map((colorName) => {
                  const varColor = variants.find((v) => v.color === colorName);
                  const isSelected = selectedVariant?.color === colorName;
                  return (
                    <button
                      key={colorName}
                      onClick={() => handleColorSelect(colorName)}
                      className={`w-3.5 h-3.5 rounded-full border transition-all ${
                        isSelected ? "ring-1 ring-noir-900 scale-110" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: varColor?.color_hex || "#888" }}
                      title={colorName}
                      aria-label={`Select color ${colorName}`}
                    />
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-noir-500">
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

            <p className="text-[11px] text-noir-500 line-clamp-1 font-light">
              {product.origin}
            </p>
          </div>

          {/* Pricing & Availability Footer */}
          <div className="pt-2.5 border-t border-canvas-subtle flex items-baseline justify-between">
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
            ) : isAllOutOfStock ? (
              <span className="text-[10px] uppercase font-bold text-noir-400">
                Out of Stock
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-light px-2 py-0.5 rounded">
                Ready to Ship
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}

export default ProductCard;
