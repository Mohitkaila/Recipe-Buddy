const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Remove "Bearer " from token and verify it
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};
