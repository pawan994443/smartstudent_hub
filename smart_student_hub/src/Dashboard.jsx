import React, { useState } from "react";

export default function Dashboard() {
  const [achievements, setAchievements] = useState([
    { title: "Web Development Certificate", date: "2024-01-15", status: "Verified" },
    { title: "Tech Conference 2024", date: "2024-01-20", status: "Pending" },
    { title: "Coding Competition Winner", date: "2024-01-10", status: "Verified" },
    { title: "Volunteer Work - NGO", date: "2024-01-05", status: "Verified" },
  ]);

  const [newAchievement, setNewAchievement] = useState("");

  const addAchievement = () => {
    if (newAchievement.trim() === "") return;
    setAchievements([
      ...achievements,
      { title: newAchievement, date: new Date().toISOString().split("T")[0], status: "Pending" },
    ]);
    setNewAchievement("");
  };

  return (
    <section id="dashboard" className="bg-gray-50 py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Track Your Academic Journey{" "}
        <span className="text-green-500">In Real-Time</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Monitor your progress, validate achievements, and build your portfolio
        with an intuitive dashboard designed for student success.
      </p>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold mb-4">Academic Progress Overview</h3>
          <p className="text-sm">Certifications <span className="font-bold">12/15</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-blue-500 h-2 rounded-full w-[80%]"></div>
          </div>
          <p className="text-sm">Conferences <span className="font-bold">8/10</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-green-500 h-2 rounded-full w-[80%]"></div>
          </div>
          <p className="text-sm">Projects <span className="font-bold">15/20</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-[75%]"></div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="text-blue-600 text-4xl mb-3">⭐</div>
          <h3 className="font-semibold text-lg">Portfolio Score</h3>
          <p className="text-3xl font-bold text-blue-600">87%</p>
          <p className="text-gray-500 text-sm">Above average performance</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold mb-4">Upcoming Events</h3>
          <div className="bg-gray-100 p-3 rounded mb-2">
            <p className="font-medium">AI Workshop</p>
            <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-medium">Career Fair</p>
            <p className="text-sm text-gray-500">Next Week</p>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            🏅 Recent Achievements
          </h3>
          <ul className="space-y-3">
            {achievements.map((a, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    a.status === "Verified"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Achievement */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
          <h3 className="font-semibold mb-4">Add New Achievement</h3>
          <input
            type="text"
            placeholder="Enter achievement..."
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            className="border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addAchievement}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-lg shadow hover:opacity-90"
          >
            Add Achievement
          </button>
        </div>
      </div>
    </section>
  );
}
