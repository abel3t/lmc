import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import {
  readSurveyStorage,
  type SurveyStorageSpec,
  writeSurveyStorage,
} from '@/lib/survey-storage'

type Answers = Record<string, number>

const KEY = 'lmc:test'

/** Accepts `{ [id]: number }` only, mirroring the real survey parsers. */
function parseAnswers(data: unknown): Answers | null {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return null
  }
  const answers: Answers = {}
  for (const [id, value] of Object.entries(data)) {
    if (typeof value === 'number') answers[id] = value
  }
  return answers
}

function spec(overrides: Partial<SurveyStorageSpec<Answers>> = {}) {
  return { key: KEY, version: 1, parse: parseAnswers, ...overrides }
}

function stored(key = KEY): unknown {
  const raw = localStorage.getItem(key)
  return raw === null ? null : JSON.parse(raw)
}

function setRaw(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

const realStorage = globalThis.localStorage

function replaceStorage(value: unknown) {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get: () => value,
  })
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: realStorage,
  })
  localStorage.clear()
})

describe('survey-storage: envelope', () => {
  test('writes data wrapped with the schema version', () => {
    writeSurveyStorage(spec({ version: 3 }), { '1': 2 })
    expect(stored()).toEqual({ v: 3, data: { '1': 2 } })
  })

  test('round-trips data through write and read', () => {
    writeSurveyStorage(spec(), { '1': 2, '2': 3 })
    expect(readSurveyStorage(spec())).toEqual({ '1': 2, '2': 3 })
  })

  test('overwrites previous data on write', () => {
    writeSurveyStorage(spec(), { '1': 2 })
    writeSurveyStorage(spec(), { '1': 0 })
    expect(readSurveyStorage(spec())).toEqual({ '1': 0 })
  })

  test('returns null when nothing is stored', () => {
    expect(readSurveyStorage(spec())).toBeNull()
  })

  test('returns null for invalid JSON', () => {
    localStorage.setItem(KEY, 'not-json{')
    expect(readSurveyStorage(spec())).toBeNull()
  })

  test.each([
    ['a bare answers object', { '1': 2 }],
    ['an array', [1, 2]],
    ['a string', 'hello'],
    ['null', null],
    ['an envelope without data', { v: 1 }],
    ['an envelope without version', { data: { '1': 2 } }],
    ['a non-integer version', { v: 1.5, data: { '1': 2 } }],
    ['a string version', { v: '1', data: { '1': 2 } }],
    ['version 0', { v: 0, data: { '1': 2 } }],
    ['a negative version', { v: -1, data: { '1': 2 } }],
  ])('returns null for %s', (_, value) => {
    setRaw(KEY, value)
    expect(readSurveyStorage(spec())).toBeNull()
  })

  test('returns whatever parse returns for the current version', () => {
    setRaw(KEY, { v: 1, data: { '1': 2, '2': 'x' } })
    expect(readSurveyStorage(spec())).toEqual({ '1': 2 })
  })

  test('returns null when parse rejects the data', () => {
    setRaw(KEY, { v: 1, data: 'garbage' })
    expect(readSurveyStorage(spec())).toBeNull()
  })

  test('keeps separate surveys under separate keys', () => {
    const other = spec({ key: 'lmc:other' })
    writeSurveyStorage(spec(), { '1': 1 })
    writeSurveyStorage(other, { '1': 3 })
    expect(readSurveyStorage(spec())).toEqual({ '1': 1 })
    expect(readSurveyStorage(other)).toEqual({ '1': 3 })
  })
})

