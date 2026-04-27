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

- **`artifacts/storymaker`** (web) — Single-page Brazilian Portuguese landing page for "Storymaker de Casamento", a high-end wedding videography brand. Layout/structure modeled on reisman.com.br: sticky header that switches from white-on-hero to dark-on-cream after scroll → full-bleed hero (candle silhouettes) with letter-spaced lowercase serif "feita para reviver" → centered intro ("Made with love by Storymaker") → horizontally-scrollable "uma pequena amostra do nosso olhar" featured-films carousel → 2x2 packages grid → complementos intro + 4-card add-ons grid → sobre/photographer section → dark footer. (No top announcement bar, no testimonials grid, no 6-column infobar — those were intentionally removed because the studio currently has only one wedding filmed and we keep all copy truthful and premium.) Typography is Spectral + Spectral SC small caps. Coleções: Essencial R$1.600, Intermediário I R$2.000, Intermediário II R$2.390, Premium R$2.790 (featured "mais escolhido"). Complementos: votos gravados, stories ao vivo, trends/reels, vídeo carta. Owner photo, full-color brand logo (`Logo_StoryMaker_Casamento_Sem_fundo_*.png`, includes the "STORYMAKER · DE CASAMENTO" wordmark + interlocked gold rings + film-strip heart), the real Julio & Thalia couple photo, and four Julio & Thalia wedding videos (`film_julio_thalia_1.mp4`–`film_julio_thalia_4.mp4`, H.264/AAC) live in `attached_assets/`; the rest of the cinematic image set lives in `src/assets/images/`. Featured films carousel renders the four videos as autoplaying, muted, looping `<video>` cards (each labeled with a different scene of the same wedding) using an IntersectionObserver to play/pause as they enter/leave the viewport, with the Julio & Thalia photo as their poster fallback. The brand logo is shown in natural color on the scrolled cream header and inverted to a white silhouette over the dark hero header and the dark footer. WhatsApp link is `https://wa.me/5512982355909` (+55 12 98235-5909) with a pre-filled message; that is the only contact channel exposed (no placeholder email/Instagram). Page also has Open Graph + Twitter Card meta tags and a brand-colored SVG favicon. No backend. The design is layout-only inspiration — no Reisman text, images, branding, or product copy is used.
- **`artifacts/api-server`** — Express API scaffold (unused by storymaker).
- **`artifacts/mockup-sandbox`** — Component preview sandbox.

## GitHub Pages deployment (storymaker)

The storymaker site is a pure static SPA (no runtime backend — only WhatsApp deep links) and is configured to deploy automatically to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`.

**One-time GitHub setup:**

1. Push the repo to GitHub.
2. Repo **Settings → Pages → Build and deployment → Source**: set to **GitHub Actions**.
3. (Optional, for custom domain like `vvstorymaker.com.br`) Repo **Settings → Secrets and variables → Actions → Variables** tab → add a repository variable `CUSTOM_DOMAIN` with the value `vvstorymaker.com.br` (or whatever the final domain is). The workflow writes a `CNAME` file automatically when this variable is set.
4. (Optional, only if hosting at `username.github.io/repo-name/` instead of a custom domain) Add a repo variable `BASE_PATH` with value `/repo-name/` (with leading and trailing slashes). Default is `/`, which is correct for a custom domain or for `username.github.io` user/org sites.

**What the workflow does:**

- Installs pnpm + Node 20, runs `pnpm install --frozen-lockfile`.
- Builds with `pnpm --filter @workspace/storymaker run build` using `BASE_PATH` and `NODE_ENV=production`.
- Copies `index.html` → `404.html` so client-side routes (wouter) survive direct GH Pages 404s (SPA fallback).
- Writes `.nojekyll` so GH Pages serves files starting with `_` correctly.
- Writes `CNAME` if the `CUSTOM_DOMAIN` repo variable is set.
- Uploads `artifacts/storymaker/dist/public` to GitHub Pages.

**Vite config notes:**

- `vite.config.ts` uses a function form (`defineConfig(async ({ command }) => …)`).
- `PORT` is only required during `vite serve` (dev/preview); `vite build` runs without it.
- `BASE_PATH` defaults to `/` when unset, so plain `pnpm run build` Just Works outside Replit.
- Replit-only plugins (cartographer, dev banner, runtime-error-modal) are skipped in `build` mode and when `REPL_ID` is unset, so the production bundle is clean.

**Asset weight caveat:**

The four Julio & Thalia wedding clips in `attached_assets/` total roughly 44 MB and the cinematic background PNGs add another ~15 MB; the full `dist/public` is around 70 MB. That is well under GitHub Pages limits (1 GB repo, 100 GB bandwidth/month, 100 MB per file) but is heavy for first-time visitors on slow connections. If load times become a concern, consider re-encoding the videos at lower bitrate or moving them to a CDN/object storage and referencing by URL.

**Mobile / favicon pass:**

- Favicons live in `artifacts/storymaker/public/`: `favicon.png` (256×256), `favicon-32.png`, `apple-touch-icon.png` (180×180), all rendered from the brand logo with a cream `#fdfaf5` background so they read on any browser tab color. Linked in `index.html` head with explicit sizes (`favicon-32.png`, `favicon.png`, `apple-touch-icon.png`). The previous `favicon.svg` was removed.
- `index.html` head also sets `viewport-fit=cover`, light/dark `theme-color` (`#fdfaf5` light / `#0c0a08` dark), `apple-mobile-web-app-capable`, `mobile-web-app-capable`, and `format-detection=no` to prevent iOS auto-linking the phone number.
- Mobile layout in `home.tsx` uses `flex justify-between` on the header (switches to `md:grid md:grid-cols-3` from `md:` up) so the WhatsApp button sits flush right with no empty middle column on small screens. Logo shrinks to `h-11` on mobile, the WhatsApp button enforces `min-h-[44px]` for a comfortable touch target. Hero headline tracks `0.06em` on mobile and `0.18em` on desktop so "feita para reviver" stays on a single line at 390 px. Section vertical padding is reduced on mobile (`py-14` → `py-24`/`py-28` desktop pattern), the featured-films carousel cards become `78vw` wide on mobile (one card with peek of next), the add-ons grid becomes 2 columns on mobile, and the footer becomes a 2-column grid with the brand and contact blocks each spanning both columns.
