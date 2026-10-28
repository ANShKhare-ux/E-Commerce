# Changelog

All notable changes to the LUMIÈRE Fashion Affiliate Platform will be documented in this file.

## [1.1.0] - 2026-10-28
### Security & Robustness Hardening
- **Rate Limiting:** Implemented sliding-window in-memory rate limiting utility (`src/lib/rate-limit.ts`) and integrated it into `/api/contact`, `/api/newsletter`, and `/api/outbound/[id]` to protect against spam, brute forcing, and denial-of-service.
- **Affiliate URL Security:** Added strict HTTPS enforcement and rejection of URLs containing embedded authentication credentials (`username:password@...`) in `src/lib/affiliate.ts`.
- **Open-Redirect & URL Decoding:** Enhanced `/api/outbound/[id]` with `decodeURIComponent` handling and sanitized error messages.
- **Server Component Optimization:** Converted `ProductCard.tsx` from a client component to a pure Server Component, reducing First Load JS across all catalog and category routes.
- **Schema.org Structured Data Compliance:** Removed fabricated in-stock availability claims from Product structured data in `src/app/products/[slug]/page.tsx` to adhere to FTC advertising honesty guidelines.
- **App Router UX:** Created `src/app/loading.tsx`, `src/app/shop/loading.tsx`, and `src/app/error.tsx` providing responsive skeleton states and error boundary recovery.
- **Search Engine Tokenization:** Upgraded search in `src/lib/products.ts` to support price-based queries ("Under ₹999", "under 999", numbers) and merchant queries, fixing zero-result returns on featured search suggestion pills.
- **Category Taxonomy:** Added Men's Clothing (`mens-clothing`) and Women's Clothing (`womens-clothing`) category pages and alias routing in `src/data/categories.ts` and `src/lib/products.ts`.
- **Homepage Completeness:** Added Seasonal Fashion section, Recently Added Products section, dual Men's/Women's wardrobe hero cards, and dedicated interactive NewsletterSection to `src/app/page.tsx`.
- **Collection Stability:** Fixed decay in `new-arrivals` collection filter rule so products do not expire to 0 over time.
- **Merchant Filter Support:** Wired `merchant` parameter into `src/app/shop/page.tsx` and `src/lib/products.ts`.

## [1.0.0] - 2026-10-28
### Added
- Scaffolding of Next.js 14 App Router project with TypeScript strict mode and Tailwind CSS.
- Luxury editorial design system with warm neutral palette and responsive typography.
- Product data architecture supporting multi-category fashion items.
- Merchant model supporting major Indian fashion retailers.
- Outbound affiliate redirection endpoint (`/api/outbound/[id]`).
- Responsive, filterable, and sortable shop catalog.
- Curated collection pages: Trending Now, New Arrivals, Under ₹999, Everyday Essentials, Premium Picks, and Seasonal Style.
- Product details page featuring high-res imagery, verified merchant badges, and affiliate disclosure.
- Compliance and informational pages: Affiliate Disclosure, Privacy Policy, Terms & Conditions, About Us, and Contact Us.
- Custom 404 page, dynamic sitemap generator (`sitemap.ts`), and `robots.txt`.
- Comprehensive Vitest unit and integration test suite.
