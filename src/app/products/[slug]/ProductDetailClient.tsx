"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PincodeChecker } from "@/components/PincodeChecker";
import { 
  Heart, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ExternalLink, 
  Check, 
  Ruler, 
  AlertCircle,
  ShoppingBag
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, setIsOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active state
  const [selectedImage, setSelectedImage] = useState(
    product.images.find((img) => img.is_primary)?.url || product.images[0]?.url
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const wishlisted = isInWishlist(product.id);
  const availableStock = selectedVariant.inventory?.available_stock ?? 10;
  const isOutOfStock = availableStock <= 0;

  const currentPrice = selectedVariant.price;
  const originalPrice = selectedVariant.compare_at_price;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = async (goToCheckout = false) => {
    setAddError(null);
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
      quantity: 1,
    });

    setIsAdding(false);

    if (!result.success) {
      setAddError(result.error || "Failed to add to cart.");
    } else {
      if (goToCheckout) {
        window.location.href = "/checkout";
      } else {
        setIsOpen(true);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-noir-500 flex items-center gap-2">
        <a href="/" className="hover:text-noir-900 transition-colors">Home</a>
        <span>/</span>
        <a href={`/category/${product.category_slug}`} className="hover:text-noir-900 uppercase transition-colors">
          {product.category_slug.replace(/-/g, " ")}
        </a>
        <span>/</span>
        <span className="text-noir-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.url)}
                className={`relative w-20 h-24 shrink-0 rounded-sm overflow-hidden border transition-all ${
                  selectedImage === img.url
                    ? "border-noir-900 ring-1 ring-noir-900 shadow-xs"
                    : "border-canvas-border hover:border-noir-400 opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt_text}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Main Visual */}
          <div className="relative aspect-[3/4] flex-1 bg-canvas-subtle rounded-sm overflow-hidden border border-canvas-border">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Right: Selection & Purchasing (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                {product.brand}
              </span>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2 rounded-full border border-canvas-border transition-colors ${
                  wishlisted
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "text-noir-600 hover:text-rose-600"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium leading-snug">
              {product.name}
            </h1>

            {/* Rating & Review Count */}
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
                <span className="text-noir-400">({product.review_count} verified client reviews)</span>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="border-y border-canvas-border py-4 flex items-baseline gap-3">
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
              Inclusive of all taxes
            </span>
          </div>

          {/* COLOR SELECTOR */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-noir-800">
                Color: <strong className="text-noir-900">{selectedVariant.color}</strong>
              </span>
            </div>
            <div className="flex gap-2">
              {Array.from(new Set(product.variants.map((v) => v.color))).map((colorName) => {
                const variantForColor = product.variants.find((v) => v.color === colorName)!;
                const isSelected = selectedVariant.color === colorName;
                return (
                  <button
                    key={colorName}
                    onClick={() => {
                      const matched = product.variants.find(
                        (v) => v.color === colorName && v.size === selectedVariant.size
                      ) || variantForColor;
                      setSelectedVariant(matched);
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
              })}
            </div>
          </div>

          {/* SIZE SELECTOR & STOCK AVAILABILITY */}
          {!product.is_affiliate && (
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
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant.id === variant.id;
                  const vStock = variant.inventory?.available_stock ?? 10;
                  const vOutOfStock = vStock <= 0;

                  return (
                    <button
                      key={variant.id}
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
                    <span>In Stock ({availableStock} units available)</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Size Guide Modal / Drawer */}
          {showSizeGuide && (
            <div className="p-4 bg-canvas-subtle border border-canvas-border rounded-sm text-xs space-y-2">
              <div className="flex justify-between items-center font-bold text-noir-900">
                <span>Standard Indian Apparel Measurements (Inches)</span>
                <button onClick={() => setShowSizeGuide(false)} className="text-noir-500 hover:text-noir-900">
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
            </div>
          )}

          {/* Add to Cart Error */}
          {addError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{addError}</span>
            </div>
          )}

          {/* PURCHASING BUTTONS OR AFFILIATE REDIRECT */}
          {product.is_affiliate ? (
            <div className="space-y-3 pt-2">
              <a
                href={product.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gold-600 hover:bg-gold-500 text-noir-900 py-4 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-colors shadow-subtle"
              >
                <span>Purchase on {product.affiliate_source_name || "Partner Store"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-noir-500 text-center font-light leading-relaxed">
                {product.affiliate_disclosure ||
                  "Affiliate Curated: You will be redirected to our verified retail partner's portal. LUMIÈRE earns a partner commission on qualifying purchases at zero added cost to you."}
              </p>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleAddToCart(false)}
                  disabled={isOutOfStock || isAdding}
                  className="bg-noir-900 hover:bg-gold-600 text-white py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-colors disabled:opacity-50 shadow-subtle"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdding ? "Reserving..." : "Add to Bag"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  disabled={isOutOfStock || isAdding}
                  className="bg-gold-600 hover:bg-gold-500 text-noir-900 py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-luxury transition-colors disabled:opacity-50 shadow-subtle"
                >
                  <span>Buy Now</span>
                </button>
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

          {/* PRODUCT SPECIFICATIONS ACCORDION */}
          <div className="border-t border-canvas-border pt-6 space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-noir-900 uppercase tracking-wider mb-1">
                Artisanal Description
              </h4>
              <p className="text-noir-600 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-noir-900 uppercase tracking-wider mb-1">
                Fabric & Care
              </h4>
              <p className="text-noir-600 leading-relaxed font-light">
                {product.fabric_care}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-noir-900 uppercase tracking-wider mb-1">
                Heritage & Craft Origin
              </h4>
              <p className="text-noir-600 font-light">
                {product.origin}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-canvas-subtle">
              <div className="flex items-center gap-2 text-noir-700">
                <Truck className="w-4 h-4 text-gold-600" />
                <span>Delhivery Surface Express</span>
              </div>
              <div className="flex items-center gap-2 text-noir-700">
                <RotateCcw className="w-4 h-4 text-gold-600" />
                <span>7-Day Inspected Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
