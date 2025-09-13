const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connect — Clean & Updated
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// 🔹 Route for testing
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// 🔹 POST Route for saving data
const User = require("./models/User");

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({ message: "User saved", user: newUser });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
