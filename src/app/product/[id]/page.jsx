"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import YouMightAlsoLike from "@/components/YouMightAlsoLike";
import { Josefin_Sans } from "next/font/google";
import namer from "color-namer";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

// ✅ Always redirect to homepage with section
const navItems = [
  { label: "Home", path: "/#hero" },
  { label: "About", path: "/#about" },
  { label: "Contact", path: "/#contact" },
];

// ✅ Same for categories
const categories = [
  { label: "Anime", path: "/#genre" },
  { label: "Cars", path: "/#genre" },
  { label: "मराठी design", path: "/#genre" },
  { label: "Marvel", path: "/#genre" },
  { label: "Plain T shirts", path: "/#genre" },
  { label: "Street wear", path: "/#genre" },
  { label: "Special for gym", path: "/#genre" },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Navbar states
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
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let res = await fetch(`/api/genre-products/${id}`);
        if (!res.ok) {
          res = await fetch(`/api/latest-arrival/${id}`);
          if (!res.ok) {
            res = await fetch(`/api/suggested-products/${id}`);
            if (!res.ok) throw new Error("Failed to fetch from all sources");
          }
        }

        const data = await res.json();
        setProduct(data);
        setSelectedImage(data?.images?.[0] || "");
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!loading && !product) return notFound();

  const handleWhatsAppOrder = () => {
    const readableColor = selectedColor
      ? namer(selectedColor).basic[0].name
      : "Not selected";

    const message = `I'm interested in purchasing the following item from your store:

🧵 *Product Name:* ${product.name}
🎨 *Selected Color:* ${readableColor}
📐 *Selected Size:* ${selectedSize || "Not selected"}
🖼️ *Product Image:* ${selectedImage}
📝 *Description:* ${product.description || "Not available"}

Please share the details regarding availability, payment, and delivery. Looking forward to your response.

Thank you! 😊`;

    const url = `https://wa.me/919834186144?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className={`${josefin.className} bg-white`}>
      {/* Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full px-6 py-4 fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md"
      >
        <div className="flex justify-between items-center">
          {/* Brand */}
          <a
            href="/#hero"
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
              {categories.map(({ label, path }) => (
                <li key={label}>
                  <a
                    href={path}
                    className="px-3 py-1 rounded hover:text-gray-700 transition duration-300 text-black text-lg"
                  >
                    {label}
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

                    {categories.map(({ label, path }) => (
                      <li key={label}>
                        <a
                          href={path}
                          onClick={toggleMenu}
                          className="block w-full text-center px-6 py-3 rounded-lg hover:text-gray-300 transition duration-300 text-lg"
                        >
                          {label}
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

      {/* Product Details */}
      <div className="py-24 px-4 sm:px-8 lg:px-20">
        {loading ? (
          <p className="text-center text-lg text-black/90">Loading...</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Product Images */}
            <motion.div
              variants={fadeUpVariant}
              custom={0}
              className="w-full max-w-sm mx-auto"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-white border border-gray-300 shadow-md">
                {product.images?.length > 0 ? (
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="w-full h-full"
                    onSlideChange={(swiper) => {
                      setSelectedImage(product.images[swiper.realIndex]);
                    }}
                  >
                    {product.images.map((imgUrl, idx) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={imgUrl}
                          alt={`${product.name} - ${idx + 1}`}
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/40">
                    No images available
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div variants={fadeUpVariant} custom={0.2}>
              <h1 className="text-4xl font-bold text-black mb-4 tracking-tight leading-snug">
                {product.name}
              </h1>
              <p className="text-2xl text-black font-semibold mb-2">
                ₹{product.price.toLocaleString("en-IN")}.00
              </p>
              <p className="text-base text-black/90 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="font-semibold text-black mb-2 text-lg">
                  Select Size
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-black text-black hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <h3 className="font-semibold text-black mb-2 text-lg">
                  Choose Color
                </h3>
                <div className="flex gap-4">
                  {product.colors?.map((color, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 cursor-pointer border-4 transition-all duration-200 ${
                        selectedColor === color
                          ? "border-black scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <button
                className={`bg-[#25D366] text-white px-6 py-3 text-base font-semibold shadow-md hover:bg-[#1EBE5D] flex items-center justify-center gap-2 transition-all duration-200 ${
                  !selectedSize || !selectedColor
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleWhatsAppOrder}
                disabled={!selectedSize || !selectedColor}
              >
                <FaWhatsapp size={20} /> Order via WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* You Might Also Like */}
        <div className="mt-24">
          <YouMightAlsoLike />
        </div>
      </div>
    </section>
  );
}
