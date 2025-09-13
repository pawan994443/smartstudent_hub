import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Login({ onBack }) {
  const [form, setForm] = useState({
    username: "",
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Signup API call
  const handleSignUp = async () => {
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  // 🔹 Login API call
  const handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert("Login successful");
        console.log("User Data:", data.user);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registation Form
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone"
            value={form.emailOrPhone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="w-full border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
