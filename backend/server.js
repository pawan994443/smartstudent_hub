// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Dummy user for demo
const dummyUser = {
  username: "pawan@72",
  emailOrPhone: "pawankumarbxr2019@gmail.com",
  password: "123456",
};

// Sign Up route (just respond for now)
app.post("/signup", (req, res) => {
  const { username, emailOrPhone, password } = req.body;
  if (!username || !emailOrPhone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log("New User:", req.body);
  res.json({ message: "Signup successful" });
});

// Login route
app.post("/login", (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (
    emailOrPhone === dummyUser.emailOrPhone &&
    password === dummyUser.password
  ) {
    return res.json({
      user: {
        name: dummyUser.username,
        email: dummyUser.emailOrPhone,
      },
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
