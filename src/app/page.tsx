import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CURATED_OUTFITS } from "@/data/products";
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RefreshCw, 
  CheckCircle,
  ExternalLink
} from "lucide-react";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const featuredProducts = await db.products.getAll({ sort: "newest" });
  const dealProducts = await db.products.getAll({ isDeal: true });

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO EDITORIAL SECTION */}
      <section className="relative h-[85vh] min-h-[580px] w-full bg-noir-900 overflow-hidden flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=85"
          alt="LUMIÈRE Royal Heritage Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-noir-900/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-600/30 border border-gold-500/40 backdrop-blur-md rounded-full text-gold-300 text-[11px] font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Autumn / Winter Festive Edit 2025</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] font-light text-canvas-light">
              Where Royal Heritage <br />
              <span className="italic font-normal text-gold-300">Meets Modern Poise</span>
            </h1>

            <p className="text-sm sm:text-base text-noir-300 max-w-lg font-light leading-relaxed">
              Hand-spun Chanderi silks, 450 GSM boxy streetwear drops, and verified external luxury curations. Dispatched from Mumbai across India.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/category/ethnic-wear"
                className="bg-gold-600 hover:bg-gold-500 text-noir-900 px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-luxury flex items-center gap-2 shadow-subtle"
              >
                <span>Explore Ethnic Wear</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/outfits"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-luxury backdrop-blur-sm"
              >
                Curated Looks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS & INDIA MARKET TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 bg-white border border-canvas-border rounded-sm shadow-subtle">
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <Truck className="w-6 h-6 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">Delhivery Express</h4>
            <p className="text-[11px] text-noir-500">2–4 business days delivery across 19,000+ Indian pincodes.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <ShieldCheck className="w-6 h-6 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">100% Authentic Handloom</h4>
            <p className="text-[11px] text-noir-500">Woven by GI-certified master weavers in Chanderi, Kutch & Varanasi.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <RefreshCw className="w-6 h-6 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">7-Day Return Inspection</h4>
            <p className="text-[11px] text-noir-500">Hassle-free reverse pickups with rigorous physical inspection.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <CheckCircle className="w-6 h-6 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">Cash on Delivery & UPI</h4>
            <p className="text-[11px] text-noir-500">Flexible payments with instant PhonePe, Google Pay (GPay) and COD options.</p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-canvas-border pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
              Atelier Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium tracking-wide">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-widest text-noir-700 hover:text-gold-600 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>View All Atelier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              slug: "ethnic-wear",
              title: "Ethnic Wear",
              subtitle: "Silks & Gota Patti",
              image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
            },
            {
              slug: "womens-clothing",
              title: "Women's Clothing",
              subtitle: "Pure Linens & Slip Silks",
              image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            },
            {
              slug: "mens-clothing",
              title: "Men's Tailoring",
              subtitle: "Supima Polos & Gurkhas",
              image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
            },
            {
              slug: "streetwear",
              title: "Streetwear",
              subtitle: "450 GSM Heavyweight Drop",
              image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
            },
            {
              slug: "premium-luxury",
              title: "Premium & Luxury",
              subtitle: "Pashmina & External Curations",
              image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
            },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative h-80 rounded-sm overflow-hidden bg-noir-900 border border-canvas-border"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 100vw, 20vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-widest text-gold-300 block">
                  {cat.subtitle}
                </span>
                <h3 className="font-serif text-lg font-medium group-hover:text-gold-200 transition-colors">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-canvas-border pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
              Curated Selection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium tracking-wide">
              Featured New Arrivals
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-widest text-noir-700 hover:text-gold-600 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14 px-6 border border-dashed border-canvas-border rounded-sm bg-canvas-subtle/50 space-y-3">
            <Sparkles className="w-6 h-6 text-gold-600 mx-auto" />
            <h3 className="font-serif text-lg text-noir-900 font-medium">Atelier Inventory in Preparation</h3>
            <p className="text-xs text-noir-500 max-w-md mx-auto leading-relaxed">
              LUMIÈRE never generates fake product cards or artificial stock. Live garments are published through the Private Admin Control Room or synced via verified partner feeds.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-1.5 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm transition-colors"
              >
                <span>Add Product in Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 5. CURATED OUTFIT EDITS (Complete Look Combinations) */}
      {CURATED_OUTFITS.length > 0 && (
        <section className="bg-noir-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-400 block">
                Style Discovery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-canvas-light">
                Curated Outfit Combinations
              </h2>
              <p className="text-xs sm:text-sm text-noir-400 font-light">
                Complete looks styled by our creative directors for royal ceremonies, South Mumbai leisure, and urban street culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CURATED_OUTFITS.map((outfit) => (
                <div
                  key={outfit.id}
                  className="bg-noir-800 border border-noir-700 rounded-sm overflow-hidden flex flex-col group hover:border-gold-500/50 transition-colors"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={outfit.hero_image}
                      alt={outfit.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-noir-900/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-gold-300 px-2.5 py-1 rounded-sm">
                      {outfit.occasion}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-white mb-2">
                        {outfit.title}
                      </h3>
                      <p className="text-xs text-noir-400 font-light leading-relaxed line-clamp-3">
                        {outfit.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-noir-700">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                        Styling Notes:
                      </p>
                      <ul className="text-[11px] text-noir-300 space-y-1 font-light">
                        {outfit.styling_tips.slice(0, 2).map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-gold-500">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/outfits`}
                      className="mt-2 text-xs font-bold uppercase tracking-widest text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                    >
                      <span>Explore Complete Ensemble</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. EXCLUSIVE DEALS CAROUSEL */}
      {dealProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-canvas-border pb-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-700 block mb-1">
                Seasonal Reductions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium tracking-wide">
                Private Archive Deals
              </h2>
            </div>
            <Link
              href="/deals"
              className="text-xs font-bold uppercase tracking-widest text-red-700 hover:text-red-800 flex items-center gap-1 mt-2 sm:mt-0"
            >
              <span>View All Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dealProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 7. TRANSPARENT AFFILIATE DISCLOSURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-gold-50 border border-gold-200 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold-800 font-bold text-xs uppercase tracking-wider">
              <ExternalLink className="w-4 h-4 text-gold-700" />
              <span>Affiliate & Curated Discovery Disclosure</span>
            </div>
            <p className="text-xs text-gold-900 font-light max-w-2xl leading-relaxed">
              LUMIÈRE stocks and dispatches its own atelier creations directly from Mumbai. To provide our clientele with a complete fashion wardrobe, we also curate verified third-party luxury pieces from authorized retailers like Tata CLiQ Luxury, Ajio Luxe, and Myntra Luxe. External affiliate products are clearly labeled on every card and redirect directly to official partners.
            </p>
          </div>
          <Link
            href="/affiliate-disclosure"
            className="shrink-0 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-luxury transition-colors"
          >
            Read Full Disclosure
          </Link>
        </div>
      </section>
    </div>
  );
}
