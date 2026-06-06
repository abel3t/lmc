import { describe, expect, test } from 'bun:test'
import { discSections, DiscType } from '@/constants/disc'
import {
  aggregateDiscScores,
  buildDiscResultFromAnswers,
  DISC_MAX_SECTION_SCORE,
  getDiscBlend,
  getDiscProfile,
} from '@/lib/disc-scoring'
import { isDiscScore, isGiftScore, isSurveyAnswered } from '@/lib/survey-validation'

describe('survey-validation', () => {
  test('treats 0 as a valid gift answer', () => {
    expect(isSurveyAnswered(0)).toBe(true)
    expect(isSurveyAnswered(undefined)).toBe(false)
    expect(isSurveyAnswered(null)).toBe(false)
    expect(isSurveyAnswered('')).toBe(false)
  })

  test('validates score ranges for every allowed value', () => {
    for (const value of [0, 1, 2, 3]) {
      expect(isGiftScore(value)).toBe(true)
    }
    expect(isGiftScore(-1)).toBe(false)
    expect(isGiftScore(4)).toBe(false)

    for (const value of [1, 2, 3, 4, 5]) {
      expect(isDiscScore(value)).toBe(true)
    }
    expect(isDiscScore(0)).toBe(false)
    expect(isDiscScore(6)).toBe(false)
  })
})

describe('disc-scoring', () => {
  test('builds 20 answer entries across 4 sections', () => {
    const answers: Record<string, number> = {}
    for (const section of discSections) {
      section.statements.forEach((_, index) => {
        answers[`${section.type}-${index}`] = 3
      })
    }

    const result = buildDiscResultFromAnswers(answers)
    expect(Object.keys(result)).toHaveLength(20)
    expect(aggregateDiscScores(result).every((row) => row.total === 15)).toBe(
      true,
    )
  })

  test('aggregates section totals and dominant profile', () => {
    const answers: Record<string, number | undefined> = {
      '0-0': 5,
      '0-1': 5,
      '0-2': 5,
      '0-3': 5,
      '0-4': 5,
      '1-0': 1,
      '1-1': 1,
      '1-2': 1,
      '1-3': 1,
      '1-4': 1,
      '2-0': 3,
      '2-1': 3,
      '2-2': 3,
      '2-3': 3,
      '2-4': 3,
      '3-0': 2,
      '3-1': 2,
      '3-2': 2,
      '3-3': 2,
      '3-4': 2,
    }

    const result = buildDiscResultFromAnswers(answers)
    const scores = aggregateDiscScores(result)

    expect(scores).toHaveLength(4)
    expect(scores.find((row) => row.type === DiscType.D)?.total).toBe(
      DISC_MAX_SECTION_SCORE,
    )
    expect(getDiscProfile(scores)).toBe('D')
  })

  test('each section can reach the documented max score of 25', () => {
    for (const section of discSections) {
      const answers: Record<string, number> = {}
      section.statements.forEach((_, index) => {
        answers[`${section.type}-${index}`] = 5
      })
      const scores = aggregateDiscScores(buildDiscResultFromAnswers(answers))
      expect(scores.find((row) => row.type === section.type)?.total).toBe(25)
    }
  })

  test('includes tied letters in profile result', () => {
    const scores = [
      { type: DiscType.D, title: 'D', total: 20 },
      { type: DiscType.I, title: 'I', total: 20 },
      { type: DiscType.S, title: 'S', total: 10 },
      { type: DiscType.C, title: 'C', total: 5 },
    ]

    expect(getDiscProfile(scores)).toBe('DI')
  })

  test('getDiscBlend splits primary and secondary (minor) character', () => {
    const scores = [
      { type: DiscType.D, title: 'D', total: 22 },
      { type: DiscType.I, title: 'I', total: 18 },
      { type: DiscType.S, title: 'S', total: 18 },
      { type: DiscType.C, title: 'C', total: 9 },
    ]

    const blend = getDiscBlend(scores)
    expect(blend.primary.map((s) => s.title)).toEqual(['D'])
    expect(blend.secondary.map((s) => s.title)).toEqual(['I', 'S'])
  })

  test('getDiscBlend returns no secondary when all scores tie', () => {
    const scores = [
      { type: DiscType.D, title: 'D', total: 15 },
      { type: DiscType.I, title: 'I', total: 15 },
      { type: DiscType.S, title: 'S', total: 15 },
      { type: DiscType.C, title: 'C', total: 15 },
    ]

    const blend = getDiscBlend(scores)
    expect(blend.primary).toHaveLength(4)
    expect(blend.secondary).toHaveLength(0)
  })
})
