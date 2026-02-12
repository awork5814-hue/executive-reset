import { client } from "./client"

export type DosageHistoryItem = {
  id: number
  mental_score: number
  physical_score: number
  recommended_minutes: number
  created_at: string
}

export async function fetchDosageHistory(): Promise<DosageHistoryItem[]> {
  const res = await client.get("/dosage-history")
  return res.data
}
