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
| **Intro Entrance Animation & Storage Shield** | Implemented & Verified | Zero-FOUC entrance prologue built with pure native React and Framer Motion (`LUXURY_EASE`). Synchronous pre-FCP script in `<head>` ensures zero storefront flash; sessionStorage + localStorage + in-memory execution guards guarantee zero replay across refreshes and route changes; silk curtain parting reveal; accessible escape and skip controls. Verified via `tests/intro_animation_and_privacy.test.tsx`. |
| **Remotion Studio Video Preview & Layer Timeline** | Implemented & Verified | Dedicated Remotion environment (`remotion/`) with fully split timeline layers. Every visual element (`01. Revealed Storefront`, `02. Left Curtain`, `03. Right Curtain`, `04. Ambient Aura`, `05. Monogram Stroke`, `06. Diamond Star`, `07. Brand Wordmark`, `08. Subtitle`, `09. Locations`, `10. Golden Divider`, `11. Provenance`, `12. Skip Button`) is authored as its own named `<Sequence>` track with draggable timing and handles. Also includes `IntroEntranceAnimation-LettersSplit` with independent letter-by-letter tracks (`L`, `U`, `M`, `I`, `È`, `R`, `E`). Verified via live hot reload on `http://localhost:3000`. |

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

- **Announcement Bar & Promotional Pop-Up Modal Elimination**:
  - Top fixed announcement bar completely removed from the header so the navbar sticks directly flush to `top-0`.
  - The promotional offer pop-up modal (`WelcomeAnnouncementModal.tsx` / `FIRSTBUY`) was completely removed from the codebase and from `src/app/layout.tsx` per store owner request, providing an unobstructed browsing experience.

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
  - Completely excised promotional offer pop-up modal (`WelcomeAnnouncementModal.tsx`) from the component tree.


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

---

## 23. Luxury Visual Redesign, Real Scroll Animations & LUMIÈRE Woven Texture Architecture

- **Real Scroll-Based Animations (`src/components/ScrollReveal.tsx` & `src/components/ScrollProgress.tsx`)**:
  - **Scroll Progress Indicator (`ScrollProgress.tsx`)**: Fixed ultra-thin (2px) gold gradient bar mounted in `layout.tsx` at `z-[60]` with Framer Motion `useScroll()` and spring physics (`stiffness: 150, damping: 25`), smooth and non-intrusive above the sticky navbar.
  - **ScrollReveal Component (`ScrollReveal.tsx`)**: Client component utilizing `whileInView`, `viewport={{ once: true, margin: "-50px" }}`, and luxury bezier easing (`[0.22, 1, 0.36, 1]`) with variants: `fade-up`, `fade-in`, `scale-up`, `slide-left`, `slide-right`, and `stagger`. Fully motion-reduced accessible via `useReducedMotion()`.
  - **Homepage Section Reveals**: Wrapped all 12 major storefront sections in `src/app/page.tsx` with `ScrollReveal` and bespoke `HeroSection.tsx` featuring cinematic slow-scale and staggered typography entrance.
- **Product Card Redesign & Interactions (`src/components/ProductCard.tsx`)**:
  - **Card Proportions & Surfaces**: Refined `aspect-[3/4]` card canvas with subtle border (`border-canvas-border/80 hover:border-gold-500/40`) and elevation transition (`hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(13,13,13,0.08)]`).
  - **Staggered Viewport Entrance**: Cards animate smoothly when scrolled into view using `whileInView={{ opacity: 1, y: 0, scale: 1 }}` and staggered delay `Math.min((index % 4) * 0.07, 0.25)`.
  - **Image Presentation**: Primary and secondary hover image transitions with subtle 105% optical zoom and subtle top/bottom depth vignettes.
  - **Quick Actions & Wishlist**: Frosted glass action bar slides up on hover with Quick View modal trigger and inline Quick Add size selector with live inventory checks; wishlist heart with micro-pulse heartbeat animation.
- **Product Detail Page Elevaton (`ProductDetailClient.tsx`)**:
  - **Image Gallery Transitions**: Micro-magnifier with smooth coordinate tracking and thumbnail outline indicators.
  - **Animated Typography & Pricing**: `motion.h1` staggered title entrance and animated pricing row with 12% GST note.
  - **Interactive Selectors**: Color swatches, size buttons, and quantity adjusters enhanced with spring tap responses; Add to Bag and Buy Now buttons wired with `motion.button` whileTap/whileHover micro-interactions.
  - **Related Products & Recently Viewed**: Wrapped in `ScrollReveal` with staggered grid cards.
