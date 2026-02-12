export type DailyScore = {
  date: string // "2026-02-11"
  mental: number
  physical: number
}

const STORAGE_KEY = "weekly-history"

export function loadHistory(): DailyScore[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveTodayScore(mental: number, physical: number) {
  const today = new Date().toISOString().slice(0, 10)

  const history = loadHistory()

  // Replace today if it exists
  const filtered = history.filter(d => d.date !== today)

  filtered.push({ date: today, mental, physical })

  // Keep last 7 days only
  const last7 = filtered.slice(-7)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(last7))
}
