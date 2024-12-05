const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign({ id_usuario: user.id_usuario, tipo_acesso: user.tipo_acesso }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

exports.register = async (req, res) => {
  const { nome, senha, tipo_acesso } = req.body;

  try {
    const existingAdminMaster = await Usuario.findOne({ where: { tipo_acesso: 'admin_master' } });

    if (tipo_acesso === 'admin_master' && !existingAdminMaster) {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const user = await Usuario.create({
        nome,
        senha: hashedPassword,
        tipo_acesso,
      });
      return res.status(201).json({ message: 'Admin_master criado com sucesso.', user });
    }

    if (tipo_acesso === 'admin' && req.user.tipo_acesso !== 'admin_master') {
      return res.status(403).json({ message: 'Somente um admin_master pode criar novos usuários.' });
    }
    
    const existingUser = await Usuario.findOne({ where: { nome } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    if (tipo_acesso === 'admin_master') {
      const existingAdminMaster = await Usuario.findOne({ where: { tipo_acesso: 'admin_master' } });
      if (existingAdminMaster) {
        return res.status(400).json({ message: 'Já existe um admin_master. Apenas um é permitido.' });
      }
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = await Usuario.create({
      nome,
      senha: hashedPassword,
      tipo_acesso,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

exports.login = async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const user = await Usuario.findOne({ where: { nome } });
    if (!user) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

exports.changePassword = async (req, res) => {
  const { senhaAtual, novaSenha } = req.body;

  try {
    const user = await Usuario.findByPk(req.user.id_usuario);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(senhaAtual, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha atual incorreta.' });
    }

    const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
    user.senha = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao alterar senha.' });
  }
};