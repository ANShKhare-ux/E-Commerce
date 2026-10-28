# AGENTS.md — Guidance for Coding Assistants

Welcome, coding agent. This repository is **LUMIÈRE**, an editorial-grade fashion discovery and affiliate marketing website built on Next.js 14 (App Router), TypeScript (Strict Mode), and Tailwind CSS.

## Fundamental Principles
1. **Never fabricate live data:** We do not claim real-time stock scrapers, live inventory updates, fake user reviews, or unauthorized affiliate partnerships. All demonstration data is clearly classified as such.
2. **Affiliate Safety First:** All external merchant buttons must route through validated HTTPS URLs matching approved domains or through `/api/outbound/[id]`. Never allow unvalidated open redirects.
3. **App Router Conventions:**
   - Server Components by default.
   - Use `'use client'` only on leaves that handle browser events, state, or DOM interactions.
   - No React hooks in Server Components.
4. **Validation:**
   - Use Zod schemas in `@/lib/validation.ts` for all user input and external parameters.
   - Financial figures are non-negative integers (INR). Always use `@/lib/currency.ts` to format currency.
5. **Quality Verification:**
   - Type check: `npm run type-check`
   - Lint: `npm run lint`
   - Tests: `npm test`
   - Build: `npm run build`
   Never mark a task complete without executing these commands.
