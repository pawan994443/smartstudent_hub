import React from "react";
import { FaDownload, FaShareAlt, FaCheckCircle, FaEye } from "react-icons/fa";

export default function Portfolio() {
  return (
    <div
      id="portfolio" 
      className="bg-gray-50 min-h-screen py-10 px-4"
    >
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          Generate Your{" "}
          <span className="text-blue-600">Verified Portfolio</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Automatically compile your achievements into a professional, shareable
          portfolio perfect for job applications and academic opportunities.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold">
              Alex Johnson Portfolio{" "}
              <span className="ml-2 text-green-500 text-sm font-medium">
                ✔ Verified
              </span>
            </h2>
            <p className="text-gray-500">
              Computer Science Student | Graduating 2024 | GPA: 3.8/4.0
            </p>
          </div>

          
          <Section
            title="Academic Achievements"
            items={[
              "Dean's List - 3 Semesters",
              "Academic Excellence Award",
              "Research Paper Published",
            ]}
          />

          
          <Section
            title="Certifications"
            items={[
              "AWS Cloud Practitioner",
              "Google Analytics Certified",
              "Python Programming",
            ]}
          />

          
          <Section
            title="Projects & Internships"
            items={[
              "Software Engineering Intern",
              "Open Source Contributor",
              "Capstone Project",
            ]}
          />

          
          <Section
            title="Leadership & Extracurricular"
            items={[
              "Student Council President",
              "Debate Team Captain",
              "Community Volunteer",
            ]}
          />
        </div>

        
        <div className="space-y-6">
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Portfolio Actions</h3>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center mb-3 hover:bg-blue-700 transition">
              <FaDownload className="mr-2" /> Download PDF
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg flex items-center justify-center hover:bg-blue-50 transition">
              <FaShareAlt className="mr-2" /> Share Link
            </button>
            <p className="text-center mt-3 text-gray-500 cursor-pointer hover:underline">
              👁 Preview Portfolio
            </p>
          </div>

          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Portfolio Stats</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                Total Achievements: <span className="font-bold">24</span>
              </li>
              <li>
                Verified Items:{" "}
                <span className="text-green-600 font-bold">22</span>
              </li>
              <li>
                Profile Views: <span className="font-bold">47</span>
              </li>
              <li>
                Downloads: <span className="font-bold">12</span>
              </li>
            </ul>
          </div>

          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Share Your Success</h3>
            <p className="text-gray-500 mb-4">
              Your portfolio link:{" "}
              <span className="text-blue-600">
                portfolio.smartstudent.dev/alex-johnson
              </span>
            </p>
            <button className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold flex items-center justify-between mb-3">
        {title}
        <span className="text-green-500 flex items-center text-sm">
          <FaCheckCircle className="mr-1" /> Verified
        </span>
      </h3>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
