import { describe, expect, test } from 'bun:test'
import { NextGenGiftTitle, nextGenGiftQuestions } from '@/constant'
import {
  aggregateNextGenGiftScores,
  buildNextGenGiftResultFromAnswers,
  getNextGenQuestionIdsForType,
  isNextGenGiftSurveyComplete,
  NEXT_GEN_GIFT_CATEGORY_COUNT,
  NEXT_GEN_GIFT_MAX_SCORE,
  NEXT_GEN_QUESTIONS_PER_GIFT,
} from '@/lib/next-gen-gift-scoring'

describe('next gen gift mapping (66 × 22 matrix)', () => {
  test('has 66 sequential ids with type = (id - 1) % 22', () => {
    expect(nextGenGiftQuestions).toHaveLength(66)

    for (let index = 0; index < nextGenGiftQuestions.length; index++) {
      const question = nextGenGiftQuestions[index]
      expect(question).toBeDefined()
      if (!question) continue
      expect(question.id).toBe(index + 1)
      expect(question.type).toBe(index % NEXT_GEN_GIFT_CATEGORY_COUNT)
      expect(question.text.length).toBeGreaterThan(0)
    }
  })

  test('each gift type has exactly three question ids', () => {
    const seen = new Set<number>()

    for (let type = 0; type < NEXT_GEN_GIFT_CATEGORY_COUNT; type++) {
      const ids = getNextGenQuestionIdsForType(type)
      expect(ids).toHaveLength(NEXT_GEN_QUESTIONS_PER_GIFT)

      for (const id of ids) {
        expect(seen.has(id)).toBe(false)
        seen.add(id)
        const question = nextGenGiftQuestions.find((item) => item.id === id)
        expect(question?.type).toBe(type)
      }
    }

    expect(seen.size).toBe(66)
  })

  test('question ids for each type follow stride 22', () => {
    for (let type = 0; type < NEXT_GEN_GIFT_CATEGORY_COUNT; type++) {
      const ids = getNextGenQuestionIdsForType(type)
      expect(ids).toEqual([
        type + 1,
        type + 1 + NEXT_GEN_GIFT_CATEGORY_COUNT,
        type + 1 + NEXT_GEN_GIFT_CATEGORY_COUNT * 2,
      ])
    }
  })

  test('titles cover all 22 gift types', () => {
    for (let type = 0; type < NEXT_GEN_GIFT_CATEGORY_COUNT; type++) {
      expect(
        NextGenGiftTitle[type as keyof typeof NextGenGiftTitle].length,
      ).toBeGreaterThan(0)
    }
  })

  test('perfect score on one type yields max 9 and ranks first', () => {
    const targetType = 0
    const targetIds = new Set(getNextGenQuestionIdsForType(targetType))
    const answers = Object.fromEntries(
      nextGenGiftQuestions.map((question) => [
        String(question.id),
        targetIds.has(question.id) ? 3 : 0,
      ]),
    )

    const aggregates = aggregateNextGenGiftScores(
      buildNextGenGiftResultFromAnswers(answers),
    )

    expect(aggregates[0]?.type).toBe(targetType)
    expect(aggregates[0]?.mark).toBe(NEXT_GEN_GIFT_MAX_SCORE)
    expect(isNextGenGiftSurveyComplete(answers)).toBe(true)
  })

  test('sum of all type totals equals sum of all answer marks', () => {
    const answers = Object.fromEntries(
      nextGenGiftQuestions.map((question) => [
        String(question.id),
        question.id % 4,
      ]),
    )
    const result = buildNextGenGiftResultFromAnswers(answers)
    const aggregates = aggregateNextGenGiftScores(result)

    const typeSum = aggregates.reduce((sum, row) => sum + row.mark, 0)
    const answerSum = Object.values(result).reduce(
      (sum, entry) => sum + entry.mark,
      0,
    )
    expect(typeSum).toBe(answerSum)
  })
})