- **Footer Redesign & Special LUMIÈRE Texture Hover Effect (`src/components/Footer.tsx`)**:
  - **Couture Minimalist Aesthetics**: Dark noir palette (`bg-noir-900 border-noir-800`), smooth viewport entrance animation, and organized into 7 luxury sections:
    1. *Brand Identity*: Haute-couture Didone brandmark, Mumbai Central Atelier address, concierge email, helpline.
    2. *Shop Atelier*: Men's tailoring, women's silks, streetwear, ethnic wear, horlogerie, new arrivals, archive deals.
    3. *Customer Support*: Contact concierge, client FAQs, Delhivery shipping info, 7-day returns, order cancellations, live waybill tracking, size guide.
    4. *About LUMIÈRE*: Artisanal story, authenticity & GI tags, lookbooks, grievance redressal, accessibility.
    5. *Social Channels & Policies*: Bespoke SVG icons for Instagram, X (Twitter), Pinterest, and YouTube; legal policy links.
    6. *The LUMIÈRE Gazette*: Newsletter subscription form connected to `/api/newsletter/subscribe` with real-time feedback.
    7. *Trust Badges & Copyright*: RBI 2FA, Delhivery Express, DPDP Act 2023, GSTIN, dynamic year copyright.
  - **Special LUMIÈRE Woven Texture Hover Effect**:
    - Dual-layer text composition: Base layer remains crisp white for 100% legibility; absolute overlay layer features bespoke woven zari silk & micro-metallic brocade texture (`.lumiere-woven-texture`) clipped into the text letterforms (`-webkit-background-clip: text; color: transparent`).
    - Smooth 700ms GPU-accelerated opacity fade on hover with gold drop-shadow depth (`drop-shadow-[0_2px_10px_rgba(197,155,72,0.45)]`) and subtle continuous silk shimmer (`@keyframes luxurySilkShimmer`).
    - Touch device support: Media query (`hover: none`) provides a tasteful 35% ambient sheen without requiring mouse hovering.
- **Verification & State**:
  - Vitest test suite: All 16 test suites and 111 tests pass cleanly (`npm.cmd test`).
  - TypeScript compilation: `npx.cmd tsc --noEmit` passes with 0 errors.
  - Production build: `npm.cmd run build` compiles all 66 routes with 0 errors.
  - Test Suite Added: `tests/luxury_animations_redesign.test.tsx` (8 new tests covering ScrollProgress, ScrollReveal variants, SectionHeading, ProductCard redesign attributes, and Footer woven texture).
  - Bug Fixes & Refinements:
    - Replaced Tailwind CSS `hover:-translate-y-1.5` on ProductCard with Framer Motion `whileHover={{ y: -6 }}` to resolve inline transform override.
    - Converted direct children of `<AnimatePresence>` in QuickViewModal, CartDrawer, SearchDialog, and CollectionFilters to `<motion.div>` to prevent immediate unmount and preserve exit animations.
    - Corrected CSS `background-image` layer order in `src/app/globals.css` so micro-warp and micro-weft weave layers sit on top of the zari gold gradient base.
    - Added `@supports not ((background-clip: text) or (-webkit-background-clip: text))` fallback for browsers without text clipping.
    - Eliminated React SSR HTML comment splits in ProductCard price and discount badge via template literals.
  - Live server verification: http://localhost:3000 verified with HTTP 200 across `/`, `/products`, `/category/ethnic-wear`, `/cart`, `/privacy`, `/outfits`, and `/deals`.

---

## 24. SSR Hydration Parity & Accessible Reduced Motion Architecture

- **Root Cause Analysis (Console Hydration Error)**:
  - Framer Motion's built-in `useReducedMotion()` hook evaluates `window.matchMedia("(prefers-reduced-motion: reduce)")` synchronously during component render.
  - In Node.js (SSR pre-rendering), `window` is undefined, causing `useReducedMotion()` to return `false` / `null`. Components rendered with motion attributes (e.g. `initial={{ scale: 1.08, opacity: 0 }}` or `initial="hidden"` resulting in inline `style="opacity:0;transform:..."`).
  - In client browsers with `prefers-reduced-motion: reduce` (or Windows systems with visual animation effects turned off), `useReducedMotion()` immediately returned `true` during the initial client hydration render pass.
  - Components checking `shouldReduceMotion` dynamically rendered `initial={false}` or swapped motion wrappers for raw HTML `<Tag>` elements without inline opacity styles.
  - This divergence between the server-rendered HTML attributes and client hydration VDOM properties triggered React 19's critical hydration mismatch warning: `"A tree hydrated but some attributes of the server rendered HTML didn't match the client properties."`
- **Architecture Solution (`src/lib/motion.ts: useSafeReducedMotion`)**:
  - Implemented `useSafeReducedMotion()` hook in `@/lib/motion`.
  - Guarantees 100% attribute parity during SSR and initial client hydration by initializing `isReduced` to `false`.
  - Client-side `useEffect` actively checks `window.matchMedia("(prefers-reduced-motion: reduce)")` and attaches a dynamic `change` event listener, enabling real-time responsiveness when patrons toggle their OS or browser accessibility settings during a session.
  - When `shouldReduceMotion` is `true`, components immediately set animation durations to `0`, cancel translate offsets, and transition instantly without motion or layout shifts.
  - In `ScrollReveal` and `ScrollRevealItem`, components continuously preserve the `MotionComponent` wrapper rather than tearing down and remounting intrinsic HTML `<Tag>` strings post-mount, preventing DOM flashes and subtree destruction.
  - Completely eliminates hydration mismatches while strictly respecting accessibility standards (WCAG 2.1 AA / AAA).
