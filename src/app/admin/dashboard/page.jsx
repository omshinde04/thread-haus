"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTshirt } from "react-icons/fa";
import { MdNewReleases, MdThumbUp } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const AdminDashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage or cookie if used
    localStorage.removeItem("adminToken"); // Adjust this key as per your implementation

    // Redirect to login
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0f0e0d] text-[#f4ede4] px-6 py-12 font-poppins">
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-[#d2b48c]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#3a2d00] text-[#f4ede4] hover:bg-[#5a3d1a] px-4 py-2 rounded-lg transition duration-300"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Manage Products Genre */}
        <Link href="/admin/manage-products-genre">
          <div className="cursor-pointer group bg-[#1a1715] border border-[#3a2d00] rounded-lg p-6 hover:bg-[#2b1e16] transition duration-300 shadow-md">
            <div className="flex items-center gap-4 mb-3 text-[#d2b48c] group-hover:text-[#e4c78c]">
              <FaTshirt size={30} />
              <h2 className="text-xl font-semibold">Manage Products</h2>
            </div>
            <p className="text-sm text-[#f4ede4] group-hover:text-[#f7e6cb]">
              Add, edit or delete products
            </p>
          </div>
        </Link>

        {/* Manage Latest Arrivals */}
        <Link href="/admin/manage-latest-arrivals">
          <div className="cursor-pointer group bg-[#1a1715] border border-[#3a2d00] rounded-lg p-6 hover:bg-[#2b1e16] transition duration-300 shadow-md">
            <div className="flex items-center gap-4 mb-3 text-[#d2b48c] group-hover:text-[#e4c78c]">
              <MdNewReleases size={30} />
              <h2 className="text-xl font-semibold">Manage Latest Arrivals</h2>
            </div>
            <p className="text-sm text-[#f4ede4] group-hover:text-[#f7e6cb]">
              Update latest arrivals section
            </p>
          </div>
        </Link>

        {/* Manage Suggested Products */}
        <Link href="/admin/manage-suggested-products">
          <div className="cursor-pointer group bg-[#1a1715] border border-[#3a2d00] rounded-lg p-6 hover:bg-[#2b1e16] transition duration-300 shadow-md">
            <div className="flex items-center gap-4 mb-3 text-[#d2b48c] group-hover:text-[#e4c78c]">
              <MdThumbUp size={30} />
              <h2 className="text-xl font-semibold">Manage Suggestions</h2>
            </div>
            <p className="text-sm text-[#f4ede4] group-hover:text-[#f7e6cb]">
              Customize "You Might Also Like" section
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
