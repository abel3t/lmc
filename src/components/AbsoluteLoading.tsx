import { cn } from '@/lib/utils'

type AbsoluteLoadingProps = {
  className?: string
}

export function AbsoluteLoading({ className }: AbsoluteLoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Đang tải"
      className={cn(
        'fixed inset-0 z-999 flex min-h-screen items-center justify-center bg-background/90 backdrop-blur-sm',
        className,
      )}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-l-2 border-primary" />
    </div>
  )
}
