"use client"; // ⬅️ Add this line at the top

import { useRef } from "react";
import GenreSection from "@/components/GenreSection";
import HeroSection from "@/components/HeroSection";
import LatestArrivals from "@/components/LatestArrivals";

export default function Home() {
  const latestArrivalsRef = useRef(null);

  const handleNewCollectionClick = () => {
    if (latestArrivalsRef.current) {
      latestArrivalsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex-grow">
      <HeroSection onNewCollectionClick={handleNewCollectionClick} />
      <GenreSection />
      <div ref={latestArrivalsRef}>
        <LatestArrivals />
      </div>
    </main>
  );
}
