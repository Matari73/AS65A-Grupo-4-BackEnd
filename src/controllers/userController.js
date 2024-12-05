const Usuario = require('../models/Usuario');

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

exports.getUsuarioByName = async (req, res) => {
  const { nome } = req.params;

  try {
    const usuario = await Usuario.findOne({ where: { nome } });
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

exports.deleteUsuarioByName = async (req, res) => {
    const { nome } = req.params;
  
    try {
      const usuario = await Usuario.findOne({ where: { nome } });
      if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });
  
      await usuario.destroy();
      res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };