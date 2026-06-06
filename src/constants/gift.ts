export enum GiftType {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
}

export const GiftTitle: Record<GiftType, string> = {
  [GiftType.A]: 'Quản trị',
  [GiftType.B]: 'Sứ đồ',
  [GiftType.C]: 'Thủ công / Chế tác',
  [GiftType.D]: 'Sáng tạo nghệ thuật',
  [GiftType.E]: 'Phân định thuộc linh',
  [GiftType.F]: 'Khích lệ',
  [GiftType.G]: 'Truyền giảng Tin Lành',
  [GiftType.H]: 'Đức tin',
  [GiftType.I]: 'Dâng hiến',
  [GiftType.J]: 'Hỗ trợ/Tương trợ',
  [GiftType.K]: 'Tiếp khách',
  [GiftType.L]: 'Cầu thay',
  [GiftType.M]: 'Hiểu biết',
  [GiftType.N]: 'Lãnh đạo',
  [GiftType.O]: 'Thương xót',
  [GiftType.P]: 'Nói tiên tri',
  [GiftType.Q]: 'Chăn bầy',
  [GiftType.R]: 'Giảng dạy',
  [GiftType.S]: 'Khôn ngoan',
}

export const GIFT_SCALE_LABELS = [
  { value: 0, label: 'Không đúng' },
  { value: 1, label: 'Thỉnh thoảng' },
  { value: 2, label: 'Thường đúng' },
  { value: 3, label: 'Luôn đúng' },
] as const

export const NEXT_GEN_GIFT_SCALE_LABELS = [
  { value: 0, label: 'Không giống em' },
  { value: 1, label: 'Hơi giống' },
  { value: 2, label: 'Khá giống' },
  { value: 3, label: 'Rất giống em' },
] as const

export const GIFT_STORAGE_KEYS = {
  answers: 'giftAnswers',
} as const

export const GIFT_REQUIRED_MESSAGE = 'Câu hỏi này là bắt buộc'
