const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');
const Participante = require('../models/Participante');
const MovimentacaoProduto = require('../models/MovimentacaoProduto');
const Estoque = require('../models/Estoque');

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
      { nome: 'Absorvente', categoria: 'não reutilizável', estoque: 0 },
      { nome: 'Absorvente noturno', categoria: 'não reutilizável', estoque: 0 },
      { nome: 'Protetor diário', categoria: 'não reutilizável', estoque: 0 },
      { nome: 'Coletor menstrual', categoria: 'reutilizável', estoque: 0 },
      { nome: 'Calcinhas absorventes', categoria: 'reutilizável', estoque: 0 },
      { nome: 'Absorvente de pano', categoria: 'reutilizável', estoque: 0 }
    ];

    for (const produto of produtosSeed) {
      const produtoExistente = await Produto.findOne({ where: { nome: produto.nome } });
      if (!produtoExistente) {
        const novoProduto = await Produto.create(produto);
        console.log(`Produto "${produto.nome}" criado com sucesso.`);

        await Estoque.create({
          id_produto: novoProduto.id_produto,
          quantidade_disponivel: produto.estoque,
        });
      } else {
        console.log(`Produto "${produto.nome}" já existe.`);
      }
    }

    console.log('Iniciando seed de participantes...');
    const participantesSeed = [
      // Doadores
      { anonimo: true, nome: null, endereco: null, contato: null },
      { anonimo: false, nome: 'João da Silva', endereco: 'Rua das Flores, 123', contato: '(11) 98765-4321' },
      { anonimo: false, nome: 'Maria Oliveira', endereco: 'Avenida Central, 456', contato: '(21) 91234-5678' },

      // Recebedores
      { anonimo: false, nome: 'Escola Municipal João XXIII', endereco: 'Rua da Esperança, 789', contato: '(31) 99876-5432' },
      { anonimo: false, nome: 'Creche Estrela do Amanhã', endereco: 'Praça da Alegria, 123', contato: '(41) 97654-3210' },
    ];

    for (const participante of participantesSeed) {
      const participanteExistente = await Participante.findOne({
        where: { nome: participante.nome, anonimo: participante.anonimo },
      });

      if (!participanteExistente) {
        await Participante.create(participante);
        console.log(`Participante "${participante.nome || 'Anônimo'}" criado.`);
      } else {
        console.log(`Participante "${participante.nome || 'Anônimo'}" já existe.`);
      }
    }

    console.log('Iniciando seed de movimentações...');
    const movimentacoesSeed = [
      { tipo_movimentacao: 'entrada', quantidade: 50, id_produto: 1, id_usuario: 1, id_participante: 1 },
      { tipo_movimentacao: 'entrada', quantidade: 30, id_produto: 2, id_usuario: 1, id_participante: 2 },
      { tipo_movimentacao: 'saida', quantidade: 10, id_produto: 1, id_usuario: 2, id_participante: 4 },
      { tipo_movimentacao: 'saida', quantidade: 5, id_produto: 2, id_usuario: 2, id_participante: 5 },
    ];

    for (const movimentacao of movimentacoesSeed) {
      await MovimentacaoProduto.create(movimentacao);

      const estoque = await Estoque.findOne({ where: { id_produto: movimentacao.id_produto } });
      if (estoque) {
        if (movimentacao.tipo_movimentacao === 'entrada') {
          estoque.quantidade_disponivel += movimentacao.quantidade;
        } else if (movimentacao.tipo_movimentacao === 'saida') {
          estoque.quantidade_disponivel -= movimentacao.quantidade;
        }
        await estoque.save();
        console.log(`Estoque atualizado para o produto com ID ${movimentacao.id_produto}: ${estoque.quantidade_disponivel}`);
      } else {
        console.error(`Estoque para o produto com ID ${movimentacao.id_produto} não encontrado.`);
      }
    }

    console.log('Seed do banco de dados concluído com sucesso!');
  } catch (error) {
    console.error('Erro ao executar o seed do banco de dados:', error);
  }
}

module.exports = criarSeed;
