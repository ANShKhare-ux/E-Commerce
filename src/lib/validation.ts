import { z } from 'zod';

export const productCategorySchema = z.enum([
  't-shirts',
  'shirts',
  'jeans',
  'trousers',
  'dresses',
  'hoodies',
  'jackets',
  'ethnic-wear',
  'sportswear',
  'shoes',
  'accessories',
]);

export const productAudienceSchema = z.enum(['men', 'women', 'unisex']);

export const productImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().min(1),
  isPrimary: z.boolean().optional(),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1),
  description: z.string().min(1),
  details: z.array(z.string()).optional(),
  category: productCategorySchema,
  audience: productAudienceSchema,
  images: z.array(productImageSchema).min(1),
  currentPrice: z.number().int().nonnegative(),
  originalPrice: z.number().int().positive().optional(),
  currency: z.literal('INR'),
  merchantId: z.string().min(1),
  productUrl: z.string().url(),
  affiliateUrl: z.string().url(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  material: z.string().optional(),
  tags: z.array(z.string()),
  status: z.enum(['active', 'archived']),
  featured: z.boolean(),
  trending: z.boolean(),
  inSeason: z.boolean(),
  under999: z.boolean(),
  isEverydayEssential: z.boolean(),
  isPremium: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastPriceVerifiedAt: z.string(),
});

export const filterQuerySchema = z.object({
  category: z.string().optional(),
  audience: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  search: z.string().max(100).optional(),
  sort: z.enum(['featured', 'price-asc', 'price-desc', 'newest']).optional(),
  collection: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(12),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Please provide a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(120),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  honeypot: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  honeypot: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
