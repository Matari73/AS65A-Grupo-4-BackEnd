const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

async function criarAdminMaster() {
  try {
    const usuarioExistente = await Usuario.findOne({ where: { tipo_acesso: 'admin_master' } });
    
    if (!usuarioExistente) {
      const senhaHash = await bcrypt.hash('sua_senha_segura', 10);
      await Usuario.create({
        nome_usuario: 'admin_master',
        senha: senhaHash,
        tipo_acesso: 'admin_master'
      });
      console.log('Admin master criado com sucesso.');
    } else {
      console.log('Admin master já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar o admin master:', error);
  }
}

module.exports = criarAdminMaster;
