import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { SurveyBackLink } from '@/components/SurveyBackLink'
import { buttonClass, type ButtonTone } from '@/components/ui/button'

type SurveyResultLayoutProps = {
  children: ReactNode
  surveyTo: string
  hasResult?: boolean
  tone?: ButtonTone
}

export function SurveyResultLayout({
  children,
  surveyTo,
  hasResult = false,
  tone = 'primary',
}: SurveyResultLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-8 sm:px-6">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
        <SurveyBackLink
          to="/"
          label="Về trang chủ"
          className="mb-4 print:hidden"
        />
        {children}
        <div className="mt-8 print:hidden">
          <Link to={surveyTo} className={buttonClass(tone)}>
            Làm {hasResult && 'lại'} khảo sát
          </Link>
        </div>
      </div>
    </div>
  )
}
