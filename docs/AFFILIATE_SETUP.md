# Affiliate Integration & Merchant Setup Guide

## 1. Affiliate Business Model
LUMIÈRE generates revenue through approved fashion affiliate marketing programs. When users discover clothing on our website and click "Shop Now at [Merchant]", they are redirected to the merchant's official storefront with an attributed tracking link.

### Operating Principles:
- **No Direct Inventory:** LUMIÈRE never sells or ships products directly.
- **Retailer Authority:** Product pricing, sizing availability, delivery fees, and returns are strictly governed by the destination merchant.
- **Clear Disclosures:** Users are continuously reminded across product pages, hero headers, footer links, and the dedicated Affiliate Disclosure page that LUMIÈRE may earn a commission upon qualifying purchases.

---

## 2. Onboarding a New Merchant
To onboard a new retail partner (e.g., Myntra, Ajio, Tata CLiQ):

1. **Verify Affiliate Program Approval:**
   Obtain official approval from the merchant's affiliate network (e.g., Involve Asia, vCommission, Cuelinks, Amazon Associates, or direct merchant affiliate programs).
2. **Add Domain to Allowlist:**
   In `.env` or production environment variables, append the primary domain to `AFFILIATE_ALLOWED_DOMAINS`:
   ```bash
   AFFILIATE_ALLOWED_DOMAINS="myntra.com,ajio.com,amazon.in,tatacliq.com,nykaafashion.com,newmerchant.com"
   ```
3. **Register Merchant Entity in Code:**
   In `src/data/merchants.ts`, define the merchant metadata:
   ```typescript
   export const MERCHANTS: Record<string, Merchant> = {
     newmerchant: {
       id: 'newmerchant',
       name: 'New Merchant India',
       slug: 'new-merchant',
       websiteUrl: 'https://www.newmerchant.com',
       affiliateProgramName: 'Direct Partner Program',
       status: 'active',
       trustBadge: 'Verified Retailer'
     }
   };
   ```

---

## 3. Product Affiliate Link Configuration
Each product record in `src/data/products.ts` requires:
- `merchantId`: Matching an active merchant ID.
- `productUrl`: Canonical direct URL to the product.
- `affiliateUrl`: Full destination URL containing the appropriate affiliate tracking parameter (e.g. `tag=`, `affId=`, `subId=`).
- `lastPriceVerifiedAt`: Timestamp indicating when the price was verified.

### Security Validation
Before redirecting a user:
1. Destination is checked by `validateAffiliateUrl(url)` in `@/lib/affiliate.ts`.
2. Must use `https:` or `http:`.
3. Hostname must end with an approved domain name.
4. Any attempt to pass an unverified external URL is rejected with HTTP 400 Bad Request.

---

## 4. Product Image Rights & Licensing
- Product photographs must either:
  - Be provided through authorized merchant affiliate asset feeds with permission to display.
  - Be licensed high-resolution editorial fashion stock photography (e.g. Unsplash commercial license).
- Fallback placeholders are automatically rendered if an external image CDN returns a 404 or connection error.
