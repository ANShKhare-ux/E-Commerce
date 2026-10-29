"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { SearchDialog } from "@/components/SearchDialog";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ShieldCheck,
  Truck,
  Sparkles,
  User,
  ChevronDown,
  ArrowRight,
  Flame,
  Tag
} from "lucide-react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalCount, setIsOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const megaMenuData: Record<
    string,
    {
      title: string;
      categories: { label: string; href: string }[];
      trending: { label: string; href: string }[];
      featuredCampaign: { title: string; subtitle: string; image: string; href: string };
    }
  > = {
    men: {
      title: "Men's Atelier",
      categories: [
        { label: "All Men's Apparel", href: "/category/mens-clothing" },
        { label: "Oversized & Graphic Tees", href: "/products?category=mens-clothing&style=oversized" },
        { label: "French Terry Hoodies", href: "/category/streetwear" },
        { label: "Tailored Shirts & Linens", href: "/category/mens-clothing" },
        { label: "Cargo Pants & Joggers", href: "/products?category=streetwear&style=cargo" },
        { label: "Gurkha & Pleated Trousers", href: "/category/mens-clothing" },
        { label: "Ethnic Kurtas & Bundis", href: "/category/ethnic-wear" },
      ],
      trending: [
        { label: "Heavyweight Boxy Fits", href: "/category/streetwear" },
        { label: "Supima Cotton Knits", href: "/category/mens-clothing" },
        { label: "Mulberry Silk Kurtas", href: "/category/ethnic-wear" },
      ],
      featuredCampaign: {
        title: "District Zero Drop",
        subtitle: "450 GSM Heavyweight Terry",
        image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
        href: "/category/streetwear",
      },
    },
    women: {
      title: "Women's Atelier",
      categories: [
        { label: "All Women's Collection", href: "/category/womens-clothing" },
        { label: "Chanderi Anarkali Sets", href: "/category/ethnic-wear" },
        { label: "Pure Linen Tunics & Slips", href: "/category/womens-clothing" },
        { label: "Boxy Streetwear Tops", href: "/category/streetwear" },
        { label: "Varanasi Silk Dupattas", href: "/category/ethnic-wear" },
        { label: "Wide-Leg Linen Trousers", href: "/category/womens-clothing" },
        { label: "Haute Horlogerie & Edits", href: "/category/premium-luxury" },
      ],
      trending: [
        { label: "Gulabi Rose Anarkalis", href: "/category/ethnic-wear" },
        { label: "Monsoon Linen Drapes", href: "/collection/monsoon-minimalism" },
        { label: "Hand Block Prints", href: "/category/ethnic-wear" },
      ],
      featuredCampaign: {
        title: "Royal Rajasthan Edit",
        subtitle: "Zari Kadhwa & Chanderi Silks",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
        href: "/category/ethnic-wear",
      },
    },
    unisex: {
      title: "Unisex & Streetwear",
      categories: [
        { label: "All Unisex Silhouettes", href: "/category/streetwear" },
        { label: "450 GSM Boxy Hoodies", href: "/category/streetwear" },
        { label: "Drop-Shoulder Oversized Tees", href: "/category/streetwear" },
        { label: "Parachute Ripstop Cargoes", href: "/category/streetwear" },
        { label: "Acid Wash & Cyber-Noir", href: "/category/streetwear" },
      ],
      trending: [
        { label: "Ludhiana Flatbed Cotton", href: "/category/streetwear" },
        { label: "Oversized Noir Silhouettes", href: "/category/streetwear" },
      ],
      featuredCampaign: {
        title: "Cyber-Noir Series",
        subtitle: "Custom-Milled Heavyweight Cotton",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
        href: "/category/streetwear",
      },
    },
    collections: {
      title: "Curated Collections",
      categories: [
        { label: "Royal Rajasthan Edit", href: "/collection/royal-rajasthan" },
        { label: "District Zero Streetwear", href: "/collection/tokyo-mumbai-street" },
        { label: "Monsoon Minimalism", href: "/collection/monsoon-minimalism" },
        { label: "Private Archive Deals", href: "/deals" },
        { label: "Complete Look Outfits", href: "/outfits" },
      ],
      trending: [
        { label: "Festive Drop 2025", href: "/collection/royal-rajasthan" },
        { label: "Luxury Horlogerie", href: "/category/premium-luxury" },
      ],
      featuredCampaign: {
        title: "Curated Outfit Combinations",
        subtitle: "Head-to-toe Royal & Urban Ensembles",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
        href: "/outfits",
      },
    },
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-canvas-border transition-all">
        {/* 1. Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Drawer Button */}
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

            {/* Desktop Navigation Links with Mega-Menu Hover Triggers */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium tracking-widest uppercase text-noir-800 h-full">
              {/* Men with Mega Menu */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu("men")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/category/mens-clothing"
                  className={`py-2 transition-colors flex items-center gap-1 ${
                    activeMegaMenu === "men" ? "text-gold-600 font-bold" : "hover:text-gold-600"
                  }`}
                >
                  <span>Men</span>
                  <ChevronDown className="w-3 h-3 text-noir-400" />
                </Link>
              </div>

              {/* Women with Mega Menu */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu("women")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/category/womens-clothing"
                  className={`py-2 transition-colors flex items-center gap-1 ${
                    activeMegaMenu === "women" ? "text-gold-600 font-bold" : "hover:text-gold-600"
                  }`}
                >
                  <span>Women</span>
                  <ChevronDown className="w-3 h-3 text-noir-400" />
                </Link>
              </div>

              {/* Unisex with Mega Menu */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu("unisex")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/category/streetwear"
                  className={`py-2 transition-colors flex items-center gap-1 ${
                    activeMegaMenu === "unisex" ? "text-gold-600 font-bold" : "hover:text-gold-600"
                  }`}
                >
                  <span>Unisex</span>
                  <ChevronDown className="w-3 h-3 text-noir-400" />
                </Link>
              </div>

              {/* New Arrivals direct */}
              <Link
                href="/products?sort=newest"
                className="hover:text-gold-600 transition-colors py-2"
              >
                New Arrivals
              </Link>

              {/* Bestsellers direct */}
              <Link
                href="/products?badge=bestseller"
                className="hover:text-gold-600 transition-colors py-2"
              >
                Bestsellers
              </Link>

              {/* Collections with Mega Menu */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu("collections")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/products"
                  className={`py-2 transition-colors flex items-center gap-1 ${
                    activeMegaMenu === "collections" ? "text-gold-600 font-bold" : "hover:text-gold-600"
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3 h-3 text-noir-400" />
                </Link>
              </div>

              {/* Accessories direct */}
              <Link
                href="/category/accessories"
                className="hover:text-gold-600 transition-colors py-2"
              >
                Accessories
              </Link>

              {/* Curated Looks */}
              <Link
                href="/outfits"
                className="text-gold-600 hover:text-gold-700 transition-colors py-2 flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3 h-3 text-gold-500" />
                <span>Looks</span>
              </Link>

              {/* Deals / Sale */}
              <Link
                href="/deals"
                className="text-red-700 hover:text-red-800 transition-colors py-2 flex items-center gap-1 font-semibold"
              >
                <Flame className="w-3 h-3 text-red-600" />
                <span>Sale</span>
              </Link>
            </nav>

            {/* Header Action Tools */}
            <div className="flex items-center space-x-3 sm:space-x-5 text-noir-900">
              {/* Search Trigger (Opens live search dialog) */}
              <button
                onClick={() => setSearchDialogOpen(true)}
                className="p-2 hover:text-gold-600 transition-colors flex items-center gap-1.5"
                aria-label="Search collection"
                title="Search collection (or press /)"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:inline text-[11px] font-sans text-noir-400 uppercase tracking-wider">
                  Search
                </span>
              </button>

              {/* Track Order Direct Link */}
              <Link
                href="/track-order"
                className="hidden md:flex items-center gap-1 text-[11px] font-medium tracking-wider uppercase hover:text-gold-600 transition-colors text-noir-600"
                title="Track Delhivery courier parcel"
              >
                <Truck className="w-4 h-4 text-gold-600" />
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
                className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest border border-noir-300 rounded hover:border-noir-900 transition-colors text-noir-700"
                title="Private Owner Control Room"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Mega-Menu Dropdown Panel (Desktop) */}
        {activeMegaMenu && megaMenuData[activeMegaMenu] && (
          <div
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-canvas-border shadow-xl transition-all"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
              {/* Col 1: Categories */}
              <div className="col-span-5 space-y-3">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold-600 block">
                  {megaMenuData[activeMegaMenu].title}
                </span>
                <ul className="space-y-2 text-xs">
                  {megaMenuData[activeMegaMenu].categories.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-noir-800 hover:text-gold-700 font-medium transition-colors block py-1"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2: Trending & Curations */}
              <div className="col-span-3 space-y-3 border-l border-canvas-border pl-6">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-noir-400 block">
                  Trending Now
                </span>
                <ul className="space-y-2 text-xs">
                  {megaMenuData[activeMegaMenu].trending.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-noir-600 hover:text-noir-900 flex items-center gap-1.5 transition-colors py-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link
                    href="/products"
                    onClick={() => setActiveMegaMenu(null)}
                    className="text-xs font-bold uppercase tracking-wider text-gold-700 hover:underline flex items-center gap-1"
                  >
                    <span>View Full Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Col 3: Visual Campaign Banner */}
              <div className="col-span-4 pl-4">
                <Link
                  href={megaMenuData[activeMegaMenu].featuredCampaign.href}
                  onClick={() => setActiveMegaMenu(null)}
                  className="group relative block aspect-[16/10] rounded-sm overflow-hidden bg-noir-900 border border-canvas-border"
                >
                  <Image
                    src={megaMenuData[activeMegaMenu].featuredCampaign.image}
                    alt={megaMenuData[activeMegaMenu].featuredCampaign.title}
                    fill
                    sizes="350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900/90 via-noir-900/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[9px] uppercase tracking-widest text-gold-300 block font-bold">
                      {megaMenuData[activeMegaMenu].featuredCampaign.subtitle}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-white group-hover:text-gold-200 transition-colors">
                      {megaMenuData[activeMegaMenu].featuredCampaign.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-400 mt-1">
                      <span>Explore Feature</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4. Mobile Slide-Out Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-canvas-border bg-white px-6 py-6 space-y-6 max-h-[85vh] overflow-y-auto">
            {/* Mobile Search Input */}
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchDialogOpen(true);
              }}
              className="flex items-center gap-2 p-3 bg-canvas-subtle border border-canvas-border rounded-sm text-xs text-noir-500 cursor-pointer"
            >
              <Search className="w-4 h-4 text-noir-400" />
              <span>Search clothing, fabrics, streetwear...</span>
            </div>

            {/* Category Navigation Links */}
            <div className="flex flex-col space-y-3 text-sm font-medium tracking-wider uppercase text-noir-900 divide-y divide-canvas-subtle">
              <Link
                href="/products?sort=newest"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between text-gold-700 font-bold"
              >
                <span>New Arrivals</span>
                <ArrowRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link
                href="/products?badge=bestseller"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between hover:text-gold-600"
              >
                <span>Bestsellers</span>
                <ArrowRight className="w-4 h-4 text-noir-400" />
              </Link>
              <Link
                href="/category/mens-clothing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between hover:text-gold-600"
              >
                <span>Men&apos;s Tailoring</span>
                <ArrowRight className="w-4 h-4 text-noir-400" />
              </Link>
              <Link
                href="/category/womens-clothing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between hover:text-gold-600"
              >
                <span>Women&apos;s Collection</span>
                <ArrowRight className="w-4 h-4 text-noir-400" />
              </Link>
              <Link
                href="/category/streetwear"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between hover:text-gold-600"
              >
                <span>Unisex & Streetwear (450 GSM)</span>
                <ArrowRight className="w-4 h-4 text-noir-400" />
              </Link>
              <Link
                href="/category/ethnic-wear"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between hover:text-gold-600"
              >
                <span>Artisanal Ethnic Wear</span>
                <ArrowRight className="w-4 h-4 text-noir-400" />
              </Link>
              <Link
                href="/category/accessories"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between hover:text-gold-600"
              >
                <span>Accessories & Horlogerie</span>
                <ArrowRight className="w-4 h-4 text-noir-400" />
              </Link>
              <Link
                href="/category/premium-luxury"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between hover:text-gold-600"
              >
                <span>Haute Horlogerie & Luxury</span>
                <ArrowRight className="w-4 h-4 text-noir-400" />
              </Link>
              <Link
                href="/outfits"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between text-gold-700 font-bold"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <span>Curated Outfits</span>
                </span>
                <ArrowRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link
                href="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 flex items-center justify-between text-red-700 font-bold"
              >
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>Private Archive Deals</span>
                </span>
                <ArrowRight className="w-4 h-4 text-red-600" />
              </Link>
            </div>

            {/* Account & Support Shortlinks */}
            <div className="pt-4 border-t border-canvas-border space-y-2 text-xs text-noir-700">
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 hover:text-gold-600 transition-colors"
              >
                <Truck className="w-4 h-4 text-gold-600" />
                <span>Track Delhivery Courier Parcel</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 hover:text-gold-600 transition-colors"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Saved Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 hover:text-gold-600 transition-colors"
              >
                <User className="w-4 h-4 text-gold-600" />
                <span>Patron Account & Orders</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-noir-900 font-bold"
              >
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>Private Admin Control Room</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Live Interactive Search Dialog */}
      <SearchDialog
        isOpen={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
      />
    </>
  );
}
