import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

function Sidebar() {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🔥 ACTIVE LINK STYLE
  const linkClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition duration-200";

  const activeClass =
    "bg-blue-500 text-white shadow-md";

  const inactiveClass =
    "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (
    <div className="hidden md:flex w-64 bg-gray-900 text-white p-6 flex-col shadow-xl">
      
      {/* LOGO */}
      <h2 className="text-2xl font-bold mb-10 tracking-wide">
        💰 Finance
      </h2>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-3 text-base">
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          💳 Transactions
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          📈 Insights
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-500 transition"
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;