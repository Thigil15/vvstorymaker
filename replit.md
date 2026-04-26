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

- **`artifacts/storymaker`** (web) — Single-page Brazilian Portuguese landing page for "Storymaker de Casamento", a high-end wedding videography brand. Layout/structure modeled on reisman.com.br (announcement topbar → sticky header that switches from white-on-hero to dark-on-cream after scroll → full-bleed hero with letter-spaced lowercase serif "feita para reviver" → centered intro → horizontally-scrollable "Casamentos que filmamos" carousel → 2x2 packages grid with featured Premium spanning two columns → complementos intro + 4-card add-ons grid → "make it Unforgettable" testimonials grid → sobre/photographer section → 6-column infobar → dark footer). Typography is Spectral + Spectral SC small caps (Reisman font), with Pinyon Script kept available as a script accent. Coleções: Essencial R$1.600, Intermediário I R$2.000, Intermediário II R$2.390, Premium R$2.790 (featured). Complementos: votos gravados, stories ao vivo, trends/reels, vídeo carta. Owner photo, full-color brand logo (`Logo_StoryMaker_Casamento_Sem_fundo_*.png`, includes the "STORYMAKER · DE CASAMENTO" wordmark + interlocked gold rings + film-strip heart), the real Julio & Thalia couple photo, and four Julio & Thalia wedding videos (`film_julio_thalia_1.mp4`–`film_julio_thalia_4.mp4`, H.264/AAC) live in `attached_assets/`; the rest of the cinematic image set lives in `src/assets/images/`. Featured films carousel renders the four videos as autoplaying, muted, looping `<video>` cards (each labeled with a different scene of the same wedding) using an IntersectionObserver to play/pause as they enter and leave the viewport, with the Julio & Thalia photo as their poster fallback. The brand logo is shown in natural color on the scrolled cream header and inverted to a white silhouette over the dark hero header and the dark footer. WhatsApp link is `https://wa.me/5512982355909` (+55 12 98235-5909) with a pre-filled message. No backend. The design is layout-only inspiration — no Reisman text, images, branding, or product copy is used.
- **`artifacts/api-server`** — Express API scaffold (unused by storymaker).
- **`artifacts/mockup-sandbox`** — Component preview sandbox.
