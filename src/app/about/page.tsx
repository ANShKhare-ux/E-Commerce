import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="relative h-96 w-full bg-noir-900 flex items-center justify-center text-center px-4">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80"
          alt="Artisan loom in Chanderi"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="relative z-10 max-w-2xl text-white space-y-3">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-400 block">
            Our Provenance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light">
            The Atelier of Indian Renaissance
          </h1>
          <p className="text-xs sm:text-sm text-noir-300 font-light leading-relaxed">
            Founded in Mumbai to celebrate the breathtaking geometry of indigenous Indian textiles through modern architectural tailoring.
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 text-sm leading-relaxed text-noir-700">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-noir-900 font-medium">
            Bridging Heritage Looms and Modern Silhouette
          </h2>
          <p>
            LUMIÈRE was conceived not as another fast-fashion label, but as an enduring sanctuary for master craftsmanship across India. Our journey begins in the historic weaver colonies of Chanderi (Madhya Pradesh), the pit looms of Varanasi (Uttar Pradesh), the Kutch salt desert (Gujarat), and the Changthang high-altitude plateaus of Ladakh.
          </p>
          <p>
            Each garment represents an unbroken lineage of master weavers whose families have preserved zari techniques, hand-block Bagru printing, and delicate bugdi borders across generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white border border-canvas-border rounded-sm">
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-noir-900">Direct Artisan Guilds</h3>
            <p className="text-xs text-noir-500">We work directly with GI-registered weaver clusters, ensuring equitable wages and heritage protection.</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-noir-900">Zero Compromise Fabrics</h3>
            <p className="text-xs text-noir-500">Every yard of silk is tested for purity; our cotton is 100% Giza or long-staple Supima.</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-noir-900">Verified Curations</h3>
            <p className="text-xs text-noir-500">We partner with luxury retailers like Tata CLiQ Luxury to offer a comprehensive, trusted wardrobe.</p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-noir-900 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors rounded-luxury shadow-subtle"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
