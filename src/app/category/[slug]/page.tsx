import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_META: Record<string, { title: string; subtitle: string; description: string; banner: string }> = {
  "ethnic-wear": {
    title: "Artisanal Ethnic Wear",
    subtitle: "Chanderi Silks, Bandhani & Zari Kadhwa Weaves",
    description: "Centuries of royal Indian handloom heritage woven into contemporary heirloom silhouettes. Hand block printed in Bagru and tailored in Varanasi.",
    banner: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
  },
  "womens-clothing": {
    title: "Contemporary Women's Atelier",
    subtitle: "European Flax Linens & Mulberry Slip Silks",
    description: "Effortless resort silhouettes and tailored drape coats created for humid subcontinental summers and evenings.",
    banner: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
  },
  "mens-clothing": {
    title: "Men's Tailoring & Leisure",
    subtitle: "Gurkha Trousers, Supima Knits & Khadi Silk Bandhgalas",
    description: "Modern bespoke sartorial tailoring combining British military cuts with indigenous handspun Indian textiles.",
    banner: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1600&q=80",
  },
  streetwear: {
    title: "District Zero Streetwear",
    subtitle: "450 GSM Heavyweight Terry & Tactical Parachute Ripstop",
    description: "Cyber-noir silhouettes crafted from custom-milled combed cotton in Ludhiana. Engineered for Mumbai and Delhi nights.",
    banner: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=80",
  },
  "premium-luxury": {
    title: "Haute Horlogerie & Luxury Edits",
    subtitle: "GI-Certified Changthangi Pashmina & Partner Discoveries",
    description: "Master artisan shawls woven over months in Kashmir, alongside verified external curations from Tata CLiQ Luxury and Ajio Luxe.",
    banner: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=80",
  },
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];

  if (!meta) {
    notFound();
  }

  const products = await db.products.getAll({ category: slug });

  return (
    <div className="space-y-12 pb-16">
      {/* Category Banner */}
      <section className="relative h-72 sm:h-96 w-full bg-noir-900 overflow-hidden flex items-center">
        <Image
          src={meta.banner}
          alt={meta.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-noir-900/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-400 block mb-2">
            {meta.subtitle}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-canvas-light">
            {meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-noir-300 max-w-xl font-light mt-2 leading-relaxed">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between text-xs text-noir-500 border-b border-canvas-border pb-3">
          <span>Showing {products.length} designs in {meta.title}</span>
          <Link href="/products" className="text-gold-700 font-bold hover:underline">
            View All Categories →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-canvas-border rounded-sm space-y-3">
            <h3 className="font-serif text-lg font-medium text-noir-900">
              No Designs Published Yet
            </h3>
            <p className="text-xs text-noir-500 max-w-md mx-auto leading-relaxed">
              We never display fake inventory cards. Genuine items for {meta.title} are added via the Private Admin Control Room or synced from authorized partners.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-block bg-noir-900 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm hover:bg-gold-600 transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
