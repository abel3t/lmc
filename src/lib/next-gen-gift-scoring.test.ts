import { describe, expect, test } from 'bun:test'
import { nextGenGiftQuestions, NextGenGiftType } from '@/constant'
import {
  aggregateNextGenGiftScores,
  buildNextGenGiftResultFromAnswers,
  getNextGenQuestionIdsForType,
  isNextGenGiftSurveyComplete,
  NEXT_GEN_GIFT_CATEGORY_COUNT,
  NEXT_GEN_GIFT_MAX_SCORE,
  NEXT_GEN_QUESTIONS_PER_GIFT,
} from '@/lib/next-gen-gift-scoring'

describe('next-gen-gift-scoring', () => {
  test('aggregates 66 answers into 22 gift types with max 9 each', () => {
    const answers = Object.fromEntries(
      nextGenGiftQuestions.map((question) => [String(question.id), 3]),
    )
    const result = buildNextGenGiftResultFromAnswers(answers)
    const aggregates = aggregateNextGenGiftScores(result)

    expect(Object.keys(result)).toHaveLength(66)
    expect(aggregates).toHaveLength(NEXT_GEN_GIFT_CATEGORY_COUNT)
    expect(aggregates.every((row) => row.mark === NEXT_GEN_GIFT_MAX_SCORE)).toBe(
      true,
    )
  })

  test('sums marks per type across all three questions', () => {
    const answers: Record<string, number> = {}
    for (const type of [
      NextGenGiftType.A,
      NextGenGiftType.B,
      NextGenGiftType.V,
    ]) {
      const ids = getNextGenQuestionIdsForType(type)
      answers[String(ids[0])] = 3
      answers[String(ids[1])] = 2
      answers[String(ids[2])] = 1
    }

    const aggregates = aggregateNextGenGiftScores(
      buildNextGenGiftResultFromAnswers(answers),
    )
    const typeA = aggregates.find((row) => row.type === NextGenGiftType.A)
    const typeB = aggregates.find((row) => row.type === NextGenGiftType.B)
    const typeV = aggregates.find((row) => row.type === NextGenGiftType.V)

    expect(typeA?.mark).toBe(6)
    expect(typeB?.mark).toBe(6)
    expect(typeV?.mark).toBe(6)
  })

  test('preserves gift type on each answer entry', () => {
    const answers = { '1': 2, '23': 1, '45': 0 }
    const result = buildNextGenGiftResultFromAnswers(answers)

    expect(result['1']).toEqual({ type: NextGenGiftType.A, mark: 2 })
    expect(result['23']).toEqual({ type: NextGenGiftType.A, mark: 1 })
    expect(result['45']).toEqual({ type: NextGenGiftType.A, mark: 0 })
  })

  test('isNextGenGiftSurveyComplete requires every question (0 is valid)', () => {
    const full = Object.fromEntries(
      nextGenGiftQuestions.map((question) => [String(question.id), 0]),
    )
    expect(isNextGenGiftSurveyComplete(full)).toBe(true)

    const missing = { ...full }
    delete missing['1']
    expect(isNextGenGiftSurveyComplete(missing)).toBe(false)
  })

  test('each type receives marks from exactly three questions', () => {
    for (let type = 0; type < NEXT_GEN_GIFT_CATEGORY_COUNT; type++) {
      expect(getNextGenQuestionIdsForType(type as NextGenGiftType)).toHaveLength(
        NEXT_GEN_QUESTIONS_PER_GIFT,
      )
    }
  })
})
