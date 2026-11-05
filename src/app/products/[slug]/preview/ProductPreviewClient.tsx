"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { SafeImage as Image } from "@/components/SafeImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PincodeChecker } from "@/components/PincodeChecker";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LUXURY_EASE, useSafeReducedMotion } from "@/lib/motion";
import {
  Heart,
  Star,
  ShieldCheck,
  Check,
  Ruler,
  AlertCircle,
  ShoppingBag,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  X,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  ArrowLeft,
  Loader2,
  ExternalLink,
  Layers,
} from "lucide-react";

interface ProductPreviewClientProps {
  product: Product;
}

export function ProductPreviewClient({ product }: ProductPreviewClientProps) {
  const shouldReduceMotion = useSafeReducedMotion();
  const { addItem, setIsOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const variants = useMemo(() => product.variants || [], [product.variants]);
  const images = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [
      {
        id: "default-img",
        product_id: product.id,
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
        alt_text: product.name,
        display_order: 1,
        is_primary: true,
      },
    ];
  }, [product.images, product.id, product.name]);

  const initialPrimaryIndex = useMemo(() => {
    const idx = images.findIndex((img) => img.is_primary);
    return idx >= 0 ? idx : 0;
  }, [images]);

  const initialVariant = useMemo(() => {
    if (!variants || variants.length === 0) return undefined;
    const primImg = images.find((i) => i.is_primary);
    if (primImg?.color) {
      const matched = variants.find(
        (v) => v.color.toLowerCase() === primImg.color!.toLowerCase()
      );
      if (matched) return matched;
    }
    return variants[0];
  }, [variants, images]);

  const [activeImageIndex, setActiveImageIndex] = useState(initialPrimaryIndex);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(initialVariant);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Gallery zoom & fullscreen state
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isWishlistBouncing, setIsWishlistBouncing] = useState(false);

  const currentImage = images[activeImageIndex] || images[0];
  const wishlisted = isInWishlist(product.id);

  const availableStock = useMemo(
    () => selectedVariant?.inventory?.available_stock ?? 10,
    [selectedVariant]
  );
  const isOutOfStock = availableStock <= 0;

  const currentPrice = useMemo(
    () => selectedVariant?.price ?? product.discount_price ?? product.base_price,
    [selectedVariant?.price, product.discount_price, product.base_price]
  );
  const originalPrice = useMemo(
    () =>
      selectedVariant?.compare_at_price ??
      (product.discount_price ? product.base_price : undefined),
    [selectedVariant?.compare_at_price, product.discount_price, product.base_price]
  );
  const discountPercent = useMemo(
    () =>
      originalPrice && originalPrice > currentPrice
        ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
        : 0,
    [originalPrice, currentPrice]
  );

  // Keyboard navigation for photo carousel and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Escape") {
        if (isLightboxOpen) setIsLightboxOpen(false);
        if (isZoomed) setIsZoomed(false);
      } else if (e.key === "f" || e.key === "F") {
        // Toggle lightbox if active element is not an input
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          setIsLightboxOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, isLightboxOpen, isZoomed]);

  const rafRef = useRef<number | null>(null);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    },
    [isZoomed]
  );

  const handleToggleWishlist = useCallback(() => {
    setIsWishlistBouncing(true);
    toggleWishlist(product);
    setTimeout(() => setIsWishlistBouncing(false), 450);
  }, [toggleWishlist, product]);

  const handleAddToCart = useCallback(
    async (goToCheckout = false) => {
      setAddError(null);
      if (!selectedVariant) {
        setAddError("Please select a size.");
        return;
      }

      if (isOutOfStock) {
        setAddError("Selected size is currently out of stock.");
        return;
      }

      setIsAdding(true);
      const result = await addItem({
        variant_id: selectedVariant.id,
        product_id: product.id,
        product_name: product.name,
        product_slug: product.slug,
        product_image: currentImage.url,
        sku: selectedVariant.sku,
        color: selectedVariant.color,
        size: selectedVariant.size,
        unit_price: selectedVariant.price,
        quantity,
      });

      setIsAdding(false);

      if (!result.success) {
        setAddError(result.error || "Failed to add to bag.");
      } else {
        setAddSuccess(true);
        setTimeout(() => setAddSuccess(false), 1800);
        if (goToCheckout) {
          window.location.href = "/checkout";
        } else {
          setIsOpen(true);
        }
      }
    },
    [selectedVariant, isOutOfStock, addItem, product, currentImage.url, quantity, setIsOpen]
  );

  const prevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  return (
    <div className="bg-canvas min-h-screen">
      {/* 1. Haute-Couture Top Navigation & Breadcrumbs */}
      <div className="border-b border-canvas-border bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-noir-700 hover:text-gold-700 transition-colors bg-canvas-subtle hover:bg-canvas-border/50 px-3 py-1.5 rounded-sm border border-canvas-border"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Product</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-xs text-noir-400">
              <span>/</span>
              <span className="uppercase text-[11px] font-medium tracking-wider text-noir-600">
                {product.category_slug.replace(/-/g, " ")}
              </span>
              <span>/</span>
              <span className="text-noir-900 font-medium truncate max-w-xs">
                {product.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-50 border border-gold-200 px-2.5 py-1 rounded-sm">
              <Sparkles className="w-3 h-3" />
              <span>Full Preview Mode</span>
            </span>

            <button
              type="button"
              onClick={handleToggleWishlist}
              className={`p-2 rounded-sm border transition-all ${
                wishlisted
                  ? "bg-rose-50 text-rose-600 border-rose-200"
                  : "border-canvas-border text-noir-600 hover:text-rose-600 hover:bg-white"
              } ${isWishlistBouncing ? "animate-heartbeat" : ""}`}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  wishlisted ? "fill-rose-600 text-rose-600 scale-110" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Studio Canvas (Split Screen Gallery + Sticky Inspection Column) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Full-Scale High-Resolution Visual Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main High-Res Viewer */}
            <div className="relative aspect-[3/4] w-full bg-canvas-subtle rounded-sm overflow-hidden border border-canvas-border group shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.url}
                  initial={{ opacity: 0.3, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.3, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: LUXURY_EASE }}
                  className={`w-full h-full relative ${
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => isZoomed && setIsZoomed(false)}
                >
                  <Image
                    src={currentImage.url}
                    alt={currentImage.alt_text || product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    style={{
                      transformOrigin: isZoomed
                        ? `${mousePos.x}% ${mousePos.y}%`
                        : "center center",
                    }}
                    className={`object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isZoomed ? "scale-175" : "scale-100 group-hover:scale-102"
                    }`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Photo Counter Pill */}
              <div className="absolute top-4 left-4 bg-noir-900/85 text-white backdrop-blur-md px-3 py-1.5 rounded text-[11px] font-medium tracking-wide flex items-center gap-2 shadow-sm border border-white/10">
                <Layers className="w-3.5 h-3.5 text-gold-400" />
                <span>
                  {`Photograph ${activeImageIndex + 1} of ${images.length}`}
                </span>
                {currentImage.is_primary && (
                  <span className="bg-gold-600 text-noir-900 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ml-1">
                    Primary
                  </span>
                )}
              </div>

              {/* Lightbox / Zoom Action Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="bg-white/90 hover:bg-white text-noir-800 p-2 rounded shadow-md border border-canvas-border text-xs flex items-center gap-1 transition-all"
                  title={isZoomed ? "Reset zoom" : "Magnify photo"}
                >
                  {isZoomed ? (
                    <ZoomOut className="w-4 h-4 text-gold-700" />
                  ) : (
                    <ZoomIn className="w-4 h-4 text-gold-700" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="bg-noir-900/90 hover:bg-noir-900 text-white p-2 rounded shadow-md border border-white/20 text-xs flex items-center gap-1 transition-all"
                  title="Expand to Fullscreen Lightbox"
                  aria-label="Expand photo to fullscreen"
                >
                  <Maximize2 className="w-4 h-4 text-gold-400" />
                </button>
              </div>

              {/* Previous / Next Overlay Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-noir-900 flex items-center justify-center shadow-md border border-canvas-border opacity-70 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-noir-900 flex items-center justify-center shadow-md border border-canvas-border opacity-70 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Alt Text Overlay Pill */}
              {currentImage.alt_text && (
                <div className="absolute bottom-3 inset-x-3 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded text-[11px] text-noir-700 border border-canvas-border text-center truncate">
                  {currentImage.alt_text}
                </div>
              )}
            </div>

            {/* Thumbnail Strip with Active Selection */}
            {images.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-noir-500">
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    All Visual Angles & Swatches
                  </span>
                  <span className="text-[10px]">Use [←] and [→] keys to navigate</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[3/4] rounded-sm overflow-hidden border transition-all duration-200 ${
                        activeImageIndex === idx
                          ? "border-noir-900 ring-2 ring-gold-500 ring-offset-2 scale-102 shadow-sm"
                          : "border-canvas-border opacity-70 hover:opacity-100 hover:border-noir-400"
                      }`}
                      aria-label={`View photograph ${idx + 1}`}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt_text || `Thumbnail ${idx + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                      {img.is_primary && (
                        <div className="absolute top-1 left-1 bg-gold-600 text-noir-900 text-[8px] font-bold uppercase px-1 rounded shadow-xs">
                          ★
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Commercials, Return Policy & Logistics (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Titles & Brand */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-700 block mb-1">
                {product.brand}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium leading-snug">
                {product.name}
              </h1>

              {/* Rating & Review Counter */}
              {product.rating > 0 && (
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex items-center text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-gold-400 text-gold-400"
                            : "text-noir-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-noir-800">{product.rating}</span>
                  <span className="text-noir-400">
                    ({product.review_count} verified client reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Authoritative Pricing Display */}
            <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-noir-500 block">
                Authoritative Atelier Pricing
              </span>

              <div className="flex items-baseline gap-3">
                <span className="font-sans text-3xl font-bold text-noir-900">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
                {originalPrice && originalPrice > currentPrice && (
                  <span className="text-base text-noir-400 line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-red-700 text-white text-xs font-bold uppercase px-2 py-0.5 rounded-sm">
                    {`Save ${discountPercent}%`}
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-canvas-border/80 flex flex-col gap-1 text-[11px] text-noir-600">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Authoritative Price Inclusive of 12% GST</span>
                </div>
                <div className="flex items-center gap-1.5 text-noir-500">
                  <Truck className="w-3.5 h-3.5 text-gold-600" />
                  <span>Free Delhivery Express shipping on orders ₹2,999+</span>
                </div>
              </div>
            </div>

            {/* Variant / Color Selector */}
            {variants.length > 0 && selectedVariant && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-noir-800">
                  <span>
                    Selected Color:{" "}
                    <strong className="text-noir-900">{selectedVariant.color}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(variants.map((v) => v.color).filter(Boolean))).map(
                    (colorName) => {
                      const variantForColor = variants.find((v) => v.color === colorName)!;
                      const isSelected = selectedVariant.color === colorName;
                      return (
                        <button
                          key={colorName}
                          type="button"
                          onClick={() => {
                            const matched =
                              variants.find(
                                (v) =>
                                  v.color === colorName &&
                                  v.size === selectedVariant.size
                              ) || variantForColor;
                            setSelectedVariant(matched);
                            const variantImgIdx = images.findIndex(
                              (img) =>
                                (matched.image_url && img.url === matched.image_url) ||
                                (matched.color && img.color?.toLowerCase() === matched.color.toLowerCase()) ||
                                (img.color?.toLowerCase() === colorName.toLowerCase()) ||
                                (img.alt_text?.toLowerCase().includes(colorName.toLowerCase()))
                            );
                            if (variantImgIdx >= 0) {
                              setActiveImageIndex(variantImgIdx);
                            }
                          }}
                          className={`h-9 px-3 rounded-sm border text-xs font-medium flex items-center gap-2 transition-all ${
                            isSelected
                              ? "border-noir-900 bg-noir-900 text-white shadow-xs"
                              : "border-canvas-border bg-white text-noir-800 hover:border-noir-400"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: variantForColor.color_hex || "#999" }}
                          />
                          <span>{colorName}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Sizing SKUs & Availability */}
            {!product.is_affiliate && variants.length > 0 && selectedVariant && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-noir-800">
                    Select Size:{" "}
                    <strong className="text-noir-900">{selectedVariant.size}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-gold-700 hover:text-gold-900 flex items-center gap-1 font-semibold underline text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide (India)</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {variants.map((variant) => {
                    const isSelected = selectedVariant.id === variant.id;
                    const vStock = variant.inventory?.available_stock ?? 10;
                    const vOutOfStock = vStock <= 0;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        disabled={vOutOfStock}
                        className={`h-11 rounded-sm border text-xs font-bold transition-all relative flex flex-col items-center justify-center ${
                          isSelected
                            ? "border-noir-900 bg-noir-900 text-white shadow-xs"
                            : vOutOfStock
                            ? "border-canvas-border bg-canvas-subtle text-noir-300 cursor-not-allowed line-through"
                            : "border-canvas-border bg-white text-noir-800 hover:border-noir-900"
                        }`}
                      >
                        <span>{variant.size}</span>
                        {vStock > 0 && vStock <= 3 && (
                          <span className="text-[9px] font-normal text-amber-500 -mt-0.5">
                            {vStock} left
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Stock Status Indicator */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-noir-400 font-mono text-[11px]">
                    SKU: {selectedVariant.sku}
                  </span>

                  {isOutOfStock ? (
                    <span className="text-red-700 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Out of Stock</span>
                    </span>
                  ) : availableStock <= 4 ? (
                    <span className="text-amber-700 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
                      <span>Low Stock: Only {availableStock} remaining</span>
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>In Stock ({availableStock} units ready for dispatch)</span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Size Chart Modal / Drawer */}
            <AnimatePresence>
              {showSizeGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-white border border-canvas-border rounded-sm text-xs space-y-3 shadow-xs"
                >
                  <div className="flex justify-between items-center font-bold text-noir-900">
                    <span>Indian Apparel Standard Measurements (Inches)</span>
                    <button
                      onClick={() => setShowSizeGuide(false)}
                      className="text-noir-500 hover:text-noir-900 p-1"
                    >
                      ✕
                    </button>
                  </div>
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="border-b border-canvas-border text-[11px] text-noir-500">
                        <th className="py-1">Size</th>
                        <th className="py-1">Chest / Bust</th>
                        <th className="py-1">Waist</th>
                        <th className="py-1">Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-canvas-border font-medium">
                      <tr><td className="py-1">XS</td><td>34"</td><td>28"</td><td>27"</td></tr>
                      <tr><td className="py-1">S</td><td>36"</td><td>30"</td><td>28"</td></tr>
                      <tr><td className="py-1">M</td><td>38"</td><td>32"</td><td>29"</td></tr>
                      <tr><td className="py-1">L</td><td>40"</td><td>34"</td><td>30"</td></tr>
                      <tr><td className="py-1">XL</td><td>42"</td><td>36"</td><td>31"</td></tr>
                      <tr><td className="py-1">XXL</td><td>44"</td><td>38"</td><td>32"</td></tr>
                    </tbody>
                  </table>
                  <div className="text-right">
                    <Link
                      href="/size-guide"
                      className="text-gold-700 font-bold hover:underline text-[11px]"
                    >
                      View Comprehensive Sizing Guide →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quantity Selector & Action Buttons */}
            {!product.is_affiliate ? (
              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold text-noir-800">Quantity:</span>
                  <div className="flex items-center border border-canvas-border rounded-sm bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 hover:bg-canvas-subtle text-noir-700 transition-transform active:scale-90"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-bold text-noir-900 text-center min-w-[32px]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                      className="p-1.5 hover:bg-canvas-subtle text-noir-700 transition-transform active:scale-90"
                      disabled={quantity >= availableStock}
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {addError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{addError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(false)}
                    disabled={isOutOfStock || isAdding}
                    className={`py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-all duration-200 disabled:opacity-50 shadow-subtle ${
                      addSuccess
                        ? "bg-emerald-700 text-white"
                        : "bg-noir-900 hover:bg-gold-600 text-white hover:text-noir-900"
                    }`}
                  >
                    {isAdding ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Reserving...</span>
                      </div>
                    ) : addSuccess ? (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(true)}
                    disabled={isOutOfStock || isAdding}
                    className="bg-gold-600 hover:bg-gold-500 text-noir-900 py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-colors duration-200 disabled:opacity-50 shadow-subtle"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>

                <p className="text-[11px] text-center text-noir-500 font-light">
                  Stock is securely reserved for 15 minutes upon adding to bag.
                </p>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <a
                  href={product.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gold-600 hover:bg-gold-500 text-noir-900 py-4 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-all shadow-subtle"
                >
                  <span>Purchase on {product.affiliate_source_name || "Partner Store"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-noir-500 text-center font-light leading-relaxed">
                  {product.affiliate_disclosure ||
                    "Affiliate Curated: You will be redirected to our verified partner's official portal. LUMIÈRE earns a partner commission at zero extra cost to you."}
                </p>
              </div>
            )}

            {/* 3. PROMINENT RETURN & REFUND POLICY PANEL */}
            <div className="bg-white border-2 border-gold-300/80 rounded-sm p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-noir-900">
                <RotateCcw className="w-5 h-5 text-gold-700 shrink-0" />
                <h3 className="font-serif text-base font-bold text-noir-900">
                  7-Day Return & Two-Stage Inspection Guarantee
                </h3>
              </div>

              <p className="text-xs text-noir-600 leading-relaxed">
                We believe in genuine haute-couture satisfaction. If your piece does not fit or meet expectations:
              </p>

              <div className="space-y-2 text-xs text-noir-700 pt-1">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>7-Day Return Window:</strong> Request reverse collection within 7 calendar days from courier delivery date.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Doorstep Delhivery Reverse Pickup:</strong> Complimentary reverse courier collection directly at your address across 19,000+ PIN codes.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Two-Stage Quality Inspection:</strong> Parcels are received at our Royal Opera House hub and examined by master tailors before refund sign-off.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Condition Guidelines:</strong> Garments must remain unworn and unwashed with original LUMIÈRE security tags and atelier packaging intact.
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-canvas-border flex justify-between items-center text-[11px]">
                <Link
                  href="/returns-policy"
                  className="text-gold-700 font-bold hover:underline"
                >
                  Read Full Return & Exchange Policy →
                </Link>
                <span className="text-noir-400">Zero Restocking Fees</span>
              </div>
            </div>

            {/* 4. PINCODE ESTIMATOR & DELHIVERY LOGISTICS */}
            <div className="bg-white border border-canvas-border rounded-sm p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-noir-900">
                <Truck className="w-5 h-5 text-gold-700 shrink-0" />
                <h3 className="font-serif text-base font-bold text-noir-900">
                  Delhivery Express Logistics & PIN Code Checker
                </h3>
              </div>

              <p className="text-xs text-noir-500">
                Check delivery transit times across 19,000+ Indian postal codes from our central Mumbai hub:
              </p>

              <PincodeChecker />

              <div className="pt-2 text-[11px] text-noir-500 space-y-1">
                <p>• Dispatched from Royal Opera House Fulfillment Hub, Mumbai, Maharashtra.</p>
                <p>• Complimentary express courier on all domestic orders ₹2,999 and above.</p>
                <p>• Real-time SMS and WhatsApp tracking with Delhivery AWB number provided upon dispatch.</p>
              </div>
            </div>

            {/* 5. CRAFT, FABRIC & CARE SPECIFICATIONS */}
            <div className="bg-white border border-canvas-border rounded-sm p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-noir-900">
                <Award className="w-5 h-5 text-gold-700 shrink-0" />
                <h3 className="font-serif text-base font-bold text-noir-900">
                  Artisanal Craft, Fabric & Authenticity
                </h3>
              </div>

              <div className="space-y-2 text-xs text-noir-700">
                <p>
                  <strong>Artisanal Origin & Cluster:</strong> {product.origin || "Handcrafted in India"}
                </p>
                <p>
                  <strong>Fabric & Material Composition:</strong> {product.fabric_care || "100% Pure Silk and Handloom Weave"}
                </p>
                <p>
                  <strong>Artisan Editorial Description:</strong> {product.description}
                </p>
                <p>
                  <strong>Care & Preservation:</strong> Dry clean only. Store wrapped in unbleached mulmul cloth to preserve zari luster and delicate weave threads.
                </p>
              </div>

              <div className="pt-2 border-t border-canvas-border flex items-center justify-between text-[11px] text-noir-500">
                <span className="flex items-center gap-1 text-gold-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Silk Mark & GI Tag Verified</span>
                </span>
                <Link href="/authenticity" className="hover:underline text-noir-600">
                  Authenticity Standards →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg font-medium text-white tracking-wide truncate max-w-sm">
                  {product.name}
                </span>
                <span className="text-xs text-gold-400 font-mono">
                  ({activeImageIndex + 1} / {images.length})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-sm transition-colors text-xs flex items-center gap-1.5"
                  title="Toggle Zoom"
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isZoomed ? "Reset" : "Zoom"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-sm transition-colors"
                  title="Close Fullscreen (Esc)"
                  aria-label="Close fullscreen lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Center Image Stage */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
              <div
                className={`relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt_text || product.name}
                  fill
                  sizes="100vw"
                  style={{
                    transformOrigin: isZoomed
                      ? `${mousePos.x}% ${mousePos.y}%`
                      : "center center",
                  }}
                  className={`object-contain transition-transform duration-300 ${
                    isZoomed ? "scale-200" : "scale-100"
                  }`}
                />
              </div>

              {/* Lightbox Next/Prev Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Bottom Thumbnail Bar */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2 border-t border-white/10">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-18 sm:w-16 sm:h-20 rounded overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-gold-400 ring-2 ring-gold-400/50 scale-105"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt_text || `Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
