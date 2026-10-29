"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import {
  Plus,
  Search,
  ExternalLink,
  Sparkles,
  Tag,
  Boxes,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ProductsClientProps {
  initialProducts: Product[];
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("LUMIÈRE Atelier");
  const [categorySlug, setCategorySlug] = useState("ethnic-wear");
  const [collectionSlug, setCollectionSlug] = useState("");
  const [origin, setOrigin] = useState("Varanasi, Uttar Pradesh");
  const [basePrice, setBasePrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [isDeal, setIsDeal] = useState(false);
  const [description, setDescription] = useState("");
  const [fabricCare, setFabricCare] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [affiliateSource, setAffiliateSource] = useState("Tata CLiQ Luxury");
  const [affiliateUrl, setAffiliateUrl] = useState("");

  // Variants state
  const [variants, setVariants] = useState<
    Array<{
      size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Free Size";
      color: string;
      color_hex: string;
      sku: string;
      price: string;
      weight_grams: string;
    }>
  >([
    {
      size: "M",
      color: "Obsidian Black",
      color_hex: "#111111",
      sku: "",
      price: "",
      weight_grams: "500",
    },
  ]);

  const addVariantRow = () => {
    setVariants([
      ...variants,
      {
        size: "L",
        color: "Obsidian Black",
        color_hex: "#111111",
        sku: "",
        price: discountPrice || basePrice,
        weight_grams: "500",
      },
    ]);
  };

  const removeVariantRow = (index: number) => {
    if (variants.length <= 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const updated = [...variants];
    (updated[index] as any)[field] = value;
    setVariants(updated);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          brand,
          category_slug: categorySlug,
          collection_slug: collectionSlug || undefined,
          origin,
          base_price: Number(basePrice),
          discount_price: discountPrice ? Number(discountPrice) : undefined,
          is_deal: isDeal,
          description,
          fabric_care: fabricCare,
          images: imageUrl ? [{ url: imageUrl, alt_text: name, is_primary: true }] : [],
          is_affiliate: isAffiliate,
          affiliate_source_name: isAffiliate ? affiliateSource : undefined,
          affiliate_url: isAffiliate ? affiliateUrl : undefined,
          variants: variants.map((v) => ({
            size: v.size,
            color: v.color,
            color_hex: v.color_hex,
            sku: v.sku || undefined,
            price: Number(v.price || discountPrice || basePrice),
            compare_at_price: Number(basePrice),
            weight_grams: Number(v.weight_grams) || 500,
          })),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`Product "${name}" registered successfully.`);
        setProducts([data.product, ...products]);
        setModalOpen(false);
        // Reset form
        setName("");
        setBasePrice("");
        setDiscountPrice("");
        setDescription("");
        setFabricCare("");
        setImageUrl("");
      } else {
        setErrorMsg(data.error || "Failed to create product.");
      }
    } catch {
      setErrorMsg("Network error communicating with product service.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.variants.some((v) => v.sku.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      categoryFilter === "all" || p.category_slug === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header with Title and Create Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Atelier Catalog
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Products, Variants & SKU Architecture
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Total {products.length} registered fashion designs across India.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-noir-900 hover:bg-gold-600 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Product Design</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-canvas-border p-4 rounded-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-noir-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand, SKU..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-noir-500 uppercase tracking-wider font-semibold">
            Category:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-canvas-subtle border border-canvas-border px-3 py-2 rounded-sm text-noir-900 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="ethnic-wear">Ethnic Wear</option>
            <option value="womens-clothing">Women's Clothing</option>
            <option value="mens-clothing">Men's Clothing</option>
            <option value="streetwear">Streetwear</option>
            <option value="premium-luxury">Premium & Luxury</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-canvas-border text-noir-600 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Design</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Origin & Craft</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-center">Variants & SKUs</th>
                <th className="py-3 px-4 text-right">Price (INR)</th>
                <th className="py-3 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas-subtle">
              {filteredProducts.map((p) => {
                const primaryImage =
                  p.images.find((i) => i.is_primary) || p.images[0];

                return (
                  <tr key={p.id} className="hover:bg-canvas-light transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-canvas-subtle rounded-sm overflow-hidden shrink-0 border border-canvas-border">
                        <Image
                          src={
                            primaryImage?.url ||
                            "https://images.unsplash.com/photo-1610030469983-98e550d6193c"
                          }
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-noir-900">{p.name}</p>
                        <p className="text-[10px] text-gold-700 uppercase font-semibold">
                          {p.brand}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 uppercase text-[11px] font-medium text-noir-600">
                      {p.category_slug.replace(/-/g, " ")}
                    </td>
                    <td className="py-3.5 px-4 text-noir-600 text-[11px]">
                      {p.origin}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.is_affiliate ? (
                        <span className="text-[10px] font-bold text-gold-800 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                          Affiliate ({p.affiliate_source_name || "External"})
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          LUMIÈRE Stocked
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-noir-800 block">
                        {p.variants.length} SKUs
                      </span>
                      <span className="text-[10px] text-noir-400">
                        {p.variants.map((v) => v.size).join(", ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-sans font-bold text-noir-900">
                      ₹{(p.discount_price || p.base_price).toLocaleString("en-IN")}
                      {p.discount_price && (
                        <span className="block text-[10px] text-noir-400 line-through font-normal">
                          ₹{p.base_price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="p-1.5 text-noir-600 hover:text-gold-600 inline-block"
                        title="View on Storefront"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE PRODUCT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-canvas-border rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-canvas-border pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600 block">
                  Inventory Architecture
                </span>
                <h3 className="font-serif text-xl font-bold text-noir-900">
                  Register New Fashion Design & SKUs
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-noir-400 hover:text-noir-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                    Design Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Raw Silk Hand-Embroidered Kurta"
                    className="w-full text-xs px-3.5 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none text-noir-900"
                  >
                    <option value="ethnic-wear">Ethnic Wear</option>
                    <option value="womens-clothing">Women's Clothing</option>
                    <option value="mens-clothing">Men's Clothing</option>
                    <option value="streetwear">Streetwear</option>
                    <option value="premium-luxury">Premium & Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                    Collection (Optional)
                  </label>
                  <select
                    value={collectionSlug}
                    onChange={(e) => setCollectionSlug(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none text-noir-900"
                  >
                    <option value="">None / Independent</option>
                    <option value="royal-rajasthan">Royal Heritage Edit</option>
                    <option value="monsoon-minimalism">Monsoon Minimalism</option>
                    <option value="tokyo-mumbai-street">District Zero Streetwear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                    Origin & City *
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g., Jaipur, Rajasthan"
                    className="w-full text-xs px-3.5 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                  />
                </div>
              </div>

              {/* Pricing & Deals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                    Base MRP Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    placeholder="7990"
                    className="w-full text-xs px-3.5 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                    Discount / Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="6490"
                    className="w-full text-xs px-3.5 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-noir-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDeal}
                      onChange={(e) => setIsDeal(e.target.checked)}
                      className="w-4 h-4 accent-gold-600"
                    />
                    <span>Highlight as Special Deal</span>
                  </label>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                  Editorial Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the handloom technique, weave count, drape, and silhouette..."
                  className="w-full text-xs p-3 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                  Fabric & Care Instructions
                </label>
                <input
                  type="text"
                  value={fabricCare}
                  onChange={(e) => setFabricCare(e.target.value)}
                  placeholder="e.g., 100% Chanderi Silk. Dry clean only. Wrap in unbleached cotton."
                  className="w-full text-xs px-3.5 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                />
              </div>

              {/* Product Image */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                  Primary Image URL (HTTPS)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full text-xs px-3.5 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                />
              </div>

              {/* Variants Section */}
              <div className="border-t border-canvas-border pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">
                      Product Variants & Sizing SKUs
                    </h4>
                    <p className="text-[11px] text-noir-500">
                      Every variant will receive an independent inventory record and SKU.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addVariantRow}
                    className="text-xs font-bold text-gold-700 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Size / Color Variant</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {variants.map((v, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-6 gap-2 items-center bg-canvas-subtle p-2.5 rounded-sm"
                    >
                      <div>
                        <label className="text-[9px] uppercase font-bold text-noir-500 block">
                          Size
                        </label>
                        <select
                          value={v.size}
                          onChange={(e) =>
                            updateVariant(idx, "size", e.target.value)
                          }
                          className="w-full text-xs bg-white border border-canvas-border p-1 rounded-sm text-noir-900"
                        >
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                          <option value="Free Size">Free Size</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="text-[9px] uppercase font-bold text-noir-500 block">
                          Color & Hex
                        </label>
                        <div className="flex gap-1 items-center">
                          <input
                            type="text"
                            value={v.color}
                            onChange={(e) =>
                              updateVariant(idx, "color", e.target.value)
                            }
                            placeholder="Dusty Rose"
                            className="w-full text-xs bg-white border border-canvas-border p-1 rounded-sm text-noir-900"
                          />
                          <input
                            type="color"
                            value={v.color_hex}
                            onChange={(e) =>
                              updateVariant(idx, "color_hex", e.target.value)
                            }
                            className="w-7 h-7 p-0 border border-canvas-border rounded cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] uppercase font-bold text-noir-500 block">
                          Weight (g)
                        </label>
                        <input
                          type="number"
                          value={v.weight_grams}
                          onChange={(e) =>
                            updateVariant(idx, "weight_grams", e.target.value)
                          }
                          placeholder="500"
                          className="w-full text-xs bg-white border border-canvas-border p-1 rounded-sm text-noir-900"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] uppercase font-bold text-noir-500 block">
                          Custom SKU
                        </label>
                        <input
                          type="text"
                          value={v.sku}
                          onChange={(e) =>
                            updateVariant(idx, "sku", e.target.value)
                          }
                          placeholder="Auto"
                          className="w-full text-xs bg-white border border-canvas-border p-1 rounded-sm text-noir-900"
                        />
                      </div>

                      <div className="text-right pt-3">
                        <button
                          type="button"
                          onClick={() => removeVariantRow(idx)}
                          disabled={variants.length <= 1}
                          className="text-xs text-red-600 hover:underline disabled:opacity-30"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affiliate Discovery Settings */}
              <div className="border-t border-canvas-border pt-4 space-y-3">
                <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-noir-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAffiliate}
                    onChange={(e) => setIsAffiliate(e.target.checked)}
                    className="w-4 h-4 accent-gold-600"
                  />
                  <span>This is an External Affiliate Discovery</span>
                </label>

                {isAffiliate && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-gold-50 border border-gold-200 rounded-sm">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-900 mb-1">
                        Retailer Source
                      </label>
                      <input
                        type="text"
                        value={affiliateSource}
                        onChange={(e) => setAffiliateSource(e.target.value)}
                        placeholder="Tata CLiQ Luxury / Ajio Luxe / Myntra"
                        className="w-full text-xs bg-white border border-gold-300 p-2 rounded-sm text-noir-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-900 mb-1">
                        Outbound Destination URL
                      </label>
                      <input
                        type="url"
                        value={affiliateUrl}
                        onChange={(e) => setAffiliateUrl(e.target.value)}
                        placeholder="https://luxury.tatacliq.com/..."
                        className="w-full text-xs bg-white border border-gold-300 p-2 rounded-sm text-noir-900"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="border-t border-canvas-border pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border border-noir-300 rounded-sm text-noir-700 hover:bg-canvas-subtle"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-noir-900 hover:bg-gold-600 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-sm disabled:opacity-50"
                >
                  {submitting ? "Registering Piece..." : "Create Product & SKUs"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
