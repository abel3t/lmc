import {
  GIFT_MAX_SCORE,
  getGiftBlend,
  sortGiftRowsByScore,
  type GiftScoreRow,
} from '@/lib/gift-scoring'

type GiftResultPanelProps = {
  rows: GiftScoreRow[]
}

function giftProfileLabel(rows: GiftScoreRow[], maxTotal: number): string {
  if (maxTotal <= 0) return '—'
  return sortGiftRowsByScore(rows)
    .filter((row) => row.total === maxTotal)
    .map((row) => row.giftTitle)
    .join(' · ')
}

export function GiftResultPanel({ rows }: GiftResultPanelProps) {
  const ranked = sortGiftRowsByScore(rows)
  const maxTotal = ranked[0]?.total ?? 0
  const blend = getGiftBlend(rows)
  const profile = giftProfileLabel(rows, maxTotal)

  return (
    <div className="space-y-8 print:hidden">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border-2 border-orange-500 bg-orange-50 px-4 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">
            Ân tứ nổi bật
          </p>
          {blend.primary.length > 0 ? (
            <>
              <p className="mt-2 text-2xl font-extrabold leading-snug text-orange-700 sm:text-3xl">
                {blend.primary.map((row) => row.giftTitle).join(' · ')}
              </p>
              <p className="mt-2 text-sm font-medium text-orange-800">
                {blend.primary[0]!.total}/{GIFT_MAX_SCORE} điểm
                {blend.primary.length > 1 ? ' (bằng nhau)' : ''}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-gray-500">—</p>
          )}
        </div>

        <div className="rounded-lg border-2 border-orange-200 bg-white px-4 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Ân tứ tiếp theo
          </p>
          {blend.secondary.length > 0 ? (
            <>
              <p className="mt-2 text-xl font-extrabold leading-snug text-orange-600 sm:text-2xl">
                {blend.secondary.map((row) => row.giftTitle).join(' · ')}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-600">
                {blend.secondary[0]!.total}/{GIFT_MAX_SCORE} điểm
                {blend.secondary.length > 1 ? ' (bằng nhau)' : ''}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-gray-500">
              {blend.primary.length > 1
                ? 'Các ân tứ có điểm bằng nhau ở nhóm cao nhất.'
                : 'Không có nhóm điểm thấp hơn rõ rệt.'}
            </p>
          )}
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        Tổ hợp ân tứ nổi bật:{' '}
        <span className="font-semibold text-orange-700">{profile}</span>
      </p>

      <div className="space-y-3">
        <h3 className="font-semibold">
          Biểu đồ điểm số (trên {GIFT_MAX_SCORE})
        </h3>
        {ranked.map((row) => {
          const percent = Math.round((row.total / GIFT_MAX_SCORE) * 100)
          const isTop = row.total === maxTotal && maxTotal > 0
          return (
            <div key={row.giftType} className="flex items-center gap-3">
              <span
                className="w-28 shrink-0 truncate text-sm font-medium text-gray-800 sm:w-40"
                title={row.giftTitle}
              >
                {row.giftTitle}
              </span>
              <div className="h-7 min-w-0 flex-1 overflow-hidden rounded-md bg-gray-100">
                <div
                  className={`flex h-full items-center justify-end rounded-md px-2 text-xs font-semibold text-white ${
                    isTop ? 'bg-orange-500' : 'bg-orange-400'
                  }`}
                  style={{ width: `${Math.max(percent, 8)}%` }}
                >
                  {row.total}
                </div>
              </div>
              <span className="w-12 shrink-0 text-right text-sm tabular-nums text-gray-600">
                {percent}%
              </span>
            </div>
          )
        })}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Chi tiết từng ân tứ</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {ranked.map((row, index) => {
            const isTop = row.total === maxTotal && maxTotal > 0
            return (
              <article
                key={row.giftType}
                data-testid="gift-result-card"
                className={`rounded-lg border p-4 ${
                  isTop
                    ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-300'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium tabular-nums text-gray-400">
                      #{index + 1}
                    </p>
                    <p className="font-bold leading-snug text-gray-900">
                      {row.giftTitle}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold text-white ${
                      isTop ? 'bg-orange-500' : 'bg-orange-400'
                    }`}
                  >
                    {row.total}/{GIFT_MAX_SCORE}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {row.questionIds.map((questionId, scoreIndex) => (
                    <span
                      key={questionId}
                      className="rounded-md bg-orange-100/80 px-1.5 py-0.5 text-xs tabular-nums text-orange-900"
                    >
                      {questionId}={row.scores[scoreIndex]}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
