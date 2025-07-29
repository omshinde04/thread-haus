"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
      } else {
        alert("Signup successful! Please login.");
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Something went wrong!");
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
          Admin Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-5">
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1715] border border-[#3a2d00] text-[#f4ede4] placeholder-[#a99988] focus:outline-none focus:ring-2 focus:ring-[#d2b48c]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#d2b48c] hover:bg-[#b89b72] text-[#1a120a] font-semibold py-2 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#a99988]">
          Already have an account?{" "}
          <a href="/admin/login" className="text-[#f5e7ce] hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
