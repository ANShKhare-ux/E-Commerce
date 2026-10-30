"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  X,
  Heart,
  ShoppingBag,
  Check,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Truck
} from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem, setIsOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const variants = product?.variants || [];
  const defaultVariant = variants[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(defaultVariant);
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.find((img) => img.is_primary)?.url || product?.images?.[0]?.url || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && product) {
      const vars = product.variants || [];
      setSelectedVariant(vars[0]);
      setSelectedImage(
        product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url || ""
      );
      setQuantity(1);
      setAddError(null);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;


  const wishlisted = isInWishlist(product.id);
  const availableStock = selectedVariant?.inventory?.available_stock ?? 10;
  const isOutOfStock = availableStock <= 0;

  const currentPrice = selectedVariant?.price ?? product.base_price;
  const originalPrice = selectedVariant?.compare_at_price;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setAddError(null);
    if (!selectedVariant) {
      setAddError("Please select a size before adding to bag.");
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
      setAddError(result.error || "Failed to add to bag.");
    } else {
      onClose();
      setIsOpen(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-canvas-border rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-noir-700 hover:text-noir-900 border border-canvas-border transition-colors shadow-xs"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery (md:w-1/2) */}
        <div className="md:w-1/2 flex flex-col bg-canvas-subtle p-4 border-b md:border-b-0 md:border-r border-canvas-border">
          <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-white border border-canvas-border">
            <Image
              src={selectedImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto py-1">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative w-14 h-18 rounded-sm overflow-hidden shrink-0 border transition-all ${
                    selectedImage === img.url
                      ? "border-noir-900 ring-1 ring-noir-900"
                      : "border-canvas-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url} alt={img.alt_text || product.name} fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Variant Selection (md:w-1/2) */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-600">
                {product.brand}
              </span>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-1.5 rounded-full border border-canvas-border transition-colors ${
                  wishlisted ? "bg-rose-50 text-rose-600" : "text-noir-600 hover:text-rose-600"
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-medium text-noir-900">
              {product.name}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 border-y border-canvas-border py-3">
              <span className="font-sans text-xl font-bold text-noir-900">
                ₹{currentPrice.toLocaleString("en-IN")}
              </span>
              {originalPrice && (
                <span className="text-xs text-noir-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-red-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
                  {discountPercent}% OFF
                </span>
              )}
              <span className="text-[10px] text-noir-400 ml-auto">Inclusive of all taxes</span>
            </div>

            {/* Color Swatches */}
            {variants.length > 0 && selectedVariant && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-noir-800">
                  Color: <strong className="text-noir-900">{selectedVariant.color}</strong>
                </span>
                <div className="flex gap-2">
                  {Array.from(new Set(variants.map((v) => v.color).filter(Boolean))).map((colorName) => {
                    const varForColor = variants.find((v) => v.color === colorName)!;
                    const isSelected = selectedVariant.color === colorName;
                    return (
                      <button
                        key={colorName}
                        onClick={() => {
                          const matched =
                            variants.find((v) => v.color === colorName && v.size === selectedVariant.size) ||
                            varForColor;
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
                        className={`h-8 px-2.5 rounded-sm border text-xs font-medium flex items-center gap-2 transition-all ${
                          isSelected
                            ? "border-noir-900 bg-noir-900 text-white"
                            : "border-canvas-border bg-white text-noir-800 hover:border-noir-400"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: varForColor.color_hex || "#888" }}
                        />
                        <span>{colorName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {!product.is_affiliate && variants.length > 0 && selectedVariant && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-noir-800">
                    Size: <strong className="text-noir-900">{selectedVariant.size}</strong>
                  </span>
                  <span className="text-[11px] text-noir-400 font-mono">
                    SKU: {selectedVariant.sku}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {variants.map((variant) => {
                    const isSelected = selectedVariant.id === variant.id;
                    const stock = variant.inventory?.available_stock ?? 10;
                    const out = stock <= 0;

                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={out}
                        className={`h-10 rounded-sm border text-xs font-bold transition-all flex items-center justify-center ${
                          isSelected
                            ? "border-noir-900 bg-noir-900 text-white shadow-xs"
                            : out
                            ? "border-canvas-border bg-canvas-subtle text-noir-300 cursor-not-allowed line-through"
                            : "border-canvas-border bg-white text-noir-800 hover:border-noir-900"
                        }`}
                      >
                        {variant.size}
                      </button>
                    );
                  })}
                </div>

                {/* Stock Feedback */}
                <div className="text-xs pt-1">
                  {isOutOfStock ? (
                    <span className="text-red-700 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Currently Out of Stock</span>
                    </span>
                  ) : availableStock <= 4 ? (
                    <span className="text-amber-700 font-bold">
                      Hurry, only {availableStock} left in stock
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Ready for Mumbai hub dispatch</span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Add to Cart Error */}
            {addError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{addError}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-3 border-t border-canvas-border">
            {product.is_affiliate ? (
              <a
                href={product.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gold-600 hover:bg-gold-500 text-noir-900 py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm transition-colors"
              >
                <span>Purchase on {product.affiliate_source_name || "Partner Store"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3.5 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm transition-colors disabled:opacity-50 shadow-subtle"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdding ? "Reserving..." : "Add to Bag"}</span>
              </button>
            )}

            <div className="text-center">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-wider text-noir-600 hover:text-gold-700 inline-flex items-center gap-1"
              >
                <span>View Full Product Details & Size Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
