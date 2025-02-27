const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const rds = require('../db/rds');

const UserController = {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await rds.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
        name,
        email,
        hashedPassword,
      ]);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { rows } = await rds.query('SELECT * FROM users WHERE email = $1', [email]);
      if (rows.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const user = rows[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const accessToken = jwt.sign(
        { user_id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
      const refreshToken = jwt.sign(
        { user_id: user.id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );

      await rds.query('INSERT INTO tokens (user_id, token) VALUES ($1, $2)', [
        user.id,
        refreshToken,
      ]);

      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ message: 'Login successful', data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { rows } = await rds.query('SELECT * FROM tokens WHERE token = $1', [refreshToken]);
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }

        const accessToken = jwt.sign(
          { user_id: user.user_id, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );

        res
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
          })
          .json({ message: 'Refresh successful' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async logoutUser(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await rds.query('DELETE FROM tokens WHERE token = $1', [refreshToken]);
      res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;
