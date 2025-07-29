"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/admin"); // ✅ hide only on admin routes

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
