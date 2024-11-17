const Beneficiario = require('./Beneficiario');
const Doacao = require('./Doacao');
const Produto = require('./Produto');
const Estoque = require('./Estoque');
const Usuario = require('./Usuario');
const Distribuicao = require('./Distribuicao');

// Produto tem muitas Doacoes (1:N)
Produto.hasMany(Doacao, { foreignKey: 'id_produto', as: 'doacoes' });
Doacao.belongsTo(Produto, { foreignKey: 'id_produto', as: 'produtos' });

// Produto tem muitos estoque (1:N)
Produto.hasMany(Estoque, { foreignKey: 'id_produto', as: 'estoque' });
Estoque.belongsTo(Produto, { foreignKey: 'id_produto', as: 'produtos' });

// Usuario tem muitos estoque (1:N) - Responsável pelos estoque
Usuario.hasMany(Estoque, { foreignKey: 'usuario_id', as: 'estoque' });
Estoque.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuarios' });

// Produto tem muitas Distribuicoes (1:N)
Produto.hasMany(Distribuicao, { foreignKey: 'id_produto', as: 'distribuicoes' });
Distribuicao.belongsTo(Produto, { foreignKey: 'id_produto', as: 'produtos' });

// Distribuicao tem muitos Beneficiarios (1:N)
Distribuicao.hasMany(Beneficiario, { foreignKey: 'distribuicao_id', as: 'beneficiarios' });
Beneficiario.belongsTo(Distribuicao, { foreignKey: 'distribuicao_id', as: 'distribuicoes' });

module.exports = {
  Beneficiario,
  Doacao,
  Produto,
  Estoque,
  Usuario,
  Distribuicao,
};
