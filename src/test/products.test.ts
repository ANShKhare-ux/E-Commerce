import { describe, it, expect } from 'vitest';
import {
  getProducts,
  getProductBySlug,
  getProductById,
  getRelatedProducts,
  getBudgetProducts,
  getTrendingProducts,
} from '@/lib/products';

describe('Product Repository & Filter Engine', () => {
  it('returns all active products when no filters are applied', async () => {
    const result = await getProducts();
    expect(result.products.length).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(0);
    expect(result.categories.length).toBeGreaterThan(0);
    expect(result.brands.length).toBeGreaterThan(0);
  });

  it('filters products correctly by category', async () => {
    const shirts = await getProducts({ category: 'shirts' });
    expect(shirts.products.length).toBeGreaterThan(0);
    expect(shirts.products.every((p) => p.category === 'shirts')).toBe(true);

    const dresses = await getProducts({ category: 'dresses' });
    expect(dresses.products.length).toBeGreaterThan(0);
    expect(dresses.products.every((p) => p.category === 'dresses')).toBe(true);
  });

  it('filters products correctly by audience (gender)', async () => {
    const menResult = await getProducts({ audience: 'men' });
    // Should include items specifically for men and unisex
    expect(menResult.products.length).toBeGreaterThan(0);
    expect(menResult.products.every((p) => p.audience === 'men' || p.audience === 'unisex')).toBe(true);

    const womenResult = await getProducts({ audience: 'women' });
    expect(womenResult.products.length).toBeGreaterThan(0);
    expect(womenResult.products.every((p) => p.audience === 'women' || p.audience === 'unisex')).toBe(true);
  });

  it('filters products correctly by price range', async () => {
    const budget = await getProducts({ maxPrice: 999 });
    expect(budget.products.length).toBeGreaterThan(0);
    expect(budget.products.every((p) => p.currentPrice <= 999)).toBe(true);

    const luxury = await getProducts({ minPrice: 10000 });
    expect(luxury.products.length).toBeGreaterThan(0);
    expect(luxury.products.every((p) => p.currentPrice >= 10000)).toBe(true);
  });

  it('filters products correctly by brand', async () => {
    const result = await getProducts({ brand: 'Marks & Spencer' });
    expect(result.products.length).toBeGreaterThan(0);
    expect(result.products.every((p) => p.brand.toLowerCase() === 'marks & spencer')).toBe(true);
  });

  it('filters products correctly by collection', async () => {
    const budgetColl = await getProducts({ collection: 'under-999' });
    expect(budgetColl.products.length).toBeGreaterThan(0);
    expect(budgetColl.products.every((p) => p.currentPrice <= 999)).toBe(true);
  });

  it('performs multi-token text search accurately', async () => {
    const searchLinen = await getProducts({ search: 'linen' });
    expect(searchLinen.products.length).toBeGreaterThan(0);

    const searchSelvedge = await getProducts({ search: 'selvedge denim' });
    expect(searchSelvedge.products.length).toBeGreaterThan(0);
  });

  it('handles price-based search queries and currency symbols like Under ₹999', async () => {
    const budgetSearch = await getProducts({ search: 'Under ₹999' });
    expect(budgetSearch.products.length).toBe(4);
    expect(budgetSearch.products.every((p) => p.currentPrice <= 999)).toBe(true);

    const numericSearch = await getProducts({ search: '799' });
    expect(numericSearch.products.length).toBeGreaterThan(0);
    expect(numericSearch.products.some((p) => p.currentPrice === 799)).toBe(true);
  });

  it('filters products correctly by merchant', async () => {
    const myntraResults = await getProducts({ merchant: 'myntra' });
    expect(myntraResults.products.length).toBeGreaterThan(0);
    expect(myntraResults.products.every((p) => p.merchantId === 'myntra')).toBe(true);
  });

  it('resolves Men’s and Women’s clothing categories accurately', async () => {
    const mens = await getProducts({ category: 'mens-clothing' });
    expect(mens.products.length).toBeGreaterThan(0);
    expect(mens.products.every((p) => p.audience === 'men' || p.audience === 'unisex')).toBe(true);

    const womens = await getProducts({ category: 'womens-clothing' });
    expect(womens.products.length).toBeGreaterThan(0);
    expect(womens.products.every((p) => p.audience === 'women' || p.audience === 'unisex')).toBe(true);
  });

  it('sorts products by price ascending and descending correctly', async () => {
    const asc = await getProducts({ sort: 'price-asc', limit: 20 });
    for (let i = 0; i < asc.products.length - 1; i++) {
      expect(asc.products[i].currentPrice).toBeLessThanOrEqual(asc.products[i + 1].currentPrice);
    }

    const desc = await getProducts({ sort: 'price-desc', limit: 20 });
    for (let i = 0; i < desc.products.length - 1; i++) {
      expect(desc.products[i].currentPrice).toBeGreaterThanOrEqual(desc.products[i + 1].currentPrice);
    }
  });

  it('retrieves product by slug and handles missing slugs', async () => {
    const found = await getProductBySlug('pure-french-linen-relaxed-shirt');
    expect(found).not.toBeNull();
    expect(found?.name).toContain('Linen');

    const notFound = await getProductBySlug('non-existent-garment-slug-12345');
    expect(notFound).toBeNull();
  });

  it('retrieves product by id and handles missing ids', async () => {
    const found = await getProductById('prod-001');
    expect(found).not.toBeNull();

    const notFound = await getProductById('unknown-id');
    expect(notFound).toBeNull();
  });

  it('returns related products excluding the current product', async () => {
    const product = (await getProductById('prod-001'))!;
    const related = await getRelatedProducts(product, 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every((r) => r.id !== product.id)).toBe(true);
  });
});
