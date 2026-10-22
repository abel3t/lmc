import { describe, expect, test } from 'bun:test'
import { LoveLanguageQuestions, LoveLanguageType } from '@/constant'
import {
  aggregateLoveLanguageScores,
  buildLoveLanguageResultFromQuestions,
  isLoveLanguageGroupValid,
  isLoveLanguageRank,
  isLoveLanguageSurveyComplete,
  LOVE_LANGUAGE_GROUP_COUNT,
  LOVE_LANGUAGE_MAX_TOTAL_SCORE,
  LOVE_LANGUAGE_TYPES_PER_GROUP,
  type LoveLanguageQuestionsRecord,
  toLoveLanguageAnswers,
} from '@/lib/love-language-scoring'

/** Builds a valid submission where type T gets mark (5 - type) in every group. */
function buildSampleLoveLanguageQuestions(): LoveLanguageQuestionsRecord {
  const questions: LoveLanguageQuestionsRecord = {}

  for (const question of LoveLanguageQuestions) {
    questions[String(question.id)] = {
      id: question.id,
      answers: question.answers.map((answer) => ({
        type: answer.type,
        mark: LOVE_LANGUAGE_TYPES_PER_GROUP - answer.type,
      })),
    }
  }

  return questions
}

describe('love-language-scoring', () => {
  test('validates whole-number marks 1–5 only', () => {
    expect(isLoveLanguageRank(1)).toBe(true)
    expect(isLoveLanguageRank(5)).toBe(true)
    expect(isLoveLanguageRank(0)).toBe(false)
    expect(isLoveLanguageRank(6)).toBe(false)
    expect(isLoveLanguageRank(undefined)).toBe(false)
    expect(isLoveLanguageRank(1.5)).toBe(false)
    expect(isLoveLanguageRank(Number.NaN)).toBe(false)
  })

  test('rejects a group containing a decimal mark', () => {
    expect(
      isLoveLanguageGroupValid([
        { type: LoveLanguageType.A, mark: 1.5 },
        { type: LoveLanguageType.B, mark: 2 },
        { type: LoveLanguageType.C, mark: 3 },
        { type: LoveLanguageType.D, mark: 4 },
        { type: LoveLanguageType.E, mark: 5 },
      ]),
    ).toBe(false)
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

  test('sums points across five groups into five love language totals', () => {
    const questions = buildSampleLoveLanguageQuestions()
    expect(isLoveLanguageSurveyComplete(questions)).toBe(true)

    const result = buildLoveLanguageResultFromQuestions(questions)
    const aggregates = aggregateLoveLanguageScores(result)

    expect(Object.keys(result)).toHaveLength(5)
    expect(aggregates).toHaveLength(5)

    // Type A gets mark 5 (thích nhất) in every group → 25 points.
    expect(
      aggregates.find((row) => row.type === LoveLanguageType.A)?.mark,
    ).toBe(LOVE_LANGUAGE_MAX_TOTAL_SCORE)
    expect(
      aggregates.find((row) => row.type === LoveLanguageType.E)?.mark,
    ).toBe(5)
  })

  test('mark 5 on words of affirmation beats mark 1 in a single group', () => {
    const questions = buildSampleLoveLanguageQuestions()
    const group1 = questions['1']
    expect(group1).toBeDefined()
    if (group1) {
      for (const answer of group1.answers) {
        answer.mark = answer.type === LoveLanguageType.A ? 5 : 1
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
      const marks = [1, 2, 3, 4, 5]
      group1.answers.forEach((answer, index) => {
        answer.mark = marks[index]
      })
    }

    const result = buildLoveLanguageResultFromQuestions(questions)

    // Group 1: A=1 pt, E=5 pts; groups 2–5 still give A 5 pts and E 1 pt.
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

  test('sum of all type totals equals sum of marks', () => {
    const questions = buildSampleLoveLanguageQuestions()
    const result = buildLoveLanguageResultFromQuestions(questions)
    const aggregates = aggregateLoveLanguageScores(result)

    const typeSum = aggregates.reduce((sum, row) => sum + row.mark, 0)
    let pointSum = 0
    for (const group of Object.values(questions)) {
      for (const answer of group.answers) {
        if (answer.mark !== undefined) {
          pointSum += answer.mark
        }
      }
    }
    expect(typeSum).toBe(pointSum)
    expect(typeSum).toBe(75)
  })

  test('toLoveLanguageAnswers keeps only valid marks, per group and type', () => {
    const questions = buildSampleLoveLanguageQuestions()
    const group1 = questions['1']
    if (group1?.answers[0] && group1.answers[1]) {
      group1.answers[0].mark = undefined
      group1.answers[1].mark = 1.5
    }

    const answers = toLoveLanguageAnswers(questions)
    expect(Object.keys(answers)).toHaveLength(LOVE_LANGUAGE_GROUP_COUNT)
    expect(answers['1']).toEqual({ '2': 3, '3': 2, '4': 1 })
    expect(answers['2']).toEqual({ '0': 5, '1': 4, '2': 3, '3': 2, '4': 1 })
  })
})
