# LUMIÈRE — Production-Readiness & Launch Checklist

Before launching LUMIÈRE to live customers in the Indian market, review and sign off on each item in this checklist.

---

## 1. Security & Access Control

- [ ] **Row-Level Security (RLS)**: Verified active on all tables in Supabase. Non-admin users cannot read other patrons' orders, carts, or profile addresses.
- [ ] **Administrator Identity**: `ADMIN_EMAIL` environment variable configured with the official owner/superadmin email. Non-admin accounts cannot grant themselves permissions.
- [ ] **Privileged Keys Isolated**: Ensure `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`, and `CRON_SECRET` are never referenced in client-side components (`use client` or `NEXT_PUBLIC_*`).
- [ ] **Cron Protection**: `CRON_SECRET` set to a strong random token (> 32 characters) on production hosting platform (Vercel / Cloudflare).
- [ ] **Input Sanitization**: Client address inputs, phone numbers (10 digits), and PIN codes (6 digits) validated on both client and server before database write.

---

## 2. Payments (Razorpay & Cash on Delivery)

- [ ] **KYC & Account Activation**: Razorpay live merchant account activated with verified Indian bank account and GSTIN (`27AABCL9841K1Z3`).
- [ ] **Live Keys Deployed**: Replace test keys with production credentials:
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...`
  - `RAZORPAY_KEY_SECRET=...`
- [ ] **Webhook Verification**: Webhook secret configured and verified in production to ensure idempotency against duplicate delivery attempts.
- [ ] **Live End-to-End Test**: Execute a real ₹100 UPI payment in production, confirm order transitions to `processing`, and verify payment status transitions to `captured`.
- [ ] **COD Thresholds**: Confirm COD parameters in `/admin/policies`. Verify COD orders stay in `pending` payment status until collected.

---

## 3. Logistics & Fulfillment (Delhivery)

- [ ] **Contract & SLA Signed**: Commercial Delhivery B2C contract finalized for pan-India pickup from Mumbai Central Hub.
- [ ] **Production Credentials**:
  - `DELHIVERY_API_TOKEN` set to production token.
  - `DELHIVERY_IS_PRODUCTION=true`.
  - Registered pickup location matches `DELHIVERY_WAREHOUSE_NAME`.
- [ ] **Thermal Waybill Printing**: Admin label generation tested with warehouse thermal barcode printers (4x6 inch format).
- [ ] **Reverse Logistics**: Confirm Delhivery reverse pickup workflow is active for 7-day customer return requests.

---

## 4. Transactional Email & Notifications (Resend)

- [ ] **Domain Verification**: `lumiere.in` DNS records updated with DKIM, SPF, and DMARC TXT records.
- [ ] **Sender Address**: Production `EMAIL_FROM="LUMIÈRE Concierge <concierge@lumiere.in>"` active and verified.
- [ ] **Template Review**: Test dispatch of Order Confirmation, COD Verification, and Delhivery Dispatch emails to Gmail, Apple Mail, and Outlook.

---

## 5. Affiliate Program & Legal Transparency

- [ ] **Partner Feeds**: Verify API keys and affiliate affiliate tracking links for Tata CLiQ Luxury, Ajio Luxe, and Myntra Luxe.
- [ ] **Disclosure Statement**: Confirm [`/affiliate-disclosure`](file:///c:/Users/Taraksh%20jain/OneDrive/Documents/E-commerce/E-Commerce/src/app/affiliate-disclosure/page.tsx) is prominently visible and adheres to ASCI (Advertising Standards Council of India) influencer and publisher guidelines.
- [ ] **Stale Listings Sweeper**: Verify cron runs every 6 hours to detect unlisted external items and pause them automatically.

---

## 6. Inventory & Physical Warehouse Reconciliation

- [ ] **Physical Audit**: Physical inventory counted and entered into `/admin/inventory` via verified CSV import or manual intake.
- [ ] **Low-Stock Alerting**: Thresholds configured (default: 3 units for luxury pieces, 5 for everyday wear).
- [ ] **Reservation Sweeper**: 5-minute cleanup cron operational to release abandoned checkout reservations back into sellable pool.

---

## 7. Performance & SEO

- [ ] **Build Validation**: Production build completes with zero errors (`npm run build`).
- [ ] **Test Coverage**: All 24 unit and integration tests pass (`npm test`).
- [ ] **Image Optimization**: Product imagery served via Next.js `<Image>` with responsive `sizes` attributes and WebP/AVIF formats.
- [ ] **Robots & Sitemap**: `sitemap.xml` and `robots.txt` configured with production canonical URL (`https://lumiere.in`).

---

## 8. Backup, Monitoring & Incident Management

- [ ] **Database PITR**: Point-in-time recovery enabled on Supabase PostgreSQL.
- [ ] **Application Monitoring**: Sentry or Cloudflare telemetry configured for real-time unhandled exception alerts.
- [ ] **Rollback Plan**: Previous stable deployment artifact tagged in Git for immediate one-click rollback if critical issues occur during a major product drop.

