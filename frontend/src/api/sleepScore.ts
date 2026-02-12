type SleepScoreInput = {
  actual_sleep_hours: number
  sleep_target_hours?: number
  time_in_bed_hours?: number
}

export function computeSleepScore({
  actual_sleep_hours,
  sleep_target_hours = 8.0,
  time_in_bed_hours,
}: SleepScoreInput): number {
  if (actual_sleep_hours <= 0 || sleep_target_hours <= 0) {
    return 0
  }

  // Step 1 — Base Score
  let score =
    (actual_sleep_hours / sleep_target_hours) * 100

  // Step 2 — Efficiency Penalty
  if (
    typeof time_in_bed_hours === "number" &&
    time_in_bed_hours - actual_sleep_hours >= 1.5
  ) {
    score -= 10
  }

  // Step 3 — Guardrails
  if (score > 100) score = 100
  if (score < 0) score = 0

  return Math.round(score)
}
