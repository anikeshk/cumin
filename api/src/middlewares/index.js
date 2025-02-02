const corsMiddleware = require('./cors.middleware');
const notFoundMiddleware = require('./notfound.middleware');
const authMiddleware = require('./auth.middleware');

module.exports = { corsMiddleware, notFoundMiddleware, authMiddleware };
