import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { user, logout, toggleTheme } = useAppContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white shadow px-4 py-3 flex justify-between items-center">
        
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <h1 className="text-lg md:text-xl font-semibold">
          🌈✨🌠ᕼOᗰE🌈🌟💫🌌🌈
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          
          {/* 🌙 Toggle */}
          <button
            onClick={toggleTheme}
            className="px-2 py-1 border rounded dark:border-gray-600"
          >
            🌙
          </button>

          <div className="text-right">
            <p className="font-semibold text-sm md:text-base">
              {user?.name || "User"}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 capitalize">
              {user?.email} | {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar same */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
            <button onClick={() => setOpen(false)}>✖</button>

            <nav className="flex flex-col gap-4 mt-4">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/transactions">Transactions</Link>
              <Link to="/insights">Insights</Link>
            </nav>

            <button
              onClick={handleLogout}
              className="mt-auto text-red-400"
            >
              Logout
            </button>
          </div>

          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}

export default Header;