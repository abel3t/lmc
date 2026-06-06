import { createFileRoute } from '@tanstack/react-router'
import { CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import LoveLanguageQuestion from '@/components/LoveLanguageQuestion'
import { SurveyBackLink } from '@/components/SurveyBackLink'
import { SurveyPageShell } from '@/components/SurveyPageShell'
import { SurveyScaleLegend } from '@/components/SurveyScaleLegend'
import { SurveyTitleBar } from '@/components/SurveyTitleBar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import {
  LOVE_LANGUAGE_SCALE_LABELS,
  LOVE_LANGUAGE_STORAGE_KEYS,
  LoveLanguageQuestions,
} from '@/constant'
import {
  buildLoveLanguageResultFromQuestions,
  isLoveLanguageSurveyComplete,
} from '@/lib/love-language-scoring'
import { readSurveyStorage, writeSurveyStorage } from '@/lib/survey-storage'
import { useLoveLanguageStore } from '@/stores/love-language.store'

export const Route = createFileRoute('/ngon-ngu-yeu-thuong/khao-sat')({
  component: LoveLanguageAssessment,
})

function LoveLanguageAssessment() {
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const questions = useLoveLanguageStore((s) => s.questions)
  const setQuestions = useLoveLanguageStore((s) => s.setQuestions)
  const updateQuestion = useLoveLanguageStore((s) => s.updateQuestion)

  const isSurveyComplete = isLoveLanguageSurveyComplete(questions)

  useEffect(() => {
    const defaultQuestions = readSurveyStorage(
      LOVE_LANGUAGE_STORAGE_KEYS.questions,
    )
    if (defaultQuestions) {
      setQuestions(defaultQuestions)
    }
  }, [setQuestions])

  const onClickSubmit = () => {
    setIsSubmit(true)

    let hasError = false
    for (const question of Object.values(questions)) {
      let questionHasError = false
      for (const answer of question.answers) {
        if (answer.hasError || !answer.mark) {
          questionHasError = true
          hasError = true
        }
      }

      if (questionHasError) {
        updateQuestion(question.id, { ...question, hasError: true })
      }
    }

    if (!hasError && isLoveLanguageSurveyComplete(questions)) {
      const result = buildLoveLanguageResultFromQuestions(questions)
      writeSurveyStorage(LOVE_LANGUAGE_STORAGE_KEYS.questions, questions)
      writeSurveyStorage(LOVE_LANGUAGE_STORAGE_KEYS.result, result)
      window.open('/ngon-ngu-yeu-thuong', '_self')
    } else {
      setIsSubmit(false)
      setShowErrorDialog(true)
    }
  }

  return (
    <SurveyPageShell className="bg-blue-100">
      <div className="mb-2">
        <SurveyBackLink to="/ngon-ngu-yeu-thuong" />
      </div>
      <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
        <SurveyTitleBar tone="primary">Ngôn ngữ yêu thương</SurveyTitleBar>
        <div className="space-y-3 p-4 text-sm sm:p-5">
          <p>
            Hãy đọc từng câu trong mỗi nhóm và xếp hạng mức độ{' '}
            <span className="font-medium">quan trọng với bạn</span> theo thang
            bên dưới.
          </p>
          <SurveyScaleLegend
            tone="primary"
            title="Thứ tự ưu tiên (1 → 5)"
            labels={LOVE_LANGUAGE_SCALE_LABELS}
          />
          <p className="text-gray-600">
            Tổng cộng{' '}
            <span className="font-medium text-gray-800">
              {LoveLanguageQuestions.length} nhóm
            </span>{' '}
            · mỗi nhóm 5 câu, không được trùng số trong cùng nhóm. Chọn ngay —
            đừng suy nghĩ quá lâu.
          </p>
        </div>
      </div>

      {Object.values(questions).map((question, index) => (
        <LoveLanguageQuestion
          key={question.id}
          index={index + 1}
          question={question}
        />
      ))}

      <div className="mb-3">
        {isSubmit ? (
          <Button tone="primary" disabled>
            <Spinner size={20} className="text-white" />
          </Button>
        ) : (
          <Button
            tone="primary"
            onClick={onClickSubmit}
            disabled={!isSurveyComplete}
          >
            Xem kết quả
          </Button>
        )}
      </div>

      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent>
          <DialogTitle className="flex items-center text-red-600">
            <CircleAlert className="mr-2 h-5 w-5" />
            <span>Hãy trả lời tất cả câu hỏi nào!</span>
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </SurveyPageShell>
  )
}
