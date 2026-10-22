import { create } from 'zustand'
import { LoveLanguageQuestions, type LoveLanguageType } from '@/constant'
import type { LoveLanguageAnswers } from '@/lib/love-language-scoring'

export type LoveLanguageAnswerState = {
  type: LoveLanguageType
  text?: string
  textMale?: string
  textFemale?: string
  mark?: number
  hasError?: boolean
}

export type LoveLanguageQuestionState = {
  id: number
  text?: string
  answers: LoveLanguageAnswerState[]
  hasError?: boolean
}

type LoveLanguageQuestionsRecord = Record<string, LoveLanguageQuestionState>

/** Store groups with saved marks filled in (empty when none). */
export const buildLoveLanguageQuestions = (
  answers: LoveLanguageAnswers = {},
): LoveLanguageQuestionsRecord =>
  LoveLanguageQuestions.reduce<LoveLanguageQuestionsRecord>((acc, current) => {
    const marks = answers[String(current.id)] ?? {}
    acc[current.id] = {
      ...current,
      answers: current.answers.map((answer) => ({
        ...answer,
        mark: marks[String(answer.type)],
      })),
    }
    return acc
  }, {})

type LoveLanguageStore = {
  questions: LoveLanguageQuestionsRecord
  setQuestions: (questions: LoveLanguageQuestionsRecord) => void
  updateQuestion: (
    id: number | string,
    patch: Partial<LoveLanguageQuestionState>,
  ) => void
}

export const useLoveLanguageStore = create<LoveLanguageStore>((set) => ({
  questions: buildLoveLanguageQuestions(),
  setQuestions: (questions) => set({ questions }),
  updateQuestion: (id, patch) =>
    set((state) =>
      state.questions[id]
        ? {
            questions: {
              ...state.questions,
              [id]: { ...state.questions[id], ...patch },
            },
          }
        : state,
    ),
}))
