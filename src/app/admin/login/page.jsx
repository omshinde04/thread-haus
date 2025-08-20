"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful");
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-[#0f0e0d] text-[#e8e1d9] font-poppins px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="max-w-md w-full bg-[#2b1e16] p-8 rounded-xl shadow-xl border border-[#3A2D00]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#d2b48c]">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1715] border border-[#3a2d00] text-[#f4ede4] placeholder-[#a99988] focus:outline-none focus:ring-2 focus:ring-[#d2b48c]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1715] border border-[#3a2d00] text-[#f4ede4] placeholder-[#a99988] focus:outline-none focus:ring-2 focus:ring-[#d2b48c]"
            required
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#d2b48c] hover:bg-[#b89b72] text-[#1a120a] font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p className="mt-4 text-sm text-center">
          <a
            href="/admin/forgot-password"
            className="text-[#f5e7ce] hover:underline"
          >
          
          </a>
        </p>

        <p className="mt-6 text-center text-sm text-[#a99988]">
    
          <a href="/admin/signup" className="text-[#f5e7ce] hover:underline">
         
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