- **Files Migrated**:
  - `src/lib/motion.ts`: Exported `useSafeReducedMotion` and `useReducedMotionSafe` with active `matchMedia` listener.
  - `src/components/HeroSection.tsx`: Replaced direct `useReducedMotion` with `useSafeReducedMotion`.
  - `src/components/ScrollReveal.tsx`: Preserved `MotionComponent` and replaced direct `useReducedMotion` in both `ScrollReveal` and `ScrollRevealItem`.
  - `src/components/SectionHeading.tsx`: Replaced in left and center variants.
  - `src/components/Footer.tsx`: Replaced and made duration zero when reduced motion is preferred.
  - `src/components/ProductCard.tsx`: Replaced in entrance and hover animations.
  - `src/components/CartDrawer.tsx`: Replaced in drawer slide-over.
  - `src/components/CollectionFilters.tsx`: Replaced hook reference.
  - `src/components/QuickViewModal.tsx`: Replaced in modal scale/opacity entrance.
  - `src/components/SearchDialog.tsx`: Replaced in search overlay.
  - `src/components/ScrollProgress.tsx`: Replaced in scroll bar visibility.
  - `src/components/PageTransition.tsx`: Replaced in route enter transition.
  - `src/app/products/[slug]/ProductDetailClient.tsx`: Replaced across all PDP animated sections.
- **Verification**:
  - Test Suite Added: `tests/hydration_reduced_motion.test.tsx` (10 unit and integration tests verifying SSR renderToString byte-for-byte invariance across all animated components, media query listener registration, and hook contracts).
  - Test Suite: All 17 test suites and 121 tests pass cleanly (`npm.cmd test`).
  - TypeScript: `npx.cmd tsc --noEmit` passes with 0 errors.
  - Next.js Production Build: `npm.cmd run build` successfully compiles all 66 routes with 0 errors.

---

## 20. Customer Auth Frontend Loading & Layout Shielding Architecture

- **Context & Diagnosis**:
  - Patrons and developers observed frontend loading issues on authentication pages (`/login`, `/signup`, `/forgot-password`, `/reset-password`).
  - **Issue 1 (Webpack Runtime Crash)**: In `next.config.mjs`, `framer-motion` was listed under `experimental.optimizePackageImports`. In Next.js 15, `framer-motion` is not an isolated barrel package; its SWC transform corrupted client module chunk loading, producing `TypeError: __webpack_modules__[moduleId] is not a function` during dev server page rendering.
  - **Issue 2 (Middleware Redirect Loops & Loss of Session Cookies)**: In `src/middleware.ts`, guest-only auth page redirects used a naive startsWith("/") check that triggered infinite redirect loops if `redirect=/login` or `redirect=/signup`. Redirects also instantiated new responses without preserving session cookies updated during token refresh.
  - **Issue 3 (Intro Splash & Modal Blocking)**: Direct visitors to `/login` or `/signup` had their screen obstructed by a 2-second full-screen dark splash intro (`IntroEntranceAnimation`) which attempted to calculate offsets to a non-existent logo.
  - **Issue 4 (Layout Clutter on Standalone Auth Portals)**: All auth pages were implemented with standalone atelier cards (`min-h-screen bg-canvas-subtle flex flex-col items-center justify-center p-4`) with their own brand header and "Return to Storefront" navigation. However, storefront `Header.tsx`, `Footer.tsx`, `ScrollProgress.tsx`, and `CartDrawer.tsx` were previously only suppressed for `/admin`, causing duplicate headers, off-screen scrolling, and layout clutter.
  - **Issue 5 (Search Parameter & Recovery Event Handling)**: In-flight error and message search parameters were not synced to component state if parameters changed post-mount, and `ResetPasswordPage` lacked an active `onAuthStateChange` listener to handle `PASSWORD_RECOVERY` events.
- **Architectural Solution & Hardening**:
  1. *Webpack Optimization Hardening*: Pruned `experimental.optimizePackageImports` in `next.config.mjs` to keep only verified barrel packages (`lucide-react`).
  2. *Middleware Redirect Shielding & Search Preservation*: Imported `getSafeRedirectUrl` in `src/middleware.ts` to strictly sanitize redirect destinations back to `/account` if an auth loop is attempted. Preserved all refreshed session cookies across redirects, and packaged full `pathname + search` cleanly into `?redirect=` to prevent leaking parameters onto `/login`.
  3. *Password Recovery Restoration & Path Defense*: Corrected `getSafeRedirectUrl` in `src/lib/auth/redirect.ts`. The legitimate destination for email password recovery callbacks (`/reset-password`) is preserved and allowed, preventing the callback route from redirecting password reset patrons to `/account`. Fixed loop defense to parse path components, catching `/login/`, `/login#`, and nested auth paths.
  4. *ScrollProgress & Intro Reactivity*: Converted `ScrollProgress` and `IntroEntranceAnimation` to reactive `usePathname()` hooks, fixing route transition bugs where the progress bar remained visible on auth routes or failed to appear after returning to the storefront.
  5. *Header Background Effect Suppression*: Suppressed `Header.tsx` session checks, Supabase database queries, and document keyboard listeners (`/` key search shortcut) on auth routes, saving client resources and preventing focus theft.
  6. *Unconfigured Supabase Safe Mode*: Guarded form submissions on `/login`, `/signup`, `/forgot-password`, and `/admin/login` against unconfigured Supabase keys, providing instant and actionable developer feedback instead of triggering hanging network requests to placeholder domains.
  7. *Reverse Proxy Host Consistency*: Standardized `/auth/signout` to respect `x-forwarded-host` in production, matching `/auth/callback`.
