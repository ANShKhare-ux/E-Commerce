# LUMIÈRE — Modern Indian Fashion & Luxury E-Commerce Platform

> **LUMIÈRE** is an enterprise-grade fashion commerce platform engineered specifically for the Indian market. Combining indigenous handloom heritage with contemporary tailoring and verified luxury affiliate fashion discoveries, LUMIÈRE delivers an uncompromising digital atelier experience.

---

## 1. Highlights & Architectural Capabilities

- **Pan-India Fashion Commerce**: Built from the ground up for India (INR `₹` currency formatting, state/GST tax rules, pincode serviceability checks across 19,000+ Indian postal codes).
- **Dual Business Model**:
  1. *LUMIÈRE Atelier Stocked*: Physical stock manufactured and held in LUMIÈRE fulfillment hubs.
  2. *Affiliate Luxury Curations*: Verified partner integrations (Tata CLiQ Luxury, Ajio Luxe, Myntra Luxe) with administrative review queues, external redirects, and automated synchronization.
- **Next.js 15 App Router & React 19**: Complete server-side rendering, dynamic routes, incremental static regeneration (ISR), responsive layouts, and zero-flicker transitions.
- **Supabase & PostgreSQL**: Strict schema architecture with Row-Level Security (RLS), atomic concurrency handling, audit logging, and automated status machines.
- **Automatic Inventory Engine**: Variant-level SKUs (size, color, weight), 15-minute checkout reservation holds, atomic concurrency-safe deductions, cancellation auto-restores, and physical inspection return workflows.
- **Indian Payment Workflows**: Seamless integration with PhonePe & Google Pay / GPay (instant UPI Intent/QR, direct pay) alongside Cash on Delivery (COD) with separate accounting states.
- **Official Delhivery Express Logistics**: Indian logistics automation for live pincode serviceability validation, AWB waybill allocation, shipping manifests, tracking timelines, and reverse pickup logistics.
- **Transactional Customer Email Outbox**: Resilient notifications for order placements, COD verification, Delhivery dispatch waybills, returns, and refunds via Resend API with automated failure retries.
- **Automated Cron Sweepers**: Expired reservation cleanup, low-stock threshold sweeps, affiliate product link validation, and system telemetry health monitors.

---

## 2. Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 15.1 (App Router), React 19, TypeScript 5.7 |
| **Styling & Design** | Tailwind CSS 3.4, Lucide Icons, Custom Noir & Gold Atelier Palette |
| **Animations** | Framer Motion 12 (reduced-motion accessible) |
| **Database & Auth** | Supabase PostgreSQL, Row-Level Security (RLS), Supabase SSR Auth |
| **Payments** | Indian Gateway APIs (PhonePe & Google Pay / GPay UPI) + Cash on Delivery |
| **Logistics** | Delhivery Express B2C API integration |
| **Testing** | Vitest 3.0 test suite with unit, integration, and end-to-end scenarios |

---

## 3. Storefront Pages & Features

- **Editorial Homepage (`/`)**: Hero runway showcases, craft heritage trust badges, curated outfit bundles, trending deals, and category showcases.
- **Product Catalog (`/products`)**: Real-time multi-facet filtering (Category, Collection, Price range, Handloom origin, Discounted Deals, In-Stock, and sorting).
- **Category Portals (`/category/[slug]`)**: Dedicated boutiques for *Ethnic Wear*, *Women's Clothing*, *Men's Clothing*, *Streetwear*, and *Premium & Luxury*.
- **Collection Edits (`/collection/[slug]`)**: Editorial presentations for *Royal Heritage Edit*, *Monsoon Minimalism*, and *District Zero Streetwear*.
- **Product Detail Boutique (`/products/[slug]`)**: Image gallery, variant selection (size & color), live stock badge, Delhivery pincode delivery estimator, fabric & origin care guide, and wishlist action.
- **Curated Outfits (`/outfits`)**: Head-to-toe curated ensembles with master styling notes and one-click bundle discovery.
- **Exclusive Deals (`/deals`)**: Verified promotional pricing and seasonal designer markdowns.
- **Wishlist (`/wishlist`)**: Client-persisted curation of desired silhouettes.
- **Cart & Bag (`/cart`)**: Persistent shopping bag drawer and dedicated checkout overview.
- **Checkout (`/checkout`)**: Multi-step checkout with address validation (Indian states & 6-digit PIN), temporary stock reservation holds, UPI QR/intent flow, and COD.
- **Order Tracking (`/track-order`)**: Real-time status lookup using Order Numbers (`LUM-YYYY-XXXXXX`) or Delhivery AWB Waybills.
- **Patron Account (`/account`)**: Order history, order tracking, and 7-day physical return requests.
- **Statutory & Policy Suite**:
  - Shipping Policy (`/shipping-policy`)
  - Cancellation & 7-Day Returns (`/cancellation-returns`)
  - Refund Policy (`/refund-policy`)
  - Affiliate Disclosure (`/affiliate-disclosure`)
  - Privacy Policy (`/privacy-policy`)
  - Terms of Service (`/terms`)
  - About Our Artisans (`/about`)
  - Contact Concierge (`/contact`)

