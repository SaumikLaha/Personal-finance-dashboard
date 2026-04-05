// 🔍 FILTER FUNCTION
export const filterTransactions = (transactions, filters) => {
  let data = [...transactions];

  if (filters.search) {
    data = data.filter((t) =>
      t.category.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  if (filters.type !== "all") {
    data = data.filter((t) => t.type === filters.type);
  }

  if (filters.sort === "amount") {
    data.sort((a, b) => b.amount - a.amount);
  } else {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return data;
};



// 📊 TOTAL STATS
export const calculateTotals = (transactions) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
};



// 📊 CATEGORY ANALYSIS
export const getTopCategory = (transactions) => {
  const map = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  const result = Object.entries(map).sort((a, b) => b[1] - a[1]);

  return result[0] || ["N/A", 0];
};



// 📊 MONTHLY ANALYSIS
export const getMonthlyComparison = (transactions) => {
  const monthly = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);

    if (!monthly[month]) monthly[month] = 0;

    if (t.type === "expense") {
      monthly[month] += t.amount;
    }
  });

  const months = Object.keys(monthly).sort();

  const last = monthly[months[months.length - 1]] || 0;
  const prev = monthly[months[months.length - 2]] || 0;

  const diff = last - prev;

  const percent = prev ? ((diff / prev) * 100).toFixed(1) : 0;

  return { last, prev, diff, percent };
};