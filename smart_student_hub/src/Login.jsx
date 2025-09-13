import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Login({ onBack }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrPhone: form.emailOrPhone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      alert("Thank you for logging in ✨");
      navigate("/student-dashboard", { state: { user: data.user } });
    } catch (err) {
      console.error("Login Error:", err.message);
      alert("Login failed");
    }
  };

  const handleSignUp = () => {
    alert("Signup flow not implemented yet");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Login
        </h2>

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
