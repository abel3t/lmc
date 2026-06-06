import {
  LoveLanguageQuestions,
  LoveLanguageTitle,
  LoveLanguageType,
} from '@/constant'

export const LOVE_LANGUAGE_GROUP_COUNT = 5
export const LOVE_LANGUAGE_TYPES_PER_GROUP = 5
export const LOVE_LANGUAGE_MAX_TOTAL_SCORE = 25

export type LoveLanguageAnswerInput = {
  type: LoveLanguageType
  mark?: number
  hasError?: boolean
}

export type LoveLanguageQuestionInput = {
  id: number
  answers: LoveLanguageAnswerInput[]
  hasError?: boolean
}

export type LoveLanguageQuestionsRecord = Record<
  string,
  LoveLanguageQuestionInput
>

export type LoveLanguageAggregate = {
  type: LoveLanguageType
  title: string
  mark: number
}

export type LoveLanguageResultRecord = Record<
  string,
  { type: LoveLanguageType; mark: number }
>

export function isLoveLanguageRank(value: unknown): value is number {
  return typeof value === 'number' && value >= 1 && value <= 5
}

/** Each group must use ranks 1–5 exactly once. */
export function isLoveLanguageGroupValid(
  answers: LoveLanguageAnswerInput[],
): boolean {
  if (answers.length !== LOVE_LANGUAGE_TYPES_PER_GROUP) return false

  const marks = answers.map((answer) => answer.mark)
  if (marks.some((mark) => !isLoveLanguageRank(mark))) return false

  const unique = new Set(marks)
  return unique.size === LOVE_LANGUAGE_TYPES_PER_GROUP
}

export function buildLoveLanguageResultFromQuestions(
  questions: LoveLanguageQuestionsRecord,
): LoveLanguageResultRecord {
  const result: LoveLanguageResultRecord = {}

  for (const question of Object.values(questions)) {
    for (const answer of question.answers) {
      const mark = answer.mark ?? 0
      const key = String(answer.type)
      result[key] = {
        type: answer.type,
        mark: (result[key]?.mark ?? 0) + mark,
      }
    }
  }

  return result
}

export function aggregateLoveLanguageScores(
  result: LoveLanguageResultRecord,
): LoveLanguageAggregate[] {
  return Object.values(result)
    .map(({ type, mark }) => ({
      type,
      title: LoveLanguageTitle[type],
      mark,
    }))
    .sort((a, b) => b.mark - a.mark || a.type - b.type)
}

export function isLoveLanguageSurveyComplete(
  questions: LoveLanguageQuestionsRecord,
): boolean {
  const groups = Object.values(questions)
  if (groups.length !== LOVE_LANGUAGE_GROUP_COUNT) return false

  return groups.every((group) => isLoveLanguageGroupValid(group.answers))
}

export function getExpectedLoveLanguageTypes(): LoveLanguageType[] {
  return [
    LoveLanguageType.A,
    LoveLanguageType.B,
    LoveLanguageType.C,
    LoveLanguageType.D,
    LoveLanguageType.E,
  ]
}

/** Builds a valid submission where type T gets rank (5 - T) in every group. */
export function buildSampleLoveLanguageQuestions(): LoveLanguageQuestionsRecord {
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
