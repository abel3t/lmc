import { CircleAlert } from 'lucide-react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { isLoveLanguageRank } from '@/lib/love-language-scoring'
import {
  type LoveLanguageAnswerState,
  type LoveLanguageQuestionState,
  useLoveLanguageStore,
} from '@/stores/love-language.store'

type LoveLanguageProps = {
  index: number
  question: LoveLanguageQuestionState
}

export default function LoveLanguageQuestion({
  index,
  question,
}: LoveLanguageProps) {
  const updateQuestion = useLoveLanguageStore((s) => s.updateQuestion)

  const isDuplicateMark = (answer: LoveLanguageAnswerState) =>
    isLoveLanguageRank(answer.mark) &&
    question.answers.filter((a) => a.mark === answer.mark).length > 1
  const hasInvalidMark = question.answers.some(
    (answer) => answer.mark != null && !isLoveLanguageRank(answer.mark),
  )
  const hasDuplicateMark = question.answers.some(isDuplicateMark)

  const handleChange = (
    aIndex: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const answers: LoveLanguageAnswerState[] = question.answers.map(
      (answer) => ({ ...answer }),
    )
    const raw = event.target.value.trim()
    // Keep non-integers (e.g. pasted 4.5) so they show as invalid instead of
    // being silently truncated.
    answers[aIndex].mark = raw === '' ? undefined : Number(raw)

    // Flag every answer sharing a mark (not just the later one) so both show red.
    for (const answer of answers) {
      if (answer.mark == null) {
        answer.hasError = false
        continue
      }
      const sameMarkCount = answers.filter((a) => a.mark === answer.mark).length
      answer.hasError = sameMarkCount > 1 || !isLoveLanguageRank(answer.mark)
    }

    updateQuestion(question.id, { ...question, answers, hasError: false })
  }

  // Only whole numbers: block decimal separators, exponent and sign keys.
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (['.', ',', 'e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault()
    }
  }

  return (
    <div
      className={`mb-3 w-full rounded-xl border border-rose-100 bg-white p-3 shadow-sm sm:p-4 md:p-5 ${
        question.hasError ? 'border-red-400 ring-2 ring-red-300' : ''
      }`}
    >
      <div className="mb-3 text-base font-semibold text-rose-900 sm:text-lg">
        Nhóm {index}
      </div>

      <div className="flex flex-col">
        {question.answers.map((answer, aIndex) => (
          <div
            key={answer.type}
            className="inline-flex items-center justify-start py-2"
          >
            <Input
              id={`q${index}-a${aIndex}`}
              type="number"
              min={1}
              max={5}
              step={1}
              inputMode="numeric"
              value={answer.mark ?? ''}
              error={!!answer.hasError}
              aria-invalid={!!answer.hasError}
              onChange={(event) => handleChange(aIndex, event)}
              onKeyDown={handleKeyDown}
              className={`w-[45px] text-center ${
                answer.hasError ? 'font-bold text-red-600' : ''
              }`}
            />

            <div className="ml-5 font-semibold">
              {answer.text && <p>{answer.text}</p>}
              {answer.textMale && (
                <div>
                  <p>{answer.textMale}</p>
                  <p>{answer.textFemale}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasInvalidMark && (
        <p className="mt-2 flex items-center text-xs text-red-600">
          <CircleAlert className="mr-2 h-4 w-4" />
          Chỉ nhập số nguyên từ 1 đến 5
        </p>
      )}

      {hasDuplicateMark && (
        <p className="mt-2 flex items-center text-xs text-red-600">
          <CircleAlert className="mr-2 h-4 w-4" />
          Mỗi số điểm từ 1 đến 5 chỉ được dùng một lần trong nhóm
        </p>
      )}

      {question.hasError && (
        <p className="mt-2 flex items-center text-xs text-red-600">
          <CircleAlert className="mr-2 h-4 w-4" />
          Câu hỏi này là bắt buộc
        </p>
      )}
    </div>
  )
}
