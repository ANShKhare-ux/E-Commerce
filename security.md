# Security Architecture & Policies

## 1. Security Overview & Threat Model
The LUMIÈRE platform operates as a high-trust fashion affiliate discovery destination. The primary threats relevant to this architecture include:
1. **Unvalidated Outbound Redirects (Open Redirects):** Attackers attempting to use our trusted domain to bounce victims to phishing sites.
2. **Cross-Site Scripting (XSS):** Malicious inputs injected via search query parameters, product descriptions, or contact forms.
3. **Secret Leakage:** Accidental exposure of private API tokens or administrative secrets to client-side bundles.
4. **Denial of Service / Form Spam / Rapid Brute-Forcing:** Automated spam on contact/newsletter endpoints or scraping floods on outbound redirects.
5. **Supply Chain Risks:** Vulnerable third-party npm packages.

---

## 2. Affiliate URL Validation & Open Redirect Mitigation
Affiliate links are high-risk vectors if not handled defensively.
### Mandatory Controls:
1. **Server-Side Destination Resolution:** The outbound redirection endpoint (`/api/outbound/[id]`) does not accept arbitrary destination URLs in query parameters. It resolves canonical products by ID strictly from trusted server storage.
2. **Strict Protocol Whitelist:**
   - Permitted: Strictly `https:`. Plain unencrypted `http:` is rejected.
   - Explicitly Blocked: `javascript:`, `data:`, `file:`, `vbscript:`, `blob:`.
3. **Embedded Authentication Credentials Blocking:**
   - URLs containing embedded userinfo (`https://user:password@merchant.com`) are rejected to prevent credential leakage and obfuscated destination trickery (RFC 3986 / WHATWG compliance).
4. **Domain Whitelisting:**
   - Destination hostnames are validated against an allowlist of approved merchants:
     `myntra.com`, `ajio.com`, `amazon.in`, `tatacliq.com`, `nykaafashion.com`, `marksandspencer.in`, `zara.com`, `hm.com`, `snitch.co.in`, `bewakoof.com`.
   - Subdomains are validated strictly using boundary checks (`hostname === domain || hostname.endsWith('.' + domain)`) to prevent spoofing (e.g. `fakemyntra.com` is rejected).
5. **Rel Sponsored & Noopener:** All client-side anchor tags linking externally enforce:
   `target="_blank" rel="sponsored noopener noreferrer"`.
6. **Rate Limiting:** `/api/outbound/[id]` enforces sliding-window rate limiting (60 requests/min per IP) to mitigate link scraping and automated enumeration.

---

## 3. Rate Limiting Strategy
Implemented in `src/lib/rate-limit.ts` using an in-memory sliding-window log:
- **Outbound Redirections (`/api/outbound/[id]`):** 60 requests / 1 minute per IP.
- **Contact Inquiries (`/api/contact`):** 5 submissions / 10 minutes per IP.
- **Newsletter Subscriptions (`/api/newsletter`):** 5 subscriptions / 10 minutes per IP.
- Exceeded thresholds return HTTP `429 Too Many Requests` with a calculated `Retry-After` header in seconds.

---

## 4. Input Validation & Sanitization
- All client and server inputs (search terms, contact submissions, newsletter signups, query filters) are strictly validated using **Zod schemas**.
- No `dangerouslySetInnerHTML` is used in user-controlled contexts.
- Search queries are tokenized, stripped of currency symbols (`₹`, `$`), and matched against indexed fields without dynamic SQL execution.
- Honeypot fields are implemented on contact and newsletter forms to silently catch automated spam bots.

---

## 5. HTTP Security Headers & Content Security Policy (CSP)
Configured in `next.config.mjs`:
- **Strict-Transport-Security:** `max-age=63072000; includeSubDomains; preload`
- **X-Content-Type-Options:** `nosniff`
- **X-Frame-Options:** `DENY` (Prevents clickjacking)
- **Referrer-Policy:** `strict-origin-when-cross-origin` (Protects user privacy while allowing merchants to verify origin)
- **Permissions-Policy:** `camera=(), microphone=(), geolocation=(), payment=()`
- **Content-Security-Policy:** Enforces restricted script, style, and image origins (including official merchant CDNs: Unsplash, Myntassets, Ajio, Amazon).

---

## 6. Secret Management & Environment Security
- Never prefix secrets or private keys with `NEXT_PUBLIC_`.
- All credentials and API keys reside in server-side runtime environments only.
- The `.gitignore` file strictly excludes `.env*` files except `.env.example`.
- Rotation checklist: If an administrative secret is suspected of exposure, rotate immediately, invalidate active sessions, and verify deployment environment variables.

---

## 7. Known Security Boundaries & Next Steps
- For distributed multi-region production clusters, replace the single-instance in-memory rate limiter with Redis / Upstash Redis middleware.
- When migrating from the static repository to PostgreSQL, utilize Prisma parameterized queries to preserve SQL injection immunity.
