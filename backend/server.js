const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running successfully",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      student: "/api/student",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred. Please try again later.",
  });
});

// Run Server
app.listen(PORT, () => {
  console.log(`Server nyala dan jalan di http://localhost:${PORT}`);
});
