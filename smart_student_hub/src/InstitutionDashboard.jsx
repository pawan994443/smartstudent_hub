import React, { useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaClipboardList,
  FaFileAlt,
  FaCalendarAlt,
  FaDownload,
  FaSearch,
} from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function InstitutionDashboard() {
  const [reports, setReports] = useState([]);
  const [autoSchedule, setAutoSchedule] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [search, setSearch] = useState("");

  const analyticsData = [
    { month: "Jan", students: 4000, achievements: 2400 },
    { month: "Feb", students: 3000, achievements: 1398 },
    { month: "Mar", students: 2000, achievements: 9800 },
    { month: "Apr", students: 2780, achievements: 3908 },
    { month: "May", students: 1890, achievements: 4800 },
    { month: "Jun", students: 2390, achievements: 3800 },
  ];

  const portfolioData = [
    { name: "AI Research Paper", type: "Faculty", year: 2025 },
    { name: "National Coding Hackathon", type: "Student", year: 2024 },
    { name: "Placement Drive Report", type: "Institution", year: 2025 },
  ];

  const handleGenerate = (type) => {
    const newReport = `${type} generated at ${new Date().toLocaleTimeString()}`;
    setReports((prev) => [...prev, newReport]);
    alert(`${type} generated successfully `);
  };

  const handleSchedule = () => {
    if (autoSchedule) {
      clearInterval(intervalId);
      setIntervalId(null);
      setAutoSchedule(false);
      alert("Automated scheduling stopped ");
    } else {
      const id = setInterval(
        () => handleGenerate("Automated Scheduled Report"),
        10000
      );
      setIntervalId(id);
      setAutoSchedule(true);
      alert("Automated scheduling started  (every 10s)");
    }
  };

  const exportReports = () => {
    const blob = new Blob([reports.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reports-log.txt";
    link.click();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 space-y-20">
      <section id="features" className="text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Features</h2>
        <p className="text-gray-600">
          Explore the key highlights and benefits of Smart Student Hub.
        </p>
      </section>

      <section id="dashboard">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
           Institution Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<FaUsers />} value="15,247" label="Total Students" growth="+12%" />
          <StatCard icon={<FaClipboardList />} value="45,892" label="Verified Achievements" growth="+25%" />
          <StatCard icon={<FaFileAlt />} value="1,245" label="Generated Reports" growth="+8%" />
          <StatCard icon={<FaChartLine />} value="892" label="Faculty Users" growth="+15%" />
        </div>
      </section>

      <section id="portfolio" className="text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Portfolio</h2>
        <div className="flex justify-center items-center gap-2 mb-4">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search achievements..."
            className="border px-3 py-1 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-4 space-y-2">
          {portfolioData
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((p, i) => (
              <li key={i} className="p-2 border-b text-gray-700">
                <strong>{p.name}</strong> — <span>{p.type}</span> ({p.year})
              </li>
            ))}
        </ul>
      </section>

      <section id="analytics" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            📊 Institution Analytics Dashboard
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="students" stroke="#3b82f6" />
              <Line type="monotone" dataKey="achievements" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <ReportCard
            title="NAAC Accreditation Report"
            items={["Student participation metrics", "Achievement analytics", "Faculty approval rates"]}
            onClick={() => handleGenerate("NAAC Accreditation Report")}
            borderColor="border-blue-500"
          />
          <ReportCard
            title="NIRF Ranking Report"
            items={["Research publications", "Student outcomes", "Placement statistics"]}
            onClick={() => handleGenerate("NIRF Ranking Report")}
            borderColor="border-green-500"
          />
          <ReportCard
            title="Internal Assessment Report"
            items={["Department-wise analytics", "Trend analysis", "Performance benchmarks"]}
            onClick={() => handleGenerate("Internal Assessment Report")}
            borderColor="border-yellow-500"
          />

          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md p-6 text-center">
            <FaCalendarAlt className="mx-auto text-3xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Automated Reports</h3>
            <p className="mb-4">
              Schedule automatic report generation for regular accreditation submissions
            </p>
            <button
              onClick={handleSchedule}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              {autoSchedule ? "Stop Schedule" : "Setup Schedule"}
            </button>
          </div>
        </div>
      </section>

      {reports.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
            Generated Reports Log
            <button
              onClick={exportReports}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
            >
              <FaDownload /> Export
            </button>
          </h3>
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

function ReportCard({ title, items, onClick, borderColor }) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${borderColor}`}>
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
