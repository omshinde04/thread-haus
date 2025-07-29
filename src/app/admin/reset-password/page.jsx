"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Password reset successful. Redirecting to login...");
        setError("");
        setEmail("");
        setPassword("");
        setConfirm("");

        setTimeout(() => {
          router.push("/admin/login");
        }, 2000);
      } else {
        setError(data.message || "Something went wrong.");
        setSuccess("");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2a1f10] text-[#F3EFE6] px-4 sm:px-6 md:px-10 py-12 font-poppins">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="bg-[#3a2d1a] p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-[#3a2d1a] border border-[#5b4527] text-white placeholder-[#b9b0a2] focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-[#3a2d1a] border border-[#5b4527] text-white placeholder-[#b9b0a2] focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-[#3a2d1a] border border-[#5b4527] text-white placeholder-[#b9b0a2] focus:outline-none"
          required
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

        <button
          type="submit"
          className="w-full bg-[#5b4527] hover:bg-[#3a2d1a] text-white font-semibold py-3 px-6 rounded-md transition duration-300"
        >
          Reset Password 🔐
        </button>
      </motion.form>
    </div>
  );
}
