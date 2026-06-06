import { createFileRoute } from '@tanstack/react-router'
import { useForm, useStore } from '@tanstack/react-form'
import { CircleAlert } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import GiftQuestion from '@/components/GiftQuestion'
import { SurveyBackLink } from '@/components/SurveyBackLink'
import { SurveyPageShell } from '@/components/SurveyPageShell'
import { SurveyScaleLegend } from '@/components/SurveyScaleLegend'
import { SurveyTitleBar } from '@/components/SurveyTitleBar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import {
  GIFT_REQUIRED_MESSAGE,
  GIFT_SCALE_LABELS,
  GIFT_STORAGE_KEYS,
  giftQuestions,
} from '@/constant'
import { type GiftAnswers, GIFT_CATEGORY_COUNT, isGiftSurveyComplete } from '@/lib/gift-scoring'
import { isSurveyAnswered } from '@/lib/survey-validation'
import { readSurveyStorage, writeSurveyStorage } from '@/lib/survey-storage'

export const Route = createFileRoute('/an-tu-thuoc-linh/khao-sat')({
  component: GiftAssessment,
})

const TOTAL_PER_PAGE = 10
const TOTAL_PAGES = Math.ceil(giftQuestions.length / TOTAL_PER_PAGE)

type FormValues = Record<string, number | undefined>

const fieldName = (id: number | string) => `q${id}`

function loadStoredAnswers(): GiftAnswers {
  return readSurveyStorage<GiftAnswers>(GIFT_STORAGE_KEYS.answers) ?? {}
}

function toAnswers(values: FormValues): GiftAnswers {
  const answers: GiftAnswers = {}
  for (const question of giftQuestions) {
    answers[String(question.id)] = values[fieldName(question.id)]
  }
  return answers
}

const requiredValidator = ({ value }: { value: number | undefined }) =>
  isSurveyAnswered(value) ? undefined : GIFT_REQUIRED_MESSAGE

function GiftAssessment() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const defaultValues = useMemo<FormValues>(() => {
    const stored = loadStoredAnswers()
    const values: FormValues = {}
    for (const question of giftQuestions) {
      values[fieldName(question.id)] = stored[String(question.id)]
    }
    return values
  }, [])

  const form = useForm({ defaultValues })
  const formValues = useStore(form.store, (state) => state.values)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const pageQuestions = giftQuestions.slice(
    (currentPage - 1) * TOTAL_PER_PAGE,
    currentPage * TOTAL_PER_PAGE,
  )

  const mergedAnswers = {
    ...loadStoredAnswers(),
    ...toAnswers(formValues),
  }
  const isSurveyComplete = isGiftSurveyComplete(mergedAnswers)
  const isCurrentPageComplete = pageQuestions.every((question) =>
    isSurveyAnswered(mergedAnswers[String(question.id)]),
  )
  const canSubmit = isSurveyComplete && isCurrentPageComplete

  const persist = () => {
    const answers = { ...loadStoredAnswers(), ...toAnswers(formValues) }
    writeSurveyStorage(GIFT_STORAGE_KEYS.answers, answers)
  }

  const validatePage = () => {
    for (const question of pageQuestions) {
      form.validateField(fieldName(question.id), 'submit')
    }
    const values = form.state.values
    return pageQuestions.every((question) =>
      isSurveyAnswered(values[fieldName(question.id)]),
    )
  }

  const onClickPrev = () => {
    persist()
    setCurrentPage((page) => page - 1)
  }

  const onClickNext = () => {
    setIsSubmit(false)
    if (validatePage()) {
      persist()
      setCurrentPage((page) => page + 1)
    } else {
      setShowErrorDialog(true)
    }
  }

  const onClickSubmit = () => {
    setIsSubmit(true)

    const pageValid = validatePage()
    const answers = { ...loadStoredAnswers(), ...toAnswers(formValues) }

    if (pageValid && isGiftSurveyComplete(answers)) {
      writeSurveyStorage(GIFT_STORAGE_KEYS.answers, answers)
      window.open('/an-tu-thuoc-linh', '_self')
    } else {
      setShowErrorDialog(true)
      setIsSubmit(false)
    }
  }

  return (
    <SurveyPageShell className="bg-orange-100">
      <div className="mb-2">
        <SurveyBackLink
          to="/an-tu-thuoc-linh"
          className="text-orange-900/70 hover:text-orange-900"
        />
      </div>
      <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
        <SurveyTitleBar tone="orange">
          Bảng đánh giá ân tứ thuộc linh
        </SurveyTitleBar>
        <div className="space-y-3 p-4 text-sm sm:p-5">
          <p>
            Hãy đọc từng nhận định và chọn mức độ{' '}
            <span className="font-medium">đúng với bạn</span> theo thang bên
            dưới.
          </p>
          <SurveyScaleLegend
            tone="orange"
            title="Thang điểm (0 → 3)"
            labels={GIFT_SCALE_LABELS}
          />
          <p className="text-gray-600">
            Tổng cộng{' '}
            <span className="font-medium text-gray-800">
              {giftQuestions.length} nhận định
            </span>{' '}
            thuộc {GIFT_CATEGORY_COUNT} nhóm ân tứ. Chọn ngay cho từng câu — đừng suy nghĩ quá
            lâu.
          </p>
        </div>
      </div>

      {pageQuestions.map((question) => (
        <form.Field
          key={question.id}
          name={fieldName(question.id)}
          validators={{ onChange: requiredValidator, onSubmit: requiredValidator }}
        >
          {(field) => (
            <GiftQuestion
              index={question.id}
              text={question.text}
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              error={field.state.meta.errors[0] as string | undefined}
            />
          )}
        </form.Field>
      ))}

      <div className="mb-3">
        {currentPage === 1 && (
          <Button tone="orange" onClick={onClickNext}>
            Tiếp tục
          </Button>
        )}

        {currentPage > 1 && currentPage < TOTAL_PAGES && (
          <div className="flex gap-3">
            <Button tone="neutral" onClick={onClickPrev}>
              Quay lại
            </Button>
            <Button tone="orange" onClick={onClickNext}>
              Tiếp tục
            </Button>
          </div>
        )}

        {currentPage === TOTAL_PAGES && (
          <div className="flex gap-3">
            <Button tone="neutral" onClick={onClickPrev}>
              Quay lại
            </Button>
            {isSubmit ? (
              <Button tone="orange" disabled>
                <Spinner size={20} className="text-white" />
              </Button>
            ) : (
              <Button tone="orange" onClick={onClickSubmit} disabled={!canSubmit}>
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
