import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

const COLLECTION_META: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    curatedNotes: string;
    banner: string;
  }
> = {
  "royal-rajasthan": {
    title: "Royal Heritage Edit",
    tagline: "Centuries of Grandeur, Woven for Today",
    description:
      "A tribute to royal Indian courts—featuring pure Varanasi brocades, hand-knotted Kutch bandhani, and handspun Chanderi silks crafted by master generational artisans.",
    curatedNotes:
      "Every piece in this collection is produced in strictly limited runs using traditional wooden pit-looms and certified gold/copper zari alloys.",
    banner:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80",
  },
  "monsoon-minimalism": {
    title: "Monsoon Minimalism",
    tagline: "Breezy Drape & Architectural Tailoring",
    description:
      "Engineered for subcontinental humidity. Fluid 220 GSM European organic flax linen, Japanese flatbed Supima knitwear, and lightweight tropical wool tailoring.",
    curatedNotes:
      "Pre-washed to resist shrinkage. Natural breathable fibers ensure complete comfort from morning meetings to evening open-air terraces.",
    banner:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
  },
  "tokyo-mumbai-street": {
    title: "District Zero Streetwear",
    tagline: "Cyber-Noir & Heavyweight Utility Drops",
    description:
      "Limited-edition luxury streetwear designed in Mumbai and knitted on custom flatbed machines in Ludhiana. Ultra-heavyweight 450 GSM terry and ripstop utility engineering.",
    curatedNotes:
      "Cut with wide dropped shoulders, boxy torso proportions, and double-layered seamless hoods designed to hold architectural shape.",
    banner:
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1600&q=80",
  },
  "streetwear-essentials": {
    title: "Streetwear Essentials",
    tagline: "Heavyweight Terry, Dropped Shoulders & Relaxed Cuts",
    description:
      "Modern oversized silhouettes, ribbed hems, and tactile fleece crafted from organic long-staple Indian cotton.",
    curatedNotes:
      "Engineered to hold form wash after wash without sagging or color degradation.",
    banner:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=80",
  },
  "everyday-fits": {
    title: "Everyday Fits",
    tagline: "Effortless Versatile Wardrobe Foundations",
    description:
      "Crisp Giza poplin shirts, pleated Gurkha trousers, and breathable linen shorts designed for effortless daily rotation.",
    curatedNotes:
      "Tailored for movement and ease across Indian urban climates.",
    banner:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
  },
  "premium-edit": {
    title: "The Premium Edit",
    tagline: "Silk Blends, Tailored Linen & GI Pashmina",
    description:
      "An elevated capsule showcasing master-woven textiles, horn buttons, and handcrafted heritage pieces.",
    curatedNotes:
      "Certified artisanal origin and individual provenance documentation included with every parcel.",
    banner:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=80",
  },
  "ethnic-edit": {
    title: "The Ethnic Edit",
    tagline: "Handloom Heritage Silhouettes for Festive Evenings",
    description:
      "Regal Bandhgalas, woven Zari Chanderi sarees, and delicate hand-block prints honoring subcontinental traditions.",
    curatedNotes:
      "Woven on generational wooden pit-looms across Varanasi and Bagru.",
    banner:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
  },
  "weekend-looks": {
    title: "Weekend Looks",
    tagline: "Casual Ease, Clean Lines & Contemporary Polish",
    description:
      "Relaxed resort shirts, fluid linen joggers, and understated statement pieces for leisurely hours.",
    curatedNotes:
      "Pre-shrunk and enzyme-washed for a soft touch right from the first wear.",
    banner:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1600&q=80",
  },
  "trending-now": {
    title: "Trending Now",
    tagline: "Most Desired Silhouettes Across India",
    description:
      "The fast-moving cuts, seasonal palettes, and contemporary statement pieces making waves across the atelier.",
    curatedNotes:
      "Live popularity insights reflecting confirmed client orders and seasonal demand.",
    banner:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  },
};

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const meta = COLLECTION_META[slug] || {
    title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    tagline: "LUMIÈRE Editorial Capsule",
    description: `Curated ${slug.replace("-", " ")} collection crafted with premium materials and contemporary tailoring.`,
    curatedNotes: "Crafted in strictly limited batches adhering to LUMIÈRE atelier standards.",
    banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
  };

  const products = await db.products.getAll({ collection: slug });

  return (
    <div className="space-y-12 pb-16">
      {/* Editorial Collection Hero Banner */}
      <section className="relative h-80 sm:h-[420px] w-full bg-noir-900 overflow-hidden flex items-center">
        <Image
          src={meta.banner}
          alt={meta.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-noir-900/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-600/30 border border-gold-400/40 backdrop-blur-md rounded-full text-gold-300 text-[10px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Curated Atelier Edition</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-canvas-light">
              {meta.title}
            </h1>
            <p className="text-sm font-medium text-gold-300 tracking-wider">
              {meta.tagline}
            </p>
            <p className="text-xs sm:text-sm text-noir-300 font-light leading-relaxed">
              {meta.description}
            </p>
          </div>
        </div>
      </section>

      {/* Curated Curator's Notes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-subtle border-l-4 border-gold-600 p-4 sm:p-6 rounded-r-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-noir-900 mb-1">
            Curator&apos;s Craft Note
          </h3>
          <p className="text-xs text-noir-600 leading-relaxed">
            {meta.curatedNotes}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between text-xs text-noir-500 border-b border-canvas-border pb-3">
          <span>
            Displaying {products.length} exclusive designs in this collection
          </span>
          <Link
            href="/outfits"
            className="text-gold-700 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Styled Outfits</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="py-16 text-center text-sm text-noir-500">
            No products currently active in this collection.
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
