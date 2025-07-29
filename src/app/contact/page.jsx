"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="min-h-screen bg-[#2a1f10] text-[#F3EFE6] px-4 sm:px-6 md:px-10 lg:px-20 py-12 font-poppins">
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-center"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#d3c9b6] text-base sm:text-lg text-center mb-10"
        >
          Have questions or just want to say hi? We'd love to hear from you!
        </motion.p>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          action="https://formspree.io/f/xqalbzbk"
          method="POST"
        >
          <div className="flex flex-col">
            <label className="text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="bg-[#3a2d1a] border border-[#5b4527] rounded-md px-4 py-3 text-white placeholder-[#b9b0a2] focus:outline-none"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="bg-[#3a2d1a] border border-[#5b4527] rounded-md px-4 py-3 text-white placeholder-[#b9b0a2] focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              className="bg-[#3a2d1a] border border-[#5b4527] rounded-md px-4 py-3 text-white placeholder-[#b9b0a2] focus:outline-none resize-none"
              placeholder="Your Message..."
              required
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-[#5b4527] hover:bg-[#3a2d1a] text-white font-semibold py-3 px-8 rounded-md transition duration-300"
            >
              Send Message 📩
            </button>
          </div>
        </motion.form>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[#d3c9b6] mb-4 text-base">You can also reach us on</p>
          <div className="flex flex-wrap justify-center gap-6 text-lg sm:text-xl">
            <a
              href="https://www.instagram.com/the_thread_haus?igsh=NDd6MHR4MGlvaXox"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300"
            >
              Instagram
            </a>
            <a
              href="mailto:thethreadhaus46@gmail.com"
              className="hover:text-white transition duration-300"
            >
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
