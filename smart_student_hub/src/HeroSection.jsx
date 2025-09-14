import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function HeroSection() {
  const [views, setViews] = useState(15);
  const [students] = useState(5000);

  useEffect(() => {
    const interval = setInterval(() => {
      setViews((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-10 py-16 bg-gradient-to-br from-gray-50 to-white">
      
      <div className="max-w-xl space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Build Your <span className="text-blue-500">Verified</span> Academic
          Portfolio
        </h1>

        <p className="text-gray-600 text-lg">
          Centralize all your achievements, certifications, and activities in
          one dynamic platform. Perfect for placements, higher education, and
          career advancement.
        </p>

        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 "onClick={"/api/app/StudentDashboard"}>
            Start Building Portfolio 
          </button>
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
            Watch Demo
          </button>
        </div>

        
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white"></div>
            </div>
            <span className="ml-2 text-gray-600">{students}+ students</span>
          </div>
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="ml-2 text-gray-600">4.9/5 rating</span>
          </div>
        </div>
      </div>

      
      <div className="relative mt-10 md:mt-0">
        <img
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
          alt="Students working"
          className="rounded-2xl shadow-lg w-[480px] h-[300px] object-cover"
        />

        
        <div className="absolute top-4 left-4 bg-white shadow-md rounded-lg px-4 py-2 text-sm font-medium text-green-600">
          ✅ Achievement Verified <br />
          
        </div>

        
       
      </div>
    </div>
  );
}
