import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    emailOrPhone: "",
    password: "",
  });

  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.emailOrPhone || !form.password || (mode === "register" && !form.username)) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (mode === "register") {
        
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.emailOrPhone,
          form.password
        );

        
        await updateProfile(userCredential.user, {
          displayName: form.username,
        });

        alert("Registration successful! You can now log in.");
        setMode("login");
        setForm({ username: "", emailOrPhone: "", password: "" });
      } else {
        
        const userCredential = await signInWithEmailAndPassword(
          auth,
          form.emailOrPhone,
          form.password
        );

        const userData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
        };

        alert(`Welcome back, ${userData.displayName || "Student"}!`);
        navigate("/", { state: { user: userData } }); 
      }
    } catch (err) {
      console.error(`${mode} Error:`, err);
      let errorMsg = "Something went wrong!";
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMsg = "Email already registered";
          break;
        case "auth/invalid-email":
          errorMsg = "Invalid email address";
          break;
        case "auth/user-not-found":
          errorMsg = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorMsg = "Incorrect password";
          break;
        case "auth/weak-password":
          errorMsg = "Password should be at least 6 characters";
          break;
        default:
          errorMsg = err.message;
      }
      alert(errorMsg);
    } finally {
      setLoading(false); 
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setForm({ username: "", emailOrPhone: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === "login" ? "Student Login" : "Student Registration"}
        </h2>

        <div className="space-y-4">
          {mode === "register" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
          <input
            type="email"
            name="emailOrPhone"
            placeholder="Email"
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
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full ${
              mode === "login" ? "bg-blue-600" : "bg-green-600"
            } text-white py-2 rounded-lg font-medium hover:opacity-90 transition`}
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Register"}
          </button>

          <button
            onClick={switchMode}
            className="w-full border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            {mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
