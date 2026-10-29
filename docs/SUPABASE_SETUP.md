# LUMIÈRE — Supabase Authentication & PostgreSQL Database Integration Guide

This authoritative guide explains how to connect, configure, and operate **Supabase Authentication, PostgreSQL Database, and Row Level Security (RLS)** for LUMIÈRE in both local development and production environments.

---

## 1. Create a Supabase Project

1. Navigate to [Supabase Dashboard](https://supabase.com/dashboard) and sign in.
2. Click **New Project**.
3. Select your organization and configure:
   - **Name**: `lumiere-store`
   - **Database Password**: Choose a strong master password (store it securely in your password manager).
   - **Region**: Select **South Asia (Mumbai) — ap-south-1** for the fastest low-latency database queries in the Indian market.
   - **Pricing Plan**: Free (or Pro for high concurrency).
4. Click **Create new project** and allow ~2 minutes for PostgreSQL provisioning.

---

## 2. Retrieve Your API Credentials

In the Supabase Dashboard, navigate to **Project Settings → API**:

1. **Project URL**:
   Copy the URL under `Project URL` (e.g., `https://abcdefghijklm.supabase.co`).
2. **Publishable Key (`anon` / `public`)**:
   Copy the `anon` public key under `Project API keys`.
3. **Secret Service Role Key (`service_role`)**:
   Click `Reveal secret key` and copy `service_role`.
   > [!CAUTION]
   > The `service_role` key bypasses Row Level Security. Never expose it in client-side code (`use client` components) or commit it to Git.

---

## 3. Configure Local Environment Variables

Create or update your local `.env.local` file in the project root:

```env
# -----------------------------------------------------------------------------
# APPLICATION BASE URL
# -----------------------------------------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000

# -----------------------------------------------------------------------------
# SUPABASE POSTGRESQL & AUTHENTICATION
# -----------------------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_public_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_secret_key

# -----------------------------------------------------------------------------
# INITIAL STORE OWNER / ADMINISTRATOR
# Must match your real admin email in Supabase
# -----------------------------------------------------------------------------
ADMIN_EMAIL=your.real.email@example.com

# -----------------------------------------------------------------------------
# INDIAN PAYMENT GATEWAYS (PhonePe & Google Pay / GPay UPI)
# -----------------------------------------------------------------------------
PHONEPE_MERCHANT_ID=MERCHANTUAT
PHONEPE_SALT_KEY=sample_salt_key_placeholder
PHONEPE_SALT_INDEX=1
PHONEPE_ENV=UAT
GPAY_MERCHANT_ID=your_gpay_merchant_id
GPAY_MERCHANT_UPI_VPA=lumiere@okhdfcbank
GPAY_SECRET_KEY=your_gpay_secret_key
```

---

## 4. Apply Database Migrations & Schemas

In the Supabase Dashboard, open the **SQL Editor** from the left sidebar.

Run the migrations in sequential order:

### Step 4.1: Initial Schema (`001_initial_schema.sql`)
1. In the workspace, open `supabase/migrations/001_initial_schema.sql`.
2. Copy the entire file content.
3. Paste into the Supabase SQL Editor and click **Run**.
4. This creates:
   - 27 tables (`profiles`, `addresses`, `categories`, `collections`, `products`, `product_variants`, `inventory`, `orders`, `order_items`, `payments`, `shipments`, `returns`, `wishlists`, `audit_logs`, etc.).
   - Database functions (`reserve_stock`, `release_stock`, `inspect_and_restock_return`, `is_admin`).
   - Row Level Security (RLS) enabled across every table.

### Step 4.2: Seed Reference Data (`002_seed_data.sql`)
1. Open `supabase/migrations/002_seed_data.sql`.
2. Copy and paste into the SQL Editor and click **Run**.
3. This populates foundational luxury categories (Women's Handloom, Men's Couture, Banarasi Heritage, Streetwear) and affiliate sources.

### Step 4.3: Auth Triggers & Role Boundaries (`003_auth_triggers_and_roles.sql`)
1. Open `supabase/migrations/003_auth_triggers_and_roles.sql`.
2. Copy and paste into the SQL Editor and click **Run**.
3. This establishes:
   - `public.handle_new_user()` trigger: Automatically creates a `public.profiles` row whenever a customer registers, hardcoding `role = 'customer'`.
   - Role protection: Customers are strictly prohibited by RLS from altering their own `role` field.
   - Unique constraints on wishlists `(user_id, product_id)`.

---

## 5. Configure Allowed URLs & Authentication Callbacks

In the Supabase Dashboard, navigate to **Authentication → URL Configuration**:

1. **Site URL**:
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`
2. **Redirect URLs** (Add each of the following):
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/reset-password`
   - `http://localhost:3000/account`
   - `https://your-domain.com/auth/callback`
   - `https://your-domain.com/reset-password`
   - `https://your-domain.com/account`
3. Click **Save**.

---

## 6. Configure Email Verification & Templates

In **Authentication → Email Templates**:

1. **Confirm signup**:
   - Ensure the confirmation link points to `{{ .SiteURL }}/auth/callback?next=/account`.
2. **Reset password**:
   - Ensure the reset password link points to `{{ .SiteURL }}/auth/callback?next=/reset-password`.
3. If testing in development and you wish to disable mandatory email confirmations:
   - Navigate to **Authentication → Providers → Email**.
   - Toggle **Confirm email** on or off according to your workflow.

---

## 7. Secure Administrator Bootstrap Procedure

Public registration never grants administrative rights. To establish the primary store owner:

1. **Create Account**: Go to `http://localhost:3000/signup` and register with your administrative email (e.g. `owner@lumiere.in`).
2. **Assign Super Admin Role**:
   In the Supabase SQL Editor, run:
   ```sql
   UPDATE public.profiles
   SET role = 'super_admin'
   WHERE email = 'owner@lumiere.in';
   ```
3. **Verify Authorization**:
   - Visit `http://localhost:3000/admin`.
   - If not signed in, you will be redirected to `/admin/login`.
   - Sign in with `owner@lumiere.in`.
   - You now have full access to the Private Control Room.

---

## 8. Verification & Security Testing Scenarios

| Test Scenario | Expected Result | Enforced By |
|---|---|---|
| Unauthenticated user opens `/account` | Redirected to `/login?redirect=/account` | `middleware.ts` & Server Component |
| Unauthenticated user opens `/admin` | Redirected to `/admin/login` | `middleware.ts` & `AdminLayout` |
| Authenticated customer opens `/admin` | Redirected to `/admin/login` with Forbidden status | `verifyAdminAuthorization()` |
| Customer tries to read another patron's orders | Returns 0 rows / access denied | Supabase RLS Policy on `orders` |
| Customer tries to update their profile role to `super_admin` | Database rejects modification | Supabase RLS Policy on `profiles` |
| Customer signs up | `handle_new_user()` creates profile with `role='customer'` | PostgreSQL Database Trigger |
| Password reset requested | Dispatches email without leaking account existence | `/api/forgot-password` flow |

---

## 9. Production Launch Checklist

- [ ] Supabase project upgraded to Pro plan with automated daily backups.
- [ ] Production domain added to Supabase Allowed Redirect URLs.
- [ ] SMTP service (Resend / AWS SES) configured in Supabase Auth to ensure 100% deliverability of OTPs and verification emails.
- [ ] `ADMIN_EMAIL` configured in hosting platform (Vercel / Cloudflare).
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added only as server environment variable.

