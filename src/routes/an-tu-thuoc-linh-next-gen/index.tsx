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
import { NEXT_GEN_GIFT_STORAGE_KEYS, NextGenGiftTitle, type NextGenGiftType } from '@/constant'
import {
  aggregateNextGenGiftScores,
  type NextGenGiftAggregate,
  type NextGenGiftResultRecord,
} from '@/lib/next-gen-gift-scoring'
import { readSurveyStorage } from '@/lib/survey-storage'

export const Route = createFileRoute('/an-tu-thuoc-linh-next-gen/')({
  component: NextGenGiftTab,
})

function NextGenGiftTab() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [result, setResult] = useState<NextGenGiftAggregate[] | null>(null)

  useEffect(() => {
    const storageResult = readSurveyStorage<NextGenGiftResultRecord>(
      NEXT_GEN_GIFT_STORAGE_KEYS.result,
    )

    if (storageResult && Object.keys(storageResult).length > 0) {
      setResult(aggregateNextGenGiftScores(storageResult))
    }

    setIsLoaded(true)
  }, [])

  return (
    <SurveyResultLayout
      surveyTo="/an-tu-thuoc-linh-next-gen/khao-sat"
      hasResult={!!result}
      tone="orange"
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
          <NextGenGiftResultTable result={result} />
        </div>
      )}
    </SurveyResultLayout>
  )
}

function NextGenGiftResultTable({ result }: { result: NextGenGiftAggregate[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Tên ân tứ</TableHead>
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
                {NextGenGiftTitle[row.type as NextGenGiftType]}
              </TableCell>
              <TableCell>{row.mark}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
