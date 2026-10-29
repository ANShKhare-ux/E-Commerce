# AGENTS.md — AI Agent Operating Instructions

This document governs all autonomous and semi-autonomous AI coding agents operating on the **LUMIÈRE** repository. All agents must read and adhere to these guidelines prior to proposing, generating, or modifying code.

---

## 1. Mandatory Operating Rules

1. **Read Knowledge Base First**: Always read `AGENTS.md` and `memory.md` before initiating substantial development or refactoring work.
2. **Inspect Before Changing**: Inspect the relevant source code and configuration files before making edits. Do not assume behavior based on filenames or external docs alone.
3. **Respect Directory Instructions**: Follow any existing directory-specific instructions or configuration conventions present in subdirectories.
4. **Preserve Functionality**: Preserve all functioning features, existing architecture, and established domain workflows (e.g., dual business model, 15-minute checkout reservation hold, Delhivery integration).
5. **Avoid Speculative Work**: Avoid unrelated refactoring, speculative features, and unnecessary code rewrites. Stay strictly scoped to the user's objective.
6. **Reuse Existing Patterns & Tools**: Reuse existing dependencies, components (`src/components`), services (`src/lib/services`), and utilities (`src/lib/db`) rather than reinventing parallel mechanisms.
7. **No Arbitrary Dependencies**: Do not add external dependencies without explicit user authorization and a compelling technical reason.
8. **Protect User & Working State**: Never overwrite user changes or discard uncommitted work (such as active modifications in `package-lock.json`) without explicit authorization.
9. **Zero Credential Exposure**: Never expose secret keys, API tokens, or real credentials in code, documentation, or commit history. Use `.env.example` as the canonical reference for environment variables.
10. **Follow Established Conventions**: Use the project's established conventions: TypeScript strict typing, `@/*` path aliases, Indian commerce standards (INR ₹, 12% GST, 6-digit PIN codes), and Tailwind atelier styling.
11. **Run Validation Checks**: Run relevant tests (`npm.cmd test`) and validation checks (`npx.cmd tsc --noEmit`, `npm.cmd run build`) when practical before concluding a task.
12. **Honest Reporting**: Report actual results honestly. Never claim that an unrun test or build succeeded without concrete execution output.
13. **Maintain Memory**: Update `memory.md` whenever significant architectural decisions, feature statuses, constraints, or known issues are altered.
14. **Keep Docs Synchronized**: Keep all documentation (`docs/`, `memory.md`, `README.md`) consistent with real, verified implementation details.
15. **Confirm High-Stakes Operations**: Ask the user before performing destructive operations (e.g., deleting files, database truncations) or introducing major architectural alterations.

---

## 2. Project-Specific Operational Guidelines

### Environment & Tooling (Windows PowerShell)
- **Script Policy Notice**: On Windows environments where PowerShell script execution is restricted (`npm.ps1 cannot be loaded`), always invoke `npm.cmd` and `npx.cmd` for executing package manager scripts and binary tools.
- **Verification Commands**:
  - Tests: `npm.cmd test` (runs Vitest across all test suites)
  - Type-checking: `npx.cmd tsc --noEmit`
  - Production build: `npm.cmd run build`

### Architecture & Domain Constraints
- **Authoritative Server Pricing**: The frontend client must **never** calculate or dictate final unit prices, GST tax allocations, or order totals. All calculations must occur authoritatively in server route handlers or domain services (`src/lib/db`).
- **Storefront Inventory Policy**: The live storefront catalog must remain clean and genuine (`INITIAL_PRODUCTS = []`). Do not inject mock product cards into production pages. Automated test fixtures are reserved strictly for Vitest runners via `TEST_FIXTURE_PRODUCTS`.
- **Atomic Concurrency**: Respect the 3-pool stock model (`Physical`, `Reserved`, `Available = Physical - Reserved`). All checkout reservations must include a 15-minute expiration timestamp.
- **Two-Stage Return Restock**: When processing returns, never automatically restock inventory upon return creation. Items must be marked `received_and_inspected` with physical inspection notes before calling `db.returns.inspectAndRestock`.
- **Transactional Outbox**: Notifications must be written to the resilient email outbox (`email_outbox`) so that external API delivery failures (e.g., Resend downtime) do not interrupt customer checkouts.

---

## 3. Pre-Completion Agent Checklist

Before completing any task, verify:
- [ ] No regression introduced to existing tests (`npm.cmd test` passes).
- [ ] TypeScript compilation succeeds with zero errors (`npx.cmd tsc --noEmit`).
- [ ] No unrequested files were deleted, moved, or renamed.
- [ ] No credentials, secrets, or `.env.local` contents are leaked.
- [ ] All newly introduced files adhere to the project's coding conventions and formatting.
- [ ] `memory.md` is updated if architectural changes or new capabilities were introduced.
