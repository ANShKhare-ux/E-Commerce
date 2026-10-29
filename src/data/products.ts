// =============================================================================
// LUMIÈRE - Catalog Repository Configuration
// Live product inventory is strictly authentic and never contains fake cards.
// Products are published via the Private Admin Control Room or synced via
// verified affiliate partner feeds.
// =============================================================================

import { Product, CuratedOutfit, AffiliateProduct } from "@/types";

// -----------------------------------------------------------------------------
// LIVE STOREFRONT INVENTORY
// Starts strictly empty by default. Fake products, invented prices, and fake
// ratings are never presented as genuine live inventory.
// Real products are created via the Private Admin Control Room (/admin/products)
// or imported via verified partner feeds (/admin/affiliate).
// -----------------------------------------------------------------------------
export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_INVENTORY: Record<
  string,
  { physical_stock: number; reserved_stock: number; low_stock_threshold: number }
> = {};

export const CURATED_OUTFITS: CuratedOutfit[] = [];

export const INITIAL_AFFILIATE_QUEUE: AffiliateProduct[] = [];

// =============================================================================
// AUTOMATED TEST SUITE FIXTURES ONLY
// Clearly labeled development fixtures used exclusively inside Vitest test runners
// (tests/inventory.test.ts, tests/checkout.test.ts, etc.) to verify reservation
// concurrency, payment verification, and order lifecycles.
// =============================================================================
export const TEST_FIXTURE_PRODUCTS: Product[] = [
  {
    id: "prod-eth-01",
    slug: "chanderi-silk-anarkali-set-gulabi",
    name: "Gulabi Chanderi Silk Anarkali Set",
    brand: "LUMIÈRE Atelier",
    category_slug: "ethnic-wear",
    collection_slug: "royal-rajasthan",
    description: "Handcrafted 3-piece Chanderi silk anarkali set.",
    fabric_care: "100% Chanderi Silk with Mulmul Cotton lining. Dry clean only.",
    origin: "Chanderi, Madhya Pradesh",
    is_affiliate: false,
    base_price: 6990,
    discount_price: 6990,
    is_deal: true,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-eth-01-1", product_id: "prod-eth-01", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80", alt_text: "Chanderi Anarkali", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-eth-01-s-rose", product_id: "prod-eth-01", sku: "LUM-ETH-GUL-S-ROSE", color: "Dusty Rose", color_hex: "#DCAE96", size: "S", price: 6990, compare_at_price: 8490, weight_grams: 650, is_active: true },
      { id: "var-eth-01-m-rose", product_id: "prod-eth-01", sku: "LUM-ETH-GUL-M-ROSE", color: "Dusty Rose", color_hex: "#DCAE96", size: "M", price: 6990, compare_at_price: 8490, weight_grams: 650, is_active: true },
    ],
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-01-15T10:00:00Z",
  },
  {
    id: "prod-eth-02",
    slug: "banarasi-kadhwa-raw-silk-kurta-emerald",
    name: "Emerald Zari Kadhwa Silk Kurta",
    brand: "LUMIÈRE Royal",
    category_slug: "ethnic-wear",
    collection_slug: "royal-rajasthan",
    description: "Pure mulberry silk kurta with copper gold zari.",
    fabric_care: "Pure Mulberry & Raw Silk. Dry clean only.",
    origin: "Varanasi, Uttar Pradesh",
    is_affiliate: false,
    base_price: 12900,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-eth-02-1", product_id: "prod-eth-02", url: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1000&q=80", alt_text: "Emerald Zari Kurta", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-eth-02-m-grn", product_id: "prod-eth-02", sku: "LUM-ETH-EMR-M-GRN", color: "Imperial Emerald", color_hex: "#1A4437", size: "M", price: 12900, weight_grams: 800, is_active: true },
    ],
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-01-15T10:00:00Z",
  },
  {
    id: "prod-str-01",
    slug: "oversized-french-terry-hoodie-noir",
    name: "Heavyweight French Terry Oversized Hoodie",
    brand: "LUMIÈRE Street",
    category_slug: "streetwear",
    collection_slug: "tokyo-mumbai-street",
    description: "450 GSM French Terry boxy hoodie.",
    fabric_care: "100% Combed Indian Cotton. Cold wash inside out.",
    origin: "Ludhiana, Punjab",
    is_affiliate: false,
    base_price: 4490,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-str-01-1", product_id: "prod-str-01", url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80", alt_text: "Noir Hoodie Front", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-str-01-s-blk", product_id: "prod-str-01", sku: "LUM-STR-HD1-S-BLK", color: "Washed Noir", color_hex: "#1E1E20", size: "S", price: 4490, weight_grams: 850, is_active: true },
      { id: "var-str-01-m-blk", product_id: "prod-str-01", sku: "LUM-STR-HD1-M-BLK", color: "Washed Noir", color_hex: "#1E1E20", size: "M", price: 4490, weight_grams: 850, is_active: true },
      { id: "var-str-01-l-blk", product_id: "prod-str-01", sku: "LUM-STR-HD1-L-BLK", color: "Washed Noir", color_hex: "#1E1E20", size: "L", price: 4490, weight_grams: 850, is_active: true },
    ],
    created_at: "2025-01-20T10:00:00Z",
    updated_at: "2025-01-20T10:00:00Z",
  },
  {
    id: "prod-wom-01",
    slug: "italian-linen-summer-trench-coat",
    name: "Organic Flax Relaxed Trench Coat",
    brand: "LUMIÈRE Studio",
    category_slug: "womens-clothing",
    collection_slug: "monsoon-minimalism",
    description: "Relaxed summer trench crafted from breathable organic flax linen.",
    fabric_care: "100% Pure Organic Linen. Dry clean or gentle hand wash.",
    origin: "Bengaluru, Karnataka",
    is_affiliate: false,
    base_price: 11490,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-wom-01-1", product_id: "prod-wom-01", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80", alt_text: "Ivory Linen Trench", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-wom-01-s-ivo", product_id: "prod-wom-01", sku: "LUM-WOM-TRN-S-IVO", color: "Oatmeal Ivory", color_hex: "#E5DEC9", size: "S", price: 11490, weight_grams: 720, is_active: true },
    ],
    created_at: "2025-01-16T10:00:00Z",
    updated_at: "2025-01-16T10:00:00Z",
  },
  {
    id: "prod-wom-02",
    slug: "mulberry-silk-cowl-slip-dress",
    name: "Mulberry Silk Cowl Slip Dress",
    brand: "LUMIÈRE Studio",
    category_slug: "womens-clothing",
    collection_slug: "monsoon-minimalism",
    description: "19-momme pure mulberry silk bias-cut slip dress.",
    fabric_care: "100% Pure Silk. Dry clean only.",
    origin: "Bengaluru, Karnataka",
    is_affiliate: false,
    base_price: 8900,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-wom-02-1", product_id: "prod-wom-02", url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80", alt_text: "Silk Slip Dress", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-wom-02-s-blk", product_id: "prod-wom-02", sku: "LUM-WOM-SLP-S-BLK", color: "Midnight Noir", color_hex: "#101012", size: "S", price: 8900, weight_grams: 350, is_active: true },
    ],
    created_at: "2025-01-17T10:00:00Z",
    updated_at: "2025-01-17T10:00:00Z",
  },
  {
    id: "prod-men-01",
    slug: "supima-cotton-knit-polo-sand",
    name: "Supima Cotton Structured Knit Polo",
    brand: "LUMIÈRE Bespoke",
    category_slug: "mens-clothing",
    collection_slug: "monsoon-minimalism",
    description: "Flat-knit polo knitted from long-staple Indian Supima cotton.",
    fabric_care: "100% Supima Cotton. Machine wash delicate.",
    origin: "Coimbatore, Tamil Nadu",
    is_affiliate: false,
    base_price: 3690,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-men-01-1", product_id: "prod-men-01", url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80", alt_text: "Knit Polo Front", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-men-01-s-snd", product_id: "prod-men-01", sku: "LUM-MEN-POL-S-SND", color: "Desert Sand", color_hex: "#D2B596", size: "S", price: 3690, weight_grams: 320, is_active: true },
    ],
    created_at: "2025-01-18T10:00:00Z",
    updated_at: "2025-01-18T10:00:00Z",
  },
  {
    id: "prod-men-02",
    slug: "handloom-cotton-gurkha-trousers",
    name: "Handloom Cotton Double-Pleated Gurkha Trousers",
    brand: "LUMIÈRE Bespoke",
    category_slug: "mens-clothing",
    collection_slug: "monsoon-minimalism",
    description: "High-waisted double pleated Gurkha trousers with solid brass buckles.",
    fabric_care: "100% Handloom Cotton. Dry clean recommended.",
    origin: "Jaipur, Rajasthan",
    is_affiliate: false,
    base_price: 5490,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-men-02-1", product_id: "prod-men-02", url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80", alt_text: "Gurkha Trousers", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-men-02-m-olv", product_id: "prod-men-02", sku: "LUM-MEN-GRK-M-OLV", color: "British Olive", color_hex: "#4B5320", size: "M", price: 5490, weight_grams: 580, is_active: true },
    ],
    created_at: "2025-01-18T10:00:00Z",
    updated_at: "2025-01-18T10:00:00Z",
  },
  {
    id: "prod-lux-01",
    slug: "hand-woven-zari-velvet-cape",
    name: "Zari Velvet Atelier Cape",
    brand: "LUMIÈRE Privé",
    category_slug: "premium-luxury",
    collection_slug: "royal-rajasthan",
    description: "Limited run velvet cape with handcrafted bullion embroidery.",
    fabric_care: "Micro-velvet and mulberry silk. Professional dry clean.",
    origin: "Jaipur, Rajasthan",
    is_affiliate: false,
    base_price: 24900,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-lux-01-1", product_id: "prod-lux-01", url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80", alt_text: "Velvet Cape Front", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-lux-01-m-gld", product_id: "prod-lux-01", sku: "LUM-LUX-CAP-M-GLD", color: "Antique Gold", color_hex: "#BFA15F", size: "M", price: 24900, weight_grams: 950, is_active: true },
    ],
    created_at: "2025-01-10T10:00:00Z",
    updated_at: "2025-01-10T10:00:00Z",
  },
  {
    id: "prod-lux-02",
    slug: "pure-zari-kanjivaram-silk-saree-ivory",
    name: "Kanchipuram Heritage Gold Zari Saree",
    brand: "LUMIÈRE Heritage",
    category_slug: "ethnic-wear",
    collection_slug: "royal-rajasthan",
    description: "Kanchipuram silk saree handwoven with pure zari borders.",
    fabric_care: "100% Pure Mulberry Silk. Dry clean only. Preserve in muslin.",
    origin: "Kanchipuram, Tamil Nadu",
    is_affiliate: false,
    base_price: 48500,
    rating: 0,
    review_count: 0,
    status: "active",
    images: [
      { id: "img-lux-02-1", product_id: "prod-lux-02", url: "https://images.unsplash.com/photo-1610030469668-932d8a0c2018?auto=format&fit=crop&w=1000&q=80", alt_text: "Kanchipuram Silk Saree", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-lux-02-fs-ivo", product_id: "prod-lux-02", sku: "LUM-LUX-KAN-FS-IVO", color: "Pearl Ivory & Gold", color_hex: "#FFF8E7", size: "Free Size", price: 48500, weight_grams: 900, is_active: true },
    ],
    created_at: "2025-01-12T10:00:00Z",
    updated_at: "2025-01-12T10:00:00Z",
  },
];

