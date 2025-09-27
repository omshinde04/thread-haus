"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

const navItems = [
  { label: "Home", path: "#hero" },
  { label: "About", path: "#about" }, 
  { label: "Contact", path: "#contact" }, 
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

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Hide navbar on scroll down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <section
      id="hero"
      className={`${josefin.className} relative w-full h-[60vh] sm:h-[70vh] md:h-[100vh] flex items-center justify-center overflow-hidden`}
      style={{ backgroundColor: "#CACACA" }}
    >
      {/* Desktop Background Image */}
      <motion.img
        src="/images/hero4.png"
        alt="Background Hero Desktop"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="hidden md:block absolute top-0 left-0 w-full h-full object-cover select-none"
      />

      {/* Mobile Background Image */}
      <motion.img
        src="/images/hero5.png"
        alt="Background Hero Mobile"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="block md:hidden absolute top-0 left-0 w-full h-full object-cover select-none"
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full px-6 py-4 fixed top-0 left-0 z-50"
      >
        <div className="flex justify-between items-center">
          {/* Brand */}
          <a
            href="#hero"
            className="text-2xl sm:text-3xl font-extrabold tracking-wider text-black hover:scale-105 transition-transform duration-300"
          >
            PRINT HOUSE
          </a>

          {/* Desktop Nav Items + Categories */}
          <div className="hidden md:flex gap-6 items-center">
            <ul className="flex gap-6 text-black text-lg">
              {navItems.map(({ label, path }) => (
                <li key={label}>
                  <a
                    href={path}
                    className="px-3 py-1 rounded hover:text-gray-700 transition-all duration-300 text-black text-lg"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="flex gap-4 text-black text-lg">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#genre"
                    className="px-3 py-1 rounded hover:text-gray-700 transition duration-300 text-black text-lg"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-black text-2xl cursor-pointer hover:text-gray-300 transition duration-300"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={toggleMenu}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#282828] text-white shadow-2xl z-50"
              >
                <div className="flex flex-col h-full relative">
                  <button
                    onClick={toggleMenu}
                    className="absolute top-5 right-5 text-2xl hover:text-yellow-500 transition"
                  >
                    <FaTimes />
                  </button>

                  <ul className="flex flex-col items-center gap-6 mt-20 font-medium text-lg">
                    {navItems.map(({ label, path }) => (
                      <li key={label}>
                        <a
                          href={path}
                          onClick={toggleMenu}
                          className="block w-full text-center px-6 py-3 rounded-full hover:text-gray-300 transition duration-300 text-lg"
                        >
                          {label}
                        </a>
                      </li>
                    ))}

                    {categories.map((cat) => (
                      <li key={cat}>
                        <a
                          href="#genre"
                          onClick={toggleMenu}
                          className="block w-full text-center px-6 py-3 rounded-lg hover:text-gray-300 transition duration-300 text-lg"
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
      </motion.nav>
    </section>
  );
};

export default HeroSection;
