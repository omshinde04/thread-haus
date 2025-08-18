"use client";

import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ onNewCollectionClick }) => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-12">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg leading-snug sm:leading-tight"
        >
          Discover Your Style
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-md sm:max-w-xl md:max-w-2xl"
        >
          Elevate your wardrobe with our premium new collection
        </motion.p>

        {/* Premium Button */}
        <motion.button
          onClick={onNewCollectionClick}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 sm:mt-8 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg font-semibold text-white 
                     rounded-full backdrop-blur-md bg-white/10 border border-white/20 
                     shadow-lg hover:bg-white/20 hover:scale-105 
                     transition-all duration-300 ease-in-out"
        >
          Explore New Collection
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
