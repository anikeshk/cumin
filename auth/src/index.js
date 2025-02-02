const express = require('express');
const cookieParser = require('cookie-parser');

const { corsMiddleware, notFoundMiddleware } = require('./middlewares/index');
const { router } = require('./routes/index.routes');

const app = express();

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
  corsMiddleware,
  router,
  notFoundMiddleware
);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`auth server running on port ${process.env.SERVER_PORT}`);
});
