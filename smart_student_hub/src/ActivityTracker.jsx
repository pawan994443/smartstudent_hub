import React, { useState } from "react";

export default function ActivityTracker() {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "Seminar",
    organizer: "",
    date: "",
    description: "",
    certificate: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const inputValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const validateFile = (file) => {
    if (!file) return false;
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    return allowedTypes.includes(file.type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.organizer || !formData.date || !formData.certificate) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateFile(formData.certificate)) {
      alert("Invalid file type. Only PDF, PNG, and JPG are allowed.");
      return;
    }

    setActivities([...activities, formData]);
    setFormData({
      title: "",
      type: "Seminar",
      organizer: "",
      date: "",
      description: "",
      certificate: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center"> Activity Tracker</h2>

      {/* === Form === */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Activity Title (e.g. AI Workshop)"
          className="border p-2 rounded"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Seminar</option>
          <option>Conference</option>
          <option>MOOC</option>
          <option>Internship</option>
          <option>Workshop</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          name="organizer"
          value={formData.organizer}
          onChange={handleChange}
          placeholder="Organizer Name"
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief Description"
          className="border p-2 rounded"
          rows={3}
        />

        <input
          type="file"
          name="certificate"
          onChange={handleChange}
          accept=".pdf,.png,.jpg,.jpeg"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ➕ Add Activity
        </button>
      </form>

      {/* === Activity List === */}
      <h3 className="text-xl font-semibold mb-3">📝 Tracked Activities</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500">No activities added yet.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="border rounded p-4 bg-gray-50">
              <p><strong>Title:</strong> {activity.title}</p>
              <p><strong>Type:</strong> {activity.type}</p>
              <p><strong>Organizer:</strong> {activity.organizer}</p>
              <p><strong>Date:</strong> {activity.date}</p>
              <p><strong>Description:</strong> {activity.description || "N/A"}</p>
              <p>
                <strong>Certificate:</strong>{" "}
                <a
                  href={URL.createObjectURL(activity.certificate)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View / Download
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
