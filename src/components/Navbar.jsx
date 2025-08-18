"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUserAlt,
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaGift,
  FaBolt,
  FaTruck,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fetch offers from backend
  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch("/api/offers");
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setOffers(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch offers:", err);
      }
    }
    fetchOffers();
  }, []);

  // Rotate offers every 5 seconds
  useEffect(() => {
    if (offers.length === 0) return;
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [offers]);

  const currentOffer = offers.length ? offers[currentOfferIndex] : null;

  const navItems = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "About", path: "/about", icon: <FaUserAlt /> },
    { label: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
  ];

  // Map icon string from backend to React icon
  const renderIcon = (icon) => {
    switch (icon) {
      case "gift":
        return <FaGift className="text-[#AD7F2D] text-lg" />;
      case "bolt":
        return <FaBolt className="text-[#AD7F2D] text-lg" />;
      case "truck":
        return <FaTruck className="text-[#AD7F2D] text-lg" />;
      default:
        return <FaGift className="text-[#AD7F2D] text-lg" />;
    }
  };

  // Format date to M/D/YYYY
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full sticky top-0 z-50 font-poppins">
      {/* Top Offer Banner */}
      <AnimatePresence mode="wait">
        {currentOffer && (
          <motion.div
            key={currentOffer._id}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-gradient-to-r from-[#F5DEB3] via-[#E5C07B] to-[#F5DEB3] 
                       text-[#3A2D00] text-center py-2 text-sm sm:text-base 
                       font-semibold tracking-wide shadow-md flex flex-col sm:flex-row justify-center items-center gap-2"
          >
            {/* Icon */}
            {renderIcon(currentOffer.icon)}

            {/* Text + Discount */}
            <span>
              {currentOffer.text} — <strong>{currentOffer.discount}% OFF</strong>
            </span>

            {/* Validity Period */}
            <span className="text-xs sm:text-sm text-[#5A4A1D]">
              ({formatDate(currentOffer.validFrom)} →{" "}
              {formatDate(currentOffer.validTo)})
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="w-full px-6 py-4 shadow-lg bg-white/80 backdrop-blur-md border-b border-gray-200 relative z-50">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-extrabold text-[#3A2D00] tracking-wide hover:text-[#AD7F2D] transition-colors duration-300"
          >
            <Link href="/">The Thread Haus</Link>
          </motion.div>

          {/* Center Nav */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
            }}
            className="hidden md:flex gap-8 text-[#3A2D00] font-medium text-lg absolute left-1/2 -translate-x-1/2"
          >
            {navItems.map(({ label, path, icon }) => (
              <motion.li
                key={label}
                variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              >
                <Link
                  href={path}
                  className="hover:text-[#AD7F2D] transition-colors duration-200 flex items-center gap-2"
                >
                  {icon}
                  {label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Hamburger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="md:hidden text-[#3A2D00] text-2xl cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={toggleMenu}
          >
            <FaBars />
          </motion.div>
        </motion.div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white/95 backdrop-blur-md shadow-2xl z-50 md:hidden"
          >
            <div className="p-6 flex flex-col gap-6 text-[#3A2D00] font-medium text-lg h-full relative">
              <button
                onClick={toggleMenu}
                className="text-right text-2xl absolute top-5 right-5 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>

              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
                  },
                }}
                className="mt-16 flex flex-col gap-5"
              >
                {navItems.map(({ label, path, icon }) => (
                  <motion.li
                    key={label}
                    variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={path}
                      onClick={toggleMenu}
                      className="flex items-center gap-3 text-lg hover:text-[#AD7F2D] transition duration-200"
                    >
                      {icon} {label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
