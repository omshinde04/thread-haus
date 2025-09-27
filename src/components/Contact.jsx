"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // success | error

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setStatusType("info");

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Your message has been sent to PRINT HOUSE!");
        setStatusType("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Please try again.");
        setStatusType("error");
      }
    } catch (err) {
      setStatus("❌ Error sending message. Please try later.");
      setStatusType("error");
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <section
      id="contact"
      className={`${josefin.className} relative bg-white text-white px-6 py-28 overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-6xl mx-auto relative z-10 bg-[#1D1D1F]/90 backdrop-blur-md 
                   rounded-2xl shadow-xl p-10 md:p-16 border border-white/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgb(168,85,247)",
                color: "#fff",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black text-sm font-semibold rounded shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
            </motion.button>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-snug">
              Connect with <br /> PRINT HOUSE <br /> Team for Your Fashion Needs!
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-28 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full origin-left"
            />

            <div className="space-y-2 text-gray-300 text-sm md:text-base flex flex-col gap-1">
              <p className="flex items-center gap-2">
                📞
                <a href="tel:+919373545169" className="text-gray-300 ">
                  +91 9373545169
                </a>
                <span>/</span>
                <a href="tel:+917378534650" className="text-gray-300 ">
                  +91 7378534650
                </a>
              </p>
              <p>⏰ 10 AM to 8 PM, Monday to Saturday</p>
              <p>📧 contact@printhouse.com</p>
            </div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.form
            variants={container}
            initial="hidden"
            whileInView="show"
            onSubmit={handleSubmit}
            className="space-y-4 relative"
          >
            <motion.input
              variants={item}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-sm focus:outline-none focus:border-purple-500 transition"
            />
            <motion.input
              variants={item}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-sm focus:outline-none focus:border-purple-500 transition"
            />
            <motion.textarea
              variants={item}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message / Fashion Inquiry"
              rows="4"
              required
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-sm focus:outline-none focus:border-purple-500 transition resize-none"
            />
           <motion.button
  variants={item}
  whileHover={{
    scale: 1.05,
    boxShadow: "0 0 25px rgba(255,255,255,0.5)",
  }}
  whileTap={{ scale: 0.95 }}
  type="submit"
  className="w-full bg-gradient-to-r from-black to-white text-white py-3 rounded-md font-semibold shadow-md transition"
>
  Send Message
</motion.button>


            <AnimatePresence>
              {status && (
                <motion.p
                  key="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className={`text-sm font-medium mt-2 ${
                    statusType === "success"
                      ? "text-green-400"
                      : statusType === "error"
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {status}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
