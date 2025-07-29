"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowReset(true);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2a1f10] text-[#F3EFE6] px-4 sm:px-6 md:px-10 py-12 font-poppins">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="bg-[#3a2d1a] p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-[#3a2d1a] border border-[#5b4527] text-white placeholder-[#b9b0a2] focus:outline-none"
          required
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#5b4527] hover:bg-[#3a2d1a] text-white font-semibold py-3 px-6 rounded-md transition duration-300"
        >
          Submit 📩
        </button>

        {showReset && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-green-400 text-center text-sm"
          >
            Email verified.{" "}
            <a
              href="/admin/reset-password"
              className="underline hover:text-green-300"
            >
              Click here to reset your password
            </a>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}