- **Verification**:
  - Test Suite Added: `tests/auth_pages.test.tsx` (18 unit tests verifying layout shielding, redirect validation, and component suppression).
  - All 18 Vitest test suites (139 tests) pass cleanly (`npm.cmd test`).
  - TypeScript type-checking (`npx.cmd tsc --noEmit`) passes with 0 errors.
  - Production build (`npm.cmd run build`) passes cleanly with all 66 static and dynamic routes compiled.

---

## 25. Promotional Offer Pop-Up Removal & Canonical Auth Redirect Architecture

- **Context & Objectives**:
  - The store owner requested complete removal of the promotional welcome/offer modal ("EXCLUSIVE MEMBER PRIVILEGE / Welcome to LUMIÈRE / FIRSTBUY / Save ₹300 on your first purchase above ₹1,499").
  - A recurring build error was encountered across feature branches: `Module parse failed: Identifier 'getSafeRedirectUrl' has already been declared (52:9)` inside `src/components/GoogleSignInButton.tsx`.
- **Root Cause & Permanent Resolution**:
  - **Duplicate Declaration Root Cause**: In `origin/main` commit `764d021`, `import { getSafeRedirectUrl } from "@/lib/auth/redirect";` and its re-export were positioned in the middle of `src/components/GoogleSignInButton.tsx` (around line 46, after `GoogleSignInButtonProps`). Whenever automated refactoring, auto-import formatting, or code modifications imported `getSafeRedirectUrl` at the top of the file without deleting the mid-file duplicate, Webpack/Babel failed during parsing with a duplicate declaration error.
  - **Permanent Fix**: Cleanly hoisted the canonical import and export to the module header alongside other top-level imports in `src/components/GoogleSignInButton.tsx`, eliminating any mid-file or appended duplicate statements.
  - **Redirect Sanitizer Hardening**: Configured `getSafeRedirectUrl` in `src/lib/auth/redirect.ts` to parse pathname components cleanly, blocking loops to `/login`, `/signup`, `/forgot-password`, and `/auth/*` while preserving `/reset-password` for password recovery token exchanges.
  - **Promotional Modal Deletion**: Permanently excised `src/components/WelcomeAnnouncementModal.tsx` and removed all invocations and imports from `src/app/layout.tsx`.
- **Verification**:
  - `npm.cmd test`: All 18 test suites (139 tests) pass cleanly.
  - `npx.cmd tsc --noEmit`: 0 TypeScript diagnostic errors.
  - `npm.cmd run build`: Full Next.js production build succeeds with all 66 routes compiled.

---

## 26. Luxury Motion & Premium Transitions Architecture

- **Context & Objectives**:
  - The storefront felt abrupt and static during route transitions, drawer operations, and viewport scrolling.
  - Objective: Elevate LUMIÈRE into an Apple-grade, high-fashion editorial shopping experience with fluid fade-and-rise page transitions, animated navigation indicators, responsive hover micro-interactions, drawer slide-overs, and staggered scroll reveals.
