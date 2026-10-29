"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Clock, ArrowRight, Sparkles, Loader2 } from "lucide-react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SuggestionProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category_slug: string;
  base_price: number;
  discount_price?: number;
  image_url?: string;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lumiere_recent_searches");
        if (saved) {
          setRecentSearches(JSON.parse(saved));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSuggestions([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search suggestions
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setCategories([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.products || []);
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error("Search suggestions failed", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("lumiere_recent_searches", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query);
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectRecent = (term: string) => {
    saveRecentSearch(term);
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white border border-canvas-border rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-canvas-border flex items-center p-4">
          <Search className="w-5 h-5 text-noir-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search designs, fabrics, streetwear, ethnic wear, or SKU..."
            className="w-full px-3 py-1.5 text-sm sm:text-base text-noir-900 placeholder-noir-400 focus:outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-gold-600 animate-spin shrink-0 mr-2" />}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-noir-400 hover:text-noir-700 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-wider text-noir-500 hover:text-noir-900 px-2 py-1 border border-canvas-border rounded-sm"
          >
            ESC
          </button>
        </form>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Category Suggestions */}
          {categories.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-noir-400 block">
                Matching Categories
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onClose();
                      router.push(`/category/${cat}`);
                    }}
                    className="px-3 py-1 bg-canvas-subtle hover:bg-noir-900 hover:text-white border border-canvas-border text-xs text-noir-800 rounded-full transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-gold-600" />
                    <span className="capitalize">{cat.replace(/-/g, " ")}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Suggestions */}
          {suggestions.length > 0 ? (
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-noir-400 block">
                Suggested Designs ({suggestions.length})
              </span>
              <div className="divide-y divide-canvas-border">
                {suggestions.map((product) => {
                  const price = product.discount_price ?? product.base_price;
                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => {
                        saveRecentSearch(product.name);
                        onClose();
                      }}
                      className="py-2.5 flex items-center gap-3.5 group hover:bg-canvas-subtle/50 px-2 rounded-sm transition-colors"
                    >
                      <div className="relative w-12 h-14 bg-canvas-subtle rounded-sm overflow-hidden shrink-0 border border-canvas-border">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full bg-noir-100 flex items-center justify-center text-noir-400">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase font-bold text-gold-600 block tracking-wider">
                          {product.brand}
                        </span>
                        <h4 className="font-serif text-xs sm:text-sm font-medium text-noir-900 truncate group-hover:text-gold-700 transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-sans text-xs font-bold text-noir-900">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                          {product.discount_price && (
                            <span className="text-[11px] text-noir-400 line-through">
                              ₹{product.base_price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-noir-300 group-hover:text-noir-900 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full py-2 text-center text-xs font-bold uppercase tracking-widest text-gold-700 hover:text-gold-900 bg-gold-50/50 rounded-sm hover:bg-gold-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View All Results for &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : query.trim().length >= 2 && !loading ? (
            <div className="py-8 text-center text-xs text-noir-500 space-y-2">
              <p>No designs match &ldquo;{query}&rdquo;.</p>
              <p className="text-[11px] text-noir-400">
                Try searching for broader terms like &ldquo;silk&rdquo;, &ldquo;hoodie&rdquo;, &ldquo;kurta&rdquo;, or &ldquo;oversized&rdquo;.
              </p>
            </div>
          ) : (
            /* Recent Searches & Discover Popular */
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-noir-400">
                    <span>Recent Searches</span>
                    <button
                      type="button"
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem("lumiere_recent_searches");
                      }}
                      className="hover:text-noir-800 lowercase font-normal"
                    >
                      clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectRecent(term)}
                        className="px-3 py-1 bg-canvas-subtle hover:bg-noir-900 hover:text-white border border-canvas-border text-xs text-noir-800 rounded-sm transition-colors flex items-center gap-1.5"
                      >
                        <Clock className="w-3 h-3 text-noir-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-noir-400 block">
                  Trending Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Chanderi Silk", "French Terry Hoodie", "Banarasi Kurta", "Gurkha Trousers", "Pashmina", "Streetwear"].map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectRecent(term)}
                      className="px-3 py-1 bg-white hover:bg-gold-600 hover:text-noir-900 border border-canvas-border text-xs text-noir-700 rounded-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
