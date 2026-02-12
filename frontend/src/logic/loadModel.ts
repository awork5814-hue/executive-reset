// src/logic/loadModel.ts

export type LoadState = {
  mental: number   // 0–100 (higher = worse)
  physical: number
}

type CheckInInput = {
  mood: number        // 0–100 (higher = better)
  energy: number     // 1–5   (higher = better)
  sleep: number      // 0–100
  breathingMinutes: number
}

/* -------------------------------
   Utility
-------------------------------- */
const clamp = (v: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, v))

/* -------------------------------
   Diminishing returns curve
-------------------------------- */
function regulationEffect(minutes: number) {
  // logarithmic saturation
  return Math.log(minutes + 1) / Math.log(6) // ~0 → 1
}

/* -------------------------------
   Instant stress signals (0–100)
-------------------------------- */
function mentalSignal({ mood, sleep }: CheckInInput) {
  const moodStress = 100 - mood
  const sleepStress = 100 - sleep

  // interaction penalty
  const interaction =
    mood < 40 && sleep < 40 ? 10 : 0

  return clamp(
    0.6 * moodStress +
    0.4 * sleepStress +
    interaction
  )
}

function physicalSignal({ energy, sleep }: CheckInInput) {
  const energyStress = (5 - energy) * 25
  const sleepStress = (100 - sleep) * 0.3

  return clamp(
    0.7 * energyStress +
    0.3 * sleepStress
  )
}

/* -------------------------------
   Main update function
-------------------------------- */
export function updateLoad(
  previous: LoadState,
  input: CheckInInput
): LoadState {
  const persistence = 0.8
  const sensitivity = 0.5

  const mentalToday = mentalSignal(input)
  const physicalToday = physicalSignal(input)

  const regulation = regulationEffect(input.breathingMinutes)

  const mentalReduction = regulation * 25
  const physicalReduction = regulation * 15

  return {
    mental: clamp(
      previous.mental * persistence +
      mentalToday * sensitivity -
      mentalReduction
    ),
    physical: clamp(
      previous.physical * persistence +
      physicalToday * sensitivity -
      physicalReduction
    ),
  }
}
