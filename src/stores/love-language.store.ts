import { create } from 'zustand'
import { LoveLanguageQuestions } from '@/constant'

type Questions = Record<string, any>

const buildInitial = (): Questions =>
  LoveLanguageQuestions.reduce((acc: Questions, current) => {
    acc[current.id] = { ...current }
    return acc
  }, {})

type LoveLanguageStore = {
  questions: Questions
  setQuestions: (questions: Questions) => void
  updateQuestion: (id: number | string, patch: Record<string, any>) => void
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
