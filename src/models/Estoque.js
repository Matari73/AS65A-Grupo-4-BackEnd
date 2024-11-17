const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Produto = require('./Produto');

const Estoque = sequelize.define('Estoque', {
  id_estoque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantidade_disponivel: {
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
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'estoque',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Estoque;
