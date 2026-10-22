import type { Page } from '@playwright/test'

export { LEGACY_STORAGE_KEYS, SURVEY_STORAGE } from '../src/constants/storage'

/** What the app writes: data tagged with its schema version. */
export const envelope = (data: unknown, v = 1) => ({ v, data })

/** Seeds localStorage before every page load of the test (survives reloads). */
export async function seedEveryLoad(
  page: Page,
  entries: Record<string, unknown>,
) {
  await page.addInitScript((items) => {
    for (const [key, value] of Object.entries(items)) {
      localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      )
    }
  }, entries)
}

/** Seeds localStorage once, so later loads see only what the app itself wrote. */
export async function seedOnce(page: Page, entries: Record<string, unknown>) {
  await page.goto('/')
  await page.evaluate((items) => {
    localStorage.clear()
    for (const [key, value] of Object.entries(items)) {
      localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      )
    }
  }, entries)
}

export async function readStorage(page: Page, key: string): Promise<unknown> {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key)
  return raw === null ? null : JSON.parse(raw)
}

export async function storageKeys(page: Page): Promise<string[]> {
  return page.evaluate(() => Object.keys(localStorage).sort())
}

/** `{ "0-0": v, ... }` for the 4 × 5 DISC statements. */
export function discAnswers(valueFor: (section: number) => number) {
  const answers: Record<string, number> = {}
  for (let section = 0; section < 4; section++) {
    for (let index = 0; index < 5; index++) {
      answers[`${section}-${index}`] = valueFor(section)
    }
  }
  return answers
}

/** `{ "1": v, ..., "<count>": v }` for the gift surveys. */
export function idAnswers(count: number, valueFor: (id: number) => number) {
  const answers: Record<string, number> = {}
  for (let id = 1; id <= count; id++) answers[String(id)] = valueFor(id)
  return answers
}

/** Love language: in all 5 groups, type T (0 = A … 4 = E) gets mark 5 - T. */
export function loveLanguageAnswers() {
  const answers: Record<string, Record<string, number>> = {}
  for (let group = 1; group <= 5; group++) {
    answers[String(group)] = { '0': 5, '1': 4, '2': 3, '3': 2, '4': 1 }
  }
  return answers
}
