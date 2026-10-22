import { beforeEach, describe, expect, test } from 'vitest'
import { LoveLanguageQuestions, nextGenGiftQuestions } from '@/constant'
import { DiscType } from '@/constants/disc'
import {
  isLoveLanguageSurveyComplete,
  toLoveLanguageAnswers,
} from '@/lib/love-language-scoring'
import { buildDiscSections, useDiscStore } from '@/stores/disc.store'
import {
  buildLoveLanguageQuestions,
  useLoveLanguageStore,
} from '@/stores/love-language.store'
import {
  buildNextGenGiftQuestions,
  useNextGenGiftStore,
} from '@/stores/next-gen-gift.store'

describe('disc store', () => {
  beforeEach(() => {
    useDiscStore.setState({ sections: useDiscStore.getState().sections })
    const initial = useDiscStore.getState().sections.map((section) => ({
      type: section.type,
      statements: section.statements.map(() => ({})),
    }))
    useDiscStore.setState({ sections: initial })
  })

  test('initializes four sections with five empty statements each', () => {
    const { sections } = useDiscStore.getState()
    expect(sections).toHaveLength(4)
    expect(sections.every((section) => section.statements.length === 5)).toBe(
      true,
    )
  })

  test('updateStatement patches the targeted statement', () => {
    useDiscStore.getState().updateStatement(DiscType.I, 2, { value: 4 })

    const section = useDiscStore
      .getState()
      .sections.find((item) => item.type === DiscType.I)
    expect(section?.statements[2]?.value).toBe(4)
    expect(section?.statements[0]?.value).toBeUndefined()
  })

  test('setSections replaces all section state', () => {
    const custom = useDiscStore.getState().sections.map((section) => ({
      ...section,
      statements: section.statements.map(() => ({ value: 3 })),
    }))
    useDiscStore.getState().setSections(custom)

    expect(
      useDiscStore
        .getState()
        .sections.every((section) =>
          section.statements.every((statement) => statement.value === 3),
        ),
    ).toBe(true)
  })
})

describe('love language store', () => {
  beforeEach(() => {
    const { questions } = useLoveLanguageStore.getState()
    const reset = Object.fromEntries(
      Object.entries(questions).map(([id, question]) => [
        id,
        {
          ...question,
          hasError: false,
          answers: question.answers.map((answer) => ({
            ...answer,
            mark: undefined,
            hasError: false,
          })),
        },
      ]),
    )
    useLoveLanguageStore.setState({ questions: reset })
  })

  test('initializes five groups with five answers each', () => {
    const { questions } = useLoveLanguageStore.getState()
    expect(Object.keys(questions)).toHaveLength(5)
    for (const question of Object.values(questions)) {
      expect(question.answers).toHaveLength(5)
    }
  })

  test('updateQuestion merges partial group state', () => {
    const group = useLoveLanguageStore.getState().questions['1']
    expect(group).toBeDefined()
    if (!group) return
    const answers = group.answers.map((answer, index) => ({
      ...answer,
      mark: index + 1,
    }))

    useLoveLanguageStore.getState().updateQuestion(1, { ...group, answers })

    expect(
      useLoveLanguageStore.getState().questions['1']?.answers[0]?.mark,
    ).toBe(1)
  })

  test('setQuestions replaces all group state', () => {
    const { questions } = useLoveLanguageStore.getState()
    useLoveLanguageStore.getState().setQuestions(questions)
    expect(Object.keys(useLoveLanguageStore.getState().questions)).toHaveLength(
      5,
    )
  })

  test('updateQuestion ignores unknown ids', () => {
    const before = useLoveLanguageStore.getState().questions
    useLoveLanguageStore
      .getState()
      .updateQuestion(999, { id: 999, answers: [] })
    expect(useLoveLanguageStore.getState().questions).toEqual(before)
  })
})

describe('next gen gift store', () => {
  beforeEach(() => {
    const { questions } = useNextGenGiftStore.getState()
    const reset = Object.fromEntries(
      Object.entries(questions).map(([id, question]) => [
        id,
        { ...question, value: undefined, hasError: false },
      ]),
    )
    useNextGenGiftStore.setState({ questions: reset })
  })

  test('initializes all 57 questions', () => {
    expect(Object.keys(useNextGenGiftStore.getState().questions)).toHaveLength(
      57,
    )
  })

  test('updateQuestion patches a single question', () => {
    useNextGenGiftStore
      .getState()
      .updateQuestion(1, { value: 2, hasError: false })
    expect(useNextGenGiftStore.getState().questions['1']?.value).toBe(2)
  })

  test('setQuestions replaces all question state', () => {
    const { questions } = useNextGenGiftStore.getState()
    const reset = Object.fromEntries(
      Object.entries(questions).map(([id, question]) => [
        id,
        { ...question, value: 1 },
      ]),
    )
    useNextGenGiftStore.getState().setQuestions(reset)
    expect(useNextGenGiftStore.getState().questions['1']?.value).toBe(1)
  })

  test('updateQuestion ignores unknown ids', () => {
    const before = useNextGenGiftStore.getState().questions
    useNextGenGiftStore.getState().updateQuestion(999, { value: 3 })
    expect(useNextGenGiftStore.getState().questions).toEqual(before)
  })
})

describe('store builders from saved answers', () => {
  test('buildDiscSections fills saved values and leaves the rest empty', () => {
    const sections = buildDiscSections({ '0-0': 5, '3-4': 1 })
    expect(sections).toHaveLength(4)
    expect(sections[0]?.statements[0]).toEqual({ value: 5 })
    expect(sections[0]?.statements[1]).toEqual({})
    expect(sections[3]?.statements[4]).toEqual({ value: 1 })
  })

  test('buildDiscSections with no answers matches the initial store', () => {
    expect(buildDiscSections()).toEqual(
      buildDiscSections({}).map((section) => ({
        ...section,
        statements: section.statements.map(() => ({})),
      })),
    )
  })

  test('buildNextGenGiftQuestions keeps question text and fills values', () => {
    const questions = buildNextGenGiftQuestions({ '1': 0, '57': 3 })
    expect(Object.keys(questions)).toHaveLength(57)
    expect(questions['1']?.value).toBe(0)
    expect(questions['57']?.value).toBe(3)
    expect(questions['2']?.value).toBeUndefined()
    expect(questions['1']?.text).toBe(nextGenGiftQuestions[0]?.text)
  })

  test('buildLoveLanguageQuestions maps group → type → mark onto answers', () => {
    const questions = buildLoveLanguageQuestions({
      '1': { '0': 5, '4': 1 },
    })
    const group = questions['1']
    expect(group?.answers.find((a) => a.type === 0)?.mark).toBe(5)
    expect(group?.answers.find((a) => a.type === 4)?.mark).toBe(1)
    expect(group?.answers.find((a) => a.type === 1)?.mark).toBeUndefined()
    expect(questions['2']?.answers.every((a) => a.mark === undefined)).toBe(
      true,
    )
    // Text always comes from the current question bank, never from storage.
    expect(group?.answers[0]?.text).toBe(
      LoveLanguageQuestions[0]?.answers[0]?.text,
    )
  })

  test('love language answers survive store → answers → store', () => {
    const answers = Object.fromEntries(
      LoveLanguageQuestions.map((group) => [
        String(group.id),
        Object.fromEntries(
          group.answers.map((answer) => [String(answer.type), answer.type + 1]),
        ),
      ]),
    )
    const questions = buildLoveLanguageQuestions(answers)
    expect(toLoveLanguageAnswers(questions)).toEqual(answers)
    expect(isLoveLanguageSurveyComplete(questions)).toBe(true)
  })
})
