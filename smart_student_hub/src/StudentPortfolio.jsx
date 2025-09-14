
import React, { useState, useEffect } from "react";
import { auth, storage, rtdb } from "./firebase"; 
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push, set, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default function StudentPortfolio() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [achievements, setAchievements] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [progress, setProgress] = useState(0);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(null);
      if (currentUser) loadAchievements(currentUser.uid);
    });
    return () => unsubscribe();
  }, []);

  
  const loadAchievements = (uid) => {
    const userRef = dbRef(rtdb, `portfolios/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setAchievements(list.reverse()); 
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !file) {
      alert("All fields are required!");
      return;
    }

    setUploading(true);
    setProgress(0);

    
    const sRef = storageRef(storage, `certificates/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(sRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(prog));
      },
      (error) => {
        console.error("Upload error:", error);
        alert("Upload failed!");
        setUploading(null);
      },
      async () => {
        
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        
        const newRef = push(dbRef(rtdb, `portfolios/${user.uid}`));
        await set(newRef, {
          title,
          description,
          date,
          fileUrl: downloadURL,
        });

        
        setTitle("");
        setDescription("");
        setDate("");
        setFile(null);
        setUploading(null);
        setProgress(0);
      }
    );
  };

  if (loadingUser) return <p>Loading user...</p>;
  if (!user) return <p>Please log in to view your portfolio.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dynamic Student Dashboard</h2>

      
      <form onSubmit={handleUpload} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full rounded"
        />
        {uploading && <p>Uploading: {progress}%</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Certificate"}
        </button>
      </form>

      
      {achievements.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <ul>
          {achievements.map((ach) => (
            <li key={ach.id} className="mb-2 border p-2 rounded shadow">
              <p><strong>Title:</strong> {ach.title}</p>
              <p><strong>Date:</strong> {ach.date}</p>
              <p><strong>Description:</strong> {ach.description}</p>
              {ach.fileUrl && (
                <a
                  href={ach.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Certificate
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
