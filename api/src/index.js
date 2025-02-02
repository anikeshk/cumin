const express = require('express');
const cookieParser = require('cookie-parser');

const { corsMiddleware, notFoundMiddleware, authMiddleware } = require('./middlewares/index');
const { router } = require('./routes/index.routes');

const app = express();

app.use(express.json(), express.urlencoded({ extended: true }), cookieParser(), corsMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok from API server' });
});

app.use(authMiddleware);
app.use(router);
app.use(notFoundMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`API server running on port ${process.env.SERVER_PORT}`);
});
