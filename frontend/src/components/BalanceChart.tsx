import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Props = {
  data: {
    date: string
    mental: number
    physical: number
  }[]
}

export default function BalanceChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="mental" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="physical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          tickFormatter={(d) => d.slice(5)}
          tick={{ fontSize: 10 }}
        />
        <YAxis hide />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="mental"
          stroke="#3b82f6"
          fill="url(#mental)"
        />
        <Area
          type="monotone"
          dataKey="physical"
          stroke="#22c55e"
          fill="url(#physical)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
