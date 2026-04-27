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

- Favicons live in `artifacts/storymaker/public/`: `favicon.svg` (preferred — vector logo with embedded raster), `favicon.png` (256×256), `favicon-32.png`, `apple-touch-icon.png` (180×180), all generated with **transparent** background so they read on any browser tab color. `index.html` head links `favicon.svg` first, then PNG sizes as fallback, plus `mask-icon` for Safari pinned tabs.
- `index.html` head also sets `viewport-fit=cover`, light/dark `theme-color` (`#fdfaf5` light / `#0c0a08` dark), `apple-mobile-web-app-capable`, `mobile-web-app-capable`, and `format-detection=no` to prevent iOS auto-linking the phone number.
- Mobile layout in `home.tsx` uses `flex justify-between` on the header (switches to `md:grid md:grid-cols-3` from `lg:` up) so the WhatsApp button sits flush right with no empty middle column on small screens. Logo shrinks to `h-11` on mobile, the WhatsApp button enforces `min-h-[44px]` for a comfortable touch target. Hero headline tracks `0.06em` on mobile and `0.18em` on desktop so "feita para reviver" stays on a single line at 390 px.

**Animation / premium polish pass:**

- All scroll-triggered motion uses a shared cinematic easing `EASE_CINEMATIC = [0.16, 1, 0.3, 1]` plus `staggerContainer` / `staggerItem` variants and a `blurUp` variant (opacity + y + 10px blur → 0). A `WordReveal` component splits headlines into words inside `overflow-hidden` masks so each word slides up with its own delay; a `MarqueeStrip` component renders a continuous gold ticker on dark background as a section divider.
- A fixed `h-[2px]` gold gradient bar at the very top of the page is driven by framer-motion `useScroll` + `useSpring` — it fills as the user scrolls, behaving like a fine gold thread.
- Hero uses `useScroll({ target: heroRef, offset: ["start start", "end start"] })` with `useTransform` to drive a parallax effect: the candle-silhouette image scales `1.05 → 1.18` and translates `0% → 18%` on the y-axis as the hero scrolls past, while the text content lifts `0% → -15%` and fades to 0 by 70%. A radial vignette is layered on top to focus the gaze on the headline. The headline is rendered through `WordReveal`, the italic subtitle fades in after a 1.1 s delay, and the scroll cue at the bottom has a breathing 6 px y-loop.
- Featured films section was rebuilt from scratch on a dark `#0c0a08` background with two soft gold blur-glows (top-left and bottom-right). It now tracks the most-centered card via an `IntersectionObserver` whose `root` is the carousel container and updates `activeFilm` state — inactive cards drop to `scale: 0.94` and `opacity: 0.55`, the active card sits at full scale/opacity with a `ring-1 ring-[#d8b87a]/30` glow that animates in via `AnimatePresence`. The header shows a "FILME 0X / 04" counter that updates with `activeFilm`. Each card has gold corner accents that grow on hover, a "filme" tag, a permanent gradient strip showing couple + scene, and a "conversar pelo whatsapp →" CTA that fades in on hover. Mobile cards are `82vw` with `aspect-[9/16] max-h-[72vh]` and `snap-center` (with peek of neighbours), and a row of pagination dots below the carousel acts as a tap-to-jump control. Desktop pre/next chevrons gain a gold hover state and arrow nudge.
- Intro section gained a `scaleX` gold divider line that animates in, a `WordReveal` on "Made with love by", an italic "Storymaker" word that slides up under its own mask, and a `blurUp` paragraph.
- A `MarqueeStrip` of six brand phrases sits between the intro and the films section as a typographic divider.
- Coleções (packages) section: header uses `staggerContainer` + `staggerItem` (kicker + title + gold underline). Cards use `staggerItem` for entrance, `whileHover={{ y: -6 }}` for lift, deeper shadow on hover, slower image scale (`duration-[1400ms]` to `scale-110`), gold corner accents that grow on hover, and an animated underline on the "conversar" CTA. The "coleção completa" badge moved to top-right with a gold border + dark backdrop-blur pill.
- Complementos section: kicker/title/paragraph stagger together; the introductory champagne image fades in with a gentle `scale 1.06 → 1` zoom-out; each add-on card gets stagger entrance, slower image zoom on hover, a faint gold mix-blend overlay, a gold corner reveal, and a title color shift on hover.
- Sobre section: the owner photo fades in with the same scale-out zoom and gains a `border-b-2 border-r-2 border-[#d8b87a]/70` gold L-bracket in the bottom-right corner; the right column staggers kicker, title, paragraph, and CTA. The CTA button now has an inline animated underline that grows on hover.
- All previous `fadeUp` usage in these sections was replaced; older `fadeUp` variant is still defined and used implicitly nowhere now (kept for backward compatibility / fallback).
- TypeScript: framer-motion types required `Variants` to be imported from `framer-motion` and applied to `blurUp`/`staggerContainer`/`staggerItem` so `transition.ease` accepts the `EASE_CINEMATIC` tuple.

**Post-review hardening (carousel performance + a11y):**

- Video playback is now gated to **one card at a time**. Previously every video in the carousel auto-played whenever it intersected the viewport (with `rootMargin: 200px`), which on mobile could keep 2–3 H.264 streams decoding simultaneously over the ~44 MB film payload. Now: a single `useEffect([activeFilm, filmsSectionVisible])` plays only `videoRefs.current[activeFilm]` and pauses every other video. With `preload="none"` on each `<video>`, this means **only the active card downloads bytes** — neighbours sit cold until the user swipes to them.
- A second `IntersectionObserver` on `#casais` flips a `filmsSectionVisible` boolean. Videos pause completely when the section leaves the viewport, so background scrolling on long pages costs zero CPU/bandwidth.
- Active-card detection was rewritten from "best of changed IO entries" to a deterministic, rAF-throttled `scrollLeft + clientWidth/2` proximity check on the carousel. Includes a `ResizeObserver` to recompute on viewport resize, an initial sync call, and an idempotent `setActiveFilm((prev) => prev === bestIdx ? prev : bestIdx)` to avoid render churn. This keeps the "FILME 0X / 04" counter, the gold ring, and the pagination dots perfectly in sync with the snap-settled card.
- The whole component tree is wrapped in `<MotionConfig reducedMotion="user">` so framer-motion automatically suppresses transforms (parallax, marquee, breathing scroll cue, hover translates) for visitors with `prefers-reduced-motion: reduce`. Opacity transitions still play.
- Removed unused `fadeUp` variant and `EASE` constant.
