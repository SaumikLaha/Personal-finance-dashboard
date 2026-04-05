import Layout from "../components/layout/Layout";
import SummaryCard from "../components/dashboard/SummaryCard";
import BalanceChart from "../components/dashboard/BalanceChart";
import ExpensePieChart from "../components/dashboard/ExpensePieChart";
import { useAppContext } from "../context/AppContext";

function Dashboard() {
  const { transactions } = useAppContext();

  // =========================
  // 🔥 TOTAL CALCULATION
  // =========================
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  // =========================
  // 🔥 BALANCE TREND
  // =========================
  let runningBalance = 0;

  const chartData = transactions.map((t) => {
    if (t.type === "income") {
      runningBalance += t.amount;
    } else {
      runningBalance -= t.amount;
    }

    return {
      date: t.date,
      amount: runningBalance,
    };
  });

  // =========================
  // 🔥 CATEGORY PIE DATA
  // =========================
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || {
          category: t.category,
          amount: 0,
        };
        acc[t.category].amount += t.amount;
      }
      return acc;
    }, {})
  );

  // =========================
  // 🔥 EMPTY STATE
  // =========================
  if (transactions.length === 0) {
    return (
      <Layout>
        
        <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
          <h2 className="text-xl font-semibold mb-2">
            No Data Available
          </h2>
          <p>Add transactions to see dashboard analytics</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      {/* 🔥 PAGE TITLE */}
    <h1 className="text-2xl font-bold mb-6">
      Dashboard
    </h1>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        
        <SummaryCard title="Balance" amount={balance} />
        <SummaryCard title="Income" amount={income} />
        <SummaryCard title="Expenses" amount={expense} />

      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Monthly Balance Trend
          </h3>
          <BalanceChart data={chartData} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Expense Categories
          </h3>
          <ExpensePieChart data={categoryData} />
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;