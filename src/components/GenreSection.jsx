"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ScrollContainer from "react-indiana-drag-scroll";
import "swiper/css";
import "swiper/css/pagination";
import "react-indiana-drag-scroll/dist/style.css";


const GenreSection = () => {
  const [activeTab, setActiveTab] = useState("Down-Shoulder");
  const [productsByGenre, setProductsByGenre] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/genre-products");
        const data = await res.json();
        setProductsByGenre(data);
      } catch (err) {
        console.error("Failed to fetch genre products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const tabs = ["Normal", "Down-Shoulder"];

return (
  <section className="bg-white py-10 px-4 sm:px-6 md:px-10 font-poppins overflow-hidden">
    <motion.h2
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#3A2D00] mb-2"
    >
      Select Your Genres
    </motion.h2>

    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-center text-[#5F4B32] mb-8 max-w-xl mx-auto text-sm sm:text-base"
    >
      We offer carefully selected categories to suit everyone. Choose your
      category and enjoy shopping!
    </motion.p>

    {/* Tabs */}
    <div className="relative flex flex-wrap justify-center gap-4 sm:gap-10 mb-10 font-semibold text-[#3A2D00] text-base sm:text-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative px-2 pb-2"
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 h-[3px] w-full rounded bg-[#3A2D00]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>

    {/* Vertical Product List */}
    <AnimatePresence mode="wait">
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : productsByGenre[activeTab]?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productsByGenre[activeTab].map((product, i) => (
           <motion.div
  key={product._id}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 30 }}
  transition={{ duration: 0.4, delay: i * 0.1 }}
  whileHover={{
    scale: 1.03,
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  }}
  className="snap-start shrink-0 w-full sm:w-[60vw] md:w-[40vw] lg:w-[26vw] xl:w-[280px]"
>
  <Link href={`/product/${product._id}`}>
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg p-3 border hover:border-[#3A2D00] transition-all duration-300 min-h-[420px] flex flex-col cursor-pointer">
      <div className="w-full aspect-[4/5] bg-[#f8f8f8] mb-3 rounded-lg overflow-hidden flex items-center justify-center relative">
        {product.images && product.images.length > 0 ? (
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
      ) : (
        <p className="text-center">No products found.</p>
      )}
    </AnimatePresence>
  </section>
);


};

export default GenreSection;
