"use client";

const React = require("react");
const { useState } = require("react");
const Link = require("next/link").default;
const { usePathname } = require("next/navigation");
const { motion, AnimatePresence } = require("framer-motion");
const { Menu, X } = require("lucide-react");

const AdminNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

const hideLinks = [
  "/admin/login",
  "/admin/signup",
  "/admin/forgot-password",
  "/admin/reset-password"
].includes(pathname);


  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Products", path: "/admin/manage-products-genre" },
    { name: "Latest Arrivals", path: "/admin/manage-latest-arrivals" },
    { name: "Suggested Products", path: "/admin/manage-suggested-products" },
  ];

  return (
    <nav className="bg-[#1a1715] border-b border-[#3a2d00] text-[#f4ede4] px-6 py-4 font-poppins">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#d2b48c]">Admin Panel</h1>

        {!hideLinks && (
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        )}

        {/* Desktop Menu */}
        {!hideLinks && (
          <div className="hidden md:flex gap-4">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.path} href={link.path}>
                  <span
                    className={`px-4 py-2 rounded-full text-sm transition duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-[#e4c78c] text-[#1a1715] font-semibold shadow-md"
                          : "hover:bg-[#3a2d00] hover:text-[#e4c78c]"
                      }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {!hideLinks && isOpen && (
        <AnimatePresence>
          <motion.div
            className="mt-4 flex flex-col gap-3 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.path} href={link.path} onClick={() => setIsOpen(false)}>
                  <span
                    className={`block w-full px-4 py-2 rounded-md text-sm transition duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-[#e4c78c] text-[#1a1715] font-semibold shadow"
                          : "hover:bg-[#3a2d00] hover:text-[#e4c78c]"
                      }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </nav>
  );
};

module.exports = AdminNavbar;
