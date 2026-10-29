# LUMIÈRE — Developer Guide & Setup Workflow

---

## 1. Prerequisites

Before setting up the project locally, ensure the following are installed:
- **Node.js**: Version `18.18.0` or higher (Node `v20.x` or `v22.x` recommended).
- **Package Manager**: `npm` (bundled with Node) or `pnpm`.
- **Git**: Installed and configured.
- **Operating System**: Windows (PowerShell), macOS, or Linux.

---

## 2. Windows Environment Notice (PowerShell Execution Policy)

On Windows machines where PowerShell script execution is restricted by policy, commands such as `npm test` or `npx tsc` may fail with:
```
npm : File C:\Users\...\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

**Resolution**: Always execute using the `.cmd` wrapper:
- Use `npm.cmd <script>` instead of `npm <script>`.
- Use `npx.cmd <command>` instead of `npx <command>`.

---

## 3. Local Setup & Installation

### 3.1 Install Dependencies
```bash
# Enter repository root
cd Ecommmerceee

# Install package dependencies
npm.cmd install
```

### 3.2 Configure Environment Variables
Copy `.env.example` to create `.env.local`:
```bash
# On Windows PowerShell
Copy-Item .env.example .env.local

# On bash / macOS / Linux
cp .env.example .env.local
```

### 3.3 Key Environment Variables
Edit `.env.local` to configure your environment:
- `ADMIN_EMAIL`: Email address of the primary Super Administrator (e.g. `owner@lumiere.in`).
- `NEXT_PUBLIC_APP_URL`: Set to `http://localhost:3000` for local development.
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Credentials from your Supabase project dashboard.
- `SUPABASE_SERVICE_ROLE_KEY`: Server-only secret key for administrative automation.
- `CRON_SECRET`: Secret token used in `Authorization: Bearer <CRON_SECRET>` for cron API routes.
- Optional service keys (`RAZORPAY_*`, `DELHIVERY_*`, `RESEND_*`): When left blank or containing placeholder values, the application automatically engages sandbox simulation mode.

---

## 4. Available Scripts & Verification Commands

| Command | Description | Verified Status |
|---|---|---|
| `npm.cmd run dev` | Starts the Next.js development server on `http://localhost:3000` | Working |
| `npm.cmd run build` | Compiles optimized Next.js production bundle (40 routes) | Working (Clean build) |
| `npm.cmd start` | Starts the production server using the built artifact | Working |
| `npm.cmd test` | Executes the Vitest test suite (9 test suites, 27 tests) | Working (27/27 passing) |
| `npx.cmd tsc --noEmit` | Runs TypeScript compiler in type-check only mode | Working (0 errors) |
| `npm.cmd run lint` | Runs Next.js linter (`next lint`) | Prompts interactively (ESLint unconfigured) |

---

## 5. Development Workflow & Access Points

### 5.1 Storefront Portal
Start the development server:
```bash
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Catalog Policy**: The live storefront catalog begins strictly empty (`INITIAL_PRODUCTS = []`) to prevent displaying fake inventory to patrons.
- **Adding Items**: Populate products via the Private Admin Control Room or import via the Affiliate Review Queue.

### 5.2 Private Admin Control Room
Access the admin portal at [http://localhost:3000/admin](http://localhost:3000/admin).
- **Authentication**:
  1. If Supabase Auth is active, log in with an account matching `ADMIN_EMAIL` or having `admin`/`super_admin` role in `profiles`.
  2. For API and testing workflows, pass the development header:
     ```http
     x-lumiere-admin-email: owner@lumiere.in
     ```

### 5.3 Database Setup (Supabase PostgreSQL)
To connect a live Supabase database:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Run the migrations in order:
   - [`supabase/migrations/001_initial_schema.sql`](file:///d:/Ansh/Ecommmerceee/supabase/migrations/001_initial_schema.sql): Sets up tables, RLS policies, triggers, and indexes.
   - [`supabase/migrations/002_seed_data.sql`](file:///d:/Ansh/Ecommmerceee/supabase/migrations/002_seed_data.sql): Seeds initial categories, collections, and affiliate partner sources.
4. Update `NEXT_PUBLIC_SUPABASE_URL` and keys in `.env.local`.

---

## 6. Testing Strategy & Test Suites

The test suite is powered by **Vitest 3.0** with TypeScript path resolution.

### 6.1 Running Tests
```bash
# Run all tests once
npm.cmd test

# Run tests in watch mode
npx.cmd vitest

# Run a specific test suite
npx.cmd vitest run tests/inventory.test.ts
```

### 6.2 Test Suites Overview
| Suite | Focus Area |
|---|---|
| [`tests/inventory.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/inventory.test.ts) | 15-min reservation holds, oversell prevention, expired holds cleanup, manual adjustments with mandatory reasons, low-stock threshold triggers. |
| [`tests/checkout.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/checkout.test.ts) | Atomic sale deductions, Cash on Delivery (COD) pending states, cancellation stock restoration, two-stage return inspection restock. |
| [`tests/concurrency_webhooks.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/concurrency_webhooks.test.ts) | Oversell prevention under concurrent checkouts, order idempotency keys, duplicate webhook deduplication. |
| [`tests/security_auth.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/security_auth.test.ts) | Prevention of client-side price tampering, customer data isolation, admin RBAC enforcement. |
| [`tests/payments.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/payments.test.ts) | INR to paise conversion, authentic HMAC-SHA256 signature verification, rejection of tampered signatures. |
| [`tests/delhivery.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/delhivery.test.ts) | Indian 6-digit PIN validation, metro transit SLA calculation, AWB tracking parsing. |
| [`tests/affiliate.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/affiliate.test.ts) | Inbound review queue staging, approval/rejection mutations, out-of-stock feed sync. |
| [`tests/email.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/email.test.ts) | Transactional email generation, order confirmation and dispatch templates, resilient outbox queuing. |
| [`tests/e2e_lifecycle.test.ts`](file:///d:/Ansh/Ecommmerceee/tests/e2e_lifecycle.test.ts) | End-to-end customer journey from catalog discovery, size variant selection, reservation hold, order capture, and courier dispatch. |

### 6.3 Writing New Tests
- Always import test functions from `vitest`:
  ```ts
  import { describe, it, expect, beforeEach } from "vitest";
  import { db } from "@/lib/db";
  ```
- Reset database state in `beforeEach(() => { db.reset(); })` to guarantee test isolation.
- Test fixtures load automatically in `db.reset()` when `isTestRunner` is true.

---

## 7. Known Issues & Notes

1. **ESLint Migration**: Next.js 15 deprecates `next lint` in favor of the ESLint CLI. Creating a flat `eslint.config.mjs` will resolve interactive CLI prompts.
2. **Git Working Tree**: Note that `package-lock.json` contains platform-optional dependency edits resulting from `npm install` on Windows. Do not reset or commit unrelated changes to this file.
