import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Best-effort: hide browser print header/footer (date, title, URL). */
export function printWithoutBrowserHeader() {
  const previousTitle = document.title
  document.title = ' '

  const restore = () => {
    document.title = previousTitle
    window.removeEventListener('afterprint', restore)
  }

  window.addEventListener('afterprint', restore)
  window.print()

  // Fallback when afterprint is not fired.
  window.setTimeout(restore, 1000)
}
