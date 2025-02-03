const rds = require('../db/rds');

const addSocketConnection = async (userId, socketId) => {
  await rds.query(
    'INSERT INTO socket_connections (user_id, socket_id) VALUES ($1, $2) RETURNING *',
    [userId, socketId]
  );
};

const removeSocketConnection = async (socketId) => {
  await rds.query('DELETE FROM socket_connections WHERE socket_id = $1', [socketId]);
};

const getSocketConnections = async (userId) => {
  const { rows } = await rds.query('SELECT * FROM socket_connections WHERE user_id = $1', [userId]);
  return rows;
};

module.exports = { addSocketConnection, removeSocketConnection, getSocketConnections };
