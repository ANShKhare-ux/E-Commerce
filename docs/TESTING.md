# Testing Strategy & Quality Assurance

## 1. Test Architecture
LUMIÈRE employs a multi-tiered verification strategy designed to ensure security, correctness, and accessibility:
- **Unit & Logic Tests (Vitest):** Core algorithms for affiliate URL sanitization, search indexing, multi-factor filtering, discount math, and currency formatting.
- **Component Tests (Vitest + React Testing Library + JSDOM):** Verifies that UI components render correctly, handle missing images gracefully, display proper disclaimers, and wire buttons accurately.
- **Type Safety (`tsc --noEmit`):** Strict TypeScript compilation preventing any unhandled undefined or type coercions.
- **Linter (`next lint`):** Enforces Next.js and React best practices.
- **Production Build (`next build`):** Verifies that all static pages and App Router routes build successfully.

---

## 2. Test Commands
```bash
# Run all unit and integration tests
npm test

# Run tests in interactive watch mode
npm run test:watch

# Run TypeScript type check
npm run type-check

# Run Next.js linter
npm run lint

# Run production build verification
npm run build
```

---

## 3. Test Suites & Coverage Focus
1. **Affiliate Security (`src/test/affiliate.test.ts`):**
   - Validates HTTPS URLs against approved merchant domain allowlist.
   - Rejects `javascript:`, `data:`, and malformed URLs.
   - Prevents open-redirect attempts with spoofed or untrusted domains.
   - Ensures query parameters (subIds, tracking tags) are preserved intact.
2. **Product Repository & Filter Engine (`src/test/products.test.ts`):**
   - Correct filtering by category, gender/audience, brand, and price boundaries.
   - Sorting by Price (ascending/descending), Featured, and Date.
   - Search term matching across titles, brands, and tags.
   - Graceful empty state handling for zero-result queries.
3. **Currency & Discount Formatting (`src/test/currency.test.ts`):**
   - Validates INR currency formatting with commas according to Indian numbering system (e.g., ₹1,49,999).
   - Validates discount percentage calculation and boundary checks.
4. **Validation Schemas (`src/test/validation.test.ts`):**
   - Zod schema validation for products, contact forms, and newsletter signups.
