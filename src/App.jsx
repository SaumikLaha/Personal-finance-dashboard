import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAppContext } from "./context/AppContext";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

function App() {
  const { user } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        
        <Route
          path="/transactions"
          element={user ? <Transactions /> : <Navigate to="/" />}
        />
        <Route
        path="/insights"
         element={user ? <Insights /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;