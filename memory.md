# LUMIÈRE — Project Memory & Knowledge Base

---

## 1. Project Identity & Purpose

**LUMIÈRE** is an enterprise-grade Indian luxury fashion commerce platform. The platform merges indigenous Indian handloom craftsmanship (Chanderi silk, Banarasi weaves, Mulmul cotton) with contemporary tailoring and verified luxury affiliate curations.

### Core Capabilities
- **Indian Market Specialization**: Native INR (`₹`) pricing, authoritative 12% GST calculation for textiles, pan-India 6-digit postal code (PIN) validation via Delhivery across 19,000+ codes.
- **Dual Business Model**:
  1. *LUMIÈRE Atelier Stocked*: Physical inventory held in Mumbai fulfillment hubs with variant SKUs (size, color, weight) and real-time stock control.
  2. *Affiliate Luxury Curations*: Inbound staging queue for partner feeds (Tata CLiQ Luxury, Ajio Luxe, Myntra Luxe) with admin review, editorial approval, and external redirection.
- **Strict Anti-Overselling Engine**: 15-minute checkout reservation holds with atomic release/conversion and concurrency safety.
- **Two-Stage Return Restock**: Returned merchandise is strictly held in inspection status until physical warehouse receipt and condition sign-off.
- **Private Admin Control Room**: Full suite for products, inventory adjustments with mandatory reason logging, order lifecycle transitions, Delhivery waybills, returns inspection, and audit logging.

---

## 2. Current Implementation Status

| Feature Area | Status | Evidence / Notes |
|---|---|---|
| **Storefront App Router** | Implemented & Verified | 26 public storefront routes including `/search`, `/size-guide`, `/faq`, `/cart`, enhanced `/products/[slug]`, and fixed desktop catalog grid layout. Next.js compiles 47 routes cleanly. |
| **Catalog & Inventory Policy** | Implemented & Verified | Production catalog starts clean and empty (`INITIAL_PRODUCTS = []`); zero fake cards displayed to shoppers. Test fixtures (`TEST_FIXTURE_PRODUCTS`) load only in test runners (`isTestRunner`). |
| **Admin Control Room** | Implemented & Verified | 13 administrative panels under `/admin` (`/products`, `/inventory`, `/orders`, `/shipments`, `/returns`, `/affiliate`, `/policies`, `/administrators`, `/automations`, `/audit-logs`, `/promotions`, `/homepage` with social channels configuration). |
| **Promotional Coupon Engine** | Implemented & Verified | Server-authoritative coupon discounts (fixed and percentage with minimum order threshold and maximum cap); invalid coupons and sub-threshold applications are authoritatively rejected in `db.orders.create`; admin management at `/admin/promotions`; validated in `tests/checkout.test.ts`. |
| **Homepage Studio & Announcements**| Implemented & Verified | Configurable announcement banner with rotating promotional alerts, configurable campaign hero, editorial drops, style discovery matrix, artisanal brand story section, and social media channels; editable at `/admin/homepage`. |
| **Interactive Shopping Elements**| Implemented & Verified | Quick View modal, Quick Add inline size selector strip, color swatch variant image synchronizer (ProductCard, QuickViewModal, PDP), debounced search suggestions dialog, and recently viewed tracker. |
| **Atomic Inventory Engine** | Implemented & Verified | 3-pool accounting (`Physical`, `Reserved`, `Available = Physical - Reserved`). Verified via `tests/inventory.test.ts`. |
| **Checkout & Order Creation** | Implemented & Verified | Server-authoritative price calculation, coupon validation and discounts, GST 12%, shipping fee logic (free >= ₹2,999; else ₹150). Verified via `tests/checkout.test.ts` (33 passing tests across 9 suites). |
| **Payment Verification** | Implemented & Verified | PhonePe Standard Checkout API (paise math, SHA256 base64 payload checksum with X-VERIFY salt index validation) + Cash on Delivery (COD) in `src/lib/services/payments.ts`. Razorpay & Google Pay (GPay) completely removed. Verified via `tests/payments.test.ts`. |
| **Customer Auth & SSR** | Implemented & Verified | Full Supabase SSR customer authentication: "Continue with Google" OAuth button on `/login` and `/signup` with accessible official 4-color Google SVG logo, loading spinners, graceful error reporting, open-redirect defense via `@/lib/auth/redirect`, reverse proxy host preservation, and PKCE exchange via `/auth/callback`; `/signup` (name, email, password strength, confirmation), `/login` (safe internal redirect validation), `/forgot-password`, `/reset-password` (recovery session), and `/auth/signout`. Verified via 19 unit and security tests in `tests/google_auth.test.tsx` (70 tests total across all 12 test suites). |
| **Legal, Policy & Compliance System** | Implemented & Verified | Complete, production-ready legal & compliance architecture for Indian fashion commerce. Features shared `LegalPageLayout` with breadcrumbs, document metadata, desktop sticky sidebar navigation, mobile pill bar, and table of contents. Includes 14 policies: Terms of Service (`/terms`), Privacy Policy (`/privacy-policy`, DPDP Act 2023), Returns & Exchanges (`/returns-policy`, two-stage restock rule), Shipping Policy (`/shipping-policy`, Delhivery 19,000+ PINs), Order Cancellation (`/cancellation-policy`, atomic stock reversion), Payment Policy (`/payment-policy`, RBI 2FA & GST), Cookie Policy (`/cookie-policy`, 15-min hold token), Store Disclaimer (`/disclaimer`, handloom slubs & screen calibration), Intellectual Property (`/intellectual-property`, IT Act takedowns & GI tag respect), Grievance Redressal (`/grievance-redressal`, Rule 5(9) officer & 48h/30d SLAs), Accessibility (`/accessibility`, WCAG 2.1 AA), Authenticity (`/authenticity`, Silk Mark & security tags), Affiliate Disclosure (`/affiliate-disclosure`, ASCI compliance), and interactive FAQ (`/faq`). Reorganized `Footer.tsx` into CUSTOMER SERVICE, LEGAL, and INFORMATION groups. All routes pass TypeScript (`tsc --noEmit`) and 70/70 Vitest suite tests. |
| **Session Middleware & RBAC** | Implemented & Verified | `src/middleware.ts` maintains active Supabase sessions across SSR requests, protects `/account/*` (redirects to `/login`), and guards `/admin/*` (redirects to `/admin/login`). Optimized with zero-latency session cookie checks: unauthenticated shoppers browsing public pages bypass remote Supabase network roundtrips completely; unauthenticated access to `/admin` or `/account` redirects instantly in 0ms without waiting for remote API timeouts. `verifyAdminAuthorization` strictly validates `ADMIN_EMAIL` and database profile roles (`admin`, `super_admin`). |
| **Customer Account Area** | Implemented & Verified | `/account` authenticated dashboard: profile management (`/api/account/profile`), saved shipping addresses with Indian 6-digit PIN validation (`/api/account/addresses`), order history isolation (`/api/account/orders`), customer return requests (`/api/account/returns`), saved wishlist, and sign out. |
| **Delhivery Logistics** | Implemented & Verified | 6-digit PIN validation, transit estimation, AWB waybill assignment (`DEL-AWB-...`), reverse pickup tracking. Verified via `tests/delhivery.test.ts`. |
| **Transactional Email Outbox** | Implemented & Verified | Responsive HTML templates, Resend API integration with resilient in-memory outbox fallback. Verified via `tests/email.test.ts`. |
| **Security & RBAC** | Implemented & Verified | Server-side identity validation against `ADMIN_EMAIL` and Supabase profile roles; client price manipulation blocked; admin route authorization checks enforced on `/api/admin/homepage` and `/api/admin/promotions`. Verified via `tests/security_auth.test.ts`. |
| **Database Migrations** | Implemented (SQL files present) | `supabase/migrations/001_initial_schema.sql` (27 tables, RLS), `002_seed_data.sql` (categories & collections), and `003_auth_triggers_and_roles.sql` (`handle_new_user()` trigger on `auth.users`, role escalation prevention, wishlist unique constraints). |
| **Build, SSR & Local Latency Optimization** | Implemented & Verified | Removed `Clear-Site-Data: "cache"` header from `next.config.mjs` that was aggressively clearing the browser disk and memory cache on every local request; tuned `_next/static` cache headers; removed artificial 200ms `mode="wait"` blocking exit delays from `PageTransition.tsx`; added `useReducedMotion()` support; optimized `Header.tsx` by lifting 220-line category taxonomy to top-level module constant; converted sequential homepage database queries to concurrent `Promise.all`; added preconnect hints for Unsplash image CDN in `layout.tsx`; lazy-loaded secondary product card images with targeted GPU-composited CSS transforms; all 64 routes compiled cleanly in Next.js production build with 70/70 Vitest tests passing. |

