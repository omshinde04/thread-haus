"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Award, DollarSign } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-10 h-10" />,
    title: "Free Delivery",
    desc: "Enjoy free and fast delivery on all your orders, right to your doorstep.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "100% Secure Payment",
    desc: "Your transactions are always safe and encrypted with our secure payment system.",
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "Quality Guarantee",
    desc: "We ensure the best product quality, verified and guaranteed.",
  },
  {
    icon: <DollarSign className="w-10 h-10" />,
    title: "Guaranteed Savings",
    desc: "Shop with confidence and enjoy exclusive discounts and savings.",
  },
];

const FeatureSection = () => {
  return (
    <section className="w-full bg-white py-16"
    id="features">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-black">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
