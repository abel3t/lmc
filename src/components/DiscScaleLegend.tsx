import { DISC_SCALE_LABELS } from '@/constant'

type DiscScaleLegendProps = {
  className?: string
}

export function DiscScaleLegend({ className = '' }: DiscScaleLegendProps) {
  return (
    <div
      className={`rounded-lg border border-emerald-200 bg-emerald-50/70 p-2.5 sm:p-3 ${className}`}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-800 sm:text-sm">
        Thang điểm (1 → 5)
      </p>
      <ul className="space-y-1.5">
        {DISC_SCALE_LABELS.map((option) => (
          <li
            key={option.value}
            className="flex items-center gap-2.5 text-xs leading-snug sm:text-sm"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-emerald-300 bg-white text-xs font-bold text-emerald-800">
              {option.value}
            </span>
            <span className="text-gray-700">{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
