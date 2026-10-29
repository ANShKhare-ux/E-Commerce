import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { CURATED_OUTFITS } from "@/data/products";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  RefreshCw,
  CheckCircle,
  ExternalLink,
  Flame,
  Layers,
  ChevronRight,
  Compass
} from "lucide-react";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const homepageConfig = await db.homepage.get();
  const hero = homepageConfig.hero;

  const newArrivals = await db.products.getAll({ sort: "newest" });
  const bestsellers = await db.products.getAll({ sort: "rating" });
  const dealProducts = await db.products.getAll({ isDeal: true });

  const categoryTiles = [
    {
      title: "Shop Men",
      subtitle: "Tailoring, Hoodies & Gurkhas",
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
      href: "/category/mens-clothing",
    },
    {
      title: "Shop Women",
      subtitle: "Silks, Anarkalis & Linens",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      href: "/category/womens-clothing",
    },
    {
      title: "Shop Unisex",
      subtitle: "Drop-Shoulder Boxy Fits",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
      href: "/category/streetwear",
    },
    {
      title: "Streetwear",
      subtitle: "450 GSM Heavyweight Terry",
      image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80",
      href: "/category/streetwear",
    },
    {
      title: "Ethnic Wear",
      subtitle: "Chanderi & Banarasi Brocades",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      href: "/category/ethnic-wear",
    },
    {
      title: "Accessories & Horlogerie",
      subtitle: "Pashmina Shawls & Curations",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      href: "/category/premium-luxury",
    },
  ];

  const styleDiscovery = [
    { name: "Minimal", desc: "Clean lines & unadorned tailoring", href: "/products?style=minimal", tag: "Atelier" },
    { name: "Streetwear", desc: "Boxy 450 GSM terry drops", href: "/category/streetwear", tag: "District Zero" },
    { name: "Oversized", desc: "Wide dropped shoulders & loose drapes", href: "/products?style=oversized", tag: "Contemporary" },
    { name: "Ethnic", desc: "Hand-spun Chanderi & Kadhwa silk", href: "/category/ethnic-wear", tag: "Heirloom" },
    { name: "Casual", desc: "Fluid organic flax linens", href: "/collection/monsoon-minimalism", tag: "Everyday" },
    { name: "Premium", desc: "Mulberry silks & Changthangi wool", href: "/category/premium-luxury", tag: "Haute" },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO CAMPAIGN SECTION (Configurable via Admin) */}
      <section className="relative h-[85vh] min-h-[580px] w-full bg-noir-900 overflow-hidden flex items-center">
        <Image
          src={hero.image_url || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=85"}
          alt="LUMIÈRE Campaign Hero"
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
              <span>{hero.badge_text}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] font-light text-canvas-light">
              {hero.headline_line1} <br />
              <span className="italic font-normal text-gold-300">{hero.headline_line2}</span>
            </h1>

            <p className="text-sm sm:text-base text-noir-300 max-w-lg font-light leading-relaxed">
              {hero.subheading}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href={hero.primary_button_link || "/category/ethnic-wear"}
                className="bg-gold-600 hover:bg-gold-500 text-noir-900 px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-luxury flex items-center gap-2 shadow-subtle"
              >
                <span>{hero.primary_button_text || "Explore Collection"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={hero.secondary_button_link || "/outfits"}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-luxury backdrop-blur-sm"
              >
                {hero.secondary_button_text || "Curated Looks"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS & INDIA COMMERCE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 bg-white border border-canvas-border rounded-sm shadow-subtle">
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <Truck className="w-6 h-6 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">Delhivery Express</h4>
            <p className="text-[11px] text-noir-500">2–4 business days delivery across 19,000+ Indian pincodes.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <ShieldCheck className="w-6 h-6 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">100% Authentic Apparel</h4>
            <p className="text-[11px] text-noir-500">Handloom silks & custom 450 GSM terry cotton milled in India.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <RefreshCw className="w-6 h-6 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">7-Day Inspected Return</h4>
            <p className="text-[11px] text-noir-500">Reverse pickups with physical verification and condition sign-off.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <CheckCircle className="w-6 h-6 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">Cash on Delivery & UPI</h4>
            <p className="text-[11px] text-noir-500">Flexible payments with instant UPI (PhonePe, Google Pay), and Cash on Delivery options.</p>
          </div>
        </div>
      </section>

      {/* 3. VISUAL CATEGORY TILES (Inspired by Bonkers Corner & Atelier Luxury) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-canvas-border pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
              Category Discovery
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium tracking-wide">
              Shop by Department
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-widest text-noir-700 hover:text-gold-600 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>Explore All Atelier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryTiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group relative h-72 rounded-sm overflow-hidden bg-noir-900 border border-canvas-border shadow-xs"
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[9px] uppercase tracking-widest text-gold-300 block font-sans">
                  {tile.subtitle}
                </span>
                <h3 className="font-serif text-base font-medium group-hover:text-gold-200 transition-colors">
                  {tile.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. NEW ARRIVALS (With Real Products & Quick Add) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-canvas-border pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
              Fresh Off The Loom & Flatbed
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium tracking-wide">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/products?sort=newest"
            className="text-xs font-bold uppercase tracking-widest text-noir-700 hover:text-gold-600 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14 px-6 border border-dashed border-canvas-border rounded-sm bg-canvas-subtle/50 space-y-3">
            <Sparkles className="w-6 h-6 text-gold-600 mx-auto" />
            <h3 className="font-serif text-lg text-noir-900 font-medium">New Collections in Production</h3>
            <p className="text-xs text-noir-500 max-w-md mx-auto leading-relaxed">
              LUMIÈRE avoids synthetic stock placeholders. New garments are created via the Private Admin Control Room or synced via verified feeds.
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

      {/* 5. EDITORIAL CAMPAIGN BANNERS (Streetwear & Royal Rajasthan) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {homepageConfig.campaigns.slice(0, 2).map((camp) => (
            <div
              key={camp.id}
              className="relative h-96 rounded-sm overflow-hidden group border border-canvas-border shadow-subtle flex items-end"
            >
              <Image
                src={camp.image_url}
                alt={camp.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-900/90 via-noir-900/40 to-transparent" />
              <div className="relative p-6 sm:p-8 space-y-3 text-white z-10">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold-400 block">
                  {camp.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  {camp.title}
                </h3>
                <p className="text-xs text-noir-300 font-light max-w-md leading-relaxed">
                  {camp.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={camp.link}
                    className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-500 text-noir-900 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm transition-colors"
                  >
                    <span>{camp.cta_text || "Explore Collection"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BESTSELLERS & CURATED EDITS */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-canvas-border pb-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
                Most Desired Across India
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium tracking-wide">
                Bestsellers & High Ratings
              </h2>
            </div>
            <Link
              href="/products?sort=rating"
              className="text-xs font-bold uppercase tracking-widest text-noir-700 hover:text-gold-600 flex items-center gap-1 mt-2 sm:mt-0"
            >
              <span>View All Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 7. SHOP BY STYLE (Bonkers Corner Style-Discovery Matrix) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block">
            Aesthetic Matrix
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium">
            Shop by Style
          </h2>
          <p className="text-xs text-noir-500 font-light">
            Filter your wardrobe by distinct fashion silhouettes and craft philosophies.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {styleDiscovery.map((style) => (
            <Link
              key={style.name}
              href={style.href}
              className="group p-5 bg-white border border-canvas-border rounded-sm hover:border-gold-600 hover:shadow-subtle transition-all text-center space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full inline-block mb-2">
                  {style.tag}
                </span>
                <h4 className="font-serif text-base font-bold text-noir-900 group-hover:text-gold-700 transition-colors">
                  {style.name}
                </h4>
                <p className="text-[11px] text-noir-400 font-light mt-1">
                  {style.desc}
                </p>
              </div>
              <div className="pt-2 text-[10px] uppercase font-bold text-noir-600 group-hover:text-gold-600 flex items-center justify-center gap-1">
                <span>Browse</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. COMPLETE THE LOOK / CURATED OUTFIT EDITS */}
      {CURATED_OUTFITS.length > 0 && (
        <section className="bg-noir-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-400 block">
                Editorial Styling
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

      {/* 9. RECENTLY VIEWED PRODUCTS (Client Persistence) */}
      <RecentlyViewed />

      {/* 10. SEASONAL ARCHIVE DEALS */}
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

      {/* 11. BRAND STORY & ARTISANAL WEAVING HERITAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-canvas-border rounded-sm overflow-hidden shadow-subtle p-8 sm:p-12">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block">
              The LUMIÈRE Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
              Centuries of Indian Weaving Craft, Reimagined for Modern Life
            </h2>
            <p className="text-xs sm:text-sm text-noir-600 font-light leading-relaxed">
              Founded at the intersection of Indian handloom textile heritage and modern streetwear culture, LUMIÈRE honors master weavers from Varanasi, Chanderi, and Bagru. We pair 450 GSM boxy flatbed streetwear with gossamer mulberry silks and organic flax linens — dispatched directly from our central Mumbai hub to over 19,000 PIN codes across India.
            </p>
            <div className="pt-2 flex flex-wrap gap-8 text-xs text-noir-700">
              <div>
                <strong className="text-noir-900 block font-serif text-xl font-bold">100%</strong>
                <span className="text-noir-500 text-[11px] uppercase tracking-wider">Authentic Handlooms</span>
              </div>
              <div>
                <strong className="text-noir-900 block font-serif text-xl font-bold">450 GSM</strong>
                <span className="text-noir-500 text-[11px] uppercase tracking-wider">Heavyweight Terry</span>
              </div>
              <div>
                <strong className="text-noir-900 block font-serif text-xl font-bold">19,000+</strong>
                <span className="text-noir-500 text-[11px] uppercase tracking-wider">PIN Codes Served</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-gold-900 hover:underline"
              >
                <span>Read Our Artisanal Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-sm overflow-hidden border border-canvas-border">
            <Image
              src="https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80"
              alt="LUMIÈRE Master Artisan Handloom"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 12. TRANSPARENT AFFILIATE DISCLOSURE */}
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