---

## 3. Verified Technology Stack

- **Framework**: Next.js 15.1.7 (Next.js 15 App Router, React 19.0.0, React DOM 19.0.0)
- **Language**: TypeScript 5.7.3 (`tsconfig.json` with strict mode, `@/*` path mapping)
- **Styling**: Tailwind CSS 3.4.17 (custom atelier palette: `canvas`, `noir`, `gold`, `emerald`)
- **Animation**: Framer Motion 12.4.7 (motion-reduced accessible)
- **Icons**: Lucide React 1.16.0
- **Database & Auth (Client/Server)**: Supabase (`@supabase/ssr` 0.5.2, `@supabase/supabase-js` 2.49.1) + SQL migrations (`001_initial_schema.sql`)
- **State & Data Store**: Unified repository service (`src/lib/db/index.ts`) with stateful singleton datastore and Supabase SSR integration
- **Testing Engine**: Vitest 3.0.7 with `@vitejs/plugin-react` 4.3.4 and `vite-tsconfig-paths` 5.1.4
- **CSS Preprocessor**: PostCSS 8.5.3, Autoprefixer 10.4.20
- **Operating Environment**: Windows PowerShell, Node.js 18+ (tested on Node v20+)

---

## 4. Architecture & Data Flow

```
                      +-----------------------------+
                      |       Client Browser        |
                      |  (Storefront / Admin UI)    |
                      +-----------------------------+
                                     |
                                     v
                      +-----------------------------+
                      |    Next.js 15 App Router    |
                      |  (Server Components & SSR)  |
                      |  (API Handlers: /api/*)     |
                      +-----------------------------+
                                     |
                 +-------------------+-------------------+
                 |                                       |
                 v                                       v
    +--------------------------+           +---------------------------+
    |  authoritative DB Layer  |           |     External Services     |
    |  - Supabase PostgreSQL   |           |  - Razorpay (UPI/Cards)   |
    |  - In-Memory Fallback    |           |  - Delhivery Logistics    |
    |  - Atomic Reservations   |           |  - Resend Transactional   |
    |  - Audit & Email Outbox  |           |    Email Service          |
    +--------------------------+           +---------------------------+
```

