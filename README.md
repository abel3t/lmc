# LMC — Khảo sát tâm linh

Vietnamese spiritual assessment surveys built with [TanStack Start](https://tanstack.com/start), React 19, Vite, and Bun.

## Surveys

| Route | Assessment |
| --- | --- |
| `/an-tu-thuoc-linh` | Adult spiritual gifts (133 questions) |
| `/an-tu-thuoc-linh-next-gen` | Next Gen spiritual gifts (66 questions) |
| `/disc` | DISC personality profile |
| `/ngon-ngu-yeu-thuong` | Love languages (5 groups × 5 ranks) |

Answers and results are stored in the browser (`localStorage`) only — there is no backend database.

## Requirements

- [Bun](https://bun.sh) 1.2+

## Scripts

```bash
bun install          # install dependencies
bun run dev          # dev server at http://localhost:3000
bun run build        # production build
bun run preview      # preview production build
bun start            # run Nitro server (.output/server)
bun run check        # Biome lint + format check
bun test src         # unit tests (Bun test runner)
bun run test:e2e     # Playwright E2E (builds first)
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
- **Quality:** Biome, Bun test, Playwright
