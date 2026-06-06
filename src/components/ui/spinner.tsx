import { cn } from '@/lib/utils'

export function Spinner({
  className,
  size = 24,
}: {
  className?: string
  size?: number
}) {
  return (
    <span
      role="status"
      aria-label="loading"
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
        className,
      )}
      style={{ width: size, height: size }}
    />
  )
}
