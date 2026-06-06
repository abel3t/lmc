import { CircleAlert } from 'lucide-react'
import { DISC_SCALE_LABELS, type DiscType } from '@/constant'
import { LikertRating } from './LikertRating'

type DiscSectionProps = {
  title: string
  type: DiscType
  statements: readonly string[]
  values: Record<number, number | undefined>
  total: number
  onChange: (statementIndex: number, value: number) => void
  errors: Record<number, boolean>
}

export function DiscSection({
  title,
  type,
  statements,
  values,
  total,
  onChange,
  errors,
}: DiscSectionProps) {
  const letter = ['D', 'I', 'S', 'C'][type]

  return (
    <>
      <div className="mb-2 w-full">
        <h3 className="text-sm font-semibold text-emerald-900">{title}</h3>
      </div>

      {statements.map((statement, statementIndex) => (
        <div
          key={statement}
          className={`mb-3 w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow sm:p-5 ${
            errors[statementIndex] ? 'ring-2 ring-red-400' : ''
          }`}
        >
          <p className="mb-3 text-sm font-semibold leading-relaxed sm:text-base">
            {statement}
          </p>

          <LikertRating
            name={`disc-${type}-${statementIndex}`}
            value={values[statementIndex]}
            options={DISC_SCALE_LABELS}
            onChange={(value) => onChange(statementIndex, value)}
            accent="green"
            size="compact"
          />

          {errors[statementIndex] && (
            <p className="mt-2 flex items-center text-xs text-red-600">
              <CircleAlert className="mr-2 h-4 w-4" />
              Câu hỏi này là bắt buộc
            </p>
          )}
        </div>
      ))}

      <div className="mb-3 w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-center text-sm font-medium text-emerald-800">
        Tổng điểm {letter}: {total}
      </div>
    </>
  )
}
