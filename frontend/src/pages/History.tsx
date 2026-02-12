import { useEffect, useState } from "react"
import { fetchDosageHistory } from "../api/history"
import type { DosageHistoryItem } from "../api/history"

export default function History() {
  const [items, setItems] = useState<DosageHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDosageHistory()
        setItems(data)
      } catch {
        setError("Failed to load dosage history")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <div className="p-4 pb-20">Loading history…</div>
  }

  if (error) {
    return <div className="p-4 pb-20 text-red-500">{error}</div>
  }

  return (
    <div className="p-4 pb-20 space-y-4">
      <h1 className="text-xl font-semibold">Dosage History</h1>

      {items.length === 0 && (
        <p className="text-gray-500">No history yet.</p>
      )}

      <ul className="space-y-3">
        {items.map(item => (
          <li
            key={item.id}
            className="border rounded p-3 flex justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Mental {item.mental_score} · Physical {item.physical_score}
              </p>
            </div>

            <div className="font-semibold">
              {item.recommended_minutes} min
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
