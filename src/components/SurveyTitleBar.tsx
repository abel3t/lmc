import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SurveyTitleTone = 'orange' | 'green' | 'primary'

const toneClass: Record<SurveyTitleTone, string> = {
  orange: 'bg-orange-500',
  green: 'bg-emerald-600',
  primary: 'bg-primary',
}

type SurveyTitleBarProps = {
  children: ReactNode
  tone?: SurveyTitleTone
  className?: string
}

export function SurveyTitleBar({
  children,
  tone = 'orange',
  className,
}: SurveyTitleBarProps) {
  return (
    <div
      className={cn(
        'w-full px-4 py-3 text-center text-lg font-semibold leading-snug text-white sm:py-3.5 sm:text-xl md:py-4 md:text-2xl md:font-bold lg:text-3xl',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </div>
  )
}
