# LMC — Khảo sát tâm linh

Vietnamese spiritual assessment surveys built with [TanStack Start](https://tanstack.com/start), React 19, Vite, and pnpm.

## Surveys

| Route | Assessment |
| --- | --- |
| `/an-tu-thuoc-linh` | Adult spiritual gifts (133 questions) |
| `/an-tu-thuoc-linh-next-gen` | Next Gen spiritual gifts (66 questions) |
| `/disc` | DISC personality profile |
| `/ngon-ngu-yeu-thuong` | Love languages (5 groups × 5 ranks) |

Answers and results are stored in the browser (`localStorage`) only — there is no backend database.

## Requirements

- [Node.js](https://nodejs.org) 22+
- [pnpm](https://pnpm.io) 10+

## Scripts

```bash
pnpm install         # install dependencies
pnpm dev             # dev server at http://localhost:3000
pnpm build           # production build
pnpm preview         # preview production build
pnpm start           # run Nitro server (.output/server)
pnpm check           # Biome lint + format check
pnpm test            # unit tests (Vitest)
pnpm test:e2e        # Playwright E2E (builds first)
```

## Project layout

```
src/
  routes/           # TanStack Router file-based routes
  components/       # Survey UI and shared components
  lib/              # Scoring, validation, storage helpers
  stores/           # Zustand stores (DISC, Love Language, Next Gen)
  constants/        # Survey metadata and scale labels
  data/             # Gift question matrices
e2e/                # Playwright specs
```

## Tech stack

- **Framework:** TanStack Start + TanStack Router
- **Build:** Vite 8, Nitro (SSR output)
- **Styling:** Tailwind CSS 4
- **State:** Zustand, TanStack Form (Adult Gift), TanStack React Store
- **Quality:** Biome, Vitest, Playwright
