import type { LoadState } from "./loadModel"

export function getRecommendation(load: LoadState) {
  if (load.mental > 70) {
    return {
      text: "Your mental load is elevated. Try 4 minutes of box breathing.",
      target: "practice",
      minutes: 4,
    }
  }

  if (load.physical > load.mental + 20) {
    return {
      text: "Your body looks fatigued. Keep today’s breathing gentle.",
      target: "practice",
      minutes: 2,
    }
  }

  if (load.mental < 40 && load.physical < 40) {
    return {
      text: "You’re balanced today. Maintenance breathing is optional.",
      target: null,
      minutes: 0,
    }
  }

  return {
    text: "A short breathing session could help reset your state.",
    target: "practice",
    minutes: 3,
  }
}
