const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade_min: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'produtos',
  timestamps: false,
});

module.exports = Produto;
