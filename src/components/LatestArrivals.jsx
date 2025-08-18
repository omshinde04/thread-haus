"use client";

import React, { useEffect, useState, forwardRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ScrollContainer from "react-indiana-drag-scroll";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "react-indiana-drag-scroll/dist/style.css";

const LatestArrivals = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
  <section className="bg-white py-10 px-4 sm:px-6 md:px-10 font-poppins overflow-hidden">
    {/* Heading */}
    <motion.h2
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#3A2D00] mb-3 tracking-tight"
    >
      Latest Arrivals
    </motion.h2>

    {/* Subtext */}
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-center text-[#5F4B32] mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
    >
      Discover our newest additions curated to keep you stylish and comfortable.
      Shop the latest now!
    </motion.p>

    {/* Products */}
    <AnimatePresence mode="wait">
      {loading ? (
        <p className="text-center text-[#5F4B32]">Loading latest arrivals...</p>
      ) : products.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
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
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-transparent hover:border-[#3A2D00]/40 transition-all duration-300 p-4 min-h-[420px] flex flex-col cursor-pointer">
                  
                  {/* Product Images */}
                  <div className="w-full aspect-[4/5] bg-[#f8f8f8] mb-4 rounded-xl overflow-hidden flex items-center justify-center relative">
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
                      <span className="text-[#aaa]">Image coming soon</span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-[#3A2D00] font-semibold text-sm sm:text-base mb-1 line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Description */}
                  {product.description && (
                    <p className="text-xs sm:text-sm text-[#5F4B32]/90 mb-3 line-clamp-2 leading-snug">
                      {product.description}
                    </p>
                  )}

                  {/* Price & Stock */}
                  <div className="flex items-center justify-between mt-auto text-xs sm:text-sm">
                    <span className="bg-[#E7E2D3] text-[#3A2D00] px-2 py-1 rounded-full text-[11px] sm:text-xs font-medium">
                      {product.stockStatus || "In Stock"}
                    </span>
                    <div className="text-right">
                      <p className="text-[#3A2D00] font-bold text-sm sm:text-base">
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
      ) : (
        <p className="text-center text-[#5F4B32]">No latest products found.</p>
      )}
    </AnimatePresence>
  </section>
);

});

export default LatestArrivals;
