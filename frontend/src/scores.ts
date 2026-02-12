export type CheckIn = {
  mood: number      // 0–100
  energy: number    // 1–5
  sleep: number     // 0–100
  breathing: number // minutes
}

export function calculateMentalScore(c: CheckIn): number {
  return Math.round(
    c.mood * 0.6 +
    c.sleep * 0.3 +
    Math.min(c.breathing * 2, 10)
  )
}

export function calculatePhysicalScore(c: CheckIn): number {
  return Math.round(
    (c.energy / 5) * 60 +
    c.sleep * 0.3 +
    Math.min(c.breathing * 2, 10)
  )
}
