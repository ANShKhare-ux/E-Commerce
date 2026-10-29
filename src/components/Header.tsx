"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Truck,
  Sparkles,
  User
} from "lucide-react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalCount, setIsOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-canvas-border transition-all">
      {/* 1. Announcement Bar */}
      <div className="bg-noir-900 text-canvas-light text-[11px] font-medium tracking-widest uppercase px-4 py-2 text-center flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-gold-400">
          <Sparkles className="w-3.5 h-3.5" />
          The Festive Edit 2025
        </span>
        <span className="hidden sm:inline text-noir-500">•</span>
        <span className="hidden sm:inline">Complimentary Express Courier Across India Above ₹2,999</span>
        <span className="hidden md:inline text-noir-500">•</span>
        <span className="hidden md:inline text-gold-300">Delhivery Express Dispatch</span>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-noir-900 hover:text-gold-600 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Wordmark */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-noir-900 font-bold uppercase block transition-colors group-hover:text-gold-600">
                LUMIÈRE
              </span>
              <span className="text-[9px] tracking-[0.35em] text-noir-500 uppercase block font-sans -mt-1">
                Atelier • India
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium tracking-widest uppercase text-noir-800">
            <Link href="/category/ethnic-wear" className="hover:text-gold-600 transition-colors py-1">
              Ethnic Wear
            </Link>
            <Link href="/category/womens-clothing" className="hover:text-gold-600 transition-colors py-1">
              Women
            </Link>
            <Link href="/category/mens-clothing" className="hover:text-gold-600 transition-colors py-1">
              Men
            </Link>
            <Link href="/category/streetwear" className="hover:text-gold-600 transition-colors py-1">
              Streetwear
            </Link>
            <Link href="/category/premium-luxury" className="hover:text-gold-600 transition-colors py-1">
              Luxury
            </Link>
            <Link href="/outfits" className="text-gold-600 hover:text-gold-700 transition-colors py-1 flex items-center gap-1 font-semibold">
              Curated Looks
            </Link>
            <Link href="/deals" className="text-red-700 hover:text-red-800 transition-colors py-1 font-semibold">
              Deals
            </Link>
          </nav>

          {/* Header Action Tools */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-noir-900">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-gold-600 transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Track Order Direct Link */}
            <Link
              href="/track-order"
              className="hidden sm:flex items-center gap-1 text-[11px] font-medium tracking-wider uppercase hover:text-gold-600 transition-colors text-noir-600"
              title="Track Delhivery parcel"
            >
              <Truck className="w-4 h-4" />
              <span>Track</span>
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 relative hover:text-gold-600 transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account / Patron Profile Link */}
            <Link
              href="/account"
              className="p-2 hover:text-gold-600 transition-colors"
              aria-label="Patron Account & Orders"
              title="Account & Orders"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Shopping Bag / Cart Drawer Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 relative hover:text-gold-600 transition-colors"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-noir-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Admin Control Room Link */}
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest border border-noir-300 rounded hover:border-noir-900 transition-colors text-noir-700"
              title="Private Owner Control Room"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="border-t border-canvas-border bg-canvas-subtle p-4 transition-all">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by silk, bandhani, linen, hoodie, brand..."
              className="flex-1 bg-white border border-canvas-border px-4 py-2.5 text-sm focus:outline-none focus:border-noir-900 text-noir-900"
              autoFocus
            />
            <button
              type="submit"
              className="bg-noir-900 text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-gold-600 transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-2 text-noir-500 hover:text-noir-900"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-canvas-border bg-white px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wider uppercase text-noir-800">
            <Link
              href="/category/ethnic-wear"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle hover:text-gold-600"
            >
              Ethnic Wear
            </Link>
            <Link
              href="/category/womens-clothing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle hover:text-gold-600"
            >
              Women's Clothing
            </Link>
            <Link
              href="/category/mens-clothing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle hover:text-gold-600"
            >
              Men's Clothing
            </Link>
            <Link
              href="/category/streetwear"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle hover:text-gold-600"
            >
              Streetwear
            </Link>
            <Link
              href="/category/premium-luxury"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle hover:text-gold-600"
            >
              Premium & Luxury
            </Link>
            <Link
              href="/outfits"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle text-gold-600 font-semibold"
            >
              Curated Outfits
            </Link>
            <Link
              href="/deals"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle text-red-700 font-semibold"
            >
              Exclusive Deals
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-gold-600" />
              <span>Track Delhivery Order</span>
            </Link>
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-canvas-subtle flex items-center gap-2"
            >
              <User className="w-4 h-4 text-gold-600" />
              <span>Patron Account & Orders</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-noir-900 font-bold flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Private Admin Control Room</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
