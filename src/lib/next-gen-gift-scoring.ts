import {
  NextGenGiftTitle,
  type NextGenGiftType,
  nextGenGiftQuestions,
} from '@/constant'

export const NEXT_GEN_GIFT_CATEGORY_COUNT = 22
export const NEXT_GEN_QUESTIONS_PER_GIFT = 3
export const NEXT_GEN_GIFT_MAX_SCORE = NEXT_GEN_QUESTIONS_PER_GIFT * 3

export type NextGenGiftAnswerEntry = {
  type: NextGenGiftType
  mark: number
}

export type NextGenGiftResultRecord = Record<string, NextGenGiftAnswerEntry>

export type NextGenGiftAggregate = {
  type: NextGenGiftType
  title: string
  mark: number
}

export type NextGenGiftAnswers = Record<string, number | undefined>

export function buildNextGenGiftResultFromAnswers(
  answers: NextGenGiftAnswers,
): NextGenGiftResultRecord {
  const result: NextGenGiftResultRecord = {}

  for (const question of nextGenGiftQuestions) {
    const value = answers[String(question.id)]
    result[String(question.id)] = {
      type: question.type,
      mark: typeof value === 'number' ? value : 0,
    }
  }

  return result
}

export function aggregateNextGenGiftScores(
  result: NextGenGiftResultRecord,
): NextGenGiftAggregate[] {
  const totals = new Map<NextGenGiftType, number>()

  for (const entry of Object.values(result)) {
    totals.set(entry.type, (totals.get(entry.type) ?? 0) + entry.mark)
  }

  return Array.from(totals.entries())
    .map(([type, mark]) => ({
      type,
      title: NextGenGiftTitle[type],
      mark,
    }))
    .sort((a, b) => b.mark - a.mark || a.type - b.type)
}

export function isNextGenGiftSurveyComplete(
  answers: NextGenGiftAnswers,
): boolean {
  return nextGenGiftQuestions.every(
    (question) => typeof answers[String(question.id)] === 'number',
  )
}

export function getNextGenQuestionIdsForType(
  giftType: NextGenGiftType,
): number[] {
  return nextGenGiftQuestions
    .filter((question) => question.type === giftType)
    .map((question) => question.id)
}
