import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SurveyResultLayout } from '@/components/SurveyResultLayout'
import { Skeleton } from '@/components/ui/skeleton'
import {
  LOVE_LANGUAGE_STORAGE_KEYS,
  LoveLanguageTitle,
  type LoveLanguageType,
} from '@/constant'
import {
  aggregateLoveLanguageScores,
  type LoveLanguageAggregate,
  type LoveLanguageResultRecord,
} from '@/lib/love-language-scoring'
import { readSurveyStorage } from '@/lib/survey-storage'

export const Route = createFileRoute('/ngon-ngu-yeu-thuong/')({
  component: LoveLanguageTab,
})

const LOVE_LANGUAGE_MAX_SCORE = 25

function LoveLanguageTab() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [result, setResult] = useState<LoveLanguageAggregate[] | null>(null)

  useEffect(() => {
    const storageResult = readSurveyStorage<LoveLanguageResultRecord>(
      LOVE_LANGUAGE_STORAGE_KEYS.result,
    )

    if (storageResult && Object.keys(storageResult).length > 0) {
      setResult(aggregateLoveLanguageScores(storageResult))
    }

    setIsLoaded(true)
  }, [])

  const ranked = result ? [...result].sort((a, b) => b.mark - a.mark) : []
  const topScore = ranked[0]?.mark ?? 0
  const topLanguages = ranked.filter((row) => row.mark === topScore)

  return (
    <SurveyResultLayout
      surveyTo="/ngon-ngu-yeu-thuong/khao-sat"
      hasResult={!!result}
      tone="rose"
    >
      {!isLoaded && (
        <div className="mb-3 space-y-2">
          <Skeleton height={20} className="w-full" />
          <Skeleton height={50} className="w-full" />
          <Skeleton height={150} className="w-full" />
        </div>
      )}

      {isLoaded && !result && (
        <div className="rounded-lg border border-rose-100 bg-rose-50/60 px-4 py-5 text-center text-gray-700">
          Chưa có kết quả. Làm khảo sát ngay nhé!
        </div>
      )}

      {isLoaded && result && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold sm:text-2xl">
            Kết quả ngôn ngữ yêu thương của bạn
          </h2>

          {topLanguages.length > 0 && (
            <div className="rounded-lg border-2 border-rose-500 bg-rose-50 px-4 py-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
                Ngôn ngữ nổi bật
              </p>
              <p className="mt-2 text-2xl font-extrabold leading-snug text-rose-700 sm:text-3xl">
                {topLanguages
                  .map((row) => LoveLanguageTitle[row.type as LoveLanguageType])
                  .join(' · ')}
              </p>
              <p className="mt-2 text-sm font-medium text-rose-800">
                {topScore}/{LOVE_LANGUAGE_MAX_SCORE} điểm
                {topLanguages.length > 1 ? ' (bằng nhau)' : ''}
              </p>
            </div>
          )}

          <LoveLanguageResultTable result={ranked} topScore={topScore} />
        </div>
      )}
    </SurveyResultLayout>
  )
}

function LoveLanguageResultTable({
  result,
  topScore,
}: {
  result: LoveLanguageAggregate[]
  topScore: number
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-rose-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-rose-600 text-left text-xs font-semibold uppercase tracking-wide text-white">
            <th className="px-4 py-3">Hạng</th>
            <th className="px-4 py-3">Ngôn ngữ yêu thương</th>
            <th className="px-4 py-3 text-right">Điểm</th>
          </tr>
        </thead>
        <tbody>
          {result.map((row, index) => {
            const isTop = row.mark === topScore && topScore > 0
            return (
              <tr
                key={row.type}
                className={
                  isTop
                    ? 'bg-rose-50 font-medium text-rose-900'
                    : index % 2 === 0
                      ? 'bg-white'
                      : 'bg-gray-50'
                }
              >
                <td className="border-t border-rose-100 px-4 py-3 text-gray-600">
                  {index + 1}
                </td>
                <td className="border-t border-rose-100 px-4 py-3">
                  {LoveLanguageTitle[row.type as LoveLanguageType]}
                </td>
                <td className="border-t border-rose-100 px-4 py-3 text-right font-semibold tabular-nums">
                  {row.mark}/{LOVE_LANGUAGE_MAX_SCORE}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
