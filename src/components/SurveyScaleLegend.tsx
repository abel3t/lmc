type ScaleOption = {
  value: number
  label: string
}

type SurveyScaleTone = 'green' | 'orange' | 'primary'

type SurveyScaleLegendProps = {
  className?: string
  tone?: SurveyScaleTone
  title: string
  labels: readonly ScaleOption[]
}

const toneStyles: Record<
  SurveyScaleTone,
  { container: string; header: string; badge: string }
> = {
  green: {
    container: 'border-emerald-200 bg-emerald-50/70',
    header: 'text-emerald-800',
    badge: 'border-emerald-300 text-emerald-800',
  },
  orange: {
    container: 'border-orange-200 bg-orange-50/70',
    header: 'text-orange-800',
    badge: 'border-orange-300 text-orange-800',
  },
  primary: {
    container: 'border-blue-200 bg-blue-50/70',
    header: 'text-blue-800',
    badge: 'border-blue-300 text-blue-800',
  },
}

export function SurveyScaleLegend({
  className = '',
  tone = 'green',
  title,
  labels,
}: SurveyScaleLegendProps) {
  const styles = toneStyles[tone]

  return (
    <div
      className={`rounded-lg border p-2.5 sm:p-3 ${styles.container} ${className}`}
    >
      <p
        className={`mb-2 text-xs font-semibold uppercase tracking-wide sm:text-sm ${styles.header}`}
      >
        {title}
      </p>
      <ul className="space-y-1.5">
        {labels.map((option) => (
          <li
            key={option.value}
            className="flex items-center gap-2.5 text-xs leading-snug sm:text-sm"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border bg-white text-xs font-bold ${styles.badge}`}
            >
              {option.value}
            </span>
            <span className="text-gray-700">{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
