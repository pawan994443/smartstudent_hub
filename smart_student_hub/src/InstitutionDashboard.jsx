import React, { useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaClipboardList,
  FaFileAlt,
  FaCalendarAlt,
} from "react-icons/fa";

export default function InstitutionDashboard() {
  const [reports, setReports] = useState([]);

  const handleGenerate = (type) => {
    setReports((prev) => [
      ...prev,
      `${type} generated at ${new Date().toLocaleTimeString()}`,
    ]);
    alert(`${type} generated successfully ✅`);
  };

  const handleSchedule = () => {
    alert("Automated Report Schedule Setup Completed! 📅");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 space-y-20">
      {/* Features Section */}
      <section id="features" className="text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Features</h2>
        <p className="text-gray-600">
          Explore the key highlights and benefits of Smart Student Hub.
        </p>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          📋 Institution Dashboard
        </h2>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaUsers />}
            value="15,247"
            label="Total Students"
            growth="+12%"
          />
          <StatCard
            icon={<FaClipboardList />}
            value="45,892"
            label="Verified Achievements"
            growth="+25%"
          />
          <StatCard
            icon={<FaFileAlt />}
            value="1,245"
            label="Generated Reports"
            growth="+8%"
          />
          <StatCard
            icon={<FaChartLine />}
            value="892"
            label="Faculty Users"
            growth="+15%"
          />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">🎨 Portfolio</h2>
        <p className="text-gray-600">
          Showcase student and faculty achievements with interactive portfolios.
        </p>
      </section>

      {/* Analytics Section */}
      <section
        id="analytics"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Analytics Dashboard */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            📊 Institution Analytics Dashboard
          </h3>
          <p className="text-gray-500 mb-6">
            Real-time insights into student achievements and institutional
            performance
          </p>
          <div className="h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400">
            Interactive Analytics Dashboard
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <p className="text-blue-600 font-bold text-xl">94%</p>
              <p className="text-gray-500 text-sm">Verification Rate</p>
            </div>
            <div>
              <p className="text-green-600 font-bold text-xl">2.3x</p>
              <p className="text-gray-500 text-sm">Activity Increase</p>
            </div>
            <div>
              <p className="text-yellow-500 font-bold text-xl">48hrs</p>
              <p className="text-gray-500 text-sm">Avg. Approval Time</p>
            </div>
          </div>
        </div>

        {/* Generate Reports */}
        <div className="space-y-6">
          <ReportCard
            title="NAAC Accreditation Report"
            items={[
              "Student participation metrics",
              "Achievement analytics",
              "Faculty approval rates",
            ]}
            onClick={() => handleGenerate("NAAC Accreditation Report")}
            borderColor="border-blue-500"
          />
          <ReportCard
            title="NIRF Ranking Report"
            items={[
              "Research publications",
              "Student outcomes",
              "Placement statistics",
            ]}
            onClick={() => handleGenerate("NIRF Ranking Report")}
            borderColor="border-green-500"
          />
          <ReportCard
            title="Internal Assessment Report"
            items={[
              "Department-wise analytics",
              "Trend analysis",
              "Performance benchmarks",
            ]}
            onClick={() => handleGenerate("Internal Assessment Report")}
            borderColor="border-yellow-500"
          />

          {/* Automated Reports */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md p-6 text-center">
            <FaCalendarAlt className="mx-auto text-3xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Automated Reports</h3>
            <p className="mb-4">
              Schedule automatic report generation for regular accreditation
              submissions
            </p>
            <button
              onClick={handleSchedule}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Setup Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Generated Reports Log */}
      {reports.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Generated Reports Log</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {reports.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Reusable Stat Card
function StatCard({ icon, value, label, growth }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
      <div className="text-3xl text-blue-600">{icon}</div>
      <div className="text-right">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
      <span className="text-green-600 font-semibold ml-2">{growth}</span>
    </div>
  );
}

// Reusable Report Card
function ReportCard({ title, items, onClick, borderColor }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${borderColor}`}
    >
      <h3 className="text-md font-semibold mb-3">{title}</h3>
      <ul className="list-disc pl-5 text-gray-600 text-sm mb-4 space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        ⬇ Generate
      </button>
    </div>
  );
}
