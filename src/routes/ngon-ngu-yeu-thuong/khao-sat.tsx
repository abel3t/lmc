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
import { LOVE_LANGUAGE_SCALE_LABELS, LoveLanguageQuestions } from '@/constant'
import {
  isLoveLanguageSurveyComplete,
  toLoveLanguageAnswers,
} from '@/lib/love-language-scoring'
import { loveLanguageStorage } from '@/lib/survey-persistence'
import { readSurveyStorage, writeSurveyStorage } from '@/lib/survey-storage'
import {
  buildLoveLanguageQuestions,
  useLoveLanguageStore,
} from '@/stores/love-language.store'

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
    const saved = readSurveyStorage(loveLanguageStorage)
    if (saved) {
      setQuestions(buildLoveLanguageQuestions(saved))
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
      writeSurveyStorage(loveLanguageStorage, toLoveLanguageAnswers(questions))
      window.open('/ngon-ngu-yeu-thuong', '_self')
    } else {
      setIsSubmit(false)
      setShowErrorDialog(true)
    }
  }

  return (
    <SurveyPageShell className="bg-rose-50">
      <div className="mb-2">
        <SurveyBackLink to="/ngon-ngu-yeu-thuong" />
      </div>
      <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
        <SurveyTitleBar tone="rose">Ngôn ngữ yêu thương</SurveyTitleBar>
        <div className="space-y-3 p-4 text-sm sm:p-5">
          <p>
            Hãy đọc từng câu trong mỗi nhóm và chấm điểm theo mức độ bạn{' '}
            <span className="font-medium">cảm nhận được yêu thương</span> khi ai
            đó làm điều này cho mình.
          </p>
          <SurveyScaleLegend
            tone="rose"
            title="Thang điểm 1 đến 5"
            labels={LOVE_LANGUAGE_SCALE_LABELS}
          />
          <p className="text-gray-600">
            Tổng cộng{' '}
            <span className="font-medium text-gray-800">
              {LoveLanguageQuestions.length} nhóm
            </span>{' '}
            · mỗi nhóm 5 câu, không chấm trùng số điểm trong một nhóm. Chọn ngay
            — đừng suy nghĩ quá lâu.
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
          <Button tone="rose" disabled>
            Đang xử lý...
          </Button>
        ) : (
          <Button
            tone="rose"
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