export const TEST_FIXTURE_INVENTORY: Record<
  string,
  { physical_stock: number; reserved_stock: number; low_stock_threshold: number }
> = {
  "LUM-ETH-GUL-S-ROSE": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-ETH-GUL-M-ROSE": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-ETH-EMR-M-GRN": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-STR-HD1-S-BLK": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-HD1-M-BLK": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-HD1-L-BLK": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-TRN-S-IVO": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 2 },
  "LUM-WOM-SLP-S-BLK": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 2 },
  "LUM-MEN-POL-S-SND": { physical_stock: 12, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-MEN-GRK-M-OLV": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-LUX-CAP-M-GLD": { physical_stock: 2, reserved_stock: 0, low_stock_threshold: 3 }, // physical_stock (2) <= low_stock_threshold (3)
  "LUM-LUX-KAN-FS-IVO": { physical_stock: 5, reserved_stock: 0, low_stock_threshold: 1 },
};

export const TEST_FIXTURE_AFFILIATE_QUEUE: AffiliateProduct[] = [
  {
    id: "aff-test-01",
    source_name: "Tata CLiQ Luxury",
    external_id: "TCL-TEST-001",
    title: "Luxury Leather Minaudière",
    brand: "Partner Brand",
    category_name: "Luxury Accessories",
    original_price: 35000,
    image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80",
    destination_url: "https://luxury.tatacliq.com/test-item",
    affiliate_tracking_url: "https://luxury.tatacliq.com/test-item?aff_id=lumiere",
    in_stock: true,
    review_status: "pending",
    is_published: false,
    last_synced_at: "2025-01-20T00:00:00Z",
    created_at: "2025-01-20T00:00:00Z",
  },
  {
    id: "aff-test-02",
    source_name: "Ajio Luxe",
    external_id: "AJL-TEST-002",
    title: "Hand-Dyed Silk Scarf",
    brand: "Partner Brand",
    category_name: "Accessories",
    original_price: 12000,
    image_url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
    destination_url: "https://luxe.ajio.com/test-item",
    affiliate_tracking_url: "https://luxe.ajio.com/test-item?aff_id=lumiere",
    in_stock: false,
    review_status: "pending",
    is_published: false,
    last_synced_at: "2025-01-20T00:00:00Z",
    created_at: "2025-01-20T00:00:00Z",
  },
];
