# Engineering Instructions & Operating Manual

## 1. Project Overview & Business Objective
**Project Name:** LUMIÈRE — Premium Fashion Affiliate Discovery & Shopping Platform  
**Market & Focus:** Contemporary fashion discovery in India (INR ₹, English).  
**Business Model:** Affiliate Marketing. We curate, index, categorize, and showcase high-quality clothing across Men's, Women's, Unisex, Ethnic Wear, Formalwear, Casual, Sportswear, Shoes, and Accessories.
**Core Principles:**
- We do **not** sell or ship products directly, nor do we process customer payments.
- We do **not** claim to own merchant inventory.
- Every product has a verified external merchant (e.g., Myntra, Ajio, Tata CLiQ, Amazon India, Nykaa Fashion) and a validated affiliate destination URL.
- Outbound clicks route through a validated, server-controlled redirect mechanism with `rel="sponsored noopener noreferrer"`.
- All affiliate relationships and advertising disclosures must remain prominent and unambiguous.

---

## 2. Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.7+ (Strict Mode enabled)
- **Styling:** Tailwind CSS (Custom luxury editorial palette: warm alabaster, deep obsidian, antique gold accent)
- **Icons:** Lucide React
- **Validation:** Zod 3.24+ for input, schema, and environment parsing
- **Testing:** Vitest 2.1+ with React Testing Library and JSDOM
- **Persistence Layer:** Abstracted repository pattern. Default local typed dataset with seamless extensibility for Prisma/PostgreSQL.

---

## 3. Architecture & Code Conventions

### 3.1 Directory Structure
```
/src
  /app                     # Next.js App Router pages and route handlers
    /(routes)              # Shop, Categories, Collections, Search, Product Details
    /api                   # Outbound redirection and contact demonstration endpoints
    globals.css            # Editorial typography and design tokens
    layout.tsx             # Root layout with header, announcements, footer
    not-found.tsx          # Custom luxury 404 page
    robots.ts & sitemap.ts # SEO discovery
  /components              # Modular, reusable UI components
    /common                # Navbar, Footer, AnnouncementBar, Breadcrumbs, AffiliateNotice
    /product               # ProductCard, ProductGrid, PriceTag, ImageFallback
    /filter                # FilterSidebar, FilterDrawer, SortDropdown
    /home                  # HeroSection, FeaturedCategories, EditorialJournal, Newsletter
  /data                    # Typed product, merchant, category, and collection datasets
  /lib                     # Business logic, repositories, URL sanitizers, currency formatting
  /types                   # TypeScript interfaces and Zod schemas
  /test                    # Test setup and test suites
/docs                      # Architecture, Security, Testing, Deployment, Affiliate setup
```

### 3.2 Server vs. Client Component Rules
1. **Default to Server Components:** All pages (`page.tsx`), data loaders, and static display wrappers must be Server Components.
2. **Client Components (`'use client'`):** Reserve exclusively for components requiring browser APIs, event listeners, local React hooks (`useState`, `useReducer`), or form interactivity.
3. **Never place `'use client'` at the root layout or entire pages** just to resolve a local interactive widget. Extract the interactive element into a dedicated component.
4. **No Server Hooks:** Never call client hooks (`useEffect`, `useState`, `useRouter`) in Server Components.

### 3.3 Data Layer Conventions
- Financial values are stored as positive integers representing the exact rupee value (e.g., `1499` for ₹1,499) to avoid floating-point inaccuracies.
- Prices are formatted through `@/lib/currency.ts` (`formatINR(price)`).
- Product and merchant schemas are strictly validated with Zod in `@/lib/validation.ts`.

---

## 4. Affiliate Safety & Security Rules
- **No Unrestricted Open Redirects:** Outbound redirection endpoints (`/api/outbound/[id]`) must resolve the product from the server-side trusted repository. Never accept an arbitrary `url` query parameter from an unauthenticated client.
- **Protocol Whitelist:** Only `https:` and `http:` (preferring `https:`) destinations are permitted. Reject `javascript:`, `data:`, `file:`, and invalid URIs.
- **Merchant Domain Whitelisting:** Destinations must match configured retailer domains (e.g., `myntra.com`, `ajio.com`, `tatacliq.com`, `amazon.in`, `nykaafashion.com`).
- **External Link Attributes:** Every affiliate link rendered in HTML must include `target="_blank" rel="sponsored noopener noreferrer"`.
- **No Secret Exposure:** Never prefix API keys or private tokens with `NEXT_PUBLIC_`. Keep sensitive credentials exclusively on the server.

---

## 5. Testing & Verification Workflow
- **Unit & Integration Tests:** Run `npm test` (Vitest). All validation, sorting, filtering, and affiliate URL logic must pass.
- **Type Checking:** Run `npm run type-check` (`tsc --noEmit`). No TypeScript errors or `any` cheats allowed.
- **Linting:** Run `npm run lint`.
- **Production Build:** Run `npm run build`. Ensure all static and dynamic routes generate cleanly without hydration mismatches.

---

## 6. Instructions for Future AI Coding Agents
1. **Preserve Architectural Boundaries:** Do not bypass the repository layer (`@/lib/products.ts`) by hardcoding fetch requests directly inside UI components.
2. **Do Not Fabricate Live Retailer Data:** Do not claim real-time stock availability, live price scrapers, or automatic affiliate commission tracking unless genuine API integration is implemented. Sample data must be marked as demonstration data.
3. **Respect Editorial Design:** Avoid garish gradients, oversized neon cards, or generic dashboard aesthetics. Follow the understated luxury palette defined in `tailwind.config.ts`.
4. **Definition of Done:** A feature is only complete when:
   - TypeScript compiles cleanly (`tsc --noEmit`).
   - Vitest passes with zero failures.
   - Production build succeeds (`npm run build`).
   - Relevant documentation in `/docs` and `memory.md` is updated.
