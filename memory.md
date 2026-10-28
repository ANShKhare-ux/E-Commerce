# Project Memory: LUMIÈRE Fashion Discovery

## Project Purpose
A contemporary, luxury fashion affiliate discovery and shopping web application serving the Indian market (INR ₹, English). Focuses on clean editorial design, fast discovery, transparent affiliate disclosure, and safe outbound merchant routing.

## Current Tech Stack
- Next.js 14.2.35 (App Router)
- React 18.3.1
- TypeScript 5.7+ (Strict Mode)
- Tailwind CSS 3.4
- Lucide React
- Zod 3.24
- Vitest 2.1 (JSDOM) + React Testing Library

## Verified Architectural Decisions
- **Repository Pattern:** Product and merchant queries are abstracted through `@/lib/products.ts` and `@/lib/merchants.ts`. Supports multi-factor filtering, merchant facet search, search tokenization with price detection ("Under ₹999"), and category alias resolution.
- **Affiliate Safety:** Outbound affiliate links route through `/api/outbound/[id]`. Strictly enforces HTTPS, rejects embedded userinfo credentials (`username:password@`), enforces approved merchant domains, sets `Referrer-Policy: strict-origin-when-cross-origin`, and applies rate limiting.
- **Rate Limiting:** Sliding-window in-memory rate limiter in `@/lib/rate-limit.ts` protects `/api/contact`, `/api/newsletter`, and `/api/outbound/[id]` against denial of service, rapid brute forcing, and spam.
- **Financial Calculations:** All currency represented as whole integers in INR (₹) avoiding floating-point precision bugs. Formatted via `@/lib/currency.ts`.
- **Server Components:** `ProductCard.tsx` and all page routes are pure Server Components. Client components are strictly isolated to leaves: `ImageFallback.tsx`, `FilterSidebar.tsx`, `FilterDrawer.tsx`, `SortDropdown.tsx`, `Navbar.tsx`, `NewsletterSection.tsx`, `Footer.tsx`.
- **App Router UX:** Root loading skeleton (`src/app/loading.tsx`), catalog loading skeleton (`src/app/shop/loading.tsx`), and error boundary with retry (`src/app/error.tsx`).
- **Schema.org Compliance:** Adheres to FTC and search guidelines by strictly omitting fabricated stock availability claims.

## Key File Locations
- Core types: `src/types/product.ts`, `src/types/merchant.ts`, `src/types/collection.ts`
- Data store: `src/data/products.ts`, `src/data/merchants.ts`, `src/data/collections.ts`, `src/data/categories.ts`
- Security, rate limit & affiliate: `src/lib/affiliate.ts`, `src/lib/validation.ts`, `src/lib/rate-limit.ts`
- Redirection API: `src/app/api/outbound/[id]/route.ts`
- Contact & Newsletter APIs: `src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`
- Reusable UI: `src/components/common/`, `src/components/product/`, `src/components/filter/`, `src/components/home/`
- Testing: `src/test/` (6 test suites, 37 passing tests)
- Documentation: `instructions.md`, `security.md`, `README.md`, `AGENTS.md`, `CHANGELOG.md`, `docs/*`

## Status & Verified Commands
- `npm.cmd run type-check`: Passed (code 0)
- `npm.cmd test`: Passed (6 suites, 37 tests, code 0)
- `npm.cmd run lint`: Passed (0 errors/warnings, code 0)
- `npm.cmd run build`: Passed (18 pages generated, code 0)
- Production bundle size: 87.3 kB shared First Load JS, page sizes 101 - 105 kB.
