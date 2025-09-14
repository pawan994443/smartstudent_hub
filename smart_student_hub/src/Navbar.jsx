import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignInAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.js"; 
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-red-600 to-yellow-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-lg text-blue-600 text-xl shadow-md">
            🎓
          </div>
          <h1 className="text-2px font-bold text-white">
            Smart <span className="text-yellow-300">Student Hub</span>
          </h1>
        </div>

        
        <div className="hidden md:flex items-center space-x-8 text-white font-medium w-full">
          <ul className="flex space-x-7">
            <li onClick={() => scrollToSection("features")} className="hover:text-yellow-300 cursor-pointer">Features</li>
            <li onClick={() => scrollToSection("dashboard")} className="hover:text-yellow-300 cursor-pointer">Dashboard</li>
            <li onClick={() => scrollToSection("portfolio")} className="hover:text-yellow-300 cursor-pointer">Portfolio</li>
            <li onClick={() => scrollToSection("analytics")} className="hover:text-yellow-300 cursor-pointer">Analytics</li>
          </ul>

          
          <div className="flex items-center space-x-6 ml-auto">
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            
            <button className="relative">
              <FaBell className="text-white text-xl hover:text-yellow-300 transition" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition"
                >
                  My Account ▾
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/account");
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-white focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
            <li onClick={() => scrollToSection("features")} className="hover:text-blue-600 cursor-pointer">Features</li>
            <li onClick={() => scrollToSection("dashboard")} className="hover:text-blue-600 cursor-pointer">Dashboard</li>
            <li onClick={() => scrollToSection("portfolio")} className="hover:text-blue-600 cursor-pointer">Portfolio</li>
            <li onClick={() => scrollToSection("analytics")} className="hover:text-blue-600 cursor-pointer">Analytics</li>
          </ul>

          
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>

          
          <div className="flex items-center justify-between mt-4">
            <button className="relative">
              <FaBell className="text-gray-600 text-xl hover:text-blue-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>
          </div>

          
          <div className="mt-4 flex items-center justify-center">
            {!user ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="flex items-center space-x-2 text-blue-600 font-medium hover:text-blue-800 transition"
              >
                <FaSignInAlt className="text-2xl" />
                <span>Login</span>
              </button>
            ) : (
              <div className="w-full text-center">
                <button
                  onClick={() => navigate("/account")}
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  My Account
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full mt-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
