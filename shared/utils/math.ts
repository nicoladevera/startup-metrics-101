/**
 * Safely performs division and returns null when the denominator is 0 or not finite.
 * This allows calculators to distinguish between a calculated 0% result and
 * an undefined/incalculable result.
 */
export function safeDivide(numerator: number, denominator: number): number | null {
  if (!isFinite(denominator) || denominator === 0) {
    return null;
  }
  return numerator / denominator;
}




