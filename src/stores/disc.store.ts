import { create } from 'zustand'
import { type DiscType, discSections } from '@/constant'

export type DiscStatementState = {
  value?: number
  hasError?: boolean
}

export type DiscSectionState = {
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

const buildInitial = (): DiscSectionState[] =>
  discSections.map((section) => ({
    type: section.type,
    statements: section.statements.map(() => ({})),
  }))

export const useDiscStore = create<DiscStore>((set) => ({
  sections: buildInitial(),
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
