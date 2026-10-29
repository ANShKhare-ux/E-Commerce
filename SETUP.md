# LUMIÈRE — Setup & Configuration Guide

This guide details the end-to-end setup of LUMIÈRE on your local development machine or production cloud environment.

---

## 1. Prerequisites

- **Node.js**: Version `18.18.0` or higher (Node 20+ recommended).
- **Package Manager**: `npm` (bundled with Node) or `pnpm`.
- **Git**: Installed and configured.
- **Supabase Account**: A free or Pro project on [supabase.com](https://supabase.com).

---

## 2. Local Environment Setup

1. **Clone or open the repository**:
   ```bash
   cd c:\Users\Taraksh jain\OneDrive\Documents\E-commerce\E-Commerce
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file by copying `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

---

## 3. Supabase Database & Migrations

1. Log into your Supabase Dashboard and navigate to the **SQL Editor**.
2. Run the migrations in sequential order:
   - Run [`supabase/migrations/001_initial_schema.sql`](file:///c:/Users/Taraksh%20jain/OneDrive/Documents/E-commerce/E-Commerce/supabase/migrations/001_initial_schema.sql):
     - Sets up all 20+ tables (products, variants, inventory, orders, shipments, audit logs).
     - Configures Row-Level Security (RLS) policies.
     - Adds indexes and concurrency constraints.
   - Run [`supabase/migrations/002_seed_data.sql`](file:///c:/Users/Taraksh%20jain/OneDrive/Documents/E-commerce/E-Commerce/supabase/migrations/002_seed_data.sql):
     - Inserts core categories (Ethnic Wear, Women's, Men's, Streetwear, Luxury).
     - Inserts curated collections (Royal Heritage, Monsoon Minimalism, District Zero).
     - Inserts affiliate partner sources (Tata CLiQ Luxury, Ajio Luxe, Myntra Luxe).
3. Copy your project credentials into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-secret-key>
   ```

---

## 4. Establishing the Initial Administrator

The platform establishes the initial Super Administrator through a secure server-side configuration using `ADMIN_EMAIL`:

1. Set your authorized administrator email in `.env.local`:
   ```env
   ADMIN_EMAIL=your.official.email@lumiere.in
   ```
2. When this user authenticates via Supabase, the server grants SuperAdmin permissions automatically.
3. Access the private admin panel at `http://localhost:3000/admin`.
4. In local development sandbox mode, you can also pass the dev test header `x-lumiere-admin-email: <your-email>` for testing API endpoints.

---

## 5. Indian Payment Gateway (Razorpay UPI / Cards)

LUMIÈRE includes a complete sandbox mode for payments that requires zero credentials to test.

To connect live or test keys:
1. Sign up on [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Generate API Keys in **Settings → API Keys**.
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=your_secret_key
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```
4. Configure your Webhook URL in Razorpay Dashboard:
   - Endpoint: `https://your-domain.com/api/checkout/verify-payment`
   - Events: `payment.captured`, `order.paid`.

---

## 6. Delhivery Logistics Integration

1. Register on [Delhivery B2C Courier Services](https://www.delhivery.com).
2. In your Delhivery account, retrieve your Client Name, API Token, and registered Warehouse Pickup Hub.
3. Add credentials to `.env.local`:
   ```env
   DELHIVERY_API_TOKEN=your_token
   DELHIVERY_CLIENT_NAME=LUMIERE_RETAIL
   DELHIVERY_WAREHOUSE_NAME=LUMIERE_MUMBAI_HUB
   DELHIVERY_IS_PRODUCTION=false # Set to true for live shipments
   ```
4. If credentials are unset, the integration operates in sandbox simulation mode, generating compliant waybills (`DEL-AWB-XXXXXXXX`) and mock transit events for testing.

---

## 7. Transactional Emails (Resend)

1. Create a free account at [resend.com](https://resend.com).
2. Verify your sending domain (e.g. `lumiere.in`) or use `onboarding@resend.dev` for testing.
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_...
   EMAIL_FROM="LUMIÈRE Concierge <concierge@lumiere.in>"
   ```
4. When unconfigured, emails are stored in `dbStore.emailOutbox` and printed to console, ensuring customer orders are never blocked.

---

## 8. Background Automations & Cron Jobs

Protect all scheduled jobs with `CRON_SECRET`:
```env
CRON_SECRET=your_random_secret_string
```
Configure your scheduler (Vercel Cron, GitHub Actions, or Linux cron) to hit:
- `/api/cron/cleanup-reservations` (Every 5 minutes) — Releases expired 15-minute checkout holds.
- `/api/cron/check-low-stock` (Every morning) — Sweeps variants below threshold and alerts admin.
- `/api/cron/sync-affiliates` (Every 6 hours) — Syncs affiliate pricing and flags out-of-stock items.

Pass the header:
```
Authorization: Bearer <CRON_SECRET>
```

---

## 9. Verification & Running Tests

Run the test suite:
```bash
npm test
```
Verify build compilation:
```bash
npm run build
```
Start the local server:
```bash
npm run dev
```
Navigate to:
- Storefront: `http://localhost:3000`
- Admin Control Room: `http://localhost:3000/admin`

