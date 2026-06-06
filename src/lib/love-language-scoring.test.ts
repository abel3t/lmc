import { describe, expect, test } from 'bun:test'
import { LoveLanguageType } from '@/constant'
import {
  aggregateLoveLanguageScores,
  buildLoveLanguageResultFromQuestions,
  buildSampleLoveLanguageQuestions,
  isLoveLanguageGroupValid,
  isLoveLanguageRank,
  isLoveLanguageSurveyComplete,
  LOVE_LANGUAGE_GROUP_COUNT,
  LOVE_LANGUAGE_MAX_TOTAL_SCORE,
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

  test('sums marks across five groups into five love language totals', () => {
    const questions = buildSampleLoveLanguageQuestions()
    expect(isLoveLanguageSurveyComplete(questions)).toBe(true)

    const result = buildLoveLanguageResultFromQuestions(questions)
    const aggregates = aggregateLoveLanguageScores(result)

    expect(Object.keys(result)).toHaveLength(5)
    expect(aggregates).toHaveLength(5)

    // Each type gets rank (5 - type) in every group.
    expect(
      aggregates.find((row) => row.type === LoveLanguageType.A)?.mark,
    ).toBe(LOVE_LANGUAGE_MAX_TOTAL_SCORE)
    expect(
      aggregates.find((row) => row.type === LoveLanguageType.E)?.mark,
    ).toBe(5)
  })

  test('builds deterministic totals for a handcrafted submission', () => {
    const questions = buildSampleLoveLanguageQuestions()
    questions['1']!.answers[0]!.mark = 5
    questions['1']!.answers[1]!.mark = 4
    questions['1']!.answers[2]!.mark = 3
    questions['1']!.answers[3]!.mark = 2
    questions['1']!.answers[4]!.mark = 1

    const result = buildLoveLanguageResultFromQuestions(questions)

    // Group 1 customized; groups 2–5 still rank type A as 5.
    expect(result['0']!.mark).toBe(25)
    expect(result['4']!.mark).toBe(5)
  })

  test('isLoveLanguageSurveyComplete requires all five valid groups', () => {
    const questions = buildSampleLoveLanguageQuestions()
    expect(isLoveLanguageSurveyComplete(questions)).toBe(true)

    const invalid = buildSampleLoveLanguageQuestions()
    invalid['3']!.answers[0]!.mark = 3
    invalid['3']!.answers[1]!.mark = 3
    expect(isLoveLanguageSurveyComplete(invalid)).toBe(false)
    expect(Object.keys(invalid)).toHaveLength(LOVE_LANGUAGE_GROUP_COUNT)
  })
})
