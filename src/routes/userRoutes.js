const express = require('express');
const { authMiddleware, adminMasterOnly } = require('../middlewares/authMiddleware');
const { getUsuarioByName, deleteUsuarioByName } = require('../controllers/userController');

const router = express.Router();

router.get('/:nome', authMiddleware, getUsuarioByName);
router.delete('/:nome', authMiddleware, adminMasterOnly, deleteUsuarioByName);

module.exports = router;
