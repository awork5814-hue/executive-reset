type HolisticInputs = {
  sleep?: number      // 0–100
  steps?: number      // 0–100
  mood?: number       // 0–100
}

const WEIGHTS = {
  sleep: 0.4,
  steps: 0.3,
  mood: 0.3,
}

export function computeHolisticScore(
  inputs: HolisticInputs
): number | null {
  const presentEntries = Object.entries(inputs).filter(
    ([_, value]) => typeof value === "number"
  )

  if (presentEntries.length === 0) {
    return null
  }

  const totalWeight = presentEntries.reduce(
    (sum, [key]) =>
      sum + WEIGHTS[key as keyof typeof WEIGHTS],
    0
  )

  const score = presentEntries.reduce(
    (sum, [key, value]) => {
      const weight =
        WEIGHTS[key as keyof typeof WEIGHTS] / totalWeight
      return sum + value! * weight
    },
    0
  )

  return Math.round(score)
}
