import React, { useState } from "react";

export default function IntegrationSupport() {
  const [connections, setConnections] = useState([
    { name: "LMS Platform", status: "Connected" },
    { name: "ERP System", status: "Pending" },
    { name: "Digital University Platform", status: "Not Connected" },
  ]);

  const handleConnect = (index) => {
    const updatedConnections = [...connections];
    updatedConnections[index].status = "Connected";
    setConnections(updatedConnections);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Integration Support
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Seamlessly connect with LMS, ERP systems, and digital university platforms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map((conn, index) => (
          <div
            key={index}
            className="border rounded p-4 flex justify-between items-center bg-gray-50"
          >
            <div>
              <h3 className="font-semibold">{conn.name}</h3>
              <p className={`mt-1 ${conn.status === "Connected" ? "text-green-600" : conn.status === "Pending" ? "text-yellow-600" : "text-red-600"}`}>
                Status: {conn.status}
              </p>
            </div>
            {conn.status !== "Connected" && (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => handleConnect(index)}
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
