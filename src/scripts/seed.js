const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

async function criarAdmins() {
  try {
    const adminMasterExistente = await Usuario.findOne({ where: { tipo_acesso: 'admin_master' } });

    if (!adminMasterExistente) {
      const senhaHashMaster = await bcrypt.hash('sua_senha_segura_master', 10);
      await Usuario.create({
        nome: 'admin_master',
        senha: senhaHashMaster,
        tipo_acesso: 'admin_master'
      });
      console.log('Admin master criado com sucesso.');
    } else {
      console.log('Admin master já existe.');
    }

    const admins = [];
    for (let i = 1; i <= 5; i++) {
      const nomeAdmin = `admin_${i}`;
      const usuarioExistente = await Usuario.findOne({ where: { nome: nomeAdmin } });

      if (!usuarioExistente) {
        const senhaHash = await bcrypt.hash(`senha_admin_${i}`, 10);
        admins.push({
          nome: nomeAdmin,
          senha: senhaHash,
          tipo_acesso: 'admin'
        });
      } else {
        console.log(`Usuário ${nomeAdmin} já existe.`);
      }
    }

    if (admins.length > 0) {
      await Usuario.bulkCreate(admins);
      console.log('Admins criados com sucesso:', admins.map(admin => admin.nome));
    } else {
      console.log('Nenhum novo admin foi criado.');
    }
  } catch (error) {
    console.error('Erro ao criar os admins:', error);
  }
}

module.exports = criarAdmins;
