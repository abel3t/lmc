import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SurveyResultLayout } from '@/components/SurveyResultLayout'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

  return (
    <SurveyResultLayout
      surveyTo="/ngon-ngu-yeu-thuong/khao-sat"
      hasResult={!!result}
      tone="primary"
    >
      {!isLoaded && (
        <div className="mb-3 space-y-2">
          <Skeleton height={20} className="w-full" />
          <Skeleton height={50} className="w-full" />
          <Skeleton height={150} className="w-full" />
        </div>
      )}

      {isLoaded && !result && (
        <div className="mb-5">Chưa có kết quả. Làm khảo sát ngay nhé!</div>
      )}

      {isLoaded && result && (
        <div>
          <p className="mb-5 font-bold">Kết quả của bạn</p>
          <LoveLanguageResultTable result={result} />
        </div>
      )}
    </SurveyResultLayout>
  )
}

function LoveLanguageResultTable({
  result,
}: {
  result: LoveLanguageAggregate[]
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Tên</TableHead>
          <TableHead>Điểm</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...result]
          .sort((a, b) => b.mark - a.mark)
          .map((row, index) => (
            <TableRow key={row.type} className="odd:bg-gray-50">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {LoveLanguageTitle[row.type as LoveLanguageType]}
              </TableCell>
              <TableCell>{row.mark}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
