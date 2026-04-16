const jwt = require('jsonwebtoken');
const private_key = require('./private_key');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  console.log("Received token:", token);

  if (!token) {
    const message = 'You are not authenticated. Please log in.';
    return res.status(401).json({ message });
  }
  jwt.verify(token, private_key, (err, decoded) => {
    if (err) {
      const message = 'Invalid token. Please log in again.';
      return res.status(401).json({ message });
    }
    const userId = decoded.id;

    if(req.body?.userId && req.body.userId !== userId) {
      const message = 'User ID in token does not match user ID in request body.';
      return res.status(401).json({ message });
    } else {
      next();
    }
  });
};

module.exports = authMiddleware;