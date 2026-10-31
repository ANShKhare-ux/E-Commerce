"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchDialog } from "@/components/SearchDialog";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowRight,
  Flame,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

interface MegaMenuColumn {
  heading: string;
  items: { label: string; href: string }[];
}

interface NavCategory {
  id: string;
  label: string;
  href: string;
  borderClass: string;
  badge?: string;
  columns: MegaMenuColumn[];
  featuredCampaign?: {
    title: string;
    subtitle: string;
    image: string;
    href: string;
  };
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalCount, setIsOpen } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const profileTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Hover handlers with micro-debouncing to prevent flickering
  const handleNavMouseEnter = (catId: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMegaMenu(catId);
  };

  const handleNavMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 120);
  };

  const handleProfileMouseEnter = () => {
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 150);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      setSearchDialogOpen(true);
    }
  };

  // Navigation data aligned with website taxonomy:
  // Categories: MEN, WOMEN, UNISEX, COLLECTIONS
  const categories: NavCategory[] = [
    {
      id: "men",
      label: "MEN",
      href: "/category/mens-clothing",
      borderClass: "border-[#ee5f73]", // signature coral-orange hover indicator
      columns: [
        {
          heading: "Topwear & Tailoring",
          items: [
            { label: "All Men's Apparel", href: "/category/mens-clothing" },
            { label: "Supima Cotton T-Shirts", href: "/products?category=mens-clothing&sort=newest" },
            { label: "French Terry Hoodies", href: "/category/streetwear" },
            { label: "Tailored Linen Shirts", href: "/category/mens-clothing" },
            { label: "Heavyweight Boxy Fits", href: "/category/streetwear" },
          ],
        },
        {
          heading: "Bottomwear & Denim",
          items: [
            { label: "Pleated Gurkha Trousers", href: "/category/mens-clothing" },
            { label: "Parachute Ripstop Cargoes", href: "/products?category=streetwear&style=cargo" },
            { label: "Tailored Chinos & Trousers", href: "/category/mens-clothing" },
            { label: "Selvedge Denim", href: "/category/streetwear" },
            { label: "Relaxed Atelier Joggers", href: "/category/streetwear" },
          ],
        },
        {
          heading: "Indian Heritage",
          items: [
            { label: "Artisanal Silk Kurtas", href: "/category/ethnic-wear" },
            { label: "Handcrafted Nehru Bundis", href: "/category/ethnic-wear" },
            { label: "Zari Embroidered Bandhgalas", href: "/category/ethnic-wear" },
            { label: "Varanasi Silk Dupattas", href: "/category/ethnic-wear" },
          ],
        },
        {
          heading: "Accents & Edits",
          items: [
            { label: "Leather Wallets & Belts", href: "/category/accessories" },
            { label: "Signet Rings & Cufflinks", href: "/category/accessories" },
            { label: "Haute Horlogerie", href: "/category/premium-luxury" },
            { label: "Private Archive Deals", href: "/deals" },
          ],
        },
      ],
      featuredCampaign: {
        title: "District Zero Drop",
        subtitle: "450 GSM Heavyweight Terry",
        image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
        href: "/category/streetwear",
      },
    },
    {
      id: "women",
      label: "WOMEN",
      href: "/category/womens-clothing",
      borderClass: "border-[#fb56c1]", // signature fuchsia hover indicator
      columns: [
        {
          heading: "Indian & Festive",
          items: [
            { label: "All Women's Collection", href: "/category/womens-clothing" },
            { label: "Chanderi Anarkali Sets", href: "/category/ethnic-wear" },
            { label: "Varanasi Silk Sarees", href: "/category/ethnic-wear" },
            { label: "Hand Block Printed Kurtas", href: "/category/ethnic-wear" },
            { label: "Zari Kadhwa Dupattas", href: "/category/ethnic-wear" },
          ],
        },
        {
          heading: "Western Atelier",
          items: [
            { label: "Pure Linen Tunics & Slips", href: "/category/womens-clothing" },
            { label: "Wide-Leg Linen Trousers", href: "/category/womens-clothing" },
            { label: "Boxy Streetwear Tops", href: "/category/streetwear" },
            { label: "Mulberry Silk Shirts", href: "/category/womens-clothing" },
            { label: "Minimalist Trench Coats", href: "/category/womens-clothing" },
          ],
        },
        {
          heading: "Artisanal Edits",
          items: [
            { label: "Gulabi Rose Edition", href: "/category/ethnic-wear" },
            { label: "Monsoon Linen Drapes", href: "/collection/monsoon-minimalism" },
            { label: "Royal Rajasthan Heritage", href: "/collection/royal-rajasthan" },
            { label: "Haute Horlogerie & Edits", href: "/category/premium-luxury" },
          ],
        },
        {
          heading: "Bags & Footwear",
          items: [
            { label: "Handcrafted Leather Juttis", href: "/category/accessories" },
            { label: "Mulberry Silk Stoles", href: "/category/ethnic-wear" },
            { label: "Atelier Leather Clutches", href: "/category/accessories" },
            { label: "Curated Complete Looks", href: "/outfits" },
          ],
        },
      ],
      featuredCampaign: {
        title: "Royal Rajasthan Edit",
        subtitle: "Zari Kadhwa & Chanderi Silks",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
        href: "/category/ethnic-wear",
      },
    },
    {
      id: "unisex",
      label: "UNISEX",
      href: "/category/streetwear",
      borderClass: "border-[#03a685]", // signature teal-cyan hover indicator
      columns: [
        {
          heading: "Heavyweight Silhouettes",
          items: [
            { label: "All Unisex Silhouettes", href: "/category/streetwear" },
            { label: "450 GSM Boxy Hoodies", href: "/category/streetwear" },
            { label: "Drop-Shoulder 280 GSM Tees", href: "/category/streetwear" },
            { label: "Parachute Ripstop Cargoes", href: "/category/streetwear" },
            { label: "Acid Washed Sweats", href: "/category/streetwear" },
          ],
        },
        {
          heading: "Aesthetics & Textures",
          items: [
            { label: "Cyber-Noir Series", href: "/category/streetwear" },
            { label: "Ludhiana Flatbed Cotton", href: "/category/streetwear" },
            { label: "Vintage Mineral Wash", href: "/category/streetwear" },
            { label: "Raw Edge Distressed Knits", href: "/category/streetwear" },
          ],
        },
        {
          heading: "Genderless Accents",
          items: [
            { label: "Crossbody Utility Slings", href: "/category/accessories" },
            { label: "Atelier Cotton Caps", href: "/category/accessories" },
            { label: "Heavyweight Terry Socks", href: "/category/accessories" },
            { label: "Modular Canvas Bags", href: "/category/accessories" },
          ],
        },
        {
          heading: "Collections & Drops",
          items: [
            { label: "District Zero Streetwear", href: "/collection/tokyo-mumbai-street" },
            { label: "Monsoon Minimalism", href: "/collection/monsoon-minimalism" },
            { label: "Bestseller Silhouettes", href: "/products?badge=bestseller" },
            { label: "Curated Outfit Sets", href: "/outfits" },
          ],
        },
      ],
      featuredCampaign: {
        title: "Cyber-Noir Series",
        subtitle: "Custom-Milled Heavyweight Cotton",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
        href: "/category/streetwear",
      },
    },
    {
      id: "collections",
      label: "COLLECTIONS",
      href: "/products",
      borderClass: "border-[#C59B48]", // signature atelier gold hover indicator
      badge: "NEW",
      columns: [
        {
          heading: "Curated Editions",
          items: [
            { label: "Royal Rajasthan Heritage", href: "/collection/royal-rajasthan" },
            { label: "District Zero Streetwear", href: "/collection/tokyo-mumbai-street" },
            { label: "Monsoon Minimalism", href: "/collection/monsoon-minimalism" },
            { label: "Summer Supima Drop", href: "/products?sort=newest" },
            { label: "Private Archive Deals", href: "/deals" },
          ],
        },
        {
          heading: "Styling & Looks",
          items: [
            { label: "Complete Look Outfits", href: "/outfits" },
            { label: "Bestsellers Hall of Fame", href: "/products?badge=bestseller" },
            { label: "New Season Arrivals", href: "/products?sort=newest" },
            { label: "Limited Edition Releases", href: "/products" },
          ],
        },
        {
          heading: "Atelier Services",
          items: [
            { label: "Custom Fit & Tailoring", href: "/size-guide" },
            { label: "Track Delhivery Parcel", href: "/track-order" },
            { label: "Patron Account & Orders", href: "/account" },
            { label: "Atelier FAQ & Concierge", href: "/faq" },
          ],
        },
        {
          heading: "Exclusive Curations",
          items: [
            { label: "Hand-spun Chanderi Silks", href: "/category/ethnic-wear" },
            { label: "450 GSM Heavy French Terry", href: "/category/streetwear" },
            { label: "Swiss Automatic Timepieces", href: "/category/premium-luxury" },
            { label: "Gift Cards & Vouchers", href: "/faq" },
          ],
        },
      ],
      featuredCampaign: {
        title: "Curated Outfit Combinations",
        subtitle: "Head-to-Toe Royal & Urban Ensembles",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
        href: "/outfits",
      },
    },
  ];

  const currentMegaMenu = categories.find((cat) => cat.id === activeMegaMenu);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#eaeaec] shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all">
        {/* Main Navigation Bar (80px height, Myntra-style UI/UX) */}
        <div className="w-full px-4 sm:px-6 lg:px-10 max-w-[1680px] mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Left Section: Mobile Menu Button + Brand Logo + Nav Links */}
            <div className="flex items-center h-full">
              {/* Mobile Drawer Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 mr-2 text-[#282c3f] hover:text-[#C59B48] lg:hidden transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Brand Logo: Production Master Horizontal Lockup */}
              <Link
                href="/"
                className="flex items-center flex-shrink-0 mr-4 sm:mr-8 xl:mr-10 group"
                aria-label="LUMIÈRE Atelier Home"
              >
                <Image
                  src="/brand/lumiere-lockup-horizontal.svg"
                  alt="LUMIÈRE Atelier"
                  width={150}
                  height={48}
                  unoptimized
                  priority
                  className="h-10 sm:h-11 w-auto object-contain transition-opacity group-hover:opacity-90"
                />
              </Link>

              {/* Desktop Category Navigation Links */}
              <nav className="hidden lg:flex items-center h-full">
                {categories.map((cat) => {
                  const isActive = activeMegaMenu === cat.id;
                  return (
                    <div
                      key={cat.id}
                      className="h-full flex items-center relative"
                      onMouseEnter={() => handleNavMouseEnter(cat.id)}
                      onMouseLeave={handleNavMouseLeave}
                    >
                      <Link
                        href={cat.href}
                        className={`h-full flex items-center px-3.5 xl:px-4.5 text-[13px] xl:text-[14px] font-bold tracking-[0.3px] text-[#282c3f] uppercase transition-colors relative border-b-4 ${
                          isActive
                            ? `${cat.borderClass} text-black`
                            : "border-transparent hover:text-black"
                        }`}
                      >
                        <span>{cat.label}</span>
                        {cat.badge && (
                          <span className="text-[9px] font-bold text-[#ff3f6c] tracking-normal -mt-3.5 ml-1 leading-none uppercase">
                            {cat.badge}
                          </span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Center-Right Section: Wide Search Bar */}
            <div className="flex-1 max-w-[320px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[540px] mx-3 sm:mx-6 lg:mx-8">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <div className="flex items-center w-full h-10 px-3.5 bg-[#f5f5f6] hover:bg-[#ededef] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#C59B48] focus-within:border-[#C59B48] border border-transparent rounded transition-all">
                  <Search className="w-4 h-4 text-[#696e79] flex-shrink-0 mr-2.5" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, brands and more"
                    className="w-full bg-transparent text-[13px] text-[#282c3f] placeholder-[#696e79] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-[#696e79] hover:text-[#282c3f] p-1 flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Far Right Section: Stacked Actions (Profile, Wishlist, Bag) */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-7 h-full flex-shrink-0">
              {/* 1. Profile Action (Icon on top, Label on bottom, with hover flyout) */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={handleProfileMouseEnter}
                onMouseLeave={handleProfileMouseLeave}
              >
                <Link
                  href="/account"
                  className="flex flex-col items-center justify-center cursor-pointer group text-[#282c3f] hover:text-[#C59B48] transition-colors py-2 px-1"
                  aria-label="Patron Profile & Orders"
                >
                  <User className="w-5 h-5 text-[#282c3f] group-hover:text-[#C59B48] transition-colors stroke-[1.8]" />
                  <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2px] text-[#282c3f] group-hover:text-[#C59B48] transition-colors mt-0.5">
                    Profile
                  </span>
                </Link>

                {/* Profile Flyout Dropdown Card */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full right-0 w-72 bg-white rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#eaeaec] p-5 z-50 text-[#282c3f]"
                      onMouseEnter={handleProfileMouseEnter}
                      onMouseLeave={handleProfileMouseLeave}
                    >
                    <div className="pb-3 border-b border-[#eaeaec]">
                      <h4 className="text-[13px] font-bold text-[#282c3f]">
                        Welcome to LUMIÈRE
                      </h4>
                      <p className="text-[11px] text-[#696e79] mt-0.5 mb-3">
                        To access account & manage orders
                      </p>
                      <Link
                        href="/account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block w-full text-center py-2 px-3 border border-[#d4d5d9] hover:border-[#282c3f] text-[#282c3f] hover:text-[#C59B48] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                      >
                        Login / Sign Up
                      </Link>
                    </div>

                    <div className="pt-3 space-y-2 text-xs">
                      <Link
                        href="/account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block py-1 text-[#282c3f] hover:text-[#C59B48] font-medium transition-colors"
                      >
                        Orders & Returns
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block py-1 text-[#282c3f] hover:text-[#C59B48] font-medium transition-colors"
                      >
                        Saved Wishlist
                      </Link>
                      <Link
                        href="/track-order"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-between py-1 text-[#282c3f] hover:text-[#C59B48] font-medium transition-colors"
                      >
                        <span>Track Delhivery Parcel</span>
                        <Truck className="w-3.5 h-3.5 text-[#C59B48]" />
                      </Link>
                      <Link
                        href="/outfits"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-between py-1 text-[#282c3f] hover:text-[#C59B48] font-medium transition-colors"
                      >
                        <span>Curated Outfits</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#C59B48]" />
                      </Link>
                      <Link
                        href="/deals"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-between py-1 text-[#ee5f73] font-medium transition-colors"
                      >
                        <span>Private Archive Deals</span>
                        <Flame className="w-3.5 h-3.5 text-[#ee5f73]" />
                      </Link>

                      <div className="pt-2 border-t border-[#eaeaec]">
                        <Link
                          href="/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between py-1 text-[#696e79] hover:text-[#282c3f] font-semibold text-[11px] uppercase tracking-wider"
                        >
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#C59B48]" />
                            <span>Admin Control Room</span>
                          </span>
                          <ExternalLink className="w-3 h-3 text-[#696e79]" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>

              {/* 2. Wishlist Action (Icon on top, Label on bottom, with badge counter) */}
              <Link
                href="/wishlist"
                className="flex flex-col items-center justify-center cursor-pointer group text-[#282c3f] hover:text-[#C59B48] transition-colors py-2 px-1 relative"
                aria-label="View Saved Wishlist"
              >
                <div className="relative">
                  <Heart className="w-5 h-5 text-[#282c3f] group-hover:text-[#C59B48] transition-colors stroke-[1.8]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#ff3f6c] text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center shadow-sm">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2px] text-[#282c3f] group-hover:text-[#C59B48] transition-colors mt-0.5">
                  Wishlist
                </span>
              </Link>

              {/* 3. Bag Action (Icon on top, Label on bottom, with badge counter - Links to /cart) */}
              <Link
                href="/cart"
                className="flex flex-col items-center justify-center cursor-pointer group text-[#282c3f] hover:text-[#C59B48] transition-colors py-2 px-1 relative"
                aria-label="View Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#282c3f] group-hover:text-[#C59B48] transition-colors stroke-[1.8]" />
                  {totalCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#ff3f6c] text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center shadow-sm">
                      {totalCount > 99 ? "99+" : totalCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2px] text-[#282c3f] group-hover:text-[#C59B48] transition-colors mt-0.5">
                  Bag
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Mega-Menu Dropdown Panel (Desktop, animated fade-down) */}
        <AnimatePresence>
          {currentMegaMenu && (
            <motion.div
              key={currentMegaMenu.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-[#eaeaec] shadow-[0_12px_24px_rgba(0,0,0,0.08)] z-50"
              onMouseEnter={() => handleNavMouseEnter(currentMegaMenu.id)}
              onMouseLeave={handleNavMouseLeave}
            >
            <div className="max-w-[1600px] mx-auto px-10 py-8 grid grid-cols-12 gap-8">
              {/* Columns 1-4: Sub-category Links */}
              <div className="col-span-8 grid grid-cols-4 gap-6">
                {currentMegaMenu.columns.map((col, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.4px] text-[#282c3f] border-b border-[#f5f5f6] pb-1.5">
                      {col.heading}
                    </h4>
                    <ul className="space-y-1.5">
                      {col.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="text-[13px] text-[#696e79] hover:text-[#282c3f] hover:font-semibold transition-colors block py-0.5"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Column 5: Featured Campaign Visual Banner Card */}
              {currentMegaMenu.featuredCampaign && (
                <div className="col-span-4 pl-6 border-l border-[#f5f5f6]">
                  <Link
                    href={currentMegaMenu.featuredCampaign.href}
                    onClick={() => setActiveMegaMenu(null)}
                    className="group relative block aspect-[16/10] rounded-sm overflow-hidden bg-noir-900 border border-[#eaeaec] shadow-sm"
                  >
                    <Image
                      src={currentMegaMenu.featuredCampaign.image}
                      alt={currentMegaMenu.featuredCampaign.title}
                      fill
                      sizes="400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[9px] uppercase tracking-widest text-gold-300 block font-bold">
                        {currentMegaMenu.featuredCampaign.subtitle}
                      </span>
                      <h4 className="font-serif text-sm font-medium text-white group-hover:text-gold-200 transition-colors">
                        {currentMegaMenu.featuredCampaign.title}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-400 mt-1">
                        <span>Explore Drop</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* 4. Mobile Slide-Out Drawer (< 1024px, animated fade) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="lg:hidden border-t border-[#eaeaec] bg-white px-5 py-5 space-y-5 max-h-[85vh] overflow-y-auto"
            >
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="flex items-center w-full h-10 px-3 bg-[#f5f5f6] border border-transparent rounded">
                <Search className="w-4 h-4 text-[#696e79] mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more"
                  className="w-full bg-transparent text-xs text-[#282c3f] placeholder-[#696e79] focus:outline-none"
                />
              </div>
            </form>

            {/* Mobile Primary Category Links */}
            <div className="flex flex-col space-y-1 divide-y divide-[#f5f5f6]">
              {categories.map((cat) => (
                <div key={cat.id} className="pt-2">
                  <Link
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 flex items-center justify-between text-xs font-bold tracking-wider text-[#282c3f] uppercase hover:text-[#C59B48]"
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.label}</span>
                      {cat.badge && (
                        <span className="text-[9px] font-bold text-white bg-[#ff3f6c] px-1.5 py-0.5 rounded-full">
                          {cat.badge}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#94969f]" />
                  </Link>
                </div>
              ))}

              {/* Direct Highlight Links */}
              <div className="pt-2">
                <Link
                  href="/outfits"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 flex items-center justify-between text-xs font-bold text-[#C59B48] uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B48]" />
                    <span>Curated Outfits</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C59B48]" />
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  href="/deals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 flex items-center justify-between text-xs font-bold text-[#ee5f73] uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-[#ee5f73]" />
                    <span>Private Archive Deals</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ee5f73]" />
                </Link>
              </div>
            </div>

            {/* Account & Support Shortlinks */}
            <div className="pt-4 border-t border-[#eaeaec] space-y-2 text-xs text-[#282c3f]">
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 hover:text-[#C59B48] transition-colors"
              >
                <Truck className="w-4 h-4 text-[#C59B48]" />
                <span>Track Delhivery Courier Parcel</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 hover:text-[#C59B48] transition-colors"
              >
                <Heart className="w-4 h-4 text-[#ff3f6c]" />
                <span>Saved Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 hover:text-[#C59B48] transition-colors"
              >
                <User className="w-4 h-4 text-[#282c3f]" />
                <span>Patron Account & Orders</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 text-[#282c3f] font-bold"
              >
                <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
                <span>Private Admin Control Room</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>

      {/* Live Interactive Search Dialog */}
      <SearchDialog
        isOpen={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
      />
    </>
  );
}
