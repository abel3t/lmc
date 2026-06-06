import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border-0 border-b bg-transparent px-2 py-1 transition-colors focus:outline-none',
        error
          ? 'border-red-500 focus:border-red-500'
          : 'border-gray-400 focus:border-primary',
        className,
      )}
      {...props}
    />
  )
}
