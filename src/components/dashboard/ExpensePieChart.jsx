import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 🎨 Extended category colors (professional)
const COLORS_MAP = {
  Food: "#ef4444",
  Shopping: "#3b82f6",
  Education: "#10b981",
  Travel: "#f59e0b",
  Health: "#8b5cf6",
  Bills: "#14b8a6",
  Entertainment: "#f97316",
  Salary: "#22c55e",
  Freelance: "#eab308",
  Investment: "#6366f1",

  // 🔥 Extra colors
  Rent: "#ec4899",
  Transport: "#0ea5e9",
  Insurance: "#a855f7",
  Gifts: "#f43f5e",
  Grocery: "#84cc16",
  Dining: "#fb923c",
  Utilities: "#06b6d4",
  Savings: "#65a30d",
};

function ExpensePieChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 h-[320px]">
      <h3 className="mb-4 font-semibold text-gray-700">
        Expense Categories
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={90}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS_MAP[entry.category] || "#8884d8"}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;