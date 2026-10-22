import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts so the TanStack Start / Nitro plugins stay out of tests.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [viteReact()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'happy-dom',
    // Lets Testing Library register its automatic cleanup between tests.
    globals: true,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/routeTree.gen.ts', 'src/router.tsx', 'src/**/*.test.*'],
    },
  },
})
