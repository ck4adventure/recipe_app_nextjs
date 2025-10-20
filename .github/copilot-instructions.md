# Copilot Instructions for recipe_app_nextjs

## Project Overview
- **Bakery Management App** built with Next.js (using the `/app` directory) and TypeScript.
- Backend uses direct SQL (PostgreSQL via `pg`), no ORM. Data/scripts are split for local and Vercel Neon cloud DB.
- Key features are found in `/design/features.md`. Other files in `/design` provide more specific details on each feature.

## Directory Structure & Key Files
- `/src/app` — Main Next.js app code (components, lib, etc.)
- `/db` — Database logic, migrations, and BE tests
  - `/db/migrations` — SQL migration files ("up" only)
  - `/db/utils` — Scripts for local/vercel DB actions
  - `/db/tests` — Backend tests (mocha)
- `/scripts` — DB setup, migration, and data loading scripts
- `/data` — Sample recipe data for recipes feature (JSON, markdown)
- `/recipe_store` — Business recipes for the chef feature (modularized by ingredient/type)
- `/__tests__` — Jest component tests
- `/cypress` — End-to-end tests for frontend
- `/design` — Feature specs and planning docs

## Developer Workflows
- **Install:** `npm install` (Node 20+ required)
- **Run Dev Server:** `npm run dev` (visit `localhost:3000/recipes`)
- **Test FE (Jest):** `npm run test`
- **Test E2E (Cypress):** `npx cypress open` or `npx cypress run`
- **Test BE (Mocha):** Run tests in `/db/tests` or `/test`
- **DB Setup (Local):** Use scripts in `/scripts` (e.g., `setup_db_local.mjs`)
- **DB Setup (Vercel/Neon):** Use `/scripts/setup_db_vercel.mjs` and related migration/data loader scripts

## Patterns & Conventions
- **No ORM:** All SQL is hand-written for learning purposes; see `/db/migrations` and `/db/utils`.
- **Data Loading:** Add new data loader scripts to `/db/migrations` and reference in `/scripts/setup_db_vercel.mjs`.
- **Feature Planning:** Specs live in `/design/feature_*.md`.
- **Testing:**
  - FE: Jest in `/__tests__`
  - E2E: Cypress in `/cypress/e2e`
  - BE: Mocha in `/db/tests` and `/test`
- **TypeScript:** Used throughout; types in `types.ts` and within `/src/app`.
- **Tailwind CSS:** Configured via `tailwind.config.ts` and `postcss.config.js`.

## Integration Points
- **PostgreSQL:** Direct SQL via `pg` (see `/db` and `/scripts`)
- **Vercel Neon:** Cloud DB, managed via custom scripts
- **Cypress:** E2E tests for FE workflows
- **Jest/Mocha:** Unit/component and backend tests

## Examples
- To add a backend feature:
  1. Write SQL schema/migration in `/db/migrations`
  2. Add migration/data loader script
  3. Reference in `/scripts/setup_db_vercel.mjs`
  4. Run setup script for local or cloud DB
- To add a new recipe: Place data in `/data` or `/recipe_store`, update relevant loader scripts

## References
- See `/README.md` for setup and architecture
- See `/design/features.md` for product features
- See `/db/utils` and `/scripts` for DB management

---
**Update this file as project conventions evolve.**
