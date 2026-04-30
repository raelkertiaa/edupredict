const express = require("express");
const router = express.Router();
const {
  login,
  getMe,
  updateProfile,
  logout,
} = require("../controllers/authController");
const { verifyToken, guruOnly } = require("../middleware/auth");

// public routes
router.post("/login", login);

// protected routes
router.get("/me", verifyToken, guruOnly, getMe);
router.put("/profile", verifyToken, guruOnly, updateProfile);
router.post("/logout", verifyToken, logout);

module.exports = router;
