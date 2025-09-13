import React, { useState } from "react";

export default function StudentPortfolio() {
  const [portfolio, setPortfolio] = useState({
    photo: null,
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    dob: "2002-05-20",
    academic: [],
    nonAcademic: [],
  });

  const [formData, setFormData] = useState(portfolio);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    if (isEditing) setPortfolio(formData);
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleAcademicChange = (index, e) => {
    const updated = [...formData.academic];
    updated[index][e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, academic: updated });
  };

  const handleNonAcademicChange = (index, e) => {
    const updated = [...formData.nonAcademic];
    updated[index][e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, nonAcademic: updated });
  };

  const addAcademic = () => {
    setFormData({
      ...formData,
      academic: [
        ...formData.academic,
        {
          course: "",
          institution: "",
          year: "",
          grade: "",
          details: "",
          certificate: null,
        },
      ],
    });
  };

  const addNonAcademic = () => {
    setFormData({
      ...formData,
      nonAcademic: [
        ...formData.nonAcademic,
        {
          activity: "",
          organization: "",
          year: "",
          achievements: "",
          certificate: null,
        },
      ],
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🎓 Student Portfolio</h1>

      <button
        onClick={toggleEdit}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {isEditing ? "💾 Save Profile" : "✏️ Edit Profile"}
      </button>

      {/* === Profile Photo + Basic Info === */}
      <section className="mb-10 border p-4 rounded-md flex items-center gap-6">
        <div>
          {isEditing ? (
            <>
              {formData.photo && (
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Student"
                  className="w-28 h-28 object-cover rounded-full mb-2"
                />
              )}
              <input type="file" name="photo" onChange={handleChange} />
            </>
          ) : (
            <img
              src={
                portfolio.photo
                  ? URL.createObjectURL(portfolio.photo)
                  : "https://via.placeholder.com/100"
              }
              alt="Student"
              className="w-28 h-28 object-cover rounded-full"
            />
          )}
        </div>

        <div className="flex-1">
          {isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-2 border rounded w-full"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-2 border rounded w-full"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {portfolio.name}</p>
              <p><strong>Email:</strong> {portfolio.email}</p>
              <p><strong>Phone:</strong> {portfolio.phone}</p>
              <p><strong>DOB:</strong> {portfolio.dob}</p>
            </div>
          )}
        </div>
      </section>

      {/* === Academic Section === */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Academic Achievements
        </h2>

        {isEditing && (
          <button
            onClick={addAcademic}
            className="mb-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Add Academic Achievement
          </button>
        )}

        {isEditing
          ? formData.academic.map((entry, idx) => (
              <div key={idx} className="mb-6 border p-4 rounded-md">
                <input
                  name="course"
                  value={entry.course}
                  onChange={(e) => handleAcademicChange(idx, e)}
                  placeholder="Course"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  name="institution"
                  value={entry.institution}
                  onChange={(e) => handleAcademicChange(idx, e)}
                  placeholder="Institution"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  name="year"
                  value={entry.year}
                  onChange={(e) => handleAcademicChange(idx, e)}
                  placeholder="Year"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  name="grade"
                  value={entry.grade}
                  onChange={(e) => handleAcademicChange(idx, e)}
                  placeholder="Grade"
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  name="details"
                  value={entry.details}
                  onChange={(e) => handleAcademicChange(idx, e)}
                  placeholder="Details"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="file"
                  name="certificate"
                  onChange={(e) => handleAcademicChange(idx, e)}
                  className="mb-2"
                />
                {entry.certificate && (
                  <p className="text-sm text-gray-500">📎 {entry.certificate.name}</p>
                )}
              </div>
            ))
          : portfolio.academic.map((entry, idx) => (
              <div key={idx} className="mb-6 p-4 rounded-md bg-gray-50">
                <p><strong>Course:</strong> {entry.course}</p>
                <p><strong>Institution:</strong> {entry.institution}</p>
                <p><strong>Year:</strong> {entry.year}</p>
                <p><strong>Grade:</strong> {entry.grade}</p>
                <p><strong>Details:</strong> {entry.details}</p>
                {entry.certificate && (
                  <p className="text-sm text-blue-500">📄 {entry.certificate.name}</p>
                )}
              </div>
            ))}
      </section>

      {/* === Non-Academic Section === */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Non-Academic Activities
        </h2>

        {isEditing && (
          <button
            onClick={addNonAcademic}
            className="mb-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Add Non-Academic Activity
          </button>
        )}

        {isEditing
          ? formData.nonAcademic.map((entry, idx) => (
              <div key={idx} className="mb-6 border p-4 rounded-md">
                <input
                  name="activity"
                  value={entry.activity}
                  onChange={(e) => handleNonAcademicChange(idx, e)}
                  placeholder="Activity"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  name="organization"
                  value={entry.organization}
                  onChange={(e) => handleNonAcademicChange(idx, e)}
                  placeholder="Organization"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  name="year"
                  value={entry.year}
                  onChange={(e) => handleNonAcademicChange(idx, e)}
                  placeholder="Year"
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  name="achievements"
                  value={entry.achievements}
                  onChange={(e) => handleNonAcademicChange(idx, e)}
                  placeholder="Achievements"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="file"
                  name="certificate"
                  onChange={(e) => handleNonAcademicChange(idx, e)}
                  className="mb-2"
                />
                {entry.certificate && (
                  <p className="text-sm text-gray-500">📎 {entry.certificate.name}</p>
                )}
              </div>
            ))
          : portfolio.nonAcademic.map((entry, idx) => (
              <div key={idx} className="mb-6 p-4 rounded-md bg-gray-50">
                <p><strong>Activity:</strong> {entry.activity}</p>
                <p><strong>Organization:</strong> {entry.organization}</p>
                <p><strong>Year:</strong> {entry.year}</p>
                <p><strong>Achievements:</strong> {entry.achievements}</p>
                {entry.certificate && (
                  <p className="text-sm text-blue-500">📄 {entry.certificate.name}</p>
                )}
              </div>
            ))}
      </section>
    </div>
  );
}
