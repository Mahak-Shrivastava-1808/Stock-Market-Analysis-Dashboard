import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful");
      setTimeout(() => {
        onLogin(); // ✅ Redirect to dashboard
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-500 dark:text-slate-300 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">{message}</p>
        )}

        <p className="text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-green-500 hover:underline"
            onClick={onSwitchToSignup}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;