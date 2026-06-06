import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SurveyResultLayout } from '@/components/SurveyResultLayout'
import { Skeleton } from '@/components/ui/skeleton'
import { DISC_STORAGE_KEYS, discSections } from '@/constant'
import {
  aggregateDiscScores,
  DISC_MAX_SECTION_SCORE,
  type DiscResultRecord,
  getDiscBlend,
  getDiscProfile,
} from '@/lib/disc-scoring'
import { readSurveyStorage } from '@/lib/survey-storage'
import { printWithoutBrowserHeader } from '@/lib/utils'

export const Route = createFileRoute('/disc/')({
  component: DiscResults,
})

const LETTERS = ['D', 'I', 'S', 'C'] as const

function DiscResults() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [result, setResult] = useState<DiscResultRecord | null>(null)

  useEffect(() => {
    const storageResult = readSurveyStorage<DiscResultRecord>(
      DISC_STORAGE_KEYS.result,
    )

    if (storageResult) {
      setResult(storageResult)
    }

    setIsLoaded(true)
  }, [])

  const sectionScores = result ? aggregateDiscScores(result) : []
  const profile = result ? getDiscProfile(sectionScores) : ''
  const maxTotal = sectionScores.length
    ? Math.max(...sectionScores.map((s) => s.total))
    : 0

  const ranked = [...sectionScores].sort((a, b) => b.total - a.total)
  const blend = getDiscBlend(sectionScores)

  const handlePrint = () => printWithoutBrowserHeader()

  return (
    <SurveyResultLayout
      surveyTo="/disc/khao-sat"
      hasResult={!!result}
      tone="green"
    >
      {!isLoaded && (
        <div className="mb-3 space-y-2">
          <Skeleton height={20} className="w-full" />
          <Skeleton height={80} className="w-full" />
          <Skeleton height={120} className="w-full" />
        </div>
      )}

      {isLoaded && !result && (
        <div className="mb-5">Chưa có kết quả. Làm khảo sát ngay nhé!</div>
      )}

      {isLoaded && result && (
        <div className="space-y-8 [print-color-adjust:exact]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold sm:text-2xl">
              Kết quả DISC của bạn
            </h2>
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 print:hidden"
            >
              In kết quả
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border-2 border-emerald-500 bg-emerald-50 px-4 py-5 text-center">
              <p className="text-xs uppercase tracking-wide text-emerald-700">
                Cá tính chính
              </p>
              <p className="mt-1 text-3xl font-extrabold text-emerald-700">
                {blend.primary.map((s) => LETTERS[s.type]).join(' / ') || '—'}
              </p>
              <p className="mt-1 text-sm font-medium text-emerald-800">
                {blend.primary.map((s) => s.title).join('  •  ')}
              </p>
            </div>

            <div className="rounded-lg border-2 border-emerald-200 bg-white px-4 py-5 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Cá tính phụ
              </p>
              {blend.secondary.length > 0 ? (
                <>
                  <p className="mt-1 text-3xl font-extrabold text-emerald-500">
                    {blend.secondary.map((s) => LETTERS[s.type]).join(' / ')}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-600">
                    {blend.secondary.map((s) => s.title).join('  •  ')}
                  </p>
                </>
              ) : (
                <p className="mt-3 text-sm text-gray-500">
                  Các nhóm có điểm bằng nhau — không có cá tính phụ rõ rệt.
                </p>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Tổ hợp tính cách của bạn:{' '}
            <span className="font-semibold text-emerald-700">
              {profile || '—'}
            </span>
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold">
              Biểu đồ điểm số (trên {DISC_MAX_SECTION_SCORE})
            </h3>
            {sectionScores.map((section) => {
              const percent = Math.round(
                (section.total / DISC_MAX_SECTION_SCORE) * 100,
              )
              const isTop = section.total === maxTotal
              return (
                <div key={section.type} className="flex items-center gap-3">
                  <span className="w-8 shrink-0 text-center text-lg font-bold">
                    {LETTERS[section.type]}
                  </span>
                  <div className="h-7 flex-1 overflow-hidden rounded-md bg-gray-100">
                    <div
                      className={`flex h-full items-center justify-end rounded-md px-2 text-xs font-semibold text-white ${
                        isTop ? 'bg-emerald-600' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${Math.max(percent, 8)}%` }}
                    >
                      {section.total}
                    </div>
                  </div>
                  <span className="w-12 shrink-0 text-right text-sm text-gray-600">
                    {percent}%
                  </span>
                </div>
              )
            })}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Chi tiết từng nhóm</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {ranked.map((section) => {
                const meta = discSections.find((s) => s.type === section.type)
                const isTop = section.total === maxTotal
                return (
                  <div
                    key={section.type}
                    className={`rounded-lg border p-4 ${
                      isTop
                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-300'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="mb-2 flex items-baseline justify-between gap-2">
                      <p className="font-bold">{section.title}</p>
                      <span className="shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
                        {section.total}/{DISC_MAX_SECTION_SCORE}
                      </span>
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                      {meta?.statements.map((statement) => (
                        <li key={statement}>{statement}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </SurveyResultLayout>
  )
}
