import type { GiftScoreRow } from '@/lib/gift-scoring'

type GiftResultMatrixProps = {
  rows: GiftScoreRow[]
}

export function GiftResultMatrix({ rows }: GiftResultMatrixProps) {
  return (
    <div className="space-y-6 [print-color-adjust:exact]">
      <div className="overflow-hidden rounded-lg border-2 border-orange-500 print:rounded-none print:border-orange-400">
        <div className="bg-orange-500 px-4 py-3 text-center font-bold text-white print:px-2 print:py-1.5 print:text-xs">
          <div className="leading-tight tracking-wide">BẢNG KẾT QUẢ</div>
          <div className="leading-tight tracking-wide print:text-base">
            KHẢO SÁT ÂN TỨ THUỘC LINH
          </div>
        </div>

        <div className="gift-result-scroll overflow-x-auto print:overflow-visible">
          <table className="gift-result-table w-full min-w-[720px] border-collapse text-sm print:min-w-0 print:w-full print:table-fixed print:text-[7px]">
            <colgroup>
              <col className="print:w-[4%]" />
              {rows[0]?.questionIds.map((id) => (
                <col key={id} className="print:w-[8%]" />
              ))}
              <col className="print:w-[7%]" />
              <col className="print:w-[29%]" />
            </colgroup>
            <thead>
              <tr className="bg-orange-100 text-xs font-semibold text-orange-900 print:text-[7px]">
                <th className="border border-orange-200 px-2 py-2 print:px-0.5 print:py-1">
                  STT
                </th>
                <th
                  colSpan={rows[0]?.questionIds.length ?? 7}
                  className="border border-orange-200 px-2 py-2 print:px-0.5 print:py-1"
                />
                <th className="border border-orange-200 px-2 py-2 print:px-0.5 print:py-1">
                  Tổng
                </th>
                <th className="border border-orange-200 px-2 py-2 text-left print:px-1 print:py-1">
                  Ân tứ
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.giftType}
                  className="odd:bg-orange-50 even:bg-white print:odd:bg-orange-50"
                >
                  <td className="border border-orange-200 px-2 py-2 text-center font-medium text-gray-600 print:px-0.5 print:py-0.5">
                    {index + 1}
                  </td>
                  {row.questionIds.map((questionId, scoreIndex) => (
                    <td
                      key={questionId}
                      className="border border-orange-200 px-2 py-2 text-center whitespace-nowrap print:px-0.5 print:py-0.5 print:leading-tight"
                    >
                      <span className="font-medium">{questionId}=</span>
                      <span className="font-semibold text-orange-700 print:text-orange-800">
                        {row.scores[scoreIndex]}
                      </span>
                    </td>
                  ))}
                  <td className="border border-orange-200 bg-orange-100 px-2 py-2 text-center font-semibold whitespace-nowrap print:px-0.5 print:py-0.5 print:leading-tight">
                    Tổng={row.total}
                  </td>
                  <td className="w-[22%] border border-orange-200 px-3 py-2 font-medium leading-tight print:w-auto print:px-1 print:py-0.5 print:text-left print:text-[7px] print:leading-tight">
                    {row.giftTitle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
