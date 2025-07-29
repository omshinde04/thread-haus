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
    <section
      ref={ref}
      className="bg-white py-10 px-4 sm:px-6 md:px-10 font-poppins overflow-hidden"
    >
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#3A2D00] mb-2"
      >
        Latest Arrivals
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-[#5F4B32] mb-8 max-w-xl mx-auto text-sm sm:text-base"
      >
        Discover our newest additions curated to keep you stylish and comfortable.
        Shop the latest now!
      </motion.p>

      <AnimatePresence mode="wait">
        {loading ? (
          <p className="text-center">Loading latest arrivals...</p>
        ) : products.length ? (
          <>
            {/* Mobile: vertical stack */}
            <div className="flex flex-col gap-6 sm:hidden">
              {products.map((product, i) => (
                <motion.div
                  key={`mobile-latest-${product._id}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  }}
                  className="w-full"
                >
                  <Link href={`/product/${product._id}`}>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg p-3 border hover:border-[#3A2D00] transition-all duration-300 min-h-[420px] flex flex-col cursor-pointer">
                      <div className="w-full aspect-[4/5] bg-[#f8f8f8] mb-3 rounded-lg overflow-hidden flex items-center justify-center relative">
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

                      <h3 className="text-[#3A2D00] font-medium text-sm sm:text-base mb-1">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="text-xs sm:text-sm text-[#5F4B32] mb-2 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-auto text-xs">
                        <span className="bg-[#E7E2D3] text-[#3A2D00] px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                          {product.stockStatus || "In Stock"}
                        </span>
                        <div className="text-right">
                          <p className="text-[#3A2D00] font-bold text-sm">
                            ₹{product.price?.toLocaleString("en-IN") || "0.00"}
                          </p>
                          {product.originalPrice && (
                            <p className="text-gray-400 line-through text-[10px]">
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

            {/* Desktop: horizontal scroll */}
            <ScrollContainer
              className="hidden sm:flex gap-4 overflow-x-auto px-1 cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory"
            >
              {products.map((product, i) => (
                <motion.div
                  key={`latest-${product._id}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  }}
                  className="snap-start shrink-0 w-[90vw] sm:w-[60vw] md:w-[40vw] lg:w-[26vw] xl:w-[280px]"
                >
                  <Link href={`/product/${product._id}`}>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg p-3 border hover:border-[#3A2D00] transition-all duration-300 min-h-[420px] flex flex-col cursor-pointer">
                      <div className="w-full aspect-[4/5] bg-[#f8f8f8] mb-3 rounded-lg overflow-hidden flex items-center justify-center relative">
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

                      <h3 className="text-[#3A2D00] font-medium text-sm sm:text-base mb-1">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="text-xs sm:text-sm text-[#5F4B32] mb-2 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-auto text-xs">
                        <span className="bg-[#E7E2D3] text-[#3A2D00] px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                          {product.stockStatus || "In Stock"}
                        </span>
                        <div className="text-right">
                          <p className="text-[#3A2D00] font-bold text-sm">
                            ₹{product.price?.toLocaleString("en-IN") || "0.00"}
                          </p>
                          {product.originalPrice && (
                            <p className="text-gray-400 line-through text-[10px]">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </ScrollContainer>
          </>
        ) : (
          <p className="text-center">No latest products found.</p>
        )}
      </AnimatePresence>
    </section>
  );
});

export default LatestArrivals;
