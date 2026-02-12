export function getRegulationDayKey(date = new Date()) {
  const d = new Date(date)

  // If before 4am → treat as previous day
  if (d.getHours() < 4) {
    d.setDate(d.getDate() - 1)
  }

  return d.toISOString().slice(0, 10)
}