- **Architectural Implementation**:
  1. *Motion Design Tokens (`src/lib/motion.ts`)*:
     - Standardized on luxury cubic-bezier curve `LUXURY_EASE = [0.22, 1, 0.36, 1]`.
     - Standard page transition: `450ms` (`y: 12` to `0`, `opacity: 0` to `1`).
     - Standard scroll reveals: `650ms` (`scrollFadeUp`, `scrollScaleUp`, `scrollSlideLeft`, `scrollSlideRight`).
     - Modals and drawers: `320–400ms` with fluid GPU acceleration.
  2. *SSR-Safe Page Transitions (`src/components/PageTransition.tsx` & `src/app/template.tsx`)*:
     - Page transitions key on Next.js 15 App Router navigation via `template.tsx`.
     - Client `mounted` state gating prevents initial SSR attribute mismatch warnings, guaranteeing 100% byte-for-byte HTML parity during SSR while animating client route changes seamlessly.
     - Layout jitter and horizontal scrollbar flickers prevented by adding `overflow-x-hidden` to both `body` and `main` in `src/app/layout.tsx`.
  3. *Header & Navigation Micro-Interactions (`src/components/Header.tsx`)*:
     - Desktop category navigation links feature animated luxury gold underline indicators (`scale-x-0 group-hover/nav:scale-x-100` and persistent `scale-x-100` for active route).
     - Mega menu dropdown upgraded with `backdrop-blur-md`, subtle `y: -8` entrance, and staggered column reveals (`idx * 0.04` delay).
     - Account flyout menu upgraded with `scale: 0.98 -> 1`, `y: 10 -> 0`, and `duration: 0.22`.
     - Mobile navigation drawer upgraded to `0.28s` fluid slide.
  4. *Card Lift & Shopping Interactions (`src/components/ProductCard.tsx`)*:
     - Hover lift refined to `whileHover={{ y: -6 }}` with `duration: 0.28` and elevated shadow (`shadow-[0_20px_40px_rgba(13,13,13,0.09)]`).
     - Quick action strip smoothly glides in with `cubic-bezier(0.22, 1, 0.36, 1)`.
     - Staggered entrance supports `index` prop for grid reveals.
  5. *Modals & Drawers (`src/components/QuickViewModal.tsx` & `src/components/CartDrawer.tsx`)*:
     - Quick View dialog entrance tuned with `duration: 0.32`, `scale: 0.94 -> 1`, and `y: 16 -> 0`.
     - Cart Drawer upgraded to `0.4s` slide with `<AnimatePresence>` for cart items, providing smooth entrance and height-collapsing exits on item removal.
     - Interactive active-tap micro-interactions (`whileTap={{ scale: 0.92 }}`) on quantity counters and remove buttons.
  6. *Scroll-Based Reveals (`src/components/ScrollReveal.tsx`)*:
     - Standardized reveal durations to 650ms with `once: true` viewport triggers.
     - Integrated across PDP (`ProductDetailClient.tsx`), Category and Collection headers, Wishlist, Cart empty states, and About atelier narrative sections.
  7. *Refinement & Edge Case Hardening*:
     - **Initial Page Entrance & Genuine Exit Transitions (`src/components/PageTransition.tsx` & `src/app/globals.css`)**: Implemented `<AnimatePresence mode="wait" initial={false}>` with route exit animation (`y: -8, opacity: 0` over 220ms) and enter animation (`y: 10 -> 0, opacity: 0 -> 1` over 380ms). Integrated `.animate-page-entrance` CSS keyframe fade for fresh page opens, ensuring zero white flashes and 100% byte-for-byte SSR hydration parity.
     - **Cart Drawer Item Collapse Fix (`src/components/CartDrawer.tsx`)**: Fixed CSS box-model padding issue where `py-4` clamped `height: 0` animations to 32px before snapping; moved vertical padding to an inner div so item removal collapses cleanly from full height to 0px.
     - **Search Dialog Elevation (`src/components/SearchDialog.tsx`)**: Elevated search modal with `modalDialogVariant` (320ms enter / 240ms exit), staggered pill and suggestion entrance animations, and active/hover micro-interactions.
     - **Timing Harmonization (`src/lib/motion.ts`)**: Harmonized dropdown and modal durations to 280–320ms with cubic-bezier deceleration curves.
- **Verification**:
  - `npm.cmd test`: All 18 test files (147 tests) pass cleanly across all suites.
  - `npx.cmd tsc --noEmit`: 0 TypeScript diagnostic errors.
  - `npm.cmd run build`: Full Next.js production build succeeds with all 66 routes compiled.

---

## 27. Product Intro Entrance Animation & Zero-FOUC Human Atelier Experience (Pure Framer Motion & React)

- **Context & Objective**:
  - Implement a luxury product & atelier entrance animation for visitors entering the LUMIÈRE platform.
  - Strict Operational Constraints:
    1. Zero-FOUC (Flash of Unstyled/Underlying Content): The intro MUST be the absolute first thing visible when entering the website; the underlying storefront (header, hero, banners, catalog) must NEVER flash or be visible before the intro begins.
    2. Zero Replay: The intro must ONLY play on first entry. It must NEVER replay when refreshing the website (F5, browser reload, hard reload) or when navigating between pages within the storefront.
    3. Human Craftsmanship (Anti-AI Slop): Pure luxury haute atelier experience built with native **Framer Motion** and **React** (without external uninstalled dependencies).
- **Root Cause Analysis of Prior Build & Dependency Issues**:
  1. *Build Failure on Uninstalled GSAP/Remotion*: Prior commit introduced `gsap` and `remotion` imports into `IntroEntranceAnimation.tsx` without installation in `node_modules`, breaking Next.js webpack production build (`Module not found: Can't resolve 'gsap'`).
  2. *Architectural Restoration*: Restored `IntroEntranceAnimation.tsx` to project's canonical stack (`framer-motion` and `LUXURY_EASE`).
