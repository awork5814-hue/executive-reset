export type BreathingDosageLevel = 1 | 2 | 3

export function determineBreathingDosage(
  holisticScore: number,
  syncState: "fresh" | "stale" = "fresh"
): { level: BreathingDosageLevel; durationSeconds: number } {

  if (syncState === "stale") {
    return { level: 1, durationSeconds: 60 }
  }

  if (holisticScore < 60) {
    return { level: 1, durationSeconds: 60 }
  }

  return { level: 2, durationSeconds: 120 }
}
