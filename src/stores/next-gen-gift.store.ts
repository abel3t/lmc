import { create } from 'zustand'
import { nextGenGiftQuestions } from '@/constant'

type Questions = Record<string, any>

const buildInitial = (): Questions =>
  nextGenGiftQuestions.reduce((acc: Questions, current) => {
    acc[current.id] = { ...current }
    return acc
  }, {})

type NextGenGiftStore = {
  questions: Questions
  setQuestions: (questions: Questions) => void
  updateQuestion: (id: number | string, patch: Record<string, any>) => void
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
