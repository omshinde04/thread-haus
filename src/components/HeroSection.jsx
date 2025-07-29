"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroSection = ({ onNewCollectionClick }) => {
  return (
    <section className="w-full min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center text-center bg-[#DBD5C7] px-4 sm:px-6 md:px-12 py-10 sm:py-16 font-poppins overflow-hidden relative">
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#3A2D00] leading-snug sm:leading-tight mb-4"
      >
        Where genderless design meets bold expression. <br />
        <span className="block mt-2">Trends evolve, but authenticity stays timeless.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-[#5F4B32] text-base sm:text-lg md:text-xl mb-2 font-light tracking-wide"
      >
        Designed for all. Worn by the bold.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-[#5F4B32] text-base sm:text-lg md:text-xl mb-8 font-light tracking-wide"
      >
        Pranh is not just fashion — it’s identity in motion.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={onNewCollectionClick}
        className="flex items-center gap-2 bg-[#3A2D00] text-white px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg rounded-full hover:bg-[#2a2100] transition-all duration-300 shadow-xl"
      >
        New Collection <FaArrowRight className="mt-0.5" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
