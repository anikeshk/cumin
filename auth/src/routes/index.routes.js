const { Router } = require('express');

const AuthController = require('../controllers/auth.controller');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok from auth server' });
});

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logoutUser);

module.exports = { router };
