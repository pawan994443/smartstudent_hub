import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Dashboard from "./Dashboard";
import Portfolio from "./Portfolio";
import InstitutionDashboard from "./InstitutionDashboard";
import Footer from "./Footer";
import Login from "./Login";

export default function App() {
  return (
    <Router>
      <div className="font-sans scroll-smooth">
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <div id="features">
                  <Features />
                  <Dashboard />
                  <Portfolio />
                  <InstitutionDashboard />
                  <Footer />
                </div>
              </>
            }
          />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
