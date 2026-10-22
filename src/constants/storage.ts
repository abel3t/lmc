/**
 * localStorage key and schema version for each survey.
 *
 * Keys never change. Bump `version` only when answers saved under the old
 * version would be read wrongly, and give the storage spec a `migrate` step.
 */
export const SURVEY_STORAGE = {
  gift: { key: 'lmc:gift', version: 1 },
  nextGenGift: { key: 'lmc:next-gen-gift', version: 1 },
  disc: { key: 'lmc:disc', version: 1 },
  loveLanguage: { key: 'lmc:love-language', version: 1 },
} as const

/** Keys written before namespacing. Read once for import, then removed. */
export const LEGACY_STORAGE_KEYS = {
  gift: ['giftAnswers', 'giftQuestions', 'giftResult', 'giftResultV2'],
  nextGenGift: [
    'nextGenGiftQuestionsV2',
    'nextGenGiftResultV2',
    'nextGenGiftQuestions',
    'nextGenGiftResult',
  ],
  disc: ['discAnswers', 'discResult'],
  loveLanguage: [
    'loveLanguageQuestionsV2',
    'loveLanguageResultV2',
    'loveLanguageQuestions',
    'loveLanguageResult',
  ],
} as const
