const jwt = require('jsonwebtoken');

function authenticateToken(request, response, next) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(403).json({ message: "Unauthorized access" });
  }

  jwt.verify(token, "secret", (error) => {
    if (error) {
      return response.status(403).json({ message: "Unauthorized access" });
    }
    next(); // Move `next` inside the verification callback
  });
}

module.exports = authenticateToken;