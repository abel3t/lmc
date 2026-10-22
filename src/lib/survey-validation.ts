/** Returns true when the user has selected an answer (including 0 on 0–3 scales). */
export function isSurveyAnswered(value: unknown): boolean {
  return value !== undefined && value !== null && value !== ''
}
