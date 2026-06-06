/** Returns true when the user has selected an answer (including 0 on 0–3 scales). */
export function isSurveyAnswered(value: unknown): boolean {
  return value !== undefined && value !== null && value !== ''
}

/** Gift likert allows 0–3; DISC allows 1–5. */
export function isGiftScore(value: unknown): value is number {
  return typeof value === 'number' && value >= 0 && value <= 3
}

export function isDiscScore(value: unknown): value is number {
  return typeof value === 'number' && value >= 1 && value <= 5
}
