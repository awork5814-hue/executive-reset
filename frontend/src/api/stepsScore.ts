type StepsScoreInput = {
  steps: number
  daily_step_goal: number
}

export function computeStepsScore({
  steps,
  daily_step_goal,
}: StepsScoreInput): number {
  if (steps <= 0 || daily_step_goal <= 0) {
    return 0
  }

  const score =
    (steps / daily_step_goal) * 100

  return Math.min(Math.round(score), 100)
}
