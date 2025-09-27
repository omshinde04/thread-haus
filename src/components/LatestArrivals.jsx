"use client";

import React, { useEffect, useState, forwardRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "react-indiana-drag-scroll/dist/style.css";

const LatestArrivals = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const initialLimit = 4; // mobile
  const initialLimitDesktop = 8; // desktop

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliceLimit = isMobile ? initialLimit : initialLimitDesktop;

  useEffect(() => {
    const fetchLatestArrivals = async () => {
      try {
        const res = await fetch("/api/latest-arrival");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch latest arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArrivals();
  }, []);

  return (
   <section
  id="latest"
  ref={ref}
  className={`${josefin.className} bg-white py-10 px-4 sm:px-6 md:px-10 overflow-hidden`}
>

      {/* Heading */}
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-3 tracking-tight"
      >
        Latest Arrivals
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-black mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
      >
        Discover our newest additions curated to keep you stylish and comfortable.
        Shop the latest now!
      </motion.p>

      <AnimatePresence mode="wait">
        {loading ? (
          <p className="text-center text-black">Loading latest arrivals...</p>
        ) : products.length ? (
          <>
            {/* Mobile Grid */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              {(showAll ? products : products.slice(0, sliceLimit)).map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition duration-300 overflow-hidden"
                >
                  <Link href={`/product/${product._id}`}>
                    <div className="relative w-full aspect-square bg-gray-50">
                      <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 flex flex-col">
                      <h3 className="text-black font-medium text-[13px] truncate mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mb-1">
                        <p className="text-black font-bold text-sm">
                          ₹{product.price?.toLocaleString("en-IN")}
                        </p>
                        {product.originalPrice && (
                          <p className="text-gray-400 line-through text-xs">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                     <span
  className="bg-[#B6B6B6] text-black px-2 py-0.5 text-[11px] sm:text-xs font-medium inline-block w-fit square"
>
  {product.stockStatus || "In Stock"}
</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop / Tablet Grid */}
            <div className="hidden md:grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(showAll ? products : products.slice(0, sliceLimit)).map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                  }}
                  className="snap-start shrink-0 w-full sm:w-[60vw] md:w-[40vw] lg:w-[26vw] xl:w-[280px]"
                >
                  <Link href={`/product/${product._id}`}>
                    <div className="bg-white shadow-sm hover:shadow-xl border border-transparent hover:border-black/40 transition-all duration-300 p-4 min-h-[420px] flex flex-col cursor-pointer">
                      <div className="w-full aspect-[4/5] bg-[#f8f8f8] mb-4 overflow-hidden flex items-center justify-center relative">
                        {Array.isArray(product.images) && product.images.length > 0 ? (
                          <Swiper
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            loop
                            className="w-full h-full"
                          >
                            {product.images.map((imgUrl, idx) => (
                              <SwiperSlide key={idx}>
                                <img
                                  src={imgUrl}
                                  alt={`Image ${idx + 1}`}
                                  className="object-cover object-center w-full h-full"
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        ) : (
                          <span className="text-black/40">Image coming soon</span>
                        )}
                      </div>

                      <h3 className="text-black font-semibold text-sm sm:text-base mb-1 line-clamp-1">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="text-xs sm:text-sm text-black/90 mb-3 line-clamp-2 leading-snug">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-auto text-xs sm:text-sm">
                        <span
                          className="bg-[#B6B6B6] text-black px-2 py-1 text-[11px] sm:text-xs font-medium"
                        >
                          {product.stockStatus || "In Stock"}
                        </span>
                        <div className="text-right">
                          <p className="text-black font-bold text-sm sm:text-base">
                            ₹{product.price?.toLocaleString("en-IN") || "0.00"}
                          </p>
                          {product.originalPrice && (
                            <p className="text-gray-400 line-through text-[11px] sm:text-xs">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View More Button (always visible) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={() => setShowAll(prev => !prev)}
                className="bg-black text-white px-6 py-3 square font-semibold text-sm sm:text-base hover:bg-black/80 transition-all duration-300"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </motion.div>
          </>
        ) : (
          <p className="text-center text-black">No latest products found.</p>
        )}
      </AnimatePresence>
    </section>
  );
});

export default LatestArrivals;
