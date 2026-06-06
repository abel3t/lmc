import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { readSurveyStorage, writeSurveyStorage } from '@/lib/survey-storage'

const storage = new Map<string, string>()

beforeEach(() => {
  storage.clear()
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => {
      storage.set(key, value)
    },
    removeItem: (key) => {
      storage.delete(key)
    },
    clear: () => storage.clear(),
    key: () => null,
    length: 0,
  } as Storage
})

afterEach(() => {
  storage.clear()
})

describe('survey-storage', () => {
  test('reads and writes JSON values', () => {
    writeSurveyStorage('giftAnswers', { '1': 2, '2': 3 })
    expect(readSurveyStorage('giftAnswers')).toEqual({ '1': 2, '2': 3 })
  })

  test('returns null for missing or invalid JSON', () => {
    expect(readSurveyStorage('giftAnswers')).toBeNull()
    storage.set('giftAnswers', 'not-json')
    expect(readSurveyStorage('giftAnswers')).toBeNull()
  })
})
