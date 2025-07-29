"use client";

import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import YouMightAlsoLike from "@/components/YouMightAlsoLike";

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
  const colorMap = {
    "#000000": "Black",
    "#FFFFFF": "White",
    "#FF0000": "Red",
    "#00FF00": "Green",
    "#0000FF": "Blue",
    "#FFFF00": "Yellow",
    "#FFA500": "Orange",
    "#800080": "Purple",
    "#FFC0CB": "Pink",
    "#A52A2A": "Brown",
    "#808080": "Gray",
    "#C0C0C0": "Silver",
  };

  const readableColor = selectedColor ? (colorMap[selectedColor.toUpperCase()] || selectedColor) : "Not selected";

  const message = `I'm interested in purchasing the following item from your store:

🧵 *Product Name:* ${product.name}
🎨 *Selected Color:* ${readableColor}
📐 *Selected Size:* ${selectedSize || "Not selected"}
🖼️ *Product Image:* ${selectedImage}
📝 *Description:* ${product.description || "Not available"}

Please share the details regarding availability, payment, and delivery. Looking forward to your response.

Thank you! 😊`;

  const url = `https://wa.me/918956554715?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};


return (
  <section className="bg-white font-poppins py-16 px-4 sm:px-8 lg:px-20">
    {loading ? (
      <p className="text-center text-lg text-[#5F4B32]">Loading...</p>
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
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#ddd] shadow-lg">
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
                      className="w-full h-full object-cover rounded-2xl transition-all duration-300"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No images available
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div variants={fadeUpVariant} custom={0.2}>
          <h1 className="text-4xl font-bold text-[#3A2D00] mb-4 tracking-tight leading-snug">
            {product.name}
          </h1>
          <p className="text-2xl text-[#5F4B32] font-semibold mb-2">
            ₹{product.price.toLocaleString("en-IN")}.00
          </p>
          <p className="text-base text-[#444] mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#3A2D00] mb-2 text-lg">
              Select Size
            </h3>
            <div className="flex gap-3 flex-wrap">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-[#3A2D00] text-white border-[#3A2D00]"
                      : "border-[#3A2D00] text-[#3A2D00] hover:bg-[#f3eee9]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-8">
            <h3 className="font-semibold text-[#3A2D00] mb-2 text-lg">
              Choose Color
            </h3>
            <div className="flex gap-4">
              {product.colors?.map((color, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full cursor-pointer border-4 transition-all duration-200 ${
                    selectedColor === color
                      ? "border-[#3A2D00] scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* WhatsApp Order Button */}
          <button
            className={`bg-[#25D366] text-white px-6 py-3 rounded-full text-base font-semibold shadow-md hover:bg-[#1EBE5D] flex items-center justify-center gap-2 transition-all duration-200 ${
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
  </section>
);

}
