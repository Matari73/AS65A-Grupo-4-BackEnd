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
    const existingUser = await Usuario.findOne({ where: { nome } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await Usuario.create({
      nome,
      senha: hashedPassword,
      tipo_acesso,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso.' });
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
