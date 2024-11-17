const Beneficiario = require('./Beneficiario');
const Doacao = require('./Doacao');
const Produto = require('./Produto');
const Estoque = require('./Estoque');
const Usuario = require('./Usuario');
const Distribuicao = require('./Distribuicao');

// Produto tem muitas Doacoes (1:N)
Produto.hasMany(Doacao, { foreignKey: 'produto_id', as: 'doacoes' });
Doacao.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produtos' });

// Produto tem muitos estoque (1:N)
Produto.hasMany(Estoque, { foreignKey: 'produto_id', as: 'estoque' });
Estoque.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produtos' });

// Usuario tem muitos estoque (1:N) - Responsável pelos estoque
Usuario.hasMany(Estoque, { foreignKey: 'usuario_id', as: 'estoque' });
Estoque.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuarios' });

// Produto tem muitas Distribuicoes (1:N)
Produto.hasMany(Distribuicao, { foreignKey: 'produto_id', as: 'distribuicoes' });
Distribuicao.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produtos' });

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
