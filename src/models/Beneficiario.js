const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Beneficiario = sequelize.define('Beneficiario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'beneficiarios',
  timestamps: false,
});

module.exports = Beneficiario;
