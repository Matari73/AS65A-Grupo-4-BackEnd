const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Produto = require('./Produto');
const Usuario = require('./Usuario');

const Estoque = sequelize.define('Estoque', {
  id: {
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
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produto,
      key: 'id'
    }
  },
  responsavel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'estoques',
  timestamps: false,
});

module.exports = Estoque;
