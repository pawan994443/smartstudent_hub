import React, { useState } from "react";

export default function ActivityTracker() {
  const recordTypes = [
    "Attendance",
    "Grades",
    "Certifications",
    "Internships",
    "Other Achievements",
  ];

  const initialRecordState = {
    date: "",
    details: "",
    file: null, 
  };

  const [currentTab, setCurrentTab] = useState(recordTypes[0]);
  const [formData, setFormData] = useState(initialRecordState);
  const [records, setRecords] = useState({
    Attendance: [],
    Grades: [],
    Certifications: [],
    Internships: [],
    "Other Achievements": [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateFile = (file) => {
    if (!file) return true; 
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    return allowedTypes.includes(file.type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.details) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateFile(formData.file)) {
      alert("Invalid file type. Only PDF, PNG, and JPG are allowed.");
      return;
    }

    setRecords({
      ...records,
      [currentTab]: [...records[currentTab], formData],
    });

    setFormData(initialRecordState);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Academic Tracker
      </h2>

      
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {recordTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded ${
              currentTab === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setCurrentTab(type)}
          >
            {type}
          </button>
        ))}
      </div>

      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder={`Enter ${currentTab} details`}
          className="border p-2 rounded"
          rows={3}
          required
        />

        
        {(currentTab === "Certifications" ||
          currentTab === "Internships" ||
          currentTab === "Other Achievements") && (
          <input
            type="file"
            name="file"
            onChange={handleChange}
            accept=".pdf,.png,.jpg,.jpeg"
            className="border p-2 rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add {currentTab}
        </button>
      </form>

      
      <h3 className="text-xl font-semibold mb-3">{currentTab} Records</h3>
      {records[currentTab].length === 0 ? (
        <p className="text-gray-500">No {currentTab.toLowerCase()} added yet.</p>
      ) : (
        <div className="space-y-4">
          {records[currentTab].map((rec, index) => (
            <div
              key={index}
              className="border rounded p-4 bg-gray-50 flex flex-col space-y-1"
            >
              <p>
                <strong>Date:</strong> {rec.date}
              </p>
              <p>
                <strong>Details:</strong> {rec.details}
              </p>
              {rec.file && (
                <p>
                  <strong>File:</strong>{" "}
                  <a
                    href={URL.createObjectURL(rec.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View / Download
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