- **Architectural Solution & Hardening**:
  - **Zero-FOUC Immediate Execution Shield (`src/app/layout.tsx` <head>)**:
    - Synchronous `<script id="lumiere-intro-shield">` in `<head>` executes before First Contentful Paint, checking `sessionStorage`, `localStorage`, and in-memory flags.
    - Synchronous critical inline `<style id="lumiere-intro-critical-css">` in `<head>` applies `display: none !important; opacity: 0 !important; visibility: hidden !important;` immediately if dismissed, guaranteeing zero FOUC on refresh or return even before external stylesheets load.
    - Added `suppressHydrationWarning` to `<html lang="en" suppressHydrationWarning>` in `src/app/layout.tsx` to silence React hydration warnings caused by the pre-paint head script modifying `<html>` classes.
    - `<noscript>` fallback prevents any intro blockage if JavaScript is disabled.
  - **Frame-0 Luxury Atelier Presentation Curtain (`src/app/layout.tsx` <body>)**:
    - `#lumiere-intro-curtain` (`fixed inset-0 z-[99998] bg-[#08080a]`) renders in static server HTML with the authentic 24k gold Sovereign Monogram and Didone wordmark. First-time visitors immediately see the luxury brand identity from frame 0—no blank black screens, no storefront flash.
  - **Human Atelier Framer Motion Choreography (`src/components/IntroEntranceAnimation.tsx`)**:
    - **Prologue — Golden Zari Thread Embroidery**: `motion.path` draws the Sovereign "L" stroke (`pathLength: 0` -> `1`), fills with 24k gold (`#C59B48`), and the spring-damped diamond gemstone materializes with celestial resonance (`motion.polygon` spring damping: 14, stiffness: 120, mass: 0.8).
    - **Act 1 — Editorial Typographic Awakening**: Didone wordmark (`L U M I È R E`) awakens character-by-character with staggered optical blur dissolve (`blur(6px)` -> `blur(0px)`).
    - **Act 2 — Atelier Provenance & Hairline**: An expanding 1px gold hairline extends outward from center (`scaleX: 0` -> `1`), revealing understated provenance (*"Hand-Loomed Chanderi • Bespoke Tailoring • Luxury Curations"*). Pure luxury without fake timers or AI tickers.
    - **Act 3 — The Parting Silk Curtains**: Dual noir silk curtains part smoothly offscreen (`initial={{ x: "0%" }}` to `animate={{ x: isParting ? "-102%" : "0%" }}` and `102%` with `LUXURY_EASE`), seamlessly revealing the live storefront.
  - **Defensive Storage & Lifecycle Guards**:
    - Immediate multi-storage synchronization (`safeMarkIntroCompleted()`) on initial mount protects against rapid repeated refreshes (Ctrl+F5) or instant tab reloads.
    - Isolated error handling for `sessionStorage` and `localStorage` so a `SecurityError` or `QuotaExceededError` in one storage mechanism does not block the other or trigger infinite re-renders.
    - Lifecycle timer hardening: `isIntroActiveRef` and `skipTimerRef` protect against React 18/19 StrictMode double-mounting timer cancellation and unmount memory leaks.
    - Route transition interceptor dismisses intro cleanly within 350ms if navigation occurs mid-prologue.
    - Escape key and discrete Skip button provide accessible immediate bypass.
    - Strict respect for `prefers-reduced-motion: reduce`.
- **Verification**:
  - `npm.cmd test`: All 18 test files (155 tests) pass cleanly across all suites.
  - `npx.cmd tsc --noEmit`: 0 TypeScript diagnostic errors.
  - `npm.cmd run build`: Full Next.js production build succeeds with all 66 routes compiled.

---

## 28. Comprehensive Performance Optimization Architecture

- **Context & Objective**:
  - Optimize storefront and administrative performance across compiler settings, database query concurrency, hot client component memoization, media asset delivery, and session middleware latency.
  - Maintain 100% functionality of all business logic (3-pool inventory accounting, Delhivery PIN checks, PhonePe payment verification, Supabase SSR auth, two-stage return inspection, coupon validation).
