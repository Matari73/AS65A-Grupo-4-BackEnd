const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');

async function criarSeed() {
  try {
    console.log('Iniciando seed de usuários...');
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
    }

    console.log('Iniciando seed de produtos...');
    const produtosSeed = [
      { nome: 'Absorvente', categoria: 'não reutilizável' },
      { nome: 'Absorvente noturno', categoria: 'não reutilizável' },
      { nome: 'Protetor diário', categoria: 'não reutilizável' },
      { nome: 'Coletor menstrual', categoria: 'reutilizável' },
      { nome: 'Calcinhas absorventes', categoria: 'reutilizável' },
      { nome: 'Absorvente de pano', categoria: 'reutilizável' }
    ];

    for (const produto of produtosSeed) {
      const produtoExistente = await Produto.findOne({ where: { nome: produto.nome } });
      if (!produtoExistente) {
        await Produto.create(produto);
        console.log(`Produto "${produto.nome}" criado com sucesso.`);
      } else {
        console.log(`Produto "${produto.nome}" já existe.`);
      }
    }

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
  }
}

module.exports = criarSeed;
