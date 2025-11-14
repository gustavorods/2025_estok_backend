// middlewares/jwtAuth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function requireJwt(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // payload may contain: { sub, email, role, typ, iat, exp }
    req.user = { id: payload.sub, email: payload.email, role: payload.role, type: payload.typ };
    return next();
  } catch (err) {
    // Differentiate expiration dates if you want distinct messages
    if (err.name === 'TokenExpiredError') return res.status(401).json({ message: 'Token expired' });
    return res.status(401).json({ message: 'Invalid token' });
  }
};