- **Architecture & Optimizations Implemented**:
  1. **Next.js & Webpack Compiler Optimizations (`next.config.mjs`)**:
     - Configured `experimental.optimizePackageImports` for `framer-motion` and `lucide-react` to minimize bundle chunk sizes.
     - Silenced Webpack 5 `PackFileCacheStrategy` big string serialization performance warnings via `config.infrastructureLogging = { level: "error" }`.
     - Injected long-term immutable caching headers (`public, max-age=31536000, immutable`) for `/_next/static/:path*` and `/brand/:path*`.
     - Fixed media caching path pattern with escaped dot `/:path*\\.(svg|png|jpg|jpeg|webp|avif|ico|webmanifest)` to prevent false-positive matches on pages or slugs ending in extension names (e.g., `/mexico`, `/category/calico`).
  2. **Database Query Concurrency & Allocation Optimization**:
     - Optimized `db.products.getAll` in `src/lib/db/index.ts`: implemented single-pass combined predicate filtering with normalized parameters outside the loop (eliminating up to 10 intermediate array allocations and repeated string conversions).
     - Swapped `new Date()` object instantiation in quicksort with `Date.parse()` for allocation-free sorting.
     - Deferred variant cloning and inventory mapping until after filtering, sorting, and slicing by `limit`.
     - Added `limit: 5` to PDP related products fetch (`src/app/products/[slug]/page.tsx`) to avoid querying all items in the category.
     - Replaced sequential async query waterfalls with parallel `Promise.all()` across critical routes (`src/app/category/[slug]/page.tsx`, `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/app/admin/inventory/page.tsx`, `src/app/admin/audit-logs/page.tsx`, `src/app/account/page.tsx`).
  3. **Hot Client Component & Context Memoization**:
     - `src/context/WishlistContext.tsx`: wrapped `toggleWishlist` and `isInWishlist` in `useCallback` and memoized provider `contextValue` with `useMemo`.
     - `src/context/CartContext.tsx`: wrapped `addItem`, `removeItem`, `updateQuantity`, `clearCart` in `useCallback`, memoized `totalCount` and `subtotal`, and memoized provider `contextValue` with `useMemo`. This stops tree-wide cascade re-renders of all `ProductCard` and navigation components on cart/wishlist state changes.
     - `src/components/ProductCard.tsx`: wrapped in `React.memo`; wrapped price calculations, discount percentages, total stock, and unique color lists in `useMemo`; wrapped `handleColorSelect`, `handleToggleWishlist`, and `handleQuickAddSize` in `useCallback`; added synchronization effect for `selectedVariant` and `activeImage` when `product` prop changes.
     - `src/components/CartDrawer.tsx`: wrapped in `React.memo`; wrapped subtotal, free shipping progress, discount calculations in `useMemo`; wrapped `validateCoupon` and `removeCoupon` in `useCallback`; fixed 1-second countdown interval to ONLY execute when drawer is actively open; cleared applied coupon when subtotal reaches zero.
     - `src/components/Header.tsx`: wrapped in `React.memo`; extracted `checkIsAdmin` outside component scope; wrapped `handleSignOut`, hover handlers, search submission in `useCallback`; memoized active mega menu selection with `useMemo`; added `loading="lazy"` to mega menu campaign banners.
     - `src/app/products/[slug]/ProductDetailClient.tsx`: wrapped in `React.memo`; memoized variants, stock checks, pricing, and discount calculations; wrapped `handleAddToCart`, `handleToggleWishlist`, and `toggleAccordion` in `useCallback`; throttled magnifier coordinate updates using `requestAnimationFrame` and added unmount cleanup; synchronized variant selection on `product` prop changes.
     - `src/components/CollectionFilters.tsx`: wrapped `toggleSection`, `updateFilter`, and `clearAllFilters` in `useCallback`.
     - `src/components/SearchDialog.tsx`: wrapped `SearchDialog` and inner `HighlightMatch` in `React.memo`.
  4. **Asset & Image Delivery**:
     - Fixed `sizes` on `ProductCard` from `(max-width: 640px) 100vw` to `(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw`, eliminating mobile bandwidth waste on 2-column grids.
     - Added explicit `loading="lazy"` to below-the-fold elements in `src/app/page.tsx` (category tiles, campaigns, outfit cards, artisanal weaving story) and `src/app/outfits/page.tsx`.
     - Added `sizes="100vw"` on `src/app/about/page.tsx` hero image.
  5. **Middleware & Auth Latency (`src/middleware.ts`)**:
     - Fast-pathed public storefront requests (`/`, `/products`, `/category/*`, `/cart`, etc.) to return `NextResponse.next()` immediately without allocating `new Headers(request.headers)` or setting redundant admin headers.
     - Expanded `config.matcher` regex to exclude `robots.txt`, `sitemap.xml`, `brand/`, and `.avif` assets from invoking middleware at the edge layer.
     - Maintained instant 0ms redirects for unauthenticated access to protected `/admin` and `/account` routes via fast-path auth cookie checks.
- **Verification**:
  - `npm.cmd test`: All 18 test files (155 tests) pass cleanly across all suites.
  - `npx.cmd tsc --noEmit`: 0 TypeScript diagnostic errors.
  - `npm.cmd run build`: Full Next.js production build succeeds with all 66 routes compiled in 8.1s with zero warnings.

---

## 29. Resilient Remote Image Architecture & Google Domains Integration

- **Incident & Root Cause**:
  - Next.js `next/image` throws an uncaught synchronous runtime exception (`Invalid src prop ... hostname is not configured under images in your next.config.js`) when an external image hostname is not configured in `next.config.mjs` under `images.remotePatterns`.
  - When an admin, user, or partner feed provided an image from `share.google` (e.g., `https://share.google/qsxtZOVe5uoibVG8h`) or another unconfigured host, `next/image` crashed during render, triggering the global storefront ErrorBoundary in `src/app/error.tsx`.
