"use client";

import React from "react";
import { motion } from "framer-motion";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export default function Offer() {
  return (
    <section
      className={`${josefin.className} relative w-full h-[50vh] flex items-center justify-center bg-cover bg-center overflow-hidden`}
      style={{ backgroundImage: "url('/images/offer.png')" }}
    >
      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Get <span className="italic font-extrabold">20% OFF</span> on <br />
            your first purchase
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-200">
            Sign Up for our newsletter and never miss any offers
          </p>
        </motion.div>

        {/* Input + Button (Stacked Like Image) */}
<motion.form
  initial={{ opacity: 0, x: 60 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
  viewport={{ once: true }}
  className="flex flex-col w-full md:w-auto max-w-md"
>
  <input
    type="email"
    placeholder="Your email address"
    className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none shadow-sm"
  />
  <button
    type="submit"
    className="mt-3 bg-black text-white px-8 py-3 rounded-md font-bold tracking-wide shadow-md transition-all duration-300 hover:bg-gray-900 hover:scale-105"
  >
    SUBSCRIBE NOW
  </button>
</motion.form>

      </div>
    </section>
  );
}
