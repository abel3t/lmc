import {
  discSections,
  giftQuestions,
  LoveLanguageQuestions,
  nextGenGiftQuestions,
} from '@/constant'
import { LEGACY_STORAGE_KEYS, SURVEY_STORAGE } from '@/constants/storage'
import { type DiscAnswers, discAnswerKey } from '@/lib/disc-scoring'
import type { GiftAnswers } from '@/lib/gift-scoring'
import {
  isLoveLanguageRank,
  type LoveLanguageAnswers,
} from '@/lib/love-language-scoring'
import type { NextGenGiftAnswers } from '@/lib/next-gen-gift-scoring'
import type { SurveyStorageSpec } from '@/lib/survey-storage'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isScore(value: unknown, min: number, max: number): value is number {
  return (
    Number.isInteger(value) &&
    (value as number) >= min &&
    (value as number) <= max
  )
}

/** Keeps only known keys holding a whole-number score in [min, max]. */
function pickScores(
  data: unknown,
  keys: readonly string[],
  min: number,
  max: number,
): Record<string, number> | null {
  if (!isRecord(data)) return null

  const scores: Record<string, number> = {}
  for (const key of keys) {
    const value = data[key]
    if (isScore(value, min, max)) scores[key] = value
  }
  return scores
}

/** Legacy imports skip empty data so nothing meaningless is written. */
function nonEmpty<T extends object>(data: T | null): T | null {
  return data && Object.keys(data).length > 0 ? data : null
}

/** Old stores saved whole question objects; keep only `id → field`. */
function pluckField(
  data: unknown,
  field: string,
): Record<string, unknown> | null {
  if (!isRecord(data)) return null

  const values: Record<string, unknown> = {}
  for (const [id, item] of Object.entries(data)) {
    if (isRecord(item)) values[id] = item[field]
  }
  return values
}

const GIFT_IDS = giftQuestions.map((question) => String(question.id))

function parseGiftAnswers(data: unknown): GiftAnswers | null {
  return pickScores(data, GIFT_IDS, 0, 3)
}

export const giftStorage: SurveyStorageSpec<GiftAnswers> = {
  ...SURVEY_STORAGE.gift,
  parse: parseGiftAnswers,
  legacyKeys: LEGACY_STORAGE_KEYS.gift,
  // `giftAnswers` already held `id → score`; older gift keys used another format.
  readLegacy: (read) => nonEmpty(parseGiftAnswers(read('giftAnswers'))),
}

const NEXT_GEN_GIFT_IDS = nextGenGiftQuestions.map((question) =>
  String(question.id),
)

function parseNextGenGiftAnswers(data: unknown): NextGenGiftAnswers | null {
  return pickScores(data, NEXT_GEN_GIFT_IDS, 0, 3)
}

export const nextGenGiftStorage: SurveyStorageSpec<NextGenGiftAnswers> = {
  ...SURVEY_STORAGE.nextGenGift,
  parse: parseNextGenGiftAnswers,
  legacyKeys: LEGACY_STORAGE_KEYS.nextGenGift,
  // Only the V2 keys match today's 57 questions; earlier keys are dropped.
  readLegacy: (read) =>
    nonEmpty(
      parseNextGenGiftAnswers(
        pluckField(read('nextGenGiftQuestionsV2'), 'value'),
      ),
    ),
}

const DISC_KEYS = discSections.flatMap((section) =>
  section.statements.map((_, index) => discAnswerKey(section.type, index)),
)

function parseDiscAnswers(data: unknown): DiscAnswers | null {
  return pickScores(data, DISC_KEYS, 1, 5)
}

/** Legacy `discAnswers` was the store's `[{ type, statements: [{ value }] }]`. */
function flattenLegacyDisc(data: unknown): Record<string, unknown> | null {
  if (!Array.isArray(data)) return null

  const answers: Record<string, unknown> = {}
  for (const section of data) {
    if (!isRecord(section) || !Array.isArray(section.statements)) continue
    section.statements.forEach((statement: unknown, index: number) => {
      if (isRecord(statement)) {
        answers[`${section.type}-${index}`] = statement.value
      }
    })
  }
  return answers
}

export const discStorage: SurveyStorageSpec<DiscAnswers> = {
  ...SURVEY_STORAGE.disc,
  parse: parseDiscAnswers,
  legacyKeys: LEGACY_STORAGE_KEYS.disc,
  readLegacy: (read) =>
    nonEmpty(parseDiscAnswers(flattenLegacyDisc(read('discAnswers')))),
}

function parseLoveLanguageAnswers(data: unknown): LoveLanguageAnswers | null {
  if (!isRecord(data)) return null

  const answers: LoveLanguageAnswers = {}
  for (const group of LoveLanguageQuestions) {
    const types = group.answers.map((answer) => String(answer.type))
    const marks = pickScores(data[String(group.id)], types, 1, 5)
    if (marks) answers[String(group.id)] = marks
  }
  return answers
}

/** Legacy V2 groups were `{ id, answers: [{ type, mark }] }`. */
function readLegacyLoveLanguage(data: unknown): Record<string, unknown> | null {
  if (!isRecord(data)) return null

  const answers: Record<string, unknown> = {}
  for (const [id, group] of Object.entries(data)) {
    if (!isRecord(group) || !Array.isArray(group.answers)) continue
    const marks: Record<string, unknown> = {}
    for (const answer of group.answers) {
      if (isRecord(answer) && isLoveLanguageRank(answer.mark)) {
        marks[String(answer.type)] = answer.mark
      }
    }
    answers[id] = marks
  }
  return answers
}

export const loveLanguageStorage: SurveyStorageSpec<LoveLanguageAnswers> = {
  ...SURVEY_STORAGE.loveLanguage,
  parse: parseLoveLanguageAnswers,
  legacyKeys: LEGACY_STORAGE_KEYS.loveLanguage,
  // Unversioned `loveLanguageQuestions` mixed two opposite scales (5 = most
  // before 2026-06, 1 = most after), so only V2 answers are imported.
  readLegacy: (read) => {
    const answers = parseLoveLanguageAnswers(
      readLegacyLoveLanguage(read('loveLanguageQuestionsV2')),
    )
    return answers &&
      Object.values(answers).some((marks) => Object.keys(marks).length > 0)
      ? answers
      : null
  },
}
