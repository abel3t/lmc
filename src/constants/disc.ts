export enum DiscType {
  D,
  I,
  S,
  C,
}

export const DISC_SCALE_LABELS = [
  { value: 1, label: 'Không bao giờ' },
  { value: 2, label: 'Hiếm khi' },
  { value: 3, label: 'Thỉnh thoảng' },
  { value: 4, label: 'Thường xuyên' },
  { value: 5, label: 'Luôn luôn' },
] as const

export const discSections = [
  {
    type: DiscType.D,
    title: 'D – QUYẾT ĐOÁN',
    statements: [
      'Tôi là người quyết đoán, mạnh mẽ và dứt khoát.',
      'Tôi phát huy tốt trong môi trường nhiều thử thách.',
      'Tôi tập trung vào công việc hơn là cảm xúc con người.',
      'Những từ như “mạnh mẽ” và “táo bạo” mô tả đúng về tôi.',
      'Tôi được thúc đẩy bởi thành tựu và thẩm quyền lãnh đạo.',
    ],
  },
  {
    type: DiscType.I,
    title: 'I – ẢNH HƯỞNG',
    statements: [
      'Tôi thích ảnh hưởng và truyền cảm hứng cho người khác.',
      'Tôi quan tâm đến con người hơn là công việc.',
      'Tôi phát triển tốt trong môi trường có nhiều tương tác.',
      'Những từ như “hòa đồng” và “sôi nổi” mô tả đúng về tôi.',
      'Tôi được thúc đẩy bởi sự công nhận và khích lệ từ người khác.',
    ],
  },
  {
    type: DiscType.S,
    title: 'S – ỔN ĐỊNH',
    statements: [
      'Tôi thích nhận được hướng dẫn rõ ràng và cụ thể trong công việc.',
      'Tôi thích làm việc trong nhóm nhỏ.',
      'Tôi phát triển tốt trong môi trường ổn định và nhất quán.',
      'Những từ như “kiên trì” và “đáng tin cậy” mô tả đúng về tôi.',
      'Tôi được thúc đẩy bởi sự ổn định và nâng đỡ.',
    ],
  },
  {
    type: DiscType.C,
    title: 'C – TUÂN THỦ',
    statements: [
      'Tôi yêu thích công việc, hệ thống và việc phân tích chi tiết.',
      'Tôi thích đem lại sự tổ chức và trật tự cho môi trường làm việc.',
      'Tôi phát huy tốt trong môi trường có quy định rõ ràng.',
      'Những từ như “chính xác” và “chuẩn mực” mô tả đúng về tôi.',
      'Tôi được thúc đẩy bởi chất lượng và sự đúng đắn.',
    ],
  },
] as const

export const DISC_STORAGE_KEYS = {
  answers: 'discAnswers',
  result: 'discResult',
} as const
