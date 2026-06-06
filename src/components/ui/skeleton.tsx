import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export function Skeleton({
  className,
  height,
  style,
}: {
  className?: string
  height?: number
  style?: CSSProperties
}) {
  return (
    <div
      className={cn('animate-pulse rounded bg-gray-200', className)}
      style={{ ...(height ? { height } : {}), ...style }}
    />
  )
}
