'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Shop All', href: '/shop' },
  { label: "Men's", href: '/shop?audience=men' },
  { label: "Women's", href: '/shop?audience=women' },
  { label: 'Categories', href: '/categories' },
  { label: 'Collections', href: '/collections' },
  { label: 'Under ₹999', href: '/collections/under-999' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // Close menus on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-border-subtle transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-primary hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Wordmark */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link
              href="/"
              className="inline-flex flex-col items-center lg:items-start group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm py-1"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-light text-primary group-hover:text-black transition-colors">
                LUMIÈRE
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-muted -mt-1 font-sans">
                Atelier Fashion
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors py-2 relative ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Items */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-primary hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
              aria-label={searchOpen ? 'Close search bar' : 'Open search bar'}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-primary text-xs uppercase tracking-[0.15em] font-medium text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Explore Shop
            </Link>
          </div>
        </div>

        {/* Search Bar Drawer */}
        {searchOpen && (
          <div className="py-4 border-t border-border-subtle animate-in fade-in slide-in-from-top-2 duration-150">
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search linen shirts, selvedge denim, dresses, budget under ₹999..."
                className="w-full pl-10 pr-24 py-2.5 text-sm bg-surface border border-border focus:border-primary focus:outline-none rounded-none placeholder:text-muted/60"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-[calc(5rem+1px)] bottom-0 bg-[#FAF9F6] border-t border-border z-50 flex flex-col justify-between overflow-y-auto p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clothing..."
                className="w-full pl-10 pr-20 py-2.5 text-sm bg-white border border-border focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary text-white text-xs uppercase tracking-wider"
              >
                Go
              </button>
            </form>

            <nav className="flex flex-col divide-y divide-border-subtle" aria-label="Mobile links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3.5 text-sm uppercase tracking-widest font-medium text-primary hover:text-black flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-border-subtle space-y-3 text-xs text-muted">
            <p>
              Curated fashion affiliate discovery. Purchases completed directly at retailer.
            </p>
            <div className="flex gap-4">
              <Link href="/affiliate-disclosure" className="underline hover:text-primary">
                Affiliate Disclosure
              </Link>
              <Link href="/contact" className="underline hover:text-primary">
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
