import { create } from 'zustand'
import { type NextGenGiftType, nextGenGiftQuestions } from '@/constant'

export type NextGenGiftQuestionState = {
  id: number
  text: string
  type: NextGenGiftType
  value?: number
  hasError?: boolean
}

type NextGenGiftQuestionsRecord = Record<string, NextGenGiftQuestionState>

const buildInitial = (): NextGenGiftQuestionsRecord =>
  nextGenGiftQuestions.reduce<NextGenGiftQuestionsRecord>((acc, current) => {
    acc[current.id] = { ...current }
    return acc
  }, {})

type NextGenGiftStore = {
  questions: NextGenGiftQuestionsRecord
  setQuestions: (questions: NextGenGiftQuestionsRecord) => void
  updateQuestion: (
    id: number | string,
    patch: Partial<NextGenGiftQuestionState>,
  ) => void
}

export const useNextGenGiftStore = create<NextGenGiftStore>((set) => ({
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
