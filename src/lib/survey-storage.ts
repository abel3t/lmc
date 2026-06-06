function canUseStorage(): boolean {
  return (
    typeof localStorage !== 'undefined' &&
    typeof localStorage.getItem === 'function'
  )
}

/** Read JSON from localStorage, or null if missing/invalid/unavailable (SSR). */
export function readSurveyStorage<T>(key: string): T | null {
  if (!canUseStorage()) return null

  const raw = localStorage.getItem(key)
  if (!raw) return null

  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function writeSurveyStorage(key: string, value: unknown): void {
  if (!canUseStorage()) return

  localStorage.setItem(key, JSON.stringify(value))
}
