"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const YouMightAlsoLike = () => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/suggested-products");
        const data = await res.json();
        setSuggestedProducts(data);
      } catch (error) {
        console.error("Error fetching suggested products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-white py-12 px-4 sm:px-6 md:px-10 font-poppins overflow-hidden">
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#3A2D00] mb-8"
      >
        You Might Also Like
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {suggestedProducts.map((product, index) => {
          const images = Array.isArray(product.images)
            ? product.images
            : product.images
            ? Object.values(product.images)
            : [];

          const price = typeof product.price === "number" ? product.price : null;
          const originalPrice = typeof product.originalPrice === "number" ? product.originalPrice : null;

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
              }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg p-4 border hover:border-[#3A2D00] transition-all duration-300 min-h-[440px] flex flex-col cursor-pointer"
            >
              <Link href={`/product/${product._id}`}>
                <div>
                  <div className="w-full aspect-[4/5] bg-[#f8f8f8] mb-4 rounded-lg overflow-hidden relative">
                    {images.length > 0 ? (
                      <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        loop
                        className="w-full h-full"
                      >
                        {images.map((imgUrl, i) => (
                          <SwiperSlide key={i}>
                            <Image
                              src={imgUrl}
                              alt={`Product image ${i + 1}`}
                              width={400}
                              height={500}
                              className="w-full h-full object-cover object-center"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#aaa] text-sm">
                        Image coming soon
                      </div>
                    )}
                  </div>

                  <h3 className="text-[#3A2D00] font-medium text-base sm:text-lg mb-1">
                    {product.name || "Unnamed Product"}
                  </h3>

                  {product.description && (
                    <p className="text-xs sm:text-sm text-[#5F4B32] mb-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto text-xs sm:text-sm">
                    <span className="bg-[#E7E2D3] text-[#3A2D00] px-3 py-1 rounded-full text-[10px] sm:text-xs">
                      {product.stockStatus || "IN STOCK"}
                    </span>
                    <div className="text-right">
                      <p className="text-[#3A2D00] font-bold text-sm sm:text-base">
                        ₹{price?.toLocaleString("en-IN") || "--"}
                      </p>
                      {originalPrice && (
                        <p className="text-gray-400 line-through text-xs">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default YouMightAlsoLike;
