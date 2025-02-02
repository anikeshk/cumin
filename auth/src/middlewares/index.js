const { corsMiddleware } = require("./cors.middleware");
const { notFoundMiddleware } = require("./notfound.middleware");

module.exports = { corsMiddleware, notFoundMiddleware };
