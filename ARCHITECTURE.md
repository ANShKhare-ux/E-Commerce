# LUMIÈRE — System Architecture & Technical Design Document

## 1. High-Level Architecture Overview

LUMIÈRE is built on a modern, decoupled cloud architecture designed for high availability, low latency across the Indian subcontinent, and strict financial/inventory consistency.

```
                  +----------------------------------------------+
                  |           LUMIÈRE CLIENT BROWSERS            |
                  |     (Desktop, Mobile, Tablet Responsive)     |
                  +----------------------------------------------+
                                         |
                                         v
                  +----------------------------------------------+
                  |         NEXT.JS 15 APP ROUTER RUNTIME        |
                  |                                              |
                  |  [SSR & ISR Storefront]   [Server Actions]  |
                  |  [Static Route Bundles]   [API Route Handlers]|
                  |  [Private Admin Portal]   [Auth Middleware]  |
                  +----------------------------------------------+
                         /         |            |         \
                        /          |            |          \
                       v           v            v           v
           +--------------+ +------------+ +---------+ +-----------+
           |   SUPABASE   | |  RAZORPAY  | |DELHIVERY| |  RESEND   |
           |  POSTGRESQL  | |  UPI / NET | | LOGISTICS| |TRANSACT. |
           |  (RLS & DB)  | |  GATEWAY   | | EXPRESS | |   EMAIL   |
           +--------------+ +------------+ +---------+ +-----------+
```

---

## 2. Automatic Inventory State Machine & Concurrency Control

Inventory overselling is one of the most severe risks in fashion retail drops. LUMIÈRE models variant inventory using a strict three-pool accounting model:

$$\text{Available Stock} = \max(0, \text{Physical Sellable Stock} - \text{Reserved Stock})$$

### The Inventory Lifecycle
```
[Physical Warehouse Arrival]
             |
             v
      [Physical Stock]
             |
             | Customer enters checkout (15-min reservation hold)
             v
      [Reserved Stock] --------(Timeout expired / Abandoned)-----> [Released to Available]
             |
             | Order verified & captured
             v
    [Sale Deduction]
(Physical - qty, Reserved - qty)
             |
             +----(Customer cancels order)-----> [Cancellation Auto-Restore]
             |
             +----(Customer returns item)------> [Pending Hub Delivery]
                                                          |
                                                          | (Physical Inspection Verified)
                                                          v
                                                 [Return Restock]
```

### Guarantees
1. **Atomic Reservations**: When a customer advances to checkout, `db.inventory.reserveStock()` reserves stock with an expiration timestamp (`expires_at = now + 15 mins`). Concurrent requests for the same SKU check `available_stock` atomically.
2. **Double-Checked Concurrency**: When `db.orders.create()` executes, it validates available stock again or consumes valid reservation IDs.
3. **No Uninspected Restocks**: Returned merchandise is never returned to sellable inventory automatically. Items enter `received_and_inspected` status only after warehouse personnel sign off on garment condition with audit notes.

---

## 3. Indian Payments & Verification Engine

LUMIÈRE supports UPI (Google Pay, PhonePe, Paytm, BHIM) and Credit/Debit cards via an Indian Payment Gateway (Razorpay), in addition to Cash on Delivery (COD).

### UPI & Online Payment Workflow
1. Client initiates checkout. The server verifies order items, checks prices from authoritative database records (protecting against client tampering), and requests a Gateway Order ID in Indian Paise ($₹1 = 100 \text{ paise}$).
2. The customer completes the UPI transaction.
3. Upon completion, the server cryptographically validates the signature:
   $$\text{HMAC-SHA256}(\text{order\_id} + "|" + \text{payment\_id}, \text{secret})$$
4. Only upon signature verification is the order transitioned to `processing` and payment status to `captured`.

### Cash on Delivery (COD) Workflow
1. COD orders are captured in a distinct state: `order_status = 'confirmed'`, `payment_status = 'pending'`.
2. COD orders are never recorded as paid until physical cash or courier UPI collection is verified at delivery.
3. COD orders generate a dedicated acknowledgment email and audit entry.

---

## 4. Delhivery Logistics Integration

Domestic logistics in India is managed through official Delhivery Express API adapters:
- **Pincode Serviceability Validation**: Verifies 6-digit Indian PIN codes, returning transit SLAs (e.g. 2–3 days for Tier 1 metros like Mumbai/Delhi/Bengaluru; 4–6 days for regional locations), cash-on-delivery eligibility, and pre-paid courier routing.
- **Shipment Manifestation & AWB Waybill Allocation**: Generates unique waybill numbers (`DEL-AWB-XXXXXXXX`), package dimensions, and physical weight calculations for accurate freight billing.
- **Tracking Identifiers**: Storefront tracking portal allows customers to trace parcels from pickup at LUMIÈRE Mumbai Central Hub to delivery.
- **Reverse Logistics**: When returns are approved, reverse pickup waybills are generated for Delhivery courier pickup.

---

## 5. Affiliate Integration Framework

LUMIÈRE combines self-stocked atelier collections with external luxury fashion discoveries (e.g., Tata CLiQ Luxury, Ajio Luxe, Myntra Luxe):

1. **Ingestion & Staging Queue**: Inbound partner feeds enter a private administrative review queue (`review_status = 'pending'`, `is_published = false`).
2. **Administrative Approval**: Store managers inspect imagery, verify authentic discounts, approve or adjust descriptions, and publish items.
3. **External Retailer Handoff**: Affiliate product pages prominently feature clear affiliate disclosures, redirecting patrons to the partner site via tagged affiliate tracking URLs. Affiliate clicks are tracked independently and never recorded as LUMIÈRE orders.
4. **Stale Information & Broken Link Sweeper**: Scheduled automation sweeps partner availability. When an affiliate item goes out of stock, it is automatically unlisted to prevent patron disappointment.

---

## 6. Security, Authorization & Data Isolation

- **Role-Based Access Control (RBAC)**: Only accounts authenticated via Supabase Auth whose email matches `ADMIN_EMAIL` or possessing verified `admin` / `super_admin` profile roles can execute administrative mutations.
- **Row-Level Security (RLS)**: Enforced across all PostgreSQL tables. Customers can only read and query their own profile, cart, and orders.
- **Zero Client-Side Price Manipulation**: Cart totals, shipping fees (free shipping above ₹2,999; ₹150 standard fee), and 12% GST allocations are calculated authoritatively on the server.
- **Audit Logging**: Every administrative action (stock adjustments, return restocks, order status overrides, policy changes) is committed to `public.audit_logs`.

---

## 7. Transactional Email Outbox Pattern

To ensure email deliveries survive network interruptions:
- Application events (order confirmation, courier dispatch, refund issuance) write messages to an transactional outbox (`public.email_outbox`).
- Dispatches are processed via Resend API.
- If credentials are temporarily missing or the provider encounters a transient 5xx error, emails remain queued in the outbox for retry without blocking customer checkouts.

