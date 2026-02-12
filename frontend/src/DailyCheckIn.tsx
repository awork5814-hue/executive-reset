import type { CheckIn } from "./scores"

type Props = {
  checkIn: CheckIn
  setCheckIn: React.Dispatch<React.SetStateAction<CheckIn>>
}

export default function DailyCheckIn({ checkIn, setCheckIn }: Props) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3>Daily Check-In</h3>

      <label>Mood: {checkIn.mood}</label>
      <input
        type="range"
        min={0}
        max={100}
        value={checkIn.mood}
        onChange={(e) =>
          setCheckIn(prev => ({
            ...prev,
            mood: Number(e.target.value),
          }))
        }
      />

      <br />

      <label>Sleep: {checkIn.sleep}</label>
      <input
        type="range"
        min={0}
        max={100}
        value={checkIn.sleep}
        onChange={(e) =>
          setCheckIn(prev => ({
            ...prev,
            sleep: Number(e.target.value),
          }))
        }
      />
    </div>
  )
}
