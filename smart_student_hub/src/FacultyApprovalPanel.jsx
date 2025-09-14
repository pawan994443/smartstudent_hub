// FacultyApprovalPanel.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  orderBy
} from "firebase/firestore";

export default function FacultyApprovalPanel() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all student records
  const fetchRecords = async () => {
    setLoading(true);
    try {
      // Assuming 'students' collection and each student has 'records' subcollection
      const studentsSnapshot = await getDocs(collection(db, "students"));
      let allRecords = [];

      for (let studentDoc of studentsSnapshot.docs) {
        const studentId = studentDoc.id;
        const recordsRef = collection(db, "students", studentId, "records");
        const q = query(recordsRef, orderBy("timestamp", "desc"));
        const recordsSnapshot = await getDocs(q);

        recordsSnapshot.forEach((recDoc) => {
          allRecords.push({
            id: recDoc.id,
            studentId,
            ...recDoc.data(),
          });
        });
      }

      setRecords(allRecords);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching records:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Approve or reject a record
  const updateStatus = async (studentId, recordId, status) => {
    try {
      const recordRef = doc(db, "students", studentId, "records", recordId);
      await updateDoc(recordRef, { status });
      setRecords((prev) =>
        prev.map((rec) =>
          rec.id === recordId ? { ...rec, status } : rec
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <p>Loading records...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Faculty Approval Panel
      </h2>

      {records.length === 0 ? (
        <p className="text-gray-500">No records to review.</p>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="border rounded p-4 bg-gray-50 flex flex-col space-y-2"
            >
              <p>
                <strong>Student ID:</strong> {rec.studentId}
              </p>
              <p>
                <strong>Type:</strong> {rec.type}
              </p>
              <p>
                <strong>Date:</strong> {rec.date}
              </p>
              <p>
                <strong>Details:</strong> {rec.details}
              </p>
              {rec.fileURL && (
                <p>
                  <strong>File:</strong>{" "}
                  <a
                    href={rec.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View / Download
                  </a>
                </p>
              )}
              <p>
                <strong>Status:</strong>{" "}
                {rec.status ? rec.status : "Pending"}
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => updateStatus(rec.studentId, rec.id, "Approved")}
                  disabled={rec.status === "Approved"}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => updateStatus(rec.studentId, rec.id, "Rejected")}
                  disabled={rec.status === "Rejected"}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
