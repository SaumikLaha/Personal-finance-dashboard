import { useAppContext } from "../../context/AppContext";

function Filters() {
  const { filters, setFilters } = useAppContext();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 bg-white p-4 rounded-xl shadow">
      <input
        type="text"
        placeholder="Search category..."
        className="p-2 border rounded w-full md:w-1/3"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <select
        className="p-2 border rounded"
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        className="p-2 border rounded"
        value={filters.sort}
        onChange={(e) =>
          setFilters({ ...filters, sort: e.target.value })
        }
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>
    </div>
  );
}

export default Filters;