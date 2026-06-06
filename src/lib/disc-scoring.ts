import { DiscType, discSections } from '@/constant'

export const DISC_SCALE_MIN = 1
export const DISC_SCALE_MAX = 5
export const DISC_MAX_SECTION_SCORE = 25

export type DiscAnswerEntry = {
  section: DiscType
  statementIndex: number
  value: number
}

export type DiscResultRecord = Record<string, DiscAnswerEntry>

export type DiscSectionScore = {
  type: DiscType
  title: string
  total: number
}

export function aggregateDiscScores(
  result: DiscResultRecord,
): DiscSectionScore[] {
  const totals: Record<DiscType, number> = {
    [DiscType.D]: 0,
    [DiscType.I]: 0,
    [DiscType.S]: 0,
    [DiscType.C]: 0,
  }

  for (const entry of Object.values(result)) {
    totals[entry.section] += entry.value
  }

  return discSections.map((section) => ({
    type: section.type,
    title: section.title,
    total: totals[section.type],
  }))
}

/** Returns dominant DISC letter(s); ties are all included, ordered D-I-S-C. */
export function getDiscProfile(scores: DiscSectionScore[]): string {
  const max = Math.max(...scores.map((s) => s.total))
  const order: DiscType[] = [DiscType.D, DiscType.I, DiscType.S, DiscType.C]
  const letters = ['D', 'I', 'S', 'C']

  return order
    .map((type, index) =>
      scores.find((s) => s.type === type)?.total === max ? letters[index] : '',
    )
    .join('')
}

export type DiscBlend = {
  /** Highest-scoring type(s). Ties are all included. */
  primary: DiscSectionScore[]
  /** Next-highest distinct score below the primary. Empty when everything ties. */
  secondary: DiscSectionScore[]
}

/**
 * Splits the scores into a primary (dominant) group and a secondary
 * ("minor character") group, since a person commonly blends two styles.
 */
export function getDiscBlend(scores: DiscSectionScore[]): DiscBlend {
  if (scores.length === 0) return { primary: [], secondary: [] }

  const primaryScore = Math.max(...scores.map((s) => s.total))
  const primary = scores.filter((s) => s.total === primaryScore)

  const lower = scores.filter((s) => s.total < primaryScore)
  if (lower.length === 0) return { primary, secondary: [] }

  const secondaryScore = Math.max(...lower.map((s) => s.total))
  const secondary = lower.filter((s) => s.total === secondaryScore)

  return { primary, secondary }
}

export function buildDiscResultFromAnswers(
  answers: Record<string, number | undefined>,
): DiscResultRecord {
  const result: DiscResultRecord = {}

  for (const section of discSections) {
    section.statements.forEach((_, statementIndex) => {
      const key = `${section.type}-${statementIndex}`
      result[key] = {
        section: section.type,
        statementIndex,
        value: answers[key] ?? 0,
      }
    })
  }

  return result
}
