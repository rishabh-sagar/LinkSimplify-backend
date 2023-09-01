// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decodedToken = jwt.verify(token, config.secret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
