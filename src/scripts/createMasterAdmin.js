const bcrypt = require('bcrypt');
const Usuario = require('../models/user');
const { sequelize } = require('../db/db');

const seedAdminMaster = async () => {
  try {
    await sequelize.sync();

    const existingAdminMaster = await Usuario.findOne({ where: { tipo_acesso: 'admin_master' } });
    
    if (existingAdminMaster) {
      console.log('Admin master encontrado. Removendo...');

      // Deleta o admin master existente
      await existingAdminMaster.destroy();
      console.log('Admin master removido com sucesso.');
    }

    // Cria um novo admin_master com a senha 'senha'
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('senha', salt); 

    // Insira manualmente no banco de dados:
    await Usuario.create({
      nome_usuario: 'adminMaster',
      senha: hashedPassword,
      tipo_acesso: 'admin_master',
    });

    console.log('Novo admin master criado com sucesso.');
  } catch (error) {
    console.error('Erro ao criar admin master:', error);
  }
};


module.exports = seedAdminMaster;
