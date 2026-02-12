import { useRegulationStore } from "../store/regulationStore"

export default function SessionSummary() {
  const history = useRegulationStore((s) => s.history)
  const latest = history[history.length - 1]

  const mentalScore = latest?.mental ?? 0
  const physicalScore = latest?.physical ?? 0

  return (
    <div>
      <div>Mental: {mentalScore}</div>
      <div>Physical: {physicalScore}</div>
    </div>
  )
}
