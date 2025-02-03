const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

const query = (text, params) => pool.query(text, params);

module.exports = { query };