---

## 4. Private Administrative Control Room (`/admin`)

Access is strictly protected via server-side authorization linked to `ADMIN_EMAIL` and Supabase profile roles:

- **Executive Dashboard (`/admin`)**: Real-time gross revenue, order volume, low-stock warnings, and Delhivery in-transit telemetry.
- **Products & SKU Architect (`/admin/products`)**: Create new apparel designs, configure size/color matrices, upload image URLs, assign craft origin, and manage SKUs.
- **Inventory & Stock Manager (`/admin/inventory`)**: Live variant stock counts, manual adjustment logs with mandatory reason tracking, and bulk CSV inventory ingestion.
- **Order Processing (`/admin/orders`)**: Filter orders by status, verify payment proofs, review COD collections, and transition orders through fulfillment.
- **Delhivery Logistics Hub (`/admin/shipments`)**: Dispatch orders, allocate AWB waybills, download shipping labels, and track couriers.
- **Returns & Inspection Restock (`/admin/returns`)**: Two-stage return authorization: items are only restocked to sellable inventory after physical receipt and inspection sign-off.
- **Affiliate Review Queue (`/admin/affiliate`)**: Inbound staging queue for external partner products with manual approval, rejection, and price synchronization.
- **Store Governance & Policies (`/admin/policies`)**: Live adjustment of free-shipping thresholds, COD charges, and delivery SLA expectations.
- **Administrator Management (`/admin/administrators`)**: RBAC permissions management for corporate personnel.
- **Automations & Health Diagnostics (`/admin/automations`)**: Monitor status of cron jobs, retry failed transactional emails, and inspect API latency.
- **Audit Logs (`/admin/audit-logs`)**: Complete historical trace of every administrative state change.

---

## 5. Quick Start & Development

### Prerequisites
- Node.js 18+ (tested on Node v20+)
- npm or yarn

### Installation
```bash
# Clone and enter workspace
cd E-Commerce

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run automated test suite
npm test

# Start Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin console.

### Production Build
```bash
npm run build
npm start
```

---

## 6. Testing

The platform includes automated unit and integration tests across 8 test suites:
- `tests/inventory.test.ts`: Stock reservations, threshold triggers, and mandatory adjustment audit trails.
- `tests/checkout.test.ts`: Atomic sale deductions, COD transitions, cancellations, and return restock workflows.
- `tests/concurrency_webhooks.test.ts`: Oversell prevention under concurrent checkouts, order idempotency, and webhook deduplication.
- `tests/security_auth.test.ts`: Protection against client-side price tampering, customer data isolation, and admin RBAC enforcement.
- `tests/payments.test.ts`: Indian Rupee paise calculations and HMAC-SHA256 signature verification.
- `tests/delhivery.test.ts`: PIN code serviceability algorithms, waybill formatting, and tracking response parsing.
- `tests/affiliate.test.ts`: Partner queue approval, rejection, and out-of-stock flagging.
- `tests/e2e_lifecycle.test.ts`: Full customer journey from browsing to variant selection, reservation, order capture, and courier dispatch.

Execute tests anytime with:
```bash
npm test
```

---

## 7. License & Compliance

© LUMIÈRE Fashions India Pvt. Ltd. All rights reserved. GSTIN: `27AABCL9841K1Z3`. Market: Republic of India only.

