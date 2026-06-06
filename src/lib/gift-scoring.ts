import { GiftTitle, type GiftType, giftQuestions } from '@/constant'

export const GIFT_CATEGORY_COUNT = 19
export const QUESTIONS_PER_GIFT = 7
export const GIFT_MAX_SCORE = QUESTIONS_PER_GIFT * 3

export type GiftAnswerEntry = {
  type: GiftType
  mark: number
}

export type GiftResultRecord = Record<string, GiftAnswerEntry>

export type GiftScoreRow = {
  giftType: GiftType
  giftTitle: string
  questionIds: number[]
  scores: number[]
  total: number
}

/** Question IDs mapped to each gift row (matches printable result matrix). */
export function getQuestionIdsForGift(giftIndex: number): number[] {
  return Array.from(
    { length: QUESTIONS_PER_GIFT },
    (_, row) => giftIndex + 1 + row * GIFT_CATEGORY_COUNT,
  )
}

export function getGiftIndexForQuestion(questionId: number): number {
  return (questionId - 1) % GIFT_CATEGORY_COUNT
}

export function buildGiftMatrixRows(result: GiftResultRecord): GiftScoreRow[] {
  const scoresById = new Map<number, number>()
  for (const [id, entry] of Object.entries(result)) {
    scoresById.set(Number(id), entry.mark)
  }

  return Array.from({ length: GIFT_CATEGORY_COUNT }, (_, giftIndex) => {
    const giftType = giftIndex as GiftType
    const questionIds = getQuestionIdsForGift(giftIndex)
    const scores = questionIds.map((id) => scoresById.get(id) ?? 0)
    const total = scores.reduce((sum, score) => sum + score, 0)

    return {
      giftType,
      giftTitle: GiftTitle[giftType],
      questionIds,
      scores,
      total,
    }
  })
}

export type GiftBlend = {
  primary: GiftScoreRow[]
  secondary: GiftScoreRow[]
}

/** Splits ranked rows into top-scoring (primary) and next-tier (secondary) groups. */
export function getGiftBlend(rows: GiftScoreRow[]): GiftBlend {
  const ranked = sortGiftRowsByScore(rows)
  if (ranked.length === 0) return { primary: [], secondary: [] }

  const primaryScore = ranked[0]!.total
  const primary = ranked.filter((row) => row.total === primaryScore)
  const lower = ranked.filter((row) => row.total < primaryScore)
  if (lower.length === 0) return { primary, secondary: [] }

  const secondaryScore = lower[0]!.total
  const secondary = lower.filter((row) => row.total === secondaryScore)
  return { primary, secondary }
}

/** Minimal persisted shape: a map of question id -> selected score. */
export type GiftAnswers = Record<string, number | undefined>

/** Single source of truth: derive the result matrix straight from saved scores. */
export function buildGiftResultFromScores(scores: GiftAnswers): GiftResultRecord {
  const result: GiftResultRecord = {}

  for (const question of giftQuestions) {
    const value = scores[String(question.id)]
    result[String(question.id)] = {
      type: question.type,
      mark: typeof value === 'number' ? value : 0,
    }
  }

  return result
}

export function sortGiftRowsByScore(rows: GiftScoreRow[]): GiftScoreRow[] {
  return [...rows].sort(
    (a, b) => b.total - a.total || a.giftType - b.giftType,
  )
}

export function buildGiftMatrixFromScores(scores: GiftAnswers): GiftScoreRow[] {
  return buildGiftMatrixRows(buildGiftResultFromScores(scores))
}

/** True only when every gift question has a valid score recorded. */
export function isGiftSurveyComplete(scores: GiftAnswers): boolean {
  return giftQuestions.every(
    (question) => typeof scores[String(question.id)] === 'number',
  )
}
