import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { NextGenGiftResultPanel } from '@/components/NextGenGiftResultPanel'
import { SurveyResultLayout } from '@/components/SurveyResultLayout'
import { Skeleton } from '@/components/ui/skeleton'
import { NEXT_GEN_GIFT_STORAGE_KEYS } from '@/constant'
import {
  buildNextGenGiftMatrixRows,
  type NextGenGiftResultRecord,
  type NextGenGiftScoreRow,
} from '@/lib/next-gen-gift-scoring'
import { readSurveyStorage } from '@/lib/survey-storage'
import { printWithoutBrowserHeader } from '@/lib/utils'

export const Route = createFileRoute('/an-tu-thuoc-linh-next-gen/')({
  component: NextGenGiftTab,
})

function NextGenGiftTab() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [matrixRows, setMatrixRows] = useState<NextGenGiftScoreRow[] | null>(
    null,
  )

  useEffect(() => {
    const storageResult = readSurveyStorage<NextGenGiftResultRecord>(
      NEXT_GEN_GIFT_STORAGE_KEYS.result,
    )

    if (storageResult && Object.keys(storageResult).length > 0) {
      setMatrixRows(buildNextGenGiftMatrixRows(storageResult))
    }

    setIsLoaded(true)
  }, [])

  const handlePrint = () => printWithoutBrowserHeader()

  return (
    <SurveyResultLayout
      surveyTo="/an-tu-thuoc-linh-next-gen/khao-sat"
      hasResult={!!matrixRows}
      tone="orange"
    >
      {!isLoaded && (
        <div className="mb-3 space-y-2">
          <Skeleton height={20} className="w-full" />
          <Skeleton height={80} className="w-full" />
          <Skeleton height={120} className="w-full" />
        </div>
      )}

      {isLoaded && !matrixRows && (
        <div className="mb-5">Chưa có kết quả. Làm khảo sát ngay nhé!</div>
      )}

      {isLoaded && matrixRows && (
        <div className="space-y-8 [print-color-adjust:exact]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold sm:text-2xl">
              Kết quả ân tứ thuộc linh của em
            </h2>
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 print:hidden"
            >
              In kết quả
            </button>
          </div>

          <NextGenGiftResultPanel rows={matrixRows} />
        </div>
      )}
    </SurveyResultLayout>
  )
}
