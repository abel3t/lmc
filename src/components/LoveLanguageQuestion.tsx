import { CircleAlert } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { useLoveLanguageStore } from '@/stores/love-language.store'

type LoveLanguageProps = {
  index: number
  question: any
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
    const answers: any = JSON.parse(JSON.stringify(question.answers))
    const value = parseInt(event.target.value)
    answers[aIndex].mark = value

    const answerMarks = answers.map((answer: any) => answer.mark)

    for (let i = 0; i < answers.length; i++) {
      const idx = answerMarks.indexOf(answers[i].mark)
      answers[i].hasError = answers[i].mark && idx >= 0 && idx !== i
    }

    answers[aIndex].hasError =
      answers[aIndex].hasError || value <= 0 || value > 5

    updateQuestion(question.id, { ...question, answers, hasError: false })
  }

  return (
    <div
      className={`w-full md:w-3/4 lg:w-2/3 p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${
        question.hasError ? 'border border-red-500' : ''
      }`}
    >
      <div className="text-lg mb-2">
        <strong>Nhóm {index}:</strong>
      </div>

      <div className="flex flex-col">
        {question.answers.map((answer: any, aIndex: number) => (
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

            <div className="ml-5">
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
