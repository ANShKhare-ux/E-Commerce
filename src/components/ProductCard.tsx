"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Product, ProductVariant } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { QuickViewModal } from "@/components/QuickViewModal";
import { LUXURY_EASE } from "@/lib/motion";
import {
  Heart,
  Star,
  ExternalLink,
  ShieldCheck,
  Eye,
  Plus,
  Check,
  Flame,
  Sparkles,
  Loader2,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export function ProductCard({ product, index = 0, className = "" }: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem, setIsOpen } = useCart();
  const wishlisted = isInWishlist(product.id);

  // Quick View Modal & Quick Add States
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [addingVariantId, setAddingVariantId] = useState<string | null>(null);
  const [addedVariantId, setAddedVariantId] = useState<string | null>(null);
  const [isWishlistBouncing, setIsWishlistBouncing] = useState(false);

  // Variant and Image selection
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(variants[0]);
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  const [activeImage, setActiveImage] = useState<string>(primaryImage?.url || "");
  const secondaryImage =
    product.images?.find((img) => !img.is_primary && img.url !== activeImage) ||
    (activeImage !== primaryImage?.url ? primaryImage : undefined);

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

  const handleColorSelect = (colorName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const matched = variants.find((v) => v.color === colorName);
    if (matched) {
      setSelectedVariant(matched);
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

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlistBouncing(true);
    toggleWishlist(product);
    setTimeout(() => setIsWishlistBouncing(false), 450);
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
      setAddedVariantId(variant.id);
      setTimeout(() => {
        setAddedVariantId(null);
        setIsOpen(true);
        setQuickAddOpen(false);
      }, 400);
    }
  };

  return (
    <>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={shouldReduceMotion ? undefined : {
          y: -6,
          transition: { duration: 0.25, ease: LUXURY_EASE },
        }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.5,
          ease: LUXURY_EASE,
          delay: shouldReduceMotion ? 0 : Math.min((index % 4) * 0.07, 0.25),
        }}
        className={`group relative flex flex-col bg-white border border-canvas-border/80 rounded-sm overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-gold-500/40 hover:shadow-[0_16px_36px_rgba(13,13,13,0.08)] ${className}`}
      >
        {/* 1. Image Presentation Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas-subtle">
          <Link
            href={`/products/${product.slug}`}
            className="block w-full h-full relative focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            aria-label={`View details of ${product.name}`}
          >
            {/* Primary Image */}
            <Image
              src={activeImage || primaryImage?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover object-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            )}

            {/* Subtle Vignette Gradient for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-60 pointer-events-none" />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.is_affiliate ? (
              <span className="bg-noir-900/90 text-white text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-xs backdrop-blur-sm flex items-center gap-1 shadow-xs border border-white/10">
                <ExternalLink className="w-2.5 h-2.5 text-gold-400" />
                <span>{product.affiliate_source_name || "Partner Edit"}</span>
              </span>
            ) : product.badge === "new" || product.is_new ? (
              <span className="bg-gold-500 text-noir-900 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-xs flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5" />
                <span>New Arrival</span>
              </span>
            ) : product.badge === "bestseller" || product.is_bestseller ? (
              <span className="bg-noir-900/95 text-white text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-xs flex items-center gap-1 shadow-xs border border-gold-500/30">
                <Flame className="w-2.5 h-2.5 text-gold-400" />
                <span>Bestseller</span>
              </span>
            ) : (
              <span className="bg-white/95 text-noir-900 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-xs border border-canvas-border shadow-xs flex items-center gap-1 backdrop-blur-xs">
                <ShieldCheck className="w-3 h-3 text-gold-600" />
                <span>LUMIÈRE</span>
              </span>
            )}

            {discountPercent > 0 && (
              <span className="bg-red-700/95 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-xs shadow-xs">
                {`${discountPercent}% OFF`}
              </span>
            )}

            {isLowStock && (
              <span className="bg-amber-600/95 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-xs shadow-xs animate-pulse">
                Only {totalStock} Left
              </span>
            )}

            {isAllOutOfStock && (
              <span className="bg-noir-800/95 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-xs shadow-xs">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist Button with Micro-Pulse Animation */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 backdrop-blur-md shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
              wishlisted
                ? "bg-rose-50 text-rose-600 border border-rose-200 scale-100"
                : "bg-white/90 text-noir-700 border border-canvas-border/80 hover:bg-white hover:text-rose-600 hover:border-noir-900 hover:scale-105 active:scale-95"
            } ${isWishlistBouncing ? "animate-heartbeat" : ""}`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                wishlisted ? "fill-rose-600 text-rose-600 scale-110" : ""
              }`}
            />
          </button>

          {/* Quick Actions Strip (Slides Up Gracefully on Hover and Focus-Within) */}
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-300 ease-out border-t border-canvas-border/80 z-10">
            {/* If Quick Add size selector is opened */}
            <AnimatePresence mode="wait">
              {quickAddOpen ? (
                <motion.div
                  key="size-selector"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-noir-600 px-1">
                    <span>Select Size:</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setQuickAddOpen(false);
                      }}
                      className="text-noir-400 hover:text-noir-900 p-0.5 rounded transition-colors"
                      aria-label="Close size selector"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {variants.map((v) => {
                      const vStock = v.inventory?.available_stock ?? 10;
                      const vOut = vStock <= 0;
                      const isProcessing = addingVariantId === v.id;
                      const isSuccess = addedVariantId === v.id;

                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={(e) => handleQuickAddSize(v, e)}
                          disabled={vOut || isProcessing}
                          className={`text-[10px] font-bold px-2 py-1 rounded border transition-all duration-150 active:scale-95 flex items-center justify-center min-w-[28px] ${
                            isSuccess
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : vOut
                              ? "border-canvas-border text-noir-300 line-through cursor-not-allowed bg-canvas-subtle"
                              : "border-noir-900 bg-white text-noir-900 hover:bg-noir-900 hover:text-white"
                          }`}
                          title={vOut ? "Out of Stock" : `Add size ${v.size} to bag`}
                        >
                          {isProcessing ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : isSuccess ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            v.size
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <div key="action-buttons" className="flex items-center gap-1.5">
                  {/* Quick View Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickViewOpen(true);
                    }}
                    className="flex-1 py-1.5 px-2 bg-white hover:bg-canvas-subtle active:scale-95 text-noir-800 text-[10px] font-bold uppercase tracking-wider border border-canvas-border rounded-xs transition-all duration-150 flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Eye className="w-3 h-3 text-gold-600" />
                    <span>Quick View</span>
                  </button>

                  {/* Quick Add Button */}
                  {!product.is_affiliate && variants.length > 0 && !isAllOutOfStock && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setQuickAddOpen(true);
                      }}
                      className="flex-1 py-1.5 px-2 bg-noir-900 hover:bg-gold-600 active:scale-95 text-white hover:text-noir-900 text-[10px] font-bold uppercase tracking-wider rounded-xs transition-all duration-150 flex items-center justify-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Quick Add</span>
                    </button>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 2. Card Content & Typography */}
        <div className="p-4 flex flex-col flex-1 justify-between space-y-3 bg-white">
          <div className="space-y-1.5">
            {/* Color Swatches */}
            {uniqueColors.length > 1 && (
              <div className="flex items-center gap-1.5 mb-1.5">
                {uniqueColors.map((colorName) => {
                  const varColor = variants.find((v) => v.color === colorName);
                  const isSelected = selectedVariant?.color === colorName;
                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={(e) => handleColorSelect(colorName, e)}
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                        isSelected
                          ? "ring-2 ring-noir-900 ring-offset-1 scale-110 shadow-xs"
                          : "hover:scale-110 opacity-75 hover:opacity-100"
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
              <span className="font-semibold uppercase tracking-[0.2em] text-[10px] text-gold-600">
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

            <Link href={`/products/${product.slug}`} className="block focus:outline-none focus-visible:underline">
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
                {`₹${currentPrice.toLocaleString("en-IN")}`}
              </span>
              {originalPrice && (
                <span className="text-xs text-noir-400 line-through">
                  {`₹${originalPrice.toLocaleString("en-IN")}`}
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
              <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-light px-2 py-0.5 rounded-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                <span>Ready to Ship</span>
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Conditionally Render Quick View Modal with AnimatePresence */}
      <AnimatePresence>
        {quickViewOpen && (
          <QuickViewModal
            key={`quickview-${product.id}`}
            product={product}
            isOpen={quickViewOpen}
            onClose={() => setQuickViewOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductCard;
