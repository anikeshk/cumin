const cors = require("cors");

const corsMiddleware = cors({
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
});

module.exports = { corsMiddleware };
