import { createContext, useContext, useState } from "react";
import { transactions as mockData } from "../data/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [transactions, setTransactions] = useState(mockData);

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    sort: "date",
  });

  const [toast, setToast] = useState("");

  // 🌙 THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 🔥 TOAST
  const showToast = (message) => {
    setToast("");
    setTimeout(() => {
      setToast(message);
    }, 10);
  };

  // CRUD
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [
      ...prev,
      { id: Date.now(), ...newTransaction },
    ]);
    showToast("Transaction Added ✅");
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast("Transaction Deleted ❌");
  };

  const editTransaction = (updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    showToast("Transaction Updated ✏️");
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    showToast(`Welcome ${userData.name} 🎉`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    showToast("Logged out successfully 👋");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        transactions,
        filters,
        setFilters,
        addTransaction,
        deleteTransaction,
        editTransaction,
        toast,
        setToast,

        // 🌙 expose theme
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};