# LUMIÈRE System Architecture & Technical Design

---

## 1. Executive Summary & Architectural Principles

**LUMIÈRE** is a decoupled fashion and luxury e-commerce platform designed specifically for the Indian market. The architecture balances high-performance client presentation with strict inventory and financial consistency.

### Architectural Tenets
1. **Financial & Price Authority on Server**: All pricing, discounts, 12% textile GST, and shipping thresholds are computed server-side. The client provides intent and quantities, never prices.
2. **Atomic Inventory Pools**: Variant stock is partitioned into three pools (`Physical`, `Reserved`, `Available`) with 15-minute checkout reservation holds and concurrency safeguards.
3. **Resilient Dual-Data Strategy**: Production uses Supabase PostgreSQL with Row-Level Security (RLS) while local/test environments run on a stateful, singleton in-memory repository with zero external dependencies required for testing.
4. **Resilient Transactional Outbox**: Application events (order confirmation, courier dispatch) write to a persistent outbox queue before external dispatch, preventing third-party API downtime from disrupting customer transactions.
5. **Pan-India Logistics Automation**: Integrated with Delhivery B2C APIs for 6-digit PIN serviceability validation, AWB waybill allocation, transit telemetry, and two-stage reverse returns.

---

## 2. High-Level Component Topology

```
+---------------------------------------------------------------------------------+
|                                CLIENT LAYER                                     |
|  - Next.js 15 App Router Frontend (React 19, Tailwind CSS, Framer Motion)       |
|  - Storefront Boutique: Products, Categories, Outfits, Bag Drawer, Checkout    |
|  - Private Admin Control Room: Products, Inventory, Orders, Shipments, Returns  |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                           NEXT.JS APPLICATION LAYER                             |
|  - Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR)         |
|  - Server Actions & Route Handlers (/api/checkout, /api/inventory, /api/admin) |
|  - Server Session Authorization (verifyAdminAuthorization)                      |
+---------------------------------------------------------------------------------+
                         /               |               \
                        v                v                v
+----------------------------+  +------------------+  +--------------------------+
|      DATA LAYER            |  |  LOGISTICS LAYER |  |      PAYMENTS LAYER      |
|  - Supabase PostgreSQL     |  |  - Delhivery API |  |  - Razorpay Gateway API  |
|  - RLS Policies & Indexes  |  |  - PIN Validator |  |  - Indian Paise Math     |
|  - In-Memory Fallback      |  |  - AWB Generator |  |  - HMAC-SHA256 Signatures|
|  - Movement Audit Ledger   |  |  - Tracking Hub  |  |  - Cash on Delivery (COD)|
+----------------------------+  +------------------+  +--------------------------+
                                         |
                                         v
                               +-------------------+
                               |  MESSAGING LAYER  |
                               |  - Email Outbox   |
                               |  - Resend API     |
                               +-------------------+
```

---

## 3. Core Modules & Important File Paths

