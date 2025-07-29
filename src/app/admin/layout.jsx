"use client";

import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer"; // adjust path if needed

export default function AdminLayout({ children }) {
  return (
    <div className="bg-[#0f0e0d] min-h-screen text-[#f4ede4] font-poppins flex flex-col">
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Page Content */}
      <main className="flex-grow p-4 sm:p-6">{children}</main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
