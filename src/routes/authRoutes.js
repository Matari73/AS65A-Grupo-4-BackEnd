const express = require('express');
const { register, login } = require('../controllers/authController');
const { authMiddleware, adminMasterOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authMiddleware, adminMasterOnly, register);
router.post('/login', login);

module.exports = router;
