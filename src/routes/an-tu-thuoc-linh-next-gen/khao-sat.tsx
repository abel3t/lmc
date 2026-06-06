import { createFileRoute } from '@tanstack/react-router'
import { CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import GiftQuestion from '@/components/GiftQuestion'
import { SurveyBackLink } from '@/components/SurveyBackLink'
import { SurveyPageShell } from '@/components/SurveyPageShell'
import { SurveyScaleLegend } from '@/components/SurveyScaleLegend'
import { SurveyTitleBar } from '@/components/SurveyTitleBar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import {
  NEXT_GEN_GIFT_SCALE_LABELS,
  NEXT_GEN_GIFT_STORAGE_KEYS,
  nextGenGiftQuestions,
} from '@/constant'
import {
  buildNextGenGiftResultFromAnswers,
  isNextGenGiftSurveyComplete,
  NEXT_GEN_GIFT_CATEGORY_COUNT,
} from '@/lib/next-gen-gift-scoring'
import { readSurveyStorage, writeSurveyStorage } from '@/lib/survey-storage'
import { isSurveyAnswered } from '@/lib/survey-validation'
import { useNextGenGiftStore } from '@/stores/next-gen-gift.store'

export const Route = createFileRoute('/an-tu-thuoc-linh-next-gen/khao-sat')({
  component: NextGenGiftAssessment,
})

function NextGenGiftAssessment() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const questions = useNextGenGiftStore((s) => s.questions)
  const setQuestions = useNextGenGiftStore((s) => s.setQuestions)
  const updateQuestion = useNextGenGiftStore((s) => s.updateQuestion)

  const totalPerPage = 10
  const totalPages = Math.ceil(nextGenGiftQuestions.length / totalPerPage)

  const pageQuestions = Object.values(questions).slice(
    (currentPage - 1) * totalPerPage,
    currentPage * totalPerPage,
  )

  const allAnswers = Object.fromEntries(
    Object.values(questions).map((question) => [
      String(question.id),
      question.value,
    ]),
  )
  const isSurveyComplete = isNextGenGiftSurveyComplete(allAnswers)
  const isCurrentPageComplete = pageQuestions.every((question) =>
    isSurveyAnswered(question.value),
  )
  const canSubmit = isSurveyComplete && isCurrentPageComplete

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to top when paginating
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  useEffect(() => {
    const defaultQuestions = readSurveyStorage(
      NEXT_GEN_GIFT_STORAGE_KEYS.questions,
    )
    if (defaultQuestions) {
      setQuestions(defaultQuestions)
    }
  }, [setQuestions])

  const onClickPrev = () => setCurrentPage(currentPage - 1)

  const onClickNext = () => {
    setIsSubmit(false)

    let hasError = false
    Object.values(questions)
      .slice((currentPage - 1) * totalPerPage, currentPage * totalPerPage)
      .forEach((question) => {
        if (!isSurveyAnswered(question.value)) {
          hasError = true
          updateQuestion(question.id, { hasError: true })
        }
      })

    if (!hasError) {
      setCurrentPage(currentPage + 1)
    } else {
      setShowErrorDialog(true)
    }
  }

  const onClickSubmit = () => {
    setIsSubmit(true)

    let hasError = false
    for (const question of Object.values(questions)) {
      if (!isSurveyAnswered(question.value)) {
        hasError = true
        updateQuestion(question.id, { hasError: true })
      }
    }

    if (!hasError) {
      const answers = Object.fromEntries(
        Object.values(questions).map((question) => [
          String(question.id),
          question.value as number,
        ]),
      )

      if (isNextGenGiftSurveyComplete(answers)) {
        writeSurveyStorage(NEXT_GEN_GIFT_STORAGE_KEYS.questions, questions)
        writeSurveyStorage(
          NEXT_GEN_GIFT_STORAGE_KEYS.result,
          buildNextGenGiftResultFromAnswers(answers),
        )
        window.open('/an-tu-thuoc-linh-next-gen', '_self')
      } else {
        setShowErrorDialog(true)
        setIsSubmit(false)
      }
    } else {
      setShowErrorDialog(true)
      setIsSubmit(false)
    }
  }

  return (
    <SurveyPageShell className="bg-orange-100">
      <div className="mb-2">
        <SurveyBackLink
          to="/an-tu-thuoc-linh-next-gen"
          className="text-orange-900/70 hover:text-orange-900"
        />
      </div>
      <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
        <SurveyTitleBar tone="orange">Ân tứ thuộc linh</SurveyTitleBar>
        <div className="space-y-3 p-4 text-sm sm:p-5">
          <p>
            Em hãy đọc từng nhận định và chọn mức độ{' '}
            <span className="font-medium">giống với em</span> theo thang bên
            dưới.
          </p>
          <SurveyScaleLegend
            tone="orange"
            title="Thang điểm (0 → 3)"
            labels={NEXT_GEN_GIFT_SCALE_LABELS}
          />
          <p className="text-gray-600">
            Tổng cộng{' '}
            <span className="font-medium text-gray-800">
              {nextGenGiftQuestions.length} nhận định
            </span>{' '}
            thuộc {NEXT_GEN_GIFT_CATEGORY_COUNT} nhóm ân tứ. Chọn ngay cho từng
            câu — đừng suy nghĩ quá lâu.
          </p>
        </div>
      </div>

      {pageQuestions.map((question) => (
        <GiftQuestion
          index={question.id}
          key={question.id}
          text={question.text}
          value={question.value}
          error={question.hasError ? 'Câu hỏi này là bắt buộc' : undefined}
          onChange={(value) =>
            updateQuestion(question.id, { value, hasError: false })
          }
          isNextGen
        />
      ))}

      <div className="mb-3">
        {currentPage === 1 && (
          <Button tone="orange" onClick={onClickNext}>
            Tiếp tục
          </Button>
        )}

        {currentPage > 1 && currentPage < totalPages && (
          <div className="flex gap-3">
            <Button tone="neutral" onClick={onClickPrev}>
              Quay lại
            </Button>
            <Button tone="orange" onClick={onClickNext}>
              Tiếp tục
            </Button>
          </div>
        )}

        {currentPage === totalPages && (
          <div className="flex gap-3">
            <Button tone="neutral" onClick={onClickPrev}>
              Quay lại
            </Button>
            {isSubmit ? (
              <Button tone="orange" disabled>
                <Spinner size={20} className="text-white" />
              </Button>
            ) : (
              <Button
                tone="orange"
                onClick={onClickSubmit}
                disabled={!canSubmit}
              >
                Xem kết quả
              </Button>
            )}
          </div>
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
