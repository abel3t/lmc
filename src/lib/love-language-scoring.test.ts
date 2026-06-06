import { describe, expect, test } from 'bun:test'
import { LoveLanguageType } from '@/constant'
import {
  aggregateLoveLanguageScores,
  buildLoveLanguageResultFromQuestions,
  buildSampleLoveLanguageQuestions,
  getExpectedLoveLanguageTypes,
  isLoveLanguageGroupValid,
  isLoveLanguageRank,
  isLoveLanguageSurveyComplete,
  LOVE_LANGUAGE_GROUP_COUNT,
  LOVE_LANGUAGE_MAX_TOTAL_SCORE,
  loveLanguageRankToPoints,
} from '@/lib/love-language-scoring'

describe('love-language-scoring', () => {
  test('validates ranks 1–5 only', () => {
    expect(isLoveLanguageRank(1)).toBe(true)
    expect(isLoveLanguageRank(5)).toBe(true)
    expect(isLoveLanguageRank(0)).toBe(false)
    expect(isLoveLanguageRank(6)).toBe(false)
    expect(isLoveLanguageRank(undefined)).toBe(false)
  })

  test('requires unique ranks 1–5 within each group', () => {
    expect(
      isLoveLanguageGroupValid([
        { type: LoveLanguageType.A, mark: 1 },
        { type: LoveLanguageType.B, mark: 2 },
        { type: LoveLanguageType.C, mark: 3 },
        { type: LoveLanguageType.D, mark: 4 },
        { type: LoveLanguageType.E, mark: 5 },
      ]),
    ).toBe(true)

    expect(
      isLoveLanguageGroupValid([
        { type: LoveLanguageType.A, mark: 1 },
        { type: LoveLanguageType.B, mark: 1 },
        { type: LoveLanguageType.C, mark: 3 },
        { type: LoveLanguageType.D, mark: 4 },
        { type: LoveLanguageType.E, mark: 5 },
      ]),
    ).toBe(false)
  })

  test('converts rank 1 to 5 points and rank 5 to 1 point', () => {
    expect(loveLanguageRankToPoints(1)).toBe(5)
    expect(loveLanguageRankToPoints(5)).toBe(1)
  })

  test('sums points across five groups into five love language totals', () => {
    const questions = buildSampleLoveLanguageQuestions()
    expect(isLoveLanguageSurveyComplete(questions)).toBe(true)

    const result = buildLoveLanguageResultFromQuestions(questions)
    const aggregates = aggregateLoveLanguageScores(result)

    expect(Object.keys(result)).toHaveLength(5)
    expect(aggregates).toHaveLength(5)

    // Type A gets rank 1 in every group → 25 points.
    expect(
      aggregates.find((row) => row.type === LoveLanguageType.A)?.mark,
    ).toBe(LOVE_LANGUAGE_MAX_TOTAL_SCORE)
    expect(
      aggregates.find((row) => row.type === LoveLanguageType.E)?.mark,
    ).toBe(5)
  })

  test('rank 1 on words of affirmation beats rank 5 in a single group', () => {
    const questions = buildSampleLoveLanguageQuestions()
    const group1 = questions['1']
    expect(group1).toBeDefined()
    if (group1) {
      for (const answer of group1.answers) {
        answer.mark = answer.type === LoveLanguageType.A ? 1 : 5
      }
    }

    const result = buildLoveLanguageResultFromQuestions(questions)
    expect(result['0']?.mark).toBeGreaterThan(result['4']?.mark ?? 0)
  })

  test('builds deterministic totals for a handcrafted submission', () => {
    const questions = buildSampleLoveLanguageQuestions()
    const group1 = questions['1']
    expect(group1).toBeDefined()
    if (group1) {
      const marks = [5, 4, 3, 2, 1]
      group1.answers.forEach((answer, index) => {
        answer.mark = marks[index]
      })
    }

    const result = buildLoveLanguageResultFromQuestions(questions)

    // Group 1: A=5 pts, E=1 pt; groups 2–5 still rank A as 1 (5 pts each).
    expect(result['0']?.mark).toBe(21)
    expect(result['4']?.mark).toBe(9)
  })

  test('isLoveLanguageSurveyComplete requires all five valid groups', () => {
    const questions = buildSampleLoveLanguageQuestions()
    expect(isLoveLanguageSurveyComplete(questions)).toBe(true)

    const invalid = buildSampleLoveLanguageQuestions()
    const group3 = invalid['3']
    expect(group3).toBeDefined()
    if (group3) {
      const first = group3.answers[0]
      const second = group3.answers[1]
      expect(first).toBeDefined()
      expect(second).toBeDefined()
      if (first && second) {
        first.mark = 3
        second.mark = 3
      }
    }
    expect(isLoveLanguageSurveyComplete(invalid)).toBe(false)
    expect(Object.keys(invalid)).toHaveLength(LOVE_LANGUAGE_GROUP_COUNT)
  })

  test('getExpectedLoveLanguageTypes lists A through E', () => {
    expect(getExpectedLoveLanguageTypes()).toEqual([
      LoveLanguageType.A,
      LoveLanguageType.B,
      LoveLanguageType.C,
      LoveLanguageType.D,
      LoveLanguageType.E,
    ])
  })

  test('sum of all type totals equals sum of converted points', () => {
    const questions = buildSampleLoveLanguageQuestions()
    const result = buildLoveLanguageResultFromQuestions(questions)
    const aggregates = aggregateLoveLanguageScores(result)

    const typeSum = aggregates.reduce((sum, row) => sum + row.mark, 0)
    let pointSum = 0
    for (const group of Object.values(questions)) {
      for (const answer of group.answers) {
        if (answer.mark !== undefined) {
          pointSum += loveLanguageRankToPoints(answer.mark)
        }
      }
    }
    expect(typeSum).toBe(pointSum)
    expect(typeSum).toBe(75)
  })
})
