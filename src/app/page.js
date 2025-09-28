"use client"; // ⬅️ Add this line at the top

import { useRef } from "react";
import GenreSection from "@/components/GenreSection";
import HeroSection from "@/components/HeroSection";
import LatestArrivals from "@/components/LatestArrivals";
import Feature from "@/components/Feature";
import Contact from "@/components/Contact";
// import About from "@/components/About"; 
 import Offer from "@/components/Offer"; 

export default function Home() {
  const latestArrivalsRef = useRef(null);

  const handleNewCollectionClick = () => {
    if (latestArrivalsRef.current) {
      latestArrivalsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex-grow">
      <HeroSection />
      <Feature/>
      {/* <About/>  */}
      <GenreSection />
      <div ref={latestArrivalsRef}>
        <LatestArrivals />
        <Contact/>
         <Offer/>
      </div>
    </main>
  );
}
