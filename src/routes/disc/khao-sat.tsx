import { createFileRoute } from '@tanstack/react-router'
import { CircleAlert } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { DiscScaleLegend } from '@/components/DiscScaleLegend'
import { DiscSection } from '@/components/DiscSection'
import { SurveyBackLink } from '@/components/SurveyBackLink'
import { SurveyPageShell } from '@/components/SurveyPageShell'
import { SurveyTitleBar } from '@/components/SurveyTitleBar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { DISC_STORAGE_KEYS, type DiscType, discSections } from '@/constant'
import { buildDiscResultFromAnswers } from '@/lib/disc-scoring'
import { readSurveyStorage, writeSurveyStorage } from '@/lib/survey-storage'
import { isSurveyAnswered } from '@/lib/survey-validation'
import { type DiscSectionState, useDiscStore } from '@/stores/disc.store'

export const Route = createFileRoute('/disc/khao-sat')({
  component: DiscAssessment,
})

function DiscAssessment() {
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const sections = useDiscStore((s) => s.sections)
  const setSections = useDiscStore((s) => s.setSections)
  const updateStatement = useDiscStore((s) => s.updateStatement)

  useEffect(() => {
    const saved = readSurveyStorage<DiscSectionState[]>(
      DISC_STORAGE_KEYS.answers,
    )
    if (saved) {
      setSections(saved)
    }
  }, [setSections])

  const sectionTotals = useMemo(
    () =>
      sections.map((section) =>
        section.statements.reduce(
          (sum, statement) => sum + (statement.value ?? 0),
          0,
        ),
      ),
    [sections],
  )

  const isSurveyComplete = useMemo(
    () =>
      sections.every((section) =>
        section.statements.every((statement) =>
          isSurveyAnswered(statement.value),
        ),
      ),
    [sections],
  )

  const onClickSubmit = () => {
    setIsSubmit(true)
    let hasError = false
    const flatAnswers: Record<string, number | undefined> = {}

    sections.forEach((section) => {
      const sectionMeta = discSections.find(
        (item) => item.type === section.type,
      )
      section.statements.forEach((statement, statementIndex) => {
        const key = `${section.type}-${statementIndex}`
        flatAnswers[key] = statement.value
        if (!isSurveyAnswered(statement.value)) {
          hasError = true
          updateStatement(section.type, statementIndex, { hasError: true })
        }
      })
      if (!sectionMeta) {
        hasError = true
      }
    })

    if (!hasError) {
      const result = buildDiscResultFromAnswers(flatAnswers)
      writeSurveyStorage(DISC_STORAGE_KEYS.answers, sections)
      writeSurveyStorage(DISC_STORAGE_KEYS.result, result)
      window.open('/disc', '_self')
    } else {
      setShowErrorDialog(true)
      setIsSubmit(false)
    }
  }

  return (
    <SurveyPageShell className="bg-emerald-100">
      <div className="mb-2">
        <SurveyBackLink
          to="/disc"
          className="text-emerald-900/70 hover:text-emerald-900"
        />
      </div>
      <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
        <SurveyTitleBar tone="green">Khảo sát cá tính theo DISC</SurveyTitleBar>
        <div className="space-y-3 p-4 text-sm sm:p-5">
          <p>
            Hãy đọc từng nhận định và chọn mức độ{' '}
            <span className="font-medium">phù hợp với bạn</span> theo thang bên
            dưới.
          </p>
          <DiscScaleLegend />
          <p className="text-gray-600">
            Tổng cộng{' '}
            <span className="font-medium text-gray-800">
              {discSections.reduce((n, s) => n + s.statements.length, 0)} nhận
              định
            </span>{' '}
            thuộc 4 nhóm D · I · S · C. Chọn ngay cho từng câu — đừng suy nghĩ
            quá lâu.
          </p>
        </div>
      </div>

      {discSections.map((sectionMeta, sectionIndex) => {
        const sectionState = sections.find(
          (section) => section.type === sectionMeta.type,
        )
        if (!sectionState) return null

        const values = Object.fromEntries(
          sectionState.statements.map((statement, index) => [
            index,
            statement.value,
          ]),
        )
        const errors = Object.fromEntries(
          sectionState.statements.map((statement, index) => [
            index,
            !!statement.hasError,
          ]),
        )

        return (
          <DiscSection
            key={sectionMeta.type}
            title={sectionMeta.title}
            type={sectionMeta.type as DiscType}
            statements={sectionMeta.statements}
            values={values}
            total={sectionTotals[sectionIndex] ?? 0}
            errors={errors}
            onChange={(statementIndex, value) =>
              updateStatement(sectionMeta.type, statementIndex, {
                value,
                hasError: false,
              })
            }
          />
        )
      })}

      <div className="mb-3">
        {isSubmit ? (
          <Button tone="green" disabled>
            <Spinner size={20} className="text-white" />
          </Button>
        ) : (
          <Button
            tone="green"
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
