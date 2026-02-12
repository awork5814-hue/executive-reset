type Props = {
  mental: number
  physical: number
}

export default function Scores({ mental, physical }: Props) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3>Scores</h3>
      <p>Mental: {mental}</p>
      <p>Physical: {physical}</p>
    </div>
  )
}
