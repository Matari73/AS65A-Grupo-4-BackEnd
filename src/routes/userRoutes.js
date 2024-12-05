const express = require('express');
const { authMiddleware, adminMasterOnly } = require('../middlewares/authMiddleware');
const { getAllUsuarios, getUsuarioByName, deleteUsuarioByName } = require('../controllers/userController');

const router = express.Router();

router.get('/', authMiddleware, getAllUsuarios);
router.get('/:nome', authMiddleware, getUsuarioByName);
router.delete('/:nome', authMiddleware, adminMasterOnly, deleteUsuarioByName);

module.exports = router;
