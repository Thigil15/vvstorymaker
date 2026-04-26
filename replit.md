# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- **`artifacts/storymaker`** (web) — Single-page Brazilian Portuguese landing page for "Storymaker de Casamento", a high-end wedding videography brand. Editorial/cinematic design driven by Pinyon Script (display) and Cormorant Garamond (body). Hero, atelier, sobre, coleções (4 packages: Essencial R$1.600, Intermediário I R$2.000, Intermediário II R$2.390, Premium R$2.790 — featured), complementos (4 add-ons), and closing WhatsApp CTA. Owner photo and transparent logo PNG live in `attached_assets/`. WhatsApp link is currently `https://wa.me/5511999999999` (placeholder — owner to replace). No backend.
- **`artifacts/api-server`** — Express API scaffold (unused by storymaker).
- **`artifacts/mockup-sandbox`** — Component preview sandbox.
