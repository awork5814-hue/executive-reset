import { create } from "zustand"

/**
 * 🧪 EXPERIMENT MODE
 * true  → allow frequent logs (curve testing)
 * false → 1 log per logical day (4 AM boundary)
 */
const EXPERIMENT_MODE = true

export type DayEntry = {
  date: string          // ISO timestamp in experiment, day-key in prod
  mental: number
  physical: number
}

type RegulationState = {
  history: DayEntry[]
  lastCheckInAt: number | null
  upsertToday: (mental: number, physical: number) => void
}

/**
 * Logical day key using 4 AM boundary
 */
function getDayKey() {
  const now = new Date()
  const boundary = new Date(now)
  boundary.setHours(4, 0, 0, 0)

  if (now < boundary) {
    boundary.setDate(boundary.getDate() - 1)
  }

  return boundary.toISOString().slice(0, 10) // YYYY-MM-DD
}

export const useRegulationStore = create<RegulationState>((set) => ({
  history: [],
  lastCheckInAt: null,

  upsertToday: (mental, physical) =>
    set((state) => {
      const now = Date.now()

      /* ==========================
         🧪 EXPERIMENT MODE
         each log = new chart point
         ========================== */
      if (EXPERIMENT_MODE) {
        return {
          history: [
            ...state.history,
            {
              date: new Date().toISOString(), // unique X value
              mental,
              physical,
            },
          ],
          lastCheckInAt: now,
        }
      }

      /* ==========================
         🟢 PRODUCTION MODE
         one log per logical day
         ========================== */
      const dayKey = getDayKey()
      const index = state.history.findIndex(
        (d) => d.date === dayKey
      )

      if (index !== -1) {
        const updated = [...state.history]
        updated[index] = { date: dayKey, mental, physical }
        return { history: updated, lastCheckInAt: now }
      }

      return {
        history: [
          ...state.history,
          { date: dayKey, mental, physical },
        ],
        lastCheckInAt: now,
      }
    }),
}))
