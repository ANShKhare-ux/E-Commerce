# LUMIÈRE — Premium Fashion Affiliate Discovery

A contemporary, responsive, editorial-first clothing discovery and affiliate shopping platform. Curated for the modern fashion enthusiast in India, presenting collections across Men's, Women's, Unisex, Ethnic Wear, Luxury, and Budget Fashion.

---

## ✨ Features
- **Editorial Fashion Discovery:** High-impact, minimalist luxury aesthetic with warm neutral tones and subtle typography.
- **Affiliate First:** Clear external retailer attribution (Myntra, Ajio, Tata CLiQ, Amazon India, Nykaa Fashion) with secure server-side outbound redirection.
- **Robust Security:** Whitelisted merchant domains, scheme validation (blocks `javascript:` and unsafe protocols), zero unrestricted open-redirects, strict CSP, and security headers.
- **Fast Product Search & Filter:** Instant multi-factor filtering by category, brand, audience/gender, price boundaries, and sorting (Featured, Newest, Price Low/High).
- **Curated Collections:** Trending Now, New Arrivals, Under ₹999, Everyday Essentials, Premium Picks, and Seasonal Style.
- **Comprehensive Compliance:** Explicit affiliate disclosures, transparent business model statement, ASCI & FTC compliant notices, privacy policy, and terms.
- **Full SEO & Structured Data:** Semantic HTML, dynamic sitemap, robots.txt, and Google Merchant-compliant Schema.org `Product` JSON-LD.
- **Accessible & Responsive:** Tested across mobile (320px–375px), tablet (768px), and desktop (1024px–1440px) with keyboard focus states and reduced-motion support.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Validation:** Zod
- **Testing:** Vitest + React Testing Library + JSDOM

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18.18.0 or higher (v20+ recommended)
- npm v9+

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd E-Commerce

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Running Locally
```bash
# Run the development server
npm run dev

# Open in browser
http://localhost:3000
```

### Quality Verification
```bash
# Run type check
npm run type-check

# Run automated tests
npm test

# Run linter
npm run lint

# Build for production
npm run build
```

---

## 📖 Documentation
- [Engineering Instructions](instructions.md)
- [Security Architecture & Threat Model](security.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [Testing Strategy](docs/TESTING.md)
- [Affiliate Onboarding & Setup](docs/AFFILIATE_SETUP.md)
- [Production Deployment](docs/DEPLOYMENT.md)
- [Project Status](docs/PROJECT_STATUS.md)

---

## ⚖️ Affiliate Disclosure
LUMIÈRE is an affiliate marketing platform. We do not sell or ship products directly. When you click links to merchants on this site and make a purchase, this may result in this site earning a commission. All product prices, stock, shipping, and terms are determined solely by the destination retailer.