### 3.1 Domain Types & Data Contracts
- [`src/types/index.ts`](file:///d:/Ansh/Ecommmerceee/src/types/index.ts): Defines authoritative domain types including `Product`, `ProductVariant`, `InventoryRecord`, `InventoryMovement`, `Order`, `Shipment`, `ReturnRequest`, `AffiliateProduct`, and `AuditLog`.

### 3.2 Unified Database & Repository Service
- [`src/lib/db/index.ts`](file:///d:/Ansh/Ecommmerceee/src/lib/db/index.ts): Centralized data access abstraction (`db`) providing:
  - `db.products`: Catalog querying and variant resolution.
  - `db.inventory`: Stock reservation (`reserveStock`), release (`releaseStock`), manual adjustments (`adjustStock`), and threshold monitoring (`getLowStock`).
  - `db.orders`: Atomic order creation (`create`), cancellation (`cancel`), and status updates (`updateStatus`).
  - `db.shipments`: Delhivery waybill allocation and parcel tracking (`createForOrder`).
  - `db.returns`: Return initiation (`create`) and physical inspection restock (`inspectAndRestock`).
  - `db.affiliate`: Staging queue management (`getQueue`, `updateReview`, `syncSources`).
  - `db.audit`: Querying of audit logs, cron job telemetry, and email outbox records.

### 3.3 Authorization & Security
- [`src/lib/auth/admin.ts`](file:///d:/Ansh/Ecommmerceee/src/lib/auth/admin.ts): Validates administrative identity by evaluating:
  1. `x-lumiere-admin-email` request header (development sandbox).
  2. Active Supabase SSR session against configured `ADMIN_EMAIL`.
  3. User role in PostgreSQL `public.profiles` (`admin` or `super_admin`).

### 3.4 External Service Adapters
- [`src/lib/services/delhivery.ts`](file:///d:/Ansh/Ecommmerceee/src/lib/services/delhivery.ts): Pincode serviceability checking, AWB allocation, tracking timeline formatting, and fallback sandbox generator.
- [`src/lib/services/razorpay.ts`](file:///d:/Ansh/Ecommmerceee/src/lib/services/razorpay.ts): INR to paise conversion ($₹1 = 100 \text{ paise}$), Razorpay order creation, and HMAC-SHA256 signature verification.
- [`src/lib/services/email.ts`](file:///d:/Ansh/Ecommmerceee/src/lib/services/email.ts): Branded HTML template compilation and transactional email dispatch via Resend API.

---

## 4. Verified Data Flows

### 4.1 Inventory Lifecycle & Concurrency Safeguards

```
[Physical Warehouse Intake]
           |
           v
   [Physical Stock]
           |
           | Customer initiates checkout (15-min hold)
           v
   [Reserved Stock] --------(Timeout / Abandonment)------> [Released to Available]
           |
           | Order verified & captured
           v
   [Sale Deduction]
(Physical -= qty, Reserved -= qty)
           |
           +----(Order Cancelled)-----> [Cancellation Auto-Restore]
           |
           +----(Return Requested)----> [In-Transit Hub Delivery]
                                                 |
                                                 | (Physical Inspection Passed)
                                                 v
                                        [Return Restock]
```

- **Stock Reservation**:
  - Available stock is calculated as $\text{available} = \max(0, \text{physical} - \text{reserved})$.
  - Reservations persist for 15 minutes (`expires_at = now + 15m`).
  - Concurrent requests check available stock atomically, preventing overselling.
- **Return Restock Restriction**:
  - Submitting a return request sets status to `requested` and does **not** modify inventory.
  - Inventory is restored only when warehouse staff invoke `db.returns.inspectAndRestock` with condition verification notes.

### 4.2 Indian Checkout & Order Creation Flow

1. **Validation**: Client sends cart items, shipping address (including 6-digit Indian PIN code), and payment method to `POST /api/checkout/create-order`.
2. **Authoritative Calculation**:
   - Server reads variant pricing directly from the database.
   - Calculates shipping fee: Free for orders $\ge ₹2,999$; otherwise $₹150$.
   - Computes 12% GST allocation ($0.12 \times \text{subtotal}$).
3. **Atomic Stock Deduction**:
   - Verifies available stock or converts active reservations.
   - Deducts physical inventory and records a `sale_deduction` movement.
4. **Payment Gateway Order**:
   - For UPI/Card: Calls `PaymentService.createGatewayOrder` with amount converted to paise. Order remains in `order_status = 'processing'`.
   - For COD: Order is marked `order_status = 'confirmed'`, `payment_status = 'pending'`.
5. **Outbox Notification**:
   - Transactional email record is pushed to `email_outbox` for reliable delivery.

### 4.3 Delhivery Logistics Flow

1. **Serviceability**: Client calls `POST /api/delhivery/check-pincode` with a 6-digit PIN code.
   - Metro regions (Mumbai, Delhi, Bengaluru) return 2–3 days estimated delivery and COD eligibility.
   - Invalid formats (non-6 digit, starting with 0) are rejected immediately.
2. **Fulfillment**: Order dispatch in `/admin/shipments` calls `DelhiveryService.createShipment`.
   - Generates unique waybill `DEL-AWB-...`.
   - Transitions order status to `shipped`.
   - Sends tracking notification email.

---

## 5. Security & Isolation Model

- **Zero Client-Side Trust**: Client applications have no ability to specify or alter product prices, discount amounts, or shipping charges.
- **Row-Level Security (RLS)**: Enforced via PostgreSQL policies in `supabase/migrations/001_initial_schema.sql` ensuring patrons can only query their own orders and profile records.
- **Audit Logging**: All administrative operations (inventory adjustments, returns processing, order cancellations, affiliate updates) generate immutable records in `public.audit_logs`.
