import { describe, expect, test } from 'bun:test'
import { GiftTitle, GiftType, giftQuestions } from '@/constant'
import { giftQuestionsRaw } from '@/data/gift-questions'
import {
  ADMINISTRATION_QUESTION_IDS,
  EXPECTED_GIFT_TITLES,
  EXPECTED_MATRIX_ROWS,
} from '@/lib/gift-matrix.fixtures'
import {
  buildGiftMatrixFromScores,
  buildGiftResultFromScores,
  GIFT_CATEGORY_COUNT,
  GIFT_MAX_SCORE,
  type GiftAnswers,
  getGiftBlend,
  getGiftIndexForQuestion,
  getQuestionIdsForGift,
  isGiftSurveyComplete,
  QUESTIONS_PER_GIFT,
  sortGiftRowsByScore,
} from '@/lib/gift-scoring'

describe('spiritual gift question mapping (133 × 19 matrix)', () => {
  test('defines exactly 19 gift titles in documented matrix order', () => {
    expect(EXPECTED_GIFT_TITLES).toHaveLength(GIFT_CATEGORY_COUNT)

    for (let index = 0; index < GIFT_CATEGORY_COUNT; index++) {
      expect(GiftTitle[index as GiftType]).toBe(EXPECTED_GIFT_TITLES[index])
    }
  })

  test('raw data has sequential ids 1–133 with non-empty text', () => {
    expect(giftQuestionsRaw).toHaveLength(133)

    const ids = giftQuestionsRaw.map((question) => question.id)
    expect(new Set(ids).size).toBe(133)
    expect(Math.min(...ids)).toBe(1)
    expect(Math.max(...ids)).toBe(133)

    for (let id = 1; id <= 133; id++) {
      const question = giftQuestionsRaw.find((item) => item.id === id)
      expect(question).toBeDefined()
      expect(question?.text.trim().length).toBeGreaterThan(10)
    }
  })

  test('assigns each question id to matrix column (id - 1) % 19', () => {
    for (let id = 1; id <= 133; id++) {
      expect(getGiftIndexForQuestion(id)).toBe((id - 1) % GIFT_CATEGORY_COUNT)
    }
  })

  test('raw giftIndex matches matrix formula for all 133 questions', () => {
    for (const raw of giftQuestionsRaw) {
      expect(raw.giftIndex).toBe((raw.id - 1) % GIFT_CATEGORY_COUNT)
    }
  })

  test('every question resolves to the correct gift type and title', () => {
    for (const raw of giftQuestionsRaw) {
      const expectedType = (raw.id - 1) % GIFT_CATEGORY_COUNT
      const derived = giftQuestions.find((question) => question.id === raw.id)

      expect(derived?.text).toBe(raw.text)
      expect(derived?.type).toBe(expectedType)
      expect(derived?.type).toBe(raw.giftIndex)
      expect(GiftTitle[expectedType as GiftType]).toBe(
        EXPECTED_GIFT_TITLES[expectedType],
      )
    }
  })

  test('each matrix row lists the expected 7 question ids', () => {
    for (let giftIndex = 0; giftIndex < GIFT_CATEGORY_COUNT; giftIndex++) {
      expect(getQuestionIdsForGift(giftIndex)).toEqual(
        EXPECTED_MATRIX_ROWS[giftIndex],
      )
    }

    // Spot-check first, second, and last columns.
    expect(getQuestionIdsForGift(GiftType.A)).toEqual([
      1, 20, 39, 58, 77, 96, 115,
    ])
    expect(getQuestionIdsForGift(GiftType.B)).toEqual([
      2, 21, 40, 59, 78, 97, 116,
    ])
    expect(getQuestionIdsForGift(GiftType.S)).toEqual([
      19, 38, 57, 76, 95, 114, 133,
    ])
  })

  test('matrix rows cover ids 1–133 exactly once with 7 questions per gift', () => {
    const seen = new Set<number>()

    for (let giftIndex = 0; giftIndex < GIFT_CATEGORY_COUNT; giftIndex++) {
      const ids = getQuestionIdsForGift(giftIndex)
      expect(ids).toHaveLength(QUESTIONS_PER_GIFT)

      for (const id of ids) {
        expect(seen.has(id)).toBe(false)
        seen.add(id)

        const question = giftQuestions.find((item) => item.id === id)
        expect(question?.type).toBe(giftIndex)
        expect(GiftTitle[giftIndex as GiftType]).toBe(
          EXPECTED_GIFT_TITLES[giftIndex],
        )
      }
    }

    expect(seen.size).toBe(133)
  })

  test('buildGiftMatrixFromScores places each answer in its gift row', () => {
    const scores: GiftAnswers = {}
    for (const question of giftQuestions) {
      scores[String(question.id)] = (question.id % 4) as 0 | 1 | 2 | 3
    }

    const rows = buildGiftMatrixFromScores(scores)
    expect(rows).toHaveLength(GIFT_CATEGORY_COUNT)

    for (const row of rows) {
      expect(row.questionIds).toEqual(getQuestionIdsForGift(row.giftType))
      expect(row.scores).toEqual(
        row.questionIds.map((id) => scores[String(id)] ?? 0),
      )
      expect(row.total).toBe(row.scores.reduce((sum, score) => sum + score, 0))
      expect(row.giftTitle).toBe(GiftTitle[row.giftType])
    }
  })
})

