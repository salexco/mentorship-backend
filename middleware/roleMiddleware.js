/**
 * Middleware to restrict access to specific user roles.
 * @param {Array} roles - Allowed roles, e.g. ['admin', 'mentor']
 */
module.exports = (roles) => {
  return (req, res, next) => {
    // Check if user's role exists in allowed roles array
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: You do not have the required role' });
    }
    next();
  };
};
