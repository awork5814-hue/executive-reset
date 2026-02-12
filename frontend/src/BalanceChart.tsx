type Props = {
  data: {
    label: string
    mental: number
    physical: number
  }[]
}

export default function BalanceChart({ data }: Props) {
  return (
    <div>
      <h3>Mental + Physical Chart</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
