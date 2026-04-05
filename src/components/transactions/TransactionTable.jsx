import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { filterTransactions } from "../../utils/helpers";

function TransactionTable() {
  const { transactions, filters, deleteTransaction, editTransaction, user } =
    useAppContext();

  const [editData, setEditData] = useState(null);

  const filtered = filterTransactions(transactions, filters);

  const handleUpdate = () => {
    editTransaction(editData);
    setEditData(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow overflow-x-auto">
      
      <table className="min-w-[700px] w-full text-left">
        
        {/* HEADER */}
        <thead>
          <tr className="border-b text-gray-600 dark:text-gray-300 text-sm">
            <th className="py-2">Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            {user?.role === "admin" && (
              <th className="text-center">Actions</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5">
                <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
                  <span className="text-4xl mb-2">📭</span>
                  <p className="text-lg font-medium">No Transactions Yet</p>
                  <p className="text-sm mb-3">
                    Start by adding a new transaction
                  </p>

                  {user?.role === "admin" && (
                    <button
                      onClick={() =>
                        window.dispatchEvent(new Event("openAddModal"))
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition hover:scale-105"
                    >
                      + Add Transaction
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            filtered.map((t) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="py-2">{t.date}</td>

                <td className="font-medium">{t.category}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      t.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td className="font-semibold">₹ {t.amount}</td>

                {user?.role === "admin" && (
                  <td className="flex gap-2 justify-center">
                    
                    {/* EDIT */}
                    <button
                      onClick={() => setEditData(t)}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition hover:scale-105"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ================= MODAL ================= */}
      {editData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
            
            <h2 className="text-lg font-bold mb-4">
              Edit Transaction
            </h2>

            <input
              type="date"
              value={editData.date}
              onChange={(e) =>
                setEditData({ ...editData, date: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              type="text"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              type="number"
              value={editData.amount}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  amount: +e.target.value,
                })
              }
              className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600"
            />

            <select
              value={editData.type}
              onChange={(e) =>
                setEditData({ ...editData, type: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <div className="flex justify-end gap-2">
              
              <button
                onClick={() => setEditData(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;