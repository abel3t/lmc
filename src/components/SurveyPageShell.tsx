import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SurveyPageShellProps = {
  children: ReactNode
  className?: string
}

export function SurveyPageShell({ children, className }: SurveyPageShellProps) {
  return (
    <div className={cn('flex min-h-screen flex-col py-4 sm:py-5', className)}>
      <div className="mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6">
        {children}
      </div>
    </div>
  )
}
