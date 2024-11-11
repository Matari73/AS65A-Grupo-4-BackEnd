const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Usuario = require('../models/user');

const login = async (req, res) => {
  const { nome_usuario, senha } = req.body;

  try {
    // Buscando o usuário no banco de dados
    const usuario = await Usuario.findOne({ where: { nome_usuario } });
    if (!usuario) {
      console.log('Usuário não encontrado');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    console.log('Senha fornecida:', senha);
    console.log('Hash da senha:', usuario.senha);

    // Comparando a senha fornecida com o hash armazenado
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      console.log('Senha inválida');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerando o token JWT
    const token = jwt.sign(
      { id: usuario.id_usuario, tipo_acesso: usuario.tipo_acesso },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login bem-sucedido');
    return res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no login' });
  }
};


module.exports = { login };