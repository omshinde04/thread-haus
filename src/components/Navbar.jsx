"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const categories = [
    "Anime",
    "Cars",
    "मराठी design",
    "Marvel",
    "Plain T shirts",
    "Street wear",
    "Special for gym",
  ];

  return (
    <div className={`w-full font-poppins ${josefin.className}`}>
      {/* Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full px-6 py-4 sticky top-0 z-50 bg-[#CACACA]"
      >
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-extrabold tracking-wider text-black hover:scale-105 transition-transform duration-300"
          >
            PRINT HOUSE
          </Link>

          {/* Desktop Nav Items + Categories */}
          <div className="hidden md:flex gap-6 items-center">
            {/* Existing Nav Items */}
            <ul className="flex gap-6 text-black text-lg">
              {navItems.map(({ label, path }) => (
                <li key={label} className="group relative">
                  <Link
                    href={path}
                    className="px-3 py-1 rounded hover:text-gray-700 transition-all duration-300 text-lg"
                    title={label}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Category List */}
            <ul className="flex gap-4 text-black px-0 py-0 text-lg">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#genre"
                    className="px-3 py-1 rounded hover:text-gray-700 transition duration-300 text-lg"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-black text-2xl cursor-pointer hover:text-gray-700 transition duration-300"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleMenu}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#CACACA] text-black shadow-2xl z-50"
            >
              <div className="flex flex-col h-full relative">
                {/* Close Button */}
                <button
                  onClick={toggleMenu}
                  className="absolute top-5 right-5 text-2xl hover:text-gray-700 transition"
                >
                  <FaTimes />
                </button>

                {/* Navigation Items */}
                <ul className="flex flex-col items-center gap-6 mt-20 font-medium text-lg">
                  {/* Existing Nav Items */}
                  {navItems.map(({ label, path }) => (
                    <li key={label}>
                      <Link
                        href={path}
                        onClick={toggleMenu}
                        className="block w-full text-center px-6 py-3 rounded-full hover:text-gray-700 transition duration-300 text-lg"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}

                  {/* Category Items */}
                  {categories.map((cat) => (
                    <li key={cat}>
                      <a
                        href="#genre"
                        onClick={toggleMenu}
                        className="block w-full text-center px-6 py-3 rounded-lg hover:text-gray-700 transition duration-300 text-lg"
                      >
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
