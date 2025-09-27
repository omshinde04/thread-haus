"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"] });

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
  <section className={`${josefin.className} bg-white py-12 px-4 sm:px-6 md:px-10 overflow-hidden`}>
    {/* Heading */}
    <motion.h2
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-3 tracking-tight"
    >
      You Might Also Like
    </motion.h2>

    {/* Subtext */}
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-center text-black/90 mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
    >
      Handpicked recommendations we think you’ll love. Explore more of what suits your taste!
    </motion.p>

    {/* Products Grid */}
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto">
      {suggestedProducts.map((product, index) => {
        const images = Array.isArray(product.images)
          ? product.images
          : product.images
          ? Object.values(product.images)
          : [];

        const price = typeof product.price === "number" ? product.price : null;
        const originalPrice =
          typeof product.originalPrice === "number" ? product.originalPrice : null;

        return (
          <motion.div
            key={product._id || index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            }}
            className="bg-white shadow-sm border border-transparent hover:border-black/40 transition-all duration-300 cursor-pointer"
          >
            <Link href={`/product/${product._id}`}>
              {/* ---------- Mobile Card ---------- */}
              <div className="block md:hidden">
                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                  {images.length > 0 ? (
                    <Image
                      src={images[0]}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-black/40 flex items-center justify-center w-full h-full">
                      Image coming soon
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-black font-medium text-[13px] truncate mb-1">
                    {product.name || "Unnamed Product"}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-black font-bold text-sm">
                      ₹{price?.toLocaleString("en-IN") || "--"}
                    </p>
                    {originalPrice && (
                      <p className="text-gray-400 line-through text-xs">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>

                           {/* Stock Status */}
<span
  className="bg-[#B6B6B6] text-black px-2 py-0.5 text-[11px] sm:text-xs font-medium inline-block w-fit square"
>
  {product.stockStatus || "In Stock"}
</span>
                </div>
              </div>

              {/* ---------- Desktop Card ---------- */}
              <div className="hidden md:flex flex-col p-4 min-h-[420px]">
                <div className="w-full aspect-[4/5] bg-[#f8f8f8] mb-4 overflow-hidden flex items-center justify-center relative">
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
                    <span className="text-black/40">Image coming soon</span>
                  )}
                </div>

                <h3 className="text-black font-semibold text-sm sm:text-base mb-1 line-clamp-1">
                  {product.name || "Unnamed Product"}
                </h3>

                {product.description && (
                  <p className="text-xs sm:text-sm text-black/90 mb-3 line-clamp-2 leading-snug">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto text-xs sm:text-sm">
                  <span className="bg-[#B6B6B6] text-black px-2 py-1 text-[11px] sm:text-xs font-medium">
                    {product.stockStatus || "In Stock"}
                  </span>
                  <div className="text-right">
                    <p className="text-black font-bold text-sm sm:text-base">
                      ₹{price?.toLocaleString("en-IN") || "--"}
                    </p>
                    {originalPrice && (
                      <p className="text-gray-400 line-through text-[11px] sm:text-xs">
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
