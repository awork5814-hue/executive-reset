import { useEffect, useState } from "react"
import type { CheckInData } from "../types/checkIn"

export function useCheckIn() {
  const [latestCheckIn, setLatestCheckIn] = useState<CheckInData | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem("latest_checkin")
    if (!raw) {
      setLatestCheckIn(null)
      return
    }

    try {
      const parsed: unknown = JSON.parse(raw)

      // Minimal runtime validation (trust but verify)
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "timestamp" in parsed
      ) {
        setLatestCheckIn(parsed as CheckInData)
      } else {
        setLatestCheckIn(null)
      }
    } catch {
      setLatestCheckIn(null)
    }
  }, [])

  return { latestCheckIn }
}
