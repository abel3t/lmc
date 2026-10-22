import { create } from 'zustand'
import { type NextGenGiftType, nextGenGiftQuestions } from '@/constant'
import type { NextGenGiftAnswers } from '@/lib/next-gen-gift-scoring'

type NextGenGiftQuestionState = {
  id: number
  text: string
  type: NextGenGiftType
  value?: number
  hasError?: boolean
}

type NextGenGiftQuestionsRecord = Record<string, NextGenGiftQuestionState>

/** Store questions with saved answers filled in (empty when none). */
export const buildNextGenGiftQuestions = (
  answers: NextGenGiftAnswers = {},
): NextGenGiftQuestionsRecord =>
  nextGenGiftQuestions.reduce<NextGenGiftQuestionsRecord>((acc, current) => {
    acc[current.id] = { ...current, value: answers[String(current.id)] }
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
  questions: buildNextGenGiftQuestions(),
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
