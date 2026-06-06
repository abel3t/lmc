import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Spinner } from '@/components/ui/spinner'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1, width=device-width' },
      { title: 'Kỹ Năng Mục Vụ' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner size={70} className="text-primary" />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {children}
    </div>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
