import { useEffect, useState } from "react"
import { useRegulationStore } from "../store/regulationStore"

const EXPERIMENT_INTERVAL_MS = 2 * 60 * 1000 // 2 minutes

export default function CheckIn() {
  const upsertToday = useRegulationStore((s) => s.upsertToday)
  const lastCheckInAt = useRegulationStore((s) => s.lastCheckInAt)

  const [mood, setMood] = useState(50)
  const [energy, setEnergy] = useState(50)
  const [sleep, setSleep] = useState(50)
  const [breathing, setBreathing] = useState(0)

  const [remaining, setRemaining] = useState(0)

  const mentalScore = Math.round((mood + sleep) / 2)
  const physicalScore = Math.round((energy + breathing) / 2)

  const locked = remaining > 0

  useEffect(() => {
    if (!lastCheckInAt) return

    const tick = () => {
      const diff =
        EXPERIMENT_INTERVAL_MS - (Date.now() - lastCheckInAt)
      setRemaining(Math.max(0, diff))
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [lastCheckInAt])

  const handleSubmit = () => {
    if (locked) return
    upsertToday(mentalScore, physicalScore)
  }

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    return `${m}m ${s % 60}s`
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 space-y-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold text-center">Daily Check-In</h1>

      <div className="bg-white rounded-2xl p-4 space-y-5 shadow-sm">
        <Slider label="Mood" value={mood} onChange={setMood} />
        <Slider label="Energy" value={energy} onChange={setEnergy} />
        <Slider label="Sleep Quality" value={sleep} onChange={setSleep} />

        <div>
          <label className="text-sm text-gray-600">
            Box Breathing (minutes)
          </label>
          <input
            type="number"
            value={breathing}
            onChange={(e) => setBreathing(+e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <button
        disabled={locked}
        onClick={handleSubmit}
        className={`w-full py-3 rounded-xl font-medium ${
          locked
            ? "bg-gray-300 text-gray-600"
            : "bg-blue-600 text-white"
        }`}
      >
        {locked ? "Check-in Locked" : "Submit Check-In"}
      </button>

      {locked && (
        <div className="text-center text-xs text-gray-500">
          Next check-in in {formatTime(remaining)}
        </div>
      )}
    </div>
  )
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full"
      />
      <div className="text-right text-xs text-gray-400">{value}</div>
    </div>
  )
}
