"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PincodeChecker } from "@/components/PincodeChecker";
import { ProductCard } from "@/components/ProductCard";
import { RecentlyViewed, isValidRecentlyViewedProduct } from "@/components/RecentlyViewed";
import { ScrollReveal } from "@/components/ScrollReveal";
import { accordionVariant, LUXURY_EASE, useSafeReducedMotion } from "@/lib/motion";
import {
  Heart,
  Star,
  ShieldCheck,
  Check,
  Ruler,
  AlertCircle,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  ZoomIn,
  ArrowRight,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailClientProps) {
  const shouldReduceMotion = useSafeReducedMotion();
  const { addItem, setIsOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active selections
  const variants = product.variants || [];
  const [selectedImage, setSelectedImage] = useState(
    product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url || ""
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isWishlistBouncing, setIsWishlistBouncing] = useState(false);

  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState<string | null>("fabric");

  const wishlisted = isInWishlist(product.id);
  const availableStock = selectedVariant?.inventory?.available_stock ?? 10;
  const isOutOfStock = availableStock <= 0;

  const currentPrice = selectedVariant?.price ?? product.base_price;
  const originalPrice = selectedVariant?.compare_at_price;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  // Persist to recently viewed in localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("lumiere_recently_viewed");
        let list: Product[] = [];
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            list = parsed.filter(isValidRecentlyViewedProduct);
          }
        }
        const filtered = [product, ...list.filter((p) => p && p.id !== product.id)].slice(0, 8);
        localStorage.setItem("lumiere_recently_viewed", JSON.stringify(filtered));
      } catch (e) {
        console.error("Failed to save to recently viewed", e);
      }
    }
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleToggleWishlist = () => {
    setIsWishlistBouncing(true);
    toggleWishlist(product);
    setTimeout(() => setIsWishlistBouncing(false), 450);
  };

  const handleAddToCart = async (goToCheckout = false) => {
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
      product_image: selectedImage,
      sku: selectedVariant.sku,
      color: selectedVariant.color,
      size: selectedVariant.size,
      unit_price: selectedVariant.price,
      quantity,
    });

    setIsAdding(false);

    if (!result.success) {
      setAddError(result.error || "Failed to add to cart.");
    } else {
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 1800);
      if (goToCheckout) {
        window.location.href = "/checkout";
      } else {
        setIsOpen(true);
      }
    }
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 sm:pb-16 space-y-16">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-noir-500 flex items-center gap-2">
        <Link href="/" className="hover:text-noir-900 transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category_slug}`} className="hover:text-noir-900 uppercase transition-colors">
          {product.category_slug.replace(/-/g, " ")}
        </Link>
        <span>/</span>
        <span className="text-noir-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Hero (Gallery + Purchase Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery (7 Cols) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: LUXURY_EASE }}
          className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4"
        >
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0 pb-2 sm:pb-0">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative w-20 h-24 shrink-0 rounded-sm overflow-hidden border transition-all duration-200 ${
                    selectedImage === img.url
                      ? "border-noir-900 ring-2 ring-noir-900 ring-offset-1 shadow-xs scale-102"
                      : "border-canvas-border hover:border-noir-400 opacity-75 hover:opacity-100 hover:scale-102"
                  }`}
                  aria-label={`Select product image view`}
                >
                  <Image src={img.url} alt={img.alt_text || product.name} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}

          {/* Main Visual with Smooth Zoom & Coordinates tracking */}
          <div
            className="relative aspect-[3/4] flex-1 bg-canvas-subtle rounded-sm overflow-hidden border border-canvas-border group cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isZoomed && setIsZoomed(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0.2, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.2, scale: 0.98 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                className="w-full h-full relative"
              >
                <Image
                  src={selectedImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  style={{
                    transformOrigin: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : "center center",
                  }}
                  className={`object-cover object-center transition-transform duration-300 ease-out ${
                    isZoomed ? "scale-175" : "scale-100 group-hover:scale-103"
                  }`}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm px-2 py-1 rounded text-noir-700 pointer-events-none text-[10px] font-medium flex items-center gap-1 shadow-xs border border-canvas-border">
              <ZoomIn className="w-3.5 h-3.5 text-gold-600" />
              <span>{isZoomed ? "Click to reset" : "Click to magnify"}</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Selection & Purchasing (5 Cols) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: LUXURY_EASE, delay: shouldReduceMotion ? 0 : 0.08 }}
          className="lg:col-span-5 space-y-6"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                {product.brand}
              </span>
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  wishlisted
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "border-canvas-border text-noir-600 hover:text-rose-600 hover:bg-white"
                } ${isWishlistBouncing ? "animate-heartbeat" : ""}`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 transition-transform ${wishlisted ? "fill-rose-600 text-rose-600 scale-110" : ""}`} />
              </button>
            </div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: LUXURY_EASE }}
              className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium leading-snug"
            >
              {product.name}
            </motion.h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? "fill-gold-400 text-gold-400" : "text-noir-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-noir-800">{product.rating}</span>
                <span className="text-noir-400">({product.review_count} verified client reviews)</span>
              </div>
            )}
          </div>

          {/* Pricing Row */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: LUXURY_EASE, delay: shouldReduceMotion ? 0 : 0.06 }}
            className="border-y border-canvas-border py-4 flex items-baseline gap-3"
          >
            <span className="font-sans text-2xl sm:text-3xl font-bold text-noir-900">
              ₹{currentPrice.toLocaleString("en-IN")}
            </span>
            {originalPrice && (
              <span className="text-sm sm:text-base text-noir-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="bg-red-700 text-white text-[11px] font-bold uppercase px-2 py-0.5 rounded-sm">
                Save {discountPercent}%
              </span>
            )}
            <span className="text-[11px] text-noir-500 font-light ml-auto">
              Inclusive of 12% GST
            </span>
          </motion.div>

          {/* COLOR SELECTOR */}
          {variants.length > 0 && selectedVariant && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-noir-800">
                  Color: <strong className="text-noir-900">{selectedVariant.color}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(variants.map((v) => v.color).filter(Boolean))).map((colorName) => {
                  const variantForColor = variants.find((v) => v.color === colorName)!;
                  const isSelected = selectedVariant.color === colorName;
                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => {
                        const matched =
                          variants.find((v) => v.color === colorName && v.size === selectedVariant.size) ||
                          variantForColor;
                        setSelectedVariant(matched);
                        const variantImg =
                          matched.image_url ||
                          product.images?.find(
                            (img) =>
                              img.color?.toLowerCase() === colorName.toLowerCase() ||
                              img.alt_text?.toLowerCase().includes(colorName.toLowerCase())
                          )?.url;
                        if (variantImg) {
                          setSelectedImage(variantImg);
                        }
                      }}
                      className={`h-9 px-3 rounded-sm border text-xs font-medium flex items-center gap-2 transition-all duration-150 active:scale-95 ${
                        isSelected
                          ? "border-noir-900 bg-noir-900 text-white shadow-xs scale-102"
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
                })}
              </div>
            </div>
          )}

          {/* SIZE SELECTOR & STOCK AVAILABILITY */}
          {!product.is_affiliate && variants.length > 0 && selectedVariant && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-noir-800">
                  Select Size: <strong className="text-noir-900">{selectedVariant.size}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-gold-700 hover:text-gold-900 flex items-center gap-1 font-semibold underline text-[11px]"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart (India)</span>
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
                      className={`h-11 rounded-sm border text-xs font-bold transition-all duration-150 relative flex flex-col items-center justify-center active:scale-95 ${
                        isSelected
                          ? "border-noir-900 bg-noir-900 text-white shadow-xs scale-102"
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

              {/* SKU & Live Stock Indicator */}
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
                    <span>In Stock ({availableStock} units ready at Mumbai hub)</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Size Guide Modal / Drawer */}
          <AnimatePresence>
            {showSizeGuide && (
              <motion.div
                variants={accordionVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="p-4 bg-canvas-subtle border border-canvas-border rounded-sm text-xs space-y-3"
              >
                <div className="flex justify-between items-center font-bold text-noir-900">
                  <span>Standard Indian Apparel Measurements (Inches)</span>
                  <button onClick={() => setShowSizeGuide(false)} className="text-noir-500 hover:text-noir-900 p-1">
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
                  <Link href="/size-guide" className="text-gold-700 font-bold hover:underline text-[11px]">
                    View Full Sizing Guide →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quantity Selector */}
          {!product.is_affiliate && (
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
                <div className="overflow-hidden flex items-center justify-center min-w-[32px]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={quantity}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="px-2 font-bold text-noir-900 text-center inline-block"
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                </div>
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
          )}

          {/* Add to Cart Error */}
          <AnimatePresence>
            {addError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{addError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PURCHASING BUTTONS OR AFFILIATE REDIRECT */}
          {product.is_affiliate ? (
            <div className="space-y-3 pt-2">
              <a
                href={product.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gold-600 hover:bg-gold-500 active:scale-[0.99] text-noir-900 py-4 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-all shadow-subtle"
              >
                <span>Purchase on {product.affiliate_source_name || "Partner Store"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-noir-500 text-center font-light leading-relaxed">
                {product.affiliate_disclosure ||
                  "Affiliate Curated: You will be redirected to our verified retail partner's official portal. LUMIÈRE earns a partner commission at zero added cost to you."}
              </p>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => handleAddToCart(false)}
                  disabled={isOutOfStock || isAdding}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  className={`py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-colors duration-200 disabled:opacity-50 shadow-subtle ${
                    addSuccess
                      ? "bg-emerald-700 text-white"
                      : "bg-noir-900 hover:bg-gold-600 text-white hover:text-noir-900"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isAdding ? (
                      <motion.div
                        key="adding"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Reserving...</span>
                      </motion.div>
                    ) : addSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  disabled={isOutOfStock || isAdding}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gold-600 hover:bg-gold-500 text-noir-900 py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-colors duration-200 disabled:opacity-50 shadow-subtle"
                >
                  <span>Buy Now</span>
                </motion.button>
              </div>

              <p className="text-[11px] text-center text-noir-500 font-light">
                Stock is reserved for 15 minutes upon adding to bag.
              </p>
            </div>
          )}

          {/* PINCODE ESTIMATOR (Delhivery Serviceability) */}
          <div className="pt-2">
            <PincodeChecker />
          </div>

          {/* ACCORDIONS with Smooth Animation */}
          <div className="border-t border-canvas-border pt-4 divide-y divide-canvas-border text-xs">
            {/* 1. Artisanal Details */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion("fabric")}
                className="w-full flex justify-between items-center font-bold text-noir-900 uppercase tracking-wider py-1 hover:text-gold-700 transition-colors"
                aria-expanded={activeAccordion === "fabric"}
              >
                <span>Fabric, Craft & Origin</span>
                {activeAccordion === "fabric" ? <ChevronUp className="w-4 h-4 transition-transform" /> : <ChevronDown className="w-4 h-4 transition-transform" />}
              </button>
              <AnimatePresence>
                {activeAccordion === "fabric" && (
                  <motion.div
                    variants={accordionVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="pt-2 text-noir-600 space-y-2 leading-relaxed"
                  >
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Fabric & Care:</strong> {product.fabric_care}</p>
                    <p><strong>Artisanal Origin:</strong> {product.origin}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Shipping & Delivery */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex justify-between items-center font-bold text-noir-900 uppercase tracking-wider py-1 hover:text-gold-700 transition-colors"
                aria-expanded={activeAccordion === "shipping"}
              >
                <span>Delhivery Shipping & Logistics</span>
                {activeAccordion === "shipping" ? <ChevronUp className="w-4 h-4 transition-transform" /> : <ChevronDown className="w-4 h-4 transition-transform" />}
              </button>
              <AnimatePresence>
                {activeAccordion === "shipping" && (
                  <motion.div
                    variants={accordionVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="pt-2 text-noir-600 space-y-1.5 leading-relaxed"
                  >
                    <p>• Dispatched from our central fulfillment hub in Royal Opera House, Mumbai.</p>
                    <p>• Free Delhivery Express courier on all orders above ₹2,999; flat ₹150 otherwise.</p>
                    <p>• Transit time: 2–4 business days across 19,000+ Indian postal PIN codes.</p>
                    <p>• Live SMS & WhatsApp tracking dispatched once waybill is manifested.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Returns & Exchange */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion("returns")}
                className="w-full flex justify-between items-center font-bold text-noir-900 uppercase tracking-wider py-1 hover:text-gold-700 transition-colors"
                aria-expanded={activeAccordion === "returns"}
              >
                <span>7-Day Return & Inspection Sign-Off</span>
                {activeAccordion === "returns" ? <ChevronUp className="w-4 h-4 transition-transform" /> : <ChevronDown className="w-4 h-4 transition-transform" />}
              </button>
              <AnimatePresence>
                {activeAccordion === "returns" && (
                  <motion.div
                    variants={accordionVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="pt-2 text-noir-600 space-y-1.5 leading-relaxed"
                  >
                    <p>• Hassle-free 7-day return window from the date of courier delivery.</p>
                    <p>• Reverse courier pickup scheduled via Delhivery directly at your doorstep.</p>
                    <p>• Items must have original LUMIÈRE security tags attached and remain unworn.</p>
                    <p>• Refunds initiated immediately upon physical warehouse inspection sign-off.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Related Designs / Curated Pairings */}
      {relatedProducts.length > 0 && (
        <ScrollReveal variant="fade-up" className="space-y-6 pt-6 border-t border-canvas-border">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold-600 block mb-0.5">
                Stylist Selection
              </span>
              <h2 className="font-serif text-2xl text-noir-900 font-medium">
                Complete the Look & Related Designs
              </h2>
            </div>
            <Link href={`/category/${product.category_slug}`} className="text-xs font-bold uppercase tracking-wider text-gold-700 hover:underline flex items-center gap-1">
              <span>View Category</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel, idx) => (
              <ProductCard key={rel.id} product={rel} index={idx} />
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* 4. Recently Viewed Products */}
      <ScrollReveal variant="fade-up" delay={0.08}>
        <RecentlyViewed excludeId={product.id} />
      </ScrollReveal>

      {/* 5. Sticky Bottom Action Bar for Mobile Devices */}
      {!product.is_affiliate && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-canvas-border p-3 z-30 flex items-center justify-between gap-3 shadow-lg">
          <div>
            <span className="text-xs font-bold text-noir-900 block font-sans">
              ₹{currentPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-noir-500 font-medium">
              Size: {selectedVariant?.size || "Standard"}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleAddToCart(false)}
              disabled={isOutOfStock || isAdding}
              className="bg-noir-900 hover:bg-gold-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all active:scale-95 disabled:opacity-50"
            >
              Add to Bag
            </button>
            <button
              type="button"
              onClick={() => handleAddToCart(true)}
              disabled={isOutOfStock || isAdding}
              className="bg-gold-600 hover:bg-gold-500 text-noir-900 text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all active:scale-95 disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailClient;