### Key Data Workflows
1. **Inventory Reservation**:
   - Customer adds item to cart $\rightarrow$ `POST /api/inventory/reserve`
   - Server checks `available_stock = physical_stock - reserved_stock`
   - Atomically creates `InventoryReservation` with `expires_at = now + 15m`
   - Expired holds are released by `/api/cron/cleanup-reservations`
2. **Order Placement**:
   - Customer submits checkout $\rightarrow$ `POST /api/checkout/create-order`
   - Server validates PIN code format and authoritative DB prices (never trusts client price)
   - Deducts physical stock, records `sale_deduction` inventory movement
   - Prepaid orders receive PhonePe order in paise; COD orders remain in `pending` payment status
   - Order confirmation message is queued into `email_outbox`
3. **Logistics & Waybill Allocation**:
   - Admin dispatches order from `/admin/shipments`
   - Calls `DelhiveryService.createShipment` $\rightarrow$ allocates waybill `DEL-AWB-...`
   - Order transitions to `shipped`; tracking notice queued in outbox
4. **Physical Returns**:
   - Patron requests return from `/account` $\rightarrow$ status `requested`
   - Stock is **NOT** restored upon request
   - Physical parcel arrives at hub $\rightarrow$ admin inspects condition and submits sign-off notes
   - Stock restored to sellable pool with `return_restock` audit movement

---

## 5. Important Files & Responsibilities

| File Path | Primary Responsibility |
|---|---|
| `package.json` | Project scripts, dependencies, build/test definitions |
| `next.config.mjs` | Next.js configuration, image remote domains, security headers |
| `tailwind.config.ts` | Brand theme colors (`noir`, `gold`, `canvas`), typography, elevations |
| `tsconfig.json` | TypeScript configuration, strict checks, `@/*` aliases |
| `vitest.config.ts` | Vitest test runner configuration and tsconfig paths plugin |
| `src/types/index.ts` | Canonical TypeScript type definitions for domain entities |
| `src/data/products.ts` | Clean production catalog configuration + automated test fixtures |
| `src/lib/db/index.ts` | Unified repository service, in-memory singleton, atomic concurrency engine |
| `src/lib/auth/admin.ts` | Server-side administrator verification via `ADMIN_EMAIL` and Supabase |
| `src/lib/services/delhivery.ts` | Delhivery Express logistics, PIN code checks, AWB tracking |
| `src/lib/services/razorpay.ts` | Indian payment gateway, order creation in paise, signature verification |
| `src/lib/services/email.ts` | Transactional email generation and Resend API dispatcher |
| `src/lib/supabase/client.ts` | Browser-side Supabase client initialization |
| `src/lib/supabase/server.ts` | Server-side Supabase client with cookie-based SSR sessions |
| `src/context/CartContext.tsx` | Client cart state, local storage persistence, reservation sync |
| `src/context/WishlistContext.tsx` | Client wishlist state with local storage persistence |
| `src/app/checkout/page.tsx` | Multi-step Indian checkout UI (shipping address, PIN code, payment method) |
| `src/app/admin/page.tsx` | Admin control room executive dashboard |
| `supabase/migrations/001_initial_schema.sql` | PostgreSQL schema, tables, indexes, constraints, RLS policies |
| `supabase/migrations/002_seed_data.sql` | Seed data for categories, collections, and affiliate partner sources |

---

## 6. Coding & Design Conventions

1. **Strict Type Safety**: All domain entities are typed in `src/types/index.ts`. No arbitrary `any` types in core domain services.
2. **Path Aliasing**: Always use `@/*` for internal project imports (mapped to `src/*`).
3. **Authoritative Pricing**: Never accept client-submitted item prices or cart totals. Prices are computed server-side from catalog variant records.
4. **Indian Commerce Standards**:
   - Currency: INR (`₹`), formatted using `Intl.NumberFormat('en-IN')` or `.toLocaleString('en-IN')`.
   - Razorpay API amounts must be converted to paise ($₹1 = 100 \text{ paise}$).
   - PIN codes must be strictly 6 digits, non-zero initial (`^[1-9][0-9]{5}$`).
   - Standard GST on luxury textiles: 12% (included in retail pricing or calculated server-side).
5. **No Fake Cards in Production**: Real storefront catalog starts empty; do not invent mock products on live views.
6. **Audit Trail**: Every administrative mutation (inventory adjustments, cancellations, returns) must append an `AuditLog` entry.
7. **Design Palette**: Follow the noir and gold atelier aesthetic defined in `tailwind.config.ts`.

---

## 7. Available Development Commands

> **Windows PowerShell Execution Notice**: Running npm scripts in PowerShell may encounter script execution restrictions (`npm.ps1 cannot be loaded`). Always use `npm.cmd` and `npx.cmd`.

```bash
# Start local development server (http://localhost:3000)
npm.cmd run dev

# Run full Vitest test suite (9 test suites, 27 tests)
npm.cmd test

# Type-check TypeScript without emitting output
npx.cmd tsc --noEmit

# Production Next.js build (compiles all 40 routes)
npm.cmd run build

# Start production server
npm.cmd start
```

*Note on `npm run lint`*: `next lint` is currently unconfigured and prompts interactively. See Known Issues.

---

## 8. Configuration Requirements (Without Secrets)

Refer to `.env.example` for all required environment variables:

