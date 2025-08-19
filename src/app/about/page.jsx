"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; 

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
      className="bg-gradient-to-b from-[#DBD5C7] to-[#CFC6B5] text-[#3A2D00] min-h-screen py-16 px-6 sm:px-10 lg:px-32 font-poppins"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-[#3A2D00]">
            The Thread Haus
          </h1>
          <motion.div
            className="h-1 w-20 bg-[#A39B89] mx-auto mt-3 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-4 text-lg text-[#5F4B32] italic">
            Woven by friendship, inspired by dreams.
          </p>
        </motion.div>

        {/* Premium Rounded Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-[#A39B89] hover:scale-105 hover:shadow-[#A39B89]/70 transition duration-500">
            <Image
              src="/images/about.png"
              alt="Thread Haus Team"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* About Text */}
        <div className="space-y-8">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-lg sm:text-xl leading-relaxed text-[#5F4B32] bg-white/50 p-5 rounded-xl shadow-md"
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

        {/* Closing Highlight Section */}
        <motion.div
          className="mt-12 bg-[#3A2D00] text-[#DBD5C7] rounded-2xl py-10 px-6 text-center shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: paragraphs.length * 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            More Than Just Fashion
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            At The Thread Haus, every thread tells a story — of passion,
            resilience, and the courage to dream big. Join us in weaving a
            legacy that goes beyond style.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
