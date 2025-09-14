import React, { useEffect, useState } from "react";
import { db } from "./firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsReporting() {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudentData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const studentCountsByYear = studentData.reduce((acc, student) => {
    const year = student.year || "Unknown";
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(studentCountsByYear),
    datasets: [
      {
        label: "Number of Students",
        data: Object.values(studentCountsByYear),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  if (loading) return <p className="text-center mt-10">Loading analytics...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Analytics & Reporting
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Generate reports for NAAC, AICTE, NIRF accreditation or internal evaluations.
      </p>

      <div className="mt-6">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
      </div>
    </div>
  );
}
