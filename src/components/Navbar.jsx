"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUserAlt, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navItems = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "About", path: "/about", icon: <FaUserAlt /> },
    { label: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <nav className="w-full px-4 sm:px-6 py-4 shadow-md sticky top-0 bg-white z-50 font-poppins">
      {/* Animate only the inner content */}
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
          className="text-xl sm:text-2xl font-bold text-[#3A2D00] hover:scale-105 transition-transform duration-300"
        >
          <Link href="/">Thread Haus</Link>
        </motion.div>

        {/* Centered Desktop Nav */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5,
              },
            },
          }}
          className="hidden md:flex gap-6 text-[#3A2D00] font-medium text-base sm:text-lg absolute left-1/2 -translate-x-1/2"
        >
          {navItems.map(({ label, path, icon }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
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

        {/* Hamburger Icon */}
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

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50 md:hidden"
          >
            <div className="p-5 flex flex-col gap-6 text-[#3A2D00] font-medium text-base sm:text-lg h-full relative">
              <button
                onClick={toggleMenu}
                className="text-right text-xl absolute top-5 right-5 hover:text-red-500 transition"
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
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.2,
                    },
                  },
                }}
                className="mt-16 flex flex-col gap-5"
              >
                {navItems.map(({ label, path, icon }) => (
                  <motion.li
                    key={label}
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      visible: { opacity: 1, x: 0 },
                    }}
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
    </nav>
  );
}

export default Navbar;
