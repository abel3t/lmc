import { CircleAlert } from 'lucide-react'
import { GIFT_SCALE_LABELS, NEXT_GEN_GIFT_SCALE_LABELS } from '@/constant'
import { LikertRating } from './LikertRating'

type GiftQuestionProps = {
  index: number
  text: string
  value: number | undefined
  onChange: (value: number) => void
  error?: string | null
  isNextGen?: boolean
}

export default function GiftQuestion({
  index,
  text,
  value,
  onChange,
  error,
  isNextGen = false,
}: GiftQuestionProps) {
  const options = isNextGen ? NEXT_GEN_GIFT_SCALE_LABELS : GIFT_SCALE_LABELS

  return (
    <div
      className={`mb-3 w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow sm:p-5 ${
        error ? 'ring-2 ring-red-400' : ''
      }`}
    >
      <div className="mb-3 text-sm font-semibold leading-relaxed sm:text-base">
        {index}. {text}
      </div>

      <LikertRating
        name={`gift-q-${isNextGen ? 'ng-' : ''}${index}`}
        value={value}
        options={options}
        onChange={onChange}
        accent="orange"
      />

      {error && (
        <p className="mt-2 flex items-center text-xs text-red-600">
          <CircleAlert className="mr-2 h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
}
