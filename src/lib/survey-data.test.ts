import { describe, expect, test } from 'vitest'
import {
  LoveLanguageQuestions,
  LoveLanguageType,
  type NextGenGiftType,
  nextGenGiftQuestions,
} from '@/constant'
import { discSections } from '@/constants/disc'
import { getNextGenQuestionIdsForType } from '@/lib/next-gen-gift-scoring'

describe('survey question banks', () => {
  // Spiritual gift mapping (133 × 19 matrix) is fully covered in gift-mapping.test.ts

  describe('next gen gift (57 questions, 19 categories)', () => {
    test('has 3 questions per gift type A–S', () => {
      expect(nextGenGiftQuestions).toHaveLength(57)

      for (let type = 0; type < 19; type++) {
        const ids = getNextGenQuestionIdsForType(type as NextGenGiftType)
        expect(ids).toHaveLength(3)
        for (const id of ids) {
          const question = nextGenGiftQuestions.find((q) => q.id === id)
          expect(question?.type).toBe(type)
        }
      }
    })

    test('question ids are sequential 1–57 with matching types', () => {
      for (let index = 0; index < nextGenGiftQuestions.length; index++) {
        const question = nextGenGiftQuestions[index]
        expect(question).toBeDefined()
        if (!question) continue
        expect(question.id).toBe(index + 1)
        expect(question.type).toBe(index % 19)
        expect(question.text.length).toBeGreaterThan(0)
      }
    })
  })

  describe('DISC (20 statements, 4 sections)', () => {
    test('has 5 statements per section D/I/S/C', () => {
      expect(discSections).toHaveLength(4)

      for (const section of discSections) {
        expect(section.statements).toHaveLength(5)
        for (const statement of section.statements) {
          expect(statement.length).toBeGreaterThan(0)
        }
      }
    })
  })

  describe('love languages (5 groups, 5 types each)', () => {
    test('each group lists all five love language types once', () => {
      const expectedTypes = [
        LoveLanguageType.A,
        LoveLanguageType.B,
        LoveLanguageType.C,
        LoveLanguageType.D,
        LoveLanguageType.E,
      ]
      expect(LoveLanguageQuestions).toHaveLength(5)

      for (const group of LoveLanguageQuestions) {
        expect(group.answers).toHaveLength(5)
        const types = group.answers.map((answer) => answer.type)
        expect(types.sort()).toEqual(expectedTypes.sort())
      }
    })

    test('types map to LoveLanguageType enum A–E', () => {
      for (const group of LoveLanguageQuestions) {
        for (const answer of group.answers) {
          expect(answer.type).toBeGreaterThanOrEqual(LoveLanguageType.A)
          expect(answer.type).toBeLessThanOrEqual(LoveLanguageType.E)
        }
      }
    })
  })
})
