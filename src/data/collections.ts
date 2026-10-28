import { Collection } from '@/types/collection';
import { Product } from '@/types/product';

export const COLLECTIONS: Record<string, Collection> = {
  'trending-now': {
    slug: 'trending-now',
    title: 'Trending Now',
    subtitle: 'The Outfits Shaping This Season',
    description:
      'Curated edit of the most sought-after silhouettes, viral contemporary cuts, and runway-inspired street style.',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format',
    tag: 'Trending',
    filterRule: (product: Product) => product.trending,
  },
  'new-arrivals': {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'Fresh Arrivals Just Indexed',
    description:
      'The newest clothing additions across premium Indian fashion retailers, verified and curated weekly.',
    heroImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80&auto=format',
    tag: 'Fresh',
    filterRule: (product: Product) => Boolean(product.createdAt),
  },
  'under-999': {
    slug: 'under-999',
    title: 'Under ₹999 Finds',
    subtitle: 'High Style, Accessible Budgets',
    description:
      'Quality doesn’t require extravagance. Discover exceptional 100% cotton staples, tees, and caps verified under ₹999.',
    heroImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80&auto=format',
    tag: 'Budget Luxury',
    filterRule: (product: Product) => product.currentPrice <= 999,
  },
  'everyday-essentials': {
    slug: 'everyday-essentials',
    title: 'Everyday Essentials',
    subtitle: 'Foundational Wardrobe Pieces',
    description:
      'Timeless crewnecks, tailored chinos, neutral overshirts, and denim designed to form the bedrock of your rotation.',
    heroImage: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1200&q=80&auto=format',
    tag: 'Core Wardrobe',
    filterRule: (product: Product) => product.isEverydayEssential,
  },
  'premium-picks': {
    slug: 'premium-picks',
    title: 'Premium Picks & Designer Labels',
    subtitle: 'Investment Pieces Built to Last',
    description:
      'Tailored wool, Italian leathers, artisanal handlooms, and architectural outerwear from premier luxury merchants.',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80&auto=format',
    tag: 'Luxe',
    filterRule: (product: Product) => product.isPremium,
  },
  'seasonal-style': {
    slug: 'seasonal-style',
    title: 'Seasonal Style Edit',
    subtitle: 'Weather-Conscious Dressing',
    description:
      'Breathable natural weaves, lightweight linens for sunny afternoons, and structured jackets for cool evenings.',
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80&auto=format',
    tag: 'In Season',
    filterRule: (product: Product) => product.inSeason,
  },
};
