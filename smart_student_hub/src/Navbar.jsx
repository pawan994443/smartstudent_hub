import React, { useState } from "react";
import { FaBell, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-green-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-lg text-blue-600 text-xl shadow-md">
            🎓
          </div>
          <h1 className="text-2xl font-bold text-white">
            Smart <span className="text-yellow-300">Student Hub</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li
            onClick={() => scrollToSection("features")}
            className="hover:text-yellow-300 cursor-pointer transition"
          >
            Features
          </li>
          <li
            onClick={() => scrollToSection("dashboard")}
            className="hover:text-yellow-300 cursor-pointer transition"
          >
            Dashboard
          </li>
          <li
            onClick={() => scrollToSection("portfolio")}
            className="hover:text-yellow-300 cursor-pointer transition"
          >
            Portfolio
          </li>
          <li
            onClick={() => scrollToSection("analytics")}
            className="hover:text-yellow-300 cursor-pointer transition"
          >
            Analytics
          </li>
        </ul>

        {/* Search + Notification */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {/* Notification */}
          <button className="relative">
            <FaBell className="text-white text-xl hover:text-yellow-300 transition" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-white focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
            <li
              onClick={() => scrollToSection("features")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Features
            </li>
            <li
              onClick={() => scrollToSection("dashboard")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Dashboard
            </li>
            <li
              onClick={() => scrollToSection("portfolio")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Portfolio
            </li>
            <li
              onClick={() => scrollToSection("analytics")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Analytics
            </li>
          </ul>

          {/* Search */}
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between mt-4">
            <button className="relative">
              <FaBell className="text-gray-600 text-xl hover:text-blue-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