| Variable Name | Purpose | Example / Required Format |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Base public URL | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://<project-id>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key | Browser-safe API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only administrative key | Private secret key |
| `ADMIN_EMAIL` | Authorized SuperAdmin email | `owner@lumiere.in` |
| `CRON_SECRET` | Bearer token for cron route protection | Random secret string (> 32 chars) |
| `PHONEPE_MERCHANT_ID` | PhonePe Merchant ID | `PGTESTPAYUAT` or production MID |
| `PHONEPE_SALT_KEY` | PhonePe SHA256 Salt Key | Salt key for X-VERIFY generation |
| `PHONEPE_SALT_INDEX` | PhonePe Salt Index | e.g. `1` |
| `DELHIVERY_API_TOKEN` | Delhivery B2C API token | API Token from Delhivery portal |
| `DELHIVERY_CLIENT_NAME` | Delhivery Client Name | e.g. `LUMIERE_RETAIL` |
| `DELHIVERY_WAREHOUSE_NAME` | Registered pickup hub | e.g. `LUMIERE_MUMBAI_HUB` |
| `DELHIVERY_IS_PRODUCTION` | Flag for live Delhivery shipping | `true` or `false` |
| `RESEND_API_KEY` | Resend email API key | `re_...` |
| `EMAIL_FROM` | Verified sender email | `"LUMIÈRE <concierge@lumiere.in>"` |
| `AFFILIATE_PARTNER_SECRET` | Inbound affiliate partner auth | Secret token |

---

## 9. Known Issues & Limitations

1. **ESLint CLI Setup**: `next lint` is deprecated in Next.js 15 and has no static config (`.eslintrc` or `eslint.config.mjs`), causing an interactive CLI prompt when executed.
2. **Stateful In-Memory Store Persistence**: When running without an active Supabase PostgreSQL connection, orders and inventory modifications reside in Node memory and reset on process restart.
3. **External Services Fallback**: In the absence of live production API keys, Delhivery, PhonePe, and Resend operate in mock simulation mode.
4. **Uncommitted Package Lock**: `package-lock.json` contains platform optional dependencies (glibc/musl) modified during npm install on Windows; this must be preserved.

---

## 10. Important Decisions & Constraints

- **Server-Side Price Authority**: The client never determines or alters product prices or order totals.
- **Strict 2-Stage Return Policy**: No automated restocks upon return request. Items must be physically received and inspected by authorized staff.
- **Authentic Catalog Baseline**: Fake product cards must not be hardcoded into live storefront components. Products must come through the database or admin portal.
- **Idempotency Guarantees**: Order checkout supports `idempotencyKey` to prevent double-charging or duplicate order creation during network retries.

---

## 11. Prioritized Next Steps

1. Configure flat ESLint configuration (`eslint.config.mjs`) compatible with Next.js 15 and React 19.
2. Connect live Supabase project and execute `001_initial_schema.sql` and `002_seed_data.sql`. *(Partially complete: full credential set — project URL, publishable key, and service-role secret key — wired into `.env.local` and verified live on 2026-10-30. Secret key passed the secret-only REST introspection endpoint with HTTP 200; introspection confirmed the remote database is empty — migrations still must be applied via Supabase SQL Editor or `supabase db push`.)*
3. Provide live production credentials for Razorpay, Delhivery, and Resend in hosting platform environment variables.
4. Set up an external cron scheduler (e.g. Vercel Cron or GitHub Actions) invoking `/api/cron/cleanup-reservations` every 5 minutes with `CRON_SECRET`.

---

## 12. Areas That Could Not Be Verified

- **Live Production Network APIs**: Production calls to Delhivery Express servers, Razorpay payment capture API, and Resend email transmission could not be verified in this sandbox environment without live API credentials (verified in sandbox simulation mode).
- **Supabase Cloud PostgreSQL**: Live connectivity fully verified on 2026-10-30 (project `yjjsohwtmapghxtunrgj`). Publishable key: auth service healthy, accepted by PostgREST. Service-role secret key: HTTP 200 on the secret-only REST root endpoint, confirming full privilege. Secret-key introspection confirmed **zero tables exist** in `public` — the schema is completely empty and migrations are pending application. RLS enforcement therefore remains unverified.

---

## 13. Brand Identity & Production Vector Assets (Version 2.0)

- **Approved Brand System**: **The Sovereign Identity** (Combining Direction 3 Wordmark & Direction 5 Monogram)
  - **Primary Wordmark**: Bespoke haute-couture Roman Didone capitals with 35% luxury letter-spacing, custom-sculpted letters, and a signature 45° diamond-shard grave accent on the first `È` (`brand/production/masters/lumiere-wordmark-master.svg`).
  - **Sovereign Monogram**: Monumental Roman serif `L` holding a poised 45° celestial diamond facet in its optical counter (`brand/production/masters/lumiere-symbol-master.svg`).
  - **Micro-Scale Cut**: Optically compensated cut for $\le 32\text{ px}$ favicons and mobile push icons (`brand/production/masters/lumiere-symbol-small.svg`).
  - **Lockups**: Master Horizontal (`lumiere-lockup-horizontal.svg`) and Stacked / Crest (`lumiere-lockup-stacked.svg`).