- **Architecture & Resilience Safeguards Implemented**:
  1. **Remote Pattern & CSP Registration (`next.config.mjs`)**:
     - Added `share.google`, `*.googleusercontent.com`, `googleusercontent.com`, `drive.google.com`, `*.google.com`, and `google.com` to `images.remotePatterns`.
     - Synchronized apex and wildcard domains for `supabase.co`, `*.supabase.co`, `phonepe.com`, and `*.phonepe.com`.
     - Injected matching domains into the Content Security Policy (CSP) `img-src` directive so browser network policies allow loading image assets from Google, Google Drive, Supabase, and PhonePe.
  2. **Safe Image Domain Resolver (`src/lib/images.ts`)**:
     - `DEFAULT_FALLBACK_IMAGE`: authentic high-resolution atelier silk fallback on trusted Unsplash host.
     - `INLINE_FALLBACK_SVG`: zero-network luxury inline SVG fallback ensuring visual resilience even when completely offline.
     - `ALLOWED_IMAGE_HOST_PATTERNS`: authoritative list of permitted host patterns strictly synchronized with `next.config.mjs`.
     - `matchesHostname()`: accurately mirrors Next.js's internal picomatch wildcard matching semantics.
     - `isSafeImageUrl()`: rigorously validates protocol (`https:`), relative paths (`/brand/...`), inline data URIs (`data:image/...`), and wildcard/exact hostnames. Rejects unconfigured domains, malformed URLs, and non-HTTP protocols.
     - `normalizeImageUrl()`: automatically converts standard (`/file/d/...`) and multi-account Google Drive viewer URLs (`/file/u/0/d/{id}/view`, `/open?id={id}`, `/uc?id={id}`) into direct viewable image URLs (`/uc?export=view&id={id}`), upgrades protocol-relative (`//`) URLs, and upgrades `http://` to `https://` for known allowed hosts.
     - `getSafeImageUrl()`: returns the normalized safe URL or defaults to `DEFAULT_FALLBACK_IMAGE`, also safeguarding against invalid custom fallbacks.
  3. **Resilient SafeImage Component (`src/components/SafeImage.tsx`)**:
     - Implements a triple-layer defensive shield:
       - *Layer 1 (Pre-Render)*: Sanitizes `src` with `resolveSafeSrc()` before passing to `next/image`, preventing `next/image` from ever receiving an unconfigured host or invalid object during SSR.
       - *Layer 2 (Runtime Fallback)*: Handles DOM `onError` events to gracefully switch `currentSrc` to `safeFallback`, and cascades to `INLINE_FALLBACK_SVG` if the fallback itself encounters network issues.
       - *Layer 3 (Component ErrorBoundary)*: Contains an isolated `SafeImageErrorBoundary` with `unoptimized={true}` on the fallback node to catch any unforeseen synchronous Next.js loader errors at the image node level, rendering the fallback node instead of crashing the parent page or triggering the global storefront `ErrorBoundary`.
  4. **Storefront & Admin Integration**:
     - Updated `Header`, `ProductCard`, `QuickViewModal`, `ProductDetailClient`, `CartDrawer`, `SearchDialog`, `cart/page.tsx`, `checkout/page.tsx`, `HeroSection`, `page.tsx`, `outfits/page.tsx`, `category/[slug]/page.tsx`, `collection/[slug]/page.tsx`, `about/page.tsx`, `admin/products/ProductsClient.tsx`, and `admin/affiliate/AffiliateClient.tsx` to use `SafeImage`.
     - Updated `src/app/api/admin/products/route.ts` to validate and sanitize image URLs with `getSafeImageUrl` upon product creation.
- **Verification**:
  - `npm.cmd test`: All 19 test files (182 tests) pass cleanly, including 27 dedicated tests in `tests/safe_image.test.tsx`.
  - `npx.cmd tsc --noEmit`: 0 TypeScript diagnostic errors.
  - `npm.cmd run build`: 100% successful Next.js production build (66 static & dynamic routes compiled with zero errors).

---

## 30. Webpack Runtime TypeError Hardening (`__webpack_modules__[moduleId] is not a function`)

- **Root Cause & Diagnosis**:
  - In commit `4bd31b0`, `framer-motion` was inadvertently re-added to `experimental.optimizePackageImports` in `next.config.mjs`.
  - In Next.js 15 (App Router with Webpack), `framer-motion` does NOT support AST barrel-splitting optimization because it depends on internal circular references, dynamic Proxies (such as `motion.div`), and shared animation contexts.
  - When Webpack compiled the client chunks with `optimizePackageImports`, client module evaluation failed at runtime with:
    `Runtime TypeError: __webpack_modules__[moduleId] is not a function` whenever any component importing `framer-motion` was rendered.
  - Verified that there were zero circular dependencies across `src/` and zero named/default import/export mismatches (including `GoogleSignInButton.tsx` and `src/lib/auth/redirect.ts`).
- **Remediation & Safeguards**:
  1. *next.config.mjs*: Excised `"framer-motion"` from `experimental.optimizePackageImports`, leaving only verified modular barrel packages (`"lucide-react"`), and added explicit architectural comments guarding against re-addition.
  2. *Cache Invalidation*: Cleared stale compilation cache in `.next/cache`.
  3. *Import/Export Integrity*: Verified that `GoogleSignInButton.tsx` correctly provides both named and default exports and references canonical redirect sanitation without circular references.
  4. *Remote Image Resiliency*: Confirmed `share.google` and Google Drive domains remain properly registered in `next.config.mjs` remotePatterns and CSP, backed by `SafeImage` multi-layer fallback handling.
  5. *Automated Guard Suite (`tests/webpack_modules_integrity.test.ts`)*: Added 10 automated test cases that programmatically:
     - Assert that `framer-motion` is NEVER present in `experimental.optimizePackageImports`.
     - Traverse the AST of all TypeScript files under `src/` to guarantee an acyclic module graph (0 circular dependencies).
     - Verify import/export contract consistency (no missing default exports or unexported named symbols).
     - Enforce server vs. client module boundaries (zero Node builtins in `"use client"` modules, and `"use client"` presence on all Framer Motion components).
- **Verification**:
  - `npm.cmd test`: All 20 test suites (192 tests) pass cleanly.
  - `npx.cmd tsc --noEmit`: 0 TypeScript diagnostic errors.
  - `npm.cmd run build`: Successfully built all 66 routes in Next.js production mode with 0 errors.



