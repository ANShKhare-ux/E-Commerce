-- =============================================================================
-- LUMIÈRE Seed Data Migration (India E-Commerce Storefront)
-- Initial Categories, Collections, Curated Outfits, Products, Variants & Inventory
-- =============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, slug, name, description, image_url, display_order)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'ethnic-wear', 'Ethnic Wear', 'Handcrafted royal Indian silhouettes, chanderi silks, and bandhani elegance', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80', 1),
  ('c1000000-0000-0000-0000-000000000002', 'womens-clothing', 'Women''s Clothing', 'Contemporary western tailoring, linen shirts, slip dresses, and cashmere coats', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80', 2),
  ('c1000000-0000-0000-0000-000000000003', 'mens-clothing', 'Men''s Clothing', 'Bespoke tailoring, Supima cotton polos, Italian collar shirts, and formal trousers', 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80', 3),
  ('c1000000-0000-0000-0000-000000000004', 'streetwear', 'Streetwear', 'Heavyweight French terry hoodies, oversized boxy tees, and tech utility cargo', 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80', 4),
  ('c1000000-0000-0000-0000-000000000005', 'premium-luxury', 'Premium & Luxury', 'Sculpted artisanal garments crafted from pure raw silk, mulberry weave, and fine wool', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80', 5)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Collections
INSERT INTO public.collections (id, slug, title, tagline, description, banner_image, is_active, display_order)
VALUES
  ('b1000000-0000-0000-0000-000000000001', 'royal-rajasthan', 'Royal Heritage Edit', 'Timeless weaves and intricate artisanal embroidery inspired by Jaipur courtyards', 'A modern renaissance of Indian handlooms featuring rich jewel tones and zari work.', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80', true, 1),
  ('b1000000-0000-0000-0000-000000000002', 'monsoon-minimalism', 'Monsoon Minimalism', 'Breathable European linens and flowing relaxed silhouettes for humid Indian summers', 'Clean cuts, muted earth tones, and lightweight drape fabrics.', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80', true, 2),
  ('b1000000-0000-0000-0000-000000000003', 'tokyo-mumbai-street', 'District Zero Streetwear', 'Oversized structured cuts, heavyweight graphic drops, and cyber-noir aesthetics', 'Limited run streetwear engineered for comfort in Mumbai, Delhi, and Bengaluru.', 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1600&q=80', true, 3)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Affiliate Sources
INSERT INTO public.affiliate_sources (id, name, base_url, status, commission_rate)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Tata CLiQ Luxury', 'https://luxury.tatacliq.com', 'active', 7.50),
  ('a1000000-0000-0000-0000-000000000002', 'Ajio Luxe', 'https://luxe.ajio.com', 'active', 6.00),
  ('a1000000-0000-0000-0000-000000000003', 'Myntra Luxe', 'https://www.myntra.com/luxury', 'active', 5.50)
ON CONFLICT DO NOTHING;
