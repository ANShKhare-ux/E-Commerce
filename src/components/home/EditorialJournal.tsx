import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';

const ARTICLES = [
  {
    title: 'The Architecture of Contemporary Tailoring',
    category: 'Style Notes',
    readTime: '4 min read',
    snippet:
      'Why double pleats, dropped shoulders, and relaxed drape have reclaimed the modern wardrobe from stiff, restrictive formalwear.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format',
    href: '/collections/everyday-essentials',
  },
  {
    title: 'Natural Fibers: The Art of Indian Khadi & European Linen',
    category: 'Material Focus',
    readTime: '5 min read',
    snippet:
      'Understanding the thermal properties, breathability, and ecological longevity of indigenous handspun cotton and European flax.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format',
    href: '/categories/shirts',
  },
  {
    title: 'Raw Selvedge Denim: A Living Garment',
    category: 'Craftsmanship',
    readTime: '3 min read',
    snippet:
      'From Okayama shuttle looms to personalized honeycombs: why untreated denim remains the purest investment in casual wear.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80&auto=format',
    href: '/categories/jeans',
  },
];

export function EditorialJournal() {
  return (
    <section className="py-16 sm:py-24 bg-[#F4F3EF] border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 border-b border-border pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              LUMIÈRE Style Journal
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-primary mt-1">
              Editorial Insights & Craftsmanship
            </h2>
          </div>
          <Link
            href="/about"
            className="text-xs uppercase tracking-widest font-medium text-primary hover:text-black flex items-center gap-1 group"
          >
            <span>Our Philosophy</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="bg-surface border border-border-subtle flex flex-col justify-between group hover:border-border transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-subtle">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted">
                    <span className="text-accent font-medium">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-primary group-hover:text-black transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-light line-clamp-3">
                    {article.snippet}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-subtle">
                  <Link
                    href={article.href}
                    className="text-xs uppercase tracking-widest font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Explore Curations</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
