import Layout from "../components/layout/Layout";
import InsightsCard from "../components/insights/InsightsCard";
import { useAppContext } from "../context/AppContext";

// 🔥 IMPORT HELPERS
import {
  calculateTotals,
  getTopCategory,
  getMonthlyComparison,
} from "../utils/helpers";

function Insights() {
  const { transactions } = useAppContext();

  // =========================
  // 🔥 EDGE CASE
  // =========================
  if (transactions.length === 0) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-6">Insights</h1>
        <p className="text-gray-500">
          No data available. Add transactions to see insights.
        </p>
      </Layout>
    );
  }

  // =========================
  // 🔥 USE HELPERS
  // =========================
  const { income, expense } = calculateTotals(transactions);

  const [topCategory, topAmount] = getTopCategory(transactions);

  const { last, prev, diff, percent } =
    getMonthlyComparison(transactions);

  // =========================
  // 🔥 SMART MESSAGE
  // =========================
  let message = "";
  let messageColor = "text-gray-500";

  if (diff > 0) {
    message = `⚠️ You spent ${percent}% more this month`;
    messageColor = "text-red-500";
  } else if (diff < 0) {
    message = `✅ Great! You saved ${Math.abs(percent)}% this month`;
    messageColor = "text-green-500";
  } else {
    message = "➖ No major change this month";
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Insights</h1>

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <InsightsCard
          title="Total Income"
          value={`₹ ${income}`}
          color="text-green-600"
        />

        <InsightsCard
          title="Total Expense"
          value={`₹ ${expense}`}
          color="text-red-500"
        />

        <InsightsCard
          title="Top Spending"
          value={topCategory}
          subtitle={`₹ ${topAmount}`}
          color="text-orange-500"
        />

        <InsightsCard
          title="This Month"
          value={`₹ ${last}`}
          subtitle={`Prev: ₹ ${prev}`}
          color="text-blue-500"
        />
      </div>

      {/* 🔥 SMART INSIGHT BOX */}
      <div className="mt-6 bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Smart Insight</h3>
        <p className={`text-lg font-medium ${messageColor}`}>
          {message}
        </p>
      </div>
    </Layout>
  );
}

export default Insights;