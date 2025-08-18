"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // ✅ for optimized image handling

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AboutPage = () => {
  const paragraphs = [
    `The Thread Haus is not just a clothing brand — it’s a dream stitched with ❤️, struggle, and friendship. Founded by four childhood friends from Malgaon, a small village near Satara, The Thread Haus is a reflection of our journey from humble beginnings to bold ambitions.`,
    `Coming from middle-class families, we grew up with limited resources but unlimited dreams. What started as late-night talks and shared sketches has now grown into a passion project — a brand that speaks for those who dare to dream beyond boundaries.`,
    `At The Thread Haus, we blend culture with creativity. Every collection is thoughtfully designed to be stylish, comfortable, and rooted in authenticity. We believe in clothing that tells a story — your story, and ours.`,
    `This is more than fashion. It’s about identity. It’s about representing small-town talent on a big stage. It’s about showing the world that even the strongest threads can come from the simplest of beginnings.`,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#DBD5C7] text-[#3A2D00] min-h-screen py-16 px-6 sm:px-10 lg:px-32 font-poppins"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Heading */}
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold tracking-wide text-[#3A2D00]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Thread Haus
        </motion.h1>

        {/* Premium Rounded Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-xl border-4 border-[#A39B89]">
            <Image
              src="/images/about.png" // ✅ replace with your actual image
              alt="Thread Haus Team"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* About Text */}
        <div className="space-y-6">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-lg sm:text-xl leading-relaxed text-[#5F4B32]"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {text.includes("The Thread Haus") ? (
                <>
                  {text.split("The Thread Haus")[0]}
                  <span className="font-semibold text-[#3A2D00]">
                    The Thread Haus
                  </span>
                  {text.split("The Thread Haus")[1]}
                </>
              ) : (
                text
              )}
            </motion.p>
          ))}
        </div>

        {/* Closing Line */}
        <motion.p
          className="text-xl font-semibold italic text-[#3A2D00] pt-6 border-t border-[#A39B89] text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: paragraphs.length * 0.3 }}
        >
          The Thread Haus — Woven by friendship, inspired by dreams.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AboutPage;