describe('survey-storage: versions', () => {
  test('ignores data from a newer version (e.g. after a rollback)', () => {
    setRaw(KEY, { v: 2, data: { '1': 2 } })
    expect(readSurveyStorage(spec())).toBeNull()
    // The newer data is left untouched for the newer app version.
    expect(stored()).toEqual({ v: 2, data: { '1': 2 } })
  })

  test('ignores older data when the spec has no migrate step', () => {
    setRaw(KEY, { v: 1, data: { '1': 2 } })
    expect(readSurveyStorage(spec({ version: 2 }))).toBeNull()
  })

  test('migrates older data and saves it under the current version', () => {
    setRaw(KEY, { v: 1, data: { '1': 1 } })
    const migrated = spec({
      version: 2,
      migrate: (data, from) => {
        expect(from).toBe(1)
        const answers = data as Answers
        return Object.fromEntries(
          Object.entries(answers).map(([id, value]) => [id, 6 - value]),
        )
      },
    })

    expect(readSurveyStorage(migrated)).toEqual({ '1': 5 })
    expect(stored()).toEqual({ v: 2, data: { '1': 5 } })
    // Reading again uses the saved v2 data without migrating twice.
    expect(readSurveyStorage(migrated)).toEqual({ '1': 5 })
  })

  test('passes the stored version so migrations can chain', () => {
    const seen: number[] = []
    const migrated = spec({
      version: 3,
      migrate: (data, from) => {
        seen.push(from)
        return data
      },
    })

    setRaw(KEY, { v: 1, data: { '1': 1 } })
    readSurveyStorage(migrated)
    setRaw(KEY, { v: 2, data: { '1': 1 } })
    readSurveyStorage(migrated)

    expect(seen).toEqual([1, 2])
  })

  test('returns null and leaves storage alone when migrated data is invalid', () => {
    setRaw(KEY, { v: 1, data: { '1': 1 } })
    const migrated = spec({ version: 2, migrate: () => 'broken' })

    expect(readSurveyStorage(migrated)).toBeNull()
    expect(stored()).toEqual({ v: 1, data: { '1': 1 } })
  })
})

describe('survey-storage: legacy keys', () => {
  const legacy = (overrides: Partial<SurveyStorageSpec<Answers>> = {}) =>
    spec({
      legacyKeys: ['oldAnswers', 'oldResult'],
      readLegacy: (read) => parseAnswers(read('oldAnswers')),
      ...overrides,
    })

  test('imports legacy data into the new key and removes legacy keys', () => {
    setRaw('oldAnswers', { '1': 2 })
    setRaw('oldResult', { anything: true })

    expect(readSurveyStorage(legacy())).toEqual({ '1': 2 })
    expect(stored()).toEqual({ v: 1, data: { '1': 2 } })
    expect(localStorage.getItem('oldAnswers')).toBeNull()
    expect(localStorage.getItem('oldResult')).toBeNull()
  })

  test('hands readLegacy parsed JSON and undefined for missing keys', () => {
    setRaw('oldAnswers', { '1': 2 })
    const seen: Record<string, unknown> = {}

    readSurveyStorage(
      legacy({
        readLegacy: (read) => {
          seen.oldAnswers = read('oldAnswers')
          seen.missing = read('missing')
          return null
        },
      }),
    )

    expect(seen).toEqual({ oldAnswers: { '1': 2 }, missing: undefined })
  })

  test('prefers existing new data and still removes legacy keys', () => {
    writeSurveyStorage(spec(), { '1': 3 })
    setRaw('oldAnswers', { '1': 0 })

    expect(readSurveyStorage(legacy())).toEqual({ '1': 3 })
    expect(localStorage.getItem('oldAnswers')).toBeNull()
  })

  test('removes legacy keys when readLegacy imports nothing', () => {
    setRaw('oldResult', { anything: true })

    expect(readSurveyStorage(legacy())).toBeNull()
    expect(localStorage.getItem('oldResult')).toBeNull()
    expect(localStorage.getItem(KEY)).toBeNull()
  })

  test('removes legacy keys when there is no readLegacy at all', () => {
    setRaw('oldAnswers', { '1': 2 })

    expect(readSurveyStorage(spec({ legacyKeys: ['oldAnswers'] }))).toBeNull()
    expect(localStorage.getItem('oldAnswers')).toBeNull()
  })

  test('drops unreadable legacy JSON without throwing', () => {
    localStorage.setItem('oldAnswers', '{broken')

    expect(readSurveyStorage(legacy())).toBeNull()
    expect(localStorage.getItem('oldAnswers')).toBeNull()
  })

  test('a throwing readLegacy is contained and imports nothing', () => {
    setRaw('oldAnswers', { '1': 2 })
    const throwing = legacy({
      readLegacy: () => {
        throw new Error('boom')
      },
    })

    expect(readSurveyStorage(throwing)).toBeNull()
    expect(localStorage.getItem(KEY)).toBeNull()
  })

  test('does not call readLegacy when new data already exists', () => {
    writeSurveyStorage(spec(), { '1': 1 })
    setRaw('oldAnswers', { '1': 2 })
    let called = false

    readSurveyStorage(
      legacy({
        readLegacy: () => {
          called = true
          return null
        },
      }),
    )
    expect(called).toBe(false)
  })

  test('does nothing to unrelated keys', () => {
    localStorage.setItem('someoneElse', 'keep me')
    setRaw('oldAnswers', { '1': 2 })

    readSurveyStorage(legacy())
    expect(localStorage.getItem('someoneElse')).toBe('keep me')
  })

  test('is a no-op on later reads once legacy keys are gone', () => {
    setRaw('oldAnswers', { '1': 2 })
    readSurveyStorage(legacy())
    writeSurveyStorage(spec(), { '1': 3 })

    expect(readSurveyStorage(legacy())).toEqual({ '1': 3 })
  })
})

