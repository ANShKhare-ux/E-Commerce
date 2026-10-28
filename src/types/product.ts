export type ProductCategory =
  | 'mens-clothing'
  | 'womens-clothing'
  | 't-shirts'
  | 'shirts'
  | 'jeans'
  | 'trousers'
  | 'dresses'
  | 'hoodies'
  | 'jackets'
  | 'ethnic-wear'
  | 'sportswear'
  | 'shoes'
  | 'accessories';

export type ProductAudience = 'men' | 'women' | 'unisex';

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  details?: string[];
  category: ProductCategory;
  audience: ProductAudience;
  images: ProductImage[];
  currentPrice: number; // Stored in INR (₹) as integer
  originalPrice?: number; // Verified original retail price in INR
  currency: 'INR';
  merchantId: string;
  productUrl: string;
  affiliateUrl: string;
  sizes: string[];
  colors: string[];
  material?: string;
  tags: string[];
  status: 'active' | 'archived';
  featured: boolean;
  trending: boolean;
  inSeason: boolean;
  under999: boolean;
  isEverydayEssential: boolean;
  isPremium: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string;
  lastPriceVerifiedAt: string;
}

export interface ProductFilterParams {
  category?: string;
  audience?: string;
  brand?: string;
  merchant?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  collection?: string;
  page?: number;
  limit?: number;
}
