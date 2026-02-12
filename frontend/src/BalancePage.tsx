import { useMemo, useState } from "react"
import type { CheckIn } from "./scores"
import {
  calculateMentalScore,
  calculatePhysicalScore,
} from "./scores"

import DailyCheckIn from "./DailyCheckIn"
import BalanceChart from "./BalanceChart"
import Scores from "./Scores"

export default function BalancePage() {
  const [checkIn, setCheckIn] = useState<CheckIn>({
    mood: 50,
    energy: 3,
    sleep: 50,
    breathing: 0,
  })

  // 🔥 Derived (NOT stored)
  const mentalScore = useMemo(
    () => calculateMentalScore(checkIn),
    [checkIn]
  )

  const physicalScore = useMemo(
    () => calculatePhysicalScore(checkIn),
    [checkIn]
  )

  const chartData = useMemo(
    () => [
      {
        label: "Today",
        mental: mentalScore,
        physical: physicalScore,
      },
    ],
    [mentalScore, physicalScore]
  )

  return (
    <div style={{ padding: 24 }}>
      <h2>Your Balance</h2>

      <DailyCheckIn
        checkIn={checkIn}
        setCheckIn={setCheckIn}
      />

      <Scores
        mental={mentalScore}
        physical={physicalScore}
      />

      <BalanceChart data={chartData} />
    </div>
  )
}
