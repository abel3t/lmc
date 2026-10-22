import { create } from 'zustand'
import { type DiscType, discSections } from '@/constant'
import { type DiscAnswers, discAnswerKey } from '@/lib/disc-scoring'

type DiscStatementState = {
  value?: number
  hasError?: boolean
}

type DiscSectionState = {
  type: DiscType
  statements: DiscStatementState[]
}

type DiscStore = {
  sections: DiscSectionState[]
  setSections: (sections: DiscSectionState[]) => void
  updateStatement: (
    sectionType: DiscType,
    statementIndex: number,
    patch: Partial<DiscStatementState>,
  ) => void
}

/** Store sections with saved answers filled in (empty when none). */
export const buildDiscSections = (
  answers: DiscAnswers = {},
): DiscSectionState[] =>
  discSections.map((section) => ({
    type: section.type,
    statements: section.statements.map((_, index) => {
      const value = answers[discAnswerKey(section.type, index)]
      return value === undefined ? {} : { value }
    }),
  }))

export const useDiscStore = create<DiscStore>((set) => ({
  sections: buildDiscSections(),
  setSections: (sections) => set({ sections }),
  updateStatement: (sectionType, statementIndex, patch) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.type === sectionType
          ? {
              ...section,
              statements: section.statements.map((statement, index) =>
                index === statementIndex
                  ? { ...statement, ...patch }
                  : statement,
              ),
            }
          : section,
      ),
    })),
}))
