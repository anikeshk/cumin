const notFoundMiddleware = (_, res) => {
  res.status(404).json({ message: 'Not Found', status: 404 });
};

module.exports = notFoundMiddleware;
