import React, { useState } from "react";
import axios from "axios";

function Signup({ onSignup, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const isStrongPassword = (pwd) => {
    return /^(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.{8,})/.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setMessage("Please fill all fields");
      return;
    }

    if (!isStrongPassword(password)) {
      setMessage("Password must be at least 8 characters, include one capital letter and one special character");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", { email, password, name });
      setMessage("Account created successfully");
      setTimeout(() => {
        onSwitchToLogin(); // ✅ Redirect to login after success
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Sign Up
        </button>

        {message && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">{message}</p>
        )}

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <button
            type="button"
            className="text-green-500 hover:underline"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signup;