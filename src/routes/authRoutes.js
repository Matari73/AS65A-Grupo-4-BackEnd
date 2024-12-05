const express = require('express');
const { register, login, changePassword } = require('../controllers/authController');
const { authMiddleware, logoff } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authMiddleware, register);
router.post('/login', login);
router.post('/logoff', authMiddleware, logoff);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;