const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Beneficiario = require('./Beneficiario');

const Endereco = sequelize.define('Endereco', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  beneficiario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Beneficiario,
      key: 'id'
    }
  },
}, {
  tableName: 'enderecos',
  timestamps: false,
});

module.exports = Endereco;
