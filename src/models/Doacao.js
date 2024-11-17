const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Produto = require('./Produto');

const Doacao = sequelize.define('Doacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_recebimento: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  quantidade_total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produto,
      key: 'id'
    }
  },
}, {
  tableName: 'doacoes',
  timestamps: false,
});

module.exports = Doacao;
