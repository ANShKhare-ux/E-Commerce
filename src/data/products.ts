import { Product, CuratedOutfit, AffiliateProduct } from "@/types";

export const INITIAL_PRODUCTS: Product[] = [
  // ---------------------------------------------------------------------------
  // ETHNIC WEAR (Handcrafted, Indian Artisans)
  // ---------------------------------------------------------------------------
  {
    id: "prod-eth-01",
    slug: "chanderi-silk-anarkali-set-gulabi",
    name: "Gulabi Hand-Block Chanderi Silk Anarkali Set",
    brand: "LUMIÈRE Atelier",
    category_slug: "ethnic-wear",
    collection_slug: "royal-rajasthan",
    description: "An ethereal 3-piece ensemble woven from pure Chanderi silk with delicate silver gota-patti accents along the hemline. Hand block-printed by master craftsmen in Bagru using natural mineral pigments. Includes organza dupatta with hand-scalloped borders.",
    fabric_care: "100% Chanderi Silk with Mulmul Cotton lining. Dry clean only. Store wrapped in muslin cloth.",
    origin: "Chanderi, Madhya Pradesh",
    is_affiliate: false,
    base_price: 8490,
    discount_price: 6990,
    is_deal: true,
    rating: 4.9,
    review_count: 38,
    status: "active",
    images: [
      { id: "img-eth-01-1", product_id: "prod-eth-01", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80", alt_text: "Front view of Gulabi Chanderi Anarkali", display_order: 1, is_primary: true },
      { id: "img-eth-01-2", product_id: "prod-eth-01", url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80", alt_text: "Artisan gota detail on organza dupatta", display_order: 2, is_primary: false },
    ],
    variants: [
      { id: "var-eth-01-s-rose", product_id: "prod-eth-01", sku: "LUM-ETH-GUL-S-ROSE", color: "Dusty Rose", color_hex: "#DCAE96", size: "S", price: 6990, compare_at_price: 8490, weight_grams: 650, is_active: true },
      { id: "var-eth-01-m-rose", product_id: "prod-eth-01", sku: "LUM-ETH-GUL-M-ROSE", color: "Dusty Rose", color_hex: "#DCAE96", size: "M", price: 6990, compare_at_price: 8490, weight_grams: 650, is_active: true },
      { id: "var-eth-01-l-rose", product_id: "prod-eth-01", sku: "LUM-ETH-GUL-L-ROSE", color: "Dusty Rose", color_hex: "#DCAE96", size: "L", price: 6990, compare_at_price: 8490, weight_grams: 650, is_active: true },
      { id: "var-eth-01-xl-rose", product_id: "prod-eth-01", sku: "LUM-ETH-GUL-XL-ROSE", color: "Dusty Rose", color_hex: "#DCAE96", size: "XL", price: 6990, compare_at_price: 8490, weight_grams: 650, is_active: true },
    ],
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-01-15T10:00:00Z",
  },
  {
    id: "prod-eth-02",
    slug: "banarasi-kadhwa-raw-silk-kurta-emerald",
    name: "Emerald Zari Kadhwa Silk Kurta & Dhoti Trouser",
    brand: "LUMIÈRE Royal",
    category_slug: "ethnic-wear",
    collection_slug: "royal-rajasthan",
    description: "Crafted on traditional pit looms in Varanasi, this jewel-toned emerald kurta features authentic pure copper-electroplated gold zari motifs woven in the ancient Kadhwa technique. Structured tailored bandhgala collar with mother-of-pearl buttons.",
    fabric_care: "Pure Mulberry & Raw Silk. Dry clean only. Do not iron directly on zari work.",
    origin: "Varanasi, Uttar Pradesh",
    is_affiliate: false,
    base_price: 12900,
    is_deal: false,
    rating: 4.8,
    review_count: 24,
    status: "active",
    images: [
      { id: "img-eth-02-1", product_id: "prod-eth-02", url: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1000&q=80", alt_text: "Emerald Zari Kurta Front", display_order: 1, is_primary: true },
      { id: "img-eth-02-2", product_id: "prod-eth-02", url: "https://images.unsplash.com/photo-1583391733975-081498715873?auto=format&fit=crop&w=1000&q=80", alt_text: "Kadhwa weave close up", display_order: 2, is_primary: false },
    ],
    variants: [
      { id: "var-eth-02-m-emr", product_id: "prod-eth-02", sku: "LUM-ETH-EMR-M-GRN", color: "Imperial Emerald", color_hex: "#1A4437", size: "M", price: 12900, compare_at_price: 14500, weight_grams: 800, is_active: true },
      { id: "var-eth-02-l-emr", product_id: "prod-eth-02", sku: "LUM-ETH-EMR-L-GRN", color: "Imperial Emerald", color_hex: "#1A4437", size: "L", price: 12900, compare_at_price: 14500, weight_grams: 800, is_active: true },
      { id: "var-eth-02-xl-emr", product_id: "prod-eth-02", sku: "LUM-ETH-EMR-XL-GRN", color: "Imperial Emerald", color_hex: "#1A4437", size: "XL", price: 12900, compare_at_price: 14500, weight_grams: 800, is_active: true },
    ],
    created_at: "2025-01-16T11:30:00Z",
    updated_at: "2025-01-16T11:30:00Z",
  },
  {
    id: "prod-eth-03",
    slug: "maheshwari-tissue-sari-champagne",
    name: "Champagne Handspun Maheshwari Tissue Sari",
    brand: "LUMIÈRE Atelier",
    category_slug: "ethnic-wear",
    description: "An understated heirloom saree woven with fine mulberry silk warp and spun zari weft. Finished with reversible Bugdi borders reflective of Narmada fortress architecture. Includes unstitched silk blouse fabric.",
    fabric_care: "Maheshwari Handloom Silk & Fine Tissue. Dry clean only.",
    origin: "Maheshwar, Madhya Pradesh",
    is_affiliate: false,
    base_price: 9800,
    discount_price: 8200,
    is_deal: true,
    rating: 5.0,
    review_count: 19,
    status: "active",
    images: [
      { id: "img-eth-03-1", product_id: "prod-eth-03", url: "https://images.unsplash.com/photo-1610030469668-932d8a0c2018?auto=format&fit=crop&w=1000&q=80", alt_text: "Champagne Maheshwari Tissue Sari", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-eth-03-fs-gld", product_id: "prod-eth-03", sku: "LUM-ETH-MAH-FS-GLD", color: "Champagne Gold", color_hex: "#D4AF37", size: "Free Size", price: 8200, compare_at_price: 9800, weight_grams: 480, is_active: true },
    ],
    created_at: "2025-01-18T09:00:00Z",
    updated_at: "2025-01-18T09:00:00Z",
  },
  {
    id: "prod-eth-04",
    slug: "bandhani-georgette-lehenga-set",
    name: "Kutch Bandhani Georgette Lehenga & Dupatta",
    brand: "LUMIÈRE Heritage",
    category_slug: "ethnic-wear",
    collection_slug: "royal-rajasthan",
    description: "Traditional tie-and-dye artisanal Bandhani hand-knotted by Gujarati artisans. Features a flared 16-kali skirt with tonal silk lining and an embroidered raw-silk choli adorned with mirror work.",
    fabric_care: "Pure Viscose Georgette with Pure Raw Silk Blouse. Dry clean only.",
    origin: "Bhuj, Gujarat",
    is_affiliate: false,
    base_price: 21500,
    rating: 4.9,
    review_count: 14,
    status: "active",
    images: [
      { id: "img-eth-04-1", product_id: "prod-eth-04", url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80", alt_text: "Kutch Bandhani Lehenga Set", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-eth-04-s-red", product_id: "prod-eth-04", sku: "LUM-ETH-BND-S-RED", color: "Sindoor Crimson", color_hex: "#9B111E", size: "S", price: 21500, compare_at_price: 24000, weight_grams: 1400, is_active: true },
      { id: "var-eth-04-m-red", product_id: "prod-eth-04", sku: "LUM-ETH-BND-M-RED", color: "Sindoor Crimson", color_hex: "#9B111E", size: "M", price: 21500, compare_at_price: 24000, weight_grams: 1400, is_active: true },
      { id: "var-eth-04-l-red", product_id: "prod-eth-04", sku: "LUM-ETH-BND-L-RED", color: "Sindoor Crimson", color_hex: "#9B111E", size: "L", price: 21500, compare_at_price: 24000, weight_grams: 1400, is_active: true },
    ],
    created_at: "2025-01-20T14:15:00Z",
    updated_at: "2025-01-20T14:15:00Z",
  },

  // ---------------------------------------------------------------------------
  // WOMEN'S CLOTHING (Contemporary & Resortwear)
  // ---------------------------------------------------------------------------
  {
    id: "prod-wom-01",
    slug: "ivory-organic-linen-relaxed-trench",
    name: "Ivory European Organic Linen Relaxed Trench",
    brand: "LUMIÈRE Studio",
    category_slug: "womens-clothing",
    collection_slug: "monsoon-minimalism",
    description: "An unlined transitional trench coat tailored from 220 GSM certified organic European flax linen. Features storm flaps, horn buttons, a removable wrap tie belt, and deep welt pockets designed for year-round effortless layering.",
    fabric_care: "100% Certified Organic Linen. Hand wash cold or gentle machine cycle. Air dry flat.",
    origin: "Bengaluru, Karnataka",
    is_affiliate: false,
    base_price: 7490,
    rating: 4.7,
    review_count: 42,
    status: "active",
    images: [
      { id: "img-wom-01-1", product_id: "prod-wom-01", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80", alt_text: "Ivory Organic Linen Trench Coat", display_order: 1, is_primary: true },
      { id: "img-wom-01-2", product_id: "prod-wom-01", url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80", alt_text: "Linen trench coat styling", display_order: 2, is_primary: false },
    ],
    variants: [
      { id: "var-wom-01-xs-ivo", product_id: "prod-wom-01", sku: "LUM-WOM-TRN-XS-IVO", color: "Oatmeal Ivory", color_hex: "#F5F2EB", size: "XS", price: 7490, compare_at_price: 8990, weight_grams: 550, is_active: true },
      { id: "var-wom-01-s-ivo", product_id: "prod-wom-01", sku: "LUM-WOM-TRN-S-IVO", color: "Oatmeal Ivory", color_hex: "#F5F2EB", size: "S", price: 7490, compare_at_price: 8990, weight_grams: 550, is_active: true },
      { id: "var-wom-01-m-ivo", product_id: "prod-wom-01", sku: "LUM-WOM-TRN-M-IVO", color: "Oatmeal Ivory", color_hex: "#F5F2EB", size: "M", price: 7490, compare_at_price: 8990, weight_grams: 550, is_active: true },
      { id: "var-wom-01-l-ivo", product_id: "prod-wom-01", sku: "LUM-WOM-TRN-L-IVO", color: "Oatmeal Ivory", color_hex: "#F5F2EB", size: "L", price: 7490, compare_at_price: 8990, weight_grams: 550, is_active: true },
    ],
    created_at: "2025-01-10T08:00:00Z",
    updated_at: "2025-01-10T08:00:00Z",
  },
  {
    id: "prod-wom-02",
    slug: "mulberry-silk-bias-cut-slip-dress-noir",
    name: "Mulberry Silk 22-Momme Bias Cut Midi Dress",
    brand: "LUMIÈRE Privé",
    category_slug: "womens-clothing",
    description: "Architectural 1990s silhouette cut diagonally across the grain to drape liquid-like over feminine contours. Featuring a refined cowl neckline, adjustable micro-rouleau straps, and french seams.",
    fabric_care: "100% Grade 6A Mulberry Silk (22 Momme). Hand wash with gentle silk detergent or dry clean.",
    origin: "Mysore, Karnataka",
    is_affiliate: false,
    base_price: 8900,
    discount_price: 7200,
    is_deal: true,
    rating: 4.9,
    review_count: 51,
    status: "active",
    images: [
      { id: "img-wom-02-1", product_id: "prod-wom-02", url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80", alt_text: "Noir Bias Cut Slip Dress", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-wom-02-s-blk", product_id: "prod-wom-02", sku: "LUM-WOM-SLP-S-BLK", color: "Obsidian Noir", color_hex: "#111111", size: "S", price: 7200, compare_at_price: 8900, weight_grams: 280, is_active: true },
      { id: "var-wom-02-m-blk", product_id: "prod-wom-02", sku: "LUM-WOM-SLP-M-BLK", color: "Obsidian Noir", color_hex: "#111111", size: "M", price: 7200, compare_at_price: 8900, weight_grams: 280, is_active: true },
      { id: "var-wom-02-l-blk", product_id: "prod-wom-02", sku: "LUM-WOM-SLP-L-BLK", color: "Obsidian Noir", color_hex: "#111111", size: "L", price: 7200, compare_at_price: 8900, weight_grams: 280, is_active: true },
    ],
    created_at: "2025-01-12T12:00:00Z",
    updated_at: "2025-01-12T12:00:00Z",
  },
  {
    id: "prod-wom-03",
    slug: "cotton-poplin-sculpted-peplum-blouse",
    name: "Architectural Pleated Cotton Poplin Blouse",
    brand: "LUMIÈRE Studio",
    category_slug: "womens-clothing",
    description: "Crisp 120s two-ply Giza cotton blouse featuring structured pleating through the torso, exaggerated French cuffs, and hidden mother-of-pearl placket buttons.",
    fabric_care: "100% Giza Cotton Poplin. Machine wash cold on delicate. Warm steam iron.",
    origin: "Coimbatore, Tamil Nadu",
    is_affiliate: false,
    base_price: 4490,
    rating: 4.6,
    review_count: 29,
    status: "active",
    images: [
      { id: "img-wom-03-1", product_id: "prod-wom-03", url: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80", alt_text: "White Architectural Poplin Blouse", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-wom-03-s-wht", product_id: "prod-wom-03", sku: "LUM-WOM-BLS-S-WHT", color: "Optical White", color_hex: "#FFFFFF", size: "S", price: 4490, compare_at_price: 4990, weight_grams: 320, is_active: true },
      { id: "var-wom-03-m-wht", product_id: "prod-wom-03", sku: "LUM-WOM-BLS-M-WHT", color: "Optical White", color_hex: "#FFFFFF", size: "M", price: 4490, compare_at_price: 4990, weight_grams: 320, is_active: true },
      { id: "var-wom-03-l-wht", product_id: "prod-wom-03", sku: "LUM-WOM-BLS-L-WHT", color: "Optical White", color_hex: "#FFFFFF", size: "L", price: 4490, compare_at_price: 4990, weight_grams: 320, is_active: true },
    ],
    created_at: "2025-01-14T09:40:00Z",
    updated_at: "2025-01-14T09:40:00Z",
  },

  // ---------------------------------------------------------------------------
  // MEN'S CLOTHING (Tailoring, Luxury Basics)
  // ---------------------------------------------------------------------------
  {
    id: "prod-men-01",
    slug: "supima-cotton-milano-knit-polo-sand",
    name: "Supima Cotton Milano Knit Resort Polo",
    brand: "LUMIÈRE Homme",
    category_slug: "mens-clothing",
    collection_slug: "monsoon-minimalism",
    description: "Knitted on 14-gauge Japanese flatbed machines from extra-long staple California-grown Supima cotton. Features an open Johnny collar, ribbed hem and cuffs, and natural breathability for warm climates.",
    fabric_care: "100% Long-Staple Supima Cotton. Gentle cold cycle or hand wash. Dry flat.",
    origin: "Tiruppur, Tamil Nadu",
    is_affiliate: false,
    base_price: 3690,
    discount_price: 2990,
    is_deal: true,
    rating: 4.8,
    review_count: 67,
    status: "active",
    images: [
      { id: "img-men-01-1", product_id: "prod-men-01", url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80", alt_text: "Sand Knit Resort Polo Front", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-men-01-s-snd", product_id: "prod-men-01", sku: "LUM-MEN-POL-S-SND", color: "Warm Sand", color_hex: "#D7C9B1", size: "S", price: 2990, compare_at_price: 3690, weight_grams: 340, is_active: true },
      { id: "var-men-01-m-snd", product_id: "prod-men-01", sku: "LUM-MEN-POL-M-SND", color: "Warm Sand", color_hex: "#D7C9B1", size: "M", price: 2990, compare_at_price: 3690, weight_grams: 340, is_active: true },
      { id: "var-men-01-l-snd", product_id: "prod-men-01", sku: "LUM-MEN-POL-L-SND", color: "Warm Sand", color_hex: "#D7C9B1", size: "L", price: 2990, compare_at_price: 3690, weight_grams: 340, is_active: true },
      { id: "var-men-01-xl-snd", product_id: "prod-men-01", sku: "LUM-MEN-POL-XL-SND", color: "Warm Sand", color_hex: "#D7C9B1", size: "XL", price: 2990, compare_at_price: 3690, weight_grams: 340, is_active: true },
    ],
    created_at: "2025-01-11T13:20:00Z",
    updated_at: "2025-01-11T13:20:00Z",
  },
  {
    id: "prod-men-02",
    slug: "linen-gurkha-pleated-trousers-olive",
    name: "Pure Irish Linen Gurkha Double-Pleat Trousers",
    brand: "LUMIÈRE Homme",
    category_slug: "mens-clothing",
    description: "Handcrafted high-rise trousers featuring a distinctive wraparound Gurkha cummerbund waistband with dual brass side adjusters. Cut with relaxed forward double pleats cascading into a gentle taper.",
    fabric_care: "100% Pure Irish Linen. Dry clean or cold hand wash. Hang dry in shade.",
    origin: "Jaipur, Rajasthan",
    is_affiliate: false,
    base_price: 5990,
    rating: 4.9,
    review_count: 31,
    status: "active",
    images: [
      { id: "img-men-02-1", product_id: "prod-men-02", url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80", alt_text: "Gurkha Pleated Trousers", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-men-02-m-olv", product_id: "prod-men-02", sku: "LUM-MEN-GRK-M-OLV", color: "Faded Olive", color_hex: "#556B2F", size: "M", price: 5990, compare_at_price: 6990, weight_grams: 520, is_active: true },
      { id: "var-men-02-l-olv", product_id: "prod-men-02", sku: "LUM-MEN-GRK-L-OLV", color: "Faded Olive", color_hex: "#556B2F", size: "L", price: 5990, compare_at_price: 6990, weight_grams: 520, is_active: true },
      { id: "var-men-02-xl-olv", product_id: "prod-men-02", sku: "LUM-MEN-GRK-XL-OLV", color: "Faded Olive", color_hex: "#556B2F", size: "XL", price: 5990, compare_at_price: 6990, weight_grams: 520, is_active: true },
    ],
    created_at: "2025-01-13T10:10:00Z",
    updated_at: "2025-01-13T10:10:00Z",
  },
  {
    id: "prod-men-03",
    slug: "khadi-silk-bandhgala-jacket-charcoal",
    name: "Heritage Khadi Silk Handspun Bandhgala Jacket",
    brand: "LUMIÈRE Royal",
    category_slug: "mens-clothing",
    collection_slug: "royal-rajasthan",
    description: "An unstructured formal Nehru jacket woven from 100% handspun Khadi silk. Lightly canvas-canvassed chest for breathability with antique brushed brass coin buttons.",
    fabric_care: "Handspun Khadi Silk. Dry clean only.",
    origin: "Murshidabad, West Bengal",
    is_affiliate: false,
    base_price: 11500,
    rating: 4.8,
    review_count: 22,
    status: "active",
    images: [
      { id: "img-men-03-1", product_id: "prod-men-03", url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80", alt_text: "Khadi Silk Bandhgala Jacket", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-men-03-s-chr", product_id: "prod-men-03", sku: "LUM-MEN-BDH-S-CHR", color: "Charcoal Slate", color_hex: "#2F4F4F", size: "S", price: 11500, compare_at_price: 13000, weight_grams: 700, is_active: true },
      { id: "var-men-03-m-chr", product_id: "prod-men-03", sku: "LUM-MEN-BDH-M-CHR", color: "Charcoal Slate", color_hex: "#2F4F4F", size: "M", price: 11500, compare_at_price: 13000, weight_grams: 700, is_active: true },
      { id: "var-men-03-l-chr", product_id: "prod-men-03", sku: "LUM-MEN-BDH-L-CHR", color: "Charcoal Slate", color_hex: "#2F4F4F", size: "L", price: 11500, compare_at_price: 13000, weight_grams: 700, is_active: true },
    ],
    created_at: "2025-01-17T15:00:00Z",
    updated_at: "2025-01-17T15:00:00Z",
  },

  // ---------------------------------------------------------------------------
  // STREETWEAR (Heavyweight, Boxy drops, Tech utility)
  // ---------------------------------------------------------------------------
  {
    id: "prod-str-01",
    slug: "district-zero-heavyweight-450gsm-hoodie-black",
    name: "District Zero 450 GSM French Terry Boxy Hoodie",
    brand: "District Zero by LUMIÈRE",
    category_slug: "streetwear",
    collection_slug: "tokyo-mumbai-street",
    description: "Constructed from custom-developed 450 GSM combed cotton French terry. Cut in an ultra-wide boxy silhouette with dropped shoulders, double-layered seamless hood, ribbed side gussets, and subtle tonal rubberized chest branding.",
    fabric_care: "100% Combed Heavyweight Cotton. Machine wash inside out with cold water. Air dry away from direct sunlight.",
    origin: "Ludhiana, Punjab",
    is_affiliate: false,
    base_price: 4990,
    discount_price: 3990,
    is_deal: true,
    rating: 4.9,
    review_count: 84,
    status: "active",
    images: [
      { id: "img-str-01-1", product_id: "prod-str-01", url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80", alt_text: "District Zero 450 GSM Hoodie", display_order: 1, is_primary: true },
      { id: "img-str-01-2", product_id: "prod-str-01", url: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80", alt_text: "Hoodie street styling", display_order: 2, is_primary: false },
    ],
    variants: [
      { id: "var-str-01-s-blk", product_id: "prod-str-01", sku: "LUM-STR-HD1-S-BLK", color: "Acid Washed Black", color_hex: "#1A1A1A", size: "S", price: 3990, compare_at_price: 4990, weight_grams: 850, is_active: true },
      { id: "var-str-01-m-blk", product_id: "prod-str-01", sku: "LUM-STR-HD1-M-BLK", color: "Acid Washed Black", color_hex: "#1A1A1A", size: "M", price: 3990, compare_at_price: 4990, weight_grams: 850, is_active: true },
      { id: "var-str-01-l-blk", product_id: "prod-str-01", sku: "LUM-STR-HD1-L-BLK", color: "Acid Washed Black", color_hex: "#1A1A1A", size: "L", price: 3990, compare_at_price: 4990, weight_grams: 850, is_active: true },
      { id: "var-str-01-xl-blk", product_id: "prod-str-01", sku: "LUM-STR-HD1-XL-BLK", color: "Acid Washed Black", color_hex: "#1A1A1A", size: "XL", price: 3990, compare_at_price: 4990, weight_grams: 850, is_active: true },
    ],
    created_at: "2025-01-08T16:00:00Z",
    updated_at: "2025-01-08T16:00:00Z",
  },
  {
    id: "prod-str-02",
    slug: "tactical-nylon-wide-leg-cargo-pants-slate",
    name: "Parachute Ripstop Modular Cargo Pants",
    brand: "District Zero by LUMIÈRE",
    category_slug: "streetwear",
    collection_slug: "tokyo-mumbai-street",
    description: "Engineered from waterproof nylon ripstop fabric with an internal bungee ankle cinching system to transition between balloon-leg and tapered silhouettes. Features 6 ergonomic bellows cargo pockets and Fidlock magnetic clasp details.",
    fabric_care: "100% Water-Resistant Technical Nylon. Machine wash cold, do not tumble dry.",
    origin: "Noida, Uttar Pradesh",
    is_affiliate: false,
    base_price: 4890,
    rating: 4.7,
    review_count: 36,
    status: "active",
    images: [
      { id: "img-str-02-1", product_id: "prod-str-02", url: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80", alt_text: "Ripstop Modular Cargo Pants", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-str-02-m-slt", product_id: "prod-str-02", sku: "LUM-STR-CRG-M-SLT", color: "Slate Grey", color_hex: "#708090", size: "M", price: 4890, compare_at_price: 5490, weight_grams: 480, is_active: true },
      { id: "var-str-02-l-slt", product_id: "prod-str-02", sku: "LUM-STR-CRG-L-SLT", color: "Slate Grey", color_hex: "#708090", size: "L", price: 4890, compare_at_price: 5490, weight_grams: 480, is_active: true },
    ],
    created_at: "2025-01-09T11:00:00Z",
    updated_at: "2025-01-09T11:00:00Z",
  },
  {
    id: "prod-str-03",
    slug: "280gsm-oversized-raw-edge-tee-ecru",
    name: "280 GSM Vintage Wash Drop-Shoulder Tee",
    brand: "District Zero by LUMIÈRE",
    category_slug: "streetwear",
    description: "Heavyweight single jersey t-shirt with blind stitched cuffs, high ribbed crewneck collar that maintains shape over washes, and subtle raw edge detailing.",
    fabric_care: "100% Heavyweight Cotton. Gentle machine wash cold.",
    origin: "Tiruppur, Tamil Nadu",
    is_affiliate: false,
    base_price: 2490,
    discount_price: 1890,
    is_deal: true,
    rating: 4.9,
    review_count: 92,
    status: "active",
    images: [
      { id: "img-str-03-1", product_id: "prod-str-03", url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80", alt_text: "Ecru Oversized Heavyweight Tee", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-str-03-s-ecr", product_id: "prod-str-03", sku: "LUM-STR-TEE-S-ECR", color: "Vintage Ecru", color_hex: "#F5F5DC", size: "S", price: 1890, compare_at_price: 2490, weight_grams: 310, is_active: true },
      { id: "var-str-03-m-ecr", product_id: "prod-str-03", sku: "LUM-STR-TEE-M-ECR", color: "Vintage Ecru", color_hex: "#F5F5DC", size: "M", price: 1890, compare_at_price: 2490, weight_grams: 310, is_active: true },
      { id: "var-str-03-l-ecr", product_id: "prod-str-03", sku: "LUM-STR-TEE-L-ECR", color: "Vintage Ecru", color_hex: "#F5F5DC", size: "L", price: 1890, compare_at_price: 2490, weight_grams: 310, is_active: true },
    ],
    created_at: "2025-01-07T12:00:00Z",
    updated_at: "2025-01-07T12:00:00Z",
  },

  // ---------------------------------------------------------------------------
  // PREMIUM & LUXURY (Atelier Editions)
  // ---------------------------------------------------------------------------
  {
    id: "prod-lux-01",
    slug: "pashmina-hand-embroidered-kani-shawl-ivory",
    name: "Master Artisan Kani Cashmere Pashmina Shawl",
    brand: "LUMIÈRE Haute",
    category_slug: "premium-luxury",
    collection_slug: "royal-rajasthan",
    description: "Certified Kashmiri Pashmina handwoven over 9 months using traditional wooden kanis (bobbins). Features intricate floral paisley jaal patterns inspired by Mughal miniature paintings. Certified with Kashmir Pashmina GI mark.",
    fabric_care: "100% Certified Changthangi Cashmere Pashmina. Professional specialty dry clean only.",
    origin: "Srinagar, Jammu & Kashmir",
    is_affiliate: false,
    base_price: 48500,
    rating: 5.0,
    review_count: 11,
    status: "active",
    images: [
      { id: "img-lux-01-1", product_id: "prod-lux-01", url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80", alt_text: "Handwoven Kani Pashmina Shawl", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-lux-01-fs-ivory", product_id: "prod-lux-01", sku: "LUM-LUX-KAN-FS-IVO", color: "Natural Ivory & Multi", color_hex: "#FFFBF0", size: "Free Size", price: 48500, compare_at_price: 55000, weight_grams: 210, is_active: true },
    ],
    created_at: "2025-01-05T09:00:00Z",
    updated_at: "2025-01-05T09:00:00Z",
  },
  {
    id: "prod-lux-02",
    slug: "bespoke-hand-pleated-organza-cape-champagne",
    name: "Micro-Pleated Silk Organza Gala Cape & Gown Set",
    brand: "LUMIÈRE Haute",
    category_slug: "premium-luxury",
    description: "An architectural red-carpet statement piece featuring individually baked micro-pleats in fine silk organza with hand-sewn glass bead edging. Paired with a tailored satin slip gown.",
    fabric_care: "100% Silk Organza. Special preservation dry cleaning only.",
    origin: "Mumbai, Maharashtra",
    is_affiliate: false,
    base_price: 36000,
    rating: 4.9,
    review_count: 8,
    status: "active",
    images: [
      { id: "img-lux-02-1", product_id: "prod-lux-02", url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80", alt_text: "Silk Organza Pleated Gala Cape", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-lux-02-s-gld", product_id: "prod-lux-02", sku: "LUM-LUX-CAP-S-GLD", color: "Champagne Sheen", color_hex: "#F7E7CE", size: "S", price: 36000, compare_at_price: 42000, weight_grams: 750, is_active: true },
      { id: "var-lux-02-m-gld", product_id: "prod-lux-02", sku: "LUM-LUX-CAP-M-GLD", color: "Champagne Sheen", color_hex: "#F7E7CE", size: "M", price: 36000, compare_at_price: 42000, weight_grams: 750, is_active: true },
    ],
    created_at: "2025-01-06T11:00:00Z",
    updated_at: "2025-01-06T11:00:00Z",
  },

  // ---------------------------------------------------------------------------
  // AFFILIATE CURATIONS (External Luxury Retailers with Full Legal Disclosure)
  // ---------------------------------------------------------------------------
  {
    id: "prod-aff-01",
    slug: "sabyasachi-heritage-printed-clutch",
    name: "Sabyasachi Royal Bengal Tiger Minaudière Clutch",
    brand: "Sabyasachi",
    category_slug: "premium-luxury",
    description: "Iconic royal minaudière cast in antiqued gold-plated brass with the iconic Sabyasachi Royal Bengal Tiger crest. Lined in fine crimson velvet with a detachable snake chain strap.",
    fabric_care: "Antiqued Brass with Fine Velvet Lining. Store in original felt dustbag.",
    origin: "Kolkata, West Bengal",
    is_affiliate: true,
    affiliate_source_name: "Tata CLiQ Luxury",
    affiliate_url: "https://luxury.tatacliq.com/sabyasachi-minaudiere?utm_source=lumiere_affiliate&utm_medium=curated&utm_campaign=luxury_edit",
    affiliate_disclosure: "Affiliate Discovery: Sold and fulfilled externally by Tata CLiQ Luxury. LUMIÈRE earns a verified partner commission when purchased through this link at no additional cost to you.",
    base_price: 68500,
    rating: 4.9,
    review_count: 16,
    status: "active",
    images: [
      { id: "img-aff-01-1", product_id: "prod-aff-01", url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80", alt_text: "Sabyasachi Gold Minaudiere Clutch", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-aff-01-fs", product_id: "prod-aff-01", sku: "AFF-SAB-CLU-01", color: "Antique Gold", color_hex: "#CFB53B", size: "Free Size", price: 68500, weight_grams: 550, is_active: true },
    ],
    created_at: "2025-01-22T10:00:00Z",
    updated_at: "2025-01-22T10:00:00Z",
  },
  {
    id: "prod-aff-02",
    slug: "raw-mango-chanderi-brocade-sari-rani-pink",
    name: "Raw Mango 'Varanasi' Handwoven Brocade Saree",
    brand: "Raw Mango",
    category_slug: "ethnic-wear",
    description: "Sanjay Garg's celebrated handloom innovation featuring floating botanical butas in tested silver zari over rich rani pink organza silk. A modern classic of Indian festive minimalism.",
    fabric_care: "Handloom Varanasi Silk Brocade. Dry clean only.",
    origin: "Varanasi, Uttar Pradesh",
    is_affiliate: true,
    affiliate_source_name: "Ajio Luxe",
    affiliate_url: "https://luxe.ajio.com/raw-mango-brocade-saree?aff_id=lumiere_curations",
    affiliate_disclosure: "Affiliate Discovery: Sold and fulfilled externally by Ajio Luxe. LUMIÈRE earns a verified partner commission when purchased through this link at no additional cost to you.",
    base_price: 34500,
    rating: 5.0,
    review_count: 27,
    status: "active",
    images: [
      { id: "img-aff-02-1", product_id: "prod-aff-02", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80", alt_text: "Raw Mango Rani Pink Sari", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-aff-02-fs", product_id: "prod-aff-02", sku: "AFF-RAW-SAR-01", color: "Rani Pink", color_hex: "#E0115F", size: "Free Size", price: 34500, weight_grams: 620, is_active: true },
    ],
    created_at: "2025-01-23T11:00:00Z",
    updated_at: "2025-01-23T11:00:00Z",
  },
  {
    id: "prod-aff-03",
    slug: "nicobar-relaxed-fit-chambray-shirt",
    name: "Nicobar Tropical Island Washed Chambray Shirt",
    brand: "Nicobar",
    category_slug: "mens-clothing",
    description: "Laidback indigo chambray button-down tailored from 100% breathable organic cotton. Features coconut husk buttons and a relaxed camp collar inspired by the Indian Ocean coastline.",
    fabric_care: "100% Organic Cotton Chambray. Machine wash cold.",
    origin: "New Delhi, Delhi",
    is_affiliate: true,
    affiliate_source_name: "Myntra Luxe",
    affiliate_url: "https://www.myntra.com/luxury/nicobar-chambray-shirt?aff_id=lumiere_style",
    affiliate_disclosure: "Affiliate Discovery: Sold and fulfilled externally by Myntra Luxe. LUMIÈRE earns an affiliate commission on qualifying purchases.",
    base_price: 3800,
    discount_price: 3200,
    is_deal: true,
    rating: 4.7,
    review_count: 45,
    status: "active",
    images: [
      { id: "img-aff-03-1", product_id: "prod-aff-03", url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80", alt_text: "Nicobar Relaxed Chambray Shirt", display_order: 1, is_primary: true },
    ],
    variants: [
      { id: "var-aff-03-m", product_id: "prod-aff-03", sku: "AFF-NIC-SHR-M", color: "Washed Indigo", color_hex: "#4B6F8E", size: "M", price: 3200, weight_grams: 350, is_active: true },
      { id: "var-aff-03-l", product_id: "prod-aff-03", sku: "AFF-NIC-SHR-L", color: "Washed Indigo", color_hex: "#4B6F8E", size: "L", price: 3200, weight_grams: 350, is_active: true },
    ],
    created_at: "2025-01-24T12:00:00Z",
    updated_at: "2025-01-24T12:00:00Z",
  },
  {
    "id": "prod-eth-05",
    "slug": "royal-indigo-ajrakh-modal-silk-angrakha-kurta",
    "name": "Royal Indigo Ajrakh Modal Silk Angrakha Kurta",
    "brand": "LUMIÈRE Atelier",
    "category_slug": "ethnic-wear",
    "collection_slug": "royal-rajasthan",
    "description": "Classic asymmetrical Angrakha cut hand-printed with authentic 14-stage resist-dye Ajrakh using pure vegetable indigo and madder root. Finished with handmade fabric potli buttons and tassel ties.",
    "fabric_care": "100% Pure Modal Silk. Cold gentle wash with pH-neutral detergent or dry clean.",
    "origin": "Ajrakhpur, Kutch, Gujarat",
    "is_affiliate": false,
    "base_price": 6490,
    "discount_price": 5490,
    "is_deal": true,
    "rating": 4.8,
    "review_count": 32,
    "status": "active",
    "images": [
      {
        "id": "img-eth-05-1",
        "product_id": "prod-eth-05",
        "url": "https://images.unsplash.com/photo-1583391733975-081498715873?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Royal Indigo Ajrakh Angrakha Kurta",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-eth-05-s-blu",
        "product_id": "prod-eth-05",
        "sku": "LUM-ETH-AJR-S-BLU",
        "color": "Deep Indigo",
        "color_hex": "#1A2B4C",
        "size": "S",
        "price": 5490,
        "compare_at_price": 6490,
        "weight_grams": 520,
        "is_active": true
      },
      {
        "id": "var-eth-05-m-blu",
        "product_id": "prod-eth-05",
        "sku": "LUM-ETH-AJR-M-BLU",
        "color": "Deep Indigo",
        "color_hex": "#1A2B4C",
        "size": "M",
        "price": 5490,
        "compare_at_price": 6490,
        "weight_grams": 520,
        "is_active": true
      },
      {
        "id": "var-eth-05-l-blu",
        "product_id": "prod-eth-05",
        "sku": "LUM-ETH-AJR-L-BLU",
        "color": "Deep Indigo",
        "color_hex": "#1A2B4C",
        "size": "L",
        "price": 5490,
        "compare_at_price": 6490,
        "weight_grams": 520,
        "is_active": true
      }
    ],
    "created_at": "2025-01-21T10:00:00Z",
    "updated_at": "2025-01-21T10:00:00Z"
  },
  {
    "id": "prod-eth-06",
    "slug": "banarasi-shikargah-brocade-sherwani",
    "name": "Banarasi Shikargah Pure Katan Brocade Sherwani",
    "brand": "LUMIÈRE Royal",
    "category_slug": "ethnic-wear",
    "collection_slug": "royal-rajasthan",
    "description": "An exceptional ceremonial sherwani woven on heritage drawlooms in Varanasi featuring the legendary Shikargah hunting motifs interwoven with antique gold zari on rich black katan silk.",
    "fabric_care": "100% Pure Katan Silk Brocade. Specialty dry clean only.",
    "origin": "Varanasi, Uttar Pradesh",
    "is_affiliate": false,
    "base_price": 32000,
    "rating": 5,
    "review_count": 15,
    "status": "active",
    "images": [
      {
        "id": "img-eth-06-1",
        "product_id": "prod-eth-06",
        "url": "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Banarasi Shikargah Brocade Sherwani",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-eth-06-m-gld",
        "product_id": "prod-eth-06",
        "sku": "LUM-ETH-SHK-M-GLD",
        "color": "Antique Gold on Black",
        "color_hex": "#222222",
        "size": "M",
        "price": 32000,
        "compare_at_price": 36000,
        "weight_grams": 1100,
        "is_active": true
      },
      {
        "id": "var-eth-06-l-gld",
        "product_id": "prod-eth-06",
        "sku": "LUM-ETH-SHK-L-GLD",
        "color": "Antique Gold on Black",
        "color_hex": "#222222",
        "size": "L",
        "price": 32000,
        "compare_at_price": 36000,
        "weight_grams": 1100,
        "is_active": true
      },
      {
        "id": "var-eth-06-xl-gld",
        "product_id": "prod-eth-06",
        "sku": "LUM-ETH-SHK-XL-GLD",
        "color": "Antique Gold on Black",
        "color_hex": "#222222",
        "size": "XL",
        "price": 32000,
        "compare_at_price": 36000,
        "weight_grams": 1100,
        "is_active": true
      }
    ],
    "created_at": "2025-01-22T14:00:00Z",
    "updated_at": "2025-01-22T14:00:00Z"
  },
  {
    "id": "prod-eth-07",
    "slug": "lucknowi-chikankari-georgette-mukaish-kurta",
    "name": "Handcrafted Lucknowi Chikankari & Mukaish Kurta Set",
    "brand": "LUMIÈRE Atelier",
    "category_slug": "ethnic-wear",
    "description": "Intricately embroidered by woman artisans in Old Lucknow utilizing 32 distinct shadow-work stitches, highlighted with micro-flattened pure silver mukaish badla wire work.",
    "fabric_care": "Pure Viscose Georgette. Hand wash gently in cold water or dry clean.",
    "origin": "Lucknow, Uttar Pradesh",
    "is_affiliate": false,
    "base_price": 11900,
    "discount_price": 9900,
    "is_deal": true,
    "rating": 4.9,
    "review_count": 28,
    "status": "active",
    "images": [
      {
        "id": "img-eth-07-1",
        "product_id": "prod-eth-07",
        "url": "https://images.unsplash.com/photo-1610030469668-932d8a0c2018?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Lucknowi Chikankari Kurta",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-eth-07-s-wht",
        "product_id": "prod-eth-07",
        "sku": "LUM-ETH-CHK-S-WHT",
        "color": "Ivory Pearl",
        "color_hex": "#F8F6F0",
        "size": "S",
        "price": 9900,
        "compare_at_price": 11900,
        "weight_grams": 480,
        "is_active": true
      },
      {
        "id": "var-eth-07-m-wht",
        "product_id": "prod-eth-07",
        "sku": "LUM-ETH-CHK-M-WHT",
        "color": "Ivory Pearl",
        "color_hex": "#F8F6F0",
        "size": "M",
        "price": 9900,
        "compare_at_price": 11900,
        "weight_grams": 480,
        "is_active": true
      },
      {
        "id": "var-eth-07-l-wht",
        "product_id": "prod-eth-07",
        "sku": "LUM-ETH-CHK-L-WHT",
        "color": "Ivory Pearl",
        "color_hex": "#F8F6F0",
        "size": "L",
        "price": 9900,
        "compare_at_price": 11900,
        "weight_grams": 480,
        "is_active": true
      }
    ],
    "created_at": "2025-01-23T16:00:00Z",
    "updated_at": "2025-01-23T16:00:00Z"
  },
  {
    "id": "prod-eth-08",
    "slug": "tussar-hand-painted-kalamkari-saree",
    "name": "Hand-Painted Srikalahasti Tussar Silk Kalamkari Saree",
    "brand": "LUMIÈRE Heritage",
    "category_slug": "ethnic-wear",
    "description": "Drawn entirely freehand using traditional tamarind twig pens (kalam) and painted with natural botanical tree bark extracts on handspun wild Tussar silk.",
    "fabric_care": "Wild Tussar Silk. Dry clean only. Air in shade periodically.",
    "origin": "Srikalahasti, Andhra Pradesh",
    "is_affiliate": false,
    "base_price": 14500,
    "rating": 4.8,
    "review_count": 19,
    "status": "active",
    "images": [
      {
        "id": "img-eth-08-1",
        "product_id": "prod-eth-08",
        "url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Tussar Kalamkari Saree",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-eth-08-fs-rst",
        "product_id": "prod-eth-08",
        "sku": "LUM-ETH-KAL-FS-RST",
        "color": "Earth Rust & Ochre",
        "color_hex": "#B7410E",
        "size": "Free Size",
        "price": 14500,
        "compare_at_price": 16500,
        "weight_grams": 620,
        "is_active": true
      }
    ],
    "created_at": "2025-01-24T10:00:00Z",
    "updated_at": "2025-01-24T10:00:00Z"
  },
  {
    "id": "prod-eth-09",
    "slug": "raw-silk-bandhgala-waistcoat-ochre",
    "name": "Hand-Tailored Raw Silk Bandhgala Nehru Waistcoat",
    "brand": "LUMIÈRE Homme",
    "category_slug": "ethnic-wear",
    "collection_slug": "royal-rajasthan",
    "description": "Structured sleeveless Nehru jacket cut from 100% handloom Bhagalpuri raw silk. Features a Mandarin collar, welt chest pocket, and carved brass coin buttons.",
    "fabric_care": "100% Bhagalpur Raw Silk. Dry clean only.",
    "origin": "Bhagalpur, Bihar",
    "is_affiliate": false,
    "base_price": 5800,
    "discount_price": 4690,
    "is_deal": true,
    "rating": 4.7,
    "review_count": 23,
    "status": "active",
    "images": [
      {
        "id": "img-eth-09-1",
        "product_id": "prod-eth-09",
        "url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Raw Silk Nehru Waistcoat",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-eth-09-s-och",
        "product_id": "prod-eth-09",
        "sku": "LUM-ETH-WST-S-OCH",
        "color": "Ochre Saffron",
        "color_hex": "#C68E17",
        "size": "S",
        "price": 4690,
        "compare_at_price": 5800,
        "weight_grams": 420,
        "is_active": true
      },
      {
        "id": "var-eth-09-m-och",
        "product_id": "prod-eth-09",
        "sku": "LUM-ETH-WST-M-OCH",
        "color": "Ochre Saffron",
        "color_hex": "#C68E17",
        "size": "M",
        "price": 4690,
        "compare_at_price": 5800,
        "weight_grams": 420,
        "is_active": true
      },
      {
        "id": "var-eth-09-l-och",
        "product_id": "prod-eth-09",
        "sku": "LUM-ETH-WST-L-OCH",
        "color": "Ochre Saffron",
        "color_hex": "#C68E17",
        "size": "L",
        "price": 4690,
        "compare_at_price": 5800,
        "weight_grams": 420,
        "is_active": true
      }
    ],
    "created_at": "2025-01-25T11:00:00Z",
    "updated_at": "2025-01-25T11:00:00Z"
  },
  {
    "id": "prod-eth-10",
    "slug": "paithani-pure-silk-peacock-border-saree",
    "name": "Heirloom Yeola Paithani Pure Silk Saree with Asawali Border",
    "brand": "LUMIÈRE Heritage",
    "category_slug": "ethnic-wear",
    "description": "Handcrafted in Yeola over 4 months with oblique interlocking weft technique. Features signature kaleidoscopic peacock and flowering vase motifs in fine tested gold zari.",
    "fabric_care": "100% Pure Mulberry Silk & Gold Zari. Dry clean only. Wrap in unbleached cotton.",
    "origin": "Yeola, Nashik, Maharashtra",
    "is_affiliate": false,
    "base_price": 26500,
    "rating": 5,
    "review_count": 17,
    "status": "active",
    "images": [
      {
        "id": "img-eth-10-1",
        "product_id": "prod-eth-10",
        "url": "https://images.unsplash.com/photo-1610030469668-932d8a0c2018?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Paithani Pure Silk Saree",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-eth-10-fs-mag",
        "product_id": "prod-eth-10",
        "sku": "LUM-ETH-PAI-FS-MAG",
        "color": "Imperial Magenta Gold",
        "color_hex": "#8B008B",
        "size": "Free Size",
        "price": 26500,
        "compare_at_price": 29500,
        "weight_grams": 850,
        "is_active": true
      }
    ],
    "created_at": "2025-01-26T12:00:00Z",
    "updated_at": "2025-01-26T12:00:00Z"
  },
  {
    "id": "prod-wom-04",
    "slug": "tailored-wide-leg-italian-wool-blend-trousers",
    "name": "Architectural High-Rise Wide-Leg Pleated Trousers",
    "brand": "LUMIÈRE Studio",
    "category_slug": "womens-clothing",
    "collection_slug": "monsoon-minimalism",
    "description": "Impeccably tailored trousers with deep front pleats, hidden slide-hook waistband, and clean floor-sweeping fluid silhouette engineered in a breathable tropical wool blend.",
    "fabric_care": "60% Tropical Wool, 38% Viscose, 2% Elastane. Dry clean.",
    "origin": "Bengaluru, Karnataka",
    "is_affiliate": false,
    "base_price": 5290,
    "rating": 4.8,
    "review_count": 38,
    "status": "active",
    "images": [
      {
        "id": "img-wom-04-1",
        "product_id": "prod-wom-04",
        "url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "High-Rise Wide-Leg Trousers",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-wom-04-s-tau",
        "product_id": "prod-wom-04",
        "sku": "LUM-WOM-TRS-S-TAU",
        "color": "Warm Taupe",
        "color_hex": "#877F7D",
        "size": "S",
        "price": 5290,
        "compare_at_price": 6200,
        "weight_grams": 480,
        "is_active": true
      },
      {
        "id": "var-wom-04-m-tau",
        "product_id": "prod-wom-04",
        "sku": "LUM-WOM-TRS-M-TAU",
        "color": "Warm Taupe",
        "color_hex": "#877F7D",
        "size": "M",
        "price": 5290,
        "compare_at_price": 6200,
        "weight_grams": 480,
        "is_active": true
      },
      {
        "id": "var-wom-04-l-tau",
        "product_id": "prod-wom-04",
        "sku": "LUM-WOM-TRS-L-TAU",
        "color": "Warm Taupe",
        "color_hex": "#877F7D",
        "size": "L",
        "price": 5290,
        "compare_at_price": 6200,
        "weight_grams": 480,
        "is_active": true
      }
    ],
    "created_at": "2025-01-15T09:00:00Z",
    "updated_at": "2025-01-15T09:00:00Z"
  },
  {
    "id": "prod-wom-05",
    "slug": "double-breasted-cashmere-blend-blazer-camel",
    "name": "Structured Double-Breasted Cashmere Blend Blazer",
    "brand": "LUMIÈRE Privé",
    "category_slug": "womens-clothing",
    "description": "A masterclass in modern power tailoring. Features peak lapels, felt undercollar, horn buttons, and cupro lining for smooth effortless layering.",
    "fabric_care": "70% Wool, 30% Cashmere. Dry clean only.",
    "origin": "Jaipur, Rajasthan",
    "is_affiliate": false,
    "base_price": 13900,
    "discount_price": 11500,
    "is_deal": true,
    "rating": 4.9,
    "review_count": 27,
    "status": "active",
    "images": [
      {
        "id": "img-wom-05-1",
        "product_id": "prod-wom-05",
        "url": "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Camel Double-Breasted Blazer",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-wom-05-s-cam",
        "product_id": "prod-wom-05",
        "sku": "LUM-WOM-BLZ-S-CAM",
        "color": "Desert Camel",
        "color_hex": "#C19A6B",
        "size": "S",
        "price": 11500,
        "compare_at_price": 13900,
        "weight_grams": 780,
        "is_active": true
      },
      {
        "id": "var-wom-05-m-cam",
        "product_id": "prod-wom-05",
        "sku": "LUM-WOM-BLZ-M-CAM",
        "color": "Desert Camel",
        "color_hex": "#C19A6B",
        "size": "M",
        "price": 11500,
        "compare_at_price": 13900,
        "weight_grams": 780,
        "is_active": true
      },
      {
        "id": "var-wom-05-l-cam",
        "product_id": "prod-wom-05",
        "sku": "LUM-WOM-BLZ-L-CAM",
        "color": "Desert Camel",
        "color_hex": "#C19A6B",
        "size": "L",
        "price": 11500,
        "compare_at_price": 13900,
        "weight_grams": 780,
        "is_active": true
      }
    ],
    "created_at": "2025-01-17T11:00:00Z",
    "updated_at": "2025-01-17T11:00:00Z"
  },
  {
    "id": "prod-wom-06",
    "slug": "relaxed-mulberry-silk-resort-kaftan",
    "name": "Pure Mulberry Silk Flowing Resort Kaftan",
    "brand": "LUMIÈRE Atelier",
    "category_slug": "womens-clothing",
    "collection_slug": "monsoon-minimalism",
    "description": "Generously cut maxi kaftan rendered in lightweight 16-momme crepe de chine silk with deep side slits, hand-stitched borders, and an understated boat neckline.",
    "fabric_care": "100% Crepe Silk. Hand wash cold or dry clean.",
    "origin": "Mysore, Karnataka",
    "is_affiliate": false,
    "base_price": 8200,
    "rating": 4.7,
    "review_count": 21,
    "status": "active",
    "images": [
      {
        "id": "img-wom-06-1",
        "product_id": "prod-wom-06",
        "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Silk Resort Kaftan",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-wom-06-fs-emr",
        "product_id": "prod-wom-06",
        "sku": "LUM-WOM-KAF-FS-EMR",
        "color": "Jewel Emerald",
        "color_hex": "#097969",
        "size": "Free Size",
        "price": 8200,
        "compare_at_price": 9500,
        "weight_grams": 310,
        "is_active": true
      }
    ],
    "created_at": "2025-01-18T13:00:00Z",
    "updated_at": "2025-01-18T13:00:00Z"
  },
  {
    "id": "prod-wom-07",
    "slug": "handwoven-khadi-cotton-shirt-dress-indigo",
    "name": "Handspun Khadi Cotton Belted Shirt Dress",
    "brand": "LUMIÈRE Studio",
    "category_slug": "womens-clothing",
    "description": "Woven on handlooms in rural West Bengal with botanical indigo vat dyeing. Features a clean band collar, mother-of-pearl buttons, and a self-tie fabric sash.",
    "fabric_care": "100% Handspun Khadi Cotton. Machine wash delicate cycle in cold water.",
    "origin": "Murshidabad, West Bengal",
    "is_affiliate": false,
    "base_price": 4690,
    "discount_price": 3890,
    "is_deal": true,
    "rating": 4.8,
    "review_count": 44,
    "status": "active",
    "images": [
      {
        "id": "img-wom-07-1",
        "product_id": "prod-wom-07",
        "url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Khadi Shirt Dress",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-wom-07-s-ind",
        "product_id": "prod-wom-07",
        "sku": "LUM-WOM-SHD-S-IND",
        "color": "Washed Indigo",
        "color_hex": "#3F51B5",
        "size": "S",
        "price": 3890,
        "compare_at_price": 4690,
        "weight_grams": 390,
        "is_active": true
      },
      {
        "id": "var-wom-07-m-ind",
        "product_id": "prod-wom-07",
        "sku": "LUM-WOM-SHD-M-IND",
        "color": "Washed Indigo",
        "color_hex": "#3F51B5",
        "size": "M",
        "price": 3890,
        "compare_at_price": 4690,
        "weight_grams": 390,
        "is_active": true
      },
      {
        "id": "var-wom-07-l-ind",
        "product_id": "prod-wom-07",
        "sku": "LUM-WOM-SHD-L-IND",
        "color": "Washed Indigo",
        "color_hex": "#3F51B5",
        "size": "L",
        "price": 3890,
        "compare_at_price": 4690,
        "weight_grams": 390,
        "is_active": true
      }
    ],
    "created_at": "2025-01-19T10:00:00Z",
    "updated_at": "2025-01-19T10:00:00Z"
  },
  {
    "id": "prod-wom-08",
    "slug": "sculpted-asymmetrical-linen-midi-skirt",
    "name": "Architectural Wrap Midi Skirt in Irish Linen",
    "brand": "LUMIÈRE Studio",
    "category_slug": "womens-clothing",
    "description": "Flattering wrap construction with sculptural tortoiseshell buckle closure, unlined airy drape, and an angled handkerchief hemline.",
    "fabric_care": "100% Irish Flax Linen. Wash cold or dry clean.",
    "origin": "Coimbatore, Tamil Nadu",
    "is_affiliate": false,
    "base_price": 4290,
    "rating": 4.6,
    "review_count": 18,
    "status": "active",
    "images": [
      {
        "id": "img-wom-08-1",
        "product_id": "prod-wom-08",
        "url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Linen Wrap Skirt",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-wom-08-s-olv",
        "product_id": "prod-wom-08",
        "sku": "LUM-WOM-SKT-S-OLV",
        "color": "Sage Olive",
        "color_hex": "#708238",
        "size": "S",
        "price": 4290,
        "compare_at_price": 4990,
        "weight_grams": 340,
        "is_active": true
      },
      {
        "id": "var-wom-08-m-olv",
        "product_id": "prod-wom-08",
        "sku": "LUM-WOM-SKT-M-OLV",
        "color": "Sage Olive",
        "color_hex": "#708238",
        "size": "M",
        "price": 4290,
        "compare_at_price": 4990,
        "weight_grams": 340,
        "is_active": true
      },
      {
        "id": "var-wom-08-l-olv",
        "product_id": "prod-wom-08",
        "sku": "LUM-WOM-SKT-L-OLV",
        "color": "Sage Olive",
        "color_hex": "#708238",
        "size": "L",
        "price": 4290,
        "compare_at_price": 4990,
        "weight_grams": 340,
        "is_active": true
      }
    ],
    "created_at": "2025-01-20T12:00:00Z",
    "updated_at": "2025-01-20T12:00:00Z"
  },
  {
    "id": "prod-wom-09",
    "slug": "fine-ribbed-merino-wool-turtleneck",
    "name": "Seamless Extra-Fine Merino Wool Ribbed Turtleneck",
    "brand": "LUMIÈRE Privé",
    "category_slug": "womens-clothing",
    "description": "Knitted from 19.5 micron Australian merino wool spun in Italy. Ultra-soft next-to-skin feel with resilient shape retention across all seasons.",
    "fabric_care": "100% Extra-Fine Merino Wool. Wool cycle or gentle hand wash.",
    "origin": "Ludhiana, Punjab",
    "is_affiliate": false,
    "base_price": 4990,
    "rating": 4.9,
    "review_count": 53,
    "status": "active",
    "images": [
      {
        "id": "img-wom-09-1",
        "product_id": "prod-wom-09",
        "url": "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Merino Wool Turtleneck",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-wom-09-s-crm",
        "product_id": "prod-wom-09",
        "sku": "LUM-WOM-TRT-S-CRM",
        "color": "Vanilla Cream",
        "color_hex": "#FDFBF7",
        "size": "S",
        "price": 4990,
        "compare_at_price": 5800,
        "weight_grams": 270,
        "is_active": true
      },
      {
        "id": "var-wom-09-m-crm",
        "product_id": "prod-wom-09",
        "sku": "LUM-WOM-TRT-M-CRM",
        "color": "Vanilla Cream",
        "color_hex": "#FDFBF7",
        "size": "M",
        "price": 4990,
        "compare_at_price": 5800,
        "weight_grams": 270,
        "is_active": true
      },
      {
        "id": "var-wom-09-l-crm",
        "product_id": "prod-wom-09",
        "sku": "LUM-WOM-TRT-L-CRM",
        "color": "Vanilla Cream",
        "color_hex": "#FDFBF7",
        "size": "L",
        "price": 4990,
        "compare_at_price": 5800,
        "weight_grams": 270,
        "is_active": true
      }
    ],
    "created_at": "2025-01-21T14:00:00Z",
    "updated_at": "2025-01-21T14:00:00Z"
  },
  {
    "id": "prod-wom-10",
    "slug": "organic-cotton-poplin-tiered-wrap-dress",
    "name": "Tiered Organic Giza Cotton Poplin Midi Dress",
    "brand": "LUMIÈRE Studio",
    "category_slug": "womens-clothing",
    "collection_slug": "monsoon-minimalism",
    "description": "Voluminous gathered tiers cascading into an ankle-length hemline. Cut from crisp two-ply certified Egyptian cotton with hidden on-seam side pockets.",
    "fabric_care": "100% Organic Giza Cotton. Machine wash delicate.",
    "origin": "Coimbatore, Tamil Nadu",
    "is_affiliate": false,
    "base_price": 5800,
    "discount_price": 4900,
    "is_deal": true,
    "rating": 4.8,
    "review_count": 35,
    "status": "active",
    "images": [
      {
        "id": "img-wom-10-1",
        "product_id": "prod-wom-10",
        "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Giza Cotton Tiered Midi Dress",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-wom-10-s-ter",
        "product_id": "prod-wom-10",
        "sku": "LUM-WOM-WRP-S-TER",
        "color": "Terracotta Clay",
        "color_hex": "#E2725B",
        "size": "S",
        "price": 4900,
        "compare_at_price": 5800,
        "weight_grams": 450,
        "is_active": true
      },
      {
        "id": "var-wom-10-m-ter",
        "product_id": "prod-wom-10",
        "sku": "LUM-WOM-WRP-M-TER",
        "color": "Terracotta Clay",
        "color_hex": "#E2725B",
        "size": "M",
        "price": 4900,
        "compare_at_price": 5800,
        "weight_grams": 450,
        "is_active": true
      },
      {
        "id": "var-wom-10-l-ter",
        "product_id": "prod-wom-10",
        "sku": "LUM-WOM-WRP-L-TER",
        "color": "Terracotta Clay",
        "color_hex": "#E2725B",
        "size": "L",
        "price": 4900,
        "compare_at_price": 5800,
        "weight_grams": 450,
        "is_active": true
      }
    ],
    "created_at": "2025-01-22T08:00:00Z",
    "updated_at": "2025-01-22T08:00:00Z"
  },
  {
    "id": "prod-wom-11",
    "slug": "structured-silk-dupioni-cropped-evening-jacket",
    "name": "Architectural Boxy Cropped Jacket in Silk Dupioni",
    "brand": "LUMIÈRE Privé",
    "category_slug": "womens-clothing",
    "description": "Sculpted evening jacket featuring a structured jewel neckline, cropped high waist, and distinctive textured slubs characteristic of authentic Varanasi Dupioni.",
    "fabric_care": "100% Handloom Silk Dupioni. Dry clean only.",
    "origin": "Varanasi, Uttar Pradesh",
    "is_affiliate": false,
    "base_price": 7900,
    "rating": 4.7,
    "review_count": 14,
    "status": "active",
    "images": [
      {
        "id": "img-wom-11-1",
        "product_id": "prod-wom-11",
        "url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Silk Dupioni Evening Jacket",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-wom-11-s-noi",
        "product_id": "prod-wom-11",
        "sku": "LUM-WOM-JKT-S-NOI",
        "color": "Obsidian Black",
        "color_hex": "#121212",
        "size": "S",
        "price": 7900,
        "compare_at_price": 8900,
        "weight_grams": 360,
        "is_active": true
      },
      {
        "id": "var-wom-11-m-noi",
        "product_id": "prod-wom-11",
        "sku": "LUM-WOM-JKT-M-NOI",
        "color": "Obsidian Black",
        "color_hex": "#121212",
        "size": "M",
        "price": 7900,
        "compare_at_price": 8900,
        "weight_grams": 360,
        "is_active": true
      },
      {
        "id": "var-wom-11-l-noi",
        "product_id": "prod-wom-11",
        "sku": "LUM-WOM-JKT-L-NOI",
        "color": "Obsidian Black",
        "color_hex": "#121212",
        "size": "L",
        "price": 7900,
        "compare_at_price": 8900,
        "weight_grams": 360,
        "is_active": true
      }
    ],
    "created_at": "2025-01-23T09:30:00Z",
    "updated_at": "2025-01-23T09:30:00Z"
  },
  {
    "id": "prod-men-04",
    "slug": "egyptian-giza-cotton-poplin-spread-collar-shirt",
    "name": "Egyptian Giza Cotton 140s Spread-Collar Formal Shirt",
    "brand": "LUMIÈRE Homme",
    "category_slug": "mens-clothing",
    "description": "Crafted from rare extra-long staple Giza 87 cotton with hand-set Austrian mother-of-pearl buttons, split back yoke, and single needle 22-SPI tailoring.",
    "fabric_care": "100% Egyptian Giza Cotton. Machine wash cold, hang dry, hot steam press.",
    "origin": "Bengaluru, Karnataka",
    "is_affiliate": false,
    "base_price": 4490,
    "rating": 4.9,
    "review_count": 61,
    "status": "active",
    "images": [
      {
        "id": "img-men-04-1",
        "product_id": "prod-men-04",
        "url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Giza Cotton Spread Collar Shirt",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-men-04-s-sky",
        "product_id": "prod-men-04",
        "sku": "LUM-MEN-SHT-S-SKY",
        "color": "Glacier Sky Blue",
        "color_hex": "#87CEEB",
        "size": "S",
        "price": 4490,
        "compare_at_price": 5200,
        "weight_grams": 280,
        "is_active": true
      },
      {
        "id": "var-men-04-m-sky",
        "product_id": "prod-men-04",
        "sku": "LUM-MEN-SHT-M-SKY",
        "color": "Glacier Sky Blue",
        "color_hex": "#87CEEB",
        "size": "M",
        "price": 4490,
        "compare_at_price": 5200,
        "weight_grams": 280,
        "is_active": true
      },
      {
        "id": "var-men-04-l-sky",
        "product_id": "prod-men-04",
        "sku": "LUM-MEN-SHT-L-SKY",
        "color": "Glacier Sky Blue",
        "color_hex": "#87CEEB",
        "size": "L",
        "price": 4490,
        "compare_at_price": 5200,
        "weight_grams": 280,
        "is_active": true
      },
      {
        "id": "var-men-04-xl-sky",
        "product_id": "prod-men-04",
        "sku": "LUM-MEN-SHT-XL-SKY",
        "color": "Glacier Sky Blue",
        "color_hex": "#87CEEB",
        "size": "XL",
        "price": 4490,
        "compare_at_price": 5200,
        "weight_grams": 280,
        "is_active": true
      }
    ],
    "created_at": "2025-01-16T10:00:00Z",
    "updated_at": "2025-01-16T10:00:00Z"
  },
  {
    "id": "prod-men-05",
    "slug": "handwoven-linen-cuban-collar-camp-shirt",
    "name": "Pure Irish Linen Relaxed Camp Collar Resort Shirt",
    "brand": "LUMIÈRE Homme",
    "category_slug": "mens-clothing",
    "collection_slug": "monsoon-minimalism",
    "description": "Breathable vacation staple cut in a relaxed boxy drape with retro convertible camp collar, straight vented hemline, and coconut wood buttons.",
    "fabric_care": "100% Pure Flax Linen. Cold gentle machine wash. Hang dry in shade.",
    "origin": "Jaipur, Rajasthan",
    "is_affiliate": false,
    "base_price": 3890,
    "discount_price": 3190,
    "is_deal": true,
    "rating": 4.8,
    "review_count": 48,
    "status": "active",
    "images": [
      {
        "id": "img-men-05-1",
        "product_id": "prod-men-05",
        "url": "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Linen Camp Collar Shirt",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-men-05-s-sge",
        "product_id": "prod-men-05",
        "sku": "LUM-MEN-CUB-S-SGE",
        "color": "Faded Sage Green",
        "color_hex": "#9CAF88",
        "size": "S",
        "price": 3190,
        "compare_at_price": 3890,
        "weight_grams": 290,
        "is_active": true
      },
      {
        "id": "var-men-05-m-sge",
        "product_id": "prod-men-05",
        "sku": "LUM-MEN-CUB-M-SGE",
        "color": "Faded Sage Green",
        "color_hex": "#9CAF88",
        "size": "M",
        "price": 3190,
        "compare_at_price": 3890,
        "weight_grams": 290,
        "is_active": true
      },
      {
        "id": "var-men-05-l-sge",
        "product_id": "prod-men-05",
        "sku": "LUM-MEN-CUB-L-SGE",
        "color": "Faded Sage Green",
        "color_hex": "#9CAF88",
        "size": "L",
        "price": 3190,
        "compare_at_price": 3890,
        "weight_grams": 290,
        "is_active": true
      }
    ],
    "created_at": "2025-01-18T11:00:00Z",
    "updated_at": "2025-01-18T11:00:00Z"
  },
  {
    "id": "prod-men-06",
    "slug": "unstructured-tropical-wool-blazer-deep-navy",
    "name": "Unstructured Tropical High-Twist Wool Sport Jacket",
    "brand": "LUMIÈRE Homme",
    "category_slug": "mens-clothing",
    "description": "Designed for the humid Indian subcontinent. Soft shoulder construction with unlined breathable back, dual side vents, and patch pockets.",
    "fabric_care": "100% Super 110s Tropical Wool. Specialty dry clean.",
    "origin": "Bengaluru, Karnataka",
    "is_affiliate": false,
    "base_price": 12500,
    "rating": 4.9,
    "review_count": 34,
    "status": "active",
    "images": [
      {
        "id": "img-men-06-1",
        "product_id": "prod-men-06",
        "url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Unstructured Tropical Wool Blazer",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-men-06-s-nvy",
        "product_id": "prod-men-06",
        "sku": "LUM-MEN-BLZ-S-NVY",
        "color": "Deep Midnight Navy",
        "color_hex": "#000080",
        "size": "S",
        "price": 12500,
        "compare_at_price": 14500,
        "weight_grams": 620,
        "is_active": true
      },
      {
        "id": "var-men-06-m-nvy",
        "product_id": "prod-men-06",
        "sku": "LUM-MEN-BLZ-M-NVY",
        "color": "Deep Midnight Navy",
        "color_hex": "#000080",
        "size": "M",
        "price": 12500,
        "compare_at_price": 14500,
        "weight_grams": 620,
        "is_active": true
      },
      {
        "id": "var-men-06-l-nvy",
        "product_id": "prod-men-06",
        "sku": "LUM-MEN-BLZ-L-NVY",
        "color": "Deep Midnight Navy",
        "color_hex": "#000080",
        "size": "L",
        "price": 12500,
        "compare_at_price": 14500,
        "weight_grams": 620,
        "is_active": true
      }
    ],
    "created_at": "2025-01-19T14:00:00Z",
    "updated_at": "2025-01-19T14:00:00Z"
  },
  {
    "id": "prod-men-07",
    "slug": "tailored-cotton-twill-chinos-sand-beige",
    "name": "Italian Cotton Stretch Twill Tailored Chino Trousers",
    "brand": "LUMIÈRE Homme",
    "category_slug": "mens-clothing",
    "description": "Garment-dyed 280 GSM cotton twill infused with 2% elastane for seamless mobility. Features an extended button closure tab and horn buttons.",
    "fabric_care": "98% Cotton, 2% Elastane. Machine wash cold.",
    "origin": "Noida, Uttar Pradesh",
    "is_affiliate": false,
    "base_price": 3690,
    "rating": 4.7,
    "review_count": 55,
    "status": "active",
    "images": [
      {
        "id": "img-men-07-1",
        "product_id": "prod-men-07",
        "url": "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Cotton Twill Chinos",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-men-07-s-bge",
        "product_id": "prod-men-07",
        "sku": "LUM-MEN-CHN-S-BGE",
        "color": "Sand Beige",
        "color_hex": "#E1C699",
        "size": "S",
        "price": 3690,
        "compare_at_price": 4200,
        "weight_grams": 480,
        "is_active": true
      },
      {
        "id": "var-men-07-m-bge",
        "product_id": "prod-men-07",
        "sku": "LUM-MEN-CHN-M-BGE",
        "color": "Sand Beige",
        "color_hex": "#E1C699",
        "size": "M",
        "price": 3690,
        "compare_at_price": 4200,
        "weight_grams": 480,
        "is_active": true
      },
      {
        "id": "var-men-07-l-bge",
        "product_id": "prod-men-07",
        "sku": "LUM-MEN-CHN-L-BGE",
        "color": "Sand Beige",
        "color_hex": "#E1C699",
        "size": "L",
        "price": 3690,
        "compare_at_price": 4200,
        "weight_grams": 480,
        "is_active": true
      }
    ],
    "created_at": "2025-01-20T16:00:00Z",
    "updated_at": "2025-01-20T16:00:00Z"
  },
  {
    "id": "prod-men-08",
    "slug": "supima-cotton-heavy-crewneck-long-sleeve-tee",
    "name": "260 GSM Supima Cotton Heavy Long Sleeve Tee",
    "brand": "LUMIÈRE Homme",
    "category_slug": "mens-clothing",
    "description": "Extra long staple Supima jersey with bound ribbed cuffs that stay in place and double needle collar construction.",
    "fabric_care": "100% Supima Cotton. Machine wash cold.",
    "origin": "Tiruppur, Tamil Nadu",
    "is_affiliate": false,
    "base_price": 2490,
    "discount_price": 1990,
    "is_deal": true,
    "rating": 4.8,
    "review_count": 73,
    "status": "active",
    "images": [
      {
        "id": "img-men-08-1",
        "product_id": "prod-men-08",
        "url": "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Supima Long Sleeve Tee",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-men-08-s-wht",
        "product_id": "prod-men-08",
        "sku": "LUM-MEN-LNG-S-WHT",
        "color": "Pure White",
        "color_hex": "#FFFFFF",
        "size": "S",
        "price": 1990,
        "compare_at_price": 2490,
        "weight_grams": 310,
        "is_active": true
      },
      {
        "id": "var-men-08-m-wht",
        "product_id": "prod-men-08",
        "sku": "LUM-MEN-LNG-M-WHT",
        "color": "Pure White",
        "color_hex": "#FFFFFF",
        "size": "M",
        "price": 1990,
        "compare_at_price": 2490,
        "weight_grams": 310,
        "is_active": true
      },
      {
        "id": "var-men-08-l-wht",
        "product_id": "prod-men-08",
        "sku": "LUM-MEN-LNG-L-WHT",
        "color": "Pure White",
        "color_hex": "#FFFFFF",
        "size": "L",
        "price": 1990,
        "compare_at_price": 2490,
        "weight_grams": 310,
        "is_active": true
      }
    ],
    "created_at": "2025-01-21T09:00:00Z",
    "updated_at": "2025-01-21T09:00:00Z"
  },
  {
    "id": "prod-men-09",
    "slug": "fine-gauge-sea-island-cotton-knit-crewneck",
    "name": "18-Gauge Fine Cotton Knit Lightweight Crewneck Sweater",
    "brand": "LUMIÈRE Homme",
    "category_slug": "mens-clothing",
    "description": "Ultra-fine gauge knitwear offering exquisite softness, silky sheen, and lightweight breathable warmth for cool evenings.",
    "fabric_care": "100% Long-Staple Cotton. Hand wash flat or delicate wool cycle.",
    "origin": "Ludhiana, Punjab",
    "is_affiliate": false,
    "base_price": 4990,
    "rating": 4.9,
    "review_count": 29,
    "status": "active",
    "images": [
      {
        "id": "img-men-09-1",
        "product_id": "prod-men-09",
        "url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Cotton Knit Crewneck",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-men-09-s-gry",
        "product_id": "prod-men-09",
        "sku": "LUM-MEN-KNT-S-GRY",
        "color": "Heather Grey",
        "color_hex": "#9E9E9E",
        "size": "S",
        "price": 4990,
        "compare_at_price": 5800,
        "weight_grams": 320,
        "is_active": true
      },
      {
        "id": "var-men-09-m-gry",
        "product_id": "prod-men-09",
        "sku": "LUM-MEN-KNT-M-GRY",
        "color": "Heather Grey",
        "color_hex": "#9E9E9E",
        "size": "M",
        "price": 4990,
        "compare_at_price": 5800,
        "weight_grams": 320,
        "is_active": true
      },
      {
        "id": "var-men-09-l-gry",
        "product_id": "prod-men-09",
        "sku": "LUM-MEN-KNT-L-GRY",
        "color": "Heather Grey",
        "color_hex": "#9E9E9E",
        "size": "L",
        "price": 4990,
        "compare_at_price": 5800,
        "weight_grams": 320,
        "is_active": true
      }
    ],
    "created_at": "2025-01-22T15:00:00Z",
    "updated_at": "2025-01-22T15:00:00Z"
  },
  {
    "id": "prod-men-10",
    "slug": "pure-linen-drawstring-trousers-terracotta",
    "name": "Relaxed Fit Pure Linen Drawstring Lounge Trousers",
    "brand": "LUMIÈRE Homme",
    "category_slug": "mens-clothing",
    "collection_slug": "monsoon-minimalism",
    "description": "Effortless vacation trousers with an elasticized waistband, natural cotton drawstring, and slanted welt pockets.",
    "fabric_care": "100% Pure Linen. Machine wash cold.",
    "origin": "Jaipur, Rajasthan",
    "is_affiliate": false,
    "base_price": 3990,
    "discount_price": 3290,
    "is_deal": true,
    "rating": 4.8,
    "review_count": 42,
    "status": "active",
    "images": [
      {
        "id": "img-men-10-1",
        "product_id": "prod-men-10",
        "url": "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Linen Drawstring Trousers",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-men-10-s-trc",
        "product_id": "prod-men-10",
        "sku": "LUM-MEN-DRW-S-TRC",
        "color": "Terracotta Earth",
        "color_hex": "#CC4E5C",
        "size": "S",
        "price": 3290,
        "compare_at_price": 3990,
        "weight_grams": 410,
        "is_active": true
      },
      {
        "id": "var-men-10-m-trc",
        "product_id": "prod-men-10",
        "sku": "LUM-MEN-DRW-M-TRC",
        "color": "Terracotta Earth",
        "color_hex": "#CC4E5C",
        "size": "M",
        "price": 3290,
        "compare_at_price": 3990,
        "weight_grams": 410,
        "is_active": true
      },
      {
        "id": "var-men-10-l-trc",
        "product_id": "prod-men-10",
        "sku": "LUM-MEN-DRW-L-TRC",
        "color": "Terracotta Earth",
        "color_hex": "#CC4E5C",
        "size": "L",
        "price": 3290,
        "compare_at_price": 3990,
        "weight_grams": 410,
        "is_active": true
      }
    ],
    "created_at": "2025-01-23T11:00:00Z",
    "updated_at": "2025-01-23T11:00:00Z"
  },
  {
    "id": "prod-men-11",
    "slug": "herringbone-wool-blend-overcoat-charcoal",
    "name": "Classic Tailored Single-Breasted Herringbone Overcoat",
    "brand": "LUMIÈRE Homme",
    "category_slug": "mens-clothing",
    "description": "Substantial winter coat tailored from dense 520 GSM Shetland-style wool blend with notch lapels, ticket pocket, and horn buttons.",
    "fabric_care": "80% Wool, 20% Polyamide. Dry clean only.",
    "origin": "Noida, Uttar Pradesh",
    "is_affiliate": false,
    "base_price": 15900,
    "rating": 4.9,
    "review_count": 26,
    "status": "active",
    "images": [
      {
        "id": "img-men-11-1",
        "product_id": "prod-men-11",
        "url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Herringbone Overcoat",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-men-11-m-chr",
        "product_id": "prod-men-11",
        "sku": "LUM-MEN-OVC-M-CHR",
        "color": "Charcoal Herringbone",
        "color_hex": "#36454F",
        "size": "M",
        "price": 15900,
        "compare_at_price": 18500,
        "weight_grams": 1300,
        "is_active": true
      },
      {
        "id": "var-men-11-l-chr",
        "product_id": "prod-men-11",
        "sku": "LUM-MEN-OVC-L-CHR",
        "color": "Charcoal Herringbone",
        "color_hex": "#36454F",
        "size": "L",
        "price": 15900,
        "compare_at_price": 18500,
        "weight_grams": 1300,
        "is_active": true
      },
      {
        "id": "var-men-11-xl-chr",
        "product_id": "prod-men-11",
        "sku": "LUM-MEN-OVC-XL-CHR",
        "color": "Charcoal Herringbone",
        "color_hex": "#36454F",
        "size": "XL",
        "price": 15900,
        "compare_at_price": 18500,
        "weight_grams": 1300,
        "is_active": true
      }
    ],
    "created_at": "2025-01-24T14:00:00Z",
    "updated_at": "2025-01-24T14:00:00Z"
  },
  {
    "id": "prod-str-04",
    "slug": "500gsm-distressed-loopback-terry-sweatpants",
    "name": "500 GSM Heavyweight Loopback Terry Relaxed Sweatpants",
    "brand": "District Zero by LUMIÈRE",
    "category_slug": "streetwear",
    "collection_slug": "tokyo-mumbai-street",
    "description": "Constructed with dense loopback cotton terry. Features subtle artisanal distress detailing along hems, elongated thick drawstrings, and deep zip pockets.",
    "fabric_care": "100% Heavyweight Cotton. Wash inside out with cold water.",
    "origin": "Ludhiana, Punjab",
    "is_affiliate": false,
    "base_price": 4290,
    "rating": 4.8,
    "review_count": 51,
    "status": "active",
    "images": [
      {
        "id": "img-str-04-1",
        "product_id": "prod-str-04",
        "url": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Heavyweight Loopback Sweatpants",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-str-04-s-blk",
        "product_id": "prod-str-04",
        "sku": "LUM-STR-SWP-S-BLK",
        "color": "Washed Black",
        "color_hex": "#1A1A1A",
        "size": "S",
        "price": 4290,
        "compare_at_price": 4990,
        "weight_grams": 720,
        "is_active": true
      },
      {
        "id": "var-str-04-m-blk",
        "product_id": "prod-str-04",
        "sku": "LUM-STR-SWP-M-BLK",
        "color": "Washed Black",
        "color_hex": "#1A1A1A",
        "size": "M",
        "price": 4290,
        "compare_at_price": 4990,
        "weight_grams": 720,
        "is_active": true
      },
      {
        "id": "var-str-04-l-blk",
        "product_id": "prod-str-04",
        "sku": "LUM-STR-SWP-L-BLK",
        "color": "Washed Black",
        "color_hex": "#1A1A1A",
        "size": "L",
        "price": 4290,
        "compare_at_price": 4990,
        "weight_grams": 720,
        "is_active": true
      }
    ],
    "created_at": "2025-01-18T10:00:00Z",
    "updated_at": "2025-01-18T10:00:00Z"
  },
  {
    "id": "prod-str-05",
    "slug": "heavyweight-rigid-raw-selvedge-denim-jacket",
    "name": "16 Oz Rigid Japanese Loomstate Raw Selvedge Jacket",
    "brand": "District Zero by LUMIÈRE",
    "category_slug": "streetwear",
    "collection_slug": "tokyo-mumbai-street",
    "description": "Woven on vintage shuttle looms using unwashed 16 oz ring-spun denim with red selvedge ticker ID. Boxy Type-II silhouette with custom matte black shank buttons.",
    "fabric_care": "100% Raw Selvedge Cotton Denim. Soak in cold tub without agitation.",
    "origin": "Ahmedabad, Gujarat",
    "is_affiliate": false,
    "base_price": 6890,
    "rating": 4.9,
    "review_count": 38,
    "status": "active",
    "images": [
      {
        "id": "img-str-05-1",
        "product_id": "prod-str-05",
        "url": "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Raw Selvedge Denim Jacket",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-str-05-s-ind",
        "product_id": "prod-str-05",
        "sku": "LUM-STR-DNM-S-IND",
        "color": "Raw Deep Indigo",
        "color_hex": "#000080",
        "size": "S",
        "price": 6890,
        "compare_at_price": 7990,
        "weight_grams": 950,
        "is_active": true
      },
      {
        "id": "var-str-05-m-ind",
        "product_id": "prod-str-05",
        "sku": "LUM-STR-DNM-M-IND",
        "color": "Raw Deep Indigo",
        "color_hex": "#000080",
        "size": "M",
        "price": 6890,
        "compare_at_price": 7990,
        "weight_grams": 950,
        "is_active": true
      },
      {
        "id": "var-str-05-l-ind",
        "product_id": "prod-str-05",
        "sku": "LUM-STR-DNM-L-IND",
        "color": "Raw Deep Indigo",
        "color_hex": "#000080",
        "size": "L",
        "price": 6890,
        "compare_at_price": 7990,
        "weight_grams": 950,
        "is_active": true
      }
    ],
    "created_at": "2025-01-19T12:00:00Z",
    "updated_at": "2025-01-19T12:00:00Z"
  },
  {
    "id": "prod-str-06",
    "slug": "multi-pocket-tactical-utility-vest-sage",
    "name": "Cordura Nylon Tactical Modular Utility Vest",
    "brand": "District Zero by LUMIÈRE",
    "category_slug": "streetwear",
    "description": "Constructed from 500D Cordura tear-proof nylon. Equipped with 8 compartmentalized gear pockets, waterproof taped zips, and adjustable Molle webbing.",
    "fabric_care": "100% Technical Cordura Nylon. Wipe clean with damp cloth.",
    "origin": "Noida, Uttar Pradesh",
    "is_affiliate": false,
    "base_price": 3990,
    "discount_price": 3290,
    "is_deal": true,
    "rating": 4.7,
    "review_count": 24,
    "status": "active",
    "images": [
      {
        "id": "img-str-06-1",
        "product_id": "prod-str-06",
        "url": "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Tactical Utility Vest",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-str-06-m-sge",
        "product_id": "prod-str-06",
        "sku": "LUM-STR-VST-M-SGE",
        "color": "Tactical Sage",
        "color_hex": "#778899",
        "size": "M",
        "price": 3290,
        "compare_at_price": 3990,
        "weight_grams": 480,
        "is_active": true
      },
      {
        "id": "var-str-06-l-sge",
        "product_id": "prod-str-06",
        "sku": "LUM-STR-VST-L-SGE",
        "color": "Tactical Sage",
        "color_hex": "#778899",
        "size": "L",
        "price": 3290,
        "compare_at_price": 3990,
        "weight_grams": 480,
        "is_active": true
      }
    ],
    "created_at": "2025-01-20T14:00:00Z",
    "updated_at": "2025-01-20T14:00:00Z"
  },
  {
    "id": "prod-str-07",
    "slug": "acid-washed-boxy-oversized-graphic-hoodie",
    "name": "Subversive Monolith Acid-Wash Graphic Hoodie",
    "brand": "District Zero by LUMIÈRE",
    "category_slug": "streetwear",
    "collection_slug": "tokyo-mumbai-street",
    "description": "Custom vintage mineral wash creates unique wear patterns on every single piece. Features distressed puff-print typographic detailing on the reverse.",
    "fabric_care": "100% Combed Cotton (400 GSM). Machine wash cold.",
    "origin": "Ludhiana, Punjab",
    "is_affiliate": false,
    "base_price": 4790,
    "rating": 4.9,
    "review_count": 67,
    "status": "active",
    "images": [
      {
        "id": "img-str-07-1",
        "product_id": "prod-str-07",
        "url": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Acid Wash Graphic Hoodie",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-str-07-s-gry",
        "product_id": "prod-str-07",
        "sku": "LUM-STR-GHD-S-GRY",
        "color": "Mineral Grey",
        "color_hex": "#505050",
        "size": "S",
        "price": 4790,
        "compare_at_price": 5490,
        "weight_grams": 800,
        "is_active": true
      },
      {
        "id": "var-str-07-m-gry",
        "product_id": "prod-str-07",
        "sku": "LUM-STR-GHD-M-GRY",
        "color": "Mineral Grey",
        "color_hex": "#505050",
        "size": "M",
        "price": 4790,
        "compare_at_price": 5490,
        "weight_grams": 800,
        "is_active": true
      },
      {
        "id": "var-str-07-l-gry",
        "product_id": "prod-str-07",
        "sku": "LUM-STR-GHD-L-GRY",
        "color": "Mineral Grey",
        "color_hex": "#505050",
        "size": "L",
        "price": 4790,
        "compare_at_price": 5490,
        "weight_grams": 800,
        "is_active": true
      }
    ],
    "created_at": "2025-01-21T12:00:00Z",
    "updated_at": "2025-01-21T12:00:00Z"
  },
  {
    "id": "prod-str-08",
    "slug": "relaxed-fit-washed-double-knee-carpenter-pants",
    "name": "Heavy Duck Canvas Double-Knee Carpenter Pants",
    "brand": "District Zero by LUMIÈRE",
    "category_slug": "streetwear",
    "description": "12 Oz ring-spun duck cotton canvas with reinforced double knee panels, rivet hammer loop, and triple needle flat-felled seam construction.",
    "fabric_care": "100% Heavy Cotton Duck Canvas. Machine wash warm.",
    "origin": "Surat, Gujarat",
    "is_affiliate": false,
    "base_price": 4590,
    "rating": 4.8,
    "review_count": 45,
    "status": "active",
    "images": [
      {
        "id": "img-str-08-1",
        "product_id": "prod-str-08",
        "url": "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Double Knee Carpenter Pants",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-str-08-s-khk",
        "product_id": "prod-str-08",
        "sku": "LUM-STR-CRP-S-KHK",
        "color": "Raw Khaki Tan",
        "color_hex": "#C3B091",
        "size": "S",
        "price": 4590,
        "compare_at_price": 5200,
        "weight_grams": 680,
        "is_active": true
      },
      {
        "id": "var-str-08-m-khk",
        "product_id": "prod-str-08",
        "sku": "LUM-STR-CRP-M-KHK",
        "color": "Raw Khaki Tan",
        "color_hex": "#C3B091",
        "size": "M",
        "price": 4590,
        "compare_at_price": 5200,
        "weight_grams": 680,
        "is_active": true
      },
      {
        "id": "var-str-08-l-khk",
        "product_id": "prod-str-08",
        "sku": "LUM-STR-CRP-L-KHK",
        "color": "Raw Khaki Tan",
        "color_hex": "#C3B091",
        "size": "L",
        "price": 4590,
        "compare_at_price": 5200,
        "weight_grams": 680,
        "is_active": true
      }
    ],
    "created_at": "2025-01-22T11:00:00Z",
    "updated_at": "2025-01-22T11:00:00Z"
  },
  {
    "id": "prod-str-09",
    "slug": "district-zero-cyber-reflex-coach-jacket",
    "name": "Reflective Technical Water-Repellent Coach Jacket",
    "brand": "District Zero by LUMIÈRE",
    "category_slug": "streetwear",
    "collection_slug": "tokyo-mumbai-street",
    "description": "Lightweight weather-resistant jacket equipped with snap-button placket, breathable mesh inner lining, and 3M Scotchlite reflective back branding.",
    "fabric_care": "100% Water-Repellent Nylon Shell. Machine wash cold.",
    "origin": "Noida, Uttar Pradesh",
    "is_affiliate": false,
    "base_price": 5490,
    "discount_price": 4490,
    "is_deal": true,
    "rating": 4.8,
    "review_count": 31,
    "status": "active",
    "images": [
      {
        "id": "img-str-09-1",
        "product_id": "prod-str-09",
        "url": "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Reflective Coach Jacket",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-str-09-m-noi",
        "product_id": "prod-str-09",
        "sku": "LUM-STR-COA-M-NOI",
        "color": "Stealth Noir",
        "color_hex": "#0A0A0A",
        "size": "M",
        "price": 4490,
        "compare_at_price": 5490,
        "weight_grams": 450,
        "is_active": true
      },
      {
        "id": "var-str-09-l-noi",
        "product_id": "prod-str-09",
        "sku": "LUM-STR-COA-L-NOI",
        "color": "Stealth Noir",
        "color_hex": "#0A0A0A",
        "size": "L",
        "price": 4490,
        "compare_at_price": 5490,
        "weight_grams": 450,
        "is_active": true
      },
      {
        "id": "var-str-09-xl-noi",
        "product_id": "prod-str-09",
        "sku": "LUM-STR-COA-XL-NOI",
        "color": "Stealth Noir",
        "color_hex": "#0A0A0A",
        "size": "XL",
        "price": 4490,
        "compare_at_price": 5490,
        "weight_grams": 450,
        "is_active": true
      }
    ],
    "created_at": "2025-01-23T14:30:00Z",
    "updated_at": "2025-01-23T14:30:00Z"
  },
  {
    "id": "prod-str-10",
    "slug": "heavy-cotton-thermal-waffle-knit-longsleeve",
    "name": "320 GSM Chunky Waffle Knit Longsleeve Layering Crew",
    "brand": "District Zero by LUMIÈRE",
    "category_slug": "streetwear",
    "description": "Dimensional heavy waffle weave providing breathability and thermal structure. Ideal for layered urban aesthetics.",
    "fabric_care": "100% Combed Cotton. Machine wash delicate.",
    "origin": "Tiruppur, Tamil Nadu",
    "is_affiliate": false,
    "base_price": 2790,
    "rating": 4.7,
    "review_count": 58,
    "status": "active",
    "images": [
      {
        "id": "img-str-10-1",
        "product_id": "prod-str-10",
        "url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Waffle Knit Longsleeve",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-str-10-s-oat",
        "product_id": "prod-str-10",
        "sku": "LUM-STR-WAF-S-OAT",
        "color": "Oatmeal Melange",
        "color_hex": "#EFEBD9",
        "size": "S",
        "price": 2790,
        "compare_at_price": 3200,
        "weight_grams": 370,
        "is_active": true
      },
      {
        "id": "var-str-10-m-oat",
        "product_id": "prod-str-10",
        "sku": "LUM-STR-WAF-M-OAT",
        "color": "Oatmeal Melange",
        "color_hex": "#EFEBD9",
        "size": "M",
        "price": 2790,
        "compare_at_price": 3200,
        "weight_grams": 370,
        "is_active": true
      },
      {
        "id": "var-str-10-l-oat",
        "product_id": "prod-str-10",
        "sku": "LUM-STR-WAF-L-OAT",
        "color": "Oatmeal Melange",
        "color_hex": "#EFEBD9",
        "size": "L",
        "price": 2790,
        "compare_at_price": 3200,
        "weight_grams": 370,
        "is_active": true
      }
    ],
    "created_at": "2025-01-24T09:00:00Z",
    "updated_at": "2025-01-24T09:00:00Z"
  },
  {
    "id": "prod-str-11",
    "slug": "corduroy-relaxed-overshirt-burnt-umber",
    "name": "8-Wale Chunky Cotton Corduroy Boxy Overshirt",
    "brand": "District Zero by LUMIÈRE",
    "category_slug": "streetwear",
    "description": "Plush wide-wale corduroy with substantial hand feel, dual chest flap pockets, and straight-cut streetwear hem designed for effortless overshirt styling.",
    "fabric_care": "100% Cotton Corduroy. Machine wash cold inside out.",
    "origin": "Ludhiana, Punjab",
    "is_affiliate": false,
    "base_price": 4290,
    "discount_price": 3490,
    "is_deal": true,
    "rating": 4.8,
    "review_count": 39,
    "status": "active",
    "images": [
      {
        "id": "img-str-11-1",
        "product_id": "prod-str-11",
        "url": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Corduroy Overshirt",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-str-11-s-umb",
        "product_id": "prod-str-11",
        "sku": "LUM-STR-CRD-S-UMB",
        "color": "Burnt Umber",
        "color_hex": "#8A3324",
        "size": "S",
        "price": 3490,
        "compare_at_price": 4290,
        "weight_grams": 580,
        "is_active": true
      },
      {
        "id": "var-str-11-m-umb",
        "product_id": "prod-str-11",
        "sku": "LUM-STR-CRD-M-UMB",
        "color": "Burnt Umber",
        "color_hex": "#8A3324",
        "size": "M",
        "price": 3490,
        "compare_at_price": 4290,
        "weight_grams": 580,
        "is_active": true
      },
      {
        "id": "var-str-11-l-umb",
        "product_id": "prod-str-11",
        "sku": "LUM-STR-CRD-L-UMB",
        "color": "Burnt Umber",
        "color_hex": "#8A3324",
        "size": "L",
        "price": 3490,
        "compare_at_price": 4290,
        "weight_grams": 580,
        "is_active": true
      }
    ],
    "created_at": "2025-01-25T13:00:00Z",
    "updated_at": "2025-01-25T13:00:00Z"
  },
  {
    "id": "prod-lux-03",
    "slug": "bespoke-hand-embroidered-velvet-zardozi-achkan",
    "name": "Royal Midnight Velvet Zardozi Embroidered Achkan",
    "brand": "LUMIÈRE Haute",
    "category_slug": "premium-luxury",
    "collection_slug": "royal-rajasthan",
    "description": "Handcrafted in deep Italian micro-velvet adorned with authentic 24-karat gold-plated bullion wire (zari) and hand-stitched semi-precious agate stones. A masterwork of bespoke royal ceremonial tailoring.",
    "fabric_care": "Pure Micro Velvet with Fine Silk Satin Lining. Archive specialist dry clean.",
    "origin": "Jaipur, Rajasthan",
    "is_affiliate": false,
    "base_price": 42000,
    "rating": 5,
    "review_count": 9,
    "status": "active",
    "images": [
      {
        "id": "img-lux-03-1",
        "product_id": "prod-lux-03",
        "url": "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Velvet Zardozi Achkan",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-lux-03-m-mid",
        "product_id": "prod-lux-03",
        "sku": "LUM-LUX-ACH-M-MID",
        "color": "Midnight Noir",
        "color_hex": "#0B0C10",
        "size": "M",
        "price": 42000,
        "compare_at_price": 48000,
        "weight_grams": 1400,
        "is_active": true
      },
      {
        "id": "var-lux-03-l-mid",
        "product_id": "prod-lux-03",
        "sku": "LUM-LUX-ACH-L-MID",
        "color": "Midnight Noir",
        "color_hex": "#0B0C10",
        "size": "L",
        "price": 42000,
        "compare_at_price": 48000,
        "weight_grams": 1400,
        "is_active": true
      },
      {
        "id": "var-lux-03-xl-mid",
        "product_id": "prod-lux-03",
        "sku": "LUM-LUX-ACH-XL-MID",
        "color": "Midnight Noir",
        "color_hex": "#0B0C10",
        "size": "XL",
        "price": 42000,
        "compare_at_price": 48000,
        "weight_grams": 1400,
        "is_active": true
      }
    ],
    "created_at": "2025-01-19T10:00:00Z",
    "updated_at": "2025-01-19T10:00:00Z"
  },
  {
    "id": "prod-lux-04",
    "slug": "pure-assam-muga-golden-silk-heirloom-trench-coat",
    "name": "Assam Geographical-Indication Pure Muga Golden Silk Trench",
    "brand": "LUMIÈRE Haute",
    "category_slug": "premium-luxury",
    "description": "Woven exclusively from wild silkworms indigenous to the Brahmaputra valley. Naturally golden-hued, becoming more lustrous with every cleaning. Tailored with storm flaps and horn buckle hardware.",
    "fabric_care": "100% Certified Wild Muga Silk. Specialist silk dry clean only.",
    "origin": "Sualkuchi, Assam",
    "is_affiliate": false,
    "base_price": 52000,
    "rating": 5,
    "review_count": 7,
    "status": "active",
    "images": [
      {
        "id": "img-lux-04-1",
        "product_id": "prod-lux-04",
        "url": "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Muga Golden Silk Trench",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-lux-04-s-gld",
        "product_id": "prod-lux-04",
        "sku": "LUM-LUX-MUG-S-GLD",
        "color": "Raw Molten Gold",
        "color_hex": "#D4AF37",
        "size": "S",
        "price": 52000,
        "compare_at_price": 60000,
        "weight_grams": 680,
        "is_active": true
      },
      {
        "id": "var-lux-04-m-gld",
        "product_id": "prod-lux-04",
        "sku": "LUM-LUX-MUG-M-GLD",
        "color": "Raw Molten Gold",
        "color_hex": "#D4AF37",
        "size": "M",
        "price": 52000,
        "compare_at_price": 60000,
        "weight_grams": 680,
        "is_active": true
      },
      {
        "id": "var-lux-04-l-gld",
        "product_id": "prod-lux-04",
        "sku": "LUM-LUX-MUG-L-GLD",
        "color": "Raw Molten Gold",
        "color_hex": "#D4AF37",
        "size": "L",
        "price": 52000,
        "compare_at_price": 60000,
        "weight_grams": 680,
        "is_active": true
      }
    ],
    "created_at": "2025-01-20T11:00:00Z",
    "updated_at": "2025-01-20T11:00:00Z"
  },
  {
    "id": "prod-lux-05",
    "slug": "artisanal-hand-woven-vicuna-cashmere-wrap-shawl",
    "name": "Himalayan Handspun 2-Ply Ultra-Fine Cashmere Wrap",
    "brand": "LUMIÈRE Haute",
    "category_slug": "premium-luxury",
    "description": "Woven by generational artisans in Srinagar on heritage handlooms using the finest 13.5 micron underdown hair. Finished with hand-knotted natural fringe.",
    "fabric_care": "100% Pure Himalayan Cashmere. Professional specialist cleaning.",
    "origin": "Srinagar, Jammu & Kashmir",
    "is_affiliate": false,
    "base_price": 38000,
    "rating": 4.9,
    "review_count": 12,
    "status": "active",
    "images": [
      {
        "id": "img-lux-05-1",
        "product_id": "prod-lux-05",
        "url": "https://images.unsplash.com/photo-1610030469668-932d8a0c2018?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Cashmere Wrap Shawl",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-lux-05-fs-nat",
        "product_id": "prod-lux-05",
        "sku": "LUM-LUX-VIC-FS-NAT",
        "color": "Natural Oatmeal",
        "color_hex": "#E3DAC9",
        "size": "Free Size",
        "price": 38000,
        "compare_at_price": 44000,
        "weight_grams": 190,
        "is_active": true
      }
    ],
    "created_at": "2025-01-21T13:00:00Z",
    "updated_at": "2025-01-21T13:00:00Z"
  },
  {
    "id": "prod-lux-06",
    "slug": "gold-threaded-banarasi-tissue-bridal-ensemble",
    "name": "Heirloom Banarasi Pure Tissue & Zari Ceremonial Ensemble",
    "brand": "LUMIÈRE Haute",
    "category_slug": "premium-luxury",
    "collection_slug": "royal-rajasthan",
    "description": "An awe-inspiring heirloom lehenga featuring pure silver and 24k electroplated gold zari woven seamlessly into tissue silk with antique minakari accents.",
    "fabric_care": "Pure Gold/Silver Tissue Silk. Museum-grade preservation dry clean.",
    "origin": "Varanasi, Uttar Pradesh",
    "is_affiliate": false,
    "base_price": 64000,
    "rating": 5,
    "review_count": 6,
    "status": "active",
    "images": [
      {
        "id": "img-lux-06-1",
        "product_id": "prod-lux-06",
        "url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Banarasi Tissue Bridal Ensemble",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-lux-06-s-rdl",
        "product_id": "prod-lux-06",
        "sku": "LUM-LUX-BRD-S-RDL",
        "color": "Gulabi Regal Rose",
        "color_hex": "#E0BFB8",
        "size": "S",
        "price": 64000,
        "compare_at_price": 72000,
        "weight_grams": 1800,
        "is_active": true
      },
      {
        "id": "var-lux-06-m-rdl",
        "product_id": "prod-lux-06",
        "sku": "LUM-LUX-BRD-M-RDL",
        "color": "Gulabi Regal Rose",
        "color_hex": "#E0BFB8",
        "size": "M",
        "price": 64000,
        "compare_at_price": 72000,
        "weight_grams": 1800,
        "is_active": true
      }
    ],
    "created_at": "2025-01-22T10:00:00Z",
    "updated_at": "2025-01-22T10:00:00Z"
  },
  {
    "id": "prod-lux-07",
    "slug": "bespoke-double-faced-cashmere-robe-coat",
    "name": "Hand-Stitched Double-Faced Cashmere Robe Coat",
    "brand": "LUMIÈRE Privé",
    "category_slug": "premium-luxury",
    "description": "Crafted by hand-splitting two layers of ultra-fine cashmere fabric and sewing invisible interior seams. Features relaxed dropped shoulders and a self-tie waist belt.",
    "fabric_care": "100% Cashmere. Specialty dry clean only.",
    "origin": "Jaipur, Rajasthan",
    "is_affiliate": false,
    "base_price": 49000,
    "rating": 4.9,
    "review_count": 10,
    "status": "active",
    "images": [
      {
        "id": "img-lux-07-1",
        "product_id": "prod-lux-07",
        "url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Double-Faced Cashmere Robe Coat",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-lux-07-m-ivr",
        "product_id": "prod-lux-07",
        "sku": "LUM-LUX-ROB-M-IVR",
        "color": "Oatmeal Melange",
        "color_hex": "#DFD7CD",
        "size": "M",
        "price": 49000,
        "compare_at_price": 56000,
        "weight_grams": 850,
        "is_active": true
      },
      {
        "id": "var-lux-07-l-ivr",
        "product_id": "prod-lux-07",
        "sku": "LUM-LUX-ROB-L-IVR",
        "color": "Oatmeal Melange",
        "color_hex": "#DFD7CD",
        "size": "L",
        "price": 49000,
        "compare_at_price": 56000,
        "weight_grams": 850,
        "is_active": true
      }
    ],
    "created_at": "2025-01-23T11:00:00Z",
    "updated_at": "2025-01-23T11:00:00Z"
  },
  {
    "id": "prod-aff-04",
    "slug": "anita-dongre-hand-embroidered-pichhwai-silk-jacket",
    "name": "Anita Dongre Hand-Embroidered Pichhwai Silk Jacket",
    "brand": "Anita Dongre",
    "category_slug": "premium-luxury",
    "description": "Artisanal hand-embroidered raw silk jacket featuring revered Pichhwai cows and lotus blooms crafted with resham threadwork and marodi embroidery.",
    "fabric_care": "Handwoven Silk. Dry clean only.",
    "origin": "Jaipur, Rajasthan",
    "is_affiliate": true,
    "affiliate_source_name": "Tata CLiQ Luxury",
    "affiliate_url": "https://luxury.tatacliq.com/anita-dongre-pichhwai-jacket?utm_source=lumiere_affiliate&utm_medium=curated&utm_campaign=luxury_edit",
    "affiliate_disclosure": "Affiliate Discovery: Sold and fulfilled externally by Tata CLiQ Luxury. LUMIÈRE earns a verified partner commission when purchased through this link at no additional cost to you.",
    "base_price": 49500,
    "rating": 4.9,
    "review_count": 18,
    "status": "active",
    "images": [
      {
        "id": "img-aff-04-1",
        "product_id": "prod-aff-04",
        "url": "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1000&q=80",
        "alt_text": "Anita Dongre Pichhwai Jacket",
        "display_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-aff-04-m",
        "product_id": "prod-aff-04",
        "sku": "AFF-ANI-JKT-M",
        "color": "Crimson Red",
        "color_hex": "#990000",
        "size": "M",
        "price": 49500,
        "weight_grams": 650,
        "is_active": true
      },
      {
        "id": "var-aff-04-l",
        "product_id": "prod-aff-04",
        "sku": "AFF-ANI-JKT-L",
        "color": "Crimson Red",
        "color_hex": "#990000",
        "size": "L",
        "price": 49500,
        "weight_grams": 650,
        "is_active": true
      }
    ],
    "created_at": "2025-01-25T12:00:00Z",
    "updated_at": "2025-01-25T12:00:00Z"
  }
];

// -----------------------------------------------------------------------------
// INITIAL INVENTORY RECORDS (SKU to Physical Stock & Reserved Stock)
// -----------------------------------------------------------------------------
export const INITIAL_INVENTORY: Record<string, { physical_stock: number; reserved_stock: number; low_stock_threshold: number }> = {
  // Ethnic Wear
  "LUM-ETH-GUL-S-ROSE": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-GUL-M-ROSE": { physical_stock: 18, reserved_stock: 1, low_stock_threshold: 4 },
  "LUM-ETH-GUL-L-ROSE": { physical_stock: 12, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-GUL-XL-ROSE": { physical_stock: 3, reserved_stock: 0, low_stock_threshold: 4 }, // Low stock warning test!
  "LUM-ETH-EMR-M-GRN": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-ETH-EMR-L-GRN": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-ETH-EMR-XL-GRN": { physical_stock: 2, reserved_stock: 0, low_stock_threshold: 3 }, // Low stock!
  "LUM-ETH-MAH-FS-GLD": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 5 },
  "LUM-ETH-BND-S-RED": { physical_stock: 5, reserved_stock: 0, low_stock_threshold: 2 },
  "LUM-ETH-BND-M-RED": { physical_stock: 7, reserved_stock: 0, low_stock_threshold: 2 },
  "LUM-ETH-BND-L-RED": { physical_stock: 4, reserved_stock: 0, low_stock_threshold: 2 },

  // Women's
  "LUM-WOM-TRN-XS-IVO": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-WOM-TRN-S-IVO": { physical_stock: 12, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-WOM-TRN-M-IVO": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-WOM-TRN-L-IVO": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-WOM-SLP-S-BLK": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-WOM-SLP-M-BLK": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-WOM-SLP-L-BLK": { physical_stock: 7, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-WOM-BLS-S-WHT": { physical_stock: 16, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-BLS-M-WHT": { physical_stock: 20, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-BLS-L-WHT": { physical_stock: 11, reserved_stock: 0, low_stock_threshold: 4 },

  // Men's
  "LUM-MEN-POL-S-SND": { physical_stock: 22, reserved_stock: 0, low_stock_threshold: 5 },
  "LUM-MEN-POL-M-SND": { physical_stock: 28, reserved_stock: 0, low_stock_threshold: 5 },
  "LUM-MEN-POL-L-SND": { physical_stock: 25, reserved_stock: 0, low_stock_threshold: 5 },
  "LUM-MEN-POL-XL-SND": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 5 },
  "LUM-MEN-GRK-M-OLV": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-MEN-GRK-L-OLV": { physical_stock: 16, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-MEN-GRK-XL-OLV": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 3 },
  "LUM-MEN-BDH-S-CHR": { physical_stock: 5, reserved_stock: 0, low_stock_threshold: 2 },
  "LUM-MEN-BDH-M-CHR": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 2 },
  "LUM-MEN-BDH-L-CHR": { physical_stock: 4, reserved_stock: 0, low_stock_threshold: 2 },

  // Streetwear
  "LUM-STR-HD1-S-BLK": { physical_stock: 30, reserved_stock: 0, low_stock_threshold: 6 },
  "LUM-STR-HD1-M-BLK": { physical_stock: 45, reserved_stock: 0, low_stock_threshold: 6 },
  "LUM-STR-HD1-L-BLK": { physical_stock: 35, reserved_stock: 0, low_stock_threshold: 6 },
  "LUM-STR-HD1-XL-BLK": { physical_stock: 18, reserved_stock: 0, low_stock_threshold: 6 },
  "LUM-STR-CRG-M-SLT": { physical_stock: 24, reserved_stock: 0, low_stock_threshold: 5 },
  "LUM-STR-CRG-L-SLT": { physical_stock: 20, reserved_stock: 0, low_stock_threshold: 5 },
  "LUM-STR-TEE-S-ECR": { physical_stock: 40, reserved_stock: 0, low_stock_threshold: 8 },
  "LUM-STR-TEE-M-ECR": { physical_stock: 50, reserved_stock: 0, low_stock_threshold: 8 },
  "LUM-STR-TEE-L-ECR": { physical_stock: 35, reserved_stock: 0, low_stock_threshold: 8 },

  // Luxury
  "LUM-LUX-KAN-FS-IVO": { physical_stock: 4, reserved_stock: 0, low_stock_threshold: 1 },
  "LUM-LUX-CAP-S-GLD": { physical_stock: 3, reserved_stock: 0, low_stock_threshold: 1 },
  "LUM-LUX-CAP-M-GLD": { physical_stock: 2, reserved_stock: 0, low_stock_threshold: 1 },

  // Affiliates
  "AFF-SAB-CLU-01": { physical_stock: 999, reserved_stock: 0, low_stock_threshold: 0 },
  "AFF-RAW-SAR-01": { physical_stock: 999, reserved_stock: 0, low_stock_threshold: 0 },
  "AFF-NIC-SHR-M": { physical_stock: 999, reserved_stock: 0, low_stock_threshold: 0 },
  "AFF-NIC-SHR-L": { physical_stock: 999, reserved_stock: 0, low_stock_threshold: 0 },

  // Expanded Catalog Inventory
  "LUM-ETH-AJR-S-BLU": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-AJR-M-BLU": { physical_stock: 25, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-AJR-L-BLU": { physical_stock: 11, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-SHK-M-GLD": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-SHK-L-GLD": { physical_stock: 9, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-SHK-XL-GLD": { physical_stock: 18, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-CHK-S-WHT": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-CHK-M-WHT": { physical_stock: 11, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-CHK-L-WHT": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-KAL-FS-RST": { physical_stock: 20, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-WST-S-OCH": { physical_stock: 7, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-WST-M-OCH": { physical_stock: 20, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-WST-L-OCH": { physical_stock: 18, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-ETH-PAI-FS-MAG": { physical_stock: 23, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-TRS-S-TAU": { physical_stock: 25, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-TRS-M-TAU": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-TRS-L-TAU": { physical_stock: 9, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-BLZ-S-CAM": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-BLZ-M-CAM": { physical_stock: 18, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-BLZ-L-CAM": { physical_stock: 13, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-KAF-FS-EMR": { physical_stock: 22, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-SHD-S-IND": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-SHD-M-IND": { physical_stock: 17, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-SHD-L-IND": { physical_stock: 22, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-SKT-S-OLV": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-SKT-M-OLV": { physical_stock: 25, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-SKT-L-OLV": { physical_stock: 24, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-TRT-S-CRM": { physical_stock: 24, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-TRT-M-CRM": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-TRT-L-CRM": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-WRP-S-TER": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-WRP-M-TER": { physical_stock: 18, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-WRP-L-TER": { physical_stock: 19, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-JKT-S-NOI": { physical_stock: 24, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-JKT-M-NOI": { physical_stock: 19, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-WOM-JKT-L-NOI": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-SHT-S-SKY": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-SHT-M-SKY": { physical_stock: 13, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-SHT-L-SKY": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-SHT-XL-SKY": { physical_stock: 11, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-CUB-S-SGE": { physical_stock: 17, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-CUB-M-SGE": { physical_stock: 16, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-CUB-L-SGE": { physical_stock: 16, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-BLZ-S-NVY": { physical_stock: 7, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-BLZ-M-NVY": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-BLZ-L-NVY": { physical_stock: 23, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-CHN-S-BGE": { physical_stock: 24, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-CHN-M-BGE": { physical_stock: 7, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-CHN-L-BGE": { physical_stock: 24, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-LNG-S-WHT": { physical_stock: 12, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-LNG-M-WHT": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-LNG-L-WHT": { physical_stock: 21, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-KNT-S-GRY": { physical_stock: 13, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-KNT-M-GRY": { physical_stock: 11, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-KNT-L-GRY": { physical_stock: 17, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-DRW-S-TRC": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-DRW-M-TRC": { physical_stock: 22, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-DRW-L-TRC": { physical_stock: 18, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-OVC-M-CHR": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-OVC-L-CHR": { physical_stock: 12, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-MEN-OVC-XL-CHR": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-SWP-S-BLK": { physical_stock: 23, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-SWP-M-BLK": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-SWP-L-BLK": { physical_stock: 12, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-DNM-S-IND": { physical_stock: 25, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-DNM-M-IND": { physical_stock: 21, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-DNM-L-IND": { physical_stock: 20, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-VST-M-SGE": { physical_stock: 11, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-VST-L-SGE": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-GHD-S-GRY": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-GHD-M-GRY": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-GHD-L-GRY": { physical_stock: 13, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-CRP-S-KHK": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-CRP-M-KHK": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-CRP-L-KHK": { physical_stock: 7, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-COA-M-NOI": { physical_stock: 17, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-COA-L-NOI": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-COA-XL-NOI": { physical_stock: 9, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-WAF-S-OAT": { physical_stock: 13, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-WAF-M-OAT": { physical_stock: 22, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-WAF-L-OAT": { physical_stock: 18, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-CRD-S-UMB": { physical_stock: 15, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-CRD-M-UMB": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-STR-CRD-L-UMB": { physical_stock: 23, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-ACH-M-MID": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-ACH-L-MID": { physical_stock: 16, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-ACH-XL-MID": { physical_stock: 23, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-MUG-S-GLD": { physical_stock: 23, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-MUG-M-GLD": { physical_stock: 19, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-MUG-L-GLD": { physical_stock: 8, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-VIC-FS-NAT": { physical_stock: 10, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-BRD-S-RDL": { physical_stock: 25, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-BRD-M-RDL": { physical_stock: 14, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-ROB-M-IVR": { physical_stock: 9, reserved_stock: 0, low_stock_threshold: 4 },
  "LUM-LUX-ROB-L-IVR": { physical_stock: 6, reserved_stock: 0, low_stock_threshold: 4 },
  "AFF-ANI-JKT-M": { physical_stock: 999, reserved_stock: 0, low_stock_threshold: 0 },
  "AFF-ANI-JKT-L": { physical_stock: 999, reserved_stock: 0, low_stock_threshold: 0 },
};

// -----------------------------------------------------------------------------
// CURATED OUTFITS (Complete Look Discoveries)
// -----------------------------------------------------------------------------
export const CURATED_OUTFITS: CuratedOutfit[] = [
  {
    id: "outfit-01",
    slug: "udaipur-sangeet-regal-look",
    title: "The Udaipur Palace Sangeet Edit",
    occasion: "Royal Destination Weddings",
    description: "An intoxicating blend of old-world Rajputana court grandeur and modern structured poise. Handcrafted kadhwa silk anchored by antiqued gold accoutrements.",
    hero_image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
    product_ids: ["prod-eth-02", "prod-lux-01", "prod-aff-01"],
    styling_tips: [
      "Drape the Kani Pashmina over one shoulder with clean unstitched pleats.",
      "Pair with handcrafted mojris in raw brass tones.",
      "Carry the Sabyasachi minaudière clutch with minimal gold jewelry."
    ]
  },
  {
    id: "outfit-02",
    slug: "south-mumbai-resort-linen-look",
    title: "Kala Ghoda Art Walk & Sunday Brunch",
    occasion: "High-End Weekend Leisure",
    description: "Crisp European linen meets Japanese flatbed knitwear. Designed for high humidity without compromising architectural silhouette.",
    hero_image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    product_ids: ["prod-wom-01", "prod-wom-03", "prod-men-01"],
    styling_tips: [
      "Wear the organic linen trench unbelted over the poplin blouse for breezy movement.",
      "Pair with woven leather sandals and understated tortoiseshell eyewear."
    ]
  },
  {
    id: "outfit-03",
    slug: "bandra-district-zero-cyber-noir",
    title: "Bandra Underground Cyber Noir",
    occasion: "Contemporary Street & Nightlife",
    description: "Ultra-heavyweight 450 GSM French Terry contrasted with parachute ripstop cargo pants. Engineered for after-dark comfort.",
    hero_image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=80",
    product_ids: ["prod-str-01", "prod-str-02", "prod-str-03"],
    styling_tips: [
      "Cinch the parachute ankles to stack effortlessly over chunky sneakers.",
      "Layer the 280 GSM ecru tee beneath the boxy hoodie for intentional tonal contrast."
    ]
  }
];

// -----------------------------------------------------------------------------
// AFFILIATE PRODUCT REVIEW QUEUE (For Admin Review & Approval)
// -----------------------------------------------------------------------------
export const INITIAL_AFFILIATE_QUEUE: AffiliateProduct[] = [
  {
    id: "aff-queue-01",
    source_name: "Tata CLiQ Luxury",
    external_id: "TCL-SAB-0982",
    title: "Sabyasachi Royal Bengal Tiger Minaudière Clutch",
    brand: "Sabyasachi",
    category_name: "Luxury Accessories",
    original_price: 68500,
    image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80",
    destination_url: "https://luxury.tatacliq.com/sabyasachi-minaudiere",
    affiliate_tracking_url: "https://luxury.tatacliq.com/sabyasachi-minaudiere?aff_id=lumiere_luxury",
    in_stock: true,
    review_status: "approved",
    is_published: true,
    last_synced_at: "2025-01-28T04:00:00Z",
    created_at: "2025-01-22T10:00:00Z",
  },
  {
    id: "aff-queue-02",
    source_name: "Ajio Luxe",
    external_id: "AJL-RAW-5541",
    title: "Raw Mango 'Varanasi' Handwoven Brocade Saree",
    brand: "Raw Mango",
    category_name: "Ethnic Wear",
    original_price: 34500,
    image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    destination_url: "https://luxe.ajio.com/raw-mango-brocade-saree",
    affiliate_tracking_url: "https://luxe.ajio.com/raw-mango-brocade-saree?aff_id=lumiere_curations",
    in_stock: true,
    review_status: "approved",
    is_published: true,
    last_synced_at: "2025-01-28T04:00:00Z",
    created_at: "2025-01-23T11:00:00Z",
  },
  {
    id: "aff-queue-03",
    source_name: "Tata CLiQ Luxury",
    external_id: "TCL-TOR-4402",
    title: "Torani Chintz Hand-Embroidered Velvet Shawl",
    brand: "Torani",
    category_name: "Ethnic Wear",
    original_price: 28500,
    sale_price: 24500,
    image_url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
    destination_url: "https://luxury.tatacliq.com/torani-velvet-shawl",
    affiliate_tracking_url: "https://luxury.tatacliq.com/torani-velvet-shawl?aff_id=lumiere_luxury",
    in_stock: true,
    review_status: "pending",
    is_published: false,
    last_synced_at: "2025-01-28T04:00:00Z",
    created_at: "2025-01-27T16:20:00Z",
  },
  {
    id: "aff-queue-04",
    source_name: "Ajio Luxe",
    external_id: "AJL-NOR-8821",
    title: "NorBlack NorWhite Hand-Dyed Bandhani Bomber",
    brand: "NorBlack NorWhite",
    category_name: "Streetwear",
    original_price: 18000,
    image_url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80",
    destination_url: "https://luxe.ajio.com/norblack-norwhite-bomber",
    affiliate_tracking_url: "https://luxe.ajio.com/norblack-norwhite-bomber?aff_id=lumiere_curations",
    in_stock: false, // Flagged out of stock!
    review_status: "pending",
    is_published: false,
    last_synced_at: "2025-01-28T04:00:00Z",
    created_at: "2025-01-28T02:00:00Z",
  }
];
