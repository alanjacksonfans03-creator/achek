// admin/Login.tsx

import React, { useState } from "react";
import { useLocation } from "wouter";

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const CALEB_PHOTO = "/public/caleb-founder.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      setError("Admin credentials are not set. Please check your environment variables.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminToken", "admin-token");
        setLocation("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-background">
  <div className="backdrop-blur-md bg-card border border-blue-100 shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md flex flex-col items-center relative">
        <img
          src={CALEB_PHOTO}
          alt="Caleb Okoh photo"
          className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500 object-cover shadow-lg"
        />
  <h2 className="text-3xl font-extrabold mb-6 text-primary tracking-tight">Admin Login</h2>
        <form className="w-full" onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="block mb-1 font-semibold text-primary">Username</label>
            <input
              type="text"
              className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-card text-lg"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-semibold text-primary">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-card text-lg pr-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-primary text-sm focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 mb-3 text-center font-medium">{error}</div>}
          <div className="mb-3 text-right">
            <a href="#" className="text-xs text-primary hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2.5 rounded-lg font-bold text-lg shadow-md hover:from-primary hover:to-secondary transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
