import { CircleAlert } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
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

  const handleChange = (
    aIndex: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const answers: LoveLanguageAnswerState[] = question.answers.map(
      (answer) => ({ ...answer }),
    )
    const value = Number.parseInt(event.target.value, 10)
    answers[aIndex].mark = value

    const answerMarks = answers.map((answer) => answer.mark)

    for (let i = 0; i < answers.length; i++) {
      const idx = answerMarks.indexOf(answers[i].mark)
      answers[i].hasError = !!answers[i].mark && idx >= 0 && idx !== i
    }

    answers[aIndex].hasError =
      !!answers[aIndex].hasError || value <= 0 || value > 5

    updateQuestion(question.id, { ...question, answers, hasError: false })
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
              value={answer.mark || ''}
              error={!!answer.hasError}
              onChange={(event) => handleChange(aIndex, event)}
              className="w-[45px] text-center"
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

      {question.hasError && (
        <p className="mt-2 flex items-center text-xs text-red-600">
          <CircleAlert className="mr-2 h-4 w-4" />
          Câu hỏi này là bắt buộc
        </p>
      )}
    </div>
  )
}
