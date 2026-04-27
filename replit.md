# Overview

This project is a pnpm workspace monorepo using TypeScript, designed for building web applications and API services. The primary artifact is a high-end wedding videography landing page, "Storymaker de Casamento," aimed at showcasing cinematic work and attracting clients in the Brazilian market. The project emphasizes a premium brand experience, detailed visual design, and interactive elements.

## User Preferences

I prefer concise and clear communication. For development, I favor an iterative approach, focusing on delivering core features first and then refining details. I appreciate explanations that highlight the 'why' behind architectural choices rather than just the 'how'. When making changes, please ask before implementing significant alterations to existing UI components or core business logic. Do not make changes to files within the `.github/workflows/` directory without explicit instruction.

# System Architecture

The project is structured as a pnpm monorepo.

**Technology Stack:**
- **Monorepo Tool:** pnpm workspaces
- **Node.js:** v24
- **TypeScript:** v5.9
- **API Framework (for `api-server`):** Express 5
- **Database (for `api-server`):** PostgreSQL with Drizzle ORM
- **Validation:** Zod (`zod/v4`), `drizzle-zod`
- **API Codegen:** Orval (from OpenAPI spec)
- **Build Tool:** esbuild (CJS bundle)

**UI/UX Decisions (Storymaker landing page):**
- **Design Inspiration:** Layout and structure modeled on reisman.com.br, featuring a sticky header, full-bleed hero section, horizontally-scrollable featured films carousel, package grids, add-ons, and an 'about' section.
- **Color Scheme:** Cream background, dark text, and gold accents to convey luxury.
- **Typography:** Spectral and Spectral SC small caps.
- **Interactive Elements:**
    - Scroll-triggered animations and parallax effects using `framer-motion` for a cinematic feel.
    - Custom `WordReveal` and `MarqueeStrip` components for dynamic text and section dividers.
    - Animated gold gradient scroll progress bar at the top of the page.
    - Featured films carousel with active card detection, visual scaling for inactive cards, and a lightbox modal for video playback.
    - Hover effects on cards, buttons, and CTAs for enhanced interactivity.
- **Asset Handling:** Images and videos are included directly. Videos are served via a lightbox modal as static poster cards, with native controls and `playsInline`.
- **Accessibility:** `MotionConfig reducedMotion="user"` is implemented to respect user preferences for reduced motion. The film lightbox is a fully accessible modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="lightbox-title"`, initial focus moved to the close button on open, Tab/Shift+Tab focus trap inside the modal, focus restored to the originating card on close, and Escape/backdrop-click/X-button close paths.
- **Mobile Responsiveness:** Optimized layouts for various screen sizes, including touch-friendly targets and adjusted typography.
- **Branding:** Consistent use of the "Storymaker de Casamento" brand logo, integrated into the header and footer, with color inversion based on background.

**Technical Implementations:**
- **Static Site Generation:** The `storymaker` artifact is a pure static Single-Page Application (SPA) with no runtime backend, designed for deployment on platforms like GitHub Pages.
- **SPA Fallback:** `index.html` is copied to `404.html` to handle client-side routing on GitHub Pages.
- **Vite Configuration:** Uses a functional `vite.config.ts` to handle build processes, `BASE_PATH` for deployment flexibility, and conditional plugin loading for development vs. production environments.
- **Scroll Observation:** `IntersectionObserver` and `ResizeObserver` are used for carousel functionality and active card detection.
- **State Management:** Local component state for UI interactions (e.g., `activeFilm`, `lightboxFilm`).
- **Body Scroll Lock:** Implemented for lightbox modals to prevent background scrolling.

# External Dependencies

- **GitHub Pages:** For static site deployment of the `storymaker` artifact.
- **WhatsApp:** Integrated via deep links for client communication and contact, used as the sole contact channel.