const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');
const Produto = require('./Produto.js')
const Participante = require('./Participante.js');
const Usuario = require('./Usuario.js');

const MovimentacaoProduto = sequelize.define('MovimentacaoProduto', {
  id_movimentacaoProduto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_movimentacao: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id_usuario',
    },
    allowNull: false,
  },
  id_produto: {
    type: DataTypes.INTEGER,
    references: {
      model: Produto,
      key: 'id_produto',
    },
    allowNull: false,
  },
  id_participante: {
    type: DataTypes.INTEGER,
    references: {
      model: Participante,
      key: 'id_participante',
    },
    allowNull: false,
  },
}, {
  tableName: 'movimentacaoProduto',
  timestamps: false,
});

module.exports = MovimentacaoProduto;