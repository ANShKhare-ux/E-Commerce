# Production Deployment Guide

## 1. Hosting Requirements
LUMIÈRE is built on Next.js 14 App Router and can be deployed on:
- **Vercel** (recommended for zero-config edge rendering & asset caching)
- **Node.js Server / Docker Container** (AWS ECS, Google Cloud Run, DigitalOcean App Platform)

### Minimum Environment Specifications:
- **Node.js:** v18.18.0 or v20+ (tested on Node v22)
- **Memory:** 1 GB RAM minimum (2 GB recommended for build step)
- **Port:** 3000 (configurable via `PORT` environment variable)

---

## 2. Environment Variables Checklist
Configure these variables in your hosting provider's dashboard:

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_NAME` | Yes | Store Brand Name | `LUMIÈRE Fashion Discovery` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production canonical URL | `https://lumierefashion.in` |
| `NEXT_PUBLIC_DEFAULT_CURRENCY` | Yes | Currency code | `INR` |
| `AFFILIATE_ALLOWED_DOMAINS` | Yes | Comma-separated list of approved redirect domains | `myntra.com,ajio.com,amazon.in,tatacliq.com,nykaafashion.com` |
| `ENABLE_ANALYTICS` | No | Toggle telemetry/event logging | `false` |
| `DATABASE_URL` | Optional | Connection string for PostgreSQL | `postgresql://...` |

---

## 3. Build & Start Commands
```bash
# 1. Install dependencies
npm ci

# 2. Run type check and tests
npm run type-check
npm test

# 3. Create production bundle
npm run build

# 4. Start production server
npm run start
```

---

## 4. Verification Post-Deployment
1. **Health Check:** Load `/` and confirm HTTP 200 response with correct metadata.
2. **Affiliate Outbound:** Test clicking an affiliate product card and confirm it redirects to the intended retailer with `307 Temporary Redirect` and correct tracking parameters.
3. **Security Headers:** Inspect response headers in curl or browser DevTools:
   - `Content-Security-Policy`
   - `X-Frame-Options: DENY`
   - `Strict-Transport-Security`
4. **Sitemap & Robots:** Verify `https://yourdomain.com/sitemap.xml` and `https://yourdomain.com/robots.txt`.
