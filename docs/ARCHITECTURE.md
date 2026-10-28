# System Architecture

## 1. Overview
LUMIÈRE is designed as a modern, decoupled, editorial-first affiliate e-commerce discovery web application. It combines Next.js App Router for server-rendered performance and SEO with a clean repository layer that isolates data retrieval from UI presentation.

```
┌────────────────────────────────────────────────────────┐
│                   Client Browser                       │
│    (HTML / Minimal Hydrated Client Components / CSS)   │
└───────────────────────────▲────────────────────────────┘
                            │ HTTP / HTTPS
┌───────────────────────────▼────────────────────────────┐
│                  Next.js App Router                    │
│                                                        │
│  ┌──────────────────────┐    ┌──────────────────────┐  │
│  │   Server Pages       │    │   API Endpoints      │  │
│  │   - / (Home)         │    │   - /api/outbound/:id│  │
│  │   - /shop            │    │   - /api/contact     │  │
│  │   - /products/:slug  │    │   - /api/newsletter  │  │
│  │   - /categories/:slug│    └──────────┬───────────┘  │
│  │   - /collections/:slug               │              │
│  │   - /search          │               │              │
│  └──────────┬───────────┘               │              │
│             │                           │              │
│  ┌──────────▼───────────────────────────▼───────────┐  │
│  │            Repository & Service Layer             │  │
│  │  - @/lib/products.ts     - @/lib/merchants.ts    │  │
│  │  - @/lib/affiliate.ts    - @/lib/validation.ts   │  │
│  └──────────────────────┬───────────────────────────┘  │
│                         │                              │
│  ┌──────────────────────▼───────────────────────────┐  │
│  │         Data Source (Modular Interface)          │  │
│  │  - Typed Curated Store (src/data/*)              │  │
│  │  - (Pluggable: PostgreSQL / Prisma / Affiliate API│  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Key Subsystems

### 2.1 Product & Merchant Repository
- Located in `src/lib/products.ts` and `src/lib/merchants.ts`.
- Encapsulates:
  - Full-text search across product name, brand, category, tags, and descriptions.
  - Multi-dimensional filtering: categories, gender/audience (`men`, `women`, `unisex`), brand, and price bounds (`minPrice`, `maxPrice`).
  - Strict sorting: `featured`, `price-asc`, `price-desc`, `newest`.
  - Pagination and chunked loading.
- By using an asynchronous repository interface (`async getProducts()`), future persistence upgrades to Prisma or direct SQL do not require changing page components.

### 2.2 Affiliate Link & Redirection Subsystem
- Located in `src/lib/affiliate.ts` and `src/app/api/outbound/[id]/route.ts`.
- Security controls:
  1. Never accepts target URLs directly from client query parameters.
  2. Resolves product ID against server storage.
  3. Validates merchant URL structure against an allowlist of supported retailers (`myntra.com`, `ajio.com`, `amazon.in`, `tatacliq.com`, `nykaafashion.com`).
  4. Drops any disallowed schemes (e.g. `javascript:`, `data:`, `file:`).
  5. Responds with HTTP 307 Temporary Redirect with secure Referrer Policy headers.

### 2.3 Rendering Strategy
- **Static & Dynamic Server Components:** The homepage, product pages, category listings, and collection pages are server-rendered to maximize SEO and minimize client bundle size.
- **Client Components:** Limited strictly to interactive widgets such as:
  - Dynamic filter drawer and active filter pills
  - Header search modal and mobile navigation toggle
  - Image fallback wrappers handling remote 404s
  - Client-side sort selector

---

## 3. SEO & Structured Data
- Automated dynamic `sitemap.ts` and `robots.ts`.
- Schema.org JSON-LD structured data for products (`Product`, `Offer`, `Brand`, `Merchant`), omitting fabricated ratings and strictly adhering to Google Merchant guidelines.
- Canonical URLs and OpenGraph tags configured on every route.
