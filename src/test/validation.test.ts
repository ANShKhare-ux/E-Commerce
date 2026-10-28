import { describe, it, expect } from 'vitest';
import {
  contactFormSchema,
  newsletterFormSchema,
  productSchema,
} from '@/lib/validation';
import { PRODUCTS } from '@/data/products';

describe('Validation Schemas', () => {
  it('validates every curated product in the dataset against productSchema', () => {
    for (const product of PRODUCTS) {
      const parsed = productSchema.safeParse(product);
      if (!parsed.success) {
        console.error('Failed on product:', product.slug, parsed.error.issues);
      }
      expect(parsed.success).toBe(true);
    }
  });

  it('validates contact form submissions correctly', () => {
    const valid = {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      subject: 'Inquiry regarding linen shirts',
      message: 'Hello, could you add more relaxed fit linen shirts to the men category?',
    };
    expect(contactFormSchema.safeParse(valid).success).toBe(true);

    const invalidEmail = { ...valid, email: 'not-an-email' };
    expect(contactFormSchema.safeParse(invalidEmail).success).toBe(false);

    const tooShortMessage = { ...valid, message: 'hi' };
    expect(contactFormSchema.safeParse(tooShortMessage).success).toBe(false);

    // Spam honeypot detection
    const spamWithHoneypot = { ...valid, honeypot: 'bot-content' };
    expect(contactFormSchema.safeParse(spamWithHoneypot).success).toBe(false);
  });

  it('validates newsletter form submissions correctly', () => {
    expect(newsletterFormSchema.safeParse({ email: 'user@example.com' }).success).toBe(true);
    expect(newsletterFormSchema.safeParse({ email: 'bad-email' }).success).toBe(false);
    expect(
      newsletterFormSchema.safeParse({ email: 'user@example.com', honeypot: 'spam' }).success
    ).toBe(false);
  });
});
