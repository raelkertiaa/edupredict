// JWT Token Verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user.id, email: user.email }
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// teachers only middleware
const guruOnly = (req, res, next) => {
  if (req.user.role !== "guru") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only teachers can access this resource.",
    });
  }
  next();
};

module.exports = {
  verifyToken,
  guruOnly,
};
