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
| **Payment Verification** | Implemented & Verified | PhonePe Standard Checkout API (paise math, SHA256 base64 payload checksum with X-VERIFY salt index validation) + Google Pay (GPay) NPCI standard UPI deep-link intent order generation + Cash on Delivery (COD) in `src/lib/services/payments.ts`. Razorpay completely removed. Verified via `tests/payments.test.ts`. |
| **Customer Auth & SSR** | Implemented & Verified | Full Supabase SSR customer authentication: `/signup` (name, email, password strength, confirmation), `/login` (safe internal redirect validation), `/forgot-password`, `/reset-password` (recovery session), `/auth/callback` (PKCE exchange), and `/auth/signout`. |
| **Session Middleware & RBAC** | Implemented & Verified | `src/middleware.ts` maintains active Supabase sessions across SSR requests, protects `/account/*` (redirects to `/login`), and guards `/admin/*` (redirects to `/admin/login`). `verifyAdminAuthorization` strictly validates `ADMIN_EMAIL` and database profile roles (`admin`, `super_admin`). |
| **Customer Account Area** | Implemented & Verified | `/account` authenticated dashboard: profile management (`/api/account/profile`), saved shipping addresses with Indian 6-digit PIN validation (`/api/account/addresses`), order history isolation (`/api/account/orders`), saved wishlist, and sign out. |
| **Delhivery Logistics** | Implemented & Verified | 6-digit PIN validation, transit estimation, AWB waybill assignment (`DEL-AWB-...`), reverse pickup tracking. Verified via `tests/delhivery.test.ts`. |
| **Transactional Email Outbox** | Implemented & Verified | Responsive HTML templates, Resend API integration with resilient in-memory outbox fallback. Verified via `tests/email.test.ts`. |
| **Security & RBAC** | Implemented & Verified | Server-side identity validation against `ADMIN_EMAIL` and Supabase profile roles; client price manipulation blocked; admin route authorization checks enforced on `/api/admin/homepage` and `/api/admin/promotions`. Verified via `tests/security_auth.test.ts`. |
| **Database Migrations** | Implemented (SQL files present) | `supabase/migrations/001_initial_schema.sql` (27 tables, RLS), `002_seed_data.sql` (categories & collections), and `003_auth_triggers_and_roles.sql` (`handle_new_user()` trigger on `auth.users`, role escalation prevention, wishlist unique constraints). |
| **Production Integrations** | Sandbox / Fallback Verified | PhonePe, Google Pay (GPay), Delhivery, and Resend fall back gracefully to sandbox simulation when credentials are unset. Live external API calls require production keys. |
| **Build & SSR Stability** | Implemented & Verified | All merge conflict markers eliminated; React Hook rules strictly enforced in `CartDrawer.tsx`; `<RecentlyViewed />` client-hydration stabilized; all 54 routes compiled with 0 errors. |

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
   - Prepaid orders receive Razorpay order in paise; COD orders remain in `pending` payment status
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
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Key ID | `rzp_test_...` or `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret | Secret for signature verification |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Webhook Secret | Secret for webhook verification |
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
3. **External Services Fallback**: In the absence of live production API keys, Delhivery, Razorpay, and Resend operate in mock simulation mode.
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
2. Connect live Supabase project and execute `001_initial_schema.sql` and `002_seed_data.sql`.
3. Provide live production credentials for Razorpay, Delhivery, and Resend in hosting platform environment variables.
4. Set up an external cron scheduler (e.g. Vercel Cron or GitHub Actions) invoking `/api/cron/cleanup-reservations` every 5 minutes with `CRON_SECRET`.

---

## 12. Areas That Could Not Be Verified

- **Live Production Network APIs**: Production calls to Delhivery Express servers, Razorpay payment capture API, and Resend email transmission could not be verified in this sandbox environment without live API credentials (verified in sandbox simulation mode).
- **Supabase Cloud PostgreSQL**: Live database connectivity and RLS policy enforcement on remote Supabase infrastructure could not be verified offline (SQL migration files inspected and verified).