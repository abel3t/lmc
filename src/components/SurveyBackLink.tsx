import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

type SurveyBackLinkProps = {
  to: string
  label?: string
  className?: string
}

export function SurveyBackLink({
  to,
  label = 'Quay về',
  className = '',
}: SurveyBackLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 ${className}`}
    >
      <ChevronLeft className="h-4 w-4" aria-hidden />
      {label}
    </Link>
  )
}
