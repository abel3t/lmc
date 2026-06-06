import { beforeEach, describe, expect, test } from 'bun:test'
import { readSurveyStorage, writeSurveyStorage } from '@/lib/survey-storage'

beforeEach(() => {
  localStorage.clear()
})

describe('survey-storage', () => {
  test('reads and writes JSON values', () => {
    writeSurveyStorage('giftAnswers', { '1': 2, '2': 3 })
    expect(readSurveyStorage<Record<string, number>>('giftAnswers')).toEqual({
      '1': 2,
      '2': 3,
    })
  })

  test('returns null for missing or invalid JSON', () => {
    expect(readSurveyStorage('giftAnswers')).toBeNull()
    localStorage.setItem('giftAnswers', 'not-json')
    expect(readSurveyStorage('giftAnswers')).toBeNull()
  })

  test('returns null when browser storage is unavailable', () => {
    const previousStorage = globalThis.localStorage
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: undefined,
    })

    expect(readSurveyStorage('giftAnswers')).toBeNull()
    writeSurveyStorage('giftAnswers', { '1': 1 })

    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: previousStorage,
    })
  })
})
