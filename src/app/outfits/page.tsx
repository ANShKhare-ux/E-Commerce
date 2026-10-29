import React from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { CURATED_OUTFITS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

export default async function OutfitsPage() {
  const allProducts = await db.products.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="border-b border-canvas-border pb-6 max-w-2xl">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Wardrobe Direction
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Curated Outfit Combinations
        </h1>
        <p className="text-xs text-noir-500 font-light mt-1">
          Hand-picked ensemble styling by LUMIÈRE creative directors. Harmonizing handcrafted Indian silks with contemporary accessories and streetwear layering.
        </p>
      </div>

      {CURATED_OUTFITS.length === 0 ? (
        <div className="text-center py-20 bg-white border border-canvas-border rounded-sm space-y-3">
          <Sparkles className="w-8 h-8 text-gold-600 mx-auto" />
          <h3 className="font-serif text-lg font-medium text-noir-900">
            Styling Combinations in Curation
          </h3>
          <p className="text-xs text-noir-500 max-w-md mx-auto leading-relaxed">
            Curated ensembles will be published as soon as our upcoming physical collections and verified affiliate pieces are launched.
          </p>
        </div>
      ) : (
        <div className="space-y-20">
          {CURATED_OUTFITS.map((outfit, index) => {
            const outfitProducts = allProducts.filter((p) => outfit.product_ids.includes(p.id));

            return (
              <div
                key={outfit.id}
                className="bg-white border border-canvas-border rounded-sm overflow-hidden p-6 sm:p-8 space-y-8 shadow-card"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-sm overflow-hidden bg-canvas-subtle">
                    <Image
                      src={outfit.hero_image}
                      alt={outfit.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-noir-900 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                      {outfit.occasion}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                      Look 0{index + 1}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium">
                      {outfit.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-noir-600 font-light leading-relaxed">
                      {outfit.description}
                    </p>

                    <div className="bg-canvas-subtle p-4 rounded-sm border border-canvas-border space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-noir-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                        <span>Artisan Styling Notes</span>
                      </p>
                      <ul className="text-xs text-noir-600 space-y-1.5">
                        {outfit.styling_tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gold-600 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Constituent Products */}
                {outfitProducts.length > 0 && (
                  <div className="pt-6 border-t border-canvas-subtle space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-noir-800">
                      Pieces in This Curated Look ({outfitProducts.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {outfitProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
