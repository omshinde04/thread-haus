"use client";
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1c150c] text-[#DBD5C7] py-10 px-6 md:px-20 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Brand Info */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-2">The Thread Haus</h2>
          <p className="text-sm text-[#b9b0a2] max-w-xs">
            Fashion that speaks identity. Genderless, bold, and unapologetically
            you.
          </p>
          <div className="flex mt-4 space-x-4">
            <a
              href="https://www.instagram.com/the_thread_haus?igsh=NDd6MHR4MGlvaXox"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a
              href="mailto:vijaykalantre10@gmail.com"
              className="hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[#b9b0a2]">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
             <li>
              <Link href="/admin/login" className="hover:text-white transition">
                Admin-login
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Join Our Tribe</h3>
          <p className="text-sm text-[#b9b0a2] mb-3">
            Be the first to know about new drops & exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-md bg-[#2a2100] text-white placeholder-[#b9b0a2] border border-[#3a2d00] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#3A2D00] hover:bg-[#2a2100] text-white py-2 px-4 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 border-t border-[#3a2d00] pt-4 text-center text-sm text-[#b9b0a2]">
        © {new Date().getFullYear()} VOM. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
