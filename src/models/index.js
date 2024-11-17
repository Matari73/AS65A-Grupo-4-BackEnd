const Produto = require('./Produto');
const Estoque = require('./Estoque');
const Usuario = require('./Usuario');
const MovimentacaoProduto = require('./MovimentacaoProduto')
const Participante = require('./Participante')

Produto.hasMany(Estoque, { foreignKey: 'id_produto' });
Estoque.belongsTo(Produto, { foreignKey: 'id_produto' });

Produto.hasMany(MovimentacaoProduto, { foreignKey: 'id_produto' });
MovimentacaoProduto.belongsTo(Produto, { foreignKey: 'id_produto' });

Participante.hasMany(MovimentacaoProduto, { foreignKey: 'id_participante' });
MovimentacaoProduto.belongsTo(Participante, { foreignKey: 'id_participante' });

Usuario.hasMany(MovimentacaoProduto, { foreignKey: 'id_usuario' });
MovimentacaoProduto.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = {
  Produto,
  Estoque,
  Usuario,
  MovimentacaoProduto,
  Participante
};
