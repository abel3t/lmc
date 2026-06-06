import { create } from 'zustand'
import { LoveLanguageQuestions, type LoveLanguageType } from '@/constant'

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

export type LoveLanguageQuestionsRecord = Record<
  string,
  LoveLanguageQuestionState
>

const buildInitial = (): LoveLanguageQuestionsRecord =>
  LoveLanguageQuestions.reduce<LoveLanguageQuestionsRecord>((acc, current) => {
    acc[current.id] = { ...current }
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
  questions: buildInitial(),
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
