import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { COLLECTIONS } from '@/data/collections';
import { Product, ProductFilterParams } from '@/types/product';
import { CategoryInfo, Collection } from '@/types/collection';

export interface ProductQueryResult {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  categories: string[];
  brands: string[];
  minAvailablePrice: number;
  maxAvailablePrice: number;
}

export async function getProducts(params: ProductFilterParams = {}): Promise<ProductQueryResult> {
  const {
    category,
    audience,
    brand,
    merchant,
    minPrice,
    maxPrice,
    search,
    sort = 'featured',
    collection,
    page = 1,
    limit = 12,
  } = params;

  // Filter active products
  let filtered = PRODUCTS.filter((p) => p.status === 'active');

  // Filter by category
  if (category && category !== 'all') {
    const cleanCategory = category.toLowerCase().trim();
    if (cleanCategory === 'mens-clothing' || cleanCategory === 'men') {
      filtered = filtered.filter((p) => p.audience === 'men' || p.audience === 'unisex');
    } else if (cleanCategory === 'womens-clothing' || cleanCategory === 'women') {
      filtered = filtered.filter((p) => p.audience === 'women' || p.audience === 'unisex');
    } else {
      filtered = filtered.filter((p) => p.category.toLowerCase() === cleanCategory);
    }
  }

  // Filter by audience / gender (men, women, unisex)
  if (audience && audience !== 'all') {
    const cleanAudience = audience.toLowerCase().trim();
    if (cleanAudience === 'men') {
      filtered = filtered.filter((p) => p.audience === 'men' || p.audience === 'unisex');
    } else if (cleanAudience === 'women') {
      filtered = filtered.filter((p) => p.audience === 'women' || p.audience === 'unisex');
    } else {
      filtered = filtered.filter((p) => p.audience === cleanAudience);
    }
  }

  // Filter by brand
  if (brand && brand !== 'all') {
    const cleanBrand = brand.toLowerCase().trim();
    filtered = filtered.filter((p) => p.brand.toLowerCase() === cleanBrand);
  }

  // Filter by merchant
  if (merchant && merchant !== 'all') {
    const cleanMerchant = merchant.toLowerCase().trim();
    filtered = filtered.filter((p) => p.merchantId.toLowerCase() === cleanMerchant);
  }

  // Filter by price range
  if (typeof minPrice === 'number' && !isNaN(minPrice) && minPrice >= 0) {
    filtered = filtered.filter((p) => p.currentPrice >= minPrice);
  }
  if (typeof maxPrice === 'number' && !isNaN(maxPrice) && maxPrice > 0) {
    filtered = filtered.filter((p) => p.currentPrice <= maxPrice);
  }

  // Filter by collection
  if (collection && collection !== 'all') {
    const coll = COLLECTIONS[collection];
    if (coll && coll.filterRule) {
      filtered = filtered.filter(coll.filterRule);
    }
  }

  // Search filter (name, brand, description, category, tags, merchant, price)
  if (search && search.trim()) {
    // Strip currency symbols (₹, $) and punctuation for tokenization
    const cleanedSearch = search.replace(/[₹$.,]/g, ' ').trim().toLowerCase();
    const queryTokens = cleanedSearch.split(/\s+/).filter(Boolean);

    filtered = filtered.filter((p) => {
      // Build comprehensive searchable corpus
      const targetText = [
        p.name,
        p.brand,
        p.description,
        p.category,
        p.audience,
        p.merchantId,
        String(p.currentPrice),
        p.under999 ? 'under 999 under-999 budget' : '',
        p.currentPrice <= 999 ? 'under 999 under-999 budget' : '',
        p.isPremium ? 'premium luxury designer' : '',
        p.isEverydayEssential ? 'essential basics everyday' : '',
        p.inSeason ? 'seasonal season' : '',
        ...(p.tags || []),
        ...(p.details || []),
      ]
        .join(' ')
        .toLowerCase();

      return queryTokens.every((token) => targetText.includes(token));
    });
  }

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.currentPrice - b.currentPrice;
      case 'price-desc':
        return b.currentPrice - a.currentPrice;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'featured':
      default:
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const total = filtered.length;
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.ceil(total / safeLimit) || 1;
  const offset = (safePage - 1) * safeLimit;
  const paginated = filtered.slice(offset, offset + safeLimit);

  // Compute available facets from active products
  const allActive = PRODUCTS.filter((p) => p.status === 'active');
  const availableCategories = Array.from(new Set(allActive.map((p) => p.category))).sort();
  const availableBrands = Array.from(new Set(allActive.map((p) => p.brand))).sort();
  const allPrices = allActive.map((p) => p.currentPrice);
  const minAvailablePrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxAvailablePrice = allPrices.length > 0 ? Math.max(...allPrices) : 50000;

  return {
    products: paginated,
    total,
    totalPages,
    currentPage: safePage,
    categories: availableCategories,
    brands: availableBrands,
    minAvailablePrice,
    maxAvailablePrice,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const cleanSlug = slug.toLowerCase().trim();
  const found = PRODUCTS.find((p) => p.slug.toLowerCase() === cleanSlug && p.status === 'active');
  return found || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const cleanId = id.trim();
  const found = PRODUCTS.find((p) => p.id === cleanId && p.status === 'active');
  return found || null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const candidates = PRODUCTS.filter(
    (p) => p.id !== product.id && p.status === 'active'
  );

  const scored = candidates.map((c) => {
    let score = 0;
    if (c.category === product.category) score += 5;
    if (c.audience === product.audience) score += 3;
    if (c.brand === product.brand) score += 2;
    const commonTags = c.tags.filter((t) => product.tags.includes(t));
    score += commonTags.length * 2;
    return { product: c, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.product);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.status === 'active' && p.featured).slice(0, limit);
}

export async function getTrendingProducts(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.status === 'active' && p.trending).slice(0, limit);
}

export async function getBudgetProducts(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.status === 'active' && p.currentPrice <= 999).slice(0, limit);
}

export async function getPremiumProducts(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.status === 'active' && p.isPremium).slice(0, limit);
}

export async function getSeasonalProducts(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.status === 'active' && p.inSeason).slice(0, limit);
}

export async function getRecentProducts(limit = 8): Promise<Product[]> {
  return [...PRODUCTS]
    .filter((p) => p.status === 'active')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function getProductsByMerchant(merchantId: string, limit = 8): Promise<Product[]> {
  const clean = merchantId.toLowerCase().trim();
  return PRODUCTS.filter((p) => p.status === 'active' && p.merchantId.toLowerCase() === clean).slice(0, limit);
}

export async function getAllCategories(): Promise<CategoryInfo[]> {
  return CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryInfo | null> {
  const clean = slug.toLowerCase().trim();
  if (clean === 'men') return CATEGORIES.find((c) => c.slug === 'mens-clothing') || null;
  if (clean === 'women') return CATEGORIES.find((c) => c.slug === 'womens-clothing') || null;
  return CATEGORIES.find((c) => c.slug === clean) || null;
}

export async function getAllCollections(): Promise<Collection[]> {
  return Object.values(COLLECTIONS);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const clean = slug.toLowerCase().trim();
  return COLLECTIONS[clean] || null;
}
