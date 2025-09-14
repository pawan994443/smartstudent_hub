import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase"; 
import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null); 
  const [achievements, setAchievements] = useState([]);
  const [events, setEvents] = useState([]);
  const [newAchievement, setNewAchievement] = useState("");

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "Student",
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const q = query(collection(db, "achievements"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedAchievements = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAchievements(updatedAchievements);
    });
    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(updatedEvents);
    });
    return () => unsubscribe();
  }, []);

  
  const addAchievement = async () => {
    if (!newAchievement.trim() || !user) return;
    await addDoc(collection(db, "achievements"), {
      title: newAchievement,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      userId: user.uid, 
    });
    setNewAchievement("");
  };

 
  const totalAchievements = achievements.length;
  const verifiedCount = achievements.filter((a) => a.status === "Verified").length;
  const progressPercent = totalAchievements
    ? Math.round((verifiedCount / totalAchievements) * 100)
    : 0;

  return (
    <section id="dashboard" className="bg-gray-50 py-12 px-6 md:px-16">
     
      <div className="text-center mb-6">
        {user ? (
          <h2 className="text-2xl font-bold">
            👋 Welcome, <span className="text-blue-600">{user.displayName}</span>
          </h2>
        ) : (
          <h2 className="text-2xl font-bold">Please log in to view your Dashboard</h2>
        )}
        {user && <p className="text-gray-500">{user.email}</p>}
      </div>

      
      {user && (
        <>
          <h2 className="text-3xl font-bold text-center mb-8">
            Track Your Academic Journey <span className="text-green-500">In Real-Time</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Monitor your progress, validate achievements, and build your portfolio
            with an intuitive dashboard designed for student success.
          </p>

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="font-semibold mb-4">Academic Progress Overview</h3>
              <p className="text-sm">
                Verified Achievements{" "}
                <span className="font-bold">{verifiedCount}/{totalAchievements}</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-sm">
                Portfolio Score <span className="font-bold">{progressPercent}%</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
              <div className="text-blue-600 text-4xl mb-3">⭐⭐⭐</div>
              <h3 className="font-semibold text-lg">Portfolio Score</h3>
              <p className="text-3xl font-bold text-blue-600">{progressPercent}%</p>
              <p className="text-gray-500 text-sm">Above average performance</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="font-semibold mb-4">Upcoming Events</h3>
              {events.length === 0 ? (
                <p className="text-gray-500">No upcoming events.</p>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="bg-gray-100 p-3 rounded mb-2">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center">🏅 Recent Achievements</h3>
              <ul className="space-y-3">
                {achievements.map((a) => (
                  <li key={a.id} className="flex justify-between items-center border-b pb-2">
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
        </>
      )}
    </section>
  );
}
