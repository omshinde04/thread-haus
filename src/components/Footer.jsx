"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Josefin_Sans } from "next/font/google";

// Import Josefin Sans
const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  return (
    <footer
      className={`${josefin.className} relative bg-black text-gray-300 scroll-smooth border-t border-gray-800`}
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              PRINT HOUSE
            </h2>

            {/* Social Icons */}
            <div className="flex gap-5 text-gray-400">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#1877F2" }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://www.instagram.com/theprinthouse.xl?igsh=YzhlaTY2cDYya2Jr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#E4405F" }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#1DA1F2" }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#FF0000" }}
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Customer Care
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Track Your Order</a></li>
              <li><a href="#" className="hover:underline">Size Guide</a></li>
              <li><a href="#" className="hover:underline">Care Instructions</a></li>
              <li><a href="#" className="hover:underline">Gift Cards</a></li>
              <li><a href="#" className="hover:underline">Membership</a></li>
              <li>
                <a href="/admin/login" className="hover:underline text-blue-400">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              About
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">How It Works</a></li>
              <li><a href="#" className="hover:underline">Our Packages</a></li>
              <li><a href="#" className="hover:underline">Promotions</a></li>
              <li><a href="#" className="hover:underline">Refer A Friend</a></li>
            </ul>
          </div>

          {/* Help Centre */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Help Centre
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Payments</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Product Returns</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Checkout</a></li>
              <li><a href="#" className="hover:underline">Other Issues</a></li>
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
          className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p>© 2025 printhouse. All rights reserved.</p>
          <p>
            Developed by{" "}
            <span className="text-white font-semibold">omradixsolutions</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