- **Production Exports & Deliverables**:
  - Full monochrome black and white cuts (`brand/production/exports/`).
  - Zari Gold mono cuts (`#C59B48`).
  - High-resolution transparent PNG exports at 32px, 64px, 128px, 256px, 512px, 1024px, 2048px.
  - Complete Web & PWA icon suite: `favicon.ico` (multi-res 16/32/48), `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180px), `icon-192.png`, `icon-512.png`, `maskable-512.png`, `site.webmanifest`, `head-snippet.html`.
  - Brand Guidelines specification document: `brand/BRAND_GUIDELINES.md`.
  - Client Presentation Board with fashion mockups (shopping bag, signage, box, business cards, social, apparel): `brand/production/presentation/board.html` and slide PNGs.
  - Web-ready assets mirrored to `public/` and `public/brand/` for direct storefront consumption.

---

## 14. Storefront Navigation Bar & Welcome Announcement Architecture

- **Navbar Redesign (Myntra-Style UI/UX & LUMIÈRE Taxonomy)**:
  - **Height & Elevation**: 80px (`h-20`), sticky `top-0`, pure white background (`bg-white`), bottom border `border-[#eaeaec]`, subtle shadow `shadow-[0_2px_12px_rgba(0,0,0,0.05)]`.
  - **Brand Logo**: Left-aligned official vector horizontal lockup (`/brand/lumiere-lockup-horizontal.svg`), linking to `/`.
  - **Primary Category Tabs**:
    * `MEN` (`/category/mens-clothing`) with coral-orange bottom border (`#ee5f73`).
    * `WOMEN` (`/category/womens-clothing`) with fuchsia bottom border (`#fb56c1`).
    * `UNISEX` (`/category/streetwear`) replacing KIDS, with teal-cyan bottom border (`#03a685`).


    * `COLLECTIONS` (`/products`) replacing GENZ, with signature atelier gold bottom border (`#C59B48`) and uppercase `NEW` superscript pill.
    * `HOME`, `BEAUTY`, and `STUDIO` completely omitted per user specifications.
  - **Hover Mega-Menus**: Multi-column drop panel with sub-categories (Topwear, Bottomwear, Heritage, Accents, etc.) and visual campaign cards with micro-debounced hover transitions.
  - **Wide Center-Right Search Bar**: `#f5f5f6` background, magnifying glass icon, placeholder `"Search for products, brands and more"`, keyboard shortcut `/` support, and direct search submission to `/products?search=...`.
  - **Stacked Action Icons**:
    * `Profile`: User icon + bold "Profile" label underneath, with hover card flyout for Login/Signup, Orders, Wishlist, Track Delhivery Parcel, and Admin Control Room.
    * `Wishlist`: Heart icon + bold "Wishlist" label underneath, with badge counter.
    * `Bag`: ShoppingBag icon + bold "Bag" label underneath, with badge counter navigating directly to the dedicated `/cart` page.

- **Dedicated Standalone Cart Page (`src/app/cart/page.tsx`)**:
  - Full-page luxury shopping bag experience with 3-step checkout progression breadcrumb (`1. Bag` -> `2. Address` -> `3. Payment`).
  - Real-time Delhivery express complimentary delivery threshold tracker (progress toward ₹2,999).
  - 15-minute concurrency reservation countdown hold to prevent overselling.
  - Complete variant metadata (size, color, SKU), item quantity adjustment, and 1-click "Move to Wishlist".
  - Live Delhivery 6-digit PIN code serviceability & delivery date estimation checker (`/api/delhivery/check-pincode`).
  - Promotional coupon validation with quick-apply shortcuts (`FIRSTBUY`, `LUMIERE10`).
  - Sticky price breakdown (MRP, discounts, Delhivery courier fee, 12% GST inclusive) and direct "Proceed to Checkout" action to `/checkout`.
  - Drawer integration: `CartDrawer` suppresses on `/cart` and provides "View Full Bag" navigation link.

- **Announcement Bar Elimination & Welcome Modal**:
  - Top fixed announcement bar completely removed from the header so the navbar sticks directly flush to `top-0`.
  - Replaced by `WelcomeAnnouncementModal` (`src/components/WelcomeAnnouncementModal.tsx`), mounted in `layout.tsx`.
  - **Intelligent Frequency & Navigation Guard**:
    * Displays strictly **once** when a user first enters the website (`localStorage` + `sessionStorage` guard).
    * Guaranteed **never to show** when navigating to the main page (`/`) from within the website itself (via internal session flag `lumiere_session_active` and `document.referrer` origin validation).
    * Features 1-click coupon code copy (`FIRSTBUY` for ₹300 off), complimentary Delhivery express shipping notification, and direct collection discovery CTA (layered at `z-[9999]`).

---

## 16. Dropdown & Page Transition Motion Architecture

- **Page Transitions (`src/components/PageTransition.tsx`)**:
  - Implemented client-side `PageTransition` wrapping root `<main>` in `src/app/layout.tsx`.
  - Driven by `framer-motion`'s `<motion.div key={pathname}>` with `useReducedMotion()` accessibility guard.
  - Eliminated `<AnimatePresence>` sync-mode stacking and layout shifts (CLS): previous attempt removed `mode="wait"` which caused the exiting and entering pages to render concurrently stacked in the DOM flow. The refined implementation uses an enter-only fade (`initial={{ opacity: 0 }}` $\to$ `animate={{ opacity: 1 }}` over 150ms `easeOut`), allowing Next.js to immediately unmount the old page and cleanly mount the new page with zero stacking and zero cumulative layout shift.
  - Query parameters (such as collection filtering) do not cause full page re-fades, ensuring instant catalog filtering responsiveness.

- **Dropdown Animations (`src/components/Header.tsx`)**:
  - **Mega-Menu Dropdown**: Wrapped in `<AnimatePresence>` with `motion.div` fade and subtle vertical translation (`initial={{ opacity: 0, y: -6 }}` $\to$ `animate={{ opacity: 1, y: 0 }}` $\to$ `exit={{ opacity: 0, y: -4 }}`) over 180ms easeOut.
  - **Profile Flyout Card**: Wrapped in `<AnimatePresence>` with `motion.div` fade (`initial={{ opacity: 0, y: 8 }}` $\to$ `animate={{ opacity: 1, y: 0 }}`) over 180ms.
  - **Mobile Menu Drawer**: Wrapped in `<AnimatePresence>` with smooth height and fade animation over 220ms.

---

## 17. Local Performance & Latency Optimization Architecture

- **Elimination of `Clear-Site-Data: "cache"`**:
  - Identified in `next.config.mjs` where `Clear-Site-Data: "cache"` was being returned on every request in development mode.
  - This wiped the browser's HTTP disk and memory cache on every page request, forcing continuous recompilation and multi-megabyte bundle downloads.
  - Removed the header completely, restoring normal browser caching and HMR responsiveness.
- **Zero-Latency Middleware Authentication Guard (`src/middleware.ts`)**:
  - Identified that authenticated visitors browsing public pages were previously suffering 200–800ms remote `supabase.auth.getUser()` network roundtrips on every click, even though public pages never used the auth user in middleware.
  - Refined route classification: only protected routes (`/admin/*`, `/account/*`) and guest-only routes (`/login`, `/signup`) perform session verification.
  - All public storefront routes (`/`, `/products`, `/category/*`, `/cart`, `/checkout`, `/about`, `/contact`, etc.) return immediately (0ms network cost) for both guest shoppers and authenticated users.
  - Expanded static asset regex matcher to exclude `site.webmanifest`, fonts (`woff2`, `woff`, `ttf`), styles (`css`), scripts (`js`), and icons.
- **Concurrent Server Data Fetching & Query Limiting**:
  - Added `limit?: number` filter support to `db.products.getAll(...)` in `src/lib/db/index.ts` to prevent full memory array mapping when only a subset of products is needed.
  - Homepage (`src/app/page.tsx`) queries (`db.homepage.get()`, `db.products.getAll({ sort: "newest", limit: 8 })`, `db.products.getAll({ sort: "rating", limit: 4 })`, and `db.products.getAll({ isDeal: true, limit: 4 })`) executed concurrently via `Promise.all()`.
  - Lifted static category and style discovery matrices outside render cycles to top-level module constants.
- **Conditional Client Component Mounting**:
  - `ProductCard.tsx`: Conditionally renders `<QuickViewModal>` only when `quickViewOpen` is true (`{quickViewOpen && <QuickViewModal ... />}`). This prevents dozens of modal component trees from mounting, initializing 5 state hooks, and subscribing to `CartContext` and `WishlistContext` on every product card.
  - `Header.tsx`: Conditionally renders `<SearchDialog>` only when `searchDialogOpen` is true (`{searchDialogOpen && <SearchDialog ... />}`).
  - `CartContext.tsx`: Guarded localStorage persistence with `isInitializedRef` to eliminate redundant disk writes and potential race conditions on initial mount.
- **Client Component Allocation & Image Optimization**:
  - Lifted 220-line category taxonomy tree in `Header.tsx` to `NAV_CATEGORIES` module constant.
  - Added `preconnect` link to `https://images.unsplash.com` in `layout.tsx` for fast TLS/TCP negotiation.
  - Configured `loading="lazy"` on secondary product hover images and switched card transitions to targeted GPU-composited CSS transforms (`transition-[opacity,transform] duration-500`).
  - Added single-run guard on `WelcomeAnnouncementModal.tsx` local storage key cleanup.


---

## 17. Multi-Admin Authorization & Comma-Separated ADMIN_EMAIL Architecture

- **Multi-Admin Configuration**:
  - `src/lib/auth/admin.ts` implements `isConfiguredAdminEmail(email)` supporting comma-separated `ADMIN_EMAIL` lists (e.g. `silentstrike7777@gmail.com, preetiansh16@gmail.com`).
  - Trims, lowercases, and checks email arrays with zero whitespace sensitivity.
  - Automatically promotes matching users to `super_admin` in `verifyAdminAuthorization`.
  - Syncs the role directly to `public.profiles` in Supabase using the service-role client upon verification.
  - Eliminates the admin redirect loop between `/admin/login` and `/admin` when multiple admin emails are configured.
  - All admin API routes (`/api/admin/products`, `/api/admin/inventory/adjust`, `/api/admin/orders/status`, `/api/admin/returns/inspect`, `/api/admin/affiliate/review`, `/api/admin/inventory/bulk-csv`) utilize authoritative admin identity and `getPrimaryAdminEmail()`.

---

## 18. Dynamic Navbar Profile Flyout & Account Management

- **Navbar Profile Flyout (`src/components/Header.tsx`)**:
  - Dynamically detects authenticated user session via `createClient().auth.onAuthStateChange` and `getSession()`.
  - **Guest Shoppers**: Displays "Welcome to LUMIÈRE", "To access account & manage orders", and a prominent "Login / Sign Up" button. "Admin Control Room" is **completely omitted** from the DOM for public/guest shoppers.
  - **Logged-in Customers**: Displays avatar initials, full name, email, and quick links to Orders, Addresses, Wishlist, and Tracking, along with a "Sign Out" button.
  - **Logged-in Administrators**: Displays the user information plus a dedicated, gold-accented "Admin Control Room" section with `<ShieldCheck />` and external navigation.
  - **Hover & Touch Refinement**: Increased hover debounce buffer to 250ms and introduced click-outside ref handlers to ensure smooth desktop hover transitions and mobile tap-to-toggle interactions.
- **Account & Address Management (`/account`)**:
  - `PUT /api/account/profile` uses `upsert` on `public.profiles` to ensure profile persistence succeeds even if the database user row was not pre-initialized by an auth trigger.
  - `PATCH /api/account/addresses` added for 1-click "Set as Default" address selection.
  - `AccountClient.tsx` updated with immediate state synchronization and "Set as Default" trigger.
- **Structured Admin Navigation (`src/components/AdminSidebar.tsx`)**:
  - Reorganized into 3 distinct functional groups: `Core Operations`, `Merchandising & Studio`, and `System & Governance`.
  - Displays authenticated administrator email in the sidebar footer.


---

## 19. Clean Minimalist Terminology & Sign-In UI Simplification

- **Terminology Standardization**:
  - Replaced archaic "Patron" references across customer-facing interfaces with modern, universal luxury commerce naming.
  - **Sign-in Heading**: `"Sign In to LUMIÈRE"` ([`src/app/login/page.tsx`](file:///c:/Users/Taraksh%20jain/OneDrive/Documents/E-commerce/E-Commerce/src/app/login/page.tsx)).
  - **Submit Button**: `"Sign In"` ([`src/app/login/page.tsx`](file:///c:/Users/Taraksh%20jain/OneDrive/Documents/E-commerce/E-Commerce/src/app/login/page.tsx)).
  - **Sign-In Card Simplification**: Removed the redundant `"Don't have an account? Create Patron Account"` section from the sign-in modal for a cleaner, high-conversion authentication card.
  - **Account Page**: `"My Account & Orders"` ([`src/app/account/AccountClient.tsx`](file:///c:/Users/Taraksh%20jain/OneDrive/Documents/E-commerce/E-Commerce/src/app/account/AccountClient.tsx), [`src/app/account/page.tsx`](file:///c:/Users/Taraksh%20jain/OneDrive/Documents/E-commerce/E-Commerce/src/app/account/page.tsx)).
  - **Account Verification Badge**: `"Verified Account"` for customer members; `"Store Administrator"` for verified admins.
  - Updated policy pages (`/faq`, `/shipping-policy`, `/cancellation-policy`, `/returns-policy`) and profile API responses to maintain uniform terminology throughout.


---

## 20. Comprehensive Full-Stack Security, Authorization & Concurrency Hardening

- **Authorization Guards on Admin Route Handlers**:
  - Enforced strict `if (!auth.authorized)` return `401 Unauthorized` checks across all administrative mutation routes:
    - `POST /api/admin/products`
    - `POST /api/admin/inventory/adjust`
    - `POST /api/admin/inventory/bulk-csv`
    - `POST /api/admin/orders/status`
    - `POST /api/admin/returns/inspect`
    - `POST /api/admin/affiliate/review`
    - `POST /api/admin/affiliate/sync`
    - `POST /api/delhivery/create-shipment`
- **IDOR Remediation on Customer Orders & Returns**:
  - `/api/account/orders`: Eliminated unauthenticated order querying via `?email=...`. Pinned order retrieval strictly to authenticated Supabase session `user.email`.
  - `/api/account/returns`: Enforced session check so unauthenticated actors cannot forge return requests on other customers' orders.
- **Persistent Order State Mutation & Audit Logging**:
  - Resolved shallow-clone detachment in `verify-payment` and `orders/status (mark_cod_paid)`. Added `db.orders.updatePayment` and `db.orders.markPaid` to mutate `dbStore.orders` reliably and record structured audit entries.
- **Role Retention in Profile Updates**:
  - `/api/account/profile`: Safeguarded existing `admin` / `super_admin` roles from being demoted to `customer` when administrators update their profile details.
- **State Immutability & Boundary Validation**:
  - Fixed direct array object mutation in `CartContext.tsx` (`addItem`).
  - Extracted side-effect from pure state updater in `WishlistContext.tsx`.
  - Enforced integer range bounds (`1..10`) on inventory reservations (`/api/inventory/reserve`).
- **Test Suite Expansion**:
  - Expanded `tests/security_auth.test.ts` to 9 tests (72 passing tests across all 12 test suites).


---

## 21. E-Commerce Experience & Store Management Upgrades

- **Faster Checkout with Saved Address Auto-Population**:
  - `src/app/checkout/page.tsx`: Integrated saved address loading from `/api/account/addresses`.
  - Added luxury saved address card selector allowing customers to choose between their existing addresses with automatic state and PIN code autofill, or "+ Enter a new delivery address".
- **1-Click Reorder in Customer Account**:
  - `src/app/account/AccountClient.tsx`: Added "Reorder Items" action to each past order card, seamlessly adding all order items to the active cart with atomic stock reservation and opening the cart drawer.
- **Dedicated Admin Customer Management (`/admin/customers`)**:
  - Created `src/app/api/admin/customers/route.ts` guarded by `verifyAdminAuthorization`. Aggregates unique customer metrics (Lifetime spend, Total Orders, Order History, VIP / Repeat Buyer tiers, Regional Deliveries).
  - Created `src/app/admin/customers/page.tsx` and `CustomersClient.tsx` featuring real-time KPI cards (Total Customers, Repeat Patron Rate %, Average Order Value, VIP Patrons), tier filtering, debounced search, order inspection modal, and CSV export.
  - Updated `AdminSidebar.tsx` to include "Customer Directory" under Core Operations.
- **1-Click CSV Exports for Administrative Operations**:
  - Orders (`src/app/admin/orders/OrdersClient.tsx`): Added "Export Orders CSV" button with full order details, statuses, payment methods, and delivery coordinates.
  - Inventory (`src/app/admin/inventory/InventoryClient.tsx`): Added "Export Stock CSV" button with physical, reserved, and available stock levels and health classifications.
- **Test Suite & Build Verification**:
  - Added `tests/customers_admin.test.ts` (74 passing tests across 13 test suites). Clean Next.js compilation across 65 routes.

---

## 22. End-to-End Audit, Security Hardening, Motion & Privacy Architecture

- **Comprehensive Security Hardening & Rate Limiting**:
  - Implemented zero-dependency schema validation engine (`src/lib/security/validator.ts`) covering checkout orders, payment verification, inventory reservations, and newsletter subscriptions.
  - Sanitization utility (`src/lib/security/sanitize.ts`) seamlessly accepts string and numeric phone/pincode inputs without dropping data.
  - Enforced strict integer quantity checks preventing fractional order allocations, case-insensitive payment method normalization, and aggregated SKU quantity limit enforcement.
  - Enforced sliding-window rate limiting with safe IP resolution (`x-forwarded-for`, `x-real-ip`) and test store reset (`_resetRateLimitStore`).
  - Added Content Security Policy (CSP) and `X-Permitted-Cross-Domain-Policies` headers in `next.config.mjs` with scoped origins for PhonePe (production and UAT), Delhivery, Google Accounts, Supabase, and Unsplash.
  - Unref'd rate limiter background interval to eliminate Node process leak risk.
- **Resilient Error Boundaries & Structured Logger**:
  - Added `src/app/error.tsx` (route segment error boundary) and `src/app/global-error.tsx` (root error boundary) with atelier error UI, diagnostic tracing, and reset recovery.
  - Added `src/lib/logger.ts` structured logger with automatic redaction of sensitive credentials, URL query parameter tokens, custom error properties, and circular reference prevention (`WeakSet`).
  - Wired `logger` directly into all sensitive API route handlers (`/api/checkout/create-order`, `/api/checkout/verify-payment`, `/api/newsletter/subscribe`, `/api/inventory/reserve`, and `/api/delhivery/check-pincode`).
- **Authentication & Login / Sign-Up Overhaul**:
  - Rebuilt `/login` and `/signup` with real-time field validation, accessible error announcements (`role="alert"`, `aria-invalid`, `aria-describedby`), and WCAG AA focus rings.
  - Added interactive 4-segment password strength meter with criteria checklist (8+ chars, upper/lower, numbers, special characters) and dual show/hide password toggles.
  - Aligned password length requirements across form submission and field validation.
  - GDPR & DPDP Act 2023 compliance: unbundled affirmative opt-in consent (`agreedToTerms` defaults to `false`).
- **Haute Couture Intro Entrance Animation**:
  - Built `src/components/IntroEntranceAnimation.tsx` featuring prominent centered monogram draw-in and Didone wordmark shimmer, seamlessly morphing into the navbar logo.
  - Dynamically calculates exact navbar logo coordinates via `getBoundingClientRect()` targeting `id="main-brand-logo"` in `Header.tsx`, ensuring pixel-accurate morphing across mobile, desktop, and ultrawide viewports.
  - Guarded with exception-safe `sessionStorage` wrappers (`safeCheckIntroCompleted`, `safeMarkIntroCompleted`) ensuring zero crashes in browser private/incognito modes.
  - Supports keyboard accessibility: `Escape` key dismisses intro animation immediately.
  - Fully respects `prefers-reduced-motion` media query.
- **Global Privacy Policy (`/privacy`) & Canonical Routing**:
  - Implemented `/privacy` structured across 7 canonical sections: Data Collection, Usage, Cookies & Tracking, Third-Party Disclosure, Data Security & Retention, User Rights (GDPR Articles 15–22, CCPA/CPRA, DPDP Act 2023), and Grievance Redressal / Contact.
  - Integrated into global footer, legal sidebar navigation, and auth forms.
  - Added permanent 308 redirect from `/privacy-policy` to `/privacy` in `next.config.mjs` and updated `/privacy-policy/page.tsx`.
- **Technical SEO & Core Web Vitals**:
  - Root `layout.tsx` metadata enriched with `metadataBase`, dynamic title template (`%s | LUMIÈRE Atelier`), Open Graph image assets, and Twitter Card metadata (`summary_large_image`).
  - Product detail pages dynamically inject canonical alternates and Twitter cards.
  - `sitemap.xml` updated to include canonical `/privacy` (omitting redirected `/privacy-policy`).
  - `robots.ts` updated to disallow crawling of private `/account/` and `/checkout/` routes.
- **Test Suite & Build Verification**:
  - Added `tests/security_validator.test.ts` (22 unit/security tests) and `tests/intro_animation_and_privacy.test.tsx` (4 tests).
  - All 15 test suites and 103 tests pass cleanly (`npm.cmd test`).
  - Next.js production build (`npm.cmd run build`) compiles all 66 routes with zero errors.

