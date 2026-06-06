import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import { type ReactNode, useEffect, useState } from 'react'
import { AbsoluteLoading } from '@/components/AbsoluteLoading'

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
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        404
      </p>
      <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
        Không tìm thấy trang
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-600 sm:text-base">
        Đường dẫn này không tồn tại. Quay về trang chủ để chọn khảo sát.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Về trang chủ
      </Link>
    </div>
  )
}

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
  const [mounted, setMounted] = useState(false)
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  useEffect(() => {
    setMounted(true)
  }, [])

  const showLoading = mounted && isLoading

  return (
    <div className="flex min-h-screen w-full flex-col">
      {children}
      {showLoading ? <AbsoluteLoading /> : null}
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
