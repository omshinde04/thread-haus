"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Facebook } from "lucide-react";
import { Josefin_Sans } from "next/font/google";

// Import Josefin Sans
const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  return (
    <footer className={`${josefin.className} relative bg-black text-gray-300 scroll-smooth border-t border-gray-800`}>
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Brand Info */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-2">
              PRINT HOUSE
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Your style, your statement. Fashion that speaks for you.  
              © 2025 PRINT HOUSE
            </p>
            <p className="text-gray-500 text-xs italic mt-2">
              PRINT HOUSE is a premium clothing brand delivering style & comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-2 text-sm flex flex-col md:flex-row md:gap-6">
              {[
                { label: "Home", id: "home" },
                { label: "About Us", id: "features" },
                { label: "Shop", id: "shop" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <motion.li
                  key={link.id}
                  whileHover={{ x: 5, color: "#a78bfa" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="cursor-pointer"
                >
                  <a href={`#${link.id}`} className="hover:underline">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          className="my-10 border-gray-800"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Bottom Row */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Email Button */}
          <motion.a
            href="mailto:contact@printhouse.com"
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-700 hover:border-purple-500 hover:shadow-lg transition duration-300 text-sm bg-gray-900 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail className="w-4 h-4 text-white" />
            contact@printhouse.com
          </motion.a>

          {/* Social Icons */}
          <div className="flex gap-6 text-gray-400">
            <motion.a
              href="https://www.instagram.com/theprinthouse.xl"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#E4405F" }}
              className="transition"
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.facebook.com/theprinthouse"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#1877F2" }}
              className="transition"
            >
              <Facebook className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        className="bg-[#0c0c0c] text-center py-5 text-xs text-gray-500 border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        © 2025 Developed by{" "}
        <span className="text-purple-400 font-medium">omradixsolutions</span>. All
        rights reserved.
      </motion.div>
    </footer>
  );
}
