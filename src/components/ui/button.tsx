import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type ButtonTone = 'primary' | 'orange' | 'green' | 'rose' | 'neutral'

const base = cn(
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold',
  'shadow-sm transition-all duration-150 active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
)

const tones: Record<ButtonTone, string> = {
  primary:
    'bg-blue-600 !text-white hover:bg-blue-700 hover:!text-white focus-visible:ring-blue-400',
  orange:
    'bg-orange-500 !text-white hover:bg-orange-600 hover:!text-white focus-visible:ring-orange-400',
  green:
    'bg-emerald-600 !text-white hover:bg-emerald-700 hover:!text-white focus-visible:ring-emerald-400',
  rose: 'bg-rose-600 !text-white hover:bg-rose-700 hover:!text-white focus-visible:ring-rose-400',
  neutral:
    'border border-gray-300 bg-white !text-gray-700 hover:bg-gray-50 hover:!text-gray-900 focus-visible:ring-gray-300',
}

export function buttonClass(tone: ButtonTone = 'primary', className?: string) {
  return cn(base, tones[tone], className)
}

/** Kept for existing usages; defaults to the primary tone. */
export const buttonClassName = buttonClass('primary')

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone
}

export function Button({ className, tone = 'primary', ...props }: ButtonProps) {
  return <button className={buttonClass(tone, className)} {...props} />
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: ButtonTone
}

export function ButtonLink({
  className,
  tone = 'primary',
  ...props
}: ButtonLinkProps) {
  return <a className={buttonClass(tone, className)} {...props} />
}
