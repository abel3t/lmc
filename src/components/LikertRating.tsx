type LikertOption = {
  value: number
  label: string
}

type LikertAccent = 'orange' | 'green' | 'primary'

const ACCENTS: Record<LikertAccent, { selected: string; hover: string }> = {
  orange: {
    selected: 'border-orange-500 bg-orange-500 text-white',
    hover: 'hover:border-orange-400',
  },
  green: {
    selected: 'border-emerald-600 bg-emerald-600 text-white',
    hover: 'hover:border-emerald-400',
  },
  primary: {
    selected: 'border-primary bg-primary text-primary-foreground',
    hover: 'hover:border-primary/60',
  },
}

type LikertRatingProps = {
  value: number | undefined
  options: readonly LikertOption[]
  onChange: (value: number) => void
  name: string
  className?: string
  accent?: LikertAccent
  /** Tighter layout for 5-option scales on small screens (e.g. DISC). */
  size?: 'default' | 'compact'
}

export function LikertRating({
  value,
  options,
  onChange,
  name,
  className = '',
  accent = 'primary',
  size = 'default',
}: LikertRatingProps) {
  const accentStyle = ACCENTS[accent]
  const isCompact = size === 'compact'
  const useMobileGrid = !isCompact && options.length === 4

  const containerClass = isCompact
    ? `flex flex-nowrap items-stretch justify-between gap-1 sm:flex-wrap sm:justify-center sm:gap-3 ${className}`
    : useMobileGrid
      ? `grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 ${className}`
      : `flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${className}`

  return (
    <div className={containerClass}>
      {options.map((option) => {
        const selected = value === option.value
        const baseLabel = selected
          ? accentStyle.selected
          : `border-gray-300 bg-white ${accentStyle.hover}`

        const labelClass = isCompact
          ? `flex min-w-0 flex-1 cursor-pointer flex-col items-center rounded-md border px-1 py-1.5 text-center transition-colors sm:min-w-[4.5rem] sm:flex-none sm:px-2 sm:py-2 md:min-w-[5rem] ${baseLabel}`
          : useMobileGrid
            ? `flex w-full cursor-pointer flex-col items-center rounded-md border px-2 py-2 text-center text-xs transition-colors sm:min-w-[4.5rem] sm:w-auto sm:text-sm md:min-w-[5rem] ${baseLabel}`
            : `flex min-w-[4.5rem] cursor-pointer flex-col items-center rounded-md border px-2 py-2 text-center text-xs transition-colors sm:min-w-[5rem] sm:text-sm ${baseLabel}`

        return (
          <label key={option.value} className={labelClass}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              className={
                isCompact
                  ? 'text-sm font-semibold sm:text-base'
                  : 'text-sm font-semibold sm:text-base'
              }
            >
              {option.value}
            </span>
            <span
              className={
                isCompact
                  ? 'mt-0.5 hidden text-[10px] leading-tight sm:mt-1 sm:block sm:text-xs'
                  : 'mt-1 text-[11px] leading-tight sm:text-xs md:text-sm'
              }
            >
              {option.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}
