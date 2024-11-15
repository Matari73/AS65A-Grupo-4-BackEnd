const Beneficiario = require('./Beneficiario');
const Endereco = require('./Endereco');
const Doacao = require('./Doacao');
const Produto = require('./Produto');
const Estoque = require('./Estoque');
const Usuario = require('./Usuario');
const Distribuicao = require('./Distribuicao');

// Beneficiario tem um Endereco (1:1)
Beneficiario.hasOne(Endereco, { foreignKey: 'beneficiario_id', as: 'enderecos' });
Endereco.belongsTo(Beneficiario, { foreignKey: 'beneficiario_id', as: 'beneficiarios' });

// Produto tem muitas Doacoes (1:N)
Produto.hasMany(Doacao, { foreignKey: 'produto_id', as: 'doacoes' });
Doacao.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produtos' });

// Produto tem muitos Estoques (1:N)
Produto.hasMany(Estoque, { foreignKey: 'produto_id', as: 'estoques' });
Estoque.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produtos' });

// Usuario tem muitos Estoques (1:N) - Responsável pelos estoques
Usuario.hasMany(Estoque, { foreignKey: 'usuario_id', as: 'estoques' });
Estoque.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuarios' });

// Produto tem muitas Distribuicoes (1:N)
Produto.hasMany(Distribuicao, { foreignKey: 'produto_id', as: 'distribuicoes' });
Distribuicao.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produtos' });

// Distribuicao tem muitos Beneficiarios (1:N)
Distribuicao.hasMany(Beneficiario, { foreignKey: 'distribuicao_id', as: 'beneficiarios' });
Beneficiario.belongsTo(Distribuicao, { foreignKey: 'distribuicao_id', as: 'distribuicoes' });

module.exports = {
  Beneficiario,
  Endereco,
  Doacao,
  Produto,
  Estoque,
  Usuario,
  Distribuicao,
};