describe('spiritual gift scoring from mapped answers', () => {
  test('max row score is 21 (7 questions × 3 points)', () => {
    expect(GIFT_MAX_SCORE).toBe(21)
    expect(QUESTIONS_PER_GIFT * 3).toBe(GIFT_MAX_SCORE)
  })

  test('perfect Quản trị row scores 21 when only administration questions are 3', () => {
    const scores: GiftAnswers = Object.fromEntries(
      giftQuestions.map((question) => [
        String(question.id),
        ADMINISTRATION_QUESTION_IDS.includes(question.id) ? 3 : 0,
      ]),
    )

    const rows = buildGiftMatrixFromScores(scores)
    const adminRow = rows.find((row) => row.giftType === GiftType.A)
    expect(adminRow).toBeDefined()
    if (!adminRow) return

    expect(adminRow.questionIds).toEqual(ADMINISTRATION_QUESTION_IDS)
    expect(adminRow.scores).toEqual([3, 3, 3, 3, 3, 3, 3])
    expect(adminRow.total).toBe(21)
    expect(adminRow.giftTitle).toBe('Quản trị')

    const ranked = sortGiftRowsByScore(rows)
    expect(ranked[0]?.giftType).toBe(GiftType.A)
    expect(getGiftBlend(rows).primary[0]?.giftTitle).toBe('Quản trị')
  })

  test('uniform score 2 on all 133 questions yields 14/21 on every row', () => {
    const scores: GiftAnswers = Object.fromEntries(
      giftQuestions.map((question) => [String(question.id), 2]),
    )

    const result = buildGiftResultFromScores(scores)
    const rows = buildGiftMatrixFromScores(scores)

    expect(Object.keys(result)).toHaveLength(133)
    expect(rows.every((row) => row.total === 14)).toBe(true)
    expect(sortGiftRowsByScore(rows).slice(0, 5)).toHaveLength(5)
  })

  test('getGiftBlend handles tied primary and secondary groups', () => {
    const scores: GiftAnswers = {
      '1': 3,
      '2': 3,
      '3': 2,
      '4': 2,
    }
    const rows = buildGiftMatrixFromScores(scores)
    const blend = getGiftBlend(rows)

    expect(blend.primary.map((row) => row.giftType).sort()).toEqual([0, 1])
    expect(blend.secondary.map((row) => row.giftType).sort()).toEqual([2, 3])
  })

  test('buildGiftResultFromScores defaults missing answers to mark 0', () => {
    const result = buildGiftResultFromScores({ '1': 2 })
    expect(result['1']).toEqual({ type: GiftType.A, mark: 2 })
    expect(result['2']).toEqual({ type: GiftType.B, mark: 0 })
    expect(Object.keys(result)).toHaveLength(133)
  })

  test('isGiftSurveyComplete requires every question answered (0 is valid)', () => {
    const full: GiftAnswers = Object.fromEntries(
      giftQuestions.map((question) => [String(question.id), 0]),
    )
    expect(isGiftSurveyComplete(full)).toBe(true)

    const { 1: _omitted, ...missingOne } = full
    expect(isGiftSurveyComplete(missingOne)).toBe(false)
    expect(isGiftSurveyComplete({})).toBe(false)
  })

  test('getGiftBlend returns empty groups for no rows', () => {
    expect(getGiftBlend([])).toEqual({ primary: [], secondary: [] })
  })

  test('gift row scores 21 when only its column questions are 3', () => {
    for (const questionIds of EXPECTED_MATRIX_ROWS) {
      const scores = Object.fromEntries(
        giftQuestions.map((question) => [
          String(question.id),
          questionIds.includes(question.id) ? 3 : 0,
        ]),
      )
      const row = buildGiftMatrixFromScores(scores).find((candidate) =>
        candidate.questionIds.every((id, index) => id === questionIds[index]),
      )
      expect(row?.total).toBe(21)
    }
  })

  test('sum of all row totals equals sum of all answer marks', () => {
    const scores: GiftAnswers = Object.fromEntries(
      giftQuestions.map((question) => [String(question.id), question.id % 4]),
    )
    const rows = buildGiftMatrixFromScores(scores)
    const rowSum = rows.reduce((sum, row) => sum + row.total, 0)
    const answerSum = Object.values(scores).reduce<number>(
      (sum, mark) => sum + (mark ?? 0),
      0,
    )
    expect(rowSum).toEqual(answerSum)
  })
})
