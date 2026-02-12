import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useRegulationStore } from "../store/regulationStore"
import { Brain, Activity } from "lucide-react"

export default function Home() {
  const history = useRegulationStore((s) => s.history)

  const latest = history[history.length - 1]
  const mentalScore = latest?.mental ?? 0
  const physicalScore = latest?.physical ?? 0

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Your Balance</h1>
        <p className="text-sm text-gray-500">Weekly Overview</p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Mental + Physical</span>
          <span className="text-green-500">↗</span>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <XAxis
                dataKey="date"
                tickFormatter={(v) =>
                  new Date(v).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
              />
              <YAxis domain={[0, 100]} />
              <Tooltip
                labelFormatter={(v) =>
                  new Date(v).toLocaleString()
                }
              />

              <Area
                type="monotone"
                dataKey="mental"
                stroke="#3b82f6"
                fill="#93c5fd"
                fillOpacity={0.7}
              />

              <Area
                type="monotone"
                dataKey="physical"
                stroke="#22c55e"
                fill="#86efac"
                fillOpacity={0.7}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4">

        {/* Mental */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Brain className="w-5 h-5 stroke-[2.2]" />
            <span className="text-sm font-medium">Mental Score</span>
            <span className="text-gray-400 text-xs">ⓘ</span>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-2">
            {mentalScore}
          </div>
        </div>

        {/* Physical */}
        <div className="bg-green-50 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-green-600">
            <Activity className="w-5 h-5 stroke-[2.2]" />
            <span className="text-sm font-medium">Physical Score</span>
            <span className="text-gray-400 text-xs">ⓘ</span>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-2">
            {physicalScore}
          </div>
        </div>

      </div>

      {/* 🫁 Recommendation */}
      {latest && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-700">
              Recommendation
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {physicalScore < 40
                ? "Your physical score is low. Try a short box breathing session."
                : "Keep your balance steady with a brief breathing session."}
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            🫁
          </div>
        </div>
      )}

    </div>
  )
}
