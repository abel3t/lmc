import { createFileRoute } from '@tanstack/react-router'
import { CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import LoveLanguageQuestion from '@/components/LoveLanguageQuestion'
import { SurveyBackLink } from '@/components/SurveyBackLink'
import { SurveyTitleBar } from '@/components/SurveyTitleBar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { LOVE_LANGUAGE_STORAGE_KEYS } from '@/constant'
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
    Object.values(questions).forEach((question: any) => {
      question.answers.forEach((answer: any) => {
        if (answer.hasError || !answer.mark) {
          hasError = true
        }
      })

      if (hasError) {
        updateQuestion(question.id, { ...question, hasError: true })
      }
    })

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
    <div
      className="flex min-h-screen flex-col bg-blue-100 py-4 sm:py-5"
      style={{ minHeight: '100vh' }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6">
        <div className="mb-2">
          <SurveyBackLink to="/ngon-ngu-yeu-thuong" />
        </div>
        <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
          <SurveyTitleBar tone="primary">Ngôn ngữ yêu thương</SurveyTitleBar>
          <div className="p-4 text-sm sm:p-5">
            Bạn có biết ngôn ngữ yêu thương của mình, ngôn ngữ mà khi ai đó bày tỏ
            với bạn, bạn sẽ cảm thấy được yêu thương nhất? Quan trọng hơn, bạn có
            biết ngôn ngữ yêu thương của những người chung quanh mình để bày tỏ
            tình yêu thương và sự quan tâm của bạn cho họ theo cách họ mong đợi
            nhất? Bản trắc nghiệm ngôn ngữ yêu thương này sẽ giúp bạn!
          </div>
        </div>

        {Object.values(questions).map((question: any, index: number) => (
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
      </div>
    </div>
  )
}
