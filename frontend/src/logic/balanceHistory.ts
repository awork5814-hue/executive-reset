export type BalanceEntry = {
  date: string // YYYY-MM-DD
  mentalScore: number
  physicalScore: number
}

const STORAGE_KEY = "balance-history"

export function loadHistory(): BalanceEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  return JSON.parse(raw)
}

export function saveEntry(entry: BalanceEntry) {
  const history = loadHistory()

  const updated = history.filter(h => h.date !== entry.date)
  updated.push(entry)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}
