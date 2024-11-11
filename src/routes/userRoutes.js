const express = require('express');
const { login } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const Usuario = require('../models/user');
const bcrypt = require('bcrypt');

// Rota para criar o admin master
router.post('/createAdminMaster', async (req, res) => {
  const { nome_usuario, senha } = req.body;
  try {
    // Verificar se já existe um admin master
    const existingAdminMaster = await Usuario.findOne({ where: { tipo_acesso: 'admin_master' } });

    if (existingAdminMaster) {
      return res.status(403).json({ error: 'Admin master já existe.' });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Criar o novo admin master
    await Usuario.create({
      nome_usuario,
      senha: hashedPassword,
      tipo_acesso: 'admin_master',
    });

    return res.status(201).json({ message: 'Admin master criado com sucesso.' });
  } catch (error) {
    console.error('Erro ao criar admin master:', error);
    res.status(500).json({ error: 'Erro ao criar admin master.' });
  }
});

router.post('/login', login);
router.post('/admin', authMiddleware('admin_master'), async (req, res) => {
  // Cadastro de novos admins
});

module.exports = router;