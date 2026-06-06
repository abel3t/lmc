import { GiftType } from '@/constants/gift'
import { GIFT_CATEGORY_COUNT, getQuestionIdsForGift } from '@/lib/gift-scoring'

/** Official 19 gift columns in the printable result matrix (docx order). */
export const EXPECTED_GIFT_TITLES = [
  'Quản trị',
  'Sứ đồ',
  'Thủ công / Chế tác',
  'Sáng tạo nghệ thuật',
  'Phân định thuộc linh',
  'Khích lệ',
  'Truyền giảng Tin Lành',
  'Đức tin',
  'Dâng hiến',
  'Hỗ trợ/Tương trợ',
  'Tiếp khách',
  'Cầu thay',
  'Hiểu biết',
  'Lãnh đạo',
  'Thương xót',
  'Nói tiên tri',
  'Chăn bầy',
  'Giảng dạy',
  'Khôn ngoan',
] as const

/** Question ids for Quản trị (gift column A) — used in unit/e2e scoring checks. */
export const ADMINISTRATION_QUESTION_IDS = getQuestionIdsForGift(GiftType.A)

/** All 19 × 7 matrix rows: gift index → question ids. */
export const EXPECTED_MATRIX_ROWS = Array.from(
  { length: GIFT_CATEGORY_COUNT },
  (_, giftIndex) => getQuestionIdsForGift(giftIndex),
)
