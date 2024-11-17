const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Produto = sequelize.define('Produto', {
  id_produto: {
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
}, {
  tableName: 'produtos',
  timestamps: false,
});

module.exports = Produto;
