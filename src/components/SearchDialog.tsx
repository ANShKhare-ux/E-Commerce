"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight, Sparkles, Loader2, Tag, ChevronRight } from "lucide-react";
import { modalDialogVariant, fadeIn, LUXURY_EASE, useSafeReducedMotion } from "@/lib/motion";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
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

/**
 * Text highlight component for highlighting matched search queries
 */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <span
            key={index}
            className="text-gold-700 font-bold underline decoration-gold-400 decoration-1"
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export function SearchDialog({ isOpen, onClose, initialQuery = "" }: SearchDialogProps) {
  const router = useRouter();
  const shouldReduceMotion = useSafeReducedMotion();
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Total navigable items count: categories + suggestions
  const totalNavigableItems = categories.length + suggestions.length;

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lumiere_recent_searches");
        if (saved) {
          setRecentSearches(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load recent searches", e);
      }
    }
  }, []);

  // Update query if initialQuery changes
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setLoading(false);
    }
  }, [isOpen]);

  const saveRecentSearch = useCallback((term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const updated = [clean, ...prev.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem("lumiere_recent_searches", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save recent search", e);
      }
      return updated;
    });
  }, []);

  const handleSearchSubmit = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query);
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }, [query, saveRecentSearch, onClose, router]);

  const handleSelectProduct = useCallback((product: SuggestionProduct) => {
    saveRecentSearch(product.name);
    onClose();
    router.push(`/products/${product.slug}`);
  }, [saveRecentSearch, onClose, router]);

  const handleSelectCategory = useCallback((categorySlug: string) => {
    saveRecentSearch(categorySlug);
    onClose();
    router.push(`/category/${categorySlug}`);
  }, [saveRecentSearch, onClose, router]);

  const handleSelectRecent = useCallback((term: string) => {
    saveRecentSearch(term);
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }, [saveRecentSearch, onClose, router]);

  // Debounced search with AbortController cancellation for stale requests
  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setSuggestions([]);
      setCategories([]);
      setLoading(false);
      setSelectedIndex(-1);
      return;
    }

    setLoading(true);
    setSelectedIndex(-1);

    const timer = setTimeout(async () => {
      // Cancel previous in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Search request failed");

        const data = await res.json();
        if (data.success) {
          setSuggestions(data.products || []);
          setCategories(data.categories || []);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Search suggestions failed", err);
        }
      } finally {
        if (abortControllerRef.current === controller) {
          setLoading(false);
        }
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation: ArrowDown, ArrowUp, Enter, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (totalNavigableItems > 0 ? (prev + 1) % totalNavigableItems : -1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          totalNavigableItems > 0 ? (prev <= 0 ? totalNavigableItems - 1 : prev - 1) : -1
        );
        return;
      }

      if (e.key === "Enter") {
        if (selectedIndex >= 0) {
          e.preventDefault();
          if (selectedIndex < categories.length) {
            handleSelectCategory(categories[selectedIndex]);
          } else {
            const productIndex = selectedIndex - categories.length;
            if (suggestions[productIndex]) {
              handleSelectProduct(suggestions[productIndex]);
            }
          }
        } else {
          handleSearchSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    selectedIndex,
    totalNavigableItems,
    categories,
    suggestions,
    handleSelectCategory,
    handleSelectProduct,
    handleSearchSubmit,
    onClose,
  ]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-dialog-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search Catalog"
          className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4"
        >
          {/* Backdrop */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            variants={shouldReduceMotion ? fadeIn : modalDialogVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl bg-white border border-canvas-border rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[82vh] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative border-b border-canvas-border flex items-center p-3.5 sm:p-4 bg-canvas-light/50"
            >
              <Search className="w-5 h-5 text-noir-400 shrink-0 ml-1" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search designs, fabrics, streetwear, ethnic wear, or SKU..."
                role="combobox"
                aria-expanded={isOpen}
                aria-autocomplete="list"
                aria-controls="search-suggestions-list"
                className="w-full px-3 py-1.5 text-sm sm:text-base text-noir-900 placeholder-noir-400 focus:outline-none bg-transparent"
              />

              {loading && <Loader2 className="w-4 h-4 text-gold-600 animate-spin shrink-0 mr-2" />}

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-noir-400 hover:text-noir-700 mr-1 rounded transition-colors"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="text-[11px] font-semibold uppercase tracking-wider text-noir-500 hover:text-noir-900 px-2 py-1 border border-canvas-border rounded-sm transition-colors"
                aria-label="Close search dialog"
              >
                ESC
              </button>
            </form>

            {/* Content Area */}
            <div
              ref={listContainerRef}
              id="search-suggestions-list"
              className="overflow-y-auto p-4 sm:p-6 space-y-6"
            >
              {/* Quick Category Suggestions */}
              {categories.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-noir-400 block">
                    Matching Categories
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat, idx) => {
                      const isHighlighted = selectedIndex === idx;
                      return (
                        <motion.button
                          key={cat}
                          type="button"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.22, delay: idx * 0.03, ease: LUXURY_EASE }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleSelectCategory(cat)}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors duration-200 flex items-center gap-1.5 ${
                            isHighlighted
                              ? "bg-noir-900 text-white border-noir-900"
                              : "bg-canvas-subtle hover:bg-noir-900 hover:text-white border-canvas-border text-noir-800"
                          }`}
                        >
                          <Tag className="w-3 h-3 text-gold-500" />
                          <span className="capitalize">
                            <HighlightMatch text={cat.replace(/-/g, " ")} query={query} />
                          </span>
                        </motion.button>
                      );
                    })}
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
                    {suggestions.map((product, idx) => {
                      const isHighlighted = selectedIndex === categories.length + idx;
                      const price = product.discount_price ?? product.base_price;
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.24, delay: Math.min(idx * 0.03, 0.2), ease: LUXURY_EASE }}
                          onClick={() => handleSelectProduct(product)}
                          className={`py-2.5 flex items-center gap-3.5 group px-2.5 rounded-sm transition-all duration-200 cursor-pointer ${
                            isHighlighted
                              ? "bg-gold-50/80 border-l-2 border-gold-600 pl-3"
                              : "hover:bg-canvas-subtle/70"
                          }`}
                        >
                          <div className="relative w-12 h-14 bg-canvas-subtle rounded-sm overflow-hidden shrink-0 border border-canvas-border">
                            {product.image_url ? (
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                              />
                            ) : (
                              <div className="w-full h-full bg-noir-100 flex items-center justify-center text-noir-400">
                                <Sparkles className="w-4 h-4" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] uppercase font-bold text-gold-600 block tracking-wider">
                              <HighlightMatch text={product.brand} query={query} />
                            </span>
                            <h4 className="font-serif text-xs sm:text-sm font-medium text-noir-900 truncate group-hover:text-gold-700 transition-colors duration-200">
                              <HighlightMatch text={product.name} query={query} />
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

                          <ArrowRight
                            className={`w-4 h-4 transition-all duration-200 ${
                              isHighlighted
                                ? "text-noir-900 translate-x-1"
                                : "text-noir-300 group-hover:text-noir-900 group-hover:translate-x-1"
                            }`}
                          />
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-widest text-gold-700 hover:text-gold-900 bg-gold-50/60 rounded-sm hover:bg-gold-100/70 transition-colors flex items-center justify-center gap-1.5 border border-gold-200/60"
                    >
                      <span>View All Results for &ldquo;{query}&rdquo;</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : query.trim().length >= 2 && !loading ? (
                <div className="py-8 text-center text-xs text-noir-600 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto mb-2 border border-gold-200">
                    <Search className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-noir-900">
                    No artisanal designs found matching &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-[11px] text-noir-500 max-w-sm mx-auto">
                    Try searching for broader textiles and styles such as &ldquo;Banarasi Silk&rdquo;, &ldquo;Chanderi&rdquo;, &ldquo;450 GSM Hoodie&rdquo;, &ldquo;Gurkha&rdquo;, or &ldquo;Streetwear&rdquo;.
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
                          <motion.button
                            key={term}
                            type="button"
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ duration: 0.18, ease: LUXURY_EASE }}
                            onClick={() => handleSelectRecent(term)}
                            className="px-3 py-1 bg-canvas-subtle hover:bg-noir-900 hover:text-white border border-canvas-border text-xs text-noir-800 rounded-sm transition-colors duration-200 flex items-center gap-1.5"
                          >
                            <Clock className="w-3 h-3 text-noir-400" />
                            <span>{term}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-noir-400 block">
                      Trending Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Chanderi Silk",
                        "French Terry Hoodie",
                        "Banarasi Kurta",
                        "Gurkha Trousers",
                        "Pashmina",
                        "Streetwear",
                        "Bandhgala",
                      ].map((term) => (
                        <motion.button
                          key={term}
                          type="button"
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ duration: 0.18, ease: LUXURY_EASE }}
                          onClick={() => handleSelectRecent(term)}
                          className="px-3 py-1 bg-white hover:bg-gold-600 hover:text-noir-900 border border-canvas-border text-xs text-noir-700 rounded-sm transition-colors duration-200 shadow-2xs"
                        >
                          {term}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchDialog;
