import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// ✅ IMPORT SAME IMAGE
import bg from "../assets/bg.jpeg";

function Login() {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "viewer",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      setError("All fields are required");
      return;
    }

    login(form);
    navigate("/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      
      {/* 🔥 BACKGROUND IMAGE (MORE CLEAR) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* 🔥 LIGHT OVERLAY (VERY LESS) */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

      {/* 🔥 LOGIN CARD */}
      <div className="relative z-10 bg-white/30 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl w-96">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded-lg bg-white/70 focus:outline-none"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;