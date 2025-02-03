const express = require('express');
const { createServer } = require('http');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const { corsMiddleware, notFoundMiddleware } = require('./middlewares/index');
const {
  addSocketConnection,
  removeSocketConnection,
  getSocketConnections,
} = require('./lib/connection.lib');
const { pollSQS } = require('./lib/poll.lib');

const app = express();

// If a request is an HTTP request (e.g., GET /api/tasks), Express will process it through the middleware stack.
// If a request is a WebSocket connection, socket.io will handle it through io.on('connection', ...), bypassing Express middleware.
app.use(express.json(), express.urlencoded({ extended: true }), corsMiddleware, notFoundMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok from sockets server' });
});

const httpServer = createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer, {
  cors: {
    origin: process.env.APP_URL,
    credentials: true,
  },
});

io.use((socket, next) => {
  const cookieHeader = socket.request.headers.cookie;
  if (!cookieHeader) {
    return next(new Error('Authentication error'));
  }
  const cookies = cookie.parse(cookieHeader);
  const token = cookies.accessToken;

  if (!token) {
    return next(new Error('Authentication error: Token missing'));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(new Error('Authentication error: Invalid token'));
    }
    socket.request.user = user;
    next();
  });
});

io.on('connection', async (socket) => {
  const userId = socket.request.user.user_id;
  const socketId = socket.id;
  //await addSocketConnection(userId, socketId);
  console.log(`user ${userId} connected on socket ${socketId}`);
  io.emit('user connected', { userId: 'x' });
});

pollSQS(io);

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`sockets server running on port ${process.env.SERVER_PORT}`);
});
