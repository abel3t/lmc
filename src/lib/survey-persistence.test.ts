import { beforeEach, describe, expect, test } from 'vitest'
import {
  discSections,
  giftQuestions,
  LoveLanguageQuestions,
  nextGenGiftQuestions,
} from '@/constant'
import { LEGACY_STORAGE_KEYS, SURVEY_STORAGE } from '@/constants/storage'
import { isDiscSurveyComplete } from '@/lib/disc-scoring'
import { isGiftSurveyComplete } from '@/lib/gift-scoring'
import { isNextGenGiftSurveyComplete } from '@/lib/next-gen-gift-scoring'
import {
  discStorage,
  giftStorage,
  loveLanguageStorage,
  nextGenGiftStorage,
} from '@/lib/survey-persistence'
import { readSurveyStorage, writeSurveyStorage } from '@/lib/survey-storage'

function setRaw(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

function stored(key: string): unknown {
  const raw = localStorage.getItem(key)
  return raw === null ? null : JSON.parse(raw)
}

function allLegacyKeysGone(keys: readonly string[]) {
  return keys.every((key) => localStorage.getItem(key) === null)
}

const fill = (ids: string[], value: number) =>
  Object.fromEntries(ids.map((id) => [id, value]))

const GIFT_IDS = giftQuestions.map((q) => String(q.id))
const NEXT_GEN_IDS = nextGenGiftQuestions.map((q) => String(q.id))
const DISC_KEYS = discSections.flatMap((section) =>
  section.statements.map((_, index) => `${section.type}-${index}`),
)

/** A valid love-language submission: in every group, type T gets mark 5 - T. */
const fullLoveLanguage = () =>
  Object.fromEntries(
    LoveLanguageQuestions.map((group) => [
      String(group.id),
      Object.fromEntries(
        group.answers.map((answer) => [String(answer.type), 5 - answer.type]),
      ),
    ]),
  )

beforeEach(() => {
  localStorage.clear()
})

describe('storage keys', () => {
  test('every survey uses a distinct lmc:-namespaced key at version 1', () => {
    const specs = Object.values(SURVEY_STORAGE)
    expect(new Set(specs.map((s) => s.key)).size).toBe(specs.length)
    for (const { key, version } of specs) {
      expect(key.startsWith('lmc:')).toBe(true)
      expect(version).toBe(1)
    }
  })

  test('no legacy key collides with a new key or another survey', () => {
    const legacy = Object.values(LEGACY_STORAGE_KEYS).flat()
    expect(new Set(legacy).size).toBe(legacy.length)
    for (const key of legacy) expect(key.startsWith('lmc:')).toBe(false)
  })

  test('specs carry the configured key, version and legacy keys', () => {
    expect(giftStorage.key).toBe(SURVEY_STORAGE.gift.key)
    expect(nextGenGiftStorage.key).toBe(SURVEY_STORAGE.nextGenGift.key)
    expect(discStorage.key).toBe(SURVEY_STORAGE.disc.key)
    expect(loveLanguageStorage.key).toBe(SURVEY_STORAGE.loveLanguage.key)
    expect(loveLanguageStorage.legacyKeys).toEqual(
      LEGACY_STORAGE_KEYS.loveLanguage,
    )
  })
})

describe('gift storage', () => {
  test('round-trips a full submission that counts as complete', () => {
    writeSurveyStorage(giftStorage, fill(GIFT_IDS, 2))
    const answers = readSurveyStorage(giftStorage)
    expect(answers).toEqual(fill(GIFT_IDS, 2))
    expect(isGiftSurveyComplete(answers ?? {})).toBe(true)
  })

  test('keeps partial progress (gift saves page by page)', () => {
    writeSurveyStorage(giftStorage, { '1': 0, '2': 3 })
    const answers = readSurveyStorage(giftStorage)
    expect(answers).toEqual({ '1': 0, '2': 3 })
    expect(isGiftSurveyComplete(answers ?? {})).toBe(false)
  })

  test('drops unknown ids and out-of-range, non-integer or non-number scores', () => {
    setRaw(giftStorage.key, {
      v: 1,
      data: {
        '1': 0,
        '2': 3,
        '3': 4,
        '4': -1,
        '5': 1.5,
        '6': '2',
        '7': null,
        '999': 2,
        abc: 1,
      },
    })
    expect(readSurveyStorage(giftStorage)).toEqual({ '1': 0, '2': 3 })
  })

  test('imports legacy giftAnswers and removes every old gift key', () => {
    setRaw('giftAnswers', fill(GIFT_IDS, 1))
    setRaw('giftQuestions', [{ id: 1 }])
    setRaw('giftResult', { anything: 1 })
    setRaw('giftResultV2', { anything: 1 })

    expect(readSurveyStorage(giftStorage)).toEqual(fill(GIFT_IDS, 1))
    expect(stored(giftStorage.key)).toEqual({ v: 1, data: fill(GIFT_IDS, 1) })
    expect(allLegacyKeysGone(LEGACY_STORAGE_KEYS.gift)).toBe(true)
  })

  test('drops the pre-giftAnswers formats instead of importing them', () => {
    setRaw('giftQuestions', { '1': { id: 1, value: 2 } })
    setRaw('giftResultV2', { '1': { type: 0, mark: 2 } })

    expect(readSurveyStorage(giftStorage)).toBeNull()
    expect(localStorage.getItem(giftStorage.key)).toBeNull()
    expect(allLegacyKeysGone(LEGACY_STORAGE_KEYS.gift)).toBe(true)
  })

  test('does not write an empty import from corrupt legacy data', () => {
    setRaw('giftAnswers', { '1': 'x' })
    expect(readSurveyStorage(giftStorage)).toBeNull()
    expect(localStorage.getItem(giftStorage.key)).toBeNull()
  })
})

describe('next gen gift storage', () => {
  test('round-trips a full submission that counts as complete', () => {
    writeSurveyStorage(nextGenGiftStorage, fill(NEXT_GEN_IDS, 3))
    const answers = readSurveyStorage(nextGenGiftStorage)
    expect(answers).toEqual(fill(NEXT_GEN_IDS, 3))
    expect(isNextGenGiftSurveyComplete(answers ?? {})).toBe(true)
  })

  test('stores answers only, never question text', () => {
    writeSurveyStorage(nextGenGiftStorage, fill(NEXT_GEN_IDS, 1))
    const raw = localStorage.getItem(nextGenGiftStorage.key) ?? ''
    expect(raw).not.toContain(nextGenGiftQuestions[0]?.text ?? '<missing>')
  })

  test('rejects ids beyond the 57 current questions', () => {
    setRaw(nextGenGiftStorage.key, { v: 1, data: { '1': 2, '58': 2, '66': 2 } })
    expect(readSurveyStorage(nextGenGiftStorage)).toEqual({ '1': 2 })
  })

  test('imports legacy V2 question objects as id → value', () => {
    const legacy = Object.fromEntries(
      nextGenGiftQuestions.map((q) => [
        String(q.id),
        { ...q, value: 2, hasError: false },
      ]),
    )
    setRaw('nextGenGiftQuestionsV2', legacy)
    setRaw('nextGenGiftResultV2', { '1': { type: 0, mark: 2 } })

    const answers = readSurveyStorage(nextGenGiftStorage)
    expect(answers).toEqual(fill(NEXT_GEN_IDS, 2))
    expect(isNextGenGiftSurveyComplete(answers ?? {})).toBe(true)
    expect(allLegacyKeysGone(LEGACY_STORAGE_KEYS.nextGenGift)).toBe(true)
  })

  test('imports partially answered legacy V2 data, skipping unanswered', () => {
    setRaw('nextGenGiftQuestionsV2', {
      '1': { id: 1, value: 0 },
      '2': { id: 2 },
      '3': { id: 3, value: 3 },
    })
    expect(readSurveyStorage(nextGenGiftStorage)).toEqual({ '1': 0, '3': 3 })
  })

  test('drops the original nextGen keys (old question set)', () => {
    setRaw('nextGenGiftQuestions', { '1': { id: 1, value: 2 } })
    setRaw('nextGenGiftResult', { '1': { type: 0, mark: 2 } })

    expect(readSurveyStorage(nextGenGiftStorage)).toBeNull()
    expect(allLegacyKeysGone(LEGACY_STORAGE_KEYS.nextGenGift)).toBe(true)
  })

  test('ignores a legacy V2 value that is not a question record', () => {
    setRaw('nextGenGiftQuestionsV2', [1, 2, 3])
    expect(readSurveyStorage(nextGenGiftStorage)).toBeNull()
  })
})

describe('disc storage', () => {
  test('round-trips a full submission that counts as complete', () => {
    writeSurveyStorage(discStorage, fill(DISC_KEYS, 4))
    const answers = readSurveyStorage(discStorage)
    expect(answers).toEqual(fill(DISC_KEYS, 4))
    expect(isDiscSurveyComplete(answers ?? {})).toBe(true)
  })

  test('accepts 1–5 only (0 is not on the DISC scale)', () => {
    setRaw(discStorage.key, {
      v: 1,
      data: { '0-0': 1, '0-1': 5, '0-2': 0, '0-3': 6, '0-4': 2.5, '4-0': 3 },
    })
    expect(readSurveyStorage(discStorage)).toEqual({ '0-0': 1, '0-1': 5 })
  })

  test('imports legacy discAnswers sections and removes discResult', () => {
    const sections = discSections.map((section) => ({
      type: section.type,
      statements: section.statements.map((_, index) => ({
        value: (index % 5) + 1,
        hasError: false,
      })),
    }))
    setRaw('discAnswers', sections)
    setRaw('discResult', { '0-0': { section: 0, statementIndex: 0, value: 1 } })

    const answers = readSurveyStorage(discStorage)
    expect(answers?.['0-0']).toBe(1)
    expect(answers?.['3-4']).toBe(5)
    expect(isDiscSurveyComplete(answers ?? {})).toBe(true)
    expect(allLegacyKeysGone(LEGACY_STORAGE_KEYS.disc)).toBe(true)
  })

  test('skips malformed legacy sections and statements', () => {
    setRaw('discAnswers', [
      null,
      { type: 0 },
      { type: 1, statements: 'nope' },
      { type: 2, statements: [null, { value: 3 }, { value: 9 }] },
    ])
    expect(readSurveyStorage(discStorage)).toEqual({ '2-1': 3 })
  })

  test('ignores legacy discAnswers that is not an array', () => {
    setRaw('discAnswers', { '0-0': 3 })
    expect(readSurveyStorage(discStorage)).toBeNull()
    expect(allLegacyKeysGone(LEGACY_STORAGE_KEYS.disc)).toBe(true)
  })
})

describe('love language storage', () => {
  test('round-trips a full submission', () => {
    writeSurveyStorage(loveLanguageStorage, fullLoveLanguage())
    expect(readSurveyStorage(loveLanguageStorage)).toEqual(fullLoveLanguage())
  })

  test('drops unknown groups/types and marks that are not whole 1–5', () => {
    setRaw(loveLanguageStorage.key, {
      v: 1,
      data: {
        '1': { '0': 5, '1': 0, '2': 6, '3': 2.5, '4': '4', '9': 3 },
        '2': 'nope',
        '9': { '0': 5 },
      },
    })
    expect(readSurveyStorage(loveLanguageStorage)).toEqual({ '1': { '0': 5 } })
  })

  test('imports legacy V2 groups as group → type → mark', () => {
    const legacy = Object.fromEntries(
      LoveLanguageQuestions.map((group) => [
        String(group.id),
        {
          ...group,
          hasError: false,
          answers: group.answers.map((answer) => ({
            ...answer,
            mark: 5 - answer.type,
            hasError: false,
          })),
        },
      ]),
    )
    setRaw('loveLanguageQuestionsV2', legacy)
    setRaw('loveLanguageResultV2', { '0': { type: 0, mark: 25 } })

    expect(readSurveyStorage(loveLanguageStorage)).toEqual(fullLoveLanguage())
    expect(allLegacyKeysGone(LEGACY_STORAGE_KEYS.loveLanguage)).toBe(true)
  })

  test('drops unversioned loveLanguageQuestions (scale meaning is ambiguous)', () => {
    setRaw('loveLanguageQuestions', {
      '1': { id: 1, answers: [{ type: 0, mark: 1 }] },
    })
    setRaw('loveLanguageResult', { '0': { type: 0, mark: 5 } })

    expect(readSurveyStorage(loveLanguageStorage)).toBeNull()
    expect(localStorage.getItem(loveLanguageStorage.key)).toBeNull()
    expect(allLegacyKeysGone(LEGACY_STORAGE_KEYS.loveLanguage)).toBe(true)
  })

  test('skips NaN/null marks left by older builds', () => {
    // JSON turns NaN into null.
    setRaw('loveLanguageQuestionsV2', {
      '1': {
        id: 1,
        answers: [
          { type: 0, mark: null },
          { type: 1, mark: 3 },
        ],
      },
    })
    expect(readSurveyStorage(loveLanguageStorage)).toEqual({ '1': { '1': 3 } })
  })

  test('does not import a legacy V2 entry with no usable marks', () => {
    setRaw('loveLanguageQuestionsV2', {
      '1': { id: 1, answers: [{ type: 0 }] },
    })
    expect(readSurveyStorage(loveLanguageStorage)).toBeNull()
    expect(localStorage.getItem(loveLanguageStorage.key)).toBeNull()
  })
})
