"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUserAlt, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHidden(true); // scrolling down → hide
      } else {
        setHidden(false); // scrolling up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "About", path: "/about", icon: <FaUserAlt /> },
    { label: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
  ];

  return (
  <div className="w-full font-poppins">
    {/* ✅ Top Offer Banner (always visible) */}
    {offers.length > 0 && (
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 shadow-lg rounded-b-lg sticky top-0 z-50">
        <motion.div
          className="whitespace-nowrap flex items-center gap-12 py-2 px-6 text-sm sm:text-base font-semibold text-[#3A2D00] select-none"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: offers.length * 14,
            ease: "linear",
          }}
        >
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="flex items-center gap-3 pr-6 border-r border-yellow-300 last:border-none hover:scale-105 transition-transform duration-300"
            >
              <span className="tracking-wide">
                {offer.text} — <strong>{offer.discount}% OFF</strong>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    )}

    {/* ✅ Navbar (only this hides on scroll) */}
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full px-6 py-4 shadow-lg bg-white border-b border-yellow-300 sticky top-[40px] z-40"
    >
      <div className="flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-500 hover:scale-105 transition-transform duration-300"
        >
          The Thread Haus
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-12 text-[#3A2D00] text-xl">
          {navItems.map(({ label, path, icon }) => (
            <li key={label} className="group relative">
              <Link
                href={path}
                className="flex items-center justify-center p-2 rounded-full hover:bg-yellow-100 transition-all duration-300"
                title={label}
              >
                {icon}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full -translate-x-1/2"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#3A2D00] text-2xl cursor-pointer hover:text-yellow-500 transition duration-300"
          onClick={toggleMenu}
        >
          <FaBars />
        </button>
      </div>
    </motion.nav>

    {/* ✅ Mobile Menu */}
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={toggleMenu}
          />

          {/* Slide-in Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-2xl z-50"
          >
            <div className="flex flex-col h-full relative">
              {/* Close Button */}
              <button
                onClick={toggleMenu}
                className="absolute top-5 right-5 text-2xl text-[#3A2D00] hover:text-yellow-600 transition"
              >
                <FaTimes />
              </button>

              {/* Logo */}
              <div className="flex justify-center mt-14">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-600 shadow-md">
                  <Image
                    src="/images/logo.jpg"
                    alt="The Thread Haus"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Navigation Items */}
              <ul className="flex flex-col items-center gap-6 mt-10 text-[#3A2D00] font-medium text-lg">
                {navItems.map(({ label, path, icon }) => (
                  <li key={label}>
                    <Link
                      href={path}
                      onClick={toggleMenu}
                      className="flex items-center gap-3 px-6 py-3 rounded-full hover:bg-yellow-100 hover:scale-105 transition duration-300"
                    >
                      <span className="text-xl">{icon}</span>
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="mt-auto border-t border-gray-200 py-6 text-center text-sm text-[#3A2D00]/70">
                <p>© {new Date().getFullYear()} The Thread Haus</p>
                <p className="mt-1 text-xs tracking-wide">Crafted with Elegance</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </div>
);

}

export default Navbar;
