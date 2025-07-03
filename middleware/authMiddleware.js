const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    console.log("No Authorization header found.");
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  console.log("Split parts:", parts);

  if (parts.length !== 2) {
    console.log("Token format error. Parts length not 2.");
    return res.status(401).json({ error: 'Token format is invalid' });
  }

  const scheme = parts[0];
  const token = parts[1];
  console.log("Scheme:", scheme);
  console.log("Token:", token);

  if (!/^Bearer$/i.test(scheme)) {
    console.log("Scheme is not Bearer.");
    return res.status(401).json({ error: 'Token format is invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification error:", err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};