describe('survey-storage: unavailable or failing storage', () => {
  test('reads null and ignores writes when localStorage is undefined (SSR)', () => {
    replaceStorage(undefined)
    expect(readSurveyStorage(spec())).toBeNull()
    expect(() => writeSurveyStorage(spec(), { '1': 1 })).not.toThrow()
  })

  test('survives a browser that throws on accessing localStorage', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get: () => {
        throw new Error('SecurityError')
      },
    })
    expect(readSurveyStorage(spec())).toBeNull()
    expect(() => writeSurveyStorage(spec(), { '1': 1 })).not.toThrow()
  })

  test('survives getItem throwing', () => {
    replaceStorage({
      getItem: () => {
        throw new Error('denied')
      },
      setItem: () => {},
      removeItem: () => {},
    })
    expect(readSurveyStorage(spec())).toBeNull()
  })

  test('survives setItem throwing (quota exceeded)', () => {
    replaceStorage({
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
      removeItem: () => {},
    })
    expect(() => writeSurveyStorage(spec(), { '1': 1 })).not.toThrow()
  })

  test('keeps legacy data when it cannot be saved under the new key', () => {
    const data = new Map<string, string>([
      ['oldAnswers', JSON.stringify({ '1': 2 })],
    ])
    const removed: string[] = []
    replaceStorage({
      getItem: (key: string) => data.get(key) ?? null,
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
      removeItem: (key: string) => removed.push(key),
    })

    readSurveyStorage(
      spec({
        legacyKeys: ['oldAnswers'],
        readLegacy: (read) => parseAnswers(read('oldAnswers')),
      }),
    )
    expect(removed).toEqual([])
  })

  test('survives removeItem throwing during legacy cleanup', () => {
    const data = new Map<string, string>([
      ['oldAnswers', JSON.stringify({ '1': 2 })],
    ])
    replaceStorage({
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => data.set(key, value),
      removeItem: () => {
        throw new Error('denied')
      },
    })

    expect(
      readSurveyStorage(
        spec({
          legacyKeys: ['oldAnswers'],
          readLegacy: (read) => parseAnswers(read('oldAnswers')),
        }),
      ),
    ).toEqual({ '1': 2 })
  })
})
