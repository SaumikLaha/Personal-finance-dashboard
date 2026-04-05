import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function BalanceChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 h-[320px]">
      <h3 className="mb-4 font-semibold text-gray-700">
        Monthly Balance Trend
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          {/* 🔥 Grid for better readability */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis tick={{ fontSize: 12 }} />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
            }}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceChart;