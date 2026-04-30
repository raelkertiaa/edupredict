const express = require("express");
const router = express.Router();
const { checkNISN } = require("../controllers/studentController");

// public route
router.post("/check", checkNISN);

module.exports = router;
