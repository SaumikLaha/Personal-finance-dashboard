import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Filters from "../components/transactions/Filters";
import TransactionTable from "../components/transactions/TransactionTable";
import { useAppContext } from "../context/AppContext";

function Transactions() {
  const { user, addTransaction } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    category: "",
    type: "expense",
    amount: "",
  });

  //  IMPORTANT: listen empty state button click
  useEffect(() => {
    const open = () => setShowModal(true);
    window.addEventListener("openAddModal", open);

    return () => window.removeEventListener("openAddModal", open);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "amount" ? +value : value,
    });
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.category || !formData.amount) {
      setError("All fields are required");
      return;
    }

    addTransaction(formData);

    setFormData({
      date: "",
      category: "",
      type: "expense",
      amount: "",
    });

    setError("");
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>

        {user?.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Transaction
          </button>
        )}
      </div>

      <Filters />
      <TransactionTable />

      {/* ADD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Transactions;