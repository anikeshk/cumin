const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const secret = req.headers['x-internal-secret'];

    if (secret) {
      if (secret !== process.env.INTERNAL_SECRET) {
        return res.status(403).json({ message: 'Forbidden: Invalid internal secret' });
      }
      next();
    } else {
      const token = req.cookies.accessToken;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No access token provided' });
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        }

        req.user = user;
        next();
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = authMiddleware;
