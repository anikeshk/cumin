const express = require("express");

const { corsMiddleware, notFoundMiddleware } = require("./middlewares/index");
const { router } = require("./routes/index.routes");

const app = express();

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  corsMiddleware,
  router,
  notFoundMiddleware
);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
