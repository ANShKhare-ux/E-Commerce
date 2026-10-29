import React from "react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, Tag } from "lucide-react";

export default async function DealsPage() {
  const dealProducts = await db.products.getAll({ isDeal: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-canvas-border pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase rounded-sm mb-3">
          <Tag className="w-3.5 h-3.5" />
          <span>Exclusive Festive Privileges</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Private Archive Deals & Reductions
        </h1>
        <p className="text-xs text-noir-500 font-light mt-1 max-w-xl">
          Verified price reductions on select limited run Chanderi sets, Italian knit polos, and seasonal outerwear. Authentic live stock allocations only.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
