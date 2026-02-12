import { client } from "./client"

export type DosageRequest = {
  mental_state: number
  physical_state: number
}

export type DosagePreviewResponse = {
  recommended_minutes: number
  reason: string
}

export async function previewDosage(
  payload: DosageRequest
): Promise<DosagePreviewResponse> {
  const res = await client.post("/dosage/preview", payload)
  return res.data
}

export async function confirmDosage(
  payload: DosageRequest
): Promise<void> {
  await client.post("/dosage/confirm", payload)
}
