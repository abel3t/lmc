/** What is actually written to localStorage: the data tagged with its schema version. */
type StoredEnvelope = { v: number; data: unknown }

export type SurveyStorageSpec<T> = {
  key: string
  version: number
  /** Validates data saved under the current version; null discards it. */
  parse: (data: unknown) => T | null
  /** Upgrades data saved under an older version to the current shape. */
  migrate?: (data: unknown, fromVersion: number) => unknown
  /** Keys used before this format; removed once their data is imported. */
  legacyKeys?: readonly string[]
  /** Converts legacy key contents to current data; null imports nothing. */
  readLegacy?: (read: (key: string) => unknown) => T | null
}

/** localStorage, or null when unavailable (SSR, disabled or blocked by the browser). */
function getStorage(): Storage | null {
  try {
    const storage = globalThis.localStorage
    return storage && typeof storage.getItem === 'function' ? storage : null
  } catch {
    return null
  }
}

/** Parsed JSON at `key`, or undefined when missing, unreadable or invalid. */
function readJson(storage: Storage, key: string): unknown {
  try {
    const raw = storage.getItem(key)
    return raw === null ? undefined : JSON.parse(raw)
  } catch {
    return undefined
  }
}

/** Returns false when the browser refuses the write (e.g. quota exceeded). */
function writeJson(storage: Storage, key: string, value: unknown): boolean {
  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function isEnvelope(value: unknown): value is StoredEnvelope {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    'v' in value &&
    Number.isInteger(value.v) &&
    (value.v as number) >= 1
  )
}

function importLegacy<T>(storage: Storage, spec: SurveyStorageSpec<T>): void {
  const legacyKeys = spec.legacyKeys ?? []
  if (!legacyKeys.some((key) => storage.getItem(key) !== null)) return

  if (spec.readLegacy && storage.getItem(spec.key) === null) {
    const data = spec.readLegacy((key) => readJson(storage, key))
    // Keep the legacy data if it could not be saved under the new key.
    if (
      data !== null &&
      !writeJson(storage, spec.key, { v: spec.version, data })
    ) {
      return
    }
  }

  for (const key of legacyKeys) {
    try {
      storage.removeItem(key)
    } catch {
      // Ignore: removal is best-effort cleanup.
    }
  }
}

/** Reads saved survey data, importing legacy keys and upgrading old versions. */
export function readSurveyStorage<T>(spec: SurveyStorageSpec<T>): T | null {
  const storage = getStorage()
  if (!storage) return null

  try {
    importLegacy(storage, spec)
  } catch {
    // A broken legacy entry must not hide data saved under the new key.
  }

  const stored = readJson(storage, spec.key)
  if (!isEnvelope(stored)) return null

  if (stored.v === spec.version) return spec.parse(stored.data)

  // Data from a newer version (e.g. after a rollback) cannot be read safely.
  if (stored.v > spec.version || !spec.migrate) return null

  const data = spec.parse(spec.migrate(stored.data, stored.v))
  if (data !== null) {
    writeJson(storage, spec.key, { v: spec.version, data })
  }
  return data
}

export function writeSurveyStorage<T>(
  spec: SurveyStorageSpec<T>,
  data: T,
): void {
  const storage = getStorage()
  if (!storage) return

  writeJson(storage, spec.key, { v: spec.version, data })
}
