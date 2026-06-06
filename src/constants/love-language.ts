export const LOVE_LANGUAGE_STORAGE_KEYS = {
  questions: 'loveLanguageQuestions',
  result: 'loveLanguageResult',
} as const

export const LOVE_LANGUAGE_SCALE_LABELS = [
  { value: 1, label: 'Quan trọng nhất với bạn' },
  { value: 2, label: 'Khá quan trọng' },
  { value: 3, label: 'Trung bình' },
  { value: 4, label: 'Ít quan trọng' },
  { value: 5, label: 'Ít quan trọng nhất' },
] as const
