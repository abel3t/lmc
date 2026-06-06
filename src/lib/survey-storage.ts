/** Read JSON from localStorage, or null if missing/invalid. */
export function readSurveyStorage<T>(key: string): T | null {
  const raw = localStorage.getItem(key)
  if (!raw) return null

  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function writeSurveyStorage(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}